## [0.5.2](https://github.com/brillout/json-serializer/compare/v0.5.1...v0.5.2) (2022-11-03)


### Bug Fixes

* workaround Vite SSR externalizing bug ([a26b069](https://github.com/brillout/json-serializer/commit/a26b0698972b3b27e92a50bf84421e22ff2ec1e6))



## [0.5.1](https://github.com/brillout/json-serializer/compare/v0.5.0...v0.5.1) (2022-09-03)


### Bug Fixes

* fix TypeScript types ([f599ac6](https://github.com/brillout/json-serializer/commit/f599ac661a9f57703c21fc2d5b395705b7571799))



# [0.5.0](https://github.com/brillout/json-serializer/compare/v0.4.6...v0.5.0) (2022-09-02)


* perf!: forbid loading both `parse()` and `stringify()` at the same time ([8365764](https://github.com/brillout/json-serializer/commit/8365764bd377fb2b1048e0266c92cdae54070dde))


### Features

* new option `sortObjectKeys` for stable hashing ([6579f21](https://github.com/brillout/json-serializer/commit/6579f214c731c1b1de8bbece05f01b5bcca34c4a))


### BREAKING CHANGES

* Module `@brillout/json-serializer` doesn't exist anymore: load `@brillout/json-serializer/parse` and `@brillout/json-serializer/stringify` instead. (To reduce loaded KBs on the browser-side.)



