# İlerleme durumu

**Son güncelleme:** 2026-11-21
**Durum:** Yayında (Netlify). Yayın sonrası düzeltme turu yapıldı.
**Tasarım dokümanı:** `docs/superpowers/specs/2026-11-20-portfolio-design.md` (onaylı)
**Uygulama planı:** `docs/superpowers/plans/2026-11-20-portfolio-site.md`

## Biten işler

| Görev | İçerik |
|---|---|
| 1 | İçerik dosyaları (`content/*.ts`) ve içerik testleri |
| 2 | Tema ve site adresi yardımcıları |
| 3 | Görsel sistem, layout, ortak UI parçaları |
| 4 | Üst menü (logo, aktif bölüm, tema düğmesi, mobil menü) |
| 5 | Hero ve Hakkımda |
| 6 | Projeler (GitHub okları) ve Teknolojiler (kayan şerit) |
| 7 | Deneyim, Eğitim & sertifikalar, telefonsuz CV, BTK logosu |
| 7b | CV'den gelen içerik güncellemeleri (Ali'nin 2026-11-21 kararları) |
| 8 | İletişim (e-posta kopyalama) ve footer |
| 8b | Belirme efektinin React bileşenine taşınması (hydration uyarısı çözüldü) |
| 9 | SEO: ikon, Open Graph görseli, sitemap, robots |
| 10 | Son kontrol, Lighthouse, CLAUDE.md güncellemesi |
| Son inceleme | Hareketi azalt açıkken şeridin sarılması, şerit durdurma butonu, dokümanlardan kişisel bilgi temizliği, arayüz metinlerinin `content/ui.ts`'e taşınması |

**Ölçümler:**
- `npm test`: 28/28 geçti, lint ve build temiz.
- Lighthouse (mobil, koyu tema): Performans 0.99, Erişilebilirlik 1.0, En iyi uygulamalar 1.0, SEO 1.0.
- 320, 375, 768 ve 1440 px'te yatay taşma yok, konsolda hata yok.

## Bilinen küçük konu

- **Şerit durdurma butonu:** Buton hem `aria-pressed` kullanıyor hem de etiketini değiştiriyor ("Şeridi durdur" / "Şeridi oynat"). Ekran okuyucular bunu belirsiz okuyabilir. Düzeltmesi iki satır: `aria-pressed` kaldırılır.

## Yayın

- **Canlı adres:** https://alicanersezer.netlify.app (Netlify). Vercel'in `.vercel.app` adresi Türkiye'den açılmadığı için Netlify'a geçildi.
- Netlify'da `NEXT_PUBLIC_SITE_URL` ayarlı. Ayarlı değilse kod `https://alicanersezer.netlify.app` adresine düşer (`src/lib/site-url.ts`).

## Yayın sonrası düzeltmeler (2026-11-21)

- Varsayılan site adresi Netlify oldu, Vercel'e özgü `VERCEL_PROJECT_PRODUCTION_URL` kaldırıldı.
- Hero unvanı "Backend Developer" (CV ile tutarlı), tanıtım cümlesine "fikri ürüne dönüştürme, backend'de güçlü" vurgusu eklendi.
- Metrikler: "3 proje", "5 sertifika" (4 BTK + Meta × YTÜ AI 101). Bir test bu sayıları içerik listeleriyle eşleştiriyor.
- RotaPlan kartındaki pasif ok kaldırıldı (henüz reposu yok).
- BTK sertifika görsellerinin alt metni her sertifikanın adını içeriyor.

- Siber Vatan ve YÖK DYP kartları Ali'nin verdiği bilgilerle güncellendi; haber sitelerinden gelen ifadeler çıkarıldı. IEEE "24. sıra" Ali tarafından doğrulandı.

- BTK sertifika listesi: kararlaştırıldı, mevcut hâliyle kalıyor (İleri Seviye Java, Java ile Programlamaya Giriş, C# Programlama, Algoritma Programlama ve Veri Yapılarına Giriş). CV'deki farklı liste sitede kullanılmayacak.
