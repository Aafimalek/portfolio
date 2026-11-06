import Image from "next/image";
import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import { SiDocker, SiFastapi, SiGit, SiGithubactions, SiJavascript, SiLangchain, SiMongodb, SiNeo4J, SiNextdotjs, SiPostgresql, SiPython, SiPytorch, SiReact, SiRedis, SiTypescript } from "react-icons/si";
import { SectionWrapper } from "@/components/section-wrapper";

type TechItem = { name: string; icon: IconType | string; color: string };
type TechStyle = CSSProperties & { "--tech-color": string };

// Use the installed brand icons; Simple Icons supplies the two newer marks not in this version.
const techGroups: { name: string; items: TechItem[] }[] = [
    { name: "AI / ML", items: [
        { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
        { name: "LangGraph", icon: "https://cdn.simpleicons.org/langgraph/27a78a", color: "#27a78a" },
        { name: "LangChain", icon: SiLangchain, color: "#21a789" },
        { name: "MCP", icon: "https://cdn.simpleicons.org/modelcontextprotocol/718da8", color: "#718da8" },
    ] },
    { name: "Languages", items: [
        { name: "Python", icon: SiPython, color: "#3776ab" },
        { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
        { name: "JavaScript", icon: SiJavascript, color: "#d5ad00" },
    ] },
    { name: "Product", items: [
        { name: "FastAPI", icon: SiFastapi, color: "#009688" },
        { name: "React", icon: SiReact, color: "#23a4c2" },
        { name: "Next.js", icon: SiNextdotjs, color: "#8699a8" },
    ] },
    { name: "Data / infra", items: [
        { name: "PostgreSQL", icon: SiPostgresql, color: "#4169e1" },
        { name: "Neo4j", icon: SiNeo4J, color: "#458be8" },
        { name: "MongoDB", icon: SiMongodb, color: "#47a248" },
        { name: "Redis", icon: SiRedis, color: "#ff4438" },
        { name: "Docker", icon: SiDocker, color: "#2496ed" },
        { name: "Git", icon: SiGit, color: "#f05032" },
        { name: "GitHub Actions", icon: SiGithubactions, color: "#2088ff" },
    ] },
];

// Group Aafi's technologies by use and pair each with its real brand mark.
export function Skills() {
    return (
        <SectionWrapper id="skills" className="w-full pb-10">
            <h2>Tech stack</h2>
            <p className="section-intro">The tools I use to build AI systems, APIs and products.</p>
            <div className="tech-groups">
                {techGroups.map((group) => (
                    <div className="tech-group" key={group.name}>
                        <h3>{group.name}</h3>
                        <div className="tech-group-items">
                            {group.items.map((tech) => {
                                const style: TechStyle = { "--tech-color": tech.color };
                                const Icon = tech.icon;
                                return (
                                    <div className="tech-pill" key={tech.name} style={style}>
                                        {typeof Icon === "string" ? <Image src={Icon} alt="" width={22} height={22} unoptimized /> : <Icon aria-hidden="true" />}
                                        <span>{tech.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
}
