export type Project = {
  name: string;
  status: "done" | "wip";
  description: string;
  stack: readonly string[];
  repoUrl: string | null;
};

export const projectsNote = "Biri tamamlandı, ikisi geliştiriliyor.";

export const projects: readonly Project[] = [
  {
    name: "Dijital Bankacılık Platformu",
    status: "done",
    description:
      "Java 21 ve Spring Boot ile tek başıma geliştirdiğim 7 mikroservisli bankacılık backend'i. Kafka, Redis, circuit breaker ve idempotent para transferleri; 13 container tek komutla ayağa kalkıyor.",
    stack: ["Spring Boot", "Kafka", "Redis", "Docker"],
    repoUrl: "https://github.com/alicaners/digital-banking-platform",
  },
  {
    name: "Yalın Üretim Asistanı",
    status: "wip",
    description:
      "Kaizen, 5S ve Andon süreçlerini dijitalleştiren Android uygulaması. Flutter mobil uygulamadan ASP.NET Core backend'e kadar uçtan uca geliştiriyorum.",
    stack: ["Flutter", "ASP.NET Core", "PostgreSQL"],
    repoUrl: "https://github.com/alicaners/lean-manufacturing-assistant",
  },
  {
    name: "RotaPlan",
    status: "wip",
    description:
      "Ankara'daki saha ekipleri için rota optimizasyonu yapan full stack uygulama; OpenStreetMap tabanlı açık kaynak araçlarla geliştiriyorum.",
    stack: [".NET", "React", "TypeScript", "PostgreSQL/PostGIS", "OSRM", "Leaflet"],
    repoUrl: null,
  },
];
