# Portfolyo Sitesi Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Onaylanan tasarım dokümanındaki tek sayfalık, koyu/açık temalı, modern portfolyo sitesini Next.js 16 ile kurmak.

**Architecture:** Tüm metinler `content/*.ts` dosyalarında, tipli sabitler olarak durur. Bölümler bu dosyaları okuyan Server Component'lerdir. Etkileşim için yalnızca dört küçük Client Component kullanılır: menü, belirme gözlemcisi, kart ışığı ve kopyala butonu. Görsel sistem `globals.css` içinde CSS değişkenleri ve Tailwind 4 `@theme` ile tanımlanır. Animasyonlar saf CSS ile yapılır, ek animasyon kütüphanesi kurulmaz.

**Tech Stack:** Next.js 16.4.6 (App Router, `cacheComponents: true`), React 19.3, TypeScript strict, Tailwind CSS 4.3, `next/font` (Geist, Geist Mono), `next/og`. Testler için Node 24'ün yerleşik test çalıştırıcısı (`node --test`, TS tipleri otomatik ayıklanır) kullanılır, yeni bağımlılık yok.

**Spec:** `docs/superpowers/specs/2026-11-20-portfolio-design.md`. Görsel referans: `docs/superpowers/specs/assets/2026-11-20-portfolio-mockup.html`. Ölçü, renk, metin ve etkileşim değerleri bu iki dosyadan aynen alınır.

## Global Constraints

- Kod yazmadan önce ilgili Next.js rehberi `node_modules/next/dist/docs/` altından okunur (AGENTS.md). Tailwind API'leri için Context7 kullanılır.
- `next.config.ts` içinde `cacheComponents: true` var. Prerender sırasında `new Date()`, `Date.now()` ve `Math.random()` build hatası verir (bkz. `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`).
- Metinler `content/` dışında koda gömülmez. Kopya metinler spec §6'dan birebir alınır.
- Yeni npm paketi eklenmez. Gerekirse önce Ali'ye nedeni söylenir (CLAUDE.md §4.2).
- `<html lang="tr">`. Teknik adlar CSS `uppercase` ile büyük harfe çevrilmez ("Redis" → "REDİS" sorunu).
- Telefon, ev adresi ve ilçe hiçbir dosyada yer almaz (CLAUDE.md §8).
- Tüm animasyonlar ≤ 600ms (hover 180–350ms), easing `cubic-bezier(.2,.7,.2,1)`. `prefers-reduced-motion: reduce` açıkken animasyon ve geçiş yoktur, içerik görünür hâlde gelir.
- Her UI görevinden sonra `npm run dev` açılır ve Playwright MCP ile 375, 768 ve 1440 px'te ekran görüntüsü alınır. Konsol hataları okunur (CLAUDE.md §5).
- Commit mesajları Türkçe ve küçük olur. Push yapılmaz. Mesajlar şu satırla biter: `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

## Review Focus

1. **JavaScript kapalıyken ya da belirme gözlemcisi çalışmazken** tüm içerik görünür kalmalı. Gizleme yalnızca `<html class="js">` altında uygulanmalı. → Task 3, `tests/styles.test.ts`.
2. **`localStorage` erişimi hata fırlatırsa** (gizli sekme, engelli depolama) **ya da saklı değer geçersizse** tema sistem tercihine düşmeli, sayfa çökmemeli, ilk boyamada yanlış tema yanıp sönmemeli. → Task 2, `tests/theme.test.ts`.
3. **Pano API'si yoksa ya da izin reddedilirse** "Kopyala" butonu "Kopyalandı ✓" yazıp yalan söylememeli. → Task 8, `tests/clipboard.test.ts`.
4. **Hareketi azalt açıkken** teknoloji şeridi durmalı ve sarılan statik bir listeye dönmeli. Kopya öğeler ekran okuyucudan gizli kalmalı. → Task 6, `tests/styles.test.ts` ve Playwright ile `emulate_media`.
5. **320 px gibi dar ekranlarda** uzun Türkçe başlıklar ("Algoritma Programlama ve Veri Yapılarına Giriş") ve e-posta adresi yatay taşma yaratmamalı. → Task 10, Playwright'ta `scrollWidth <= innerWidth` kontrolü (320/375/768/1440).

---

## Dosya yapısı

```
content/
  profile.ts        ad, unvan, hero, bilgi satırı, iletişim linkleri, CV yolu
  about.ts          (var, güncellenecek) Hakkımda paragrafları + anahtar-değer
  projects.ts       3 proje
  skills.ts         şerit satırları + "öğreniyorum"
  experience.ts     4 deneyim kartı
  education.ts      üniversite, devam eden programlar, Meta sertifikası, BTK listesi
