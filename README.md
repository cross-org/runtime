## @cross/runtime

[![JSR Version](https://jsr.io/badges/@cross/runtime?v=bust)](https://jsr.io/@cross/runtime) [![JSR Score](https://jsr.io/badges/@cross/runtime/score?v=bust)](https://jsr.io/@cross/runtime/score)

**Cross-Runtime Environment Detection for JavaScript and TypeScript**

This package provides a well defined, cross runtime, way to determine details about the current runtime environment (Deno, Bun, Node.js, or browser) along with detailed browser detection.

Try it out at [https://jsfiddle.net/hexag0n/x9568nmy/](https://jsfiddle.net/hexag0n/x9568nmy/)

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