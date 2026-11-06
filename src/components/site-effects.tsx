"use client";

import { useEffect, useRef } from "react";
import { createBurns, flameActive, inFlame } from "@/lib/dragon-flame";

const PIXEL = 2;
const COLUMN_WIDTH = 1024;
const MIN_WIDTH = 1140;
const FLOCK_SIZE = 8;
const FRAME_MS = 1000 / 30;
const FLEE_REACH = 24;

type Bird = { x: number; y: number; speedX: number; speedY: number; flap: number; gone: number };
type Flock = { side: number; anchor: number; drift: number; nextCrossing: number; birds: Bird[] };

function createFlock(side: number, width: number, height: number, drift: number): Flock {
    const gutter = (width - COLUMN_WIDTH / PIXEL) / 2;
    const anchor = side < 0 ? gutter / 2 : width - gutter / 2;
    return {
        side,
        anchor,
        drift,
        nextCrossing: 28 + Math.random() * 40,
        birds: Array.from({ length: FLOCK_SIZE }, () => ({
            x: anchor + (Math.random() - 0.5) * 40,
            y: height * (0.25 + Math.random() * 0.5),
            speedX: (Math.random() - 0.5) * 20,
            speedY: (Math.random() - 0.5) * 20,
            flap: Math.random() * 6,
            gone: 0,
        })),
    };
}

// A small bird seen from afar: wings up on one beat, down on the next.
function drawBird(context: CanvasRenderingContext2D, x: number, y: number, wingsUp: boolean) {
    const wing = wingsUp ? -1 : 1;
    context.fillRect(x, y, 2, 1);
    context.fillRect(x - 2, y + wing, 2, 1);
    context.fillRect(x + 2, y + wing, 2, 1);
    context.fillRect(x - 3, y + wing * 2, 1, 1);
    context.fillRect(x + 4, y + wing * 2, 1, 1);
}

/** Keep small flocks moving in the empty margins beside the page. They scatter from the cursor, cross behind it, and burn if the dragon catches them. */
export const SiteEffects = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const burns = createBurns(2);
        let flocks: Flock[] = [];
        let cursor = { x: -999, y: -999 };
        let frame = 0;
        let lastDraw = 0;

        const fit = () => {
            canvas.width = Math.ceil(window.innerWidth / PIXEL);
            canvas.height = Math.ceil(window.innerHeight / PIXEL);
            flocks = window.innerWidth < MIN_WIDTH ? [] : [createFlock(-1, canvas.width, canvas.height, 0), createFlock(1, canvas.width, canvas.height, 2.4)];
            context.clearRect(0, 0, canvas.width, canvas.height);
        };

        const steer = (flock: Flock, time: number, seconds: number) => {
            const gutter = (canvas.width - COLUMN_WIDTH / PIXEL) / 2;
            flock.nextCrossing -= seconds;
            if (flock.nextCrossing <= 0) {
                flock.side *= -1;
                flock.nextCrossing = 45 + Math.random() * 50;
            }
            const home = flock.side < 0 ? gutter / 2 : canvas.width - gutter / 2;
            flock.anchor += (home - flock.anchor) * Math.min(1, seconds * 0.22);

            const leadX = flock.anchor + Math.sin(time * 0.31 + flock.drift) * gutter * 0.3;
            const leadY = canvas.height * (0.5 + 0.38 * Math.sin(time * 0.17 + flock.drift * 2));

            flock.birds.forEach((bird, index) => {
                // A burnt bird is replaced by a newcomer flying in from the edge of the screen.
                if (bird.gone > 0) {
                    bird.gone -= seconds;
                    if (bird.gone > 0) return;
                    bird.x = flock.side < 0 ? -8 : canvas.width + 8;
                    bird.y = canvas.height * (0.2 + Math.random() * 0.6);
                    bird.speedX = 0;
                    bird.speedY = 0;
                }

                const isExposed = bird.x < gutter || bird.x > canvas.width - gutter;
                if (flameActive() && isExposed && inFlame(bird.x * PIXEL, bird.y * PIXEL)) {
                    burns.ignite(bird.x, bird.y, bird.speedX, bird.speedY);
                    bird.gone = 5 + Math.random() * 7;
                    return;
                }

                let pushX = (leadX + Math.cos(time * 0.8 + index * 0.8) * 18 - bird.x) * 0.5;
                let pushY = (leadY + Math.sin(time * 0.7 + index * 1.1) * 12 - bird.y) * 0.5;

                flock.birds.forEach((other) => {
                    const deltaX = bird.x - other.x;
                    const deltaY = bird.y - other.y;
                    const distance = Math.hypot(deltaX, deltaY);
                    if (other === bird || other.gone > 0 || distance > 11 || distance === 0) return;
                    pushX += (deltaX / distance) * (11 - distance) * 5;
                    pushY += (deltaY / distance) * (11 - distance) * 5;
                });

                const awayX = bird.x - cursor.x;
                const awayY = bird.y - cursor.y;
                const fromCursor = Math.hypot(awayX, awayY);
                if (fromCursor < FLEE_REACH && fromCursor > 0) {
                    pushX += (awayX / fromCursor) * (FLEE_REACH - fromCursor) * 9;
                    pushY += (awayY / fromCursor) * (FLEE_REACH - fromCursor) * 9;
                }

                bird.speedX += pushX * seconds;
                bird.speedY += pushY * seconds;
                const speed = Math.hypot(bird.speedX, bird.speedY);
                const limit = fromCursor < FLEE_REACH ? 120 : 44;
                if (speed > limit) {
                    bird.speedX *= limit / speed;
                    bird.speedY *= limit / speed;
                }
                bird.x += bird.speedX * seconds;
                bird.y += bird.speedY * seconds;
                bird.flap += seconds * (5 + speed * 0.12);
            });
        };

        const tick = (now: number) => {
            frame = requestAnimationFrame(tick);
            if (flocks.length === 0 || now - lastDraw < FRAME_MS) return;
            const seconds = Math.min((now - lastDraw) / 1000, 0.1);
            lastDraw = now;
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillStyle = document.documentElement.classList.contains("dark") ? "rgba(190, 222, 250, .55)" : "rgba(38, 66, 92, .5)";
            flocks.forEach((flock) => {
                steer(flock, now / 1000, seconds);
                flock.birds.forEach((bird) => {
                    if (bird.gone <= 0) drawBird(context, Math.round(bird.x), Math.round(bird.y), Math.sin(bird.flap) > 0);
                });
            });
            burns.step(context, seconds);
        };

        const onMove = (event: PointerEvent) => {
            cursor = { x: event.clientX / PIXEL, y: event.clientY / PIXEL };
        };

        fit();
        frame = requestAnimationFrame(tick);
        window.addEventListener("resize", fit);
        window.addEventListener("pointermove", onMove, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", fit);
            window.removeEventListener("pointermove", onMove);
        };
    }, []);

    return (
        <div aria-hidden="true" className="motion-sky">
            <canvas ref={canvasRef} className="sky-birds" />
        </div>
    );
};
