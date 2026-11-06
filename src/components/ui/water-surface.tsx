"use client";

import { useEffect, useRef, type RefObject } from "react";

const CELL = 4;
const STEP_MS = 1000 / 120;
const DAMPING = 0.9925;
const SPONGE_CELLS = 7;
const REST_LEVEL = 0.006;
const REFRACTION_SCALE = 15;
// A drop bounces as it lands, and each bounce sends out one more ring.
const DROP_PULSES = [
    { delay: 0, strength: 0.42 },
    { delay: 10, strength: -0.36 },
    { delay: 20, strength: 0.27 },
    { delay: 30, strength: -0.17 },
    { delay: 40, strength: 0.09 },
];

type Pulse = { x: number; y: number; radius: number; strength: number; delay: number };

type Surface = {
    width: number;
    height: number;
    current: Float32Array;
    previous: Float32Array;
    sponge: Float32Array;
    light: ImageData;
};

// Build the height field, with a soft absorbing edge so waves die out instead of bouncing hard.
function createSurface(pixelWidth: number, pixelHeight: number, context: CanvasRenderingContext2D): Surface {
    const width = Math.max(8, Math.ceil(pixelWidth / CELL));
    const height = Math.max(8, Math.ceil(pixelHeight / CELL));
    const sponge = new Float32Array(width * height);
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const edge = Math.min(x, y, width - 1 - x, height - 1 - y);
            sponge[y * width + x] = edge >= SPONGE_CELLS ? 1 : 0.9 + 0.1 * (edge / SPONGE_CELLS);
        }
    }
    return {
        width,
        height,
        current: new Float32Array(width * height),
        previous: new Float32Array(width * height),
        sponge,
        light: context.createImageData(width, height),
    };
}

// Add a smooth dome of water, which is what a falling drop displaces.
function drop(surface: Surface, pixelX: number, pixelY: number, radius: number, strength: number) {
    const { width, height, current } = surface;
    const cellX = pixelX / CELL;
    const cellY = pixelY / CELL;
    const reach = Math.ceil(radius * 2);
    for (let y = Math.max(1, Math.floor(cellY - reach)); y < Math.min(height - 1, cellY + reach); y++) {
        for (let x = Math.max(1, Math.floor(cellX - reach)); x < Math.min(width - 1, cellX + reach); x++) {
            const distance = ((x - cellX) ** 2 + (y - cellY) ** 2) / (radius * radius);
            current[y * width + x] -= strength * Math.exp(-distance);
        }
    }
}

// Advance the 2D wave equation by one step and return the tallest wave left.
function step(surface: Surface) {
    const { width, height, sponge } = surface;
    const { current, previous } = surface;
    let peak = 0;
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const index = y * width + x;
            const next = ((current[index - 1] + current[index + 1] + current[index - width] + current[index + width]) * 0.5 - previous[index]) * DAMPING * sponge[index];
            previous[index] = next;
            const size = next < 0 ? -next : next;
            if (size > peak) peak = size;
        }
    }
    surface.current = previous;
    surface.previous = current;
    return peak;
}

// Turn surface slope into sky reflections on the crests and soft shade in the troughs.
function paintLight(surface: Surface, context: CanvasRenderingContext2D) {
    const { width, height, current, light } = surface;
    const pixels = light.data;
    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const index = y * width + x;
            const slopeX = current[index + 1] - current[index - 1];
            const slopeY = current[index + width] - current[index - width];
            const facing = (slopeX * 0.55 + slopeY * 0.83) * 7;
            const pixel = index * 4;
            if (facing > 0) {
                const glint = facing > 1 ? 1 : facing;
                pixels[pixel] = 255;
                pixels[pixel + 1] = 255;
                pixels[pixel + 2] = 255;
                pixels[pixel + 3] = 190 * glint * (0.35 + 0.65 * glint);
            } else {
                const shade = facing < -1 ? 1 : -facing;
                pixels[pixel] = 8;
                pixels[pixel + 1] = 58;
                pixels[pixel + 2] = 104;
                pixels[pixel + 3] = 64 * shade;
            }
        }
    }
    context.putImageData(light, 0, 0);
}

// Encode slope as a half-resolution displacement map, neutral at the edges so nothing tears.
function paintRefraction(surface: Surface, map: ImageData, context: CanvasRenderingContext2D) {
    const { width, height, current } = surface;
    const pixels = map.data;
    const mapWidth = map.width;
    for (let y = 0; y < map.height; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const cellX = Math.min(width - 2, Math.max(1, x * 2));
            const cellY = Math.min(height - 2, Math.max(1, y * 2));
            const index = cellY * width + cellX;
            const edge = Math.min(cellX, cellY, width - 1 - cellX, height - 1 - cellY);
            const fade = edge >= SPONGE_CELLS * 2 ? 1 : edge / (SPONGE_CELLS * 2);
            const slopeX = (current[index + 1] - current[index - 1]) * fade * 430;
            const slopeY = (current[index + width] - current[index - width]) * fade * 430;
            const pixel = (y * mapWidth + x) * 4;
            pixels[pixel] = 128 + (slopeX > 127 ? 127 : slopeX < -127 ? -127 : slopeX);
            pixels[pixel + 1] = 128 + (slopeY > 127 ? 127 : slopeY < -127 ? -127 : slopeY);
            pixels[pixel + 2] = 128;
            pixels[pixel + 3] = 255;
        }
    }
    context.putImageData(map, 0, 0);
}

