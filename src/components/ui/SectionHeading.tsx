type Props = { num: string; title: string; aside?: string };

export function SectionHeading({ num, title, aside }: Props) {
  return (
    <div className="sh mb-6 flex flex-wrap items-baseline justify-between gap-4">
      <h2 className="m-0 text-[clamp(24px,3vw,30px)] font-semibold leading-[1.15] tracking-[-0.03em]">
        <span className="num mr-3 align-[0.45em] font-mono text-[13px] font-medium tracking-normal text-acc">
          {num}
        </span>
        {title}
      </h2>
      {aside ? <span className="text-sm text-muted">{aside}</span> : null}
    </div>
  );
}
