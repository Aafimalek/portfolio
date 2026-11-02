// Describe the public profile and its verified contact links for search engines.
export function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Aafi Malek",
        alternateName: ["Aafikhan Malek", "Aafi khan Malek"],
        jobTitle: "AI/ML Engineer & Full Stack Developer",
        description:
            "AI/ML engineer building agents, retrieval systems, speech applications and open-source software.",
        url: "https://aafi.vercel.app",
        image: "https://aafi.vercel.app/profile_picture.jpg",
        email: "mailto:aafimalek2023@gmail.com",
        sameAs: [
            "https://github.com/Aafimalek",
            "https://linkedin.com/in/aafi-malek",
            "https://x.com/aafimalek2032",
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Ahmedabad",
            addressRegion: "Gujarat",
            addressCountry: "India",
        },
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "L.D. College Of Engineering",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Ahmedabad",
                addressRegion: "Gujarat",
                addressCountry: "India",
            },
        },
        knowsAbout: [
            "Artificial Intelligence",
            "Machine Learning",
            "Deep Learning",
            "Full Stack Development",
            "Python",
            "React",
            "Next.js",
            "Web Development",
            "Data Science",
        ],
    };

    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: "Aafi Malek Portfolio",
        alternateName: "Aafikhan Malek Portfolio",
        url: "https://aafi.vercel.app",
        description:
            "Portfolio of Aafi Malek - AI/ML Engineer and Full Stack Developer",
        author: {
            "@type": "Person",
            name: "Aafi Malek",
        },
    };

    const profilePageSchema = {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
            "@type": "Person",
            name: "Aafi Malek",
            alternateName: ["Aafikhan Malek", "Aafi khan Malek"],
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
        </>
    );
}
