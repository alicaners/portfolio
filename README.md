# Ali Caner Sezer · Portfolyo

Kişisel portfolyo sitesi. Canlı adres: **https://alicanersezer.netlify.app**

## Teknolojiler

Next.js (App Router), TypeScript, Tailwind CSS. Site metinleri `content/` altındaki tipli dosyalarda durur.

## Geliştirme

```bash
npm install
npm run dev     # http://localhost:3000
npm test        # içerik ve yardımcı fonksiyon testleri
npm run lint
npm run build
```

## Deploy

Site **Netlify** üzerinde yayında.

| Ortam değişkeni | Açıklama |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Sitenin tam adresi (sitemap, robots ve Open Graph için). Ayarlı değilse `https://alicanersezer.netlify.app` kullanılır. |
