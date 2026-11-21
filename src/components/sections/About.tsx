import { about } from "@content/about";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="hakkimda" className="py-[72px]">
      <div className="mx-auto max-w-[1040px] px-5">
        <Reveal>
          <SectionHeading num="01" title={about.title} />
        </Reveal>
        <Reveal className="card aboutc">
          <div className="px-6 py-[22px]">
            {about.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`mb-3 text-[15px] leading-[1.7] last:mb-0 ${i === 0 ? "text-text" : "text-muted"}`}
              >
                {p}
              </p>
            ))}
          </div>
          <dl className="akv">
            {about.facts.map((f) => (
              <div key={f.label}>
                <dt className="font-mono text-xs text-dim">{f.label}</dt>
                <dd className="m-0 mt-0.5 text-sm font-medium">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
