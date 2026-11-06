"use client";

import { useEffect, useRef } from "react";

type Lens = { selector: string; bezel: number; shift: number; blur: number; dispersion?: boolean; bottomEdgeOnly?: boolean };

// Bezel is the rim width, shift is how far the rim bends light, and blur frosts the centre, all in pixels.
const LENSES: Lens[] = [
    { selector: ".glass-header", bezel: 24, shift: 12, blur: 6, dispersion: true, bottomEdgeOnly: true },
    { selector: ".hero-links-grid .box-link", bezel: 10, shift: 8, blur: 3, dispersion: true },
    { selector: ".hero-role, .availability", bezel: 8, shift: 7, blur: 2, dispersion: true },
    { selector: ".demo-play", bezel: 13, shift: 11, blur: 2, dispersion: true },
    { selector: ".profile-frame", bezel: 16, shift: 7, blur: 0 },
];

const SVG_NAMESPACE = "http://www.w3.org/2000/svg";

function svgNode(name: string, attributes: Record<string, string | number>) {
    const node = document.createElementNS(SVG_NAMESPACE, name);
    Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, `${value}`));
    return node;
}

// Encode a convex rim: red and green push sampling towards the centre, blue marks the frosted core.
function paintLensMap(width: number, height: number, radius: number, lens: Lens) {
    const step = width * height > 40000 ? 2 : 1;
    const mapWidth = Math.ceil(width / step);
    const mapHeight = Math.ceil(height / step);
    const canvas = document.createElement("canvas");
    canvas.width = mapWidth;
    canvas.height = mapHeight;
    const context = canvas.getContext("2d");
    if (!context) return "";

    const shortSide = Math.min(width, height);
    const bezel = Math.min(lens.bezel, shortSide * 0.42);
    const corner = Math.min(Math.max(radius, bezel), shortSide / 2);
    const image = context.createImageData(mapWidth, mapHeight);

    for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
            const fromCentreX = (x + 0.5) * step - width / 2;
            const fromCentreY = (y + 0.5) * step - height / 2;
            const overX = Math.abs(fromCentreX) - (width / 2 - corner);
            const overY = Math.abs(fromCentreY) - (height / 2 - corner);
            let inset: number;
            let normalX = 0;
            let normalY = 0;
            if (lens.bottomEdgeOnly) {
                inset = height / 2 - fromCentreY;
                normalY = -1;
            } else if (overX > 0 && overY > 0) {
                const length = Math.hypot(overX, overY) || 1;
                inset = corner - length;
                normalX = (-Math.sign(fromCentreX) * overX) / length;
                normalY = (-Math.sign(fromCentreY) * overY) / length;
            } else if (overX > overY) {
                inset = corner - overX;
                normalX = -Math.sign(fromCentreX);
            } else {
                inset = corner - overY;
                normalY = -Math.sign(fromCentreY);
            }
            const edge = Math.min(1, Math.max(0, 1 - inset / bezel));
            const bend = edge * edge;
            const pixel = (y * mapWidth + x) * 4;
            image.data[pixel] = 128 + 127 * bend * normalX;
            image.data[pixel + 1] = 128 + 127 * bend * normalY;
            image.data[pixel + 2] = 255 * (1 - Math.min(1, edge * 1.5));
            image.data[pixel + 3] = 255;
        }
    }
    context.putImageData(image, 0, 0);
    return canvas.toDataURL();
}

// Bend each colour by a slightly different amount, which splits light at the rim like real glass.
function addDispersion(filter: SVGElement, scale: number) {
    const channels = [
        { name: "red", factor: 1.1, row: "1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" },
        { name: "green", factor: 1, row: "0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" },
        { name: "blue", factor: 0.9, row: "0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" },
    ];
    channels.forEach(({ name, factor, row }) => {
        filter.append(
            svgNode("feDisplacementMap", { in: "SourceGraphic", in2: "map", scale: scale * factor, xChannelSelector: "R", yChannelSelector: "G", result: `${name}-bent` }),
            svgNode("feColorMatrix", { in: `${name}-bent`, type: "matrix", values: row, result: name }),
        );
    });
    filter.append(
        svgNode("feBlend", { in: "red", in2: "green", mode: "screen", result: "red-green" }),
        svgNode("feBlend", { in: "red-green", in2: "blue", mode: "screen", result: "bent" }),
    );
}