src/lib/
  theme.ts          resolveTheme(), THEME_KEY, themeInitScript
  site-url.ts       getSiteUrl()
  clipboard.ts      copyText()
src/components/
  ui/SectionHeading.tsx  ui/Tag.tsx  ui/LayerMark.tsx  ui/icons.tsx
  ui/RevealObserver.tsx (client)  ui/PointerGlow.tsx (client)
  SiteHeader.tsx (client)  SiteFooter.tsx
  sections/Hero.tsx About.tsx Projects.tsx Skills.tsx Experience.tsx Education.tsx Contact.tsx
  sections/CopyEmailButton.tsx (client)
src/app/
  layout.tsx  page.tsx  globals.css  icon.svg  opengraph-image.tsx  sitemap.ts  robots.ts
public/
  AliCanerSezer_CV.pdf  images/btk-akademi.png
tests/
  content.test.ts  theme.test.ts  site-url.test.ts  clipboard.test.ts  styles.test.ts
```

`src/app/favicon.ico` silinir, yerini `icon.svg` alır. Varsayılan `public/*.svg` dosyaları (next, vercel, file, globe, window) kullanılmadığı için silinir.

---

### Task 1: Test altyapısı ve içerik dosyaları

**Files:**
- Modify: `package.json` (script), `tsconfig.json`
- Create: `content/profile.ts`, `content/projects.ts`, `content/skills.ts`, `content/experience.ts`, `content/education.ts`, `tests/content.test.ts`
- Modify: `content/about.ts`

**Interfaces:**
- Produces (her dosya kendi tipini export eder, dosyalar arası runtime import yok):
  - `profile: Profile`, tip: `{ name; title; status; intro; introEmphasis: readonly string[]; facts: readonly { value: string; label: string }[]; email; linkedinUrl; linkedinLabel; githubUrl; githubLabel; cvPath: "/AliCanerSezer_CV.pdf"; contactHeading; contactText }`. Hepsi `string`, aksi belirtilmedikçe.
  - `about: About`, tip: `{ title: string; paragraphs: readonly string[]; facts: readonly { label: string; value: string }[] }`
  - `projects: readonly Project[]`, tip: `Project = { name: string; status: "done" | "wip"; description: string; stack: readonly string[]; repoUrl: string | null }`. Ayrıca `projectsNote: string`.
  - `skills: { rows: readonly [readonly string[], readonly string[]]; learning: readonly string[]; note: string }`
  - `experience: readonly ExperienceItem[]`, tip: `{ name; tag: string; role; meta: string; highlight: boolean; icon: "users" | "briefcase" | "rocket" | "waves" }`. Highlight'lı kartlarda `tag` yeşil gösterilir.
  - `education: { university: { name; degree; years }; programs: readonly Program[]; featured: { issuer: readonly [string, string]; title; description }; btk: readonly string[] }`, tip: `Program = { name; status: string; meta: string; body?: string; modules?: readonly { name: string; sessions: number }[] }`

- [ ] **Step 1:** `tsconfig.json`'a `"allowImportingTsExtensions": true` ve `paths`'e `"@content/*": ["./content/*"]` ekle. `package.json`'a `"test": "node --test --disable-warning=MODULE_TYPELESS_PACKAGE_JSON \"tests/**/*.test.ts\""` script'ini ekle.

- [ ] **Step 2: Başarısız testi yaz.** `tests/content.test.ts`, içerik dosyalarını `../content/x.ts` yoluyla import eder:

```ts
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
  assert.deepEqual(skills.rows[0], ["Java","Spring Boot","Spring Cloud","C#",".NET","ASP.NET Core","Entity Framework","Flutter"]);
  assert.deepEqual(skills.rows[1], ["PostgreSQL","MSSQL","Redis","Kafka","Docker","GitHub Actions","JUnit · Testcontainers","Git"]);
  assert.deepEqual(skills.learning, ["React","TypeScript","Next.js"]);
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
```

- [ ] **Step 3:** `npm test` çalıştır. Beklenen: FAIL, içerik modülleri bulunamıyor.

- [ ] **Step 4:** İçerik dosyalarını yaz. Metinler spec'ten birebir alınır: profile için §6.1, §6.2 ve §6.8; about için §6.3; projects için §6.4 tablosu; skills için §6.5; experience için §6.6 tablosu; education için §6.7. `about.ts` kısa metne geçer ve `facts` alanı eklenir. Proje teknoloji satırları dizi olarak tutulur: `["Spring Boot","Kafka","Redis","Docker"]`, `["Flutter","ASP.NET Core","PostgreSQL"]`, `["Full stack"]`.

- [ ] **Step 5:** `npm test` çalıştır, PASS olmalı. Ayrıca `npx tsc --noEmit` hatasız geçmeli.

- [ ] **Step 6: Commit:** `feat(content): site içerik dosyaları ve içerik testleri`

---

### Task 2: Tema, site adresi yardımcıları

**Files:**
- Create: `src/lib/theme.ts`, `src/lib/site-url.ts`, `tests/theme.test.ts`, `tests/site-url.test.ts`

**Interfaces:**
- Produces:
  - `export type Theme = "dark" | "light"`
  - `export const THEME_KEY = "theme"`
  - `export function resolveTheme(stored: string | null, prefersLight: boolean): Theme`: Saklı değer geçerliyse onu, değilse sistem tercihini döndürür.
  - `export const themeInitScript: string`: `<head>` içinde çalışan bağımsız IIFE. `localStorage[THEME_KEY]` ve `matchMedia('(prefers-color-scheme: light)')` değerlerini okur, `document.documentElement.dataset.theme` değerini ayarlar ve `classList.add("js")` çağırır. Her şeyi try/catch içinde yapar, hata olursa `"dark"` kullanır.
  - `export function getSiteUrl(env?: Record<string, string | undefined>): URL`: Sırasıyla `NEXT_PUBLIC_SITE_URL`, `https://${VERCEL_PROJECT_PRODUCTION_URL}` ve `http://localhost:3000` değerlerini dener. Varsayılan `env` değeri `process.env`'dir.

