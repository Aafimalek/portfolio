import { layoutNextLine, prepareWithSegments, type LayoutCursor, type PreparedTextWithSegments } from "@chenglou/pretext";

export type Body = { x: number; y: number; radius: number };
export type TextFlow = { update: (bodies: Body[]) => void; clear: () => void; destroy: () => void };

const EXCLUDED = ".hero-linework, .glass-header, .text-flow, svg, script, style, noscript, iframe, video, textarea, select";
const ATTEMPTS = [
    { gap: 10, stretch: 1 },
    { gap: 5, stretch: 1 },
    { gap: 3, stretch: 1.06 },
    { gap: 2, stretch: 1.12 },
];
const TIGHTEST = ATTEMPTS[ATTEMPTS.length - 1];
const MIN_SLOT = 34;
const WAKE_REACH = 46;
const WAKE_PUSH = 6;
const SPRING = 250;
const DAMPING = 27;
const WRAP_DISTANCE = 90;
const WRAP_SLIDE = 14;
const REFRESH_MS = 700;
const STARTS_PER_FRAME = 6;
const NON_BREAKING_SPACE = " ";
const FIRST_CURSOR: LayoutCursor = { segmentIndex: 0, graphemeIndex: 0 };

type Box = { left: number; top: number; width: number; rows: number; lineHeight: number };
type Line = { text: string; x: number; row: number; scale: number; width: number; whole: boolean };
type Spot = { x: number; y: number };
type Character = [Text, number];
type Mark = { start: number; end: number; node: HTMLElement };
type Token = { text: string; start: number; mark?: HTMLElement; joined: boolean; width: number };
type Word = { node: HTMLSpanElement; x: number; y: number; speedX: number; speedY: number; scale: number; fade: number; targetX: number; targetY: number; targetScale: number; spring: number };
type Target = { element: HTMLElement; nodes: Text[]; left: number; top: number; right: number; bottom: number };
type Flow = {
    element: HTMLElement;
    layer: HTMLDivElement;
    text: string;
    tokens: Token[];
    words: Word[];
    spaceWidth: number;
    prepared: PreparedTextWithSegments;
    offset: { left: number; top: number };
    width: number;
    rows: number;
    centred: boolean;
    lineHeight: number;
    rest: Spot[];
};

