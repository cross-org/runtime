## @cross/runtime

**Cross-Runtime Environment Detection for JavaScript and TypeScript**

This package provides a well defined, cross runtime, way to determine details about the current runtime environment (Deno, Bun, Node.js, or browser) along with detailed browser detection.

Try it out at [jsfiddle.net/ux87tLz4/6/](https://jsfiddle.net/ux87tLz4/6/)

```javascript
import { CurrentArchitecture, CurrentOS, CurrentProduct, CurrentRuntime, CurrentVersion, Runtime } from "@cross/runtime";

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

**Full Documentation**

For comprehensive documentation, including more advanced usage and examples, please visit the official JSR documentation (if your are not already there):
[https://jsr.io/@cross/runtime](https://jsr.io/@cross/runtime).
