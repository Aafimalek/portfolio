"use client";

import { useEffect, useRef, type RefObject } from "react";

// Swim frames come from crabnebula-dev/koi-pond (MIT, see public/koi/LICENSE.txt), converted to black and white.
const ATLAS = "/koi/koi.webp";
const CELL_WIDTH = 86;
const CELL_HEIGHT = 152;
const SWIM_FRAMES = 12;
const CRUISE_SPEED = 26;

type Fish = {
    x: number;
    y: number;
    heading: number;
    turn: number;
    boost: number;
    phase: number;
    size: number;
    nextFlick: number;
};

function createFish(width: number, height: number): Fish {
    return {
        x: width * (0.15 + Math.random() * 0.7),
        y: height * (0.15 + Math.random() * 0.7),
        heading: Math.random() * Math.PI * 2,
        turn: 0,
        boost: 0,
        phase: Math.random() * SWIM_FRAMES,
        size: 0.42 + Math.random() * 0.14,
        nextFlick: 4 + Math.random() * 10,
    };
}

// The frames face up, so each fish is rotated to its heading. The shadow falls on the pond floor below it.
function drawFish(context: CanvasRenderingContext2D, atlas: HTMLImageElement, fish: Fish, ratio: number) {
    const column = Math.floor(fish.phase) % SWIM_FRAMES;
    const width = CELL_WIDTH * fish.size;
    const height = CELL_HEIGHT * fish.size;
    context.save();
    context.translate(fish.x, fish.y);
    context.rotate(fish.heading + Math.PI / 2);
    context.shadowColor = "rgba(5, 35, 60, .42)";
    context.shadowBlur = 7 * ratio;
    context.shadowOffsetX = 5 * ratio;
    context.shadowOffsetY = 8 * ratio;
    context.drawImage(atlas, column * CELL_WIDTH, 0, CELL_WIDTH, CELL_HEIGHT, -width / 2, -height / 2, width, height);
    context.restore();
}

// Glide with slow, wide turns, and come back well before reaching the edge.
function swim(fish: Fish, seconds: number, width: number, height: number) {
    const margin = 46;
    const outside = fish.x < margin || fish.y < margin || fish.x > width - margin || fish.y > height - margin;
    fish.turn += (Math.random() - 0.5) * 2.2 * seconds;
    fish.turn *= Math.pow(0.5, seconds);
    fish.heading += fish.turn * seconds;
    if (outside) {
        const towardsCentre = Math.atan2(height / 2 - fish.y, width / 2 - fish.x);
        fish.heading += Math.atan2(Math.sin(towardsCentre - fish.heading), Math.cos(towardsCentre - fish.heading)) * 1.3 * seconds;
    }
    const speed = CRUISE_SPEED + fish.boost;
    fish.boost *= Math.pow(0.14, seconds);
    fish.phase += seconds * (10 + speed * 0.1);
    fish.x += Math.cos(fish.heading) * speed * seconds;
    fish.y += Math.sin(fish.heading) * speed * seconds;
}

/** Keep a few koi swimming under the water. They bolt from a press and flick the surface now and then. */
export function PondFish({ hostRef }: { hostRef: RefObject<HTMLElement | null> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const host = hostRef.current;
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!host || !canvas || !context) return;

        const atlas = new Image();
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        let fish: Fish[] = [];
        let frame = 0;
        let lastTime = 0;

        const draw = () => {
            if (!atlas.complete || !atlas.naturalWidth) return;
            context.setTransform(ratio, 0, 0, ratio, 0, 0);
            context.clearRect(0, 0, host.clientWidth, host.clientHeight);
            fish.forEach((one) => drawFish(context, atlas, one, ratio));
        };

        const fit = () => {
            const width = host.clientWidth;
            const height = host.clientHeight;
            canvas.width = Math.ceil(width * ratio);
            canvas.height = Math.ceil(height * ratio);
            const count = width < 640 ? 2 : 3;
            if (fish.length !== count) fish = Array.from({ length: count }, () => createFish(width, height));
            draw();
        };

        const tick = (time: number) => {
            frame = requestAnimationFrame(tick);
            const seconds = Math.min((time - lastTime) / 1000, 0.1);
            lastTime = time;
            fish.forEach((one) => {
                swim(one, seconds, host.clientWidth, host.clientHeight);
                one.nextFlick -= seconds;
                if (one.nextFlick > 0) return;
                one.nextFlick = 7 + Math.random() * 12;
                one.boost = 46;
                host.dispatchEvent(new CustomEvent("pond-ripple", { detail: { x: one.x, y: one.y } }));
            });
            draw();
        };

        const onPress = (event: PointerEvent) => {
            const bounds = host.getBoundingClientRect();
            const pressX = event.clientX - bounds.left;
            const pressY = event.clientY - bounds.top;
            fish.forEach((one) => {
                if (Math.hypot(one.x - pressX, one.y - pressY) > 210) return;
                one.heading = Math.atan2(one.y - pressY, one.x - pressX) + (Math.random() - 0.5) * 0.6;
                one.boost = 190;
            });
        };

        atlas.onload = draw;
        atlas.src = ATLAS;
        fit();
        const resize = new ResizeObserver(fit);
        resize.observe(host);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => resize.disconnect();

        const visible = new IntersectionObserver(([entry]) => {
            cancelAnimationFrame(frame);
            frame = 0;
            if (!entry.isIntersecting) return;
            lastTime = performance.now();
            frame = requestAnimationFrame(tick);
        });
        visible.observe(host);
        host.addEventListener("pointerdown", onPress);

        return () => {
            cancelAnimationFrame(frame);
            resize.disconnect();
            visible.disconnect();
            host.removeEventListener("pointerdown", onPress);
        };
    }, [hostRef]);

    return <canvas ref={canvasRef} className="pond-fish" aria-hidden="true" />;
}
