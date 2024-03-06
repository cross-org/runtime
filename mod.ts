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

/**
 * Enum of supported Runtime.
 * @enum {string}
 */
export const Runtime = {
  Deno: "deno",
  Bun: "bun",
  Node: "node",
  Browser: "browser",
  Unsupported: "unsupported",
};

/**
 * Enum of supported Product.
 * @enum {string}
 */
export const Product = {
  ...Runtime, // Including Unsupported
  Firefox: "firefox",
  Safari: "safari",
  Chrome: "chrome",
  Edge: "edge",
};

/**
 * Dynamically returns the current runtime environment.
 * @returns {Runtimes} The detected runtime environment.
 */
export function getCurrentRuntime() {
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
 * Determines the current browser and its version (if applicable).
 * @returns {Products}
 */
export function getCurrentProduct() {
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
      if (userAgent.indexOf("Chrome") !== -1) {
        return Product.Chrome;
      } else if (userAgent.indexOf("Firefox") !== -1) {
        return Product.Firefox;
      } else if (userAgent.indexOf("Safari") !== -1 && userAgent.indexOf("Chrome") === -1) {
        return Product.Safari;
      } else if (userAgent.indexOf("Edg") !== -1) {
        return Product.Edge;
      } else {
        return Product.Unsupported;
      }
    }
    default:
      return Product.Unsupported;
  }
}

/**
 * Determines the version of the current product/runtime
 * @returns {string} An object containing the detected version, or undefined if the product is not supported.
 */
export function getCurrentVersion() {
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
    default:
      return undefined;
  }
}

/**
 * Static variable with the current runtime.
 */
export const CurrentRuntime = getCurrentRuntime();

/**
 * Static variable with the current product.
 */
export const CurrentProduct = getCurrentProduct();

/**
 * Static variable with the current product/runtime version.
 */
export const CurrentVersion = getCurrentVersion();
