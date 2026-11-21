# Ali Caner Sezer: kişisel portfolyo sitesi, tasarım dokümanı

- **Tarih:** 2026-11-20
- **Durum:** Taslak, Ali'nin onayını bekliyor
- **Görsel referans:** [`assets/2026-11-20-portfolio-mockup.html`](assets/2026-11-20-portfolio-mockup.html). Bu, onaylanmış son önizlemedir (v4). Tarayıcıda açılabilir. Tek bir HTML dosyası olarak yazıldı. Ölçüler, renkler ve etkileşimler için asıl kaynak budur. Kod yapısı ise referans değildir, Next.js'e uygun şekilde yeniden kurulacak.

> İşaretler: **[Ali]** Ali'nin konuşmada açıkça verdiği kararlar. **[Claude]** Benim verdiğim ve Ali'nin itiraz etmediği kararlar. **[Builder]** Uygulayan kişiye bırakılanlar. **[AÇIK]** Henüz karar verilmemiş konular, bkz. §10.

---

## 1. Amaç ve neden

Site, Ali'nin staj başvurularında (Başarsoft, Logo Yazılım vb.) link olarak vereceği kişisel portfolyo. Ziyaretçi, CV'leri tarayan bir İK uzmanı ya da mühendis olabilir. Siteyi açtıktan **30 saniye sonra** şunu düşünmeli: *"Bu kişi bir fikri baştan sona çalışan bir ürüne dönüştürebiliyor ve backend'i ciddiye alıyor."* **[Ali]**

Ton: Gösterişten çok netlik, özen ve gerçek projeler. Görünüm modern olmalı, retro ya da "eski kağıt pafta" hissi vermemeli. Metinler samimi ama resmî kalmalı. İletişim bölümü özellikle resmî. **[Ali]**

## 2. Hedefler, hedef dışı olanlar, başarısızlık ölçütleri

**Hedefler**
- Tek sayfalık, modern, koyu ağırlıklı bir site (açık tema da tam destekli). Bölümler: Hakkımda, Projeler, Teknolojiler, Deneyim, Eğitim & sertifikalar, İletişim.
- Sitedeki her teknik bilgi doğrulanmış olmalı: GitHub repoları, README'ler, PR/issue geçmişi veya Ali'nin kendi verdiği bilgi.
- Ölçülü ve akıcı mikro etkileşimler olmalı, hepsi `prefers-reduced-motion` ayarına uymalı.
- Lighthouse (mobil) ölçümünde dört kategoride de ≥ 90 puan. WCAG AA uyumu.

**Hedef dışı (bu sürümde yapılmayacak)**
- İngilizce sürüm. Ancak metinler `content/` altında durduğu için ileride eklenebilir olmalı.
- Blog, CMS, iletişim formu, analitik.
- Mimari diyagramlar ve şemalar. Önizleme sürecinde denendi, Ali istemedi. **[Ali]**
- Ekran görüntüleri ve proje görselleri. **[Ali]**

**Başarısızlık ölçütleri (teknik olarak çalışsa bile başarısız sayılır)**
- Şablon ya da "AI yapımı" gibi görünmek: mor-mavi gradyanlar, her yerde glassmorphism, her öğenin zıpladığı animasyonlar.
- Doğrulanmamış teknik iddia. Örnek: tek kullanıcıyla ölçülmüş p95 değerini "yük testi" diye sunmak. Bu, Ali'nin isteğiyle siteden çıkarıldı. **[Ali]**
- Çocukça bir ton. Örnek: "Bir selam ver ☕", hero'da el sallayan emoji. İkisi de Ali'nin isteğiyle kaldırıldı. **[Ali]**
- Telefon numarası, ev adresi veya öğrenci numarası gibi kişisel bilgilerin sitede görünmesi (CLAUDE.md §8). CV PDF'i bu yüzden açık bir konu, bkz. §10.

## 3. Kısıtlar

