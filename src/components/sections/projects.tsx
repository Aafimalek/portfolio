"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { GlowCard } from "@/components/ui/glow-card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DemoVideo } from "@/components/ui/demo-video";

import { IconArrowUpRight, IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { useState } from "react";

const projects = [
    {
        title: "T3 Chat",
        year: "2025",
        description: "A real-time AI chat application built with the T3 stack.",
        tags: ["T3 Stack", "Next.js", "AI", "Full Stack"],
        videoUrl: "https://www.youtube.com/embed/qjMPYaxhqQw?autoplay=1&mute=1&controls=0&loop=1&playlist=qjMPYaxhqQw",
        liveUrl: "https://t3chat-indol.vercel.app/",
        githubUrl: "https://github.com/Aafimalek/t3_chat",
    },
    {
        title: "Advanced RAG",
        year: "2025",
        description: "Advanced Retrieval-Augmented Generation system.",
        tags: ["RAG", "LLM", "Python"],
        videoUrl: "https://www.youtube.com/embed/boDXKuCHPwU?autoplay=1&mute=1&controls=0&loop=1&playlist=boDXKuCHPwU",
        liveUrl: "https://github.com/Aafimalek/advanced_rag",
        githubUrl: "https://github.com/Aafimalek/advanced_rag",
    },
    {
        title: "Capital Funds Client",
        year: "2025",
        description: "A client application for managing capital funds.",
        tags: ["Finance", "Web App", "React"],
        videoUrl: "https://www.youtube.com/embed/f0A58db1TZc?autoplay=1&mute=1&controls=0&loop=1&playlist=f0A58db1TZc",
        liveUrl: "https://github.com/Aafimalek/capital-funds-client",
        githubUrl: "https://github.com/Aafimalek/capital-funds-client",
    },
    {
        title: "GraphDB",
        year: "2025",
        description: "Ask questions about your graph database.",
        tags: ["Graph Database", "NoSQL", "Database"],
        videoUrl: "https://www.youtube.com/embed/PV9uq7_rR8M?autoplay=1&mute=1&controls=0&loop=1&playlist=PV9uq7_rR8M",
        liveUrl: "https://github.com/Aafimalek/graphdb",
        githubUrl: "https://github.com/Aafimalek/graphdb",
    },
    {
        title: "AI Powered Notes taker",
        year: "2025",
        description: "An AI-powered note-taking application.",
        tags: ["AI", "Next.js", "Full Stack"],
        videoUrl: "https://www.youtube.com/embed/wA5QebPbmDo?autoplay=1&mute=1&controls=0&loop=1&playlist=wA5QebPbmDo",
        liveUrl: "https://www.ai-notez.fun/",
        githubUrl: "https://github.com/Aafimalek/ai-note",
    },
    {
        title: "Reinforcement Learning Snake Game",
        year: "2025",
        description: "Reinforcement Learning agent trained to play the classic Snake game.",
        tags: ["Reinforcement Learning", "Python", "PyTorch"],
        videoUrl: "https://www.youtube.com/embed/AM5Aeo_zyXY?autoplay=1&mute=1&controls=0&loop=1&playlist=AM5Aeo_zyXY",
        liveUrl: "https://github.com/Aafimalek/rl_snake_game",
        githubUrl: "https://github.com/Aafimalek/rl_snake_game",
    },
    {
        title: "Atari Reinforcement Learning",
        year: "2025",
        description: "Deep Q-Network (DQN) agent playing Atari games.",
        tags: ["Reinforcement Learning", "DQN", "Atari"],
        videoUrl: "https://www.youtube.com/embed/usMaydzCVmA?autoplay=1&mute=1&controls=0&loop=1&playlist=usMaydzCVmA",
        liveUrl: "https://github.com/Aafimalek/atari_rl",
        githubUrl: "https://github.com/Aafimalek/atari_rl",
    },
    {
        title: "AskMyDocs",
        year: "2025",
        description: "A RAG-based chatbot that answers questions from PDF documents.",
        tags: ["RAG", "LLM", "Python"],
        videoUrl: "https://www.youtube.com/embed/sQhgRYdJd8I?autoplay=1&mute=1&controls=0&loop=1&playlist=sQhgRYdJd8I",
        liveUrl: "https://chat-with-pdfs-rag.streamlit.app/",
        githubUrl: "https://github.com/Aafimalek/rag_chatbot",
    },
    {
        title: "prompt2animate",
        year: "2025",
        description: "Generates animations using Artificial Intelligence.",
        tags: ["GenAI", "Computer Vision"],
        videoUrl: "https://www.youtube.com/embed/Gx-eURQpvu8?autoplay=1&mute=1&controls=0&loop=1&playlist=Gx-eURQpvu8",
        liveUrl: "https://animation-genai.streamlit.app/",
        githubUrl: "https://github.com/Aafimalek/animation_genai",
    },
    {
        title: "Solvemate",
        year: "2025",
        description: "An intelligent tutor for solving math problems.",
        tags: ["AI", "Education"],
        videoUrl: "https://www.youtube.com/embed/klSQrOH1L_Y?autoplay=1&mute=1&controls=0&loop=1&playlist=klSQrOH1L_Y",
        liveUrl: "https://math-tutor-ai.onrender.com/",
        githubUrl: "https://github.com/Aafimalek/ai_math_tutor",
    },
    {
        title: "pix2caption",
        year: "2025",
        description: "Automatically generates captions for images using Deep Learning.",
        tags: ["Deep Learning", "NLP", "Computer Vision"],
        videoUrl: "https://www.youtube.com/embed/DmJFZut7Hkw?autoplay=1&mute=1&controls=0&loop=1&playlist=DmJFZut7Hkw",
        liveUrl: "https://caption-your-image.streamlit.app/",
        githubUrl: "https://github.com/Aafimalek/image_captioning",
    },
    {
        title: "truevision ai",
        year: "2025",
        description: "Explores deepfake detection for videos and images.",
        tags: ["Security", "Deep Learning"],
        videoUrl: "https://www.youtube.com/embed/1lCQw4nHY6I?autoplay=1&mute=1&controls=0&loop=1&playlist=1lCQw4nHY6I",
        liveUrl: "https://image-verifier.streamlit.app/",
        githubUrl: "https://github.com/Aafimalek/Deepfake_detection",
    },
    {
        title: "film reco",
        year: "2025",
        description: "Recommends movies based on user preferences and viewing history.",
        tags: ["Machine Learning", "Recommendation"],
        videoUrl: "https://www.youtube.com/embed/w1XF9yDszFU?autoplay=1&mute=1&controls=0&loop=1&playlist=w1XF9yDszFU",
        liveUrl: "https://github.com/Aafimalek/film-reco",
        githubUrl: "https://github.com/Aafimalek/film-reco",
    },
    {
        title: "Doodle Predictor",
        year: "2025",
        description: "Predicts and classifies hand-drawn doodles.",
        tags: ["Classification", "CNN"],
        videoUrl: "https://www.youtube.com/embed/dKsLhRZLGAM?autoplay=1&mute=1&controls=0&loop=1&playlist=dKsLhRZLGAM",
        liveUrl: "https://github.com/Aafimalek/doodle_predictor",
        githubUrl: "https://github.com/Aafimalek/doodle_predictor",
    },
    {
        title: "AI Girlfriend Chatbot",
        year: "2025",
        description: "A conversational AI companion.",
        tags: ["Chatbot", "NLP"],
        videoUrl: "https://www.youtube.com/embed/EDMh4IKit5c?autoplay=1&mute=1&controls=0&loop=1&playlist=EDMh4IKit5c",
        liveUrl: "https://github.com/Aafimalek/ex_chatbot",
        githubUrl: "https://github.com/Aafimalek/ex_chatbot",
    }
];

import { motion } from "framer-motion";

const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

/** Show the initial projects and reveal the remainder when requested. */
export const Projects = () => {
    const [showAll, setShowAll] = useState(false);
    const INITIAL_DISPLAY_COUNT = 4;
    
    const displayedProjects = showAll ? projects : projects.slice(0, INITIAL_DISPLAY_COUNT);
    const hasMoreProjects = projects.length > INITIAL_DISPLAY_COUNT;

    return (
        <SectionWrapper id="projects" className="pb-10 w-full">
            <h2>Projects</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                {displayedProjects.map((project, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <GlowCard className="h-full flex flex-col">
                            <DemoVideo youtubeId={getYouTubeId(project.videoUrl) ?? ""} title={project.title} />
                            <div className="flex flex-1 flex-col p-4">
                            <CardHeader className="p-0">
                                <div className="flex justify-between items-start">
                                    <Link href={project.liveUrl} target="_blank" className="hover:underline decoration-neutral-500 underline-offset-4">
                                        <CardTitle className="text-base font-bold text-left flex items-center gap-2">
                                            {project.title}
                                            <IconArrowUpRight className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                                        </CardTitle>
                                    </Link>
                                    <span className="stack-chip">{project.year}</span>
                                </div>
                                <CardDescription className="mt-2 text-left text-sm">{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 mt-auto">
                                <div className="flex flex-wrap gap-2 mt-2 justify-start mb-4">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="stack-chip lowercase">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <Link
                                        href={project.liveUrl}
                                        target="_blank"
                                        className="flex-1"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="product-visit flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all w-full"
                                        >
                                            <IconArrowUpRight className="h-4 w-4" />
                                            Open
                                        </motion.div>
                                    </Link>
                                    <Link
                                        href={project.githubUrl}
                                        target="_blank"
                                        className="flex-1"
                                    >
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="product-visit flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold transition-all w-full"
                                        >
                                            <IconBrandGithub className="h-4 w-4" />
                                            Code
                                        </motion.div>
                                    </Link>
                                </div>
                            </CardContent>
                            </div>
                        </GlowCard>
                    </motion.div>
                ))}
            </div>
            
            {hasMoreProjects && (
                <motion.div 
                    className="flex justify-center mt-8"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    <motion.button
                        onClick={() => setShowAll(!showAll)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="product-visit px-8 py-3 text-xs font-bold transition-all relative overflow-hidden group"
                    >
                        <span className="relative z-10">
                            {showAll ? "show less" : `see more (${projects.length - INITIAL_DISPLAY_COUNT} more)`}
                        </span>
                    </motion.button>
                </motion.div>
            )}
        </SectionWrapper>
    );
};
