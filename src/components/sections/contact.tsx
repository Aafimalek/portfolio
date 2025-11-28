"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

export const Contact = () => {
    return (
        <SectionWrapper id="contact" className="py-10 w-full mb-20">
            <h2 className="text-2xl font-bold text-left mb-4">Get in Touch</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-left text-lg">
                        I’m currently seeking exciting roles in AI & ML where I can apply my skills and grow alongside innovative teams. If you have a project, internship, or full-time position you think I’d be a great fit for, let’s connect I’d love to explore how we can work together.
                    </p>


                    <div className="space-y-4 mt-8">
                        {[
                            { href: "mailto:aafimalek2023@gmail.com", icon: Mail, text: "aafimalek2023@gmail.com" },
                            { href: "tel:+917574067294", icon: Phone, text: "+91 7574067294" },
                            { href: "https://maps.google.com/?q=Ahmedabad,Gujarat", icon: MapPin, text: "Ahmedabad, Gujarat" },
                            { href: "https://x.com/aafimalek2032", icon: Twitter, text: "Twitter" },
                            { href: "https://linkedin.com/in/aafi-malek", icon: Linkedin, text: "LinkedIn" },
                            { href: "https://github.com/Aafimalek", icon: Github, text: "GitHub" },
                        ].map((item, index) => (
                            <motion.a
                                key={index}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                whileHover={{ x: 5, scale: 1.02 }}
                                className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group p-2 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800"
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.text}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-black p-8 rounded-none border border-neutral-200 dark:border-neutral-800">
                    <form className="space-y-4">
                        <div>
                            <label className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 block text-left">Name</label>
                            <input className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none outline-none focus:border-neutral-400 transition-colors" placeholder="Your Name" />
                        </div>
                        <div>
                            <label className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 block text-left">Email</label>
                            <input className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none outline-none focus:border-neutral-400 transition-colors" placeholder="Your Email" />
                        </div>
                        <div>
                            <label className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 block text-left">Message</label>
                            <textarea className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none outline-none focus:border-neutral-400 transition-colors min-h-[150px]" placeholder="Your Message" />
                        </div>
                        <Button className="w-full">Send Message</Button>
                    </form>
                </div>
            </div>
        </SectionWrapper>
    );
};