- **Yığın:** Next.js 16.4.6 (App Router), React 19.3, TypeScript strict, Tailwind CSS 4.3, npm, Vercel. Bunlar repoda kurulu.
  - Tailwind 4 ayarları `tailwind.config` dosyasında değil, CSS içinde `@theme` ile yapılır.
  - `AGENTS.md`: bu Next.js sürümünde kırıcı değişiklikler var. Kod yazmadan önce `node_modules/next/dist/docs/` okunmalı.
  - Next.js, Tailwind ve animasyon kütüphanesi API'leri için güncel doküman Context7'den alınmalı (CLAUDE.md §5).
- **İçerik:** Metinler koda gömülmeyecek, `content/` altında tipli TS dosyaları olarak duracak. `content/about.ts` zaten var, bkz. §10.
- **Dil:** `lang="tr"`. Büyük harfe çevrilen teknik adlar (Redis, notification) Türkçe kurallarla bozulmaz. Böyle metinler ya büyük harfe çevrilmemeli ya da `lang="en"` ile işaretlenmeli. Önizlemede bu sorun yaşandı.
- **Kişisel veri:** Telefon ve adres yok. E-posta (`alicanerszrr@gmail.com`), LinkedIn ve GitHub sitede görünecek. Ali bunu açıkça istedi. **[Ali]**
- **Git:** Push'u Ali yapar. `push`, `reset --hard`, `clean -f` ve `branch -D` hook tarafından engelleniyor. Küçük, anlamlı commit'ler atılacak.

## 4. Değerlendirilen yaklaşımlar

| Yön | Özü | Sonuç |
|---|---|---|
| A · Teknik Resim | Kağıt zemin, mühendislik paftası gibi bir site, numaralı bölümler, diyagramlar ana görsel dil | Reddedildi: retro, kalabalık |
| B · Kontrol Odası | Koyu operasyon paneli, metrik ve durum göstergeleri | Reddedildi |
| C · Teknik Monografi | Serif, editoryal, numaralı şekiller | Reddedildi |
| A-modern | A'nın diyagram fikri, çağdaş zemin ve etkileşimli diyagramlarla | Reddedildi. Ali: "şemalara, oklara gerek yok" |
| **Modern, koyu, minimal (v1 → v4)** | Koyu zemin, tek vurgu rengi, Geist, kartlar, kayan teknoloji şeridi, ölçülü hareket | **Seçildi** **[Ali]** |

Seçilen yön dört turda inceltildi:
- v2: Menü yenilendi, ton samimileşti, sertifikalar eklendi.
- v3: Hero ciddileşti, menü kaliteli hâle geldi, genel ölçek küçüldü (sayfa ~%33 kısaldı), teknolojiler kayan şeride döndü.
- v4: Hakkımda ve Deneyim yeniden düzenlendi, unvan değişti, sıra değişti, logo değişti.

## 5. Görsel sistem

Kesin değerler önizleme dosyasındaki CSS değişkenleridir. Özet:

