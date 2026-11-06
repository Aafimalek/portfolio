"use client";

import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "@/components/section-wrapper";

const aboutPoints = [
    "AI/ML Engineer at DatumQuest since July 2026, after joining as an intern in January. I build Python LLM applications, multi-agent workflows, enterprise RAG and GraphRAG, and real-time voice AI.",
    "I own the FastAPI backends for four applied AI initiatives, covering agent automation, voice operations, enterprise knowledge retrieval and multimodal content.",
    "My agents run on LangGraph, Google ADK and MCP, with memory, permission scopes and human approval. That work improved task completion by 22% on a 120-scenario internal evaluation.",
    "I designed hybrid GraphRAG with Neo4j and Pinecone/Qdrant, adding evidence citations and grounded-answer checks that cut unsupported responses by 30% in test scenarios.",
    "I care about evaluation and observability. Langfuse traces, golden datasets and repeatable regression tests shortened release validation by 35%.",
    "I also contribute to open-source AI tools. Outside code, I watch films, listen to music, and follow long technical rabbit holes until they turn into projects.",
];

// Present Aafi's current focus and interests in his own voice.
export const About = () => {
    return (
        <SectionWrapper id="about" className="w-full pb-10">
            <h2>About</h2>
            <motion.ul
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    visible: { transition: { staggerChildren: 0.06 } },
                }}
                className="section-list"
            >
                {aboutPoints.map((point) => (
                    <motion.li
                        key={point}
                        variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        {point}
                    </motion.li>
                ))}
            </motion.ul>
        </SectionWrapper>
    );
};
