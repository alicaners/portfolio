# CLAUDE.md — Ali Caner Sezer Kişisel Portfolyo Sitesi

## 1. Proje bağlamı
- **Sahibi:** Ali Caner Sezer — Sakarya Üniversitesi, Yazılım Mühendisliği 3. sınıf.
- **Profil:** Backend odaklı (C#/.NET, katmanlı mimari, OOP; Java + Spring Boot). Frontend'de öğrenme aşamasında.
- **Amaç:** Staj başvurularında (Başarsoft, Logo Yazılım vb.) linki verilecek, projeleri ve deneyimleri sergileyen kişisel site.
- **Dil:** İçerik Türkçe. Yapı, ileride İngilizce sürüm eklenebilecek şekilde kurulmalı (metinler koda gömülmesin, `content/` altında dursun).
- **İlham:** enes.monolithstudios.dev, yalnızca bölüm yapısı için. Tasarımı, metinleri veya görselleri kopyalama. Kendine özgü bir görsel kimlik oluştur.

## 2. Teknoloji yığını
- Next.js (App Router) + TypeScript (strict)
- Tailwind CSS
- Framer Motion: şu an kullanılmıyor, animasyonlar CSS ile (`prefers-reduced-motion` destekli)
- İçerik: `content/` altında tipli TS/MDX dosyaları (projeler, deneyimler, beceriler)
- Deploy: Netlify (https://alicanersezer.netlify.app)
- Paket yöneticisi: npm

Komutlar:
- `npm run dev` → geliştirme sunucusu (http://localhost:3000)
- `npm run build` → üretim derlemesi (her büyük değişiklikten sonra çalıştır)
- `npm run lint` → lint kontrolü

## 3. Site bölümleri
1. **Hero:** isim, kısa tanıtım cümlesi, CTA (Projeleri incele / CV indir)
2. **Hakkımda**
3. **Projeler:** kart listesi, proje okları GitHub reposuna gider
   - Dijital Bankacılık Platformu
   - Yalın Üretim Asistanı (Flutter + ASP.NET Core)
   - RotaPlan: saha ekibi rota optimizasyonu (geliştiriliyor)
4. **Teknolojiler:** iki satırlık kayan şerit, altında 'Öğreniyorum' satırı
5. **Deneyim:** Yazılım Mühendisliği Topluluğu (Etkinlik departmanı, yönetim kurulu), Bilgisayar Topluluğu (Kurumsal İlişkiler), NASA Space Apps Challenge 2026 (takım LUNA 9), IEEE OneAquaHealth (24. sıra)
6. **Eğitim & sertifikalar**
7. **İletişim / Footer:** e-posta, GitHub, LinkedIn

> Proje açıklamalarındaki teknik detayları uydurma. Bilmediğin bir şey varsa `TODO(Ali):` yorumu bırak ve sor.

## 4. Davranış prensipleri (Karpathy'den esinlenen 4 prensip)

### 4.1 Kodlamadan önce düşün
- Varsayımlarını açıkça yaz. Emin değilsen tahmin etme, sor.
- Bir isteğin birden fazla yorumu varsa seçenekleri ve aralarındaki farkı göster, sessizce birini seçme.
- Kafan karıştıysa bunu gizleme, söyle.

### 4.2 Önce sadelik
- İsteneni çözen en küçük kodu yaz. "İleride lazım olur" diye soyutlama, config veya katman ekleme.
- Gereksiz bağımlılık ekleme. Yeni bir paket eklemeden önce nedenini söyle.
- 200 satırla yazdığın şey 50 satırla olabiliyorsa yeniden yaz.

### 4.3 Cerrahi değişiklikler
- Yalnızca görevle ilgili satırlara dokun. İstenmeden refactor, yeniden biçimlendirme veya yeniden adlandırma yapma.
- Anlamadığın kodu silme.
- Fark ettiğin ama görev dışı kalan sorunları düzeltme; sonunda liste halinde bildir.

### 4.4 Hedef odaklı yürütme
- İşe başlamadan önce "bitti" ölçütünü tanımla (ör. "build hatasız, 375/768/1440 px'de taşma yok, Lighthouse ≥ 90").
- Ölçüt sağlanana kadar dene → doğrula → düzelt döngüsünü sürdür.
- "Çalışıyor olmalı" deme; çalıştır, ekran görüntüsü al, kanıt göster.

## 5. Araç ve iş akışı kuralları
- **Superpowers:** Yeni bir bölüm veya özellik için brainstorm → plan → uygulama akışını kullan. Küçük düzeltmelerde bu akışı atla.
- **UI işleri:** `frontend-design` ve `ui-ux-pro-max` skill'lerini kullan. Şablon görünümlü, "AI yapımı" duran tasarımdan kaçın.
- **Context7:** Next.js, Tailwind ve Framer Motion API'leri sürümden sürüme değişiyor. Bu kütüphanelerle ilgili kod yazarken güncel dokümanı Context7'den çek.
- **Playwright MCP:** Her UI değişikliğinden sonra `localhost:3000`'i aç ve 375, 768 ve 1440 px genişlikte ekran görüntüsü alıp kontrol et. Konsoldaki hataları oku.
- **Git:** `git push`, `reset --hard`, `clean -f` ve `branch -D` hook tarafından engellenir; bunları deneme. Küçük, anlamlı commit'ler at. Push işini Ali kendisi yapar.
- **Açıklama:** Ali kodun açıklanmasını istiyor. Önemli değişikliklerde her parçanın ne yaptığını ve neden öyle yazıldığını kısaca anlat. Terminal komutu verirken bloğun tek seferde mi yoksa satır satır mı çalıştırılacağını belirt.

## 6. Alt ajanlar (`.claude/agents/`)
| Ajan | Ne zaman |
|---|---|
| `frontend-architect` | Klasör yapısı, component tasarımı, routing, veri modeli |
| `ui-designer` | Görsel kimlik, tipografi, renk, animasyon, tasarım incelemesi |
| `content-writer` | Hakkımda, proje açıklamaları, CTA metinleri (TR/EN) |
| `seo-a11y-auditor` | Metadata, OG, sitemap, erişilebilirlik, performans |
| `visual-tester` | Playwright ile responsive ve görsel test |
| `code-reviewer` | Commit öncesi diff incelemesi |

## 7. Kalite çıtası
- Lighthouse (mobil): Performance, Accessibility, Best Practices ve SEO'da ≥ 90
- Görseller `next/image` ile, uygun boyut ve `alt` metniyle
- Semantik HTML, klavyeyle gezinme, görünür focus, WCAG AA kontrast
- Next.js Metadata API, Open Graph görseli, `sitemap.ts`, `robots.ts`, `lang="tr"`

## 8. Asla
- Öğrenci numarası, telefon, ev adresi gibi kişisel bilgileri siteye koyma.
- `.env` dosyalarını commit etme.
- Başka bir sitenin metnini veya görselini kopyalama.

## 9. Next.js agent rules
@AGENTS.md