- [ ] **Step 1: Başarısız testleri yaz.**

```ts
// theme.test.ts
test("resolveTheme", () => {
  assert.equal(resolveTheme("light", false), "light");
  assert.equal(resolveTheme("dark", true), "dark");
  assert.equal(resolveTheme("mor", true), "light");   // geçersiz → sistem
  assert.equal(resolveTheme(null, false), "dark");
});
function runInit(ls: () => string | null, prefersLight: boolean) {
  const root = { dataset: {} as Record<string,string>, classList: { added: [] as string[], add(c: string){ this.added.push(c); } } };
  const g = { document: { documentElement: root }, localStorage: { getItem: ls }, matchMedia: () => ({ matches: prefersLight }) };
  new Function("document","localStorage","matchMedia", themeInitScript)(g.document, g.localStorage, g.matchMedia);
  return root;
}
test("init script: saklı değer", () => assert.equal(runInit(() => "light", false).dataset.theme, "light"));
test("init script: localStorage hata fırlatır → sistem tercihi", () => {
  const r = runInit(() => { throw new Error("blocked"); }, true);
  assert.equal(r.dataset.theme, "light"); assert.ok(r.classList.added.includes("js"));
});
// site-url.test.ts
test("öncelik sırası", () => {
  assert.equal(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://ali.dev" }).href, "https://ali.dev/");
  assert.equal(getSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" }).href, "https://x.vercel.app/");
  assert.equal(getSiteUrl({}).href, "http://localhost:3000/");
});
```

