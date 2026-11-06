"use client";

import { useEffect, useRef } from "react";

const IMAGE_WIDTH = 2172;
const IMAGE_HEIGHT = 724;
const WATERLINE = 0.8;
const MOON_X = 0.42;
const MOON_DARK = [52, 80, 116];
const MOON_LIGHT = [190, 220, 250];
const MOON_PEAK = "#abcef4";
const MOON_CRATERS = [[-0.36, -0.42, 0.13], [0.32, -0.22, 0.09], [0.1, 0.46, 0.16], [-0.54, 0.2, 0.07], [0.56, 0.3, 0.06], [-0.1, 0.04, 0.05]];
const STRIP = 2;
const FRAME_MS = 1000 / 30;

// Windows and lanterns in the painting, as fractions of the image.
const LIGHTS = [
    { x: 0.0565, y: 0.715, size: 34 },
    { x: 0.5655, y: 0.553, size: 24 },
    { x: 0.6425, y: 0.645, size: 30 },
    { x: 0.73, y: 0.447, size: 34 },
    { x: 0.845, y: 0.725, size: 26 },
];

type Ring = { x: number; y: number; age: number; size: number };
type Star = { x: number; y: number; size: number; phase: number; speed: number };
type Firefly = { x: number; y: number; phase: number; drift: number };
type Petal = { x: number; y: number; speed: number; sway: number; spin: number; phase: number; size: number };
type Bird = { offset: number; lag: number };
type Meteor = { x: number; y: number; age: number };

// Run a loop only while its element is on screen.
function whileVisible(element: Element, onFrame: (seconds: number) => void) {
    let frame = 0;
    let lastDraw = 0;
    const tick = (time: number) => {
        frame = requestAnimationFrame(tick);
        if (time - lastDraw < FRAME_MS) return;
        lastDraw = time;
        onFrame(time / 1000);
    };
    const observer = new IntersectionObserver(([entry]) => {
        cancelAnimationFrame(frame);
        frame = entry.isIntersecting ? requestAnimationFrame(tick) : 0;
    });
    observer.observe(element);
    return () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
    };
}

const prefersStillness = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Work out where a point of the painting lands, since it is cropped to cover its frame from the bottom.
function coverMap(width: number, height: number) {
    const scale = Math.max(width / IMAGE_WIDTH, height / IMAGE_HEIGHT);
    return { scale, left: (width - IMAGE_WIDTH * scale) / 2, top: height - IMAGE_HEIGHT * scale };
}

const hash = (x: number, y: number) => {
    const value = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return value - Math.floor(value);
};

const smoothstep = (from: number, to: number, value: number) => {
    const amount = Math.min(1, Math.max(0, (value - from) / (to - from)));
    return amount * amount * (3 - 2 * amount);
};

function noise(x: number, y: number) {
    const cellX = Math.floor(x);
    const cellY = Math.floor(y);
    const blendX = smoothstep(0, 1, x - cellX);
    const blendY = smoothstep(0, 1, y - cellY);
    const top = hash(cellX, cellY) * (1 - blendX) + hash(cellX + 1, cellY) * blendX;
    const bottom = hash(cellX, cellY + 1) * (1 - blendX) + hash(cellX + 1, cellY + 1) * blendX;
    return top * (1 - blendY) + bottom * blendY;
}

// How lit each point of the disc is, from the light on the sphere, the dark seas and the craters.
function moonTone(u: number, v: number, depth: number) {
    let tone = 0.46 + 0.5 * Math.max(0, -0.42 * u - 0.5 * v + 0.76 * depth);
    const seas = noise(u * 1.9 + 3, v * 1.9 + 7) * 0.6 + noise(u * 4.1 + 9, v * 4.1 + 2) * 0.28 + noise(u * 9 + 1, v * 9 + 5) * 0.12;
    tone -= 0.4 * smoothstep(0.44, 0.6, seas);
    MOON_CRATERS.forEach(([craterU, craterV, size]) => {
        const offsetU = u - craterU;
        const offsetV = v - craterV;
        const distance = Math.hypot(offsetU, offsetV) / size;
        if (distance < 1) tone -= 0.3 * (1 - distance * distance);
        if (distance > 0.8 && distance < 1.25 && offsetU + offsetV > 0) tone += 0.26 * (1 - Math.abs(distance - 1) / 0.25);
    });
    return tone;
}

