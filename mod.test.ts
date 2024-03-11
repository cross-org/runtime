import { CurrentOS, OperatingSystem } from "./mod.ts";
import { CurrentProduct, CurrentRuntime, CurrentVersion, Product, Runtime } from "./mod.ts";
import { assertEquals, assertNotEquals } from "@std/assert";
import { test } from "@cross/test";

test("Current runtime is correct (string)", () => {
  if ("Bun" in globalThis) {
    assertEquals("bun", CurrentRuntime);
  } else if ("Deno" in globalThis) {
    assertEquals("deno", CurrentRuntime);
  } else {
    assertEquals("node", CurrentRuntime);
  }
});
test("Current runtime is Deno (enum)", () => {
  if ("Bun" in globalThis) {
    assertEquals(Runtime.Bun, CurrentRuntime);
  } else if ("Deno" in globalThis) {
    assertEquals(Runtime.Deno, CurrentRuntime);
  } else {
    assertEquals(Runtime.Node, CurrentRuntime);
  }
});
test("Current product is Deno (string)", () => {
  if ("Bun" in globalThis) {
    assertEquals("bun", CurrentProduct);
  } else if ("Deno" in globalThis) {
    assertEquals("deno", CurrentProduct);
  } else {
    assertEquals("node", CurrentProduct);
  }
});
test("Current product is Deno (enum)", () => {
  if ("Bun" in globalThis) {
    assertEquals(Product.Bun, CurrentProduct);
  } else if ("Deno" in globalThis) {
    assertEquals(Product.Deno, CurrentProduct);
  } else {
    assertEquals(Product.Node, CurrentProduct);
  }
});
test("Current version contains a dot", () => {
  assertEquals(true, CurrentVersion?.includes("."));
});
test("Current operating system is supported", () => {
  assertNotEquals(OperatingSystem.Unsupported, CurrentOS);
});