function createLensFilter(id: string, width: number, height: number, radius: number, lens: Lens) {
    const filter = svgNode("filter", { id, x: 0, y: 0, width, height, filterUnits: "userSpaceOnUse", primitiveUnits: "userSpaceOnUse", "color-interpolation-filters": "sRGB" });
    filter.append(svgNode("feImage", { href: paintLensMap(width, height, radius, lens), x: 0, y: 0, width, height, preserveAspectRatio: "none", result: "map" }));

    const scale = lens.shift * 2;
    if (lens.dispersion) addDispersion(filter, scale);
    else filter.append(svgNode("feDisplacementMap", { in: "SourceGraphic", in2: "map", scale, xChannelSelector: "R", yChannelSelector: "G", result: "bent" }));

    if (lens.blur > 0) {
        const merge = svgNode("feMerge", {});
        merge.append(svgNode("feMergeNode", { in: "bent" }), svgNode("feMergeNode", { in: "centre" }));
        filter.append(
            svgNode("feGaussianBlur", { in: "bent", stdDeviation: lens.blur, result: "soft" }),
            svgNode("feColorMatrix", { in: "map", type: "matrix", values: "0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 1 0 0", result: "core" }),
            svgNode("feComposite", { in: "soft", in2: "core", operator: "in", result: "centre" }),
            merge,
        );
    }
    return filter;
}

// Fit a refractive lens to each glass surface, and keep the soft blur along the bottom of the screen.
export function GlassEffects() {
    const defsRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        const defs = defsRef.current;
        const { userAgentData } = navigator as Navigator & { userAgentData?: { brands: { brand: string }[] } };
        const isChromium = userAgentData?.brands.some(({ brand }) => brand === "Chromium");
        const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
        const wantsSolid = window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
        if (!defs || !isChromium || !hasFinePointer || wantsSolid) return;

        const filters = new Map<string, SVGElement>();
        let frame = 0;

        const fit = () => {
            frame = 0;
            const used = new Set<string>();
            LENSES.forEach((lens, index) => {
                document.querySelectorAll<HTMLElement>(lens.selector).forEach((element) => {
                    resize.observe(element);
                    const width = element.offsetWidth;
                    const height = element.offsetHeight;
                    if (width < 4 || height < 4) return;
                    const radius = Math.round(parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0);
                    const id = `lens-${index}-${width}-${height}-${radius}`;
                    if (!filters.has(id)) {
                        const filter = createLensFilter(id, width, height, radius, lens);
                        filters.set(id, filter);
                        defs.append(filter);
                    }
                    used.add(id);
                    element.style.setProperty("--lens", `url(#${id})`);
                });
            });
            filters.forEach((filter, id) => {
                if (used.has(id)) return;
                filter.remove();
                filters.delete(id);
            });
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(fit);
        };

        const resize = new ResizeObserver(schedule);
        const added = new MutationObserver((records) => {
            if (records.some((record) => !(record.target as Element).closest?.(".text-flow, .lens-defs"))) schedule();
        });
        added.observe(document.body, { childList: true, subtree: true });
        schedule();

        return () => {
            cancelAnimationFrame(frame);
            resize.disconnect();
            added.disconnect();
            filters.forEach((filter) => filter.remove());
        };
    }, []);

    return (
        <>
            <svg ref={defsRef} className="lens-defs" aria-hidden="true" focusable="false" />
            <div className="bottom-blur" aria-hidden="true">
                <span />
                <span />
            </div>
        </>
    );
}
