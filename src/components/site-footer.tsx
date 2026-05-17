import { Github, Linkedin, Mail, Rss, Twitter } from "lucide-react";

const footerLinks = [
    { label: "GitHub", href: "https://github.com/Aafimalek", icon: Github },
    { label: "X", href: "https://x.com/aafimalek2032", icon: Twitter },
    { label: "LinkedIn", href: "https://linkedin.com/in/aafi-malek", icon: Linkedin },
    { label: "Email", href: "mailto:aafimalek2023@gmail.com", icon: Mail },
    { label: "RSS", href: "#blogs", icon: Rss },
];

const footerName = "AAFI MALEK";

export const SiteFooter = () => {
    return (
        <footer id="site-footer" className="site-footer">
            <div className="footer-hatch" aria-hidden="true" />
            <div className="footer-copy">
                <p>
                    Built by <span>Aafi Malek</span>. Source code on <a href="https://github.com/Aafimalek" target="_blank" rel="noopener noreferrer">GitHub</a>.
                </p>
            </div>
            <nav className="footer-links" aria-label="Footer links">
                {footerLinks.map((link) => {
                    const Icon = link.icon;

                    return (
                        <a
                            key={link.label}
                            href={link.href}
                            target={link.href.startsWith("http") ? "_blank" : undefined}
                            rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            aria-label={link.label}
                        >
                            <Icon className="h-4 w-4" />
                        </a>
                    );
                })}
            </nav>
            <div className="footer-name-blocks" aria-label="Aafi Malek">
                {footerName.split("").map((character, index) => (
                    <span key={`${character}-${index}`} className={character === " " ? "is-space" : undefined}>
                        {character}
                    </span>
                ))}
            </div>
        </footer>
    );
};
