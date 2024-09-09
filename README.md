# Visual Crossing Weather

This is a replacement for my [OpenWeather](https://github.com/willasm/obsidian-open-weather) plugin. Open Weather has discontinued its version 2.5 API on which that plugin is based. They do have a 3.0 API, but that requires a credit card to subscribe to and a lot of people, myself included, are not willing to do that.

It is still a work in progress but is in a very usable in its current state with all the main features of my OpenWeather plugin included. I do plan to add new features which OpenWeather does not have.

This new plugin uses the [Visual Crossing](https://www.visualcrossing.com/) API with the following features...

- 50 years history
- 15-day forecast
- Current conditions
- Global coverage
- API & download
- Forum support
- Location geocoding
- Weather Alerts
- Astronomy data

You can get your [free API key here](https://www.visualcrossing.com/sign-up). It is free and does not require a credit card.

Overall it is much nicer to use over Open Weather. The forecast weather includes the full days data for all forecast days which Open Weather does not. Open Weather's 5 day forecast starts at the next 3 hour block of data, so day 1 and day 5 have only partial data for those days for all but one data block per day. It also has weather alerts, moon phase, and an active support forum. Another big feature is the data returned is hourly instead of in 3 hour blocks that Open Weather returns and the time of the data returned is set to the location of the requested data so no need to convert from GMT.

## Features of Visual Crossing Weather Plugin

- Get weather data from 5 locations (OpenWeather plugin only had 1)
- 8 User definable template string (OpenWeather plugin only had 4)
- Several thousand (3767 currently) macro text replacements with more to come
  - Once I start aadding the hourly data this number will increase substantialy
- Includes all core elements of my OpenWeather plugin, auto replace templates, etc.
- Has 2 status bar template strings which can be displayed alternating every 30 seconds
  - Default has todays weather info for the first one, tomorrows weather for the second
- Added an additional exclude folder, could be useful for your scripts folder
- Templates are now named. The first line is used as the name in the menus and is not included in the output of the template
- Many overall improvements to much of the code
- Many new features planned for the future