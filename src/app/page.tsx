import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Products } from "@/components/sections/products";
import { Projects } from "@/components/sections/projects";
import { Education } from "@/components/sections/education";
import { Blogs } from "@/components/sections/blogs";
import { Contact } from "@/components/sections/contact";

import { GithubStats } from "@/components/sections/github-stats";
import { GridBackground } from "@/components/ui/grid-background";
import { ThemeReanimator } from "@/components/theme-reanimator";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <JsonLd />
      <GridBackground>
        <main className="relative flex min-h-screen flex-col items-center pt-14">
          <Navbar />
          <div className="portfolio-shell relative z-10 mx-auto w-full max-w-[64rem]">
            <div className="portfolio-side-rail hidden lg:block" aria-hidden="true" />
            <div className="portfolio-content min-w-0">
              <ThemeReanimator>
                <Hero />
                <About />
                <Skills />
                <Products />
                <Projects />
                <Blogs />
                <Education />
                <GithubStats />
                <Contact />
              </ThemeReanimator>
            </div>
            <div className="portfolio-side-rail hidden lg:block" aria-hidden="true" />
          </div>
          <SiteFooter />
        </main>
      </GridBackground>
    </>
  );
}
