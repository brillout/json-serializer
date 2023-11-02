## [0.5.7](https://github.com/brillout/json-serializer/compare/v0.5.6...v0.5.7) (2023-11-02)


### Features

* isJsonSerializerError() (vikejs/vike[#1232](https://github.com/brillout/json-serializer/issues/1232)) ([1e3509e](https://github.com/brillout/json-serializer/commit/1e3509e7dade243d1f79bf4445433e5713c6562e))



## [0.5.6](https://github.com/brillout/json-serializer/compare/v0.5.5...v0.5.6) (2023-09-03)


### Bug Fixes

* make error messages prettier ([313bb24](https://github.com/brillout/json-serializer/commit/313bb2457c5efb070ff6359bfc31688657f306eb))
* make error messages prettier ([a448408](https://github.com/brillout/json-serializer/commit/a448408c2eec3e1cc70cc56f0d811a7babb26021))
* make error messages prettier ([e4b5781](https://github.com/brillout/json-serializer/commit/e4b578126f40d065b03818ac65256e633da1c31d))
* make paths prettier ([1d04319](https://github.com/brillout/json-serializer/commit/1d043190e0269242c28033a6edff72bbdf3a8bed))
* object value path in error messages ([5d9f0dd](https://github.com/brillout/json-serializer/commit/5d9f0dd908a3125173ba3e9ab96fde41cf863a9a))


### Features

* make error message core available at err.messageCore ([3d08d57](https://github.com/brillout/json-serializer/commit/3d08d5747939b85a67b94b11ecb11e0b1bf77083))



## [0.5.5](https://github.com/brillout/json-serializer/compare/v0.5.4...v0.5.5) (2023-08-26)


### Bug Fixes

* add License to package.json ([b3ef4c4](https://github.com/brillout/json-serializer/commit/b3ef4c4a149d346fa8b00d5210ef67c8df2da7c3))



## [0.5.4](https://github.com/brillout/json-serializer/compare/v0.5.3...v0.5.4) (2023-07-15)


### Bug Fixes

* improve serialization error message ([19a18ca](https://github.com/brillout/json-serializer/commit/19a18ca30f3224d85cb920cd58725f48c429ad5d))



## [0.5.3](https://github.com/brillout/json-serializer/compare/v0.5.2...v0.5.3) (2022-11-03)


### Bug Fixes

* add index.mjs to npm package ([#9](https://github.com/brillout/json-serializer/issues/9)) ([df5b103](https://github.com/brillout/json-serializer/commit/df5b103778c86523e736d2fe3bf11c81411afd41))



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



