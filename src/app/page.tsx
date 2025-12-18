import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Products } from "@/components/sections/products";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Contact } from "@/components/sections/contact";

import { GithubStats } from "@/components/sections/github-stats";
import { GridBackground } from "@/components/ui/grid-background";
import { ThemeReanimator } from "@/components/theme-reanimator";
import { JsonLd } from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <GridBackground>
        <main className="flex min-h-screen flex-col items-center justify-between relative">
          <Navbar />
          <div className="relative z-10 w-full max-w-5xl mx-auto bg-white/50 dark:bg-black/50 shadow-[-20px_0_50px_0_rgba(0,0,0,0.3),20px_0_50px_0_rgba(0,0,0,0.3)] dark:shadow-[-20px_0_50px_0_rgba(255,255,255,0.15),20px_0_50px_0_rgba(255,255,255,0.15)]">
            {/* Left Striped Border */}
            <div className="hidden sm:block absolute top-0 left-0 w-8 h-full z-20 bg-stripe-gradient border-r-2 border-black/10 dark:border-white/10 shadow-md" />

            {/* Right Striped Border */}
            <div className="hidden sm:block absolute top-0 right-0 w-8 h-full z-20 bg-stripe-gradient border-l-2 border-black/10 dark:border-white/10 shadow-md" />

            <div className="px-4 sm:px-8 md:px-16 py-8">
              <ThemeReanimator>
                <Hero />
                <About />
                <Skills />
                <Products />
                <Projects />
                <Education />
                <GithubStats />
                <Contact />
              </ThemeReanimator>
              <footer className="w-full py-6 text-center text-sm text-neutral-600 dark:text-neutral-300 border-t border-neutral-200 dark:border-neutral-800">
                © {new Date().getFullYear()} AI/ML Portfolio. All rights reserved.
              </footer>
            </div>
          </div>
        </main>
      </GridBackground>
    </>
  );
}
