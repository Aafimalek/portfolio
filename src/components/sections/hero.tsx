"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import { RoleRotator } from "@/components/ui/role-rotator";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const RollingText = ({ text }: { text: string }) => {
    const [displayText, setDisplayText] = useState(
        text.split("").map(() => ({ char: "", isLocked: false }))
    );
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    useEffect(() => {
        let iterations = 0;
        const interval = setInterval(() => {
            setDisplayText((prev) =>
                prev.map((item, index) => {
                    if (index < iterations) {
                        return { char: text[index], isLocked: true };
                    }
                    return {
                        char: letters[Math.floor(Math.random() * letters.length)],
                        isLocked: false,
                    };
                })
            );

            if (iterations >= text.length) {
                clearInterval(interval);
            }

            iterations += 1 / 3;
        }, 30);

        return () => clearInterval(interval);
    }, [text]);

    return (
        <span className="inline-block">
            {displayText.map((item, index) => (
                <span
                    key={index}
                    className={cn(
                        "inline-block",
                        item.char === " " ? "w-[0.2em]" : "",
                        !item.isLocked ? "min-w-[0.4em]" : ""
                    )}
                >
                    {item.char === " " ? "\u00A0" : item.char}
                </span>
            ))}
        </span>
    );
};

export const Hero = () => {
    return (
        <div className="w-full pt-20 pb-10">
            <div className="flex flex-col-reverse md:flex-row items-center justify-start gap-12">
                <div className="flex flex-col items-start justify-center z-20">
                    <div className="flex flex-wrap items-end gap-2">
                        <motion.h1
                            className="text-3xl sm:text-5xl md:text-7xl font-nabla leading-none text-left"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <RollingText text="Aafi Malek" />
                        </motion.h1>
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <RoleRotator className="mb-1" />
                        </motion.div>
                    </div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="text-neutral-600 dark:text-neutral-300 max-w-lg my-4 text-lg sm:text-xl text-left"
                    >
                        Turning complex concepts into real-world solutions
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        className="flex gap-4 mt-8"
                    >
                        <a href="#projects">
                            <Button className="transition-all duration-300 hover:scale-105 active:scale-95 !bg-neutral-900 dark:!bg-white !text-white dark:!text-black hover:!bg-neutral-700 dark:hover:!bg-neutral-300 active:!bg-neutral-800 dark:active:!bg-neutral-400 shadow-lg hover:shadow-xl after:bg-white dark:after:bg-black">
                                View Projects
                            </Button>
                        </a>
                        <a href="/RESUME_AAFIKHAN_MALEK.pdf" download="RESUME_AAFIKHAN_MALEK.pdf">
                            <Button variant="outline" className="transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-neutral-200 dark:border-neutral-800 hover:!bg-neutral-100 dark:hover:!bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 active:!bg-neutral-200 dark:active:!bg-neutral-700 after:bg-black dark:after:bg-white">
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                        </a>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                    className="relative w-40 h-40 md:w-64 md:h-64 aspect-square rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800"
                >
                    <Image
                        src="/profile_picture.jpg"
                        alt="Aafi Malek"
                        fill
                        className="object-cover"
                    />
                </motion.div>
            </div>
        </div>
    );
}
