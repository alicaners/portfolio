import { projects, projectsNote } from "@content/projects";
import { ui, repoLabel, repoSoonLabel } from "@content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";

export function Projects() {
  return (
    <section id="projeler" className="pt-6 pb-[72px]">
      <div className="mx-auto max-w-[1040px] px-5">
        <Reveal>
          <SectionHeading num={ui.sections.projects.num} title={ui.sections.projects.title} aside={projectsNote} />
        </Reveal>
        <div className="grid gap-3">
          {projects.map((p, i) => (
            <Reveal key={p.name} className="card proj">
              <span className="proj-n self-start pt-[3px] font-mono text-xs text-dim" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="m-0 mb-1 flex flex-wrap items-center gap-2.5 text-[18px] font-semibold tracking-[-0.02em]">
                  {p.name} <Tag variant={p.status}>{ui.status[p.status]}</Tag>
                </h3>
                <p className="m-0 max-w-[72ch] text-[14.5px] text-muted">{p.description}</p>
                <div className="mt-2 font-mono text-xs text-dim">{p.stack.join(" · ")}</div>
              </div>
              {p.repoUrl ? (
                <a
                  className="proj-go"
                  href={p.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={repoLabel(p.name)}
                >
                  ↗
                </a>
              ) : (
                <span
                  className="proj-go is-off"
                  title={ui.repoSoon}
                  role="img"
                  aria-label={repoSoonLabel(p.name)}
                >
                  ↗
                </span>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
