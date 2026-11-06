"use client";

import { MotionConfig, motion, useAnimationControls } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

// Fade the page on a theme change without remounting it, so state and videos carry on.
export const ThemeReanimator = ({ children }: { children: React.ReactNode }) => {
    const { resolvedTheme } = useTheme();
    const controls = useAnimationControls();
    const previousTheme = useRef(resolvedTheme);

    useEffect(() => {
        const changed = previousTheme.current && previousTheme.current !== resolvedTheme;
        previousTheme.current = resolvedTheme;
        if (!changed) return;
        controls.set({ opacity: 0 });
        void controls.start({ opacity: 1, transition: { duration: 0.2 } });
    }, [controls, resolvedTheme]);

    return (
        <MotionConfig reducedMotion="user">
            <motion.div animate={controls}>{children}</motion.div>
        </MotionConfig>
    );
};
