export type Profile = {
  name: string;
  title: string;
  status: string;
  intro: string;
  introEmphasis: readonly string[];
  facts: readonly { value: string; label: string }[];
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
  githubUrl: string;
  githubLabel: string;
  cvPath: "/AliCanerSezer_CV.pdf";
  contactHeading: string;
  contactText: string;
};

export const profile: Profile = {
  name: "Ali Caner Sezer",
  title: "Junior Software Engineer",
  status: "Staj fırsatlarına açığım",
  intro:
    "Sakarya Üniversitesi Yazılım Mühendisliği 3. sınıf öğrencisiyim. Java / Spring Boot ve C# / .NET ile mikroservis mimarisi, REST API ve katmanlı mimari üzerine projeler geliştiriyorum.",
  introEmphasis: ["Java / Spring Boot", "C# / .NET"],
  facts: [
    { value: "3+", label: "proje" },
    { value: "5+", label: "sertifika" },
    { value: "Mikroservis · Mobil · Full stack", label: "proje alanları" },
  ],
  email: "alicanerszrr@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/alicanersezer28/",
  linkedinLabel: "linkedin.com/in/alicanersezer28",
  githubUrl: "https://github.com/alicaners",
  githubLabel: "github.com/alicaners",
  cvPath: "/AliCanerSezer_CV.pdf",
  contactHeading: "Staj ve iş birliği için iletişime geçin.",
  contactText:
    "Staj fırsatları, projeler veya iş birliği teklifleri için e-posta ile ulaşabilirsiniz.",
};
