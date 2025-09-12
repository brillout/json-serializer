## [0.5.21](https://github.com/brillout/json-serializer/compare/v0.5.20...v0.5.21) (2025-09-12)


### Bug Fixes

* fix user replacer (closes vikejs/vike[#2715](https://github.com/brillout/json-serializer/issues/2715)) ([#17](https://github.com/brillout/json-serializer/issues/17)) ([4f39743](https://github.com/brillout/json-serializer/commit/4f3974318c701c01d634928d934cef7f319f91ec))



## [0.5.20](https://github.com/brillout/json-serializer/compare/v0.5.19...v0.5.20) (2025-08-21)


### Bug Fixes

* remove CJS build ([8a9605c](https://github.com/brillout/json-serializer/commit/8a9605cadb1c2742ccbe0f651e665591f2c79ec4))



## [0.5.19](https://github.com/brillout/json-serializer/compare/v0.5.18...v0.5.19) (2025-08-20)


### Bug Fixes

* ESM modules must be imported with file extension ([#16](https://github.com/brillout/json-serializer/issues/16)) ([f6d0930](https://github.com/brillout/json-serializer/commit/f6d0930f500814427180bb824a697f327efb5dc2))


### MINOR BREAKING CHANGES

> [!NOTE]
> We recommend ignoring `MINOR BREAKING CHANGES` unless this version breaks your app, see [Vike Versioning](https://vike.dev/versioning).

* Update to Node.js 20 or above (or use Bun/Deno). See also: [`require(esm)`](https://gist.github.com/brillout/8e0133716e169b981b6c4e8a938b0134).



## [0.5.18](https://github.com/brillout/json-serializer/compare/v0.5.17...v0.5.18) (2025-08-20)


### Bug Fixes

* exports conditions ([#15](https://github.com/brillout/json-serializer/issues/15)) ([cd941af](https://github.com/brillout/json-serializer/commit/cd941af9c88b5d1bbd4aafd55c971828707bdb75))



## [0.5.17](https://github.com/brillout/json-serializer/compare/v0.5.16...v0.5.17) (2025-08-04)


### Bug Fixes

* base replacer on original value ([fbdc662](https://github.com/brillout/json-serializer/commit/fbdc6622b05f15b6d97dd606dd0d4ce384deca4b))


### Features

* add replacement.resolved to replacer ([9da5b85](https://github.com/brillout/json-serializer/commit/9da5b85fdfa130ae3a0b17e104e0291bdc5dc53c))



## [0.5.16](https://github.com/brillout/json-serializer/compare/v0.5.15...v0.5.16) (2025-07-07)


### Bug Fixes

* improve replacer option type ([581b0aa](https://github.com/brillout/json-serializer/commit/581b0aaa2b7086fc8f886776515d065cb696eba7))


### Features

* reviver (closes [#3](https://github.com/brillout/json-serializer/issues/3)) ([515dd44](https://github.com/brillout/json-serializer/commit/515dd44dd856fb10d592a49060d555155ff5a0c8))



## [0.5.15](https://github.com/brillout/json-serializer/compare/v0.5.14...v0.5.15) (2024-12-09)


### Bug Fixes

* workaround unexpected Node.js condition resolving (fix vikejs/vike[#2016](https://github.com/brillout/json-serializer/issues/2016)) ([f0caec5](https://github.com/brillout/json-serializer/commit/f0caec5fc7263655ace432d7812ba348035f10ab))



## [0.5.14](https://github.com/brillout/json-serializer/compare/v0.5.13...v0.5.14) (2024-12-09)


### Bug Fixes

* improve exports conditions ([#14](https://github.com/brillout/json-serializer/issues/14)) ([85ca88d](https://github.com/brillout/json-serializer/commit/85ca88d6d0bedaa17a023f76478a8afae1dfbaa8))



## [0.5.13](https://github.com/brillout/json-serializer/compare/v0.5.12...v0.5.13) (2024-07-10)


### Bug Fixes

* fix pathString ([83a0bc8](https://github.com/brillout/json-serializer/commit/83a0bc8847d192ec40cef1dc322818e0af228957))



## [0.5.12](https://github.com/brillout/json-serializer/compare/v0.5.11...v0.5.12) (2024-07-10)


### Bug Fixes

* improve messageCore type ([0bcf56e](https://github.com/brillout/json-serializer/commit/0bcf56e238064dd0146d151051fadc7e26408441))
* pass more usefull pathString value ([eb063d6](https://github.com/brillout/json-serializer/commit/eb063d6ee9fe6729a45e4b6a3b06bd0c4a38e04c))


### Features

* add subjectName to serialization error object ([7220453](https://github.com/brillout/json-serializer/commit/72204538f347b05df362047c1b01cc3fc392b44b))



## [0.5.11](https://github.com/brillout/json-serializer/compare/v0.5.10...v0.5.11) (2024-07-10)


### Bug Fixes

* stop passing pathString to user-land replacer ([3d4fd16](https://github.com/brillout/json-serializer/commit/3d4fd161aa7a4854dd2f8c557884f132f09fa623))


### Features

* add more information to serializatoin error object ([d173e8a](https://github.com/brillout/json-serializer/commit/d173e8a0cd0d3a7af42e8cea5c2e6d7610f4c21a))


### BREAKING CHANGES

* `replacer()` doesn't recevied the `pathString` argument anymore:
```diff
  stringify(something, {
-   replacer(key, val, pathString) {
+   replacer(key, val) {
       // ...
    }
  }
```



## [0.5.10](https://github.com/brillout/json-serializer/compare/v0.5.9...v0.5.10) (2024-05-02)


### Features

* expose parseTransform() ([481e63c](https://github.com/brillout/json-serializer/commit/481e63cf16462bb037e28a2baa63837a8aff150f))



## [0.5.9](https://github.com/brillout/json-serializer/compare/v0.5.8...v0.5.9) (2024-05-02)


### Features

* user-defined replacer ([76ddf95](https://github.com/brillout/json-serializer/commit/76ddf95cdfe36c39b99400a41bc22d2f243ed5c4))



## [0.5.8](https://github.com/brillout/json-serializer/compare/v0.5.7...v0.5.8) (2023-11-02)


### Bug Fixes

* type re-export ([21c56c0](https://github.com/brillout/json-serializer/commit/21c56c04058f3096529366ad140b61231dcdabda))



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



