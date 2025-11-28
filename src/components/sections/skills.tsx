"use client";
import React, { useState } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { motion } from "framer-motion";
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
    IconTools,
    IconFlame,
    IconBoxModel,
} from "@tabler/icons-react";

const SkeletonWeb = () => {
    const [isActive, setIsActive] = useState(false);
    const variants = {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0 },
    };
    return (
        <div
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2 cursor-pointer group"
            onClick={() => setIsActive(!isActive)}
        >
            <div className={`flex flex-row items-center space-x-2 bg-neutral-100 dark:bg-black border border-neutral-200 dark:border-white/[0.1] p-2 rounded-none w-full h-full relative overflow-hidden transition-colors ${isActive ? "border-blue-500/50 dark:border-blue-500/50" : ""}`}>
                <div className="absolute top-2 left-2 flex space-x-1">
                    <div className="w-2 h-2 rounded-none bg-red-500" />
                    <div className="w-2 h-2 rounded-none bg-yellow-500" />
                    <div className="w-2 h-2 rounded-none bg-green-500" />
                </div>
                <div className="mt-4 flex flex-col space-y-2 w-full">
                    <motion.div variants={variants} initial="initial" animate={isActive ? "animate" : "initial"} transition={{ delay: 0.1 }} className="w-3/4 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-none" />
                    <motion.div variants={variants} initial="initial" animate={isActive ? "animate" : "initial"} transition={{ delay: 0.2 }} className="w-1/2 h-2 bg-neutral-200 dark:bg-neutral-800 rounded-none" />
                    <div className="flex space-x-2 mt-2">
                        <motion.div variants={variants} initial="initial" animate={isActive ? "animate" : "initial"} transition={{ delay: 0.3 }} className="w-1/3 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-none" />
                        <motion.div variants={variants} initial="initial" animate={isActive ? "animate" : "initial"} transition={{ delay: 0.4 }} className="w-2/3 h-16 bg-neutral-200 dark:bg-neutral-800 rounded-none" />
                    </div>
                </div>
                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-xs font-medium text-neutral-500 bg-white/80 dark:bg-black/80 px-2 py-1 rounded-none">Click to animate</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const SkeletonBrain = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row items-center justify-center space-x-2 cursor-pointer group"
            onClick={() => setIsActive(!isActive)}
        >
            <div className="relative flex items-center justify-center">
                <div className={`absolute h-20 w-20 rounded-none bg-blue-500/20 transition-all duration-500 ${isActive ? "animate-ping opacity-100" : "opacity-0"}`} />
                <IconBrain className={`h-10 w-10 relative z-10 transition-colors ${isActive ? "text-blue-500" : "text-neutral-500"}`} />
            </div>
            <div className="relative flex items-center justify-center">
                <div className={`absolute h-16 w-16 rounded-none bg-purple-500/20 transition-all duration-500 delay-75 ${isActive ? "animate-ping opacity-100" : "opacity-0"}`} />
                <IconNetwork className={`h-8 w-8 relative z-10 transition-colors ${isActive ? "text-purple-500" : "text-neutral-500"}`} />
            </div>
            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs font-medium text-neutral-500 bg-white/80 dark:bg-black/80 px-2 py-1 rounded-none mt-16">Click to animate</span>
                </div>
            )}
        </div>
    );
};

const SkeletonChart = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row items-end justify-center space-x-2 pb-2 cursor-pointer group relative"
            onClick={() => setIsActive(!isActive)}
        >
            {[40, 60, 80, 50, 90].map((height, i) => (
                <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: isActive ? `${height}%` : "10%" }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`w-4 rounded-none transition-colors ${isActive ? "bg-gradient-to-t from-neutral-200 to-neutral-400 dark:from-neutral-800 dark:to-neutral-600" : "bg-neutral-200 dark:bg-neutral-800"}`}
                />
            ))}
            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs font-medium text-neutral-500 bg-white/80 dark:bg-black/80 px-2 py-1 rounded-none mb-8">Click to animate</span>
                </div>
            )}
        </div>
    );
};

