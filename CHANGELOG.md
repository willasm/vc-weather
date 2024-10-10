# Change Log

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

## [0.2.1] 2024-09-29
- Removed: Mobile support (until I find valid code work around)
- Removed: All references to innerHTML as requested by Obsidian
- Added: Check for valid URL in weather alerts
- Updated: Default templates

## [0.2.0] 2024-09-22
- Added: Weather Alerts
- Added: Current Date and Time macros
- Fixed: Insert template modal will only show when in edit mode
- Updated: Default templates
- Updated: Documentation
- Many small enhancements made

## [0.1.4] 2024-09-16
- Fix: wrong templates being inserted

## [0.1.3] 2024-09-15
- Fix: corrections for submission

## [0.1.2] 2024-09-15
- Fix: corrections for submission

## [0.1.1] 2024-09-15
- Prepared plugin for submission

## [0.1.0] 2024-09-15
- Updated documentation
- Removed unused code

## [0.0.5] 2024-09-12
- Added mobile support

## [0.0.4] 2024-09-12
- Added display current weather modal

## [0.0.3] 2024-09-11
- Added dynamic weather with div's

## [0.0.2] 2024-09-10
- Added CHANGELOG.md and RELEASE.md files

## [0.0.1] 2024-09-09
- Initial release
