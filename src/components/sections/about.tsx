"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";

const aboutPoints = [
    "AI & ML engineer and L.D. College of Engineering graduate, building practical AI applications and full-stack products.",
    "My work includes LLM agents, retrieval systems, speech recognition, voice applications, and the APIs and interfaces around them.",
    "I contribute to open-source AI tools and care about evaluation, observability, and making systems useful beyond the demo.",
    "Outside code, I watch films, listen to music, and follow long technical rabbit holes until they turn into projects.",
];

// Present Aafi's current focus and interests in his own voice.
export const About = () => {
    return (
        <SectionWrapper id="about" className="w-full py-10">
            <h2>About</h2>
            <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="section-list"
            >
                {aboutPoints.map((point) => (
                    <motion.li
                        key={point}
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {point}
                    </motion.li>
                ))}
            </motion.ul>
        </SectionWrapper>
    );
};
