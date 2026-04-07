# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.6] - 2026-04-07

### Added
- GTable: column sorting — set `sortable: true` on any header with a `field` to make it clickable; sort cycles through **none → asc → desc → none**; only one column can be active at a time
- GTable: client-side sorting sorts all items before pagination; items are compared numerically for numbers and case-insensitively for strings; `null`/`undefined` values sort to the start (asc) or end (desc)
- GTable: `sortChange` event emitted on every sort state change (both client-side and server-side mode); payload contains `{ field: string, direction: 'asc' | 'desc' | 'none' }`; in server-side mode the parent must handle this event to fetch the sorted page from the server
- GTable: sort change resets the active page to 1 automatically
- GTable: `sortable` is silently ignored for columns of `type: 'checkbox'` or `type: 'expandable'` and for render-only columns without a `field`
- GTableHeader: new optional `sortable` property (`boolean`, default `false`)
- GTable: `resetSort()` method exposed via `defineExpose` to programmatically reset sort state from the parent component
- GTable: `aria-sort` attribute added to sortable `<th>` elements (`none` / `ascending` / `descending`) for screen reader accessibility

## [0.3.5] - 2026-03-17

### Added
- GTable: server-side pagination mode — set the new `count` prop to the total number of server-side records to activate it; GTable will then render `items` as-is without internal slicing and use `count` to calculate the number of pages
- GTable: `pageChange` event emitted on page navigation when server-side mode is active; payload contains `{ page, offset, limit }`

### Fixed
- GTable: removed stray `import { start } from 'repl'`

## [0.3.4] - 2026-02-17

### Changed
- Build: Bootstrap is now externalized in the bundle to prevent duplicate runtime loading when the host application already includes Bootstrap

## [0.3.3] - 2026-02-16

### Changed
- Build: modernized Vite and TypeScript build configuration
- Build: simplified TypeScript declaration output structure
- Updated all dependencies

### Fixed
- GTable: corrected header checkbox event handling

## [0.3.2] - 2025-05-27

### Fixed
- Corrected `uuid` import — was incorrectly referencing the removed `uuidv4` named export; updated to use the current `uuid` package API

### Changed
- Updated dependencies

## [0.3.1] - 2025-03-11

### Changed
- Updated dependencies

## [0.3.0] - 2024-10-22

### Added
- GTable: optional "expand all / collapse all" toggle button in the header — set `expandableAll: true` on a header of `type: 'expandable'` to enable it
- GTable: `expandAll()` and `collapseAll()` methods exposed via `defineExpose` for programmatic control from the parent component

## [0.2.1] - 2024-09-26

### Changed
- GTable: expand event payload now includes the full row data object via the `item` property

## [0.2.0] - 2024-09-26

### Changed
- GTable: expandable rows slot prop renamed from `value` to `index` for clarity; row contents are now also accessible via the `item` slot prop

> **Note:** The slot prop rename (`value` → `index`) is a breaking change for existing usages of expandable row slots.

## [0.1.1] - 2024-09-24

### Changed
- Added documentation URL to `package.json`
- Added keywords to `package.json`
- Added `bootstrap-icons` as peer dependency
- Extended README description

## [0.1.0] - 2024-09-18

### Added
- Initial release
- **GTable** component: Bootstrap-integrated data table with client-side pagination, named slot support for custom cell rendering, checkbox columns (incl. header "select all" toggle), expandable rows with animated transitions, `showLoading` / `loading` / `showEmpty` props, and `tmplLoading` / `tmplEmpty` override slots
- **GSelect** component: scrollable list-based select with keyboard navigation, deselect support, and `v-model` binding; includes `normalizeKeys` helper
- **GToast** component: Bootstrap Toast wrapper with a Pinia-backed queue, configurable placement and max count; predefined style presets: `GToastSuccess`, `GToastDanger`, `GToastWarning`, `GToastInfo`
