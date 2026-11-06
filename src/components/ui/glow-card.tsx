import React from "react";
import { cn } from "@/lib/utils";

/** Wrap card content in the shared glass surface. */
export const GlowCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("modern-card overflow-hidden", className)}>{children}</div>;
};
