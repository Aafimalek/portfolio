"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";

export const About = () => {
    return (
        <SectionWrapper id="about" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">About Me</h2>
            <div className="w-full text-left text-neutral-600 dark:text-neutral-400 leading-relaxed">
                <p>
                    Hi there 👋 I’m Aafi Malek, an AI & ML engineering undergrad from L.D. College Of Engineering with a knack for turning complex concepts into real‑world solutions. Whether I’m training DenseNet201 for image captioning or building a “Draw & Predict” web app, I approach every project with curiosity, creativity, and an unwavering commitment to excellence.
                </p>
            </div>
        </SectionWrapper>
    );
};
