"use client";
import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { useTheme } from "next-themes";

export const GithubStats = () => {
    const { theme } = useTheme();
    return (
        <section className="py-10 w-full flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-left w-full mb-6">GitHub Contributions</h2>
            <div className="p-4 border rounded-xl bg-white dark:bg-black w-full flex justify-center">
                <GitHubCalendar
                    username="Aafimalek"
                    colorScheme={theme === "dark" ? "dark" : "light"}
                    fontSize={12}
                    blockSize={12}
                    blockMargin={5}
                />
            </div>
           
        </section>
    );
};
