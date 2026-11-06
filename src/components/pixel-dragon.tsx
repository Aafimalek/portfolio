"use client";

import { useEffect, useRef } from "react";

const PIXEL = 1;
const SEGMENTS = 21;
const SPACING = 2;
const REST_AFTER = 9;
const INK = "#0b2036";
const BODY = "#3285c6";
const SHADE = "#235f92";
const LIGHT = "#8fd3ff";
const GOLD = "#ffb454";
const PEARL = "#f4f8fb";

// The head seen from above, facing right. Only the top half is drawn here because it mirrors.
const HEAD_HALF = [
    "#g........",
    ".#g##.....",
    "..#bbb##..",
    "..#bebbb#.",
    "..#lbbbbb#",
];
const HEAD = [...HEAD_HALF, ...HEAD_HALF.slice(0, -1).reverse()];
const HEAD_ANCHOR = { column: 3, row: 4 };
const HEAD_COLOURS: Record<string, string> = { "#": INK, g: GOLD, b: BODY, l: LIGHT, e: PEARL };

type Point = { x: number; y: number };
type Ember = Point & { speedX: number; speedY: number; life: number; colour: string };

function disc(context: CanvasRenderingContext2D, x: number, y: number, radius: number) {
    const centreX = Math.round(x);
    const centreY = Math.round(y);
    const reach = Math.ceil(radius);
    for (let row = -reach; row <= reach; row++) {
        const half = Math.floor(Math.sqrt(Math.max(0, radius * radius - row * row)));
        context.fillRect(centreX - half, centreY + row, half * 2 + 1, 1);
    }
}

// A slim neck swells into the shoulders, then tapers away to the tail.
function bodyRadius(index: number) {
    const along = index / (SEGMENTS - 1);
    const shoulders = 1.1 + 0.8 * Math.sin((Math.min(1, along / 0.35) * Math.PI) / 2);
    return Math.max(0.5, shoulders * (1 - Math.pow(along, 2.2)));
}

// Face along the body at this point, so fins and legs stick out square to the spine.
function facing(points: Point[], index: number) {
    const ahead = points[Math.max(index - 1, 0)];
    const behind = points[Math.min(index + 1, SEGMENTS - 1)];
    return Math.atan2(ahead.y - behind.y, ahead.x - behind.x);
}

function drawBody(context: CanvasRenderingContext2D, points: Point[], time: number) {
    context.fillStyle = INK;
    for (let index = SEGMENTS - 1; index >= 0; index--) disc(context, points[index].x, points[index].y, bodyRadius(index) + 1);

    for (let index = SEGMENTS - 1; index >= 0; index--) {
        context.fillStyle = Math.floor(index / 2) % 2 ? SHADE : BODY;
        disc(context, points[index].x, points[index].y, bodyRadius(index));
    }

    points.forEach((point, index) => {
        const angle = facing(points, index);
        const sideX = -Math.sin(angle);
        const sideY = Math.cos(angle);
        const radius = bodyRadius(index);
        if (index % 2 === 0) {
            context.fillStyle = index % 6 === 0 ? GOLD : LIGHT;
            context.fillRect(Math.round(point.x), Math.round(point.y), 1, 1);
        }
        if (index > 1 && index % 3 === 0) {
            const reach = radius + 1.2 + Math.sin(time * 6 + index) * 0.4;
            context.fillStyle = LIGHT;
            [-1, 1].forEach((side) => context.fillRect(Math.round(point.x + sideX * reach * side), Math.round(point.y + sideY * reach * side), 1, 1));
        }
        if (index === 4 || index === 12) {
            [-1, 1].forEach((side) => {
                const swing = Math.sin(time * 7 + index + side) * 1;
                for (let step = 1; step <= 3; step++) {
                    context.fillStyle = step === 3 ? GOLD : INK;
                    const out = radius + step;
                    context.fillRect(
                        Math.round(point.x + sideX * out * side - Math.cos(angle) * (swing + step * 0.5)),
                        Math.round(point.y + sideY * out * side - Math.sin(angle) * (swing + step * 0.5)),
                        1,
                        1,
                    );
                }
            });
        }
    });

    const tail = points[SEGMENTS - 1];
    const tailAngle = facing(points, SEGMENTS - 1) + Math.PI;
    for (let spread = -1; spread <= 1; spread++) {
        for (let step = 1; step <= 4; step++) {
            const angle = tailAngle + spread * 0.42 + Math.sin(time * 6 + step * 0.4) * 0.16;
            context.fillStyle = step > 2 ? GOLD : LIGHT;
            context.fillRect(Math.round(tail.x + Math.cos(angle) * step), Math.round(tail.y + Math.sin(angle) * step), 1, 1);
        }
    }
}

