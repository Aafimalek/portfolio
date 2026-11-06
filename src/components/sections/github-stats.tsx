"use client";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

import { SectionWrapper } from "@/components/section-wrapper";
import { motion } from "framer-motion";

// Show live contribution data and retain a direct profile link if the service is unavailable.
export const GithubStats = () => {
    const { resolvedTheme } = useTheme();
    return (
        <SectionWrapper id="github-stats" className="flex w-full flex-col items-center justify-center pb-10">
            <h2>GitHub Contributions</h2>
            <motion.div
                className="module-card w-full overflow-x-auto p-4"
            >
                <div className="min-w-[700px] sm:min-w-0 flex justify-center">
                    <GitHubCalendar
                        username="Aafimalek"
                        colorScheme={resolvedTheme === "dark" ? "dark" : "light"}
                        fontSize={12}
                        blockSize={10}
                        blockMargin={4}
                        errorMessage="Contribution graph unavailable right now."
                    />
                </div>
                <a className="github-profile-link" href="https://github.com/Aafimalek" target="_blank" rel="noopener noreferrer">View activity on GitHub ↗</a>
            </motion.div>

        </SectionWrapper>
    );
};