- [ ] **Step 2:** `npm test` çalıştır, FAIL olmalı.
- [ ] **Step 3:** İki modülü yaz. `themeInitScript` serbest değişken olarak yalnızca `document`, `localStorage` ve `matchMedia` kullanır, `window.` öneki yazılmaz. Böylece hem tarayıcıda hem testte aynı kod çalışır.
- [ ] **Step 4:** `npm test` çalıştır, PASS olmalı.
- [ ] **Step 5: Commit:** `feat(lib): tema çözümleme ve site adresi yardımcıları`

---

### Task 3: Görsel sistem, layout ve ortak UI parçaları

**Files:**
- Modify: `src/app/globals.css`, `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/components/ui/SectionHeading.tsx`, `ui/Tag.tsx`, `ui/LayerMark.tsx`, `ui/icons.tsx`, `ui/RevealObserver.tsx`, `ui/PointerGlow.tsx`, `tests/styles.test.ts`
- Delete: `src/app/favicon.ico`, `public/{next,vercel,file,globe,window}.svg`

**Interfaces:**
- Consumes: `themeInitScript`, `getSiteUrl` (Task 2)
- Produces:
  - **CSS token'ları:** `--bg --bg2 --card --line --line2 --text --muted --dim --acc --acc2 --acc-ink --wip`, `[data-theme="dark"]` ve `[data-theme="light"]` altında. Değerler spec §5 tablosundan, `--acc-ink` önizlemeden. Tailwind'e `@theme inline { --color-bg: var(--bg); … --font-sans: var(--font-geist-sans); --font-mono: var(--font-geist-mono) }` ile bağlanır, böylece `bg-bg`, `text-muted`, `border-line` gibi sınıflar kullanılabilir.
  - **CSS sınıfları (önizlemeden taşınır):** `.card` (spotlight `::before`, `--mx/--my` değişkenleriyle), `.reveal` belirme davranışı `[data-reveal]` ile.
  - `<SectionHeading id num title aside? />`: `<h2>` içinde yeşil numara ve başlık, sağda isteğe bağlı açıklama.
  - `<Tag variant?: "default" | "done" | "wip">`
  - `<LayerMark className? />`: Üç katmanlı SVG (path'ler önizlemedeki `.mark` SVG'sinden), üst katman `stroke: var(--acc)`.
  - `icons.tsx`: `GithubIcon`, `LinkedinIcon`, `SunIcon`, `MoonIcon`, `MenuIcon`, `UsersIcon`, `BriefcaseIcon`, `RocketIcon`, `WavesIcon`, `CapIcon`. Path'ler önizlemeden. Hepsi `aria-hidden`.
  - `<RevealObserver />`: Sayfada bir kez kullanılır. `[data-reveal]` öğelerini izler, görünür olunca `data-revealed` ekler. Gecikme: `(index % 3) * 60ms`.
  - `<PointerGlow />`: Sayfada bir kez kullanılır. `pointermove` olayını document seviyesinde dinler, `.card` öğesinin `--mx/--my` değişkenlerini ayarlar.

- [ ] **Step 1: Başarısız testi yaz.** `tests/styles.test.ts`, `src/app/globals.css` dosyasını metin olarak okur:

