"use client";
import React, { useRef, useState } from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { IconRocket, IconArrowUpRight, IconSparkles, IconPlayerPlay } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";

const products = [
    {
        name: "Manimancer",
        tagline: "Create stunning animations with AI",
        description: "Transform your ideas into professional 2d or 3d animations like 3Blue1Brown Style. No design experience needed. Powered by advanced LLMs and Python.",
        url: "https://manimancer.fun",
        gradient: "from-violet-500 via-fuchsia-500 to-pink-500",
        tech: ["Next.js", "Python", "OpenAI", "Stripe"],
        stats: { label: "Users", value: "500+" },
        status: "Live",
        youtubeId: "nDlpTDnmLvU",
    },
    {
        name: "AI-Notez",
        tagline: "Your AI-powered second brain",
        description: "Capture, organize, and enhance your notes with intelligent AI assistance. Features note translation, note summarization, tag suggestion and grammar checker.",
        url: "https://www.ai-notez.fun/",
        gradient: "from-cyan-500 via-blue-500 to-indigo-600",
        tech: ["React", "Supabase", "Vector DB", "Edge Functions"],
        stats: { label: "Users", value: "1K+" },
        status: "Live",
        youtubeId: "5zI4bhiwpqo",
    }
];

const VideoCard = ({ videoId, title }: { videoId: string, title: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    if (isPlaying) {
        return (
            <div className="relative w-full aspect-video bg-neutral-100 dark:bg-neutral-800">
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div
            className="relative w-full aspect-video cursor-pointer group overflow-hidden bg-neutral-100 dark:bg-neutral-800"
            onClick={() => setIsPlaying(true)}
        >
            <Image
                src={thumbnailUrl}
                alt={title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300" />
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-white/30 backdrop-blur-md flex items-center justify-center group-hover:bg-white/50 transition-all duration-300 group-hover:scale-110">
                    <IconPlayerPlay className="w-8 h-8 text-white fill-white ml-1" />
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, index }: { product: typeof products[0]; index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    
    // Smooth 3D tilt effect
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 20 });
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 150, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        mouseX.set(x);
        mouseY.set(y);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative perspective-1000"
            style={{ perspective: "1000px" }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{ 
                    rotateX, 
                    rotateY, 
                    transformStyle: "preserve-3d",
                }}
                className="relative h-full"
            >
                {/* Glow Effect behind the card */}
                <div 
                    className={`absolute -inset-4 bg-gradient-to-r ${product.gradient} opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-20`}
                    style={{ opacity: isHovered ? 0.15 : 0 }}
                />

                {/* Main Card Content */}
                <div className="relative h-full bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                    
                    {/* Top Stripe Decoration */}
                    <div className="h-1.5 w-full bg-stripe-gradient opacity-30" />
                    <div className={`h-1 w-full bg-gradient-to-r ${product.gradient}`} />

                    {/* Video Section */}
                    <div className="border-b border-neutral-200 dark:border-neutral-800">
                        <VideoCard videoId={product.youtubeId} title={product.name} />
                    </div>

                    <div className="p-3 sm:p-4 flex flex-col h-full">
                        {/* Header: Title & Status */}
                        <div className="flex justify-between items-start mb-2">
                            <div className="relative z-10">
                                <Link href={product.url} target="_blank" className="group/title block">
                                    <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-0.5 flex items-center gap-2 group-hover/title:text-emerald-500 dark:group-hover/title:text-emerald-400 transition-colors">
                                        {product.name}
                                        <IconRocket className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover/title:text-emerald-500 dark:group-hover/title:text-emerald-400 transition-colors" />
                                    </h3>
                                </Link>
                                <Link href={product.url} target="_blank" className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-emerald-500 dark:hover:text-emerald-400 transition-colors flex items-center gap-1 mb-1">
                                    {product.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                                </Link>
                                <p className="text-base font-medium text-transparent bg-clip-text bg-gradient-to-r from-neutral-600 to-neutral-400 dark:from-neutral-400 dark:to-neutral-600">
                                    {product.tagline}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 px-2.5 py-1 bg-emerald-100/50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20">
                                <span className="relative flex h-2 w-2">
                                  <span className="animate-ping absolute inline-flex h-full w-full bg-emerald-400 opacity-75"></span>
                                  <span className="relative inline-flex h-2 w-2 bg-emerald-500"></span>
                                </span>
                                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-mono">
                                    {product.status}
                                </span>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed mb-4 flex-grow text-base">
                            {product.description}
                        </p>

                        {/* Tech Stack & Stats */}
                        <div className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {product.tech.map((tech) => (
                                    <span 
                                        key={tech} 
                                        className="px-2 py-1 text-sm font-mono font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
                                <div className="flex flex-col">
                                    <span className="text-sm text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-semibold">Active Users</span>
                                    <span className="text-lg font-bold text-neutral-900 dark:text-neutral-100 font-mono">{product.stats.value}</span>
                                </div>
                                
                                <Link 
                                    href={product.url} 
                                    target="_blank"
                                    className="group/link"
                                >
                                    <motion.div 
                                        whileHover="hover"
                                        className={`relative px-5 py-2.5 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold text-base flex items-center gap-2 overflow-hidden`}
                                    >
                                        <span className="relative z-10">Visit Site</span>
                                        <IconArrowUpRight className="w-4 h-4 relative z-10 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform" />
                                        
                                        {/* Hover Effect on Button */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                                            variants={{
                                                hover: {
                                                    x: ["0%", "200%"],
                                                    transition: {
                                                        duration: 1.5,
                                                        repeat: Infinity,
                                                        ease: "linear",
                                                    }
                                                }
                                            }}
                                        />
                                    </motion.div>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Background Decorative Elements */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 w-32 h-32 bg-gradient-to-br from-neutral-200 to-transparent dark:from-neutral-800 blur-3xl opacity-20 pointer-events-none" />
                </div>
            </motion.div>
        </motion.div>
    );
};

export const Products = () => {
    return (
        <SectionWrapper id="products" className="py-10 w-full overflow-hidden">
            {/* Section Header */}
            <h2 className="text-2xl font-bold text-left mb-6 text-neutral-900 dark:text-neutral-100">Products</h2>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {products.map((product, index) => (
                    <ProductCard key={product.name} product={product} index={index} />
                ))}
            </div>
            
            {/* Bottom CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-10 text-center"
            >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 text-xs font-mono text-neutral-500 dark:text-neutral-400">
                    <IconSparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>MORE PRODUCTS IN DEVELOPMENT</span>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};
