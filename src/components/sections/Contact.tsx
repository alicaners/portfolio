import { profile } from "@content/profile";
import { ui } from "@content/ui";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CopyEmailButton } from "@/components/sections/CopyEmailButton";

export function Contact() {
  return (
    <section id="iletisim" className="contact">
      <div className="contact-grid mx-auto max-w-[1040px] px-5">
        <Reveal>
          <SectionHeading num={ui.sections.contact.num} title={profile.contactHeading} />
          <p className="contact-lead">{profile.contactText}</p>
          <a
            className="btn inline-flex h-[42px] items-center gap-2 rounded-[10px] bg-text px-[18px] text-sm font-[550] text-bg transition-[transform,box-shadow] duration-200 ease-[var(--ease)] hover:-translate-y-px hover:shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--acc)_70%,transparent)]"
            href={profile.cvPath}
            download
          >
            {ui.sections.contact.cv} <span className="ar" aria-hidden="true">↓</span>
          </a>
        </Reveal>
        <Reveal className="card contact-list">
          <div className="contact-row">
            <span className="contact-k">{ui.sections.contact.email}</span>
            <a className="contact-v" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </div>
          <div className="contact-row">
            <span className="contact-k">{ui.sections.contact.linkedin}</span>
            <a className="contact-v" href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer">
              {profile.linkedinLabel}
            </a>
            <span className="contact-out" aria-hidden="true">↗</span>
          </div>
          <div className="contact-row">
            <span className="contact-k">{ui.sections.contact.github}</span>
            <a className="contact-v" href={profile.githubUrl} target="_blank" rel="noopener noreferrer">
              {profile.githubLabel}
            </a>
            <span className="contact-out" aria-hidden="true">↗</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
