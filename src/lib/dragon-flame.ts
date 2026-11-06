type Flame = { x: number; y: number; angle: number; reach: number };
type Burning = { x: number; y: number; speedX: number; speedY: number; age: number };
type Flake = { x: number; y: number; speedX: number; speedY: number; age: number; life: number; colour: string };

const BURN_TIME = 1.25;
const FLAME_WIDTH = 0.42;
const CLOSE_RANGE = 14;
const COOLING = ["#fff4c2", "#ffd166", "#ffa62b", "#f3722c", "#7a2b16", "#2b2320"];
const ASH = ["#8a8580", "#5f5a56", "#b5afa9"];

let flame: Flame | null = null;

// The dragon publishes its flame here in screen pixels, so anything on the page can react to it.
export const setFlame = (next: Flame | null) => {
    flame = next;
};

export const flameActive = () => flame !== null;

export function inFlame(x: number, y: number) {
    if (!flame) return false;
    const deltaX = x - flame.x;
    const deltaY = y - flame.y;
    const distance = Math.hypot(deltaX, deltaY);
    if (distance > flame.reach) return false;
    if (distance < CLOSE_RANGE) return true;
    const offset = Math.atan2(deltaY, deltaX) - flame.angle;
    return Math.abs(Math.atan2(Math.sin(offset), Math.cos(offset))) < FLAME_WIDTH;
}

/** Burn birds on a canvas: each one catches, tumbles down shedding sparks, then crumbles into ash. */
export function createBurns(size: number) {
    let burning: Burning[] = [];
    let flakes: Flake[] = [];

    const shed = (x: number, y: number, colour: string, life: number, spread: number) => {
        flakes.push({ x, y, speedX: (Math.random() - 0.5) * spread, speedY: (Math.random() - 0.7) * spread, age: 0, life, colour });
    };

    return {
        ignite(x: number, y: number, speedX: number, speedY: number) {
            burning.push({ x, y, speedX: speedX * 0.4, speedY: speedY * 0.4 - 14, age: 0 });
            for (let count = 0; count < 7; count++) shed(x, y, COOLING[count % 3], 0.35 + Math.random() * 0.3, 46);
        },
        step(context: CanvasRenderingContext2D, seconds: number) {
            burning = burning.filter((bird) => {
                bird.age += seconds;
                if (bird.age < BURN_TIME) return true;
                for (let count = 0; count < 8; count++) shed(bird.x, bird.y, ASH[count % ASH.length], 1 + Math.random() * 0.9, 16);
                return false;
            });

            burning.forEach((bird) => {
                const progress = bird.age / BURN_TIME;
                bird.speedY += 66 * seconds;
                bird.speedX *= Math.pow(0.4, seconds);
                bird.x += bird.speedX * seconds + Math.sin(bird.age * 13) * 0.3;
                bird.y += bird.speedY * seconds;
                if (Math.random() < seconds * 26) shed(bird.x, bird.y, COOLING[1 + Math.floor(Math.random() * 3)], 0.3 + Math.random() * 0.35, 18);

                context.fillStyle = COOLING[Math.min(COOLING.length - 1, Math.floor(progress * COOLING.length))];
                context.fillRect(Math.round(bird.x), Math.round(bird.y), size, size);
                if (progress > 0.75) return;
                context.fillStyle = Math.random() < 0.5 ? COOLING[1] : COOLING[2];
                context.fillRect(Math.round(bird.x + (Math.random() - 0.5) * 2 * size), Math.round(bird.y - size - Math.random() * size), size, size);
            });

            flakes = flakes.filter((flake) => (flake.age += seconds) < flake.life);
            flakes.forEach((flake) => {
                flake.speedX *= Math.pow(0.3, seconds);
                flake.speedY += 12 * seconds;
                flake.x += flake.speedX * seconds;
                flake.y += flake.speedY * seconds;
                context.globalAlpha = 1 - flake.age / flake.life;
                context.fillStyle = flake.colour;
                context.fillRect(Math.round(flake.x), Math.round(flake.y), Math.max(1, size - 1), Math.max(1, size - 1));
            });
            context.globalAlpha = 1;
        },
    };
}
