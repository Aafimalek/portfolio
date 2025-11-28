"use client";
import React from "react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";

export const Contact = () => {
    return (
        <SectionWrapper id="contact" className="py-10 w-full mb-20">
            <h2 className="text-2xl font-bold text-left mb-6">Get in Touch</h2>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-left">Let's Work Together</h3>
                    <p className="text-neutral-600 dark:text-neutral-300 leading-relaxed text-left text-lg">
                        I’m currently seeking exciting roles in AI & ML where I can apply my skills and grow alongside innovative teams. If you have a project, internship, or full-time position you think I’d be a great fit for, let’s connect—I’d love to explore how we can work together.
                    </p>
                    <div className="space-y-4 mt-8">
                        <a href="mailto:aafimalek2023@gmail.com" className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group">
                            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>aafimalek2023@gmail.com</span>
                        </a>
                        <a href="tel:+917574067294" className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group">
                            <Phone className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>+91 7574067294</span>
                        </a>
                        <a href="https://maps.google.com/?q=Ahmedabad,Gujarat" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white transition-colors group">
                            <MapPin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>Ahmedabad, Gujarat</span>
                        </a>
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
