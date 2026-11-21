import { profile } from "@content/profile";
import { ui } from "@content/ui";

// intro cümlesini introEmphasis öğelerinden bölüp o parçaları <b> ile vurgular.
function renderIntro(text: string, emphasis: readonly string[]) {
  let parts: string[] = [text];
  for (const e of emphasis) {
    parts = parts.flatMap((part) =>
      emphasis.includes(part) ? [part] : part.split(e).flatMap((s, i) => (i === 0 ? [s] : [e, s])),
    );
  }
  return parts.map((part, i) =>
    emphasis.includes(part) ? (
      <b key={i} className="font-[550] text-text">
        {part}
      </b>
    ) : (
      part
    ),
  );
}

const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pb-16 pt-[136px]">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1040px] px-5">
        <span
          className="avail up inline-flex items-center gap-2 rounded-full border border-line2 py-[5px] pl-[9px] pr-3 font-mono text-xs text-muted"
          style={{
            ...delay(80),
            background: "color-mix(in srgb, var(--card) 60%, transparent)",
          }}
        >
          <i />
          {profile.status}
        </span>
        <h1
          className="hero-title up mb-4 mt-5 text-[clamp(36px,5.4vw,58px)] font-[620] leading-[1.04] tracking-[-0.04em]"
          style={delay(160)}
        >
          {profile.name}{" "}
          <span>{profile.title}</span>
        </h1>
        <p className="up mb-[26px] max-w-[56ch] text-[16.5px] text-muted" style={delay(240)}>
          {renderIntro(profile.intro, profile.introEmphasis)}
        </p>
        <div className="up flex flex-wrap gap-[10px]" style={delay(320)}>
          <a
            className="btn inline-flex h-[42px] items-center gap-2 rounded-[10px] bg-text px-[18px] text-sm font-[550] text-bg transition-[transform,box-shadow] duration-200 ease-[var(--ease)] hover:-translate-y-px hover:shadow-[0_8px_24px_-10px_color-mix(in_srgb,var(--acc)_70%,transparent)]"
            href="#projeler"
          >
            {ui.hero.projects} <span className="ar" aria-hidden="true">→</span>
          </a>
          <a
            className="btn inline-flex h-[42px] items-center gap-2 rounded-[10px] border border-line2 px-[18px] text-sm font-[550] transition-colors duration-200 ease-[var(--ease)] hover:border-text"
            href={profile.cvPath}
            download
          >
            {ui.hero.cv} <span className="ar" aria-hidden="true">↓</span>
          </a>
        </div>
        <div
          className="up mt-11 flex flex-wrap gap-7 border-t border-line pt-[22px]"
          style={delay(400)}
        >
          {profile.facts.map((f) => (
            <div key={f.label} className="text-[13px] text-muted">
              <b className="block text-xl font-semibold tracking-[-0.02em] text-text [font-variant-numeric:tabular-nums]">
                {f.value}
              </b>
              {f.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