```ts
test("belirme gizlemesi yalnızca .js altında", () => {
  assert.match(css, /\.js\s+\[data-reveal\]:not\(\[data-revealed\]\)/);
  assert.doesNotMatch(css, /(^|[^s]\s)\[data-reveal\]\s*\{[^}]*opacity:\s*0/m);
});
test("reduced-motion bloğu animasyon ve geçişleri kapatır", () => {
  const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(block, /animation:\s*none\s*!important/); assert.match(block, /transition:\s*none\s*!important/);
});
test("her iki tema token'ları tanımlı", () => {
  for (const t of ["dark","light"]) assert.match(css, new RegExp(`\\[data-theme="${t}"\\][^{]*\\{[^}]*--acc:`));
});
```

- [ ] **Step 2:** `npm test` çalıştır, FAIL olmalı.
- [ ] **Step 3: `globals.css`.** Token'lar, `@theme inline`, `body` temeli, `.card`, `.js [data-reveal]:not([data-revealed])` (opacity 0 + translateY 16px), keyframe'ler (`up`, `ping`, `breathe`, `slide`) ve reduced-motion bloğu. Değerler önizlemenin `<style>` bloğundan alınır. Başlangıçtaki Arial kuralı kaldırılır.
- [ ] **Step 4: `layout.tsx`.**
  - `<html lang="tr" data-theme="dark" suppressHydrationWarning>`. `<head>` içinde `<script dangerouslySetInnerHTML={{ __html: themeInitScript }} />`.
  - Geist ve Geist_Mono `subsets: ["latin", "latin-ext"]` ile yüklenir.
  - `metadata`: `metadataBase: getSiteUrl()`, `title: "Ali Caner Sezer · Junior Software Engineer"`, `description: profile.intro`, `openGraph: { locale: "tr_TR", type: "website" }`.
  - `<body>` içinde `children`, `<RevealObserver/>` ve `<PointerGlow/>`.
- [ ] **Step 5: `page.tsx`.** Geçici iskelet: `<main>` içinde sırayla `id`'leri `top`, `hakkimda`, `projeler`, `beceriler`, `deneyim`, `egitim`, `iletisim` olan boş `<section>`'lar. Sonraki görevler bunları doldurur.
- [ ] **Step 6:** `npm test`, `npm run lint` ve `npm run build` çalıştır. Üçü de PASS olmalı.
- [ ] **Step 7: Commit:** `feat(ui): tema token'ları, layout ve ortak bileşenler`

---

### Task 4: Üst menü (SiteHeader)

**Files:**
- Create: `src/components/SiteHeader.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `LayerMark`, ikonlar, `THEME_KEY`, `resolveTheme`, `profile`
- Produces: `<SiteHeader />` (client). Nav bağlantıları sabit dizi olarak tanımlanır: `[["hakkimda","Hakkımda"],["projeler","Projeler"],["beceriler","Beceriler"],["deneyim","Deneyim"],["egitim","Eğitim"]]`.

- [ ] **Step 1: Uygula.** Davranış spec §6.1'e göre:
  - **Kaydırma:** `scrollY > 12` olunca `data-scrolled` eklenir, yükseklik 64px → 56px, arka plan bulanıklaşır, alt çizgi görünür.
  - **Aktif bölüm:** `IntersectionObserver` ile, `rootMargin: "-45% 0px -50% 0px"`. Aktif linke `aria-current="true"` verilir ve altındaki çizgi gösterilir.
  - **Tema düğmesi:** `documentElement.dataset.theme` değerini değiştirir ve `localStorage`'a yazar. Yazma try/catch içinde yapılır.
  - **Mobil menü:** `< 820px`'de görünür. `aria-expanded` ve `aria-controls` kullanılır, zemin opak olur. Bir linke tıklanınca ya da `Escape`'e basılınca kapanır.
  - Bölümlerde `scroll-margin-top: 56px` olur.
- [ ] **Step 2: Doğrula.** `npm run dev` çalıştır, Playwright ile 1440 px'te en üstte ve kaydırılmış hâlde ekran görüntüsü al. 375 px'te menüyü aç-kapat. Tema düğmesine basıp sayfayı yenile, tema korunmalı. Konsolda hata olmamalı.
- [ ] **Step 3: Commit:** `feat(nav): sabit üst menü, aktif bölüm, tema ve mobil menü`

---

### Task 5: Hero ve Hakkımda

**Files:**
- Create: `src/components/sections/Hero.tsx`, `sections/About.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile`, `about`, `SectionHeading`, `Tag`
- Produces: `<Hero />`, `<About />` (server)

- [ ] **Step 1: Uygula.** Hero, spec §6.2'ye göre: durum etiketi, h1 (ad + soluk unvan), vurgulu tanıtım cümlesi (`introEmphasis` öğeleri `<b>` olur), iki buton ve bilgi satırı. Arka planda `.glow` ve `.grid`. Giriş animasyonu `.up` sınıfı ve kademeli `animation-delay` ile, ~80ms arayla. CV butonu `<a href={profile.cvPath} download>` olur.

  About, spec §6.3'e göre: başlık "01 Hakkımda", iki kolonlu tek kart, sağda `<dl>`. 760 px altında kolonlar alt alta geçer.
- [ ] **Step 2: Doğrula.** 375, 768 ve 1440 px'te ekran görüntüsü al, önizlemeyle karşılaştır. Tek `h1` olmalı. Türkçe karakterler doğru görünmeli.
- [ ] **Step 3: Commit:** `feat(sections): hero ve hakkımda`

---

### Task 6: Projeler ve Teknolojiler

**Files:**
- Create: `src/components/sections/Projects.tsx`, `sections/Skills.tsx`
- Modify: `src/app/page.tsx`, `src/app/globals.css` (marquee kuralları), `tests/styles.test.ts`

**Interfaces:**
- Consumes: `projects`, `projectsNote`, `skills`, `SectionHeading`, `Tag`
- Produces: `<Projects />`, `<Skills />` (server)

- [ ] **Step 1: Başarısız testi ekle** (`tests/styles.test.ts`):

```ts
test("reduced-motion'da şerit durur ve sarılır", () => {
  const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(block, /\.marquee-row\s*\{[^}]*flex-wrap:\s*wrap/);
  assert.match(block, /\.marquee-dup\s*\{[^}]*display:\s*none/);
});
```

- [ ] **Step 2:** `npm test` çalıştır, FAIL olmalı.
- [ ] **Step 3: Projeler.** Spec §6.4'e göre:
  - Kart bir `<div class="card">`. Yalnızca ok bir link: `<a href={repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} GitHub reposu`}>↗</a>`.
  - `repoUrl === null` ise ok bir `<span>` olur. Soluk görünür, `title="Repo yakında"` taşır ve `aria-hidden` olmaz. Erişilebilir metin: `"<ad>: repo yakında"`.
  - Kartın üzerine gelince okun çerçevesi yeşil, okun üzerine gelince ok tamamen yeşil olur.
- [ ] **Step 4: Teknolojiler.** Spec §6.5'e göre:
  - Her satır bir `.marquee-row` içinde iki grup: asıl liste ve `aria-hidden="true"` taşıyan `.marquee-dup` kopyası. Süreler 45s ve 55s, ikinci satır ters yönde. Hover'da duraklar, kenarlarda mask ile solma olur.
  - Reduced-motion açıkken `.marquee-row` sarılır (`flex-wrap: wrap`, `width: auto`, animasyon yok) ve `.marquee-dup` gizlenir.
  - Altında "Öğreniyorum →" satırı.
- [ ] **Step 5:** `npm test` çalıştır, PASS olmalı. Playwright ile 1440 px'te çalıştır. `browser_emulate_media` ile `reducedMotion: "reduce"` ayarlayıp ekran görüntüsü al. Şerit statik ve sarılmış olmalı, öğeler tekrar etmemeli. Proje oklarının `href` değerlerini `browser_evaluate` ile oku, Task 1'deki URL'lerle aynı olmalı.
- [ ] **Step 6: Commit:** `feat(sections): projeler ve teknoloji şeridi`

---

### Task 7: Deneyim ve Eğitim & sertifikalar

**Files:**
- Create: `src/components/sections/Experience.tsx`, `sections/Education.tsx`, `public/images/btk-akademi.png`, `public/AliCanerSezer_CV.pdf`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `experience`, `education`, ikonlar (`icon` anahtarından bileşene eşleme `Experience.tsx` içinde), `SectionHeading`, `Tag`
- Produces: `<Experience />`, `<Education />` (server)

- [ ] **Step 1: Varlıkları kopyala.**
  - `docs/superpowers/specs/assets/btk-logo.png` → `public/images/btk-akademi.png`
  - `C:\Users\alica\Downloads\AliCanerSezer_CV_web.pdf` → `public/AliCanerSezer_CV.pdf`

  Kopyalamadan sonra PDF'in metninde `+90` öneki, telefon numarası ve ilçe adı geçmediğini doğrula. PDF'i Read aracıyla okuyup metne bakmak yeterli.
- [ ] **Step 2: Deneyim.** Spec §6.6'ya göre: 4 kolon, 900 px altında 2 kolon, 520 px altında 1 kolon. `highlight` kartlarında çerçeve yeşil, etiket `variant="done"`.
- [ ] **Step 3: Eğitim.** Spec §6.7'ye göre:
  - Sırasıyla üniversite kartı, iki program kartı (modül listesiyle) ve Meta kartı. Meta kartı bir link değil, okun yok. Solda gradyanlı alanda yazı var.
  - BTK 2×2 ızgara. Logo `next/image` ile, `width={780} height={283}`, CSS ile yükseklik 19px, `alt="BTK Akademi"`.
  - Hiçbir sertifika kartı link değil.
- [ ] **Step 4: Doğrula.** 375, 768 ve 1440 px'te ekran görüntüsü al. BTK görseli yüklenmeli: `browser_evaluate` ile `naturalWidth > 0` kontrol edilir. `/AliCanerSezer_CV.pdf` HTTP 200 dönmeli: `curl -s -o NUL -w "%{http_code}" http://localhost:3000/AliCanerSezer_CV.pdf` çıktısı `200` olmalı.
- [ ] **Step 5: Commit:** `feat(sections): deneyim, eğitim ve sertifikalar` (CV PDF ve BTK logosu dahil)

---

### Task 8: İletişim ve footer

**Files:**
- Create: `src/lib/clipboard.ts`, `tests/clipboard.test.ts`, `src/components/sections/Contact.tsx`, `sections/CopyEmailButton.tsx`, `src/components/SiteFooter.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile`
- Produces:
  - `export async function copyText(text: string, clipboard?: Pick<Clipboard, "writeText">): Promise<boolean>`: Pano yoksa ya da yazma reddedilirse `false` döndürür. Varsayılan `clipboard` değeri `globalThis.navigator?.clipboard`'dır.
  - `<CopyEmailButton email />` (client): Başarılıysa 1600ms boyunca "Kopyalandı ✓", başarısızsa "Kopyalanamadı" gösterir, sonra "Kopyala"ya döner. Durum `aria-live="polite"` ile duyurulur.
  - `<Contact />`, `<SiteFooter />` (server)

- [ ] **Step 1: Başarısız testi yaz.**

```ts
test("başarılı kopyalama", async () => assert.equal(await copyText("a", { writeText: async () => {} }), true));
test("pano yok", async () => assert.equal(await copyText("a", undefined), false));
test("izin reddi", async () => assert.equal(await copyText("a", { writeText: async () => { throw new Error("denied"); } }), false));
```

  Not: `undefined` geçilince JS varsayılan parametreyi kullanır. Node 24'te `navigator.clipboard` tanımsız olduğu için sonuç yine `false` olur. Bu test, "pano yok" yolunu gerçekten bu şekilde sınar.
- [ ] **Step 2:** `npm test` çalıştır, FAIL olmalı.
- [ ] **Step 3:** `copyText` fonksiyonunu yaz. `npm test` çalıştır, PASS olmalı.
- [ ] **Step 4: İletişim.** Spec §6.8'e göre: iki kolon, CV butonu "CV'yi indir ↓" (`download` özniteliğiyle). Üç satır: `mailto:` linki, LinkedIn ve GitHub. Dış linkler `target="_blank" rel="noopener noreferrer"` ile açılır. Uzun e-posta için `overflow-wrap: anywhere`.
- [ ] **Step 5: Footer.** Footer'da "© {yıl} Ali Caner Sezer" ve "Next.js ile yapıldı" yazar. Yıl `src/components/SiteFooter.tsx` içinde ayrı bir `async function currentYear()` fonksiyonundan gelir. Fonksiyonun ilk satırı `"use cache"` direktifidir. Build bu yüzden `new Date()` hatası vermemeli. Hata verirse doküman (`migrating-to-cache-components.md`, adım 3) izlenir.
- [ ] **Step 6:** `npm run build` çalıştır, PASS olmalı. Playwright ile "Kopyala"ya tıkla, metin "Kopyalandı ✓" olmalı.
- [ ] **Step 7: Commit:** `feat(sections): iletişim, e-posta kopyalama ve footer`

---

### Task 9: SEO ve paylaşım: ikon, OG görseli, sitemap, robots

**Files:**
- Create: `src/app/icon.svg`, `src/app/opengraph-image.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`

**Interfaces:**
- Consumes: `getSiteUrl`, `profile`, LayerMark path'leri

- [ ] **Step 1:** Önce şu dokümanları oku: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/` altındaki `app-icons.md`, `opengraph-image.md`, `sitemap.md` ve `robots.md`.
- [ ] **Step 2: Dosyaları yaz.**
  - `icon.svg`: 32×32, koyu (`#111318`) yuvarlak kare üzerinde katman işareti, üst katman `#34D399`.
  - `opengraph-image.tsx`: 1200×630, `next/og` `ImageResponse`. Koyu zemin, katman işareti, "Ali Caner Sezer" ve "Junior Software Engineer". `alt` metni Türkçe.
  - `sitemap.ts`: tek kayıt, `getSiteUrl()` köküyle.
  - `robots.ts`: her şeye izin ver, `sitemap` alanını belirt.
- [ ] **Step 3: Doğrula.** `npm run build` çalıştır, PASS olmalı. `npm run start` ile şunlar HTTP 200 dönmeli: `/icon.svg`, `/opengraph-image`, `/sitemap.xml`, `/robots.txt`. Sayfa HTML'inde `<html lang="tr"` ve `og:image` bulunmalı (`curl -s http://localhost:3000 | findstr "og:image"`).
- [ ] **Step 4: Commit:** `feat(seo): ikon, open graph görseli, sitemap ve robots`

---

### Task 10: Son kontrol ve CLAUDE.md güncellemesi

**Files:**
- Modify: `CLAUDE.md` (§3)

- [ ] **Step 1: Responsive ve taşma.** Playwright ile 320, 375, 768 ve 1440 px'te, koyu ve açık temada tam sayfa ekran görüntüsü al. Her genişlikte `document.documentElement.scrollWidth <= innerWidth` olmalı. Konsolda hata ya da uyarı olmamalı.
- [ ] **Step 2: Reduced-motion.** `browser_emulate_media` ile `reducedMotion: "reduce"` ayarla. Hero ve bölümler anında görünür olmalı, şerit statik olmalı.
- [ ] **Step 3: Klavye.** Tab ile menü, butonlar, proje okları ve iletişim linkleri sırayla odaklanmalı, odak halkası görünür olmalı. Mobil menü `Escape` ile kapanmalı.
- [ ] **Step 4: Lighthouse.** `npm run build && npm run start` çalıştır, sonra `npx lighthouse http://localhost:3000 --form-factor=mobile --only-categories=performance,accessibility,best-practices,seo --output=json --output-path=./.lighthouse.json --quiet` çalıştır. Lighthouse kurulu değilse `npx` indirir, bu geçici bir indirmedir, projeye bağımlılık eklenmez. Dört kategoride de ≥ 0.90 olmalı. Kontrast uyarısı varsa `--dim` açılır (spec §5 notu). `.lighthouse.json` `.gitignore`'a eklenir.
- [ ] **Step 5: CLAUDE.md §3'ü güncelle.** Bölüm listesi spec §6 sırasına getirilir. "Öne çıkanlar" ve Watchdog çıkarılır, proje listesi spec §6.4'e göre yazılır, "`/projects/[slug]` detay sayfası" ifadesi "proje okları GitHub reposuna gider" olarak değiştirilir. §2'deki Framer Motion satırına "şu an kullanılmıyor, animasyonlar CSS ile" notu düşülür.
- [ ] **Step 6: Final.** `npm test`, `npm run lint` ve `npm run build` çalıştır, hepsi PASS olmalı. `code-reviewer` ajanıyla branch diff'i incelet.
- [ ] **Step 7: Commit:** `docs: CLAUDE.md bölüm ve proje listesini tasarıma göre güncelle`
