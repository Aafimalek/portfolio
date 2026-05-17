"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowUpRight, IconPlayerPlay, IconRocket } from "@tabler/icons-react";
import { SectionWrapper } from "@/components/section-wrapper";

const products = [
    {
        name: "Manimancer",
        tagline: "Create animations with AI",
        description: "Prompt-to-animation product for creating 2D or 3D explanatory videos in a 3Blue1Brown-like style, powered by LLMs and Python.",
        url: "https://manimancer.fun",
        tech: ["Next.js", "Python", "OpenAI", "Stripe"],
        youtubeId: "nDlpTDnmLvU",
    },
    {
        name: "AI-Notez",
        tagline: "Your AI-powered second brain",
        description: "Note workspace with AI translation, summarization, tag suggestions, grammar checks, and structured organization.",
        url: "https://www.ai-notez.fun/",
        tech: ["React", "Supabase", "Vector DB", "Edge Functions"],
        youtubeId: "5zI4bhiwpqo",
    },
];

const VideoCard = ({ videoId, title }: { videoId: string; title: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    if (isPlaying) {
        return (
            <div className="media-frame relative aspect-video w-full">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={title}
                    className="absolute left-0 top-0 h-full w-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <button
            type="button"
            className="media-frame group relative aspect-video w-full cursor-pointer overflow-hidden text-left"
            onClick={() => setIsPlaying(true)}
            aria-label={`Play ${title} demo`}
        >
            <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover opacity-75 grayscale transition duration-500 group-hover:scale-105 group-hover:opacity-95 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 384px"
            />
            <span className="absolute inset-0 bg-black/20" />
            <span className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center border border-white/35 bg-black/55 text-white backdrop-blur-sm transition group-hover:bg-white group-hover:text-black">
                    <IconPlayerPlay className="h-6 w-6 fill-current" />
                </span>
            </span>
        </button>
    );
};

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-50px" }}
            className="module-card flex h-full flex-col"
        >
            <VideoCard videoId={product.youtubeId} title={product.name} />

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <Link href={product.url} target="_blank" className="group/title inline-flex items-center gap-2">
                            <h3 className="truncate text-lg font-black text-neutral-950 group-hover/title:underline dark:text-white">
                                {product.name}
                            </h3>
                            <IconRocket className="h-4 w-4 shrink-0 text-neutral-500" />
                        </Link>
                        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">{product.tagline}</p>
                    </div>
                </div>

                <p className="mb-4 flex-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300">{product.description}</p>

                <div className="stack-grid mb-4">
                    {product.tech.map((tech) => (
                        <span key={tech} className="stack-chip text-[11px]">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-end border-t border-[var(--line-soft)] pt-4">
                    <Link
                        href={product.url}
                        target="_blank"
                        className="inline-flex items-center gap-2 border border-neutral-950 bg-neutral-950 px-3 py-2 text-xs font-bold text-white transition hover:bg-neutral-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                    >
                        Visit
                        <IconArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

export const Products = () => {
    return (
        <SectionWrapper id="products" className="w-full overflow-hidden py-10">
            <h2>Products</h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {products.map((product, index) => (
                    <ProductCard key={product.name} product={product} index={index} />
                ))}
            </div>
        </SectionWrapper>
    );
};
