"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const GlowCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={cn(
                "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-none overflow-hidden transition-all duration-300 hover:shadow-[-8px_0_15px_-3px_rgba(0,0,0,0.1),8px_0_15px_-3px_rgba(0,0,0,0.1)] dark:hover:shadow-[-8px_0_15px_-3px_rgba(255,255,255,0.15),8px_0_15px_-3px_rgba(255,255,255,0.15)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
