# Changelog

All notable changes to `sefirosweb/laravel-mailing` are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [Unreleased]

## [13.0.2] - 2026-05-09

### Added
- **Back-to-app** arrow in the top nav. Returns the user to the host's `/` so the package UI no longer feels like a dead-end embedded site.
- **Footer** with attribution and a link to the package repo on GitHub (`sefirosweb/laravel-mailing`).
- New `IconArrowLeft` and `IconBrandGithub` icons.
- Translations: `nav.backToApp`, `footer.builtBy`, `footer.viewSource` (ES + EN).

## [13.0.1] - 2026-05-09

This release pairs a complete rewrite of the bundled admin UI with backend hardening that removes the implicit dependency on `App\Models\User`. The package surface is unchanged for consumers calling `MailingList::get($code)` from PHP — upgrading is just `composer update` + republish of `mailing-assets`.

### Added
- **New admin UI** at `/mailgroups`. Rewritten on React 19 + TypeScript 5.7 + Vite 6 + TanStack Query 5 + i18next. The dependency on `react-bootstrap`, `@sefirosweb/react-crud`, `toastr`, `country-flag-icons` and `react-router-dom` is gone, the bundle is fully self-contained, and the design is mobile-responsive.
  - Self-hosted Geist + Geist Mono fonts (no CDN, no external network calls).
  - Hash routing (`/mailgroups/#lists`, `/mailgroups/#groups`) — deep-linkable tabs without a router dependency.
  - i18n with browser language detection + persisted user choice (ES / EN), with a manual switcher in the top nav.
  - Optimistic toggles with rollback for list↔user and list↔group attachments — the UI no longer flickers between "mutation done" and "refetch done".
  - Sort toggle (Name / Assigned) inside the relations drawers.
  - Per-row spinner during in-flight toggle mutations.
  - Debounced search (200 ms) on both Listas and Grupos listings.
  - Soft-delete UI: *Activos / Todos / Eliminados* segmented filter, "Eliminado" badge on trashed rows, and a Restore action backed by the existing toggling `DELETE` endpoint.
  - Keyboard accessibility on dialogs (`ConfirmModal`, `Drawer`): focus enters the dialog on open and is trapped via `Tab` / `Shift+Tab`; `Escape` closes; previous focus is restored on close.
- Three Playwright-captured screenshots under `docs/screenshots/` (lists, groups, list-users drawer).
- `'User'` key in `config/laravel-mailing.php` so hosts can swap out `App\Models\User` without forking the package.

### Changed
- **Eager loading on the lists endpoint**: `GET /mailgroups/mailing_list` now uses `withCount(['users', 'groups'])` so the bundled UI renders the per-row badges without follow-up requests (closes the N+1 the smoke test surfaced).
- `MailingListController::get_array_groups` now returns `to` alongside `id / value / name` so the picker can show the recipient address as the description.
- README rewritten — new screenshots of the bundled UI, documents the `User` config key, soft-delete UX, and the Sail-based dev workflow.

### Fixed
- `MailingListController` and `MailingList` model no longer hard-reference `App\Models\User`. Both now resolve the user model from `config('laravel-mailing.User', \App\Models\User::class)`. Hosts that don't publish the config still work because the default still points at `App\Models\User`. The pivot table name (`mailing_list_user`) is pinned explicitly so the existing migrations keep working regardless of the configured class name.

### Removed
- `react-bootstrap`, `bootstrap`, `@sefirosweb/react-crud`, `toastr`, `country-flag-icons`, `react-router-dom`, the legacy `docs/how_to.gif`, and the old Webpack/Mix-style `public/{css,js,mix-manifest.json}` artifacts. Asset publishing target (`public/vendor/laravel-mailing`) is unchanged — `php artisan vendor:publish --tag=mailing-assets --force` still works and overwrites cleanly.

## [13.0.0] - 2026-05-09

### Changed
- Bumped `laravel/framework` to `^13.0`, `php` to `^8.3`, `phpunit/phpunit` to `^12.0`, `orchestra/testbench` to `^11.0`. Branch policy: `13.x` is the new default, `12.x` frozen for fix-only.

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
