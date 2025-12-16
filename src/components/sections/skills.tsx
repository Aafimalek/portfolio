"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import {
    IconBrandPython,
    IconBrandJavascript,
    IconBrandReact,
    IconBrandNextjs,
    IconBrain,
    IconChartDots,
    IconRobot,
    IconAppWindow,
    IconBrandTypescript,
    IconDatabase,
    IconCode,
    IconChartBar,
    IconNetwork,
    IconTerminal2,
    IconFlask,
    IconTable,
    IconMathFunction,
    IconBolt,
    IconCpu,
    IconWorld,
    IconFlame,
    IconBoxModel,
} from "@tabler/icons-react";
import {
    SiPython,
    SiJavascript,
    SiTypescript,
    SiReact,
    SiNextdotjs,
    SiFastapi,
    SiFlask,
    SiScikitlearn,
    SiPytorch,
    SiTensorflow,
    SiPandas,
    SiNumpy,
    SiLangchain,
    SiStreamlit,
} from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
    {
        name: "Python",
        icon: <SiPython className="h-12 w-12" />,
    },
    {
        name: "JavaScript",
        icon: <SiJavascript className="h-12 w-12" />,
    },
    {
        name: "TypeScript",
        icon: <SiTypescript className="h-12 w-12" />,
    },
    {
        name: "React",
        icon: <SiReact className="h-12 w-12" />,
    },
    {
        name: "Next.js",
        icon: <SiNextdotjs className="h-12 w-12" />,
    },
    {
        name: "FastAPI",
        icon: <SiFastapi className="h-12 w-12" />,
    },
    {
        name: "Flask",
        icon: <SiFlask className="h-12 w-12" />,
    },
    {
        name: "Scikit-learn",
        icon: <SiScikitlearn className="h-12 w-12" />,
    },
    {
        name: "PyTorch",
        icon: <SiPytorch className="h-12 w-12" />,
    },
    {
        name: "TensorFlow",
        icon: <SiTensorflow className="h-12 w-12" />,
    },
    {
        name: "Pandas",
        icon: <SiPandas className="h-12 w-12" />,
    },
    {
        name: "NumPy",
        icon: <SiNumpy className="h-12 w-12" />,
    },
    {
        name: "Matplotlib",
        icon: <IconChartBar className="h-12 w-12" />,
    },
    {
        name: "Seaborn",
        icon: <IconChartDots className="h-12 w-12" />,
    },
    {
        name: "LangChain",
        icon: <SiLangchain className="h-12 w-12" />,
    },
    {
        name: "LangGraph",
        icon: <IconNetwork className="h-12 w-12" />,
    },
    {
        name: "Streamlit",
        icon: <SiStreamlit className="h-12 w-12" />,
    },
];

export const Skills = () => {
    return (
        <SectionWrapper id="skills" className="py-10 w-full overflow-hidden">
            <h2 className="text-2xl font-bold text-left mb-4">Skills</h2>
            <Card className="bg-transparent border-neutral-200 dark:border-white/[0.1] shadow-none">
                <CardContent className="p-0 h-[10rem] sm:h-[12rem] flex flex-col items-center justify-center relative overflow-hidden">
                    <InfiniteMovingCards
                        items={skills}
                        direction="right"
                        speed="slow"
                    />
                </CardContent>
            </Card>
        </SectionWrapper>
    );
};