// Rotate by sampling the bitmap for each screen pixel, which keeps every edge a hard pixel.
function drawHead(context: CanvasRenderingContext2D, head: Point, angle: number, time: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const originX = Math.round(head.x);
    const originY = Math.round(head.y);

    [-1, 1].forEach((side) => {
        context.fillStyle = LIGHT;
        for (let step = 1; step <= 8; step++) {
            const localX = 5 - step * 1.1;
            const localY = side * (2 + step * 0.5 + Math.sin(time * 5 + step * 0.5) * step * 0.1);
            context.fillRect(Math.round(originX + localX * cos - localY * sin), Math.round(originY + localX * sin + localY * cos), 1, 1);
        }
    });

    for (let y = -8; y <= 8; y++) {
        for (let x = -8; x <= 8; x++) {
            const cell = HEAD[Math.round(-x * sin + y * cos) + HEAD_ANCHOR.row]?.[Math.round(x * cos + y * sin) + HEAD_ANCHOR.column];
            if (!cell || cell === ".") continue;
            context.fillStyle = HEAD_COLOURS[cell];
            context.fillRect(originX + x, originY + y, 1, 1);
        }
    }
}

/** A small pixel dragon that snakes after the cursor and breathes sparks on a click, but leaves the hero to itself. */
export function PixelDragon() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext("2d");
        if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        let points: Point[] = [];
        let embers: Ember[] = [];
        let target = { x: 0, y: 0 };
        let cursor: Point | null = null;
        let leaving = false;
        let angle = Math.PI;
        let speed = 0;
        let idle = 0;
        let frame = 0;
        let lastTime = 0;

        const hero = document.querySelector(".hero-linework");

        // The whole band counts, so the dragon cannot sit in the side margins beside the hero.
        const cursorInHero = () => {
            const bounds = hero?.getBoundingClientRect();
            return Boolean(cursor && bounds && cursor.y * PIXEL >= bounds.top && cursor.y * PIXEL < bounds.bottom);
        };

        const fit = () => {
            canvas.width = Math.ceil(window.innerWidth / PIXEL);
            canvas.height = Math.ceil(window.innerHeight / PIXEL);
        };

        const fly = (time: number, seconds: number) => {
            const head = points[0];
            const deltaX = target.x - head.x;
            const deltaY = target.y - head.y;
            const distance = Math.hypot(deltaX, deltaY);
            const circling = !leaving && distance < 20;
            const wanted = Math.atan2(deltaY, deltaX) + (circling ? 1.45 : 0);
            const turn = Math.atan2(Math.sin(wanted - angle), Math.cos(wanted - angle));
            const maxTurn = (circling ? 1.5 : 4.5) * seconds;
            angle += Math.max(-maxTurn, Math.min(maxTurn, turn));

            const settling = Math.max(0, Math.min(1, 1 - (idle - 4) / 5));
            const wantedSpeed = (circling ? 24 : Math.min(300, 60 + distance * 1.8)) * settling;
            speed += (wantedSpeed - speed) * Math.min(1, seconds * 6);

            const heading = angle + Math.sin(time * 8) * Math.min(0.55, speed / 180);
            head.x += Math.cos(heading) * speed * seconds;
            head.y += Math.sin(heading) * speed * seconds;

            for (let index = 1; index < SEGMENTS; index++) {
                const ahead = points[index - 1];
                const point = points[index];
                const gap = Math.hypot(point.x - ahead.x, point.y - ahead.y) || 1;
                point.x = ahead.x + ((point.x - ahead.x) / gap) * SPACING;
                point.y = ahead.y + ((point.y - ahead.y) / gap) * SPACING;
            }
        };

        const drawEmbers = (seconds: number) => {
            embers = embers.filter((ember) => (ember.life -= seconds) > 0);
            embers.forEach((ember) => {
                ember.x += ember.speedX * seconds;
                ember.y += ember.speedY * seconds;
                ember.speedX *= 0.94;
                ember.speedY *= 0.94;
                context.fillStyle = ember.colour;
                context.fillRect(Math.round(ember.x), Math.round(ember.y), ember.life > 0.22 ? 2 : 1, ember.life > 0.22 ? 2 : 1);
            });
        };

        const tick = (now: number) => {
            const time = now / 1000;
            const seconds = Math.min(time - lastTime, 0.05);
            lastTime = time;
            idle = leaving ? 0 : idle + seconds;
            fly(time, seconds);
            if (leaving && points.every((point) => point.x < -20 || point.x > canvas.width + 20)) {
                points = [];
                embers = [];
                leaving = false;
                frame = 0;
                context.clearRect(0, 0, canvas.width, canvas.height);
                return;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            drawBody(context, points, time);
            drawHead(context, points[0], angle, time);
            drawEmbers(seconds);
            frame = idle > REST_AFTER && embers.length === 0 ? 0 : requestAnimationFrame(tick);
        };

        const wake = () => {
            idle = 0;
            if (frame) return;
            lastTime = performance.now() / 1000;
            frame = requestAnimationFrame(tick);
        };

        // Leave by the nearest side while the cursor is over the hero, and fly back in from the edge afterwards.
        const retarget = () => {
            if (!cursor) return;
            if (cursorInHero()) {
                if (points.length === 0 || leaving) return;
                const distanceOut = SEGMENTS * SPACING + 70;
                leaving = true;
                target = { x: points[0].x < canvas.width / 2 ? -distanceOut : canvas.width + distanceOut, y: points[0].y };
                wake();
                return;
            }
            leaving = false;
            target = cursor;
            if (points.length === 0) {
                points = Array.from({ length: SEGMENTS }, (_, index) => ({ x: canvas.width + 12 + index * SPACING, y: target.y }));
            }
            wake();
        };

        const aim = (event: PointerEvent) => {
            cursor = { x: event.clientX / PIXEL, y: event.clientY / PIXEL };
            retarget();
        };

        const breathe = (event: PointerEvent) => {
            aim(event);
            if (leaving || points.length === 0) return;
            const head = points[0];
            for (let count = 0; count < 12; count++) {
                const spread = angle + (Math.random() - 0.5) * 0.9;
                const velocity = 50 + Math.random() * 80;
                embers.push({
                    x: head.x + Math.cos(angle) * 6,
                    y: head.y + Math.sin(angle) * 6,
                    speedX: Math.cos(spread) * velocity,
                    speedY: Math.sin(spread) * velocity,
                    life: 0.35 + Math.random() * 0.4,
                    colour: [GOLD, GOLD, LIGHT, PEARL][count % 4],
                });
            }
        };

        fit();
        window.addEventListener("resize", fit);
        window.addEventListener("pointermove", aim, { passive: true });
        window.addEventListener("pointerdown", breathe, { passive: true });
        window.addEventListener("scroll", retarget, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("resize", fit);
            window.removeEventListener("pointermove", aim);
            window.removeEventListener("pointerdown", breathe);
            window.removeEventListener("scroll", retarget);
        };
    }, []);

    return <canvas ref={canvasRef} className="pixel-dragon" aria-hidden="true" />;
}
