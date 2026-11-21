import { test } from "node:test";
import assert from "node:assert/strict";
import { profile } from "../content/profile.ts";
import { about } from "../content/about.ts";
import { projects } from "../content/projects.ts";
import { skills } from "../content/skills.ts";
import { experience } from "../content/experience.ts";
import { education } from "../content/education.ts";
import { ui } from "../content/ui.ts";

test("projeler spec §6.4 ile birebir", () => {
  assert.deepEqual(projects.map(p => [p.name, p.status, p.repoUrl]), [
    ["Dijital Bankacılık Platformu", "done", "https://github.com/alicaners/digital-banking-platform"],
    ["Yalın Üretim Asistanı", "wip", "https://github.com/alicaners/lean-manufacturing-assistant"],
    ["RotaPlan", "wip", null],
  ]);
});
test("unvan ve bilgi satırı", () => {
  assert.equal(profile.title, "Junior Software Engineer");
  assert.deepEqual(profile.facts.map(f => f.value), ["3+", "5+", "Mikroservis · Mobil · Full stack"]);
  assert.equal(profile.cvPath, "/AliCanerSezer_CV.pdf");
});
test("teknoloji şeridi spec §6.5", () => {
  assert.deepEqual(skills.rows[0], ["Java","Spring Boot","Spring Cloud","C#",".NET","ASP.NET Core","Entity Framework","Flutter","React"]);
  assert.deepEqual(skills.rows[1], ["PostgreSQL","MSSQL","Redis","Kafka","Docker","GitHub Actions","JUnit · Testcontainers","Git"]);
  assert.deepEqual(skills.learning, ["TypeScript","Next.js"]);
});
test("deneyim etiketleri", () => {
  assert.deepEqual(experience.map(e => [e.tag, e.highlight]), [["Topluluk",false],["Topluluk",false],["Takım kaptanı",true],["24. sıra",true]]);
});
test("BTK listesi ekran görüntüsündeki 4 sertifika", () => {
  assert.deepEqual(education.btk, ["İleri Seviye Java","Java ile Programlamaya Giriş","C# Programlama","Algoritma Programlama ve Veri Yapılarına Giriş"]);
});
test("about kısa metin: 2 paragraf, 3 anahtar-değer", () => {
  assert.equal(about.paragraphs.length, 2);
  assert.deepEqual(about.facts.map(f => f.label), ["Okul", "Odak", "Arıyorum"]);
  assert.equal(about.facts[2].value, "2027 yazı stajı");
});
test("içerikte kişisel veri yok", () => {
  const all = JSON.stringify([profile, about, projects, skills, experience, education]);
  for (const bad of [/\+90/, /\+?90[\s-]?5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/, /\b5\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}\b/]) assert.doesNotMatch(all, bad);
});
test("RotaPlan açıklaması ve stack'i", () => {
  const r = projects.find(p => p.name === "RotaPlan")!;
  assert.equal(r.description, "Ankara'daki saha ekipleri için rota optimizasyonu yapan full stack uygulama; OpenStreetMap tabanlı açık kaynak araçlarla geliştiriyorum.");
  assert.deepEqual(r.stack, [".NET", "React", "TypeScript", "PostgreSQL/PostGIS", "OSRM", "Leaflet"]);
});
test("deneyim kartları ad, rol ve meta", () => {
  assert.deepEqual(experience.map(e => [e.name, e.role, e.meta]), [
    ["Yazılım Mühendisliği Topluluğu", "Yönetim kurulu · Etkinlik departmanı", "Sakarya Üniversitesi · 2026 – Devam ediyor"],
    ["Bilgisayar Topluluğu", "Kurumsal İlişkiler Sorumlusu", "Sakarya Üniversitesi · 2025 – 2026"],
    ["NASA Space Apps Challenge", "LUNA 9 takımı · MarsPath projesi", "Galactic Problem Solver · Kas 2026"],
    ["IEEE OneAquaHealth Hackathon", "Pipetin Yolculuğu · Flutter oyunu", "Hackathon · Eyl 2026"],
  ]);
});
test("arayüz metinleri: nav, durum ve şerit butonu", () => {
  assert.deepEqual(ui.nav.links.map(l => l[1]), ["Hakkımda", "Projeler", "Beceriler", "Deneyim", "Eğitim"]);
  assert.deepEqual(ui.nav.contact, ["iletisim", "İletişim"]);
  assert.equal(ui.nav.mobileLabel, "Mobil menü");
  assert.deepEqual(ui.status, { done: "Tamamlandı", wip: "Geliştiriliyor" });
  assert.equal(ui.sections.skills.pause, "Şeridi durdur");
  assert.equal(ui.sections.skills.play, "Şeridi oynat");
});
