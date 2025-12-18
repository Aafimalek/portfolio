export function JsonLd() {
    const personSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Aafi Malek",
        alternateName: ["Aafikhan Malek", "Aafi khan Malek"],
        jobTitle: "AI/ML Engineer & Full Stack Developer",
        description:
            "AI/ML Engineering student at L.D. College Of Engineering, Ahmedabad. Full Stack Developer from Jamnagar, Gujarat building innovative machine learning solutions and web applications.",
        url: "https://www.aafimalek.live",
        image: "https://www.aafimalek.live/profile_picture.jpg",
        email: "mailto:aafimalek@gmail.com",
        sameAs: [
            "https://github.com/Aafimalek",
            "https://linkedin.com/in/aafimalek",
            "https://twitter.com/aafimalek",
        ],
        address: {
            "@type": "PostalAddress",
            addressLocality: "Jamnagar",
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
        url: "https://www.aafimalek.live",
        description:
            "Portfolio of Aafi Malek - AI/ML Engineer and Full Stack Developer",
        author: {
            "@type": "Person",
            name: "Aafi Malek",
        },
        potentialAction: {
            "@type": "SearchAction",
            target: "https://www.aafimalek.live/?q={search_term_string}",
            "query-input": "required name=search_term_string",
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
        dateCreated: "2024-01-01",
        dateModified: new Date().toISOString().split("T")[0],
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
