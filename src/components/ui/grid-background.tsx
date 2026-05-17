import { cn } from "@/lib/utils";
import React from "react";
import { SiteEffects } from "@/components/site-effects";

export function GridBackground({ children, className }: { children?: React.ReactNode; className?: string }) {
    return (
        <div className={cn("site-grid-bg relative w-full min-h-screen overflow-hidden", className)}>
            <SiteEffects />
            <div aria-hidden="true" className="ambient-linework">
                <span className="ambient-rail ambient-rail-left" />
                <span className="ambient-rail ambient-rail-right" />
            </div>
            <div className="relative z-20">
                {children}
            </div>
        </div>
    );
}
