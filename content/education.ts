export type Program = {
  name: string;
  status: string;
  meta: string;
  body?: string;
  modules?: readonly { name: string; sessions: number }[];
};

export type Education = {
  university: { name: string; degree: string; years: string };
  programs: readonly Program[];
  featured: { issuer: readonly [string, string]; title: string; description: string };
  btk: readonly string[];
};

export const education: Education = {
  university: {
    name: "Sakarya Üniversitesi",
    degree: "Yazılım Mühendisliği (Lisans) · 3. sınıf",
    years: "2023 – 2028",
  },
  programs: [
    {
      name: "Türkiye Siber Vatan Programı",
      status: "Devam ediyor",
      meta: "2027 dönemi · Yapay Zekâ Destekli Siber Güvenlik",
      body: "Başvurum kabul edildi; yaklaşık üç ay süren çevrim içi eğitim dönemindeyim. Bu aşamada en başarılı olanlar yüz yüze eğitime ve 7 günlük BootCamp'e davet ediliyor.",
    },
    {
      name: "YÖK Dijital Üniversite Platformu",
      status: "3. aşama",
      meta: "DYP 2026–2027 · Mart 2027'de başlıyor",
      modules: [
        { name: "Yapay Zekâ: Kolaylaştırıcı Araçlar", sessions: 10 },
        { name: "Modern Yazılım Geliştirme", sessions: 11 },
      ],
    },
  ],
  featured: {
    issuer: ["Meta", "YTÜ Startup House"],
    title: "AI 101 Training Series",
    description:
      "Üretken yapay zekâ ve Meta'nın yapay zekâ araçlarıyla fikirden prototipe, dört modüllük program · AI Builders Türkiye · 27 Ekim – 6 Kasım 2026",
  },
  btk: [
    "İleri Seviye Java",
    "Java ile Programlamaya Giriş",
    "C# Programlama",
    "Algoritma Programlama ve Veri Yapılarına Giriş",
  ],
};
