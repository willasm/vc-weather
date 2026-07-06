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

## [1.1.6] 2026-07-05
- Added: Much improved experience for new users
  - Added installation documentation in the [README.md](./README.md#installation)
  - New installations will not be fully enabled until `API key`, `Primary location`, and `Exclude folder` are defined in the settings
  - This will eliminate errors caused by trying to connect to Visual Crossing API without required settings
  - This will require an Obsidian restart after required settings are added
  - This will only affect new users to the plugin
- Added: More descriptive error messages output to console (for debugging purposes)
- Changed: Macros for daily notes now supports extended file names
  - Thanks to [heycalmdownr](https://github.com/heycalmdownr) for the PR
  - Examples `2024-03-20.md`, `2024-03-20-Wednesday.md`, `2024-03-20-daily.md`, `2024-03-20-notes.md`
- Changed: CSS for weather alerts on statusbar changed from yellow text to white text on red (easier to read)
- Changed: Minor text change to default statusbar template
- Fixed: Weather alert notices no longer displayed if disabled for statusbar
- Fixed: Weather alerts for locations 2-5 could be possibly be displayed when undefined
- Fixed: A few minor issues, typos, etc
- Updated: [README.md](./README.md#installation) documentation

For a full list of changes, please see the projects [Changelog](CHANGELOG.md) file.

I hope you enjoy using the Extension, and if you find any bugs, or would like to see a certain feature added, please feel free to contact me.

Enjoy! William