// Draw the disc as engraved lines that follow the sphere, the same way the painting is shaded.
function engraveMoon(context: CanvasRenderingContext2D, size: number, spacing: number) {
    const image = context.createImageData(size, size);
    const radius = size / 2 - 1;
    const tilt = 0.38;
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            const u = (x + 0.5 - size / 2) / radius;
            const v = (y + 0.5 - size / 2) / radius;
            const reach = Math.hypot(u, v);
            if (reach > 1.02) continue;
            const depth = Math.sqrt(Math.max(0, 1 - reach * reach));
            const tone = Math.min(1, Math.max(0.24, moonTone(u, v, depth) + 0.18));
            const latitude = Math.asin(Math.min(1, Math.max(-1, v * Math.cos(tilt) + u * Math.sin(tilt))));
            const wobble = (noise(u * 6, v * 6) - 0.5) * 0.5;
            const line = latitude * (radius / spacing) + wobble;
            const fromLine = Math.abs(line - Math.floor(line) - 0.5) * 2;
            let ink = 1 - smoothstep(tone - 0.2, tone + 0.2, fromLine);
            if (hash(x, y) > 0.965 - tone * 0.05) ink = Math.max(ink, 0.8);
            const rim = smoothstep(0.93, 0.985, reach) * Math.max(0.3, 0.5 - 0.5 * u - 0.6 * v);
            ink = Math.min(1, ink + rim);
            const pixel = (y * size + x) * 4;
            MOON_DARK.forEach((dark, channel) => {
                image.data[pixel + channel] = dark + (MOON_LIGHT[channel] - dark) * ink;
            });
            image.data[pixel + 3] = 255 * (1 - smoothstep(0.985, 1.015, reach));
        }
    }
    context.putImageData(image, 0, 0);
}

/** Hang an engraved moon in the sky, drawn once in the colours sampled from the painting. */
export function FooterMoon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const footer = canvas?.parentElement;
        const art = footer?.querySelector(".footer-art");
        if (!canvas || !context || !footer || !art) return;

        // Always draw at double size, so the lines stay fine instead of averaging out dark on standard screens.
        const ratio = Math.max(2, Math.min(window.devicePixelRatio || 1, 3));
        let drawnSize = 0;

        const fit = () => {
            const size = Math.round(Math.max(64, Math.min(124, footer.clientWidth * 0.066)));
            const footerBounds = footer.getBoundingClientRect();
            const artBounds = art.getBoundingClientRect();
            canvas.style.width = `${size}px`;
            canvas.style.height = `${size}px`;
            canvas.style.left = `${footer.clientWidth * MOON_X - size / 2}px`;
            canvas.style.top = `${artBounds.top - footerBounds.top + artBounds.height * 0.13 - size / 2}px`;
            if (size === drawnSize) return;
            drawnSize = size;
            canvas.width = size * ratio;
            canvas.height = size * ratio;
            engraveMoon(context, size * ratio, 2.2 * ratio);
        };

        fit();
        const resize = new ResizeObserver(fit);
        resize.observe(footer);
        return () => resize.disconnect();
    }, []);

    return <canvas ref={canvasRef} className="footer-moon" aria-hidden="true" />;
}

