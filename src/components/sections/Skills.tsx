import { skills } from "@content/skills";
import { ui } from "@content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MarqueeToggle } from "@/components/sections/MarqueeToggle";

function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className="marquee-group">
      {items.map((t) => (
        <li key={t} className="chip">
          {t}
        </li>
      ))}
    </ul>
  );
}

export function Skills() {
  const s = ui.sections.skills;
  return (
    <section id="beceriler" className="pt-6 pb-[72px]">
      <div className="mx-auto max-w-[1040px] px-5">
        <Reveal>
          <SectionHeading num={s.num} title={s.title} aside={skills.note} />
        </Reveal>
        <div className="mb-3 flex justify-end">
          <MarqueeToggle targetId="marquee" pauseLabel={s.pause} playLabel={s.play} />
        </div>
        <Reveal id="marquee" className="marquee" role="group" aria-label={s.title}>
          {skills.rows.map((row, i) => (
            <div key={i} className="marquee-row">
              <Chips items={row} />
              <div className="marquee-dup" aria-hidden="true">
                <Chips items={row} />
              </div>
            </div>
          ))}
        </Reveal>
        <Reveal as="p" className="mt-4 text-[13px] text-muted">
          <span className="mr-1.5 font-mono text-xs text-dim">{s.learning}</span>
          {skills.learning.join(" · ")}
        </Reveal>
      </div>
    </section>
  );
}
