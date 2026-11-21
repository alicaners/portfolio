# İlerleme durumu

**Son güncelleme:** 2026-11-21
**Durum:** Uygulama tamamlandı, son inceleme ve düzeltme turu bitti. `master`'a tek commit olarak (squash) alınmayı bekliyor.
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

## Yayın öncesi yapılacaklar (Ali)

- `master`'ı GitHub'a push et. `feat/portfolio-site` branch'ini **push etme**, eski geçmişi içeriyor.
- Vercel'e bağla. Alan adı alırsan `NEXT_PUBLIC_SITE_URL` ortam değişkenini ayarla.
- Siber Vatan ve YÖK DYP bilgilerini resmî sayfalarla karşılaştır.
