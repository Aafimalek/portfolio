"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeReanimator = ({ children }: { children: React.ReactNode }) => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <>{children}</>;
    }

    return <div key={theme}>{children}</div>;
};