/** Bend the lake in thin strips, then add spreading rings and the moon's broken reflection. */
export function FooterWater() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const art = canvas?.parentElement;
        const image = art?.querySelector("img");
        if (!canvas || !context || !art || !image || prefersStillness()) return;

        // A srcset image reports a density-adjusted size, but canvas reads its real pixels, so sample a plain copy.
        const source = new Image();
        let ready = false;
        let imageScale = 1;
        let left = 0;
        let top = 0;
        let waterTop = 0;
        let waterHeight = 0;
        let lastTime = 0;
        let nextRing = 0.4;
        let rings: Ring[] = [];

        const fit = () => {
            ready = false;
            if (!source.naturalWidth) return;
            const width = art.clientWidth;
            const height = art.clientHeight;
            imageScale = Math.max(width / source.naturalWidth, height / source.naturalHeight);
            left = (width - source.naturalWidth * imageScale) / 2;
            top = height - source.naturalHeight * imageScale;
            waterTop = top + source.naturalHeight * imageScale * WATERLINE;
            waterHeight = height - waterTop;
            canvas.width = width;
            canvas.height = Math.ceil(waterHeight);
            canvas.style.top = `${waterTop}px`;
            ready = true;
        };

        const drawRings = (seconds: number) => {
            nextRing -= seconds;
            if (nextRing <= 0) {
                nextRing = 0.5 + Math.random() * 1.1;
                rings.push({ x: Math.random() * canvas.width, y: 8 + Math.random() * (waterHeight - 12), age: 0, size: 26 + Math.random() * 46 });
            }
            context.lineWidth = 1;
            rings.forEach((ring) => {
                ring.age += seconds / 3;
                [0, 0.22].forEach((delay) => {
                    const growth = ring.age - delay;
                    if (growth <= 0) return;
                    context.strokeStyle = `rgba(214, 236, 255, ${0.5 * (1 - ring.age)})`;
                    context.beginPath();
                    context.ellipse(ring.x, ring.y, growth * ring.size * 2, growth * ring.size * 0.55, 0, 0, Math.PI * 2);
                    context.stroke();
                });
            });
            rings = rings.filter((ring) => ring.age < 1);
        };

        const drawMoonlight = (time: number) => {
            const centre = canvas.width * MOON_X;
            context.fillStyle = MOON_PEAK;
            for (let y = 3; y < waterHeight; y += 5) {
                const depth = y / waterHeight;
                const reach = 12 + depth * 46;
                const flicker = Math.sin(y * 1.7 + time * 3.1) * 0.5 + 0.5;
                context.globalAlpha = (0.08 + flicker * 0.22) * (1 - depth * 0.45);
                context.fillRect(centre + Math.sin(y * 0.5 + time * 1.4) * reach * 0.5 - reach * flicker * 0.5, y, reach * flicker + 3, 1.5);
            }
            context.globalAlpha = 1;
        };

        const stop = whileVisible(art, (time) => {
            const seconds = Math.min(time - lastTime, 0.1);
            lastTime = time;
            if (!ready) return;
            context.clearRect(0, 0, canvas.width, canvas.height);
            for (let y = 0; y < waterHeight; y += STRIP) {
                const depth = y / waterHeight;
                const slide = (Math.sin(y * 0.2 + time * 1.7) + Math.sin(y * 0.07 - time * 1.1) * 0.7) * (0.9 + depth * 6);
                const lift = Math.sin(y * 0.33 + time * 2.3) * depth * 2.4;
                context.drawImage(source, -left / imageScale, (waterTop + y + lift - top) / imageScale, canvas.width / imageScale, STRIP / imageScale, slide, y, canvas.width, STRIP);
            }
            drawMoonlight(time);
            drawRings(seconds);
        });

        const copySource = () => {
            source.src = image.currentSrc;
        };

        source.onload = fit;
        if (image.complete && image.currentSrc) copySource();
        else image.addEventListener("load", copySource, { once: true });

        const resize = new ResizeObserver(fit);
        resize.observe(art);
        return () => {
            stop();
            resize.disconnect();
            image.removeEventListener("load", copySource);
        };
    }, []);

    return <canvas ref={canvasRef} className="footer-water" aria-hidden="true" />;
}

