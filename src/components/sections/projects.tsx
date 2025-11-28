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
        title: "Chat with PDF RAG Chatbot",
        year: "2025",
        description: "A RAG-based chatbot that answers questions from PDF documents.",
        tags: ["RAG", "LLM", "Python"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "AI Animation Generator",
        year: "2025",
        description: "Generates animations using Artificial Intelligence.",
        tags: ["GenAI", "Computer Vision"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "AI Math Tutor",
        year: "2025",
        description: "An intelligent tutor for solving math problems.",
        tags: ["AI", "Education"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "Image Caption Generator",
        year: "2025",
        description: "Automatically generates captions for images using Deep Learning.",
        tags: ["Deep Learning", "NLP", "Computer Vision"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "Deepfake Detection System",
        year: "2025",
        description: "Detects deepfake videos and images with high accuracy.",
        tags: ["Security", "Deep Learning"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "Movie Recommendation System",
        year: "2025",
        description: "Recommends movies based on user preferences and viewing history.",
        tags: ["Machine Learning", "Recommendation"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "Doodle Predictor",
        year: "2025",
        description: "Predicts and classifies hand-drawn doodles.",
        tags: ["Classification", "CNN"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
    },
    {
        title: "AI Girlfriend Chatbot",
        year: "2025",
        description: "A conversational AI companion.",
        tags: ["Chatbot", "NLP"],
        videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1&controls=0&loop=1",
        liveUrl: "https://example.com",
        githubUrl: "https://github.com",
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
