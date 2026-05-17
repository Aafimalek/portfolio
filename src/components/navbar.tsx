"use client";

import React, { useSyncExternalStore } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";

const subscribe = () => () => undefined;
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

const navItems = [
    { title: "About", href: "#about" },
    { title: "Tech Stack", href: "#skills" },
    { title: "Products", href: "#products" },
    { title: "Projects", href: "#projects" },
    { title: "Blog", href: "#blogs" },
    { title: "Contact", href: "#contact" },
];

export const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
    const isDark = mounted && resolvedTheme === "dark";

    return (
        <header className="fixed inset-x-0 top-0 z-[5000] border-b border-[var(--line-soft)] bg-[var(--page-bg)]/88 backdrop-blur-xl">
            <nav className="site-nav mx-auto h-14 w-full max-w-[64rem] border-x border-[var(--line-soft)]">
                <a
                    href="#"
                    className="pixel-brand flex h-full w-full items-center justify-center border-r border-[var(--line-soft)] text-sm font-black tracking-tight"
                    aria-label="Aafi Malek home"
                >
                    AM
                </a>
                <div className="nav-main flex min-w-0 items-center overflow-x-auto">
                    {navItems.map((item) => (
                        <a
                            key={item.href}
                            href={item.href}
                            className="nav-cell whitespace-nowrap border-r border-[var(--line-soft)] px-3 py-5 text-xs font-semibold text-neutral-600 transition-colors hover:bg-[var(--module-hover)] hover:text-neutral-950 dark:text-neutral-300 dark:hover:text-white sm:px-4"
                        >
                            {item.title}
                        </a>
                    ))}
                </div>
                <button
                    type="button"
                    aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                    className="flex h-full w-full items-center justify-center border-l border-[var(--line-soft)] text-neutral-700 transition-colors hover:bg-[var(--module-hover)] dark:text-neutral-200"
                >
                    {isDark ? <IconSun className="h-4 w-4" /> : <IconMoon className="h-4 w-4" />}
                </button>
            </nav>
        </header>
    );
};
