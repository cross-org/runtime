## @cross/runtime

**Cross-Runtime Environment Detection for JavaScript and TypeScript**

This package provides a robust, cross runtime, way to determine the current runtime environment (Deno, Bun, Node.js, or browser) along with detailed browser detection.

Try it out at [jsfiddle.net/ux87tLz4/6/](https://jsfiddle.net/ux87tLz4/6/)

**Usage Example**

```javascript
import { CurrentProduct, CurrentRuntime, CurrentVersion, Runtime } from "@cross/runtime";

console.log(`Runtime: ${CurrentRuntime}`);
console.log(`Product: ${CurrentProduct}`);
console.log(`Version: ${CurrentVersion}`);

if (CurrentRuntime == Runtime.Deno) {
  console.log("You're running Deno!");
} else {
  console.log("You're not running Deno!");
}
```

**Full Documentation**

For comprehensive documentation, including more advanced usage and examples, please visit the official JSR documentation (if your are not already there):
[https://jsr.io/@cross/runtime](https://jsr.io/@cross/runtime).
