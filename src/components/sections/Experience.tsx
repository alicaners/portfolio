import type { ComponentType } from "react";
import { experience, type ExperienceItem } from "@content/experience";
import { ui } from "@content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { UsersIcon, BriefcaseIcon, RocketIcon, WavesIcon } from "@/components/ui/icons";

const icons: Record<ExperienceItem["icon"], ComponentType<{ className?: string }>> = {
  users: UsersIcon,
  briefcase: BriefcaseIcon,
  rocket: RocketIcon,
  waves: WavesIcon,
};

export function Experience() {
  return (
    <section id="deneyim" className="pt-6 pb-[72px]">
      <div className="mx-auto max-w-[1040px] px-5">
        <Reveal>
          <SectionHeading num={ui.sections.experience.num}
            title={ui.sections.experience.title}
            aside={ui.sections.experience.aside} />
        </Reveal>
        <div className="xp-grid">
          {experience.map((x) => {
            const Icon = icons[x.icon];
            return (
              <Reveal key={x.name} className={`card xp-card${x.highlight ? " is-hi" : ""}`}>
                <div className="xp-top">
                  <span className="xp-icon">
                    <Icon />
                  </span>
                  <Tag variant={x.highlight ? "done" : "default"}>{x.tag}</Tag>
                </div>
                <h3>{x.name}</h3>
                <p className="xp-role">{x.role}</p>
                <p className="xp-meta">{x.meta}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
