import { ArrowUpRight, Github, Linkedin, Mail, Twitter } from "lucide-react";
import Image from "next/image";

const footerLinks = [
    { label: "GitHub", href: "https://github.com/Aafimalek", icon: Github },
    { label: "LinkedIn", href: "https://linkedin.com/in/aafi-malek", icon: Linkedin },
    { label: "X", href: "https://x.com/aafimalek2032", icon: Twitter },
    { label: "Email", href: "mailto:aafimalek2023@gmail.com", icon: Mail },
];

// Close the portfolio with useful navigation, contact links and its existing pixel identity.
export function SiteFooter() {
    return (
        <footer id="site-footer" className="site-footer portfolio-footer">
            <div className="footer-hatch" aria-hidden="true" />
            <div className="footer-inner">
                <div className="footer-brand">
                    <p className="footer-wordmark">Aafi Malek<span aria-hidden="true">.</span></p>
                    <p>AI / ML engineer<br />Building with open source.</p>
                    <a className="footer-contact" href="mailto:aafimalek2023@gmail.com">Get in touch <ArrowUpRight aria-hidden="true" size={17} /></a>
                </div>
                <div className="footer-columns">
                    <nav aria-label="Explore the portfolio">
                        <h3>Explore</h3>
                        <a href="#open-source">Open source</a><a href="#skills">Tech stack</a><a href="#products">Products</a><a href="#projects">Projects</a><a href="#blogs">Writing</a>
                    </nav>
                    <nav aria-label="Social links">
                        <h3>Connect</h3>
                        {footerLinks.map((link) => {
                            const Icon = link.icon;
                            return <a key={link.label} href={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}><Icon aria-hidden="true" size={15} />{link.label}</a>;
                        })}
                    </nav>
                </div>
            </div>
            <div className="footer-art" aria-hidden="true">
                <Image src="/footer-landscape.png" alt="" fill sizes="100vw" quality={85} />
            </div>
            <div className="footer-bottom">
                <span>Built by Aafi Malek</span>
                <div><a href="https://github.com/Aafimalek/portfolio" target="_blank" rel="noopener noreferrer">View source <ArrowUpRight aria-hidden="true" size={14} /></a><a href="#">Back to top ↑</a></div>
            </div>
        </footer>
    );
}
