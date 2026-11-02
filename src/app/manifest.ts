import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: "Aafi Malek - AI/ML Engineer Portfolio",
        short_name: "Aafi Malek",
        description:
            "Aafi Malek is an AI/ML engineer building agents, retrieval systems, speech applications and open-source software.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        orientation: "portrait-primary",
        categories: ["portfolio", "technology", "education"],
        icons: [
            {
                src: "/favicon.png",
                sizes: "any",
                type: "image/png",
                purpose: "any",
            },
            {
                src: "/favicon.png",
                sizes: "any",
                type: "image/png",
                purpose: "maskable",
            },
        ],
    };
}
