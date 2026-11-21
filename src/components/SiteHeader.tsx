"use client";

import { useEffect, useState } from "react";
import { profile } from "@content/profile";
import { ui } from "@content/ui";
import { THEME_KEY } from "@/lib/theme";
import { LayerMark } from "@/components/ui/LayerMark";
import { GithubIcon, LinkedinIcon, MenuIcon, MoonIcon, SunIcon } from "@/components/ui/icons";

const NAV_LINKS = ui.nav.links;
const SHEET_LINKS = [...NAV_LINKS, ui.nav.contact];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // Kaydırma: 12px üstünde menü küçülür ve bulanık zemin alır.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Aktif bölüm: ekranın ortasındaki ince banda giren bölüm aktif olur.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id;
          if (entry.isIntersecting) setActive(id);
          else setActive((cur) => (cur === id ? null : cur));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const [id] of NAV_LINKS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  // Escape ile mobil menüyü kapat.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function toggleTheme() {
    const root = document.documentElement;
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Depolama kapalıysa tema yalnızca bu oturumda geçerli olur.
    }
  }

  return (
    <>
      <header className="nav" data-scrolled={scrolled ? "" : undefined}>
        <nav className="nav-wrap" aria-label={ui.nav.label}>
          <a className="brand" href="#top">
            <span className="mark" aria-hidden="true">
              <LayerMark />
            </span>
            <span>
              <b>{profile.name}</b>
              <small>{profile.title}</small>
            </span>
          </a>
          <ul className="links">
            {NAV_LINKS.map(([id, label]) => (
              <li key={id}>
                <a href={`#${id}`} aria-current={active === id ? "true" : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <div className="tools">
            <a
              className="ib gh"
              href={profile.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.nav.github}
            >
              <GithubIcon />
            </a>
            <a
              className="ib li"
              href={profile.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={ui.nav.linkedin}
            >
              <LinkedinIcon />
            </a>
            <button className="ib" type="button" aria-label={ui.nav.theme} onClick={toggleTheme}>
              <SunIcon className="sun" />
              <MoonIcon className="moon" />
            </button>
            <a className="ncta" href={`#${ui.nav.contact[0]}`}>
              {ui.nav.contact[1]}
            </a>
            <button
              className="ib burger"
              type="button"
              aria-label={open ? ui.nav.closeMenu : ui.nav.openMenu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <MenuIcon />
            </button>
          </div>
        </nav>
      </header>
      <nav
        className="sheet"
        id="mobile-menu"
        aria-label={ui.nav.mobileLabel}
        data-open={open ? "" : undefined}
      >
        {SHEET_LINKS.map(([id, label]) => (
          <a key={id} href={`#${id}`} tabIndex={open ? 0 : -1} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
      </nav>
    </>
  );
}
