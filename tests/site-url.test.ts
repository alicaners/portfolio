import { test } from "node:test";
import assert from "node:assert/strict";
import { getSiteUrl } from "../src/lib/site-url.ts";

test("NEXT_PUBLIC_SITE_URL ayarlıysa o kullanılır", () =>
  assert.equal(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "https://ali.dev" }).href, "https://ali.dev/"));

test("ayarlı değilse Netlify adresine düşer", () =>
  assert.equal(getSiteUrl({}).href, "https://alicanersezer.netlify.app/"));

test("boş string ayarlanmamış sayılır", () =>
  assert.equal(getSiteUrl({ NEXT_PUBLIC_SITE_URL: "" }).href, "https://alicanersezer.netlify.app/"));

test("URL nesnesi döner", () => assert.ok(getSiteUrl({}) instanceof URL));
