"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import Image from "next/image";

export const Hero = () => {
    return (
        <div className="w-full pt-20 pb-10">
            <div className="flex flex-col-reverse md:flex-row items-center justify-start gap-12">
                <div className="flex flex-col items-start justify-center z-20">
                    <h1 className="text-4xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-2 text-left">
                        hi, aafi here
                    </h1>
                    <p className="text-neutral-500 max-w-lg my-2 text-xl text-left">
                        AI & ML Engineer | Turning complex concepts into real-world solutions
                    </p>
                    <div className="flex gap-4 mt-8">
                        <a href="#projects">
                            <Button variant="outline">
                                View Projects
                            </Button>
                        </a>
                        <a href="/RESUME_AAFIKHAN_MALEK.pdf" download="RESUME_AAFIKHAN_MALEK.pdf">
                            <Button>
                                <Download className="mr-2 h-4 w-4" /> Download Resume
                            </Button>
                        </a>
                    </div>
                </div>
                <div className="relative w-40 h-40 md:w-64 md:h-64 rounded-full overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
                    <Image
                        src="/profile_picture.jpg"
                        alt="Aafi Malek"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </div>
    );
}