const fontOf = (style: CSSStyleDeclaration) => `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;

// Walk up from a text node to the block that owns it. Inline pieces styled differently stay as their own block.
function ownerOf(node: Text) {
    let owner = node.parentElement as HTMLElement;
    while (owner.parentElement) {
        const style = getComputedStyle(owner);
        if (style.display !== "inline" && style.display !== "inline-block") break;
        const parent = owner.parentElement;
        const parentStyle = getComputedStyle(parent);
        // An inline opacity is a reveal animation, which says nothing about how the text is styled.
        const matches = fontOf(style) === fontOf(parentStyle) && style.color === parentStyle.color && (style.opacity === "1" || owner.style.opacity !== "");
        if (!owner.dataset.mark && !matches) break;
        owner = parent;
    }
    return owner;
}

// Find every piece of visible text on the page, apart from the areas that are left alone.
function discover(root: Element) {
    root.querySelectorAll<HTMLElement>("[data-flow]").forEach((element) => delete element.dataset.flow);
    const owners = new Map<HTMLElement, Text[]>();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
        const node = walker.currentNode as Text;
        if (!node.nodeValue || !node.parentElement || node.parentElement.closest(EXCLUDED)) continue;
        const owner = ownerOf(node);
        // A blank node between two words is the space separating them, so it stays with its text.
        if (!node.nodeValue.trim() && !owners.has(owner)) continue;
        owner.dataset.flow = "";
        owners.set(owner, [...(owners.get(owner) ?? []), node]);
    }
    return [...owners].map(([element, nodes]): Target => ({ element, nodes, left: 0, top: 0, right: 0, bottom: 0 }));
}

// Join the owner's text into one string, gluing each marked phrase so it can never wrap apart.
function readText(nodes: Text[], transform: string) {
    let text = "";
    const marks: Mark[] = [];
    const characters: Character[] = [];
    const push = (character: string, node: Text, offset: number) => {
        text += character;
        characters.push([node, offset]);
    };

    nodes.forEach((node) => {
        const mark = node.parentElement?.closest<HTMLElement>("[data-mark]") ?? null;
        const value = node.nodeValue ?? "";
        if (node.previousSibling?.nodeName === "BR" && text !== "" && !/\s$/.test(text)) push(" ", node, 0);
        const start = text.length;
        for (let offset = 0; offset < value.length; offset++) {
            if (!/\s/.test(value[offset])) push(value[offset], node, offset);
            else if (text !== "" && !/\s$/.test(text)) push(mark ? NON_BREAKING_SPACE : " ", node, offset);
        }
        if (mark) marks.push({ start, end: text.length, node: mark });
    });

    const trimmed = text.trimEnd();
    if (transform === "lowercase") return { text: trimmed.toLowerCase(), marks, characters };
    if (transform === "uppercase") return { text: trimmed.toUpperCase(), marks, characters };
    return { text: trimmed, marks, characters };
}

// Cut the text at every place a line could break, so each piece always stays on one line.
function tokenize(text: string, marks: Mark[], measure: (value: string) => number) {
    const tokens: Token[] = [];
    let index = 0;
    while (index < text.length) {
        if (text[index] === " ") {
            index += 1;
            continue;
        }
        const mark = marks.find((candidate) => candidate.start === index);
        let end = mark ? mark.end : index;
        while (!mark && end < text.length && text[end] !== " ") {
            const character = text[end];
            end += 1;
            if ((character === "-" || character === "/") && end < text.length && text[end] !== " ") break;
            if (marks.some((candidate) => candidate.start === end)) break;
        }
        const piece = text.slice(index, end);
        tokens.push({ text: piece, start: index, mark: mark?.node, joined: end < text.length && text[end] !== " ", width: measure(piece) });
        index = end;
    }
    return tokens;
}

// Find the free spaces in one row. Each body is a circle, so the cut follows its curve through the row.
function freeSlots(box: Box, row: number, bodies: Body[], gap: number) {
    const top = box.top + row * box.lineHeight;
    const bottom = top + box.lineHeight;
    const blocked: number[][] = [];
    bodies.forEach((body) => {
        const reach = body.radius + gap;
        const distance = body.y < top ? top - body.y : body.y > bottom ? body.y - bottom : 0;
        if (distance >= reach) return;
        const half = Math.sqrt(reach * reach - distance * distance);
        blocked.push([body.x - half - box.left, body.x + half - box.left]);
    });
    blocked.sort((first, second) => first[0] - second[0]);

    const slots: number[][] = [];
    let from = 0;
    blocked.forEach(([start, end]) => {
        if (start > from) slots.push([from, Math.min(start, box.width)]);
        from = Math.max(from, end);
    });
    if (from < box.width) slots.push([from, box.width]);
    return slots.filter(([start, end]) => end - start >= MIN_SLOT);
}

// Pour the text into the free slots row by row, or report that it no longer fits inside its box.
// A stretch above 1 fits slightly more into a slot, and that line is condensed to match while the dragon passes.
function route(prepared: PreparedTextWithSegments, box: Box, bodies: Body[], gap: number, stretch: number, clearRows: number) {
    const lines: Line[] = [];
    let cursor = FIRST_CURSOR;

    for (let row = 0; row < box.rows; row++) {
        const isClear = row >= box.rows - clearRows;
        const slots = isClear ? [[0, box.width]] : freeSlots(box, row, bodies, gap);
        for (const [start, end] of slots) {
            const width = end - start;
            const line = layoutNextLine(prepared, width * stretch, cursor);
            if (!line) return lines;
            const splitsWord = line.end.graphemeIndex > 0 || line.width > width * stretch + 0.5;
            if (splitsWord && !isClear) continue;
            lines.push({ text: line.text, x: start, row, scale: Math.min(1, width / line.width), width: line.width, whole: width === box.width });
            cursor = line.end;
        }
    }
    return layoutNextLine(prepared, box.width * stretch, cursor) ? null : lines;
}

// Part the text as widely as it can bear. Null means the words stay where the browser set them.
function arrange(prepared: PreparedTextWithSegments, box: Box, bodies: Body[]) {
    let blocked = false;
    for (let row = 0; row < box.rows && !blocked; row++) {
        const slots = freeSlots(box, row, bodies, ATTEMPTS[0].gap);
        blocked = slots.length !== 1 || slots[0][0] > 0 || slots[0][1] < box.width;
    }
    if (!blocked) return null;

    for (const { gap, stretch } of ATTEMPTS) {
        const lines = route(prepared, box, bodies, gap, stretch, 0);
        if (lines) return lines;
    }
    for (let clearRows = 1; clearRows < box.rows; clearRows++) {
        const lines = route(prepared, box, bodies, TIGHTEST.gap, TIGHTEST.stretch, clearRows);
        if (lines) return lines;
    }
    return null;
}

// Turn laid-out lines into a target position for every word.
function assignTargets(flow: Flow, lines: Line[], box: Box) {
    let position = 0;
    let index = 0;
    lines.forEach((line) => {
        const lineEnd = position + line.text.length;
        const first = index;
        while (index < flow.tokens.length && flow.tokens[index].start < lineEnd) index += 1;

        let natural = 0;
        for (let token = first; token < index; token++) {
            natural += flow.tokens[token].width + (token < index - 1 && !flow.tokens[token].joined ? flow.spaceWidth : 0);
        }
        const fit = natural > 0 && Math.abs(line.width / natural - 1) < 0.08 ? line.width / natural : 1;
        const centring = flow.centred && line.whole ? (box.width - line.width) / 2 : 0;

        let offset = 0;
        for (let token = first; token < index; token++) {
            const word = flow.words[token];
            word.targetX = line.x + centring + offset * fit * line.scale;
            word.targetY = line.row * box.lineHeight;
            word.targetScale = line.scale * fit;
            offset += flow.tokens[token].width + (flow.tokens[token].joined ? 0 : flow.spaceWidth);
        }

        position = lineEnd;
        while (flow.text[position] === " ") position += 1;
    });
}

// Send every word back to the spot the browser gave it.
function assignRest(flow: Flow) {
    flow.words.forEach((word, index) => {
        word.targetX = flow.rest[index].x;
        word.targetY = flow.rest[index].y;
        word.targetScale = 1;
    });
}

// Nudge words near the body away from it, so the text bends around the dragon instead of being cut.
function addWake(flow: Flow, box: Box, bodies: Body[]) {
    flow.words.forEach((word, index) => {
        const centreX = box.left + word.targetX + flow.tokens[index].width / 2;
        const centreY = box.top + word.targetY + box.lineHeight / 2;
        let nearest = Infinity;
        let awayX = 0;
        let awayY = 0;
        bodies.forEach((body) => {
            const deltaX = centreX - body.x;
            const deltaY = centreY - body.y;
            const distance = deltaX * deltaX + deltaY * deltaY;
            if (distance >= nearest) return;
            nearest = distance;
            awayX = deltaX;
            awayY = deltaY;
        });
        if (nearest === Infinity) return;
        const distance = Math.sqrt(nearest) || 1;
        const push = WAKE_PUSH * Math.exp(-((distance / WAKE_REACH) ** 2));
        word.targetX += (awayX / distance) * push;
        word.targetY += (awayY / distance) * push;
    });
}

/** Let bodies swim through all page text. Words ride springs, and the real text stays in the page for links and screen readers. */
export function createTextFlow(layer: HTMLElement): TextFlow {
    const root = layer.closest("main") ?? document.body;
    const flows = new Map<HTMLElement, Flow>();
    const cache = new WeakMap<HTMLElement, { key: string; prepared: PreparedTextWithSegments }>();
    const context = document.createElement("canvas").getContext("2d");
    let targets: Target[] = [];
    let stale = true;
    let bodies: Body[] = [];
    let lastMeasure = -Infinity;
    let lastTime = 0;
    let frame = 0;
    const wakeRef = { current: () => undefined as void };

    // Rediscover text when the page itself changes, such as opening "see more", but not for our own overlay.
    const watcher = new MutationObserver((records) => {
        if (records.some((record) => !layer.contains(record.target))) stale = true;
    });
    watcher.observe(root, { childList: true, subtree: true, characterData: true });

    // Words copy their colour when they start, so a theme change restarts them with the new one.
    const themeWatcher = new MutationObserver(() => {
        [...flows.values()].forEach(stop);
        wakeRef.current();
    });
    themeWatcher.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    // Bounds are cached against the page, so most frames do no DOM measuring at all.
    const measureTargets = () => {
        if (stale) {
            targets = discover(root);
            stale = false;
        }
        targets.forEach((target) => {
            const bounds = target.element.getBoundingClientRect();
            target.left = bounds.left + window.scrollX;
            target.top = bounds.top + window.scrollY;
            target.right = bounds.right + window.scrollX;
            target.bottom = bounds.bottom + window.scrollY;
        });
    };

    const start = ({ element, nodes }: Target) => {
        const computed = getComputedStyle(element);
        const font = fontOf(computed);
        const { text, marks, characters } = readText(nodes, computed.textTransform);
        const key = `${font}|${text}`;
        let entry = cache.get(element);
        if (entry?.key !== key) {
            entry = { key, prepared: prepareWithSegments(text, font) };
            cache.set(element, entry);
        }

        if (context) {
            context.font = font;
            context.letterSpacing = computed.letterSpacing === "normal" ? "0px" : computed.letterSpacing;
        }
        const measure = (value: string) => context?.measureText(value).width ?? 0;
        const lineHeight = parseFloat(computed.lineHeight) || parseFloat(computed.fontSize) * 1.2;

        // Measure the text itself, because labels often sit beside an icon inside their element.
        const range = document.createRange();
        range.setStart(nodes[0], 0);
        range.setEnd(nodes[nodes.length - 1], nodes[nodes.length - 1].length);
        const rects = [...range.getClientRects()].filter((rect) => rect.width > 0);
        const bounds = element.getBoundingClientRect();
        const first = rects[0] ?? bounds;
        const textTop = Math.min(...rects.map((rect) => rect.top), first.top);
        const textLeft = Math.min(...rects.map((rect) => rect.left), first.left);
        const textRight = Math.max(...rects.map((rect) => rect.right), first.right);
        const paddingLeft = parseFloat(computed.paddingLeft);
        const contentRight = bounds.right - parseFloat(computed.paddingRight);
        const isLeftAligned = computed.textAlign === "left" || computed.textAlign === "start";

        // The browser has already set this text, so read where every word really is.
        const tokens = tokenize(text, marks, measure);
        const spots = tokens.map((token) => {
            const first = characters[token.start];
            const last = characters[token.start + token.text.length - 1];
            range.setStart(first[0], first[1]);
            range.setEnd(last[0], last[1] + 1);
            return [...range.getClientRects()].find((rect) => rect.width > 0) ?? first[0].parentElement?.getBoundingClientRect() ?? bounds;
        });
        const rowTops = spots.map((rect) => rect.top + rect.height / 2).sort((one, two) => one - two);
        const rows = rowTops.filter((value, index) => index === 0 || value - rowTops[index - 1] > lineHeight * 0.5).length;

        const sitsBesideIcon = computed.display.includes("flex");
        const left = rows > 1 ? bounds.left + paddingLeft : textLeft;
        const multiRowWidth = sitsBesideIcon ? textRight - left + 1 : contentRight - left;
        const width = rows > 1 ? multiRowWidth : Math.max(textRight - textLeft + 2, isLeftAligned ? contentRight - left : 0);
        const top = textTop - (lineHeight - first.height) / 2;
        const rest = spots.map((rect) => ({ x: rect.left - left, y: rect.top + rect.height / 2 - lineHeight / 2 - top }));

        const flowLayer = document.createElement("div");
        flowLayer.style.cssText = `position:absolute;left:0;top:0;font:${font};line-height:${lineHeight}px;color:${computed.color};opacity:${computed.opacity};letter-spacing:${computed.letterSpacing};text-shadow:${computed.textShadow}`;
        const words = tokens.map((token): Word => {
            const node = document.createElement("span");
            node.className = "text-flow-word";
            if (token.mark) node.append(token.mark.cloneNode(true));
            else node.textContent = token.text;
            flowLayer.append(node);
            return { node, x: 0, y: 0, speedX: 0, speedY: 0, scale: 1, fade: 1, targetX: 0, targetY: 0, targetScale: 1, spring: SPRING * (0.82 + Math.random() * 0.36) };
        });

        const flow: Flow = {
            element,
            layer: flowLayer,
            text,
            tokens,
            words,
            spaceWidth: measure(" "),
            prepared: entry.prepared,
            offset: { left: left - bounds.left, top: top - bounds.top },
            width,
            rows,
            centred: rows > 1 && computed.textAlign === "center",
            lineHeight,
            rest,
        };
        flows.set(element, flow);
        return flow;
    };

    const stop = (flow: Flow) => {
        delete flow.element.dataset.flowing;
        flow.layer.remove();
        flows.delete(flow.element);
    };

    const boxOf = (flow: Flow, bounds: DOMRect): Box => ({
        left: bounds.left + window.scrollX + flow.offset.left,
        top: bounds.top + window.scrollY + flow.offset.top,
        width: flow.width,
        rows: flow.rows,
        lineHeight: flow.lineHeight,
    });

    const tick = (now: number) => {
        frame = 0;
        const seconds = Math.min((now - lastTime) / 1000, 1 / 30);
        lastTime = now;
        if (stale || now - lastMeasure > REFRESH_MS) {
            lastMeasure = now;
            measureTargets();
        }

        // All reads come first, so a frame never forces the page to lay out twice.
        const page = bodies.map((body) => ({ x: body.x + window.scrollX, y: body.y + window.scrollY, radius: body.radius }));
        const edge = WAKE_REACH + 12;
        const reachLeft = Math.min(...page.map((body) => body.x)) - edge;
        const reachRight = Math.max(...page.map((body) => body.x)) + edge;
        const reachTop = Math.min(...page.map((body) => body.y)) - edge;
        const reachBottom = Math.max(...page.map((body) => body.y)) + edge;
        const touched = targets.filter((target) => target.right > reachLeft && target.left < reachRight && target.bottom > reachTop && target.top < reachBottom);
        const near = new Set(touched.map((target) => target.element));

        const fresh = touched.filter((target) => !flows.has(target.element)).slice(0, STARTS_PER_FRAME).map(start);
        const pending = touched.some((target) => !flows.has(target.element));
        const origin = layer.getBoundingClientRect();
        const originX = origin.left + window.scrollX;
        const originY = origin.top + window.scrollY;
        const measured = [...flows.values()].map((flow) => ({ flow, box: boxOf(flow, flow.element.getBoundingClientRect()) }));

        let moving = pending;
        measured.forEach(({ flow, box }) => {
            const isNear = near.has(flow.element);
            const lines = isNear ? arrange(flow.prepared, box, page) : null;
            if (lines) assignTargets(flow, lines, box);
            else assignRest(flow);
            if (isNear) addWake(flow, box, page);

            // New flows start exactly where the real text sits, so the hand-over cannot be seen.
            if (fresh.includes(flow)) {
                assignRest(flow);
                flow.words.forEach((word) => {
                    word.x = word.targetX;
                    word.y = word.targetY;
                    word.scale = word.targetScale;
                });
                layer.append(flow.layer);
                flow.element.dataset.flowing = "";
                moving = true;
            }

            let settled = true;
            flow.words.forEach((word) => {
                // A word wrapping to another row fades in there, rather than flying across the paragraph.
                if (Math.abs(word.targetY - word.y) > box.lineHeight * 0.6 && Math.abs(word.targetX - word.x) > WRAP_DISTANCE) {
                    word.x = word.targetX + Math.sign(word.x - word.targetX) * WRAP_SLIDE;
                    word.y = word.targetY;
                    word.speedX = 0;
                    word.speedY = 0;
                    word.fade = 0;
                }
                word.speedX += (word.spring * (word.targetX - word.x) - DAMPING * word.speedX) * seconds;
                word.speedY += (word.spring * (word.targetY - word.y) - DAMPING * word.speedY) * seconds;
                word.x += word.speedX * seconds;
                word.y += word.speedY * seconds;
                word.scale += (word.targetScale - word.scale) * Math.min(1, seconds * 14);
                word.fade = Math.min(1, word.fade + seconds * 7);
                word.node.style.opacity = `${word.fade}`;
                word.node.style.transform = `translate(${word.x}px, ${word.y}px) scaleX(${word.scale})`;
                if (word.fade < 1 || Math.abs(word.targetX - word.x) > 0.2 || Math.abs(word.targetY - word.y) > 0.2 || Math.abs(word.speedX) + Math.abs(word.speedY) > 3) settled = false;
            });
            flow.layer.style.transform = `translate(${box.left - originX}px, ${box.top - originY}px)`;

            if (!settled) moving = true;
            else if (!isNear) stop(flow);
        });

        if (moving) frame = requestAnimationFrame(tick);
    };

    const wake = () => {
        if (frame) return;
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
    };
    wakeRef.current = wake;

    return {
        update(next) {
            bodies = next;
            wake();
        },
        clear() {
            bodies = [];
            wake();
        },
        destroy() {
            cancelAnimationFrame(frame);
            watcher.disconnect();
            themeWatcher.disconnect();
            [...flows.values()].forEach(stop);
        },
    };
}
