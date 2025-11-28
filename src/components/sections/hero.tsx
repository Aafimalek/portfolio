"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";
import { RoleRotator } from "@/components/ui/role-rotator";

import { motion } from "framer-motion";

export const Hero = () => {
    return (
        <div className="w-full pt-20 pb-10">
            <div className="flex flex-col-reverse md:flex-row items-center justify-start gap-12">
                <div className="flex flex-col items-start justify-center z-20">
                    <div className="flex flex-wrap items-end gap-2">
                        <motion.h1
                            className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 leading-none text-left flex"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: {
                                    opacity: 1,
                                    transition: {
                                        staggerChildren: 0.1,
                                    },
                                },
                            }}
                            initial="hidden"
                            animate="visible"
                        >
                            {Array.from("aafi malek").map((letter, index) => (
                                <motion.span
                                    key={index}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 },
                                    }}
                                >
                                    {letter === " " ? "\u00A0" : letter}
                                </motion.span>
                            ))}
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
                        className="text-neutral-600 dark:text-neutral-300 max-w-lg my-4 text-xl text-left"
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
                            <Button className="transition-all duration-300 hover:scale-105 active:scale-95 !bg-neutral-900 dark:!bg-white !text-white dark:!text-black hover:!bg-neutral-700 dark:hover:!bg-neutral-300 active:!bg-neutral-800 dark:active:!bg-neutral-400 shadow-lg hover:shadow-xl">
                                View Projects
                            </Button>
                        </a>
                        <a href="/RESUME_AAFIKHAN_MALEK.pdf" download="RESUME_AAFIKHAN_MALEK.pdf">
                            <Button variant="outline" className="transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-neutral-200 dark:border-neutral-800 hover:!bg-neutral-100 dark:hover:!bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 active:!bg-neutral-200 dark:active:!bg-neutral-700">
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
