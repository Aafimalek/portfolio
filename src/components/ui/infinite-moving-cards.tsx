"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        icon: React.ReactNode;
        name: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const scroller = scrollerRef.current;

        if (!container || !scroller || scroller.dataset.animated === "true") {
            return;
        }

        const scrollerContent = Array.from(scroller.children);

        scrollerContent.forEach((item) => {
            const duplicatedItem = item.cloneNode(true);
            scroller.appendChild(duplicatedItem);
        });

        container.style.setProperty(
            "--animation-direction",
            direction === "left" ? "forwards" : "reverse"
        );

        const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
        container.style.setProperty("--animation-duration", duration);
        scroller.dataset.animated = "true";
    }, [direction, speed]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >


            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap data-[animated=true]:animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => (
                    <li
                        className="w-[80px] sm:w-[100px] md:w-[120px] relative flex-shrink-0 px-2 sm:px-4 py-4 sm:py-6 cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-3 active:scale-95"
                        key={item.name + idx}
                    >
                        <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
                            <div className="relative z-20 text-3xl sm:text-4xl text-foreground">
                                {item.icon}
                            </div>
                            <span className="relative z-20 text-xs sm:text-sm leading-[1.6] text-muted-foreground font-normal text-center">
                                {item.name}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
