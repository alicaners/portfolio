import { test } from "node:test";
import assert from "node:assert/strict";
import { copyText } from "../src/lib/clipboard.ts";

test("başarılı kopyalama", async () =>
  assert.equal(await copyText("a", { writeText: async () => {} }), true));
test("pano yok", async () => assert.equal(await copyText("a", undefined), false));
test("izin reddi", async () =>
  assert.equal(
    await copyText("a", {
      writeText: async () => {
        throw new Error("denied");
      },
    }),
    false,
  ));
