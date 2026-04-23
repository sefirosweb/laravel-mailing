# Changelog

All notable changes to `sefirosweb/laravel-mailing` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [12.0.3] - 2026-04-23

### Changed
- `MailingList::get($code)` → `get(string $code): array` — explicit parameter and return types.

## [12.0.2] - 2026-04-23

### Changed
- Enabled `declare(strict_types=1);` on every PHP file under `src/`. Tests (18/51) pass unchanged.
- The four migrations' `/** @return void */` docblocks on `up()` / `down()` methods have been replaced with the native `: void` return type.

## [12.0.1] - 2026-04-23

### Added
- Orchestra Testbench integration test suite covering `MailingListController` CRUD, user + group pivot attach / detach, `get_users`, `get_array_groups`, and `MailingGroupController` CRUD with DNS-backed email validation.
- `strict_types=1` declared on all test files.

### Changed
- `MailingGroupController::destroy`: renamed the local variable `$mailingList` → `$mailingGroup` to match the model being operated on (copy-paste bug from the original `MailingListController`). Fixed the accompanying `@param Sefirosweb\…\AccessList $accessList` docblocks that were referencing a class that doesn't exist in this package.
- Minor cleanup in `MailingListController`, `MailingList`, `MailingGroup` models and request validators.
- Rewritten `README.md` documenting the code-based resolver (`MailingList::get($code)`) and its environment-aware staging behaviour (non-production returns the `MAIL_LIST_STAGE_TO` address instead of real recipients).

## [12.0.0] - 2026-04-23

### Added
- Initial Laravel 12 release. Requires PHP `^8.2` and `laravel/framework ^12.0`.
- Orchestra Testbench baseline suite.

### Changed
- Migrated all package routes from the legacy `'Controller@method'` string syntax to the FQCN array form `[Controller::class, 'method']`.

### Removed
- Support for Laravel `< 12` on this branch. Older majors live on the `9.x` branch with their legacy tag lineage.
