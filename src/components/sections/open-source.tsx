import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { SectionWrapper } from "@/components/section-wrapper";
import { Marked } from "@/components/ui/marks";

// Each link points to Aafi's actual pull request, whose status can change over time.
const contributions = [
    {
        project: "Unsloth",
        logo: "https://avatars.githubusercontent.com/u/150920049?v=4",
        title: "Record audio directly for chat models",
        description: "A recording control that attaches audio to the chat composer.",
        url: "https://github.com/unslothai/unsloth/pull/16078",
        label: "PR #16078",
    },
    {
        project: "browser-use",
        logo: "https://avatars.githubusercontent.com/u/192012301?v=4",
        title: "Defer download directory creation",
        description: "Create the default directory when a browser needs it.",
        url: "https://github.com/browser-use/browser-use/pull/6243",
        label: "PR #6243",
    },
    {
        project: "mcp-use",
        logo: "https://avatars.githubusercontent.com/u/207005519?v=4",
        title: "Isolate elicitation array defaults",
        description: "Prevent returned arrays from mutating the request schema.",
        url: "https://github.com/mcp-use/mcp-use/pull/3000",
        label: "PR #3000",
    },
    {
        project: "OpenCode",
        logo: "https://avatars.githubusercontent.com/u/66570915?v=4",
        title: "Wait for integration activation",
        description: "Wait for plugins before looking up their integrations.",
        url: "https://github.com/anomalyco/opencode/pull/59851",
        label: "PR #59851",
    },
];

// Show a featured contribution and compact links to other upstream pull requests.
export function OpenSource() {
    return (
        <SectionWrapper id="open-source" className="w-full pb-10">
            <h2>Open source</h2>
            <div className="contribution-intro">
                <p><Marked text="I contribute to the ~AI tools~ and developer infrastructure I use." /></p>
                <a href="https://github.com/pulls?q=is%3Apr+author%3AAafimalek" target="_blank" rel="noopener noreferrer">
                    All pull requests <ArrowUpRight aria-hidden="true" size={16} />
                </a>
            </div>
            <div className="contribution-list">
                {contributions.map((item, index) => (
                    <a key={item.url} className={`contribution-card${index === 0 ? " contribution-featured" : ""}`} href={item.url} target="_blank" rel="noopener noreferrer">
                        <Image className="contribution-logo" src={item.logo} alt="" width={56} height={56} />
                        <div className="contribution-copy">
                            <span className="contribution-project">{item.project} <span>{item.label}</span></span>
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                        <span className="contribution-arrow"><ArrowUpRight aria-hidden="true" size={19} /></span>
                    </a>
                ))}
            </div>
        </SectionWrapper>
    );
}
