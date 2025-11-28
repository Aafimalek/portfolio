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
                "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-none overflow-hidden hover:shadow-lg dark:hover:shadow-white/10 transition-shadow duration-300",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
