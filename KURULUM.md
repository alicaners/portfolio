# Claude Code Kurulum Rehberi — Portfolyo Sitesi

> **İki tür komut var:**
> - 🖥️ **Terminal komutu:** Normal terminale (bash/PowerShell) yazılır.
> - 💬 **Slash komutu:** `claude` açıkken Claude Code'un içine yazılır (`/plugin ...`).
>
> Aksi belirtilmedikçe her komutu **satır satır** çalıştır ve bir sonrakine geçmeden önce çıktısını kontrol et.

---

## 0. Ön hazırlık

🖥️ Satır satır çalıştır:
```bash
node -v          # 18 veya üstü olmalı
python3 --version  # ui-ux-pro-max'ın arama scripti için gerekli
claude --version   # Claude Code güncel olmalı (plugin sistemi için)
```

Proje klasörünü oluşturup Next.js projesini kur:

🖥️ Satır satır çalıştır:
```bash
npx create-next-app@latest portfolio --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd portfolio
git init   # create-next-app genelde zaten yapar, hata verirse sorun değil
```

Bu zip'teki dosyaları `portfolio/` klasörünün **köküne** kopyala:
```
portfolio/
├── CLAUDE.md
├── .mcp.json
└── .claude/
    └── agents/   (6 dosya)
```
> `.claude` ve `.mcp.json` gizli dosyalardır. Finder/Explorer'da gizli dosyaları göstermeyi aç (macOS: `Cmd+Shift+.`).

---

## 1. Superpowers (ana iş akışı)