**Renkler** (önizlemedeki `:root` / `[data-theme]` token'ları)

| Token | Koyu | Açık | Rol |
|---|---|---|---|
| `bg` | `#08090B` | `#FAFAFA` | Sayfa zemini |
| `bg2` | `#0F1115` | `#F1F2F4` | İç yüzey (modül satırları vb.) |
| `card` | `#111318` | `#FFFFFF` | Kartlar |
| `line` / `line2` | beyaz %7 / %13 | siyah %8 / %15 | İnce çizgiler, çerçeveler |
| `text` | `#EDEFF3` | `#0B0D10` | Ana metin |
| `muted` | `#9097A3` | `#5A616C` | İkincil metin |
| `dim` | `#636A75` | `#7D848E` | Etiket ve tarih (yalnızca küçük mono metinde, bkz. not) |
| `acc` | `#34D399` | `#047857` | Vurgu (zümrüt yeşili) |
| `acc2` | `#10B981` | `#10B981` | Hero ışıması, gradyan |
| "Geliştiriliyor" noktası | `#F5B544` | `#F5B544` | Durum noktası |

- **Vurgu rengi:** Önizlemede yeşil, turuncu ve mavi seçenekleri gösterildi. Ali seçim yapmadı, varsayılan yeşil kaldı. **[Claude]** Önizlemedeki renk seçici paneli sitenin parçası **değil**.
- **Tema:** İlk açılışta varsayılan koyu. Menüdeki düğmeyle açık temaya geçilebilir. Ziyaretçinin sistem tercihine uyulup uyulmayacağı ve seçimin hatırlanıp hatırlanmayacağı **[Builder]**. Önerim: sistem tercihine uymak ve seçimi `localStorage`'da saklamak. İlk yüklemede tema yanıp sönmemeli, yani yanlış tema bir anlığına görünmemeli.
- **Kontrast notu:** Hedef WCAG AA. `dim` rengi koyu zeminde normal metin için 4.5:1 eşiğinin altında kalabilir. Uygulamada ölçülmeli, gerekirse `dim` açılmalı. **[Builder]**

**Tipografi:** Geist (değişken) ve Geist Mono, `next/font/google` ile yüklenecek. Türkçe karakterler önizlemede doğrulandı.
- Gövde metni 15px.
- h1: `clamp(36px, 5.4vw, 58px)`, harf aralığı -0.04em.
- h2: `clamp(24px, 3vw, 30px)`.
- Bölüm numarası (01–06): başlığın solunda yeşil, 13px mono.
- Etiketler, tarihler ve teknoloji listeleri: mono, 11–12.5px.

**Ölçek ve düzen:** İçerik en fazla 1040px genişlikte, yanlarda 20px boşluk. Bölümler arası dikey boşluk ~72px. Kart köşeleri 14px, butonlar 10px yuvarlak. Ali'nin "her şey çok büyük" geri bildirimiyle küçültüldü. Daha büyük ölçeğe geri dönülmemeli. **[Ali]**

**Logo / marka işareti:** Üst üste üç katmandan oluşan bir SVG simge, en üst katman yeşil. Katmanlı mimariye gönderme yapıyor. Koyu, ince çerçeveli 32px bir kutunun içinde duruyor. **[Ali]** Aynı simge favicon ve Open Graph görselinde de kullanılacak. **[Claude]**

## 6. Sayfa yapısı ve içerik

Tek sayfa. Sıra: **Menü → Hero → 01 Hakkımda → 02 Projeler → 03 Teknolojiler → 04 Deneyim → 05 Eğitim & sertifikalar → 06 İletişim → Footer.** **[Ali]**

Her bölümde tek başlık var, yeşil numarası başlığın solunda duruyor. Üstte ayrıca bir etiket yazısı olmayacak, çünkü başlıkla aynı şeyi tekrarlıyordu. **[Ali]**

### 6.1 Üst menü
- **Yerleşim:** Tam genişlikte, sabit. Solda logo, "Ali Caner Sezer" ve altında küçük mono yazıyla **"Junior Software Engineer"** **[Ali]**. Ortada bölüm bağlantıları: Hakkımda, Projeler, Beceriler, Deneyim, Eğitim. Sağda ince bir ayraçtan sonra GitHub ikonu, LinkedIn ikonu, tema düğmesi ve "İletişim" butonu.
- **Davranış:** Sayfa en üstteyken menünün arkası şeffaf. Kaydırınca yüksekliği 64px'ten 56px'e iniyor, arkası bulanıklaşıyor ve altına ince bir çizgi geliyor. Görünür bölümün bağlantısının altında yeşil bir çizgi var. Bağlantıların üzerine gelince aynı çizgi soldan doğru uzuyor.
- **Mobil (< 820px):** Bağlantılar, sosyal ikonlar ve "İletişim" butonu gizleniyor. Menü butonuna basınca aşağı doğru düz bir liste açılıyor. Listenin zemini opak olmalı, arkasındaki yazı görünmemeli.
- Bölüme atlayınca başlık sabit menünün altında kalmamalı (`scroll-margin-top`).

### 6.2 Hero
- Üstte küçük bir durum etiketi: yeşil nabız noktası ve "Staj fırsatlarına açığım".
- h1: "Ali Caner Sezer", alt satırda soluk renkle **"Junior Software Engineer"**. **[Ali]**
- Tanıtım cümlesi: "Sakarya Üniversitesi Yazılım Mühendisliği 3. sınıf öğrencisiyim. **Java / Spring Boot** ve **C# / .NET** ile mikroservis mimarisi, REST API ve katmanlı mimari üzerine projeler geliştiriyorum."
- Butonlar: "Projeleri incele →" (#projeler bölümüne gider) ve "CV indir ↓" (`public/AliCanerSezer_CV.pdf` dosyasını indirir).
- Altta ince bir çizgiyle ayrılmış bilgi satırı: **3+** proje · **5+** sertifika · **Mikroservis · Mobil · Full stack** (alt yazısı: proje alanları). **[Ali]**
- Arka planda üstten yayılan yavaş "nefes alan" yeşil bir ışıma ve kenarlara doğru kaybolan çok hafif bir ızgara dokusu var. Açık temada ikisi de çok daha soluk.

### 6.3 01 · Hakkımda
Tek bir kart, içi iki kolon. Mobilde kolonlar alt alta geçer.
- **Sol kolon (metin, Ali'nin uzun metninden kısaltıldı):**
  1. "Sakarya Üniversitesi'nde Yazılım Mühendisliği 3. sınıf öğrencisiyim. En çok sevdiğim şey, bir fikrin çalışan bir ürüne dönüştüğü süreç: ihtiyacı anlamak, sistemi parçalarına ayırmak ve her parçayı sağlam kurmak."
  2. "Güçlü olduğum taraf backend. Bir servis çöktüğünde sistemin nasıl ayakta kalacağı gibi sorularla uğraşmayı seviyorum; test yazmak ve bir hatanın kök nedenini bulmak benim için işin bir parçası."
- **Sağ kolon (anahtar-değer listesi):**
  - Okul: Sakarya Üniversitesi · 3. sınıf
  - Odak: Backend · Java / Spring Boot · C# / .NET
  - Arıyorum: 2027 yazı stajı **[Ali]**

### 6.4 02 · Projeler
Başlığın sağında: "Biri tamamlandı, ikisi geliştiriliyor." Projeler alt alta, tam genişlikte kartlarda duruyor. Her kartta numara, ad, durum etiketi, en fazla iki satır açıklama, mono teknoloji satırı ve sağda yuvarlak bir ok var.

**Ok davranışı:** Kartın tamamı link değil, yalnızca ok link. Ok, GitHub reposunu yeni sekmede açıyor ve erişilebilir bir adı (`aria-label`) var. Kartın üzerine gelince okun çerçevesi yeşil oluyor, okun üzerine gelince ok tamamen yeşile dönüyor. **[Ali]**

| # | Ad | Etiket | Açıklama | Teknoloji satırı | Ok |
|---|---|---|---|---|---|
| 01 | Dijital Bankacılık Platformu | Tamamlandı | Java 21 ve Spring Boot ile tek başıma geliştirdiğim 7 mikroservisli bankacılık backend'i. Kafka, Redis, circuit breaker ve idempotent para transferleri; 13 container tek komutla ayağa kalkıyor. | Spring Boot · Kafka · Redis · Docker | github.com/alicaners/digital-banking-platform |
| 02 | Yalın Üretim Asistanı | Geliştiriliyor | Kaizen, 5S ve Andon süreçlerini dijitalleştiren Android uygulaması. Flutter mobil uygulamadan ASP.NET Core backend'e kadar uçtan uca geliştiriyorum. | Flutter · ASP.NET Core · PostgreSQL | github.com/alicaners/lean-manufacturing-assistant |
| 03 | RotaPlan | Geliştiriliyor | Ankara'daki saha ekipleri için rota optimizasyonu yapan full stack uygulama; OpenStreetMap tabanlı açık kaynak araçlarla geliştiriyorum. **[Ali, 2026-11-21]** | .NET · React · TypeScript · PostgreSQL/PostGIS · OSRM · Leaflet | Repo yok: ok soluk, tıklanmıyor, üzerine gelince "Repo yakında" yazıyor **[Ali]** |

Fraud Detection Platform, Kütüphane+ ve Etkinlik Atlasım sitede **yer almayacak**. **[Ali]**

**Doğrulama kaynakları** (projelerle ilgili iddialar buraya dayanmalı):
- **Bankacılık:** README ve kod (2026-11-20 tarihli klon).
  - 7 adet `@SpringBootApplication`, her biri için bir Dockerfile.
  - Kodda var: JWT doğrulama, refresh token rotation, Kafka producer/consumer, Redis `@Cacheable`, Resilience4j CB/Retry/TimeLimiter/RateLimiter, `Idempotency-Key`, `@Version`.
  - Docker Compose'da 13 servis. GitHub Actions CI, 7 servis paralel derleniyor.
  - Repoda PR/issue yok, tüm çalışma doğrudan commit'lerle yapılmış.
- **Yalın Üretim:** Merge edilmiş PR'lar #34–#38, #40, #41. Yetki kısmı `b756043` commit'iyle main'de. Kapanmış issue'lar #1–#8.
  - Çalışan kısımlar: backend iskeleti, kimlik doğrulama ve yetki, organizasyon yapısı, mobil giriş akışı.
  - Andon, Kaizen ve 5S henüz planlama aşamasında.

### 6.5 03 · Teknolojiler
- Başlığın sağında: "Projelerimde kullandıklarım".
- **İki satırlık kayan şerit:** Satırlar ters yönlere kayıyor (~45s ve ~55s), kenarlarda yumuşak bir solma var. Üzerine gelince duruyor. Çiplerde yalnızca teknoloji adı yazıyor. "dil", "veri", "cache" gibi alt etiketler olmayacak. **[Ali]**
  - **Satır 1:** Java, Spring Boot, Spring Cloud, C#, .NET, ASP.NET Core, Entity Framework, Flutter, React (React eklendi **[Ali, 2026-11-21]**)
  - **Satır 2:** PostgreSQL, MSSQL, Redis, Kafka, Docker, GitHub Actions, JUnit · Testcontainers, Git
- **Altında tek satır:** "Öğreniyorum → TypeScript · Next.js".
- **Erişilebilirlik:** Kesintisiz döngü için listedeki öğeler iki kez basılıyor. İkinci kopya ekran okuyuculardan gizlenmeli (`aria-hidden`). `prefers-reduced-motion` açıkken kayma durmalı ve öğeler sarılan (wrap) statik bir liste olarak gösterilmeli. **[Claude]**

### 6.6 04 · Deneyim
Başlığın sağında: "Topluluklar ve hackathonlar". Dört kart, masaüstünde 4 kolon, tablette 2 kolon, mobilde 1 kolon. Her kartta sol üstte küçük bir çizgi ikon (yeşil zeminli kutuda), sağ üstte etiket, ortada ad ve rol, altta mono yazıyla yer ve tarih.

| Kart | Etiket | Rol | Alt satır | Vurgu |
|---|---|---|---|---|
| Yazılım Mühendisliği Topluluğu **[Ali, 2026-11-21]** | Topluluk | Yönetim kurulu · Etkinlik departmanı | Sakarya Üniversitesi · 2026 – Devam ediyor | – |
| Bilgisayar Topluluğu | Topluluk | Kurumsal İlişkiler Sorumlusu | Sakarya Üniversitesi · 2025 – 2026 | – |
| NASA Space Apps Challenge | **Takım kaptanı** (yeşil) | LUNA 9 takımı · MarsPath projesi | Galactic Problem Solver · Kas 2026 | Yeşil çerçeve |
| IEEE OneAquaHealth Hackathon | **24. sıra** (yeşil) | Pipetin Yolculuğu · Flutter oyunu | Hackathon · Eyl 2026 | Yeşil çerçeve |

Kart ikonları: insanlar, çanta, roket, dalga. Önizlemedeki SVG'ler Lucide tarzında. Bir ikon kütüphanesi eklenip eklenmeyeceği **[Builder]**. Yalnızca 6–8 ikon gerektiği için satır içi SVG yeterli olabilir. Yeni paket eklenecekse nedeni söylenmeli (CLAUDE.md §4.2).

### 6.7 05 · Eğitim & sertifikalar
Yukarıdan aşağıya:
1. **Sakarya Üniversitesi** (yatay kart): Yazılım Mühendisliği (Lisans) · 3. sınıf · 2023 – 2028.
2. **İki kart yan yana:**
   - **Türkiye Siber Vatan Programı**, etiket "Devam ediyor". Alt başlık: "2027 dönemi · Yapay Zekâ Destekli Siber Güvenlik". Metin: "Başvurum kabul edildi; yaklaşık üç ay süren çevrim içi eğitim dönemindeyim. Bu aşamada en başarılı olanlar yüz yüze eğitime ve 7 günlük BootCamp'e davet ediliyor."
   - **YÖK Dijital Üniversite Platformu**, etiket "3. aşama". Alt başlık: "DYP 2026–2027 · Mart 2027'de başlıyor". Modül listesi: *Yapay Zekâ: Kolaylaştırıcı Araçlar* (10 oturum), *Modern Yazılım Geliştirme* (11 oturum).
   - Siber Vatan ve DYP genel bilgileri haber ve üniversite duyurularından alındı, kaynaklar tarihlerde birbirini tutmuyordu. Yayına almadan önce Ali resmî sayfalarla bir kez karşılaştırmalı.
3. **Öne çıkan sertifika kartı (Meta × YTÜ):**
   - Solda mavi gradyanlı bir alanda "Meta | YTÜ Startup House" yazıyor. Bu, gerçek logo değil, yalnızca yazı.
   - Sağda başlık "AI 101 Training Series". Altında: "Üretken yapay zekâ ve Meta'nın yapay zekâ araçlarıyla fikirden prototipe, dört modüllük program · AI Builders Türkiye · 27 Ekim – 6 Kasım 2026".
   - Kartta ok yok, link değil. **[Ali]**
4. **"BTK Akademi · Başarı sertifikaları":** 2×2 kompakt kart. Her kartta beyaz zeminli küçük bir kutuda BTK Akademi logosu ve sertifika adı var. Kartlarda ok yok, link değil. **[Ali]**
   - Sertifikalar: İleri Seviye Java, Java ile Programlamaya Giriş, C# Programlama, Algoritma Programlama ve Veri Yapılarına Giriş.
   - Liste Ali'nin ekran görüntüsünden alındı. CV'deki farklı liste (Web Servislerine Giriş, Techcareer) kullanılmayacak. **[Ali]**
   - Logo dosyası: [`assets/btk-logo.png`](assets/btk-logo.png) (BTK Akademi sitesinden alındı, 780×283 PNG). `next/image` ile kullanılacak, `alt="BTK Akademi"`.

### 6.8 06 · İletişim
İki kolon. Mobilde alt alta.
- **Sol kolon:**
  - Başlık: "Staj ve iş birliği için iletişime geçin."
  - Metin: "Staj fırsatları, projeler veya iş birliği teklifleri için e-posta ile ulaşabilirsiniz."
  - Buton: "CV'yi indir ↓". "(PDF)" yazısı olmayacak. **[Ali]** İndirilen dosya: `public/AliCanerSezer_CV.pdf` (telefonsuz sürüm, bkz. §10.1).
- **Sağ kolon (kart):** Üç satır.
  - E-posta: `alicanerszrr@gmail.com`, `mailto:` linki ve "Kopyala" butonu. Buton panoya kopyalıyor ve 1.6 saniyeliğine "Kopyalandı ✓" yazıyor.
  - LinkedIn: `linkedin.com/in/alicanersezer28`, https://www.linkedin.com/in/alicanersezer28/
  - GitHub: `github.com/alicaners`
  - Dış linkler yeni sekmede açılıyor (`rel="noopener"`).
- Konum satırı yok. **[Claude]**: Ali konum vermedi.

### 6.9 Footer
"© 2026 Ali Caner Sezer" ve "Next.js ile yapıldı". Yıl kodda sabit yazılmamalı, otomatik hesaplanmalı. **[Builder]**

## 7. Hareket ve etkileşim

Tüm süreler kısa: girişler ≤ 600ms, hover'lar 180–350ms. Yumuşama eğrisi: `cubic-bezier(.2,.7,.2,1)`. **`prefers-reduced-motion: reduce` açıkken tüm animasyonlar ve geçişler kapanır, içerik doğrudan görünür hâlde gelir.**

| Nerede | Ne |
|---|---|
| Hero | Durum etiketi, başlık, metin, butonlar ve bilgi satırı sırayla yukarı kayarak beliriyor (12px, 600ms, ~80ms arayla). Işıma 10 saniyelik döngüyle yavaşça nefes alıyor. Durum noktası nabız gibi atıyor. |
| Bölümler | Ekrana girince 16px aşağıdan solarak beliriyor. Her öğe bir kez canlanıyor. |
| Kartlar | İmleci takip eden çok hafif bir yeşil ışık. Proje ve deneyim kartları hover'da 2px yukarı kalkıyor. |
| Teknoloji şeridi | Sürekli kayıyor, hover'da duruyor. |
| Menü | Kaydırınca daralma ve arka planın bulanıklaşması. Bağlantıların altındaki çizgi soldan uzuyor. Logo hover'da katmanlar açılıyor (üst katman -2px, alt katman +2px). |
| Butonlar | Ok 3px kayıyor. Birincil buton hafif yeşil gölge alıyor. |

**Animasyon kütüphanesi [Builder]:** CLAUDE.md yığında Framer Motion'ı sayıyor. Ancak yukarıdaki etkileşimlerin hepsi CSS ve küçük bir `IntersectionObserver` ile yapılabiliyor, önizleme de öyle yapıldı. Önerim: Önce CSS ile yapmak. Framer Motion yalnızca gerçekten gerekirse eklenmeli ve eklenirse nedeni söylenmeli (CLAUDE.md §4.2). Paketin güncel adı ve API'si Context7'den doğrulanmalı. Sayfa geçişi yok, çünkü site tek sayfa.

## 8. İçerik veri modeli (`content/`)

Metinler koda gömülmeyecek. Önerilen dosyalar **[Builder: ad ve tip ayrıntıları]**:

- `content/profile.ts`: ad, unvan, hero metni, durum etiketi, bilgi satırı, e-posta, LinkedIn, GitHub, CV yolu
- `content/about.ts`: **zaten var**, bkz. §10
- `content/projects.ts`: projeler (ad, durum `"done" | "wip"`, açıklama, teknoloji listesi, repo URL'si veya `null`)
- `content/skills.ts`: şerit satırları ve "öğreniyorum" listesi
- `content/experience.ts`: deneyim kartları (ad, etiket, rol, yer, tarih, vurgu, ikon anahtarı)
- `content/education.ts`: üniversite, devam eden programlar, öne çıkan sertifika, BTK sertifikaları

Bileşenler yalnızca bu dosyaları okur. İleride İngilizce eklenirse aynı tipler `content/en/` altında çoğaltılabilir. Şimdi bunun için bir soyutlama kurulmayacak (CLAUDE.md §4.2).

## 9. SEO, erişilebilirlik, performans

- **Site adresi [Claude]:** Alan adı henüz belli değil. `metadataBase`, sitemap, robots ve OG URL'leri tek bir ortam değişkeninden okunacak (`NEXT_PUBLIC_SITE_URL`). Bu değişken boşsa Vercel'in üretim adresi (`VERCEL_PROJECT_PRODUCTION_URL`), o da yoksa `http://localhost:3000` kullanılacak. Ali alan adı alırsa yalnızca değişkeni ayarlaması yeter.
- Next.js Metadata API: başlık, açıklama ve `lang="tr"`. Open Graph görseli logo ve adla üretilecek. `sitemap.ts` ve `robots.ts` olacak. Favicon katman işaretinden üretilecek. **[Claude]**
- Semantik yapı: `header/nav/main/section/footer`. Tek bir `h1`, her bölümde bir `h2`.
- Klavye: Tüm linkler ve butonlar erişilebilir. Odak halkası görünür (yeşil, 2px). Mobil menüde `aria-expanded` kullanılacak.
- Görseller `next/image` ile. Fontlar `next/font` ile yüklenecek, sayfa yüklenirken düzen kaymamalı.
- **"Bitti" ölçütü:**
  - `npm run build` ve `npm run lint` hatasız.
  - 375, 768 ve 1440 px'te yatay taşma yok, konsolda hata yok (Playwright ekran görüntüleriyle kanıtlanacak).
  - Lighthouse mobilde dört kategoride ≥ 90.
  - Reduced-motion açıkken her şey statik ve görünür.
  - Açık ve koyu tema ikisi de AA kontrastta.

## 10. Açık konular

Builder bunlar için yer tutucu bırakır ya da şimdilik mevcut hâliyle uygular. Hiçbiri tahminle doldurulmaz.

1. ~~CV PDF'inde telefon ve ilçe var.~~ **Çözüldü [Ali].** Ali'nin isteğiyle telefon ve ilçe CV'den çıkarıldı. Sonuç dosyası: `C:\Users\alica\Downloads\AliCanerSezer_CV_web.pdf`.
   - Başlıktaki iletişim satırı redakte edildi, yani metin PDF'ten gerçekten silindi.
   - Satırın yerine "e-posta • github.com/alicaners" yazıldı: aynı boyut ve renk, ortalanmış, tıklanabilir linklerle.
   - PDF metninde "+90" öneki, telefon numarası ve ilçe adı geçmediği doğrulandı.
   - Builder bu dosyayı `public/AliCanerSezer_CV.pdf` olarak koyar. Her iki CV butonu da onu indirir (`download` özniteliğiyle).
2. **`content/about.ts` uzun metni içeriyor.** Sitede kısaltılmış hâli (§6.3) gösteriliyor. Dosya kısa metne göre güncellenecek ve sağ kolondaki anahtar-değer listesi için alan eklenecek. Kısa metni Ali kısaltma talimatıyla kabul etti, dosya değişikliği uygulama sırasında yapılacak. **[Claude]**
3. ~~CV'de olup sitede olmayan bilgiler.~~ **Çözüldü [Ali, 2026-11-21]:** RotaPlan teknolojileri ve açıklaması (§6.4), React şeride taşındı (§6.5), NASA ve IEEE kartlarına proje detayları ve ay bilgisi eklendi, ad "Yazılım Mühendisliği Topluluğu" oldu (§6.6).
4. ~~Proje detay sayfaları.~~ **Çözüldü [Ali]:** Detay sayfası olmayacak, proje okları GitHub'a gitmesi yeterli. `/projects/[slug]` rotası kurulmayacak, proje verisinde `slug` alanı da olmayacak.
5. **CLAUDE.md güncellemesi.** Doküman, CLAUDE.md §3'ten üç noktada bilerek ayrılıyor:
   - "Öne çıkanlar" bölümü yok. Ali "Nelere önem veririm" bölümünü kaldırttı. **[Ali]**
   - Watchdog sitede yok. Ali "sitede sadece 3 proje olacak" dedi. **[Ali]**
   - Bölüm sırası farklı.
   - Proje detay sayfaları (`/projects/[slug]`) yok, oklar GitHub'a gidiyor. **[Ali]**

   Çelişki olduğunda **bu doküman geçerlidir.** Onaydan sonra CLAUDE.md bu dokümana göre güncellenecek. **[Claude]**

## 11. Builder'a bırakılanlar

Bileşen sınırları ve klasör yapısı (frontend-architect ajanı), dosya ve tip adları, tema saklama yöntemi, ikonların uygulanması, Open Graph görselinin üretim yöntemi, animasyonların CSS mi kütüphane mi olacağı (§7'deki öneriyle). Ölçü, renk ve metin gibi önizlemede kesin olan her şey önizlemeden alınmalı.
