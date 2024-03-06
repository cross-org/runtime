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

function getVivaldiVersion() {
  const ua = navigator.userAgent;
  const match = ua.match(/Vivaldi\/([0-9]+)\./);
  return match ? match[1] : "Unknown";
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
  Vivaldi = "vivaldi",

  // And unsupported
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
      } else if (userAgent.indexOf("Vivaldi") !== -1) {
        return Product.Vivaldi;
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
    case Product.Vivaldi:
      return getVivaldiVersion();
    default:
      return undefined;
  }
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
