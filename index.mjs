// This file is `.mjs` to workaround a Vite bug:
//  - Error originating from Vite:
//    ```
//    @brillout/json-s doesn't appear to be written in CJS, but also doesn't appear to be a valid ES module (i.e. it doesn't have "type": "module" or an .mjs extension for the entry point). Please contact the package author to fix.
//    ```
//  - Reproduction: https://github.com/brillout/sveltekit-telefunc-repro
throw new Error(
  "Module `@brillout/json-serializer` doesn't exist anymore: load `@brillout/json-serializer/parse` and `@brillout/json-serializer/stringify` instead.",
)
