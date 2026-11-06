"use client";

import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

type MarkProps = { children: string };

// Reveal a mark once, the first time it scrolls into view.
function useDrawn() {
    const ref = useRef<HTMLSpanElement>(null);
    const [drawn, setDrawn] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;
            setDrawn(true);
            observer.disconnect();
        }, { threshold: 0.8, rootMargin: "0px 0px -12% 0px" });
        observer.observe(element);
        return () => observer.disconnect();
    }, []);

    return { ref, drawn };
}

// Marks are CSS masks rather than elements, so they add nothing to the text people read or copy.
const maskOf = (name: string, svg: string) => ({ [name]: `url("data:image/svg+xml,${encodeURIComponent(svg)}")` }) as CSSProperties;

const lettersOf = (text: string, index: number) => text.charCodeAt(index % text.length);

// Draw an uneven wave whose peaks vary with the letters, so no two underlines match.
function wave(text: string) {
    const waves = Math.max(3, Math.round(text.length * 1.05));
    let path = "M0 4.2";
    for (let index = 0; index < waves; index++) {
        const code = lettersOf(text, index);
        const height = 2.3 + (code % 7) * 0.22;
        const direction = index % 2 === 0 ? -1 : 1;
        const x = index * 6;
        path += ` Q${x + 3} ${(4 + direction * height).toFixed(2)} ${x + 6} ${(4 + ((code % 3) - 1) * 0.35).toFixed(2)}`;
    }
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 -1 ${waves * 6} 10' preserveAspectRatio='none'><path d='${path}' fill='none' stroke='black' stroke-width='1.6' stroke-linecap='round' vector-effect='non-scaling-stroke'/></svg>`;
}

// Trace a dry brush stroke, with ragged edges and ends that thin out where the bristles lift.
function brush(text: string) {
    const steps = Math.max(10, Math.round(text.length * 2));
    const top: string[] = [];
    const bottom: string[] = [];
    for (let index = 0; index <= steps; index++) {
        const code = lettersOf(text, index);
        const x = (index / steps) * 100;
        const taper = 0.72 + 0.28 * Math.min(1, Math.min(index, steps - index) / 2);
        top.push(`${x.toFixed(1)} ${(10 - taper * (8.2 + (code % 5) * 0.4)).toFixed(1)}`);
        bottom.push(`${x.toFixed(1)} ${(10 + taper * (8 + ((code * 3) % 5) * 0.44)).toFixed(1)}`);
    }
    const path = `M${[...top, ...bottom.reverse()].join(" L")}Z`;
    return `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 20' preserveAspectRatio='none'><path d='${path}'/></svg>`;
}

// One quick pen loop that overshoots where it started, the way a person circles a number.
const LOOP = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 44' preserveAspectRatio='none'><path d='M56 5 C24 2 4 10 4 23 C5 37 34 41 60 40 C84 39 97 31 96 19 C94 7 68 2 36 7' fill='none' stroke='black' stroke-width='1.7' stroke-linecap='round' vector-effect='non-scaling-stroke'/></svg>";

/** Underline a phrase with a hand-drawn wavy line that draws itself in. */
export function Squiggle({ children }: MarkProps) {
    const { ref, drawn } = useDrawn();
    return <span ref={ref} data-mark="squiggle" data-drawn={drawn} style={maskOf("--wave", wave(children))}>{children}</span>;
}

/** Sweep a bold marker stroke behind a whole phrase. */
export function Highlight({ children }: MarkProps) {
    const { ref, drawn } = useDrawn();
    return <span ref={ref} data-mark="highlight" data-drawn={drawn} style={maskOf("--brush", brush(children))}>{children}</span>;
}

/** Circle a key figure with a single pen loop. */
export function Circled({ children }: MarkProps) {
    const { ref, drawn } = useDrawn();
    return <span ref={ref} data-mark="circle" data-drawn={drawn} style={maskOf("--loop", LOOP)}>{children}</span>;
}

/** Render a string, turning ~phrase~ into a squiggle, ==phrase== into a brush stroke and ((phrase)) into a circle. */
export function Marked({ text }: { text: string }) {
    const parts: ReactNode[] = text.split(/(~[^~]+~|==[^=]+==|\(\([^)]+\)\))/).map((part, index) => {
        if (part.startsWith("~")) return <Squiggle key={index}>{part.slice(1, -1)}</Squiggle>;
        if (part.startsWith("==")) return <Highlight key={index}>{part.slice(2, -2)}</Highlight>;
        if (part.startsWith("((")) return <Circled key={index}>{part.slice(2, -2)}</Circled>;
        return <Fragment key={index}>{part}</Fragment>;
    });
    return <>{parts}</>;
}
