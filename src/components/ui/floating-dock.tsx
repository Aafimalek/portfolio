"use client";
import { cn } from "@/lib/utils";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import React, { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} className={desktopClassName} />
            <FloatingDockMobile items={items} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute bottom-full mb-3 right-0 flex flex-col gap-2 p-2 bg-neutral-50/95 dark:bg-neutral-900/95 backdrop-blur-md border border-neutral-200 dark:border-neutral-800"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{
                                    opacity: 1,
                                    x: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    x: 20,
                                    transition: {
                                        delay: idx * 0.03,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.03 }}
                            >
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        key={item.title}
                                        onClick={() => setOpen(false)}
                                        className="h-11 w-11 rounded-none bg-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 flex items-center justify-center transition-colors active:scale-95"
                                    >
                                        <div className="h-5 w-5">{item.icon}</div>
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => {
                                            item.onClick?.();
                                            setOpen(false);
                                        }}
                                        key={item.title}
                                        className="h-11 w-11 rounded-none bg-transparent hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 flex items-center justify-center transition-colors active:scale-95"
                                    >
                                        <div className="h-5 w-5">{item.icon}</div>
                                    </button>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.button
                onClick={() => setOpen(!open)}
                whileTap={{ scale: 0.9 }}
                className="h-12 w-12 rounded-none bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800 shadow-lg"
            >
                <motion.div 
                    animate={{ rotate: open ? 45 : 0 }}
                    className="h-5 w-5 bg-neutral-800 dark:bg-neutral-100 rounded-sm"
                />
            </motion.button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href?: string; onClick?: () => void }[];
    className?: string;
}) => {
    const mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-14 gap-4 items-center rounded-none bg-neutral-50/50 dark:bg-neutral-900/50 backdrop-blur-md border border-neutral-200 dark:border-neutral-800 px-4",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer mouseX={mouseX} key={item.title} {...item} />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    onClick,
}: {
    mouseX: any;
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val: number) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    const heightTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);

    const springConfig = { mass: 0.1, stiffness: 150, damping: 12, restDelta: 0.001 };

    const width = useSpring(widthTransform, springConfig);
    const height = useSpring(heightTransform, springConfig);

    const widthIcon = useSpring(widthTransformIcon, springConfig);
    const heightIcon = useSpring(heightTransformIcon, springConfig);

    const [hovered, setHovered] = useState(false);

    const content = (
        <motion.div
            ref={ref}
            style={{ width, height }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="aspect-square rounded-full bg-neutral-200/50 dark:bg-neutral-800/50 flex items-center justify-center relative will-change-transform"
        >
            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{ opacity: 0, y: 4, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: 4, x: "-50%" }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-100 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white border-neutral-200 text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-xs pointer-events-none"
                    >
                        {title}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div
                style={{ width: widthIcon, height: heightIcon }}
                className="flex items-center justify-center"
            >
                {icon}
            </motion.div>
        </motion.div>
    );

    if (href) {
        return (
            <Link href={href} className="flex items-center justify-center">
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className="bg-transparent border-none p-0 cursor-pointer flex items-center justify-center">
            {content}
        </button>
    );
}
