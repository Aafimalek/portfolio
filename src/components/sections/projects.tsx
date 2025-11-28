"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { IconBrandGithub, IconWorld, IconPlayerPlay } from "@tabler/icons-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const projects = [
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
        description: "Detects deepfake videos and images with high accuracy.",
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

const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
};

const VideoCard = ({ videoUrl, title }: { videoUrl: string, title: string }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = getYouTubeId(videoUrl);
    const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";

    if (isPlaying) {
        return (
            <div className="relative w-full aspect-video">
                <iframe
                    src={videoUrl}
                    title={title}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <div
            className="relative w-full aspect-video cursor-pointer group overflow-hidden bg-neutral-100 dark:bg-neutral-900"
            onClick={() => setIsPlaying(true)}
        >
            {thumbnailUrl && (
                <Image
                    src={thumbnailUrl}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-none flex items-center justify-center group-hover:bg-white/50 transition-colors">
                    <IconPlayerPlay className="w-6 h-6 text-white fill-white" />
                </div>
            </div>
        </div>
    );
};

export const Projects = () => {
    return (
        <SectionWrapper id="projects" className="py-10 w-full">
            <h2 className="text-2xl font-bold text-left mb-6">Projects</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <Card key={index} className="bg-white/50 dark:bg-black/50 backdrop-blur-sm border-neutral-200 dark:border-neutral-800 overflow-hidden">
                        <VideoCard videoUrl={project.videoUrl} title={project.title} />
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <Link href={project.liveUrl} target="_blank" className="hover:underline decoration-neutral-500 underline-offset-4">
                                    <CardTitle className="text-base font-bold text-left flex items-center gap-2">
                                        {project.title}
                                        <IconWorld className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
                                    </CardTitle>
                                </Link>
                                <Badge variant="secondary" className="text-[10px]">{project.year}</Badge>
                            </div>
                            <CardDescription className="mt-2 text-left text-sm">{project.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2 mt-2 justify-start mb-4">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="text-[10px] px-2 py-1 bg-neutral-100 dark:bg-neutral-900 rounded-none text-neutral-600 dark:text-neutral-300 lowercase">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <Link
                                    href={project.liveUrl}
                                    target="_blank"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-none text-xs font-medium hover:opacity-90 transition-opacity"
                                >
                                    <IconWorld className="h-4 w-4" />
                                    Live Demo
                                </Link>
                                <Link
                                    href={project.githubUrl}
                                    target="_blank"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-none text-xs font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                                >
                                    <IconBrandGithub className="h-4 w-4" />
                                    GitHub
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </SectionWrapper>
    );
};
