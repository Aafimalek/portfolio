"use client";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

import { SectionWrapper } from "@/components/section-wrapper";
import { motion } from "framer-motion";

export const GithubStats = () => {
    const { theme } = useTheme();
    return (
        <SectionWrapper id="github-stats" className="py-10 w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-left w-full mb-6">GitHub Contributions</h2>
            <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="p-4 border rounded-none bg-white dark:bg-black w-full flex justify-center hover:shadow-lg dark:hover:shadow-white/10 transition-shadow"
            >
                <GitHubCalendar
                    username="Aafimalek"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={5}
                />
            </motion.div>

        </SectionWrapper>
    );
};
