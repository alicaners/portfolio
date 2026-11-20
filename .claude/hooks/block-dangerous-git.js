#!/usr/bin/env node
// PreToolUse hook: tehlikeli git komutlarını çalışmadan önce engeller.
// Claude Code, araç girdisini stdin'den JSON olarak verir; exit 2 = engelle (stderr Claude'a gösterilir).
// jq yerine Node kullanılıyor: Windows'ta jq yok, Node ise projede zaten var.

const DANGEROUS_PATTERNS = [
  /\bgit\s+push\b/,
  /\bgit\s+reset\s+.*--hard\b/,
  /\bgit\s+clean\s+(.*\s)?-[a-zA-Z]*f/, // -f, -fd, -xfd ...
  /\bgit\s+branch\s+(.*\s)?-[a-zA-Z]*D/, // -D, -fD ...
  /\bgit\s+checkout\s+(--\s+)?\.(\s|$)/,
  /\bgit\s+restore\s+(.*\s)?\.(\s|$)/,
  /\bpush\s+(.*\s)?--force\b/,
  /\breset\s+--hard\b/,
];

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (chunk) => (raw += chunk));
process.stdin.on("end", () => {
  let command;
  try {
    command = JSON.parse(raw)?.tool_input?.command;
  } catch {
    // Girdi okunamazsa güvenli tarafta kal: engelle.
    console.error("BLOCKED: git guardrail hook girdiyi okuyamadı (geçersiz JSON).");
    process.exit(2);
  }
  if (typeof command !== "string") process.exit(0);

  const hit = DANGEROUS_PATTERNS.find((p) => p.test(command));
  if (hit) {
    console.error(
      `BLOCKED: '${command}' matches dangerous pattern ${hit}. The user has prevented you from doing this.`
    );
    process.exit(2);
  }
  process.exit(0);
});
