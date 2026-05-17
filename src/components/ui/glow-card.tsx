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
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            className={cn(
                "modern-card border border-[var(--line-soft)] bg-[var(--module-bg)] rounded-none overflow-hidden transition-colors duration-300 hover:bg-[var(--module-hover)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
