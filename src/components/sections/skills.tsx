"use client";

import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { SectionWrapper } from "@/components/section-wrapper";
import {
    SiDocker,
    SiFastapi,
    SiFlask,
    SiJavascript,
    SiLangchain,
    SiMongodb,
    SiNextdotjs,
    SiNodedotjs,
    SiNumpy,
    SiOpenai,
    SiPandas,
    SiPostgresql,
    SiPython,
    SiPytorch,
    SiReact,
    SiRedis,
    SiScikitlearn,
    SiStreamlit,
    SiTensorflow,
    SiTypescript,
} from "react-icons/si";

type TechStyle = CSSProperties & { "--tech-color": string };

type TechItem = {
    name: string;
    icon: IconType;
    color: string;
    group: string;
};

const techStack: TechItem[] = [
    { name: "Python", icon: SiPython, color: "#3776AB", group: "Language" },
    { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C", group: "ML" },
    { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", group: "ML" },
    { name: "React", icon: SiReact, color: "#61DAFB", group: "Frontend" },
    { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF", group: "Frontend" },
    { name: "TypeScript", icon: SiTypescript, color: "#3178C6", group: "Language" },
    { name: "FastAPI", icon: SiFastapi, color: "#009688", group: "API" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "#4169E1", group: "Database" },
    { name: "MongoDB", icon: SiMongodb, color: "#47A248", group: "Database" },
    { name: "OpenAI", icon: SiOpenai, color: "#10A37F", group: "AI" },
    { name: "LangChain", icon: SiLangchain, color: "#12A594", group: "AI" },
    { name: "Docker", icon: SiDocker, color: "#2496ED", group: "Infra" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", group: "Language" },
    { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E", group: "Runtime" },
    { name: "Redis", icon: SiRedis, color: "#FF4438", group: "Cache" },
    { name: "Flask", icon: SiFlask, color: "#FFFFFF", group: "API" },
    { name: "Scikit-learn", icon: SiScikitlearn, color: "#F7931E", group: "ML" },
    { name: "Pandas", icon: SiPandas, color: "#E70488", group: "Data" },
    { name: "NumPy", icon: SiNumpy, color: "#4DABCF", group: "Data" },
    { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B", group: "App" },
];

export const Skills = () => {
    return (
        <SectionWrapper id="skills" className="w-full py-10">
            <h2>Tech Stack</h2>

            <div className="tech-showcase">
                <div className="tech-card-grid" aria-label="Featured technology logos">
                    {techStack.map((tech) => {
                        const Icon = tech.icon;

                        return (
                            <div
                                key={tech.name}
                                className="tech-card"
                                style={{ "--tech-color": tech.color } as TechStyle}
                                title={tech.name}
                            >
                                <Icon className="h-8 w-8" />
                                <span>{tech.name}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </SectionWrapper>
    );
};
