# Change Log

<!-- ## [v-inc] ${YEAR4}-${MONTHNUMBER}-${DATE} -->

## [0.3.1] 2024-11-12
- Added: Wind direction string short version
- Removed: Some unnecessary duplicated code
- Updated: Documentation: `Macros.md`

## [0.3.0] 2024-11-10
- Fixed: Secondary exclude folder was not correcty saved to settings

## [0.2.9] 2024-11-10
- Added: Three new default weather templates
- Added: Screenshots for all default templates (see Weather Templates.md)
- Updated: All default templates
- Updated: Documentation - Weather Templates.md
- Updated: Documentation - README.md

## [0.2.8] 2024-11-07
- Updated: Statusbar styling improved
- Updated: README.md documentation with CSS information

## [0.2.7] 2024-11-06
- Changed: Display Current weather modal output improved
- Added: Display current weather modal screenshot in README.md
- Added: Command `View current weather information` to the command palette

## [0.2.6] 2024-11-05
- Changed: Weather icons now imbedded into css
  - No longer needs to download the icon from the internet
  - No delay to display the icon now
- Changed: Weather icons in todays current weather modal now have a background color
  - This should make them more visible with any theme

## [0.2.5] 2024-11-03
- Changed: Inserting template from command palette has been improved
  - It was inserting `%weather1%` to `%weather8%` and then waiting for the template expansion
  - Now inserts the fully formatted expanded template instead
  - The insertion is now instant without the slight delay

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

## [0.2.3] 2024-10-11
Fixed: Settings page would not display if core plugin templates folder was undefined

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
