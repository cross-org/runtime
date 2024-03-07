/* Private functions */
function getChromeVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/Chrom(e|ium)\/([0-9]+)\./);
  return match ? match[2] : "Unknown";
}

function getFirefoxVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/Firefox\/([0-9]+)\./);
  return match ? match[1] : "Unknown";
}

function getEdgeVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/Edg\/([0-9]+)\./);
  return match ? match[1] : "Unknown";
}

function getSafariVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/Version\/([0-9]+)\.([0-9]+)(\.[0-9]+)? Safari\//);
  if (match) {
    return `${match[1]}.${match[2]}`; // Could include 3rd part if present
  } else {
    return "Unknown";
  }
}

function getOperaVersion() {
  const ua = navigator.userAgent;
  // Look for either 'Opera/' or 'OPR/' followed by the version
  const match = ua.match(/(Opera|OPR)\/([0-9]+)\./);
  return match ? match[2] : "Unknown";
}

function getBraveVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/Chrom(e|ium)\/([0-9]+)\./);
  return match ? match[2] : "Unknown";
}

/**
 * Enum of supported Runtimes.
 * @enum {string}
 */
export enum Runtime {
  Deno = "deno",
  Bun = "bun",
  Node = "node",
  Browser = "browser",
  Unsupported = "unsupported",
}

/**
 * Enum of supported Operating Systems.
 * @enum {string}
 */
export enum OperatingSystem {
  Windows = "windows",
  macOS = "macos",
  Linux = "linux",
  Android = "android",
  Unix = "unix",
  iOS = "ios",
  Unsupported = "unsupported",
}

/**
 * Enum of supported Products.
 * @enum {string}
 */
export enum Product {
  // All runtimes
  Deno = "deno",
  Bun = "bun",
  Node = "node",

  // All browsers
  Firefox = "firefox",
  Safari = "safari",
  Chrome = "chrome",
  Edge = "edge",
  Opera = "opera",
  Brave = "brave",

  // And unsupported
  Unsupported = "unsupported",
}

/**
 * Enum of common CPU architectures.
 * @enum {string}
 */
export enum Architecture {
  x86 = "x86",
  x64 = "x86_64",
  arm = "arm",
  arm64 = "arm64",
  Unsupported = "unsupported",
}

/**
 * Dynamically determines the current runtime environment.
 */
export function getCurrentRuntime(): Runtime {
  //@ts-ignore Runtime detection
  if (typeof Deno === "object") {
    return Runtime.Deno;
    //@ts-ignore Runtime detection
  } else if (typeof Bun === "object") {
    return Runtime.Bun;
  } else if (
    //@ts-ignore Runtime detection
    typeof process === "object" &&
    //@ts-ignore Runtime detection
    typeof process.versions !== "undefined" &&
    //@ts-ignore Runtime detection
    typeof process.versions.node !== "undefined"
  ) {
    return Runtime.Node;
  } else if (typeof window === "object") { // Check for Browser
    return Runtime.Browser;
  } else {
    return Runtime.Unsupported;
  }
}

/**
 * Dynamically determines the current operating system.
 */
export function getCurrentOS(): OperatingSystem {
  const runtime = getCurrentRuntime();
  switch (runtime) {
    case Runtime.Deno:
      switch (Deno.build.os) {
        case "darwin":
          return OperatingSystem.macOS;
        case "windows":
          return OperatingSystem.Windows;
        case "linux":
          return OperatingSystem.Linux;
        case "android":
          return OperatingSystem.Android;
        case "aix":
        case "freebsd":
        case "illumos":
        case "netbsd":
        case "solaris":
          return OperatingSystem.Unix;
      }
      return OperatingSystem.Unsupported;
    case Runtime.Node:
      // @ts-ignore Cross Runtime
      switch (process.platform) {
        case "darwin":
          return OperatingSystem.macOS;
        case "win32":
          return OperatingSystem.Windows;
        case "linux":
          return OperatingSystem.Linux;
        case "android":
          return OperatingSystem.Android;
        case "aix":
        case "freebsd":
        case "openbsd":
        case "sunos":
          return OperatingSystem.Unix;
      }
      return OperatingSystem.Unsupported;
    case Runtime.Bun:
      // @ts-ignore Cross Runtime
      switch (process.platform) {
        case "darwin":
          return OperatingSystem.macOS;
        case "win32":
          return OperatingSystem.Windows;
        case "linux":
          return OperatingSystem.Linux;
        case "android":
          return OperatingSystem.Android;
        case "aix":
        case "freebsd":
        case "openbsd":
        case "sunos":
          return OperatingSystem.Unix;
      }
      return OperatingSystem.Unsupported;
    case Runtime.Browser: {
      if ("userAgent" in navigator) {
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf("Win") !== -1) return OperatingSystem.Windows;
        if (userAgent.indexOf("like Mac") !== -1) return OperatingSystem.iOS;
        if (userAgent.indexOf("Mac") !== -1) return OperatingSystem.macOS;
        if (userAgent.indexOf("Android") !== -1) return OperatingSystem.Android;
        if (userAgent.indexOf("X11") !== -1 || userAgent.indexOf("Linux") !== -1) return OperatingSystem.Linux;
      }
    }
  }
  return OperatingSystem.Unsupported;
}

