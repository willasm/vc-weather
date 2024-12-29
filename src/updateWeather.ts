import { VCWSettings } from './settings';
import * as testData from './testData.json';
import { requestUrl } from 'obsidian';

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                           ● Class UpdateWeather ●                            │
//  │                                                                              │
//  │                   • Visual Crossing Weather Update Data •                    │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
export default class UpdateWeather {
  settings: VCWSettings;

  constructor() {

  }

  // • Fetch Current Weather Data from API • 
  async getDailyNoteWeather(
    apikey: string,
    fetch_location: string,
    notesDate: string,
    units: string,
    lang: string,) {
    //------------------------------------
    // Use Test Data
    // Avoids going over daily limit
    // Comment line below to get real data
    //------------------------------------
    //console.log("📢testData: \s", testData);
    //return testData;

    let returnData;
    // let dateMin = new Date().getMinutes().toString().padStart(2,"0");
    // let dateHour = new Date().getHours().toString().padStart(2,"0");
    // console.log("----------------------------------------------")
    // console.log(`Get Daily Note Weather: ${dateHour}:${dateMin}`)
    // console.log('fetch_location........:', fetch_location);
    // console.log('Request URL...........:', requestURL);
    // console.log('units.................:', units);

    await requestUrl({
      url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetch_location}/${notesDate}?unitGroup=${units}&lang=${lang}&key=${apikey}&include=current&contentType=json`,
      "method": "GET",
      "headers": {},
      }).then(response => {;
      if (response.status != 200) {
        throw response; //check the http response code and if isn't ok then throw the response as an error
      };

      return response.json; // Return the result as JSON

      }).then(response => {
        //response now contains parsed JSON ready for use
        returnData = response;
  
      }).catch((errorResponse) => {
        console.log(errorResponse);
        if (errorResponse.status == 400) {
          new Notification("VC Weather: [BAD_REQUEST] Your requests is invalid in some way (invalid dates, bad location parameter etc).")
        } else if (errorResponse.status == 401) {
          new Notification("VC Weather: [UNAUTHORIZED] Check if your API key is entered correctly.")
        } else if (errorResponse.status == 429) {
          new Notification("VC Weather: [TOO_MANY_REQUESTS] You have exceeded the maximum number of daily result records for your account.")
        } else if (errorResponse.status == 500) {
          new Notification("VC Weather: [INTERNAL_SERVER_ERROR] Visual Crossing servers returned an unexpected error.")
        };
        if (errorResponse.text) { //additional error information
          errorResponse.text().then( (errorMessage: any) => {
          //errorMessage now returns the response body which includes the full error message
          console.error(errorMessage);

        })
      } else {
        //no additional error information 
        console.error(errorResponse);
      } 
    });
    return returnData;
  };

  // • Fetch Current Weather Data from API • 
  async getWeather(
    delayTime: number,
    updateFrequency: string,
    apikey: string,
    fetch_location: string,
    units: string,
    lang: string,) {
    //------------------------------------
    // Use Test Data
    // Avoids going over daily limit
    // Comment line below to get real data
    //------------------------------------
    //console.log("📢testData: \s", testData);
    //return testData;

    let updFreNum = Number(updateFrequency);
    let returnData;
    if (delayTime === updFreNum || delayTime === 0) {
      // let dateMin = new Date().getMinutes().toString().padStart(2,"0");
      // let dateHour = new Date().getHours().toString().padStart(2,"0");
      // console.log("----------------------------------------------")
      // console.log(`Update Weather........: ${dateHour}:${dateMin}`)
      // console.log(`Get Weather Delay Time: ${delayTime} Minutes`);
      // console.log('fetch_location........:', fetch_location);
      // console.log('units.................:', units);


      await requestUrl({
        url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetch_location}?unitGroup=${units}&lang=${lang}&include=days%2Chours%2Calerts%2Ccurrent&key=${apikey}&contentType=json`,
        "method": "GET",
        "headers": {},
      }).then(response => {;
      if (response.status != 200) {
        throw response; //check the http response code and if isn't ok then throw the response as an error
      };

      return response.json;// Return the result as JSON

      }).then(response => {
        //response now contains parsed JSON ready for use
        returnData = response;
    
      }).catch((errorResponse) => {
        console.log(errorResponse);
        if (errorResponse.status == 400) {
          new Notification("VC Weather: [BAD_REQUEST] Your requests is invalid in some way (invalid dates, bad location parameter etc).")
        } else if (errorResponse.status == 401) {
          new Notification("VC Weather: [UNAUTHORIZED] Check if your API key is entered correctly.")
        } else if (errorResponse.status == 429) {
          new Notification("VC Weather: [TOO_MANY_REQUESTS] You have exceeded the maximum number of daily result records for your account.")
        } else if (errorResponse.status == 500) {
          new Notification("VC Weather: [INTERNAL_SERVER_ERROR] Visual Crossing servers returned an unexpected error.")
        }
        if (errorResponse.text) { //additional error information
        errorResponse.text().then( (errorMessage: any) => {
          //errorMessage now returns the response body which includes the full error message
          console.error(errorMessage);

        })
      } else {
        //no additional error information 
        console.error(errorResponse);
      };
      });      //     })
    };
    return returnData;
  };

  getAlerts(response: any) {
    return response.alerts;
  };

  // • Get Daily Notes Weather Data We Want • 
  processDailyWeatherData(response: any, units: string) {
    const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
    const directionsShort = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

    // precipitation
    let precipTypeSt = response.days[0].preciptype;
    if (precipTypeSt === null) {
      precipTypeSt = "none";
    } else {
      precipTypeSt = response.days[0].preciptype[0];
    };
    // wind speed
    let windSpeed = Math.round(response.days[0].windspeed);
    if (units === "metric") {
      windSpeed = Math.round(response.days[0].windspeed*0.27777778);
    } else {
      windSpeed = Math.round(response.days[0].windspeed*0.447);
    };
    // wind speed meters per second
    let windSpeedMS;
    if (units === "metric") {
      windSpeedMS = Math.round(response.days[0].windspeed*0.27777778);
    } else {
      windSpeedMS = Math.round(response.days[0].windspeed*0.447);
    };
  
    // Daily Notes Weather Data
    let weatherData = {
      "year1": window.moment(response.days[0].datetime).format('YYYY'),
      "year2": window.moment(response.days[0].datetime).format('YY'),
      "month1": window.moment(response.days[0].datetime).format('M'),
      "month2": window.moment(response.days[0].datetime).format('MM'),
      "month3": window.moment(response.days[0].datetime).format('MMM'),
      "month4": window.moment(response.days[0].datetime).format('MMMM'),
      "date1": window.moment(response.days[0].datetime).format('D'),
      "date2": window.moment(response.days[0].datetime).format('DD'),
      "dow1": window.moment(response.days[0].datetime).format('ddd'),
      "dow2": window.moment(response.days[0].datetime).format('dddd'),
      "datetime": response.days[0].datetime,
      "datetimeepoch": response.days[0].datetimeEpoch,
      "tempmax": Math.round(response.days[0].tempmax),
      "tempmin": Math.round(response.days[0].tempmin),
      "tempavg": Math.round(response.days[0].temp),
      "feelslikemax": Math.round(response.days[0].feelslikemax),
      "feelslikemin": Math.round(response.days[0].feelslikemin),
      "feelslikeavg": Math.round(response.days[0].feelslike),
      "temp": Math.round(response.days[0].temp),
      "feelslike": Math.round(response.days[0].temp),
      "humidity": Math.round(response.days[0].humidity)+'%',
      "dew": Math.round(response.days[0].dew),
      "precip": response.days[0].precip,
      "precipprob": Math.round(response.days[0].precipprob)+'%',
      "precipcover": Math.round(response.days[0].precipcover)+'%',
      "snow": response.days[0].snow,
      "snowdepth": response.days[0].snowdepth,
      "preciptype": precipTypeSt,
      "windgust": Math.round(response.days[0].windgust),
      "windspeed": Math.round(response.days[0].windspeed),
      "windspeedms": windSpeedMS,
      "winddirdeg": Math.round(response.days[0].winddir),
      "winddirstr": directions[Math.round(response.days[0].winddir / 45) % 8],
      "winddirstrshort": directionsShort[Math.round(response.days[0].winddir / 45) % 8],
      "pressure": response.days[0].pressure,
      "visibility": Math.round(response.days[0].visibility),
      "cloudcover": Math.round(response.days[0].cloudcover)+'%',
      "solarradiation": response.days[0].solarradiation,
      "solarenergy": response.days[0].solarenergy,
      "uvindex": Math.round(response.days[0].uvindex),
      "severerisk": Math.round(response.days[0].severerisk)+'%',
      "conditions": response.days[0].conditions,
      "description": response.days[0].description,
      "icon": response.days[0].icon,
      "iconurl": "https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/"+`${response.days[0].icon}`+".png?raw=true",
      "iconurlloc": "<img class="+`"${response.days[0].icon}"`+"/>",
      "sunrise": response.days[0].sunrise,
      "sunriseepoch": response.days[0].sunriseEpoch,
      "sunset": response.days[0].sunset,
      "sunsetepoch": response.days[0].sunsetEpoch,
      "moonphase": response.days[0].moonphase,
    };
    return weatherData;
  };

  // • Get Current Weather Data We Want • 
  processWeatherData(response: any, units: string) {
  
  let weatherDataArray = [];
  let dateArray = [];
  let datesDataArray = [];
  let precipsDataArray = [];
  let windDataArray = [];
  let windmsDataArray = [];
  const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];
  const directionsShort = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  for (let i = 0; i < 15; i++) {
    dateArray = [];
    let dateTime = response.days[i].datetime;
    dateArray.push(window.moment(dateTime).format('YYYY'));
    dateArray.push(window.moment(dateTime).format('YY'));
    dateArray.push(window.moment(dateTime).format('M'));
    dateArray.push(window.moment(dateTime).format('MM'));
    dateArray.push(window.moment(dateTime).format('MMM'));
    dateArray.push(window.moment(dateTime).format('MMMM'));
    dateArray.push(window.moment(dateTime).format('D'));
    dateArray.push(window.moment(dateTime).format('DD'));
    dateArray.push(window.moment(dateTime).format('ddd'));
    dateArray.push(window.moment(dateTime).format('dddd'));
    datesDataArray.push(dateArray);
    // precipitation
    let precipTypeSt = response.days[i].preciptype;
    if (precipTypeSt === null) {
      precipTypeSt = "none";
    } else {
      precipTypeSt = response.days[i].preciptype[0];
    };
    precipsDataArray.push(precipTypeSt);
    windDataArray.push(Math.round(response.days[i].windspeed));
    if (units === "metric") {
      windmsDataArray.push(Math.round(response.days[i].windspeed*0.27777778));
    } else {
      windmsDataArray.push(Math.round(response.days[i].windspeed*0.447));
    };
  };
  weatherDataArray.push(datesDataArray);
  weatherDataArray.push(precipsDataArray);
  weatherDataArray.push(windDataArray);
  weatherDataArray.push(windmsDataArray);

  const responseTime = response.currentConditions.datetime as string;

  let windSpeedmsCurrent;
  if (units === "metric") {
    windSpeedmsCurrent = Math.round(response.currentConditions.windspeed*0.27777778);
  } else {
    windSpeedmsCurrent = Math.round(response.currentConditions.windspeed*0.447);
  };

  let daysObj = [{}];
  for (let i = 0; i < 15; i++) {
    let dayData = {
      "year1": weatherDataArray[0][i][0],
      "year2": weatherDataArray[0][i][1],
      "month1": weatherDataArray[0][i][2],
      "month2": weatherDataArray[0][i][3],
      "month3": weatherDataArray[0][i][4],
      "month4": weatherDataArray[0][i][5],
      "date1": weatherDataArray[0][i][6],
      "date2": weatherDataArray[0][i][7],
      "dow1": weatherDataArray[0][i][8],
      "dow2": weatherDataArray[0][i][9],
      "datetime": response.days[i].datetime,
      "datetimeepoch": response.days[i].datetimeEpoch,
      "tempmax": Math.round(response.days[i].tempmax),
      "tempmin": Math.round(response.days[i].tempmin),
      "tempavg": Math.round(response.days[i].temp),
      "feelslikemax": Math.round(response.days[i].feelslikemax),
      "feelslikemin": Math.round(response.days[i].feelslikemin),
      "feelslikeavg": Math.round(response.days[i].feelslike),
      "dew": Math.round(response.days[i].dew),
      "humidity": Math.round(response.days[i].humidity)+'%',
      "precip": response.days[i].precip,
      "precipprob": Math.round(response.days[i].precipprob)+'%',
      "precipcover": Math.round(response.days[i].precipcover)+'%',
      "preciptype": weatherDataArray[1][i],
      "snow": response.days[i].snow,
      "snowdepth": response.days[i].snowdepth,
      "windgust": Math.round(response.days[i].windgust),
      "windspeed": weatherDataArray[2][i],
      "windspeedms": weatherDataArray[3][i],
      "winddirdeg": Math.round(response.days[i].winddir),
      "winddirstr": directions[Math.round(response.days[i].winddir / 45) % 8],
      "winddirstrshort": directionsShort[Math.round(response.days[i].winddir / 45) % 8],
      "pressure": response.days[i].pressure,
      "cloudcover": Math.round(response.days[i].cloudcover)+'%',
      "visibility": Math.round(response.days[i].visibility),
      "solarradiation": response.days[i].solarradiation,
      "solarenergy": response.days[i].solarenergy,
      "uvindex": Math.round(response.days[i].uvindex),
      "severerisk": Math.round(response.days[i].severerisk)+'%',
      "sunrise": response.days[i].sunrise,
      "sunriseepoch": response.days[i].sunriseEpoch,
      "sunset": response.days[i].sunset,
      "sunsetepoch": response.days[i].sunsetEpoch,
      "moonphase": response.days[i].moonphase,
      "conditions": response.days[i].conditions,
      "description": response.days[i].description,
      "icon": response.days[i].icon,
      "iconurl": "https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/"+`${response.days[i].icon}`+".png?raw=true",
      "iconurlloc": "<img class="+`"${response.days[i].icon}"`+"/>",
    }
  daysObj.push(dayData);
  };
  const index = 0//daysObj.indexOf(key, 0);
  if (index > -1) {
    daysObj.splice(index, 1);
  };
    
  let weatherData = {
    "LocationInfo": {
      "address": response.address,
      "resolvedaddress": response.resolvedAddress,
      "latitude": response.latitude,
      "longitude": response.longitude,
      "timezone": response.timezone,
      "tzoffset": response.tzoffset,
      "querycost": response.queryCost,
      "hours24": window.moment(responseTime, "HH:mm:ss").format('HH'),
      "hours12": window.moment(responseTime, "HH:mm:ss").format('h'),
      "mins": window.moment(responseTime, "HH:mm:ss").format('mm'),
      "sec": window.moment(responseTime, "HH:mm:ss").format('ss'),
      "ampm1": window.moment(responseTime, "HH:mm:ss").format('A'),
      "ampm2": window.moment(responseTime, "HH:mm:ss").format('a')
    },
    "Alerts": response.alerts,
    "CurrentWeather": {
      "datetime": response.currentConditions.datetime,
      "datetimeepoch": response.currentConditions.datetimeEpoch,
      "temp": Math.round(response.currentConditions.temp),
      "feelslike": Math.round(response.currentConditions.temp),
      "humidity": Math.round(response.currentConditions.humidity)+'%',
      "dew": Math.round(response.currentConditions.dew),
      "precip": response.currentConditions.precip,
      "precipprob": Math.round(response.currentConditions.precipprob)+'%',
      "snow": response.currentConditions.snow,
      "snowdepth": response.currentConditions.snowdepth,
      "preciptype": weatherDataArray[1][0],
      "windgust": Math.round(response.currentConditions.windgust),
      "windspeed": Math.round(response.currentConditions.windspeed),
      "windspeedms": windSpeedmsCurrent,
      "winddirdeg": Math.round(response.currentConditions.winddir),
      "winddirstr": directions[Math.round(response.currentConditions.winddir / 45) % 8],
      "winddirstrshort": directionsShort[Math.round(response.currentConditions.winddir / 45) % 8],
      "pressure": response.currentConditions.pressure,
      "visibility": Math.round(response.currentConditions.visibility),
      "cloudcover": Math.round(response.currentConditions.cloudcover)+'%',
      "solarradiation": response.currentConditions.solarradiation,
      "solarenergy": response.currentConditions.solarenergy,
      "uvindex": Math.round(response.currentConditions.uvindex),
      "conditions": response.currentConditions.conditions,
      "icon": response.currentConditions.icon,
      "iconurl": "https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/"+`${response.currentConditions.icon}`+".png?raw=true",
      "iconurlloc": "<img class="+`"${response.currentConditions.icon}"`+"/>",
      "sunrise": response.currentConditions.sunrise,
      "sunriseepoch": response.currentConditions.sunriseEpoch,
      "sunset": response.currentConditions.sunset,
      "sunsetepoch": response.currentConditions.sunsetEpoch,
      "moonphase": response.currentConditions.moonphase,
    },
    "WeatherToday": daysObj[0],
    "WeatherIn1Day": daysObj[1],
    "WeatherIn2Days": daysObj[2],
    "WeatherIn3Days": daysObj[3],
    "WeatherIn4Days": daysObj[4],
    "WeatherIn5Days": daysObj[5],
    "WeatherIn6Days": daysObj[6],
    "WeatherIn7Days": daysObj[7],
    "WeatherIn8Days": daysObj[8],
    "WeatherIn9Days": daysObj[9],
    "WeatherIn10Days": daysObj[10],
    "WeatherIn11Days": daysObj[11],
    "WeatherIn12Days": daysObj[12],
    "WeatherIn13Days": daysObj[13],
    "WeatherIn14Days": daysObj[14],
  };
  return weatherData;
  };
};
