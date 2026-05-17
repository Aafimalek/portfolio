"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const roles = [
    "AI & ML Engineer",
    "Backend Engineer",
    "Fullstack Engineer",
];

export const RoleRotator = ({ className }: { className?: string }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % roles.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`inline-flex items-center justify-center overflow-hidden align-middle ${className}`}>
            <div className="relative h-6 w-28 sm:h-8 sm:w-40 md:w-48"> {/* Fixed width to prevent layout shift */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={roles[index]}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "circOut" }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-white/10 dark:bg-black/10 backdrop-blur-md border border-black/5 dark:border-white/10 text-neutral-900 dark:text-neutral-100 text-[10px] sm:text-sm font-medium rounded-none whitespace-nowrap shadow-sm">
                            {roles[index]}
                        </span>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};
