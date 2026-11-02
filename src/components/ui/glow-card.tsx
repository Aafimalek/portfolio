"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Wrap card content in the shared glass surface and a subtle hover lift. */
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
                "modern-card border border-[var(--line-soft)] bg-[var(--module-bg)] overflow-hidden transition-colors duration-300 hover:bg-[var(--module-hover)]",
                className
            )}
        >
            {children}
        </motion.div>
    );
};
