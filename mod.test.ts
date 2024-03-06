import { CurrentProduct, CurrentRuntime, CurrentVersion, Product, Runtime } from "./mod.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("Current runtime is Deno (string)", () => {
  assertEquals("deno", CurrentRuntime);
});
Deno.test("Current runtime is Deno (enum)", () => {
  assertEquals(Runtime.Deno, CurrentRuntime);
});
Deno.test("Current product is Deno (string)", () => {
  assertEquals("deno", CurrentProduct);
});
Deno.test("Current product is Deno (enum)", () => {
  assertEquals(Product.Deno, CurrentProduct);
});
Deno.test("Current version contains a dot", () => {
  assertEquals(true, CurrentVersion?.includes("."));
});
