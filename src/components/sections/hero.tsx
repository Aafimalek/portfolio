"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";

const socialLinks = [
    { label: "GitHub", href: "https://github.com/Aafimalek", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/aafi-malek", icon: Linkedin },
    { label: "X", href: "https://x.com/aafimalek2032", icon: Twitter },
    { label: "Email", href: "mailto:aafimalek2023@gmail.com", icon: Mail },
];

// Introduce Aafi and provide direct links to his public profiles and email.
export const Hero = () => {
    const reduceMotion = useReducedMotion();
    const [ripple, setRipple] = useState<{ x: number; y: number; id: number } | null>(null);

    // Start the decorative ripple at the actual press location in the hero.
    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
        if (reduceMotion || (event.pointerType === "mouse" && event.button !== 0)) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setRipple({ x: event.clientX - bounds.left, y: event.clientY - bounds.top, id: Date.now() });
    };

    return (
        <section className="hero-linework relative w-full">
            <svg className="glass-filter" aria-hidden="true" focusable="false">
                <filter id="hero-refraction" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
                    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="2" seed="8" result="waves" />
                    <feDisplacementMap in="SourceGraphic" in2="waves" scale="20" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </svg>
            <div className="profile-grid" onPointerDown={handlePointerDown}>
                {ripple && [0, 1, 2].map((wave) => (
                    <motion.span
                        key={`${ripple.id}-${wave}`}
                        className="hero-ripple"
                        aria-hidden="true"
                        style={{ left: ripple.x, top: ripple.y }}
                        initial={{ transform: "translate(-50%, -50%) scale(0.9)", opacity: 0 }}
                        animate={{ transform: "translate(-50%, -50%) scale(5)", opacity: [0, 0.75, 0] }}
                        transition={{ duration: 0.85, delay: wave * 0.13, ease: "easeOut" }}
                        onAnimationComplete={wave === 2 ? () => setRipple((current) => current?.id === ripple.id ? null : current) : undefined}
                    />
                ))}
                <div className="profile-cell flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                        whileHover={{ scale: 1.05, rotate: 5 }}
                        className="profile-frame relative aspect-square w-44 overflow-hidden rounded-full bg-neutral-100 dark:bg-neutral-950 sm:w-56"
                    >
                        <Image
                            src="/profile_picture.jpg"
                            alt="Aafi Malek"
                            fill
                            priority
                            sizes="160px"
                            className="rounded-full object-cover grayscale contrast-125 transition duration-500 hover:grayscale-0"
                        />
                    </motion.div>
                </div>

                <div className="profile-copy">
                    <div className="profile-title-row">
                        <motion.h1
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: 0.12 }}
                            className="hero-name"
                        >
                            Aafi Malek
                        </motion.h1>
                    </div>
                    <div className="profile-subtitle-row flex flex-col gap-3 sm:flex-row sm:items-center">
                        <span className="hero-role">AI &amp; ML Engineer</span>
                    </div>
                    <span className="availability"><span aria-hidden="true" />Open to full-time opportunities</span>
                </div>
            </div>

            <div className="hatch-band" aria-hidden="true" />

            <div className="hero-links-grid">
                {socialLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="box-link"
                        >
                            <span className="social-icon">
                                <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1 truncate text-sm font-semibold">{link.label}</span>
                            <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-500" />
                        </a>
                    );
                })}
            </div>
        </section>
    );
};
