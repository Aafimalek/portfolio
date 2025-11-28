"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { motion } from "framer-motion";

export const About = () => {
    return (
        <SectionWrapper id="about" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">About Me</h2>
            <div className="w-full text-left text-neutral-800 dark:text-neutral-200 leading-relaxed">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: { transition: { staggerChildren: 0.02 } }
                    }}
                    className="text-neutral-800 dark:text-neutral-200 leading-relaxed text-left text-lg flex flex-wrap gap-1"
                >
                    {"Hi there 👋 I’m Aafi Malek, an AI & ML engineering undergrad from L.D. College Of Engineering i love building cool projects and learning new things. in my free time i watch films and listen to music and go down rabbit holes. my goal is to get good at programming and earn $mrr by building cool products that millions of people use.".split(" ").map((word, index) => (
                        <motion.span
                            key={index}
                            variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 }
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
