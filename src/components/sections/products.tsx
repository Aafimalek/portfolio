"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { IconArrowUpRight } from "@tabler/icons-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Marked } from "@/components/ui/marks";
import { DemoVideo } from "@/components/ui/demo-video";

const products = [
    {
        name: "Manimancer",
        tagline: "Create animations with AI",
        description: "==Prompt-to-animation== product for creating 2D or 3D explanatory videos in a 3Blue1Brown-like style, powered by LLMs and Python.",
        url: "https://manimancer.fun",
        tech: ["Next.js", "Python", "OpenAI", "Stripe"],
        youtubeId: "nDlpTDnmLvU",
    },
    {
        name: "AI-Notez",
        tagline: "Your AI-powered second brain",
        description: "Note workspace with ~AI translation~, summarization, tag suggestions, grammar checks, and structured organization.",
        url: "https://www.ai-notez.fun/",
        tech: ["React", "Supabase", "Vector DB", "Edge Functions"],
        youtubeId: "5zI4bhiwpqo",
    },
];

/** Render a product's demo, details, and real external link in a glass panel. */
const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
    return (
        <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            viewport={{ once: true, margin: "-50px" }}
            className="module-card product-glass flex h-full flex-col"
        >
            <DemoVideo youtubeId={product.youtubeId} title={product.name} />

            <div className="flex flex-1 flex-col p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <Link href={product.url} target="_blank" className="group/title inline-flex items-center gap-2">
                            <h3 className="truncate text-base font-bold text-neutral-950 group-hover/title:underline dark:text-white">
                                {product.name}
                            </h3>
                            <IconArrowUpRight className="h-4 w-4 shrink-0 text-neutral-600 dark:text-neutral-300" />
                        </Link>
                        <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300">{product.tagline}</p>
                    </div>
                </div>

                <p className="mb-4 flex-1 text-sm leading-6 text-neutral-600 dark:text-neutral-300"><Marked text={product.description} /></p>

                <div className="stack-grid mb-4">
                    {product.tech.map((tech) => (
                        <span key={tech} className="stack-chip">
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex items-center justify-end border-t border-[var(--line-soft)] pt-4">
                    <Link
                        href={product.url}
                        target="_blank"
                        className="product-visit inline-flex items-center gap-2 px-3 py-2 text-xs font-bold transition"
                    >
                        Visit
                        <IconArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </motion.article>
    );
};

/** Present the existing products and their demos in a responsive grid. */
export const Products = () => {
    return (
        <SectionWrapper id="products" className="w-full pb-10">
            <h2>Products</h2>

            <div className="product-grid grid grid-cols-1 gap-4 sm:grid-cols-2">
                {products.map((product, index) => (
                    <ProductCard key={product.name} product={product} index={index} />
                ))}
            </div>
        </SectionWrapper>
    );
};
