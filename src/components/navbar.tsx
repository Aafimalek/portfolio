"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useTheme } from "next-themes";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const navItems = [
    { title: "Open Source", href: "#open-source" },
    { title: "Tech Stack", href: "#skills" },
    { title: "About", href: "#about" },
    { title: "Products", href: "#products" },
    { title: "Projects", href: "#projects" },
    { title: "Blog", href: "#blogs" },
    { title: "Contact", href: "#contact" },
];

// Render the persistent section navigation and the existing theme control.
export const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
    const isDark = mounted && resolvedTheme === "dark";
    const [hovered, setHovered] = useState<string | null>(null);
    const [active, setActive] = useState<string | null>(null);
    const [tone, setTone] = useState<"sky" | "night" | undefined>();
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 180, damping: 32, mass: 0.3 });
    const highlighted = hovered ?? active;

    // Mark the section crossing the middle of the screen, at most once per frame.
    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const line = window.innerHeight * 0.45;
            const current = navItems.find((item) => {
                const bounds = document.querySelector(item.href)?.getBoundingClientRect();
                return bounds && bounds.top <= line && bounds.bottom > line;
            });
            setActive(current?.href ?? null);
            const heroBottom = document.querySelector(".hero-linework")?.getBoundingClientRect().bottom ?? 0;
            const footerTop = document.getElementById("site-footer")?.getBoundingClientRect().top ?? Infinity;
            setTone(heroBottom > 28 ? "sky" : footerTop < 28 ? "night" : undefined);
        };
        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    return (
        <header className="glass-header fixed inset-x-0 top-0 z-[5000]" data-tone={tone}>
            <nav className="site-nav mx-auto h-14 w-full max-w-[64rem] border-x border-[var(--line-soft)]">
                <a
                    href="#"
                    className="pixel-brand flex h-full w-full items-center justify-center border-r border-[var(--line-soft)] text-sm font-black tracking-tight"
                    aria-label="Aafi Malek home"
                >
                    AM
                </a>
                <div className="nav-main flex min-w-0 items-center overflow-x-auto" onMouseLeave={() => setHovered(null)}>
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            aria-current={active === item.href ? "location" : undefined}
                            onMouseEnter={() => setHovered(item.href)}
                            className="nav-cell relative whitespace-nowrap border-r border-[var(--line-soft)] px-3 py-5 text-xs font-semibold text-neutral-600 transition-colors hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white sm:px-4"
                        >
                            {highlighted === item.href && (
                                <motion.span
                                    layoutId="nav-glass"
                                    className="nav-glass"
                                    aria-hidden="true"
                                    transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
                                />
                            )}
                            <span className="relative">{item.title}</span>
                        </a>
                    ))}
                </div>
                <button
                    type="button"
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="flex h-full w-full items-center justify-center border-l border-[var(--line-soft)] text-neutral-700 transition-colors hover:bg-[var(--module-hover)] dark:text-neutral-200"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={isDark ? "sun" : "moon"}
                            initial={{ rotate: -60, scale: 0.6, opacity: 0 }}
                            animate={{ rotate: 0, scale: 1, opacity: 1 }}
                            exit={{ rotate: 60, scale: 0.6, opacity: 0 }}
                            transition={{ duration: 0.16 }}
                        >
                            {isDark ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
                        </motion.span>
                    </AnimatePresence>
                </button>
            </nav>
            <motion.div className="nav-progress" style={{ scaleX: progress }} aria-hidden="true" />
        </header>
    );
};
