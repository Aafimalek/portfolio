import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";

export const About = () => {
    return (
        <SectionWrapper id="about" className="py-20 w-full">
            <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-widest">About Me</h2>
            <div className="max-w-4xl mx-auto px-4 text-center text-neutral-600 dark:text-neutral-400">
                <p>
                    I am a passionate AI/ML Engineer with a strong background in building intelligent systems.
                    I love to explore new technologies and apply them to solve real-world problems.
                </p>
            </div>
        </SectionWrapper>
    );
};

export const Skills = () => {
    return (
        <SectionWrapper id="skills" className="py-20 w-full bg-neutral-50 dark:bg-neutral-900/50">
            <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-widest">Skills</h2>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p>Python, PyTorch, TensorFlow, Next.js, TypeScript, Docker, AWS</p>
            </div>
        </SectionWrapper>
    );
};

export const Projects = () => {
    return (
        <SectionWrapper id="projects" className="py-20 w-full">
            <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-widest">Projects</h2>
            <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 border rounded-lg">Project 1</div>
                <div className="p-6 border rounded-lg">Project 2</div>
            </div>
        </SectionWrapper>
    );
};

export const Education = () => {
    return (
        <SectionWrapper id="education" className="py-20 w-full bg-neutral-50 dark:bg-neutral-900/50">
            <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-widest">Education</h2>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p>Bachelor of Science in Computer Science</p>
            </div>
        </SectionWrapper>
    );
};

export const Blog = () => {
    return (
        <SectionWrapper id="blog" className="py-20 w-full">
            <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-widest">Blog</h2>
            <div className="max-w-4xl mx-auto px-4 text-center">
                <p>Coming soon...</p>
            </div>
        </SectionWrapper>
    );
};

export const Contact = () => {
    return (
        <SectionWrapper id="contact" className="py-20 w-full bg-neutral-50 dark:bg-neutral-900/50">
            <h2 className="text-4xl font-bold text-center mb-10 uppercase tracking-widest">Contact Me</h2>
            <div className="max-w-xl mx-auto px-4">
                <form className="space-y-4">
                    <input className="w-full p-2 border rounded" placeholder="Name" />
                    <input className="w-full p-2 border rounded" placeholder="Email" />
                    <textarea className="w-full p-2 border rounded" placeholder="Message" />
                    <button className="px-4 py-2 bg-black text-white rounded uppercase tracking-widest">Send</button>
                </form>
            </div>
        </SectionWrapper>
    );
};
