"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";

const education = [
    {
        degree: "B.E. in Artificial Intelligence & Machine Learning",
        institution: "L.D. College of Engineering, Ahmedabad",
        year: "Expected June 2026",
        grade: "CGPA: 7.75"
    },
    {
        degree: "Diploma in Computer Engineering",
        institution: "Government Polytechnic, Jamnagar",
        year: "June 2023",
        grade: "CGPA: 8.77"
    }
];

export const Education = () => {
    return (
        <SectionWrapper id="education" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">Education</h2>
            <div className="w-full flex flex-col gap-8">
                {education.map((edu, index) => (
                    <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-0 border-b border-neutral-200 dark:border-neutral-800 last:border-0 pb-4 last:pb-0">
                        <div>
                            <h3 className="text-lg font-bold text-left">{edu.degree}</h3>
                            <p className="text-neutral-500 mt-1 text-left text-sm">{edu.institution}</p>
                        </div>
                        <div className="text-left md:text-right mt-2 md:mt-0">
                            <p className="text-xs font-semibold">{edu.year}</p>
                            <p className="text-xs text-neutral-500">{edu.grade}</p>
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};
