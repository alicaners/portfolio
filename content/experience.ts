export type ExperienceItem = {
  name: string;
  tag: string;
  role: string;
  meta: string;
  highlight: boolean;
  icon: "users" | "briefcase" | "rocket" | "waves";
};

export const experience: readonly ExperienceItem[] = [
  {
    name: "Yazılım Mühendisliği Topluluğu",
    tag: "Topluluk",
    role: "Yönetim kurulu · Etkinlik departmanı",
    meta: "Sakarya Üniversitesi · 2026 – Devam ediyor",
    highlight: false,
    icon: "users",
  },
  {
    name: "Bilgisayar Topluluğu",
    tag: "Topluluk",
    role: "Kurumsal İlişkiler Sorumlusu",
    meta: "Sakarya Üniversitesi · 2025 – 2026",
    highlight: false,
    icon: "briefcase",
  },
  {
    name: "NASA Space Apps Challenge",
    tag: "Takım kaptanı",
    role: "LUNA 9 takımı · MarsPath projesi",
    meta: "Galactic Problem Solver · Kas 2026",
    highlight: true,
    icon: "rocket",
  },
  {
    name: "IEEE OneAquaHealth Hackathon",
    tag: "24. sıra",
    role: "Pipetin Yolculuğu · Flutter oyunu",
    meta: "Hackathon · Eyl 2026",
    highlight: true,
    icon: "waves",
  },
];