💬 `claude` içinde:
```
/plugin install superpowers@claude-plugins-official
```
Alternatif (resmi marketplace'te bulamazsan), satır satır:
```
/plugin marketplace add obra/superpowers-marketplace
/plugin install superpowers@superpowers-marketplace
```

**Ne işe yarar:** Claude'a bir geliştirme yöntemi kazandırır: brainstorm → plan → TDD → alt ajanlarla uygulama → review. Yeni bölüm eklerken (ör. "projeler bölümünü yapalım") önce sana sorular sorar, sonra plan çıkarır.

---

## 2. Frontend Design (+ webapp-testing)

💬 `claude` içinde:
```
/plugin install frontend-design@claude-plugins-official
```

**webapp-testing (isteğe bağlı):** Playwright MCP ile büyük ölçüde aynı işi yapıyor. Kurmasan da olur. Kurmak istersen proje klasöründe:

🖥️
```bash
npx skills add anthropics/skills --skill webapp-testing --agent claude-code
```

---

## 3. Matt Pocock — sadece git-guardrails

🖥️ Proje klasöründe:
```bash
npx skills add mattpocock/skills --skill git-guardrails-claude-code --agent claude-code
```

Bu bir **kurulum skill'i**: kendisi bir hook kuruyor. Kurduktan sonra:

💬 `claude` içinde şunu yaz:
```
git-guardrails skill'ini kullanarak hook'u bu proje için kur (.claude/settings.json)
```

**Sonuç:** Claude `git push`, `git reset --hard`, `git clean -f` ve `git branch -D` komutlarını çalıştıramaz. Push'u sen kendin yaparsın.

---

## 4 & 5. Context7 ve Playwright MCP

Zip'teki `.mcp.json` ikisini de **proje kapsamında** tanımlıyor. Claude Code'u ilk açtığında onay isteyecek; ikisini de onayla.

Kontrol etmek için 💬 `claude` içinde:
```
/mcp
```
`context7` ve `playwright` yanında "connected" görmelisin.

**Alternatif (tüm projelerde kullanmak istersen):** `.mcp.json`'u silip 🖥️ satır satır çalıştır:
```bash
claude mcp add --scope user context7 -- npx -y @upstash/context7-mcp
claude mcp add --scope user playwright -- npx @playwright/mcp@latest
```

Playwright ilk çalıştığında tarayıcı indirmesi gerekebilir. Hata alırsan:
```bash
npx playwright install chromium
```

**Context7 API key (isteğe bağlı):** Ücretsiz key, istek limitini artırır. context7.com/dashboard'dan alıp `.mcp.json`'daki `args` listesine `"--api-key", "KEYIN"` ekle. **Bu durumda `.mcp.json`'u git'e commit etme** (`.gitignore`'a ekle).

---

## 6. Alt ajanlar

Zip'te hazır olarak geliyor (`.claude/agents/`). Kontrol için 💬:
```
/agents
```
6 ajanı listede görmelisin. Kullanım örnekleri:
- "ui-designer ajanıyla 3 farklı tasarım yönü öner"
- "visual-tester ile siteyi kontrol et"
- "commit atmadan önce code-reviewer'a incelet"

---

## 7. Karpathy prensipleri

`CLAUDE.md`'nin 4. bölümüne eklendi. Ayrıca plugin olarak **kurma**; aynı kurallar iki kez yüklenmiş olur.

---

## 8. Listedeki diğerleri — önerim

| Eklenti | Öneri | Neden |
|---|---|---|
| **ui-ux-pro-max** | ✅ Kur | Portfolyo için çok faydalı: stil, palet ve font eşleşmesi veritabanı içeriyor. |
| **marketingskills** | 🟡 Sadece 2 skill | 68 skill'in çoğu SaaS pazarlaması için. Senin için yalnızca `copywriting` ve `seo-audit` işe yarar. |
| **claude-mem** | 🟡 İsteğe bağlı | Oturumlar arası hafıza sağlıyor. Ama CLAUDE.md + Superpowers planları zaten bağlamı koruyor. Arka planda worker servisi çalıştırıyor ve AGPL lisanslı. |
| **everything-claude-code** | ❌ Kurma | Superpowers ile aynı işi yapıyor (planner, tdd, code-review ajanları). İkisi birlikte çakışıyor ve bağlamı şişiriyor. |
| **ruflo** | ❌ Kurma | Kurumsal çoklu ajan orkestrasyonu, 300+ MCP aracı. Tek kişilik bir portfolyo sitesi için fazlasıyla ağır; context penceresini doldurur. |

### ui-ux-pro-max
💬 Satır satır:
```
/plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill
/plugin install ui-ux-pro-max@ui-ux-pro-max-skill
```

### marketingskills (sadece 2 skill)
🖥️ Proje klasöründe:
```bash
npx skills add coreyhaines31/marketingskills --skill copywriting seo-audit --agent claude-code
```
> Skill adları değişmiş olabilir. Hata alırsan önce `npx skills add coreyhaines31/marketingskills --list` ile listeyi gör.

### claude-mem (istersen)
💬 Satır satır:
```
/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem
```
Sonra Claude Code'u kapatıp yeniden aç.

---

## 9. Son kontrol

Claude Code'u kapatıp proje klasöründe yeniden aç (`claude`). Ardından 💬 satır satır:
```
/plugin
/mcp
/agents
```

Her şey yerindeyse ilk prompt olarak şunu yaz:
```
CLAUDE.md'yi oku. Superpowers brainstorm akışıyla başlayalım: portfolyo sitemin görsel yönünü ve bölüm yapısını netleştirmek için bana sorular sor. Sonra ui-designer ajanıyla 3 tasarım yönü öner.
```

---

## Sorun giderme
- **`/plugin install` "not found" hatası veriyor:** `/plugin` yazıp **Discover** sekmesinden adı arat. Marketplace adları zamanla değişebiliyor.
- **Skill çalışmıyor:** Claude Code'u yeniden başlat. Skill'ler oturum başında yükleniyor.
- **Çok fazla eklenti, Claude yavaşladı:** `/context` ile neyin yer kapladığına bak. Kullanmadığın plugin'i `/plugin` → disable ile kapat.
