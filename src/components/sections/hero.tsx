"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import { RoleRotator } from "@/components/ui/role-rotator";

const socialLinks = [
    { label: "GitHub", href: "https://github.com/Aafimalek", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/aafi-malek", icon: Linkedin },
    { label: "X", href: "https://x.com/aafimalek2032", icon: Twitter },
    { label: "Email", href: "mailto:aafimalek2023@gmail.com", icon: Mail },
];

export const Hero = () => {
    return (
        <section className="hero-linework relative w-full">
            <div className="profile-grid">
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
                        <RoleRotator />
                    </div>
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
