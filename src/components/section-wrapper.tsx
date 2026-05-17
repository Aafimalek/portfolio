"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const SectionWrapper = ({ children, className, id }: { children: React.ReactNode; className?: string; id?: string }) => {
    return (
        <motion.section
            id={id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className={cn("linework-section scroll-mt-16", className)}
        >
            <div aria-hidden="true" className="linework-layer">
                <span className="linework-notch linework-notch-a" />
                <span className="linework-notch linework-notch-b" />
            </div>
            {children}
        </motion.section>
    );
};
