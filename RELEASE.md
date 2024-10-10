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

## [0.2.2] 2024-10-10
- Removed: Update frequency every 5 minutes
  - Note: To all beta users if you have update frequency set to 5 minutes you need to change it
  - At 5 minutes having 4 or more locations will exceed your daily requests limit
- Added: Notifications are now sent for Visual Crossing errors
  - 400 [BAD_REQUEST] Your requests is invalid in some way (invalid dates, bad location parameter etc).
  - 401 [UNAUTHORIZED] Check if your API key is entered correctly.
  - 429 [TOO_MANY_REQUESTS] You have exceeded the maximum number of daily result records for your account.
  - 500 [INTERNAL_SERVER_ERROR] Visual Crossing servers returned an unexpected error.

For a full list of changes, please see the projects [Changelog](CHANGELOG.md) file.

I hope you enjoy using the Extension, and if you find any bugs, or would like to see a certain feature added, please feel free to contact me.

Enjoy! William