const SkeletonGenAI = () => {
    const [isActive, setIsActive] = useState(false);
    return (
        <div
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row items-center justify-center space-x-4 cursor-pointer group relative"
            onClick={() => setIsActive(!isActive)}
        >
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                className={`h-12 w-12 rounded-none flex items-center justify-center border transition-colors ${isActive ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700" : "bg-neutral-50 dark:bg-neutral-900 border-transparent"}`}
            >
                <IconDatabase className={`h-6 w-6 transition-colors ${isActive ? "text-neutral-500" : "text-neutral-300"}`} />
            </motion.div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isActive ? 40 : 0 }}
                transition={{ delay: 0.2 }}
                className="h-0.5 bg-neutral-300 dark:bg-neutral-700"
            />
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                transition={{ delay: 0.3 }}
                className={`h-16 w-16 rounded-none flex items-center justify-center shadow-lg transition-all ${isActive ? "bg-gradient-to-r from-indigo-500 to-purple-500 shadow-purple-500/20" : "bg-neutral-200 dark:bg-neutral-800"}`}
            >
                <IconCpu className={`h-8 w-8 transition-colors ${isActive ? "text-white" : "text-neutral-400"}`} />
            </motion.div>
            <motion.div
                initial={{ width: 0 }}
                animate={{ width: isActive ? 40 : 0 }}
                transition={{ delay: 0.5 }}
                className="h-0.5 bg-neutral-300 dark:bg-neutral-700"
            />
            <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: isActive ? 1 : 0.8 }}
                transition={{ delay: 0.6 }}
                className={`h-12 w-12 rounded-none flex items-center justify-center border transition-colors ${isActive ? "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700" : "bg-neutral-50 dark:bg-neutral-900 border-transparent"}`}
            >
                <IconRobot className={`h-6 w-6 transition-colors ${isActive ? "text-neutral-500" : "text-neutral-300"}`} />
            </motion.div>
            {!isActive && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <span className="text-xs font-medium text-neutral-500 bg-white/80 dark:bg-black/80 px-2 py-1 rounded-none">Click to animate</span>
                </div>
            )}
        </div>
    );
};

// Helper to render a minimal pill for skills
const SkillPill = ({ icon, name }: { icon: React.ReactNode; name: string }) => (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-none bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
        {icon}
        <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300 lowercase">{name}</span>
    </div>
);

const skills = [
    {
        title: "Core & Web",
        description: (
            <div className="flex flex-wrap gap-2 mt-2">
                <SkillPill icon={<IconBrandPython className="h-4 w-4" />} name="python" />
                <SkillPill icon={<IconBrandJavascript className="h-4 w-4" />} name="js" />
                <SkillPill icon={<IconBrandTypescript className="h-4 w-4" />} name="ts" />
                <SkillPill icon={<IconBrandReact className="h-4 w-4" />} name="react" />
                <SkillPill icon={<IconBrandNextjs className="h-4 w-4" />} name="nextjs" />
                <SkillPill icon={<IconBolt className="h-4 w-4" />} name="fastapi" />
                <SkillPill icon={<IconFlask className="h-4 w-4" />} name="flask" />
            </div>
        ),
        header: <SkeletonWeb />,
        icon: <IconWorld className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
    {
        title: "Machine Learning",
        description: (
            <div className="flex flex-wrap gap-2 mt-2">
                <SkillPill icon={<IconTools className="h-4 w-4" />} name="scikit-learn" />
                <SkillPill icon={<IconFlame className="h-4 w-4" />} name="pytorch" />
                <SkillPill icon={<IconBoxModel className="h-4 w-4" />} name="tensorflow" />
            </div>
        ),
        header: <SkeletonBrain />,
        icon: <IconBrain className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "Data Science",
        description: (
            <div className="flex flex-wrap gap-2 mt-2">
                <SkillPill icon={<IconTable className="h-4 w-4" />} name="pandas" />
                <SkillPill icon={<IconMathFunction className="h-4 w-4" />} name="numpy" />
                <SkillPill icon={<IconChartBar className="h-4 w-4" />} name="matplotlib" />
                <SkillPill icon={<IconChartDots className="h-4 w-4" />} name="seaborn" />
            </div>
        ),
        header: <SkeletonChart />,
        icon: <IconChartDots className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-1",
    },
    {
        title: "GenAI & Apps",
        description: (
            <div className="flex flex-wrap gap-2 mt-2">
                <SkillPill icon={<IconRobot className="h-4 w-4" />} name="langchain" />
                <SkillPill icon={<IconNetwork className="h-4 w-4" />} name="langgraph" />
                <SkillPill icon={<IconAppWindow className="h-4 w-4" />} name="streamlit" />
            </div>
        ),
        header: <SkeletonGenAI />,
        icon: <IconCpu className="h-4 w-4 text-neutral-500" />,
        className: "md:col-span-2",
    },
];

export const Skills = () => {
    return (
        <SectionWrapper id="skills" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">Skills</h2>
            <BentoGrid className="max-w-4xl mx-auto">
                {skills.map((item, i) => (
                    <BentoGridItem
                        key={i}
                        title={item.title}
                        description={item.description}
                        header={item.header}
                        icon={item.icon}
                        className={item.className}
                    />
                ))}
            </BentoGrid>
        </SectionWrapper>
    );
};