/** Fill the night with stars, meteors, fireflies, lit windows, falling petals and passing birds. */
export function FooterSky() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        const footer = canvas?.parentElement;
        const art = footer?.querySelector(".footer-art");
        if (!canvas || !context || !footer || !art) return;

        let stars: Star[] = [];
        let fireflies: Firefly[] = [];
        let petals: Petal[] = [];
        let flock: Bird[] = [];
        let meteor: Meteor | null = null;
        let flockX = -60;
        let flockY = 0;
        let nextFlock = 3;
        let nextMeteor = 4;
        let lastTime = 0;
        let skyBottom = 0;
        let artTop = 0;
        let artHeight = 0;
        let map = coverMap(1, 1);

        const newPetal = (anywhere: boolean): Petal => ({
            x: Math.random() * canvas.width * 1.2 - canvas.width * 0.2,
            y: anywhere ? Math.random() * canvas.height : -12,
            speed: 26 + Math.random() * 34,
            sway: 16 + Math.random() * 30,
            spin: 0.7 + Math.random() * 1.6,
            phase: Math.random() * 6,
            size: 3 + Math.random() * 3.5,
        });

        const fit = () => {
            canvas.width = footer.clientWidth;
            canvas.height = footer.clientHeight;
            const footerBounds = footer.getBoundingClientRect();
            const artBounds = art.getBoundingClientRect();
            artTop = artBounds.top - footerBounds.top;
            artHeight = artBounds.height;
            map = coverMap(artBounds.width, artHeight);
            skyBottom = artTop + artHeight * 0.26;
            stars = Array.from({ length: Math.round((canvas.width * skyBottom) / 5200) }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * skyBottom,
                size: Math.random() < 0.22 ? 2 : 1,
                phase: Math.random() * 6,
                speed: 0.8 + Math.random() * 2.4,
            }));
            fireflies = Array.from({ length: canvas.width < 640 ? 10 : 26 }, () => ({
                x: Math.random() * canvas.width,
                y: artTop + artHeight * (0.4 + Math.random() * 0.4),
                phase: Math.random() * 6,
                drift: 0.25 + Math.random() * 0.6,
            }));
            petals = Array.from({ length: canvas.width < 640 ? 9 : 20 }, () => newPetal(true));
        };

        const glow = (x: number, y: number, radius: number, colour: string, strength: number) => {
            const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
            gradient.addColorStop(0, `rgba(${colour}, ${strength})`);
            gradient.addColorStop(1, `rgba(${colour}, 0)`);
            context.fillStyle = gradient;
            context.fillRect(x - radius, y - radius, radius * 2, radius * 2);
        };

        const drawBird = (x: number, y: number, up: boolean) => {
            const wing = up ? -2 : 1;
            context.fillRect(x, y, 2, 2);
            context.fillRect(x - 3, y + wing, 3, 1);
            context.fillRect(x + 2, y + wing, 3, 1);
            context.fillRect(x - 6, y + wing * 2, 3, 1);
            context.fillRect(x + 5, y + wing * 2, 3, 1);
        };

        const draw = (time: number) => {
            const seconds = Math.min(time - lastTime, 0.1);
            lastTime = time;
            context.clearRect(0, 0, canvas.width, canvas.height);

            context.fillStyle = "#cfe8ff";
            stars.forEach((star) => {
                context.globalAlpha = 0.42 + 0.42 * Math.sin(time * star.speed + star.phase);
                context.fillRect(Math.round(star.x), Math.round(star.y), star.size, star.size);
            });
            context.globalAlpha = 1;

            nextMeteor -= seconds;
            if (!meteor && nextMeteor <= 0) {
                meteor = { x: canvas.width * (0.3 + Math.random() * 0.6), y: skyBottom * Math.random() * 0.45, age: 0 };
                nextMeteor = 6 + Math.random() * 9;
            }
            if (meteor) {
                meteor.age += seconds / 0.9;
                const headX = meteor.x - meteor.age * 340;
                const headY = meteor.y + meteor.age * 150;
                const trail = context.createLinearGradient(headX, headY, headX + 110, headY - 48);
                trail.addColorStop(0, `rgba(235, 246, 255, ${0.95 * (1 - meteor.age)})`);
                trail.addColorStop(1, "rgba(235, 246, 255, 0)");
                context.strokeStyle = trail;
                context.lineWidth = 1.5;
                context.beginPath();
                context.moveTo(headX, headY);
                context.lineTo(headX + 110, headY - 48);
                context.stroke();
                if (meteor.age >= 1) meteor = null;
            }

            LIGHTS.forEach((light, index) => {
                const flicker = 0.62 + Math.sin(time * 5.3 + index * 2) * 0.12 + Math.sin(time * 11.7 + index) * 0.08;
                const x = map.left + light.x * IMAGE_WIDTH * map.scale;
                const y = artTop + map.top + light.y * IMAGE_HEIGHT * map.scale;
                glow(x, y, light.size * Math.max(map.scale * 1.6, 0.8), "255, 196, 112", flicker * 0.62);
            });

            fireflies.forEach((fly) => {
                const shine = Math.max(0, Math.sin(time * 1.5 + fly.phase));
                const x = fly.x + Math.sin(time * fly.drift + fly.phase) * 34;
                const y = fly.y + Math.cos(time * fly.drift * 1.4 + fly.phase) * 18;
                glow(x, y, 11, "255, 224, 150", shine * 0.55);
                context.fillStyle = `rgba(255, 240, 200, ${shine})`;
                context.fillRect(x - 1, y - 1, 2, 2);
            });

            petals.forEach((petal, index) => {
                petal.y += petal.speed * seconds;
                petal.x += (24 + Math.sin(time * 0.6 + petal.phase) * petal.sway) * seconds;
                const turn = Math.sin(time * petal.spin + petal.phase);
                context.fillStyle = index % 3 === 0 ? "rgba(255, 214, 228, .85)" : "rgba(226, 240, 255, .78)";
                context.beginPath();
                context.ellipse(petal.x, petal.y, petal.size, petal.size * (0.28 + Math.abs(turn) * 0.5), time * petal.spin + petal.phase, 0, Math.PI * 2);
                context.fill();
                if (petal.y > canvas.height + 10 || petal.x > canvas.width + 20) petals[index] = newPetal(false);
            });

            context.globalAlpha = 0.9;
            context.fillStyle = "#cfe8ff";
            nextFlock -= seconds;
            if (flock.length === 0 && nextFlock <= 0) {
                flockX = -60;
                flockY = artTop + artHeight * (0.03 + Math.random() * 0.17);
                flock = Array.from({ length: 4 + Math.floor(Math.random() * 4) }, (_, index) => ({ offset: (index % 2 ? 1 : -1) * index * 7, lag: index * 15 }));
            }
            if (flock.length > 0) {
                flockX += seconds * 92;
                flock.forEach((bird, index) => drawBird(Math.round(flockX - bird.lag), Math.round(flockY + bird.offset), Math.sin(time * 8 + index) > 0));
                if (flockX - 120 > canvas.width) {
                    flock = [];
                    nextFlock = 5 + Math.random() * 8;
                }
            }
            context.globalAlpha = 1;
        };

        fit();
        const resize = new ResizeObserver(fit);
        resize.observe(footer);
        if (prefersStillness()) {
            draw(1);
            return () => resize.disconnect();
        }

        const stop = whileVisible(footer, draw);
        return () => {
            stop();
            resize.disconnect();
        };
    }, []);

    return <canvas ref={canvasRef} className="footer-sky" aria-hidden="true" />;
}
