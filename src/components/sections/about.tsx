"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";

const aboutPoints = [
    "AI & ML engineering undergrad from L.D. College of Engineering, Ahmedabad, focused on shipping practical machine learning and full-stack products.",
    "I like turning messy ideas into working demos: RAG systems, AI note tools, animation generators, deepfake detection, recommendation systems, and backend-heavy web apps.",
    "Currently improving at production engineering, model integration, distributed backends, and building products that can grow into real revenue.",
    "Outside code, I watch films, listen to music, and follow long technical rabbit holes until they turn into projects.",
];

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
