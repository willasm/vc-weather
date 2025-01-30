# Macro Definitions
These strings in your templates will be replaced with the relevant weather information. All macros are wrapped with the percent character, eg. %datetime% will be replaced with 20:45:00

#### Measurement Abreviations
- F - Fahrenheit
- C - Celcius
- mm - Millimeters
- cm - Centimeters
- mph - Miles Per Hour
- kph - Kilometers
- mb - Millibars
- W/m2 - Watt per square metre
- MJ/m2 - Millijoule per square metre
- Note: Unix times could be useful in scripts

> Please note that all available macros can be used in any of the templates. Even ones for different locations.
> 
> For example...
> 
> `%address%:` `%temp%°`, `%l2address%:` `%l2temp°%`, `%l3address%:` `l3%temp°%`
> 
>  would return...
> 
> `Edmonton: 28°, London: 30°, Chicago: 31°`

## Table of Contents
- [Daily Note Macros](#daily-note-macros)
- [Current weather](#current-weather)
- [Current Date and Time](#current-date-and-time)
- [Location Information](#location-information)
- [Todays Weather](#todays-weather)
- [Weather in 1 Day](#weather-in-1-day)
- [Weather in 2 Days](#weather-in-2-days)
- [Weather in 3 Days](#weather-in-3-days)
- [Weather in 4 Days](#weather-in-4-days)
- [Weather in 5 Days](#weather-in-5-days)
- [Weather in 6 Days](#weather-in-6-days)
- [Weather in 7 Days](#weather-in-7-days)
- [Weather in 8 Days](#weather-in-8-days)
- [Weather in 9 Days](#weather-in-9-days)
- [Weather in 10 Days](#weather-in-10-days)
- [Weather in 11 Days](#weather-in-11-days)
- [Weather in 12 Days](#weather-in-12-days)
- [Weather in 13 Days](#weather-in-13-days)
- [Weather in 14 Days](#weather-in-14-days)
- [Macros for Additional Locations](#macros-for-additional-locations)

## Daily Note Macros
| Macro                    | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| ------------------------ | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-daily%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-daily%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-daily%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-daily%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-daily%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-daily%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-daily%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-daily%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-daily%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-daily%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-daily%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-daily%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-daily%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-daily%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-daily%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-daily%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-daily%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-daily%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-daily%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-daily%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-daily%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-daily%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-daily%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-daily%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-daily%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-daily%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-daily%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-daily%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-daily%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-daily%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-daily%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-daily%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-daily%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-daily%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-daily%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-daily%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-daily%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-daily%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-daily%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-daily%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-daily%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-daily%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-daily%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-daily%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-daily%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-daily%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-daily%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-daily%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-daily%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-daily%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-daily%`     | A weather icon URL from local CSS      | A weather icon                    | -      | -        | -     |

## Current weather
| Macro               | Description                            | Replaced With Example | US     |  Metric  |  UK   |
| ------------------- | -------------------------------------- | --------------------- | :----: | :------: | :---: |
| `%datetime%`        | Expands to time of the weather data    | 20:45:00              | -      | -        | -     |
| `%datetimeepoch%`   | Unix timestamp for the datetime        | 1724726700            | -      | -        | -     |
| `%temp%`            | Current temperature                    | 30                    | F      | C        | C     |
| `%feelslike%`       | What the temperature feels like        | 35                    | F      | C        | C     |
| `%humidity%`        | Relative humidity                      | 40%                   | -      | -        | -     |
| `%dew%`             | Dew Point temperature                  | 12                    | F      | C        | C     |
| `%precip%`          | Precipitation                          | 2.5                   | inches | mm       | mm    |
| `%precipprob%`      | Precipitation chance                   | 80%                   | -      | -        | -     |
| `%snow%`            | Snow expected                          | 2.5                   | inches | cm       | cm    |
| `%snowdepth%`       | Snow depth                             | 2.5                   | inches | cm       | cm    |
| `%preciptype%`      | Precipitation type                     | rain                  | -      | -        | -     |
| `%windgust%`        | Wind gust                              | 15                    | mph    | kph      | mph   |
| `%windgustms%`      | Wind gust in meters per second         | 15                    | mph    | mps      | mph   |
| `%windspeed%`       | Wind speed                             | 10                    | mph    | kph      | mph   |
| `%windspeedms%`     | Wind speed in meters per second        | 2                     | -      | -        | -     |
| `%winddirdeg%`      | Wind direction in degrees              | 245                   | -      | -        | -     |
| `%winddirstr%`      | Wind direction as string               | northwest             | -      | -        | -     |
| `%winddirstrshort%` | Wind direction as short string         | N NW W SW S SE E NE   | -      | -        | -     |
| `%pressure%`        | Sea level air pressure                 | 1013.0                | mb     | mb       | mb    |
| `%visibility%`      | Visibility                             | 14                    | miles  | km       | miles |
| `%cloudcover%`      | Cloud cover percentage                 | 85%                   | %      | %        | %     |
| `%solarradiation%`  | Solar radiation                        | 38.0                  | W/m2   | W/m2     | W/m2  |
| `%solarenergy%`     | Solar energy                           | 0.1                   | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex%`         | UV index                               | 3                     | -      | -        | -     |
| `%conditions%`      | Description of the weather for the day | Partially cloudy      | -      | -        | -     |
| `%descemoji%`       | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ...   | -      | -        | -     |
| `%icon%`            | A weather icon name                    | partly-cloudy-night   | -      | -        | -     |
| `%iconurl%`         | A weather icon URL from Github         | Icon URL              | -      | -        | -     |
| `%iconurlloc%`      | A weather icon URL from local CSS      | <img class="snow"/>   | -      | -        | -     |
| `%sunrise%`         | Sunrise time                           | 06:33:45              | -      | -        | -     |
| `%sunriseepoch%`    | Sunrise Unix time                      | 1724675625            | -      | -        | -     |
| `%sunset%`          | Sunset time                            | 20:36:16              | -      | -        | -     |
| `%sunsetepoch%`     | Sunset Unix time                       | 1724726176            | -      | -        | -     |
| `%moonphase%`       | Moonphase                              | 0.75                  | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Current Date and Time (These represent Date and Time at the moment the templates are inserted into the document)
| Macro               | Description                            | Replaced With Example |
| ------------------- | -------------------------------------- | --------------------- |
| `%year1-now%`       | Expands to the current year long       | 2024                  |
| `%year2-now%`       | Expands to current year short          | 24                    |
| `%month1-now%`      | Expands to current month               | 1 - 12                |
| `%month2-now%`      | Expands to current month               | 01 - 12               |
| `%month3-now%`      | Expands to current month               | Jan                   |
| `%month4-now%`      | Expands to current month               | January               |
| `%date1-now%`       | Expands to current month               | 1 - 31                |
| `%date2-now%`       | Expands to current month               | 01 - 31               |
| `%dow1-now%`        | Expands to current day of the week     | Sun                   |
| `%dow2-now%`        | Expands to current day of the week     | Sunday                |
| `%hours24-now%`     | Current 24 hours                       | 00 to 23, 1:00am = 13 |
| `%hours12-now%`     | Current 12 hours                       | 12 hours format       |
| `%mins-now%`        | Current minutes                        | 00 - 59               |
| `%secs-now%`        | Current seconds                        | 00 - 59               |
| `%ampm1-now%`       | AM or PM for 12 hour time              | AM or PM              |
| `%ampm2-now%`       | am or pm for 12 hour time              | am or pm              |

## Location Information (Date and Times are for the most recent weather data recieved)
| Macro               | Description                            | Replaced With Example |
| ------------------- | -------------------------------------- | --------------------- |
| `%address%`         | The address you entered in settings    | Edmonton              |
| `%resolvedaddress%` | Resolved address returned by the API   | Edmonton, AB, Canada  |
| `%latitude%`        | Latitude of address                    | 53.5462               |
| `%longitude%`       | Longitude of address                   | -113.49               |
| `%timezone%`        | Timezone of address                    | America/Edmonton      |
| `%tzoffset%`        | Timezone offset                        | -6.0                  |
| `%querycost%`       | API Query cost for this request        | Should always be 1    |
| `%hours24%`         | Time of last weather update 24 hours   | 00 to 23, 1:00am = 13 |
| `%hours12%`         | Time of last weather update 12 hours   | 12 hours with am/pm   |
| `%mins%`            | Time of last weather update minutes    | 00 - 59               |
| `%secs%`            | Time of last weather update seconds    | 00 - 59               |
| `%ampm1%`           | AM or PM for 12 hour time              | AM or PM              |
| `%ampm2%`           | am or pm for 12 hour time              | am or pm              |

[Table of Contents](#table-of-contents)

## Todays Weather
| Macro                    | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| ------------------------ | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-today%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-today%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-today%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-today%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-today%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-today%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-today%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-today%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-today%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-today%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-today%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-today%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-today%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-today%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-today%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-today%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-today%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-today%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-today%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-today%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-today%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-today%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-today%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-today%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-today%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-today%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-today%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-today%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-today%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-today%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-today%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-today%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-today%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-today%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-today%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-today%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-today%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-today%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-today%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-today%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-today%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-today%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-today%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-today%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-today%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-today%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-today%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-today%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-today%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-today%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-today%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 1 Day
| Macro                     | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| ------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in1day%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in1day%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in1day%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in1day%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in1day%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in1day%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in1day%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in1day%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in1day%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in1day%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in1day%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in1day%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in1day%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in1day%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in1day%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in1day%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in1day%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in1day%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in1day%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in1day%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in1day%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in1day%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in1day%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in1day%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in1day%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in1day%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in1day%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in1day%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in1day%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in1day%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in1day%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in1day%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in1day%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in1day%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in1day%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in1day%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in1day%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in1day%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in1day%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in1day%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in1day%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in1day%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in1day%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in1day%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in1day%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in1day%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in1day%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in1day%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in1day%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in1day%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in1day%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 2 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in2days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in2days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in2days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in2days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in2days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in2days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in2days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in2days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in2days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in2days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in2days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in2days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in2days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in2days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in2days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in2days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in2days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in2days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in2days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in2days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in2days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in2days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in2days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in2days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in2days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in2days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in2days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in2days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in2days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in2days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in2days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in2days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in2days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in2days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in2days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in2days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in2days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in2days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in2days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in2days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in2days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in2days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in2days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in2days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in2days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in2days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in2days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in2days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in2days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in2days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in2days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 3 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in3days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in3days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in3days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in3days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in3days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in3days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in3days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in3days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in3days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in3days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in3days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in3days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in3days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in3days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in3days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in3days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in3days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in3days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in3days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in3days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in3days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in3days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in3days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in3days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in3days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in3days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in3days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in3days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in3days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in3days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in3days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in3days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in3days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in3days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in3days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in3days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in3days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in3days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in3days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in3days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in3days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in3days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in3days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in3days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in3days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in3days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in3days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in3days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in3days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in3days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in3days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 4 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in4days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in4days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in4days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in4days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in4days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in4days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in4days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in4days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in4days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in4days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in4days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in4days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in4days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in4days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in4days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in4days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in4days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in4days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in4days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in4days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in4days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in4days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in4days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in4days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in4days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in4days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in4days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in4days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in4days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in4days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in4days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in4days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in4days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in4days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in4days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in4days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in4days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in4days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in4days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in4days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in4days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in4days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in4days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in4days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in4days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in4days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in4days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in4days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in4days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in4days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in4days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 5 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in5days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in5days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in5days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in5days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in5days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in5days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in5days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in5days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in5days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in5days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in5days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in5days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in5days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in5days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in5days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in5days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in5days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in5days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in5days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in5days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in5days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in5days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in5days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in5days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in5days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in5days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in5days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in5days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in5days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in5days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in5days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in5days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in5days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in5days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in5days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in5days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in5days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in5days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in5days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in5days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in5days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in5days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in5days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in5days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in5days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in5days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in5days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in5days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in5days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in5days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in5days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 6 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in6days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in6days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in6days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in6days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in6days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in6days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in6days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in6days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in6days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in6days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in6days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in6days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in6days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in6days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in6days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in6days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in6days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in6days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in6days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in6days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in6days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in6days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in6days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in6days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in6days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in6days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in6days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in6days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in6days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in6days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in6days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in6days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in6days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in6days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in6days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in6days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in6days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in6days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in6days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in6days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in6days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in6days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in6days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in6days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in6days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in6days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in6days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in6days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in6days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in6days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in6days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 7 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in7days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in7days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in7days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in7days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in7days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in7days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in7days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in7days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in7days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in7days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in7days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in7days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in7days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in7days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in7days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in7days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in7days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in7days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in7days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in7days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in7days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in7days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in7days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in7days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in7days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in7days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in7days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in7days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in7days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in7days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in7days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in7days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in7days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in7days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in7days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in7days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in7days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in7days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in7days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in7days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in7days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in7days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in7days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in7days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in7days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in7days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in7days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in7days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in7days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in7days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in7days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 8 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in8days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in8days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in8days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in8days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in8days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in8days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in8days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in8days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in8days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in8days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in8days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in8days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in8days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in8days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in8days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in8days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in8days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in8days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in8days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in8days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in8days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in8days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in8days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in8days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in8days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in8days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in8days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in8days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in8days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in8days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in8days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in8days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in8days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in8days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in8days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in8days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in8days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in8days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in8days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in8days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in8days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in8days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in8days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in8days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in8days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in8days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in8days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in8days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in8days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in8days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in8days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 9 Days
| Macro                      | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| -------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in9days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in9days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in9days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in9days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in9days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in9days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in9days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in9days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in9days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in9days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in9days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in9days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in9days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in9days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in9days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in9days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in9days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in9days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in9days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in9days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in9days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in9days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in9days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in9days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in9days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in9days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in9days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in9days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in9days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in9days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in9days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in9days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in9days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in9days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in9days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in9days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in9days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in9days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in9days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in9days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in9days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in9days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in9days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in9days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in9days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in9days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in9days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in9days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in9days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in9days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in9days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 10 Days
| Macro                       | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| --------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in10days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in10days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in10days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in10days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in10days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in10days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in10days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in10days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in10days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in10days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in10days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in10days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in10days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in10days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in10days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in10days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in10days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in10days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in10days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in10days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in10days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in10days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in10days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in10days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in10days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in10days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in10days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in10days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in10days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in10days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in10days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in10days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in10days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in10days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in10days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in10days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in10days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in10days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in10days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in10days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in10days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in10days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in10days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in10days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in10days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in10days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in10days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in10days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in10days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in10days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in10days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 11 Days
| Macro                       | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| --------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in11days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in11days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in11days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in11days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in11days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in11days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in11days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in11days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in11days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in11days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in11days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in11days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in11days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in11days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in11days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in11days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in11days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in11days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in11days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in11days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in11days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in11days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in11days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in11days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in11days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in11days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in11days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in11days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in11days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in11days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in11days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in11days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in11days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in11days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in11days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in11days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in11days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in11days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in11days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in11days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in11days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in11days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in11days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in11days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in11days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in11days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in11days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in11days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in11days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in11days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in11days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 12 Days
| Macro                       | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| --------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in12days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in12days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in12days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in12days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in12days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in12days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in12days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in12days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in12days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in12days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in12days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in12days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in12days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in12days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in12days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in12days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in12days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in12days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in12days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in12days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in12days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in12days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in12days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in12days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in12days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in12days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in12days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in12days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in12days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in12days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in12days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in12days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in12days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in12days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in12days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in12days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in12days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in12days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in12days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in12days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in12days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in12days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in12days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in12days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in12days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in12days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in12days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in12days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in12days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in12days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in12days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 13 Days
| Macro                       | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| --------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in13days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in13days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in13days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in13days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in13days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in13days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in13days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in13days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in13days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in13days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in13days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in13days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in13days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in13days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in13days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in13days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in13days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in13days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in13days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in13days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in13days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in13days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in13days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in13days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in13days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in13days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in13days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in13days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in13days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in13days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in13days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in13days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in13days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in13days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in13days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in13days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in13days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in13days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in13days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in13days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in13days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in13days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in13days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in13days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in13days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in13days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in13days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in13days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in13days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in13days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in13days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Weather in 14 Days
| Macro                       | Description                            | Replaced With Example             | US     |  Metric  |  UK   |
| --------------------------- | -------------------------------------- | --------------------------------- | :----: | :------: | :---: |
| `%year1-in14days%`          | Expands to year of the weather data    | 2024                              | -      | -        | -     |
| `%year2-in14days%`          | Expands to year of the weather data    | 24                                | -      | -        | -     |
| `%month1-in14days%`         | Expands to month of the weather data   | 1 - 12                            | -      | -        | -     |
| `%month2-in14days%`         | Expands to month of the weather data   | 01 - 12                           | -      | -        | -     |
| `%month3-in14days%`         | Expands to month of the weather data   | Jan                               | -      | -        | -     |
| `%month4-in14days%`         | Expands to month of the weather data   | January                           | -      | -        | -     |
| `%date1-in14days%`          | Expands to month of the weather data   | 1 - 31                            | -      | -        | -     |
| `%date2-in14days%`          | Expands to month of the weather data   | 01 - 31                           | -      | -        | -     |
| `%dow1-in14days%`           | Expands to day of the week             | Sun                               | -      | -        | -     |
| `%dow2-in14days%`           | Expands to day of the week             | Sunday                            | -      | -        | -     |
| `%datetime-in14days%`       | Expands to time of the weather data    | 2024-08-29                        | -      | -        | -     |
| `%datetimeepoch-in14days%`  | Unix timestamp for the datetime        | 1724726700                        | -      | -        | -     |
| `%tempmax-in14days%`        | Maximum temperature for the day        | 32                                | F      | C        | C     |
| `%tempmin-in14days%`        | Minimum temperature for the day        | 22                                | F      | C        | C     |
| `%tempavg-in14days%`        | Average temperature for the day        | 27                                | F      | C        | C     |
| `%feelslikemax-in14days%`   | Maximum temperature feels like today   | 35                                | F      | C        | C     |
| `%feelslikemin-in14days%`   | Minimum temperature feels like today   | 22                                | F      | C        | C     |
| `%feelslikeavg-in14days%`   | Average temperature feels like today   | 27                                | F      | C        | C     |
| `%dew-in14days%`            | Dew Point temperature                  | 12                                | F      | C        | C     |
| `%humidity-in14days%`       | Relative humidity                      | 40%                               | -      | -        | -     |
| `%precip-in14days%`         | Precipitation                          | 2.5                               | inches | mm       | mm    |
| `%precipprob-in14days%`     | Precipitation chance                   | 80%                               | -      | -        | -     |
| `%precipcover-in14days%`    | % of time precip actually occured      | 21%                               | -      | -        | -     |
| `%preciptype-in14days%`     | Precipitation type                     | rain                              | -      | -        | -     |
| `%snow-in14days%`           | Snow expected                          | 2.5                               | inches | cm       | cm    |
| `%snowdepth-in14days%`      | Snow depth                             | 2.5                               | inches | cm       | cm    |
| `%windgust-in14days%`       | Wind gust                              | 15                                | mph    | kph      | mph   |
| `%windgustms-in14days%`     | Wind gust in meters per second         | 15                                | mph    | mps      | mph   |
| `%windspeed-in14days%`      | Wind speed                             | 10                                | mph    | kph      | mph   |
| `%windspeedms-in14days%`    | Wind speed in meters per second        | 2                                 | -      | -        | -     |
| `%winddirdeg-in14days%`     | Wind direction in degrees              | 245                               | -      | -        | -     |
| `%winddirstr-in14days%`     | Wind direction as string               | northwest                         | -      | -        | -     |
| `%winddirstrshort-in14days%`| Wind direction as short string         | N NW W SW S SE E NE               | -      | -        | -     |
| `%pressure-in14days%`       | Sea level air pressure                 | 1013.0                            | mb     | mb       | mb    |
| `%cloudcover-in14days%`     | Cloud cover percentage                 | 85%                               | %      | %        | %     |
| `%visibility-in14days%`     | Visibility                             | 14                                | miles  | km       | miles |
| `%solarradiation-in14days%` | Solar radiation                        | 38.0                              | W/m2   | W/m2     | W/m2  |
| `%solarenergy-in14days%`    | Solar energy                           | 0.1                               | MJ/m2  | MJ/m2    | MJ/m2 |
| `%uvindex-in14days%`        | UV index                               | 3                                 | -      | -        | -     |
| `%severerisk-in14days%`     | Severe risk percentage                 | 10%                               | -      | -        | -     |
| `%sunrise-in14days%`        | Sunrise time                           | 06:33:45                          | -      | -        | -     |
| `%sunriseepoch-in14days%`   | Sunrise Unix time                      | 1724675625                        | -      | -        | -     |
| `%sunset-in14days%`         | Sunset time                            | 20:36:16                          | -      | -        | -     |
| `%sunsetepoch-in14days%`    | Sunset Unix time                       | 1724726176                        | -      | -        | -     |
| `%moonphase-in14days%`      | Moonphase                              | 0.75                              | -      | -        | -     |
| `%conditions-in14days%`     | Short text about the weather           | Partially cloudy                  | -      | -        | -     |
| `%description-in14days%`    | Description of the weather for the day | Partly cloudy throughout the day. | -      | -        | -     |
| `%descemoji-in14days%`      | Emoji for Description of the weather   | 🌅 ❄️ 🌧️ 🌫️ 💨 ☁️ ⛅ 🌥 🔆 🌛       | -      | -        | -     |
| `%icon-in14days%`           | A weather icon name                    | partly-cloudy-night               | -      | -        | -     |
| `%iconurl-in14days%`        | A weather icon URL from Github         | Icon URL                          | -      | -        | -     |
| `%iconurlloc-in14days%`     | A weather icon URL from local CSS      | <img class="snow"/>               | -      | -        | -     |

[Table of Contents](#table-of-contents)

## Macros for Additional Locations
The macros for the 4 optional additional locations are the same as all the previous macros (less the current weather and current date and time) with just one minor change. You just need to prepend to the macros with...

- `l2` for the first additional location (short for location 2)
- `l3` for the second additional location (short for location 3)
- `l4` for the third additional location (short for location 4)
- `l5` for the fourth additional location (short for location 5)

For example, `%tempmax-today%` represents todays high for your primary location. `%l2tempmax-today%` would be todays high for your first additional location. `%address%` would be your cities name for your primary location and `%l3address%` would be the city name for your second additional location.

> Note that the current weather as well as the current date and time do not have l2 to l5 macro variants as they are not needed for any of the additional locations.

[Table of Contents](#table-of-contents)
