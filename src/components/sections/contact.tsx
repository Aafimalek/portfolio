"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Twitter, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";

export const Contact = () => {
    return (
        <SectionWrapper id="contact" className="py-10 w-full mb-20">
            <h2 className="text-2xl font-bold text-left mb-4">Get in Touch</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10">
                <div className="space-y-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.02 } }
                        }}
                        className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-left text-lg flex flex-wrap gap-1"
                    >
                        {"I’m currently seeking exciting roles in AI & ML where I can apply my skills and grow alongside innovative teams. If you have a project, internship, or full-time position you think I’d be a great fit for, let’s connect I’d love to explore how we can work together.".split(" ").map((word, index) => (
                            <motion.span
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 10 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                            >
                                {word}
                            </motion.span>
                        ))}
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={{
                            visible: { transition: { staggerChildren: 0.1 } }
                        }}
                        className="space-y-4 mt-8"
                    >
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
                                variants={{
                                    hidden: { opacity: 0, x: -20 },
                                    visible: { opacity: 1, x: 0 }
                                }}
                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                whileHover={{ x: 10, scale: 1.02, backgroundColor: "rgba(0,0,0,0.05)" }}
                                className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group p-2 rounded-none"
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.text}</span>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>


                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-full"
                >
                    <GlowCard className="h-full">
                        <div className="p-8 h-full">
                            <form className="space-y-4" onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.currentTarget);
                                const name = formData.get("name");
                                const email = formData.get("email");
                                const message = formData.get("message");
                                const whatsappMessage = `Name: ${name}%0AEmail: ${email}%0AMessage: ${message}`;
                                window.open(`https://wa.me/917574067294?text=${whatsappMessage}`, "_blank");
                            }}>
                                <div>
                                    <label className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 block text-left">Name</label>
                                    <motion.input
                                        name="name"
                                        required
                                        whileFocus={{ scale: 1.01, borderColor: "#a3a3a3" }}
                                        className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none outline-none transition-all"
                                        placeholder="Your Name"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 block text-left">Email</label>
                                    <motion.input
                                        name="email"
                                        type="email"
                                        required
                                        whileFocus={{ scale: 1.01, borderColor: "#a3a3a3" }}
                                        className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none outline-none transition-all"
                                        placeholder="Your Email"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-neutral-600 dark:text-neutral-300 mb-2 block text-left">Message</label>
                                    <motion.textarea
                                        name="message"
                                        required
                                        whileFocus={{ scale: 1.01, borderColor: "#a3a3a3" }}
                                        className="w-full p-3 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-none outline-none transition-all min-h-[150px]"
                                        placeholder="Your Message"
                                    />
                                </div>
                                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                    <Button className="w-full" type="submit">Send Message</Button>
                                </motion.div>
                            </form>
                        </div>
                    </GlowCard>
                </motion.div>
            </div>
        </SectionWrapper>
    );
};
