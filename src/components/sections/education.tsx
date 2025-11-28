"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";

const education = [
    {
        degree: "B.E. in Artificial Intelligence & Machine Learning",
        institution: "L.D. College of Engineering, Ahmedabad",
        year: "Expected June 2026",
        grade: "CGPA: 8.0"
    },
    {
        degree: "Diploma in Computer Engineering",
        institution: "Government Polytechnic, Jamnagar",
        year: "June 2023",
        grade: "CGPA: 8.73"
    }
];

import { motion } from "framer-motion";

// ... (education array remains the same)

export const Education = () => {
    return (
        <SectionWrapper id="education" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">Education</h2>
            <div className="w-full flex flex-col gap-8">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ x: 10, backgroundColor: "rgba(0,0,0,0.02)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-lg border-b border-neutral-200 dark:border-neutral-800 last:border-0 hover:border-transparent dark:hover:bg-white/5 transition-colors"
                    >
                        <div>
                            <h3 className="text-lg font-bold text-left">{edu.degree}</h3>
                            <p className="text-neutral-600 dark:text-neutral-300 mt-1 text-left text-sm">{edu.institution}</p>
                        </div>
                        <div className="text-left md:text-right mt-2 md:mt-0">
                            <p className="text-xs font-semibold">{edu.year}</p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300">{edu.grade}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};
