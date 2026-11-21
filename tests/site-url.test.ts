import { test } from "node:test";
import assert from "node:assert/strict";
import { getSiteUrl } from "../src/lib/site-url.ts";

test("öncelik sırası", () => {
  assert.equal(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://ali.dev" }).href, "https://ali.dev/");
  assert.equal(getSiteUrl({ VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" }).href, "https://x.vercel.app/");
  assert.equal(getSiteUrl({}).href, "http://localhost:3000/");
});

test("NEXT_PUBLIC_SITE_URL, Vercel değerinden önce gelir", () =>
  assert.equal(
    getSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://ali.dev", VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" }).href,
    "https://ali.dev/",
  ));

test("boş string ayarlanmamış sayılır", () =>
  assert.equal(
    getSiteUrl({ NEXT_PUBLIC_SITE_URL: "", VERCEL_PROJECT_PRODUCTION_URL: "x.vercel.app" }).href,
    "https://x.vercel.app/",
  ));

test("URL nesnesi döner", () => assert.ok(getSiteUrl({}) instanceof URL));
