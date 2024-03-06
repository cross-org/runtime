## @cross/runtime

**Cross-Runtime Environment Detection for JavaScript and TypeScript**

This package provides a robust, cross runtime, way to determine the current runtime environment (Deno, Bun, Node.js, or browser) along with detailed browser detection.

**Installation**

Refer to the installation instructions on the official JSR documentation: [invalid URL removed]

**Usage Example**

```javascript
import { CurrentProduct, CurrentRuntime, CurrentVersion, Runtime } from "@cross/runtime";

console.log(`Runtime: ${CurrentRuntime}`);
console.log(`Product: ${CurrentProduct}`);
console.log(`Version: ${CurrentVersion}`);

if (CurrentRuntime == Runtime.Deno) {
  console.log("You're running Deno!");
}
```

**Full Documentation**

For comprehensive documentation, including more advanced usage and examples, please visit the official JSR documentation (if your are not already there):
[https://jsr.io/@cross/runtime](https://jsr.io/@cross/runtime).

**Why Choose @cross/runtime?**

If you need reliable and flexible runtime detection across different JavaScript and TypeScript environments, `@cross/runtime` is an excellent choice. It's actively maintained, supports all
environments, minimal and free from dependencies.
