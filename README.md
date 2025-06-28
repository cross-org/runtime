## @cross/runtime

[![JSR Version](https://jsr.io/badges/@cross/runtime?v=bust)](https://jsr.io/@cross/runtime) [![JSR Score](https://jsr.io/badges/@cross/runtime/score?v=bust)](https://jsr.io/@cross/runtime/score)

**Cross-Runtime Environment Detection for JavaScript and TypeScript**

This package provides a well defined, cross runtime, way to determine details about the current runtime environment (Deno, Bun, Node.js, Tauri, or browser) along with detailed browser detection. Since version `1.1.0`, it can also parse a User Agent string to extract OS, Product and Version in a reliable way.

Try it out at [https://jsfiddle.net/hexag0n/x9568nmy/](https://jsfiddle.net/hexag0n/x9568nmy/).

Part of the @cross suite - check out our growing collection of cross-runtime tools at [github.com/cross-org](https://github.com/cross-org).

```javascript
import { 
  CurrentArchitecture,
  CurrentOS,
  CurrentProduct,
  CurrentRuntime,
  CurrentVersion,
  Runtime
} from "@cross/runtime";

console.log(`Runtime: ${CurrentRuntime}`);
console.log(`OS: ${CurrentOS}`);
console.log(`Architecture: ${CurrentArchitecture}`);
console.log(`Product: ${CurrentProduct}`);
console.log(`Version: ${CurrentVersion}\n`);

if (CurrentRuntime == Runtime.Deno) {
  console.log("You're running Deno!");
} else {
  console.log("You're not running Deno!");
}
```

This script results in something like:

```
Runtime:      bun
OS:           linux
Architecture: x86_64
Product:      bun
Version:      1.0.30

You're not running Deno!
```

... and an example of parsing User Agent String:

```javascript
import { 
  getVersionFromUserAgent,
  getProductFromUserAgent,
  getOSFromUserAgent
} from "@cross/runtime";

const ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36";

const os = getVersionFromUserAgent(ua);
const product = getProductFromUserAgent(ua);
const version = getOSFromUserAgent(ua);

console.log(`OS: ${os}`);
console.log(`Product: ${product}`);
console.log(`Version: ${version}\n`);
```

Resulting in:

```
OS: windows
Product: chrome
Version: 128
```

### Documentation

**Installation**

```bash
# Pick your runtime and package manager:
npx jsr add @cross/runtime  # Node.js
deno add @cross/runtime     # Deno
bunx jsr add @cross/runtime # Bun
```

### Supported Environments

**Runtimes**

* Deno
* Bun
* Node.js
* Tauri
* Web browsers (Chrome, Firefox, Edge, Safari, Opera, Brave)
* Edge Functions (Cloudflare Workers, Netlify Edge Functions, Fastly Compute@Edge)

**Operating Systems**

* Windows
* macOS
* Linux
* Android
* iOS
* Less common Unix variants (AIX, FreeBSD, OpenBSD, etc.)

**Browsers**

* Chrome
* Firefox
* Edge
* Safari
* Opera
* Brave

**Important Notes:**

* **Additional Functionality:** Beyond detection, the `dumpSystemInfo` function logs the information, and the `getsystemInfo` function provides a JSON representation.
* **Tauri Detection:** Tauri applications are detected by the presence of the `__TAURI__` global object. Since Tauri runs in a webview, it uses the same OS and architecture detection logic as browsers.
* **Tauri detailed Information:** For detailed Tauri-specific information (app name, version, identifier, Tauri framework version), use the `getTauriInfo()` function. This requires the `@tauri-apps/api` dependency to be installed in your Tauri project.
