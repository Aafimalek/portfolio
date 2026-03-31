"use client";
import React, { useState, useEffect } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
    IconBrandGithub,
    IconBrandX,
    IconExchange,
    IconHome,
    IconNewSection,
    IconTerminal2,
    IconUser,
    IconBriefcase,
    IconSchool,
    IconMail,
    IconCode,
    IconSun,
    IconMoon,
    IconRocket,
    IconArticle
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

export const Navbar = () => {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    };

    const links = [
        {
            title: "Home",
            icon: (
                <IconHome className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#",
        },
        {
            title: "About",
            icon: (
                <IconUser className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#about",
        },
        {
            title: "Skills",
            icon: (
                <IconCode className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#skills",
        },
        {
            title: "Products",
            icon: (
                <IconRocket className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#products",
        },
        {
            title: "Projects",
            icon: (
                <IconBriefcase className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#projects",
        },
        {
            title: "Blogs",
            icon: (
                <IconArticle className="h-full w-full text-neutral-600 dark:text-neutral-300" />
            ),
            href: "#blogs",
        },
        {
            title: "Education",
            icon: (
                <IconSchool className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#education",
        },
        {
            title: "Get in Touch",
            icon: (
                <IconMail className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            href: "#contact",
        },
        {
            title: mounted && resolvedTheme === "dark" ? "Light Mode" : "Dark Mode",
            icon: mounted && resolvedTheme === "dark" ? (
                <IconSun className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ) : (
                <IconMoon className="h-full w-full text-neutral-600 dark:text-neutral-300 dark:text-neutral-300" />
            ),
            onClick: toggleTheme,
        },
    ];

    return (
        <div className="flex items-center justify-center fixed bottom-10 inset-x-0 z-[5000]">
            <FloatingDock
                items={links}
            />
        </div>
    );
};
