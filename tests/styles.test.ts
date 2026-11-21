import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../src/app/globals.css", import.meta.url), "utf8");

test("belirme gizlemesi yalnızca .js altında", () => {
  assert.match(css, /\.js\s+\[data-reveal\]:not\(\[data-revealed\]\)/);
  assert.doesNotMatch(css, /(^|[^s]\s)\[data-reveal\]\s*\{[^}]*opacity:\s*0/m);
});

test("reduced-motion bloğu animasyon ve geçişleri kapatır", () => {
  const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(block, /animation:\s*none\s*!important/);
  assert.match(block, /transition:\s*none\s*!important/);
});

test("her iki tema token'ları tanımlı", () => {
  for (const t of ["dark", "light"]) {
    const block = css.match(new RegExp(`\\[data-theme="${t}"\\]\\s*\\{([^}]*)\\}`))?.[1] ?? "";
    for (const token of ["--bg", "--text", "--muted", "--acc"]) {
      assert.match(block, new RegExp(`${token}:`), `${t} teması ${token} tanımlamalı`);
    }
  }
});

test("reduced-motion altında belirme öğeleri hemen görünür", () => {
  const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(block, /\[data-reveal\][^{]*\{[^}]*opacity:\s*1/);
});

test("reduced-motion'da şerit durur ve sarılır", () => {
  const block = css.match(/@media\s*\(prefers-reduced-motion:\s*reduce\)\s*\{([\s\S]*?)\n\}/)?.[1] ?? "";
  assert.match(block, /\.marquee-row\s*\{[^}]*flex-wrap:\s*wrap/);
  assert.match(block, /\.marquee-dup\s*\{[^}]*display:\s*none/);
});
