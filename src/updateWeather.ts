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
  async getWeather(
    delayTime: number,
    updateFrequency: string,
    apikey: string,
    fetch_location: string,
    units: string,) {
      //------------------------------------
      // Use Test Data
      // Avoids going over daily limit
      // Comment line below to get real data
      //------------------------------------
      //console.log("📢testData: \s", testData);
      return testData;

      let updFreNum = Number(updateFrequency);
      let returnData;
      if (delayTime === updFreNum || delayTime === 0) {
        let dateMin = new Date().getMinutes().toString().padStart(2,"0");
        let dateHour = new Date().getHours().toString().padStart(2,"0");
        //console.log("----------------------------------------------")
        //console.log(`Update Weather........: ${dateHour}:${dateMin}`)
        //console.log(`Get Weather Delay Time: ${delayTime} Minutes`);
        //console.log('fetch_location........:', fetch_location);
        //console.log('units.................:', units);


        // await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetch_location}?unitGroup=${units}&include=days%2Chours%2Calerts%2Ccurrent&key=${apikey}&contentType=json`, {
        //   "method": "GET",
        //   "headers": {},
        // }).then(response => {
          await requestUrl({
            url: `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetch_location}?unitGroup=${units}&include=days%2Chours%2Calerts%2Ccurrent&key=${apikey}&contentType=json`,
            "method": "GET",
            "headers": {},
          }).then(response => {;
          if (response.status != 200) {
          throw response; //check the http response code and if isn't ok then throw the response as an error
        }

        return response.json;//(); //parse the result as JSON

        }).then(response => {
          //response now contains parsed JSON ready for use
          //returnData = this.processWeatherData(response);
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
        } 
      });      //     })
      }
      return returnData;
    }

    getAlerts(response: any) {
      return response.alerts;
    };

    processWeatherData(response: any, units: string) {
      
      // • Get Current Weather Data We Want • 
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
        }
      daysObj.push(dayData);
      }
      const index = 0//daysObj.indexOf(key, 0);
      if (index > -1) {
        daysObj.splice(index, 1);
      }
    
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
      }
    return weatherData;
    };
  };
