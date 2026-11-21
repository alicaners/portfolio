import type { ReactNode } from "react";

type Props = { variant?: "default" | "done" | "wip"; children: ReactNode };

const base =
  "inline-block whitespace-nowrap rounded-full border px-[9px] py-[3px] font-mono text-[11px] font-medium";

const variants = {
  default: "border-line2 text-muted",
  done: "border-acc/40 bg-acc/8 text-acc",
  wip: "border-line2 text-muted before:mr-1.5 before:inline-block before:size-1.5 before:rounded-full before:bg-wip before:align-[1px] before:content-['']",
} as const;

export function Tag({ variant = "default", children }: Props) {
  return <span className={`${base} ${variants[variant]}`}>{children}</span>;
}