// Safari can drop elements with animated displacement filters, so it keeps the lighting only.
const canRefract = () => !/^((?!chrome|android).)*safari/i.test(navigator.userAgent);

/** Simulate water across the host. Press to drop into it; moving the mouse leaves a light wake. */
export function WaterSurface({ hostRef }: { hostRef: RefObject<HTMLElement | null> }) {
    const lightRef = useRef<HTMLCanvasElement>(null);
    const mapImageRef = useRef<SVGFEImageElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        const lightCanvas = lightRef.current;
        const mapImage = mapImageRef.current;
        if (!host || !lightCanvas || !mapImage) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lightContext = lightCanvas.getContext("2d");
        const mapCanvas = document.createElement("canvas");
        const mapContext = mapCanvas.getContext("2d", { willReadFrequently: true });
        if (!lightContext || !mapContext) return;

        const refract = canRefract();
        let surface: Surface;
        let map: ImageData;
        let frame = 0;
        let lastTime = 0;
        let backlog = 0;
        let lastWake = { x: -999, y: -999 };
        let pulses: Pulse[] = [];
        let refracting = false;

        const reset = () => {
            const bounds = host.getBoundingClientRect();
            surface = createSurface(bounds.width, bounds.height, lightContext);
            lightCanvas.width = surface.width;
            lightCanvas.height = surface.height;
            mapCanvas.width = Math.ceil(surface.width / 2);
            mapCanvas.height = Math.ceil(surface.height / 2);
            map = mapContext.createImageData(mapCanvas.width, mapCanvas.height);
            mapImage.setAttribute("width", `${bounds.width}`);
            mapImage.setAttribute("height", `${bounds.height}`);
        };

        const rest = () => {
            cancelAnimationFrame(frame);
            frame = 0;
            lightContext.clearRect(0, 0, lightCanvas.width, lightCanvas.height);
            refracting = false;
            host.style.filter = "";
            host.style.clipPath = "";
        };

        const tick = (time: number) => {
            backlog += Math.min(time - lastTime, 50);
            lastTime = time;
            let peak = 1;
            while (backlog >= STEP_MS) {
                pulses = pulses.filter((pulse) => {
                    if (pulse.delay-- > 0) return true;
                    drop(surface, pulse.x, pulse.y, pulse.radius, pulse.strength);
                    return false;
                });
                peak = step(surface);
                backlog -= STEP_MS;
            }
            if (peak < REST_LEVEL && pulses.length === 0) {
                rest();
                return;
            }
            paintLight(surface, lightContext);
            if (refracting) {
                paintRefraction(surface, map, mapContext);
                mapImage.setAttribute("href", mapCanvas.toDataURL());
            }
            frame = requestAnimationFrame(tick);
        };

        const startRefraction = () => {
            if (!refract || refracting) return;
            refracting = true;
            paintRefraction(surface, map, mapContext);
            mapImage.setAttribute("href", mapCanvas.toDataURL());
            host.style.clipPath = "inset(0)";
            host.style.filter = "url(#hero-water)";
        };

        const wake = () => {
            if (frame) return;
            lastTime = performance.now();
            backlog = 0;
            frame = requestAnimationFrame(tick);
        };

        const pointFrom = (event: PointerEvent) => {
            const bounds = host.getBoundingClientRect();
            return { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
        };

        const onPress = (event: PointerEvent) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            const point = pointFrom(event);
            DROP_PULSES.forEach((pulse) => pulses.push({ ...point, radius: 2.8, ...pulse }));
            startRefraction();
            wake();
        };

        const onMove = (event: PointerEvent) => {
            if (event.pointerType !== "mouse") return;
            const point = pointFrom(event);
            if (Math.hypot(point.x - lastWake.x, point.y - lastWake.y) < 26) return;
            lastWake = point;
            pulses.push({ ...point, radius: 2.2, strength: 0.035, delay: 0 });
            wake();
        };

        const onFishFlick = (event: Event) => {
            const { x, y } = (event as CustomEvent<{ x: number; y: number }>).detail;
            pulses.push({ x, y, radius: 2, strength: 0.1, delay: 0 });
            wake();
        };

        reset();
        const resize = new ResizeObserver(reset);
        resize.observe(host);
        host.addEventListener("pointerdown", onPress);
        host.addEventListener("pointermove", onMove);
        host.addEventListener("pond-ripple", onFishFlick);

        return () => {
            rest();
            resize.disconnect();
            host.removeEventListener("pointerdown", onPress);
            host.removeEventListener("pointermove", onMove);
            host.removeEventListener("pond-ripple", onFishFlick);
        };
    }, [hostRef]);

    return (
        <>
            <svg className="glass-filter" aria-hidden="true" focusable="false">
                <filter id="hero-water" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
                    <feImage ref={mapImageRef} x="0" y="0" preserveAspectRatio="none" result="map" />
                    <feDisplacementMap in="SourceGraphic" in2="map" scale={REFRACTION_SCALE} xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
            <canvas ref={lightRef} className="hero-water" aria-hidden="true" />
        </>
    );
}
