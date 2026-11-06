"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";

const education = [
    {
        degree: "B.E. in Artificial Intelligence & Machine Learning",
        institution: "L.D. College of Engineering, Ahmedabad",
        year: "Graduated",
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

// Display the education history, including the confirmed graduation status.
export const Education = () => {
    return (
        <SectionWrapper id="education" className="pb-10 w-full">
            <h2>Education</h2>
            <div className="w-full flex flex-col gap-4">
                {education.map((edu, index) => (
                    <motion.div
                        key={index}
                        className="education-glass flex flex-col md:flex-row justify-between items-start md:items-center p-3 sm:p-4 transition-colors"
                    >
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base sm:text-lg font-bold text-left">{edu.degree}</h3>
                            <p className="text-neutral-600 dark:text-neutral-300 mt-1 text-left text-xs sm:text-sm truncate">{edu.institution}</p>
                        </div>
                        <div className="text-left md:text-right mt-2 md:mt-0 md:ml-4 flex-shrink-0">
                            <p className="text-xs font-semibold">{edu.year}</p>
                            <p className="text-xs text-neutral-600 dark:text-neutral-300">{edu.grade}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};
