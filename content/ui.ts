export type Ui = {
  nav: {
    label: string;
    mobileLabel: string;
    links: readonly (readonly [id: string, label: string])[];
    contact: readonly [id: string, label: string];
    github: string;
    linkedin: string;
    theme: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: { projects: string; cv: string };
  sections: {
    projects: { num: string; title: string };
    skills: { num: string; title: string; learning: string; pause: string; play: string };
    experience: { num: string; title: string; aside: string };
    education: { num: string; title: string; btkLabel: string; btkAlt: string };
    contact: { num: string; cv: string; email: string; linkedin: string; github: string };
  };
  status: { done: string; wip: string };
  repoSoon: string;
  copy: { idle: string; ok: string; fail: string };
  footer: { built: string };
};

export const ui: Ui = {
  nav: {
    label: "Ana menü",
    mobileLabel: "Mobil menü",
    links: [
      ["hakkimda", "Hakkımda"],
      ["projeler", "Projeler"],
      ["beceriler", "Beceriler"],
      ["deneyim", "Deneyim"],
      ["egitim", "Eğitim"],
    ],
    contact: ["iletisim", "İletişim"],
    github: "GitHub",
    linkedin: "LinkedIn",
    theme: "Temayı değiştir",
    openMenu: "Menüyü aç",
    closeMenu: "Menüyü kapat",
  },
  hero: { projects: "Projeleri incele", cv: "CV indir" },
  sections: {
    projects: { num: "02", title: "Projeler" },
    skills: {
      num: "03",
      title: "Teknolojiler",
      learning: "Öğreniyorum →",
      pause: "Şeridi durdur",
      play: "Şeridi oynat",
    },
    experience: { num: "04", title: "Deneyim", aside: "Topluluklar ve hackathonlar" },
    education: {
      num: "05",
      title: "Eğitim & sertifikalar",
      btkLabel: "BTK Akademi · Başarı sertifikaları",
      btkAlt: "BTK Akademi",
    },
    contact: {
      num: "06",
      cv: "CV'yi indir",
      email: "E-posta",
      linkedin: "LinkedIn",
      github: "GitHub",
    },
  },
  status: { done: "Tamamlandı", wip: "Geliştiriliyor" },
  repoSoon: "Repo yakında",
  copy: { idle: "Kopyala", ok: "Kopyalandı ✓", fail: "Kopyalanamadı" },
  footer: { built: "Next.js ile yapıldı" },
};

export const repoLabel = (name: string) => `${name} GitHub reposu`;
export const repoSoonLabel = (name: string) => `${name}: repo yakında`;
export const sessionsLabel = (n: number) => `${n} oturum`;
export const pageTitle = (name: string, title: string) => `${name} · ${title}`;
