"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { motion } from "framer-motion";

export const About = () => {
    return (
        <SectionWrapper id="about" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">About Me</h2>
            <div className="w-full text-left text-neutral-800 dark:text-neutral-200 leading-relaxed">
                <motion.p
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    Hi there 👋 I’m Aafi Malek, an AI & ML engineering undergrad from L.D. College Of Engineering i love building cool projects and learning new things. in my free time i watch films and listen to music and go down rabbit holes. my goal is to get good at programming and earn $mrr by building cool products that millions of people use.
                </motion.p>
            </div>
        </SectionWrapper>
    );
};
