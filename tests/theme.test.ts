import { test } from "node:test";
import assert from "node:assert/strict";
import { resolveTheme, themeInitScript, THEME_KEY } from "../src/lib/theme.ts";

test("THEME_KEY", () => assert.equal(THEME_KEY, "theme"));

test("resolveTheme", () => {
  assert.equal(resolveTheme("light", false), "light");
  assert.equal(resolveTheme("dark", true), "dark");
  assert.equal(resolveTheme("mor", true), "light");
  assert.equal(resolveTheme(null, false), "dark");
  assert.equal(resolveTheme(null, true), "light");
});

function runInit(
  ls: () => string | null,
  mm: (q: string) => { matches: boolean },
) {
  const root = {
    dataset: {} as Record<string, string>,
    classList: {
      added: [] as string[],
      add(c: string) {
        this.added.push(c);
      },
    },
  };
  const doc = { documentElement: root };
  const storage = { getItem: ls };
  new Function("document", "localStorage", "matchMedia", themeInitScript)(
    doc,
    storage,
    mm,
  );
  return root;
}
const media = (prefersLight: boolean) => () => ({ matches: prefersLight });

test("init script: saklı değer", () => {
  const r = runInit(() => "light", media(false));
  assert.equal(r.dataset.theme, "light");
  assert.ok(r.classList.added.includes("js"));
});

test("init script: geçersiz saklı değer → sistem tercihi", () =>
  assert.equal(runInit(() => "mor", media(true)).dataset.theme, "light"));

test("init script: localStorage hata fırlatır → sistem tercihi", () => {
  const r = runInit(() => {
    throw new Error("blocked");
  }, media(true));
  assert.equal(r.dataset.theme, "light");
  assert.ok(r.classList.added.includes("js"));
});

test("init script: matchMedia da hata fırlatırsa dark", () => {
  const r = runInit(
    () => null,
    () => {
      throw new Error("no matchMedia");
    },
  );
  assert.equal(r.dataset.theme, "dark");
  assert.ok(r.classList.added.includes("js"));
});
