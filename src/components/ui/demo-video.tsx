"use client";

import { useEffect, useRef, useState } from "react";
import { IconPlayerPlay } from "@tabler/icons-react";

// Loop a short silent clip while it is on screen. Clicking opens the full demo with sound.
export function DemoVideo({ youtubeId, title }: { youtubeId: string; title: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) void video.play().catch(() => undefined);
            else video.pause();
        }, { threshold: 0.2 });
        observer.observe(video);
        return () => observer.disconnect();
    }, [isOpen]);

    if (isOpen) {
        return (
            <div className="media-frame relative aspect-video w-full">
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                    title={title}
                    className="absolute left-0 top-0 h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        );
    }

    return (
        <button
            type="button"
            className="demo-video media-frame relative block aspect-video w-full cursor-pointer overflow-hidden"
            onClick={() => setIsOpen(true)}
            aria-label={`Play ${title} demo`}
        >
            <video
                ref={videoRef}
                src={`/demos/${youtubeId}.mp4`}
                poster={`/demos/${youtubeId}.jpg`}
                className="h-full w-full object-cover"
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
            />
            <span className="demo-play"><IconPlayerPlay className="h-5 w-5 fill-current" /></span>
        </button>
    );
}
