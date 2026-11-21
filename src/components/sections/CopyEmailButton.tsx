"use client";

import { useEffect, useRef, useState } from "react";
import { ui } from "@content/ui";
import { copyText } from "@/lib/clipboard";

type Status = "idle" | "ok" | "fail";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function onClick() {
    const ok = await copyText(email);
    setStatus(ok ? "ok" : "fail");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus("idle"), 1600);
  }

  const label =
    status === "ok" ? ui.copy.ok : status === "fail" ? ui.copy.fail : ui.copy.idle;

  return (
    <>
      <button type="button" className="contact-copy" onClick={onClick}>
        {label}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "idle" ? "" : label}
      </span>
    </>
  );
}
