import { CurrentOS, getOSFromUserAgent, getProductFromUserAgent, getVersionFromUserAgent, OperatingSystem } from "./mod.ts";
import { CurrentProduct, CurrentRuntime, CurrentVersion, Product, Runtime } from "./mod.ts";
import { assertEquals, assertNotEquals } from "@std/assert";
import { test } from "@cross/test";

const UserAgentStrings = {
  chrome128OnWindows: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  chrome118OnLinux: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36",
  firefox129OnMacOS: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14.6; rv:129.0) Gecko/20100101 Firefox/129.0",
  safari17OnIphone: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1",
  safari17OnMacOS: "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6_1) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Safari/605.1.15",
  safari5OnIos: "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3",
};

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
test("Chrome is detected", () => {
  assertEquals(getProductFromUserAgent(UserAgentStrings.chrome128OnWindows), Product.Chrome);
});
test("Windows is detected from chrome ua", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.chrome128OnWindows), OperatingSystem.Windows);
});
test("Chrome version is detected from chrome ua", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.chrome128OnWindows), "128");
});
test("Chrome is detected", () => {
  assertEquals(getProductFromUserAgent(UserAgentStrings.chrome128OnWindows), Product.Chrome);
});
test("Windows is detected from chrome ua", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.chrome128OnWindows), OperatingSystem.Windows);
});
test("Linux is detected from chrome ua", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.chrome118OnLinux), OperatingSystem.Linux);
});
test("Chrome version is detected from windows chrome ua", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.chrome128OnWindows), "128");
});
test("Chrome version is detected from linux chrome ua", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.chrome118OnLinux), "118");
});
test("Firefox is detected", () => {
  assertEquals(getProductFromUserAgent(UserAgentStrings.firefox129OnMacOS), Product.Firefox);
});
test("MacOS is detected from Firefox user agent", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.firefox129OnMacOS), OperatingSystem.macOS);
});
test("Version is detected from Firefox user agent", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.firefox129OnMacOS), "129");
});
test("Safari is detected", () => {
  assertEquals(getProductFromUserAgent(UserAgentStrings.safari17OnIphone), Product.Safari);
});
test("Ios is detected from Safari user agent", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.safari17OnIphone), OperatingSystem.iOS);
});
test("Version is detected from Safari user agent", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.safari17OnIphone), "17.5");
});
test("MacOS is detected from Safari user agent", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.safari17OnMacOS), OperatingSystem.macOS);
});
test("Version is detected from Safari user agent", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.safari17OnMacOS), "17.5");
});
test("MacOS is detected from older Safari user agent", () => {
  assertEquals(getOSFromUserAgent(UserAgentStrings.safari5OnIos), OperatingSystem.iOS);
});
test("Version is detected from Safari user agent", () => {
  assertEquals(getVersionFromUserAgent(UserAgentStrings.safari5OnIos), "5.1");
});
test("Tauri detection works correctly", () => {
  // For now we're just checking that we're not in Tauri (we're not running in a Tauri app)
  assertNotEquals(CurrentRuntime, Runtime.Tauri);
});
