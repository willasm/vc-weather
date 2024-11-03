<!--
### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security
### Updated
-->
# Release Notes

<!-- ## [v-inc] ${YEAR4}-${MONTHNUMBER}-${DATE} -->

## [0.2.4] 2024-11-03
- Added: `styles.css` to embed images used in settings and to make statusbar strings customizable
- Added: Author url in manifest.json
- Added: `testData.json` file for debugging without the need to connect to Visual Crossing API
- Changed: Many strings in the UI changed to sentence case for consistency
- Changed: Now using the moment library for date and time strings
- Changed: Settings headings to conform with Obsidians standards
- Changed: Now uses Obsidians requestUrl rather than fetch to retrieve the weather data
- Fixed: Statusbar active toggle setting was broken
- Fixed: Statusbar cycle toggle setting was broken
- Fixed: Files with multiple templates were not being expanded properly
  - Expansion of templates is now instant rather than the slight delay previously used
- Removed: Desktop only library calls to allow use on mobile (mobile has been re-enabled)
- Removed: Unnecessary items in the settings page
- Removed: Some unnecessary code duplication

For a full list of changes, please see the projects [Changelog](CHANGELOG.md) file.

I hope you enjoy using the Extension, and if you find any bugs, or would like to see a certain feature added, please feel free to contact me.

Enjoy! William