/**
 * Dynamically determines the current browser and its version (if applicable).
 */
export function getCurrentProduct(): Product {
  const runtime = getCurrentRuntime();
  switch (runtime) {
    case Runtime.Deno:
      return Product.Deno;
    case Runtime.Node:
      return Product.Node;
    case Runtime.Bun:
      return Product.Bun;
    case Runtime.Browser: {
      // For browser, get the specific browser
      const userAgent = navigator.userAgent;
      if (userAgent.indexOf("Opera") !== -1 || userAgent.indexOf("OPR") !== -1) {
        return Product.Opera;
      } else if ("brave" in navigator) {
        return Product.Brave;
      } else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
        return Product.Safari;
      } else if (userAgent.indexOf("Edg") !== -1) {
        return Product.Edge;
      } else if (userAgent.indexOf("Chrome") !== -1) {
        return Product.Chrome;
      } else if (userAgent.indexOf("Firefox") !== -1) {
        return Product.Firefox;
      } else {
        return Product.Unsupported;
      }
    }
    default:
      return Product.Unsupported;
  }
}

/**
 * Dynamically determines the version of the current product/runtime
 * @returns {string} A string containing the detected version, or undefined if the product is not supported.
 */
export function getCurrentVersion(): string | undefined {
  const product = getCurrentProduct();
  switch (product) {
    case Product.Deno:
      // @ts-ignore Runtime detection
      return Deno.version.deno;
    case Product.Node:
      // @ts-ignore Runtime detection
      return process.versions.node;
    case Product.Bun:
      // @ts-ignore Runtime detection
      return process.versions.bun;
    case Product.Chrome:
      return getChromeVersion();
    case Product.Firefox:
      return getFirefoxVersion();
    case Product.Edge:
      return getEdgeVersion();
    case Product.Safari:
      return getSafariVersion();
    case Product.Opera:
      return getOperaVersion();
    case Product.Brave:
      return getBraveVersion();
    default:
      return undefined;
  }
}

/**
 * Attempts to determine the current CPU architecture of the runtime's environment.
 */
export function getCurrentArchitecture(): Architecture {
  const runtime = getCurrentRuntime();
  switch (runtime) {
    case Runtime.Deno:
      if (Deno.build.arch === "x86_64") {
        return Architecture.x64;
      }
      if (Deno.build.arch === "aarch64") {
        return Architecture.arm64;
      }
      if (Deno.build.os === "darwin") {
        return Architecture.x64;
      }
      return Architecture.x86;
    case Runtime.Bun:
    case Runtime.Node:
      // @ts-ignore Cross Runtime
      switch (process.arch) {
        case "arm":
          return Architecture.arm;
        case "arm64":
          return Architecture.arm64;
        case "ia32":
          return Architecture.x86;
        case "x64":
          return Architecture.x64;
        case "loong64":
        case "mips":
        case "mipsel":
        case "ppc":
        case "ppc64":
        case "riscv64":
        case "s390":
        case "s390x":
          return Architecture.Unsupported;
      }
      return Architecture.Unsupported;
    case Runtime.Browser: {
      const userAgent = navigator.userAgent;
      // @ts-ignore Cross Runtime
      const platform = navigator.platform;

      if (platform.indexOf("Win64") !== -1 || platform.indexOf("x64") !== -1 || platform.indexOf("x86_64") !== -1) {
        return Architecture.x64;
      } else if (platform.indexOf("Win32") !== -1 || (platform.indexOf("x86") !== -1 && platform.indexOf("x86_64") === -1)) {
        return Architecture.x86;
      } else if (userAgent.indexOf("Win64") !== -1 || userAgent.indexOf("x64") !== -1 || userAgent.indexOf("x86_64") !== -1) {
        return Architecture.x64;
      } else if (userAgent.indexOf("Win32") !== -1 || (userAgent.indexOf("x86") !== -1 && userAgent.indexOf("x86_64") === -1)) {
        return Architecture.x86;
      }

      if (userAgent.indexOf("arm64") !== -1) {
        return Architecture.arm64;
      } else if (userAgent.indexOf("arm") !== -1) {
        return Architecture.arm;
        // @ts-ignore Cross Runtime
      } else if (platform.indexOf("iPhone") || platform.indexOf("iPad") || (userAgent.indexOf("Mac") !== -1 && "ontouchend" in document)) {
        // Likely aarch64 on newer iOS devices and Apple Silicon Macs
        return Architecture.arm64;
      }
      return Architecture.Unsupported;
    }
  }
  return Architecture.Unsupported;
}

/**
 * Static variable containing the current runtime.
 */
export const CurrentRuntime: Runtime = getCurrentRuntime();

/**
 * Static variable containing the current product.
 */
export const CurrentProduct: Product = getCurrentProduct();

/**
 * Static variable containing the current product/runtime version.
 */
export const CurrentVersion: string | undefined = getCurrentVersion();

/**
 * Static variable containing the current operating system.
 */
export const CurrentOS: string | undefined = getCurrentOS();

/**
 * Static variable containing the current operating system.
 */
export const CurrentArchitecture: string | undefined = getCurrentArchitecture();
