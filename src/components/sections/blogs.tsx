"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { GlowCard } from "@/components/ui/glow-card";
import { CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { IconArrowUpRight, IconClock, IconBrandMedium } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const blogs = [
    {
        title: "How I Built Manimancer",
        description:
            "A technical deep dive into the product architecture, backend design, and AWS deployment path behind a prompt-to-animation system.",
        url: "https://medium.com/@aafimalek2023/how-i-built-manimancer-1858407e073e",
        readTime: "16 min read",
        tags: ["Product Architecture", "AWS", "Python", "AI"],
        cover: "/blogs/manimancer.png",
    },
    {
        title: "How I Built This T3.chat-Inspired AI Chat System",
        description:
            "A technical deep dive into the architecture, data flow, context pipeline, and infrastructure decisions behind a full-stack AI chat application.",
        url: "https://medium.com/@aafimalek2023/how-i-built-this-t3-chat-inspired-ai-chat-system-16d63384ac77",
        readTime: "15 min read",
        tags: ["Next.js", "FastAPI", "LangGraph", "MongoDB"],
        cover: "/blogs/t3chat.png",
    },
];

export const Blogs = () => {
    return (
        <SectionWrapper id="blogs" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">Blogs</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {blogs.map((blog, index) => (
                    <motion.div
                        key={blog.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Link href={blog.url} target="_blank" className="block h-full group">
                            <GlowCard className="h-full flex flex-col p-0 overflow-hidden">
                                <div className="relative w-full aspect-2/1 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                                    <Image
                                        src={blog.cover}
                                        alt={blog.title}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                                    />
                                    <div className="absolute top-3 right-3">
                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] font-medium">
                                            <IconBrandMedium className="h-3.5 w-3.5" />
                                            Medium
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col flex-1 p-4">
                                    <CardHeader className="p-0">
                                        <div className="flex justify-between items-start gap-2">
                                            <CardTitle className="text-base font-bold text-left flex items-center gap-2 group-hover:underline decoration-neutral-500 underline-offset-4">
                                                {blog.title}
                                                <IconArrowUpRight className="h-4 w-4 shrink-0 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                                            </CardTitle>
                                        </div>
                                        <CardDescription className="mt-2 text-left text-sm leading-relaxed">
                                            {blog.description}
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="p-0 mt-auto pt-4">
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {blog.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="text-[10px] px-2 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-none text-neutral-600 dark:text-neutral-300 lowercase"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                                            <IconClock className="h-3.5 w-3.5" />
                                            {blog.readTime}
                                        </div>
                                    </CardContent>
                                </div>
                            </GlowCard>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </SectionWrapper>
    );
};
