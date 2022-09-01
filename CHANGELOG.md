# Changelog

## [0.5.0](https://github.com/brillout/json-s/compare/v0.4.5...v0.5.0) (2022-09-01)


### ⚠ BREAKING CHANGES

* Module `@brillout/json-s` doesn't exist anymore: load `@brillout/json-s/parse` and `@brillout/json-s/stringify` instead. (To reduce loaded KBs on the browser-side.)

### Features

* new option `sortObjectKeys` for stable hashing ([6579f21](https://github.com/brillout/json-s/commit/6579f214c731c1b1de8bbece05f01b5bcca34c4a))


### Performance Improvements

* forbid loading both `parse()` and `stringify()` at the same time ([8365764](https://github.com/brillout/json-s/commit/8365764bd377fb2b1048e0266c92cdae54070dde))
