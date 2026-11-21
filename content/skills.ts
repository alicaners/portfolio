export type Skills = {
  rows: readonly [readonly string[], readonly string[]];
  learning: readonly string[];
  note: string;
};

export const skills: Skills = {
  rows: [
    ["Java", "Spring Boot", "Spring Cloud", "C#", ".NET", "ASP.NET Core", "Entity Framework", "Flutter", "React"],
    ["PostgreSQL", "MSSQL", "Redis", "Kafka", "Docker", "GitHub Actions", "JUnit · Testcontainers", "Git"],
  ],
  learning: ["TypeScript", "Next.js"],
  note: "Projelerimde kullandıklarım",
};
