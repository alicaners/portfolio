import Image from "next/image";
import { education } from "@content/education";
import { ui, sessionsLabel } from "@content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tag } from "@/components/ui/Tag";
import { CapIcon } from "@/components/ui/icons";

export function Education() {
  const { university, programs, featured, btk } = education;
  return (
    <section id="egitim" className="pt-6 pb-[72px]">
      <div className="mx-auto max-w-[1040px] px-5">
        <Reveal>
          <SectionHeading num={ui.sections.education.num} title={ui.sections.education.title} />
        </Reveal>

        <Reveal className="card edu-uni">
          <span className="xp-icon">
            <CapIcon />
          </span>
          <div className="edu-uni-text">
            <h3>{university.name}</h3>
            <p>{university.degree}</p>
          </div>
          <span className="edu-years">{university.years}</span>
        </Reveal>

        <div className="edu-programs">
          {programs.map((p) => (
            <Reveal key={p.name} className="card edu-prog">
              <div className="edu-prog-top">
                <h3>{p.name}</h3>
                <Tag variant="wip">{p.status}</Tag>
              </div>
              <p className="edu-prog-meta">{p.meta}</p>
              {p.body ? <p>{p.body}</p> : null}
              {p.modules ? (
                <ul className="edu-mods">
                  {p.modules.map((m) => (
                    <li key={m.name}>
                      <b>{m.name}</b>
                      <span>{sessionsLabel(m.sessions)}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
          ))}
        </div>

        <Reveal className="card edu-feat">
          <div className="edu-feat-logo">
            <span>{featured.issuer[0]}</span>
            <i aria-hidden="true" />
            <span>{featured.issuer[1]}</span>
          </div>
          <div className="edu-feat-body">
            <h3>{featured.title}</h3>
            <p>{featured.description}</p>
          </div>
        </Reveal>

        <Reveal as="p" className="cert-label">
          {ui.sections.education.btkLabel}
        </Reveal>
        <div className="cert-grid">
          {btk.map((name) => (
            <Reveal key={name} className="card cert-card">
              <span className="cert-logo">
                <Image
                  src="/images/btk-akademi.png"
                  width={780}
                  height={283}
                  alt={ui.sections.education.btkAlt}
                  sizes="68px"
                />
              </span>
              <h3>{name}</h3>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
