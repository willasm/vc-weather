//import { App, PluginSettingTab, Setting, TAbstractFile, TFolder, TextAreaComponent, Platform, FileSystemAdapter } from 'obsidian';
import { VCWSettings } from './settings';

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

        await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${fetch_location}?unitGroup=${units}&include=days%2Chours%2Calerts%2Ccurrent&key=${apikey}&contentType=json`, {
          "method": "GET",
          "headers": {},
        }).then(response => {
        if (!response.ok) {
          throw response; //check the http response code and if isn't ok then throw the response as an error
        }

        return response.json(); //parse the result as JSON

        }).then(response => {
          //response now contains parsed JSON ready for use
          //returnData = this.processWeatherData(response);
          returnData = response;
      
        }).catch((errorResponse) => {
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

    //   let event;
    //   let headline;
    //   let ends;
    //   let endsepoch;
    //   let onset
    //   let onsetepoch;
    //   let id;
    //   let language;
    //   let link;
    //   let description;

    //   console.log("📢response.alerts: ", response.alerts);
    //   if (response.alerts.length) {
    //     event = response.alerts[0].event;
    //     headline = response.alerts[0].headline;
    //     ends = response.alerts[0].ends;
    //     endsepoch = response.alerts[0].endsEpoch;
    //     onset = response.alerts[0].onset
    //     onsetepoch = response.alerts[0].onsetEpoch;
    //     id = response.alerts[0].id;
    //     language = response.alerts[0].language;
    //     link = response.alerts[0].link;
    //     description = response.alerts[0].description;
    //   } else {
    //     event = undefined;
    //     headline = undefined;
    //     ends = undefined;
    //     endsepoch = undefined;
    //     onset = undefined
    //     onsetepoch = undefined;
    //     id = undefined;
    //     language = undefined;
    //     link = undefined;
    //     description = undefined;
    //   };

    //   let alert = {
    //     "event": event,
    //     "headline": headline,
    //     "ends": ends,
    //     "endsepoch": endsepoch,
    //     "onset": onset,
    //     "onsetepoch": onsetepoch,
    //     "id": id,
    //     "language": language,
    //     "link": link,
    //     "description": description,
    //   }
      return response.alerts;

    };


    processWeatherData(response: any, units: string) {
      
      // • Get Current Weather Data We Want • 
      // Wind direction strings
      const directions = ['North', 'Northeast', 'East', 'Southeast', 'South', 'Southwest', 'West', 'Northwest'];

      // Date strings
      const dow1str = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
      const dow2str = ["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday"]
      const months1 = ["1","2","3","4","5","6","7","8","9","10","11","12"];
      const months2 = ["01","02","03","04","05","06","07","08","09","10","11","12"];
      const months3 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
      const months4 = ["January","February","March","April","May","June","July","August","September","October","November","December"];

      const responseDate = response.days[0].datetime;
      const forDate = responseDate.replace(/-/g,',');
      const d = new Date(forDate);
      const year1today = d.getFullYear().toString();
      const year2today = d.getFullYear().toString().slice(-2);
      const month1today = months1[d.getMonth()];
      const month2today = months2[d.getMonth()];
      const month3today = months3[d.getMonth()];
      const month4today = months4[d.getMonth()];
      const date1today = d.getDate().toString();
      const date2today = date1today.padStart(2,"0");
      const dowtoday = d.getDay();
      const dow1today = dow1str[dowtoday];
      const dow2today = dow2str[dowtoday];
      // Time for today
      // NOTE: Only need to get time once as we only get current time
      const responseTime = response.currentConditions.datetime as string;
      const hours24 = responseTime.slice(0,2);
      let hours24num = Number(hours24);
      let hours12;
      let hours12num;
      if (hours24num > 12) {
        hours12num = hours24num-12;
      } else {
        hours12num = hours24num;
      };
      if (hours12num == 0) {
        hours12num = 12;
      };
      hours12 = hours12num.toString();
      if (hours12[0] == '0') {
        hours12.slice(1);
      };
      const mins = responseTime.slice(3,5);
      const secs = responseTime.slice(6);
      let ampm1 = "AM";
      let ampm2 = "am";
      if (hours24num > 11) {
        ampm1 = "PM";
        ampm2 = "pm"
      };
      // Date for in 1 day
      const responseDatein1day = response.days[1].datetime;
      const forDatein1day = responseDatein1day.replace(/-/g,',');
      const d1 = new Date(forDatein1day);
      const year1in1day = d1.getFullYear().toString();
      const year2in1day = d1.getFullYear().toString().slice(-2);
      const month1in1day = months1[d1.getMonth()];
      const month2in1day = months2[d1.getMonth()];
      const month3in1day = months3[d1.getMonth()];
      const month4in1day = months4[d1.getMonth()];
      const date1in1day = d1.getDate().toString();
      const date2in1day = date1in1day.padStart(2,"0");
      const dowin1day = d1.getDay();
      const dow1in1day = dow1str[dowin1day];
      const dow2in1day = dow2str[dowin1day];

      // Date for in 2 days
      const responseDatein2days = response.days[2].datetime;
      const forDatein2days = responseDatein2days.replace(/-/g,',');
      const d2 = new Date(forDatein2days);
      const year1in2days = d2.getFullYear().toString();
      const year2in2days = d2.getFullYear().toString().slice(-2);
      const month1in2days = months1[d2.getMonth()];
      const month2in2days = months2[d2.getMonth()];
      const month3in2days = months3[d2.getMonth()];
      const month4in2days = months4[d2.getMonth()];
      const date1in2days = d2.getDate().toString();
      const date2in2days = date1in2days.padStart(2,"0");
      const dowin2days = d2.getDay();
      const dow1in2days = dow1str[dowin2days];
      const dow2in2days = dow2str[dowin2days];

      // Date for in 3 days
      const responseDatein3days = response.days[3].datetime;
      const forDatein3days = responseDatein3days.replace(/-/g,',');
      const d3 = new Date(forDatein3days);
      const year1in3days = d3.getFullYear().toString();
      const year2in3days = d3.getFullYear().toString().slice(-2);
      const month1in3days = months1[d3.getMonth()];
      const month2in3days = months2[d3.getMonth()];
      const month3in3days = months3[d3.getMonth()];
      const month4in3days = months4[d3.getMonth()];
      const date1in3days = d3.getDate().toString();
      const date2in3days = date1in3days.padStart(2,"0");
      const dowin3days = d3.getDay();
      const dow1in3days = dow1str[dowin3days];
      const dow2in3days = dow2str[dowin3days];

      // Date for in 4 days
      const responseDatein4days = response.days[4].datetime;
      const forDatein4days = responseDatein4days.replace(/-/g,',');
      const d4 = new Date(forDatein4days);
      const year1in4days = d4.getFullYear().toString();
      const year2in4days = d4.getFullYear().toString().slice(-2);
      const month1in4days = months1[d4.getMonth()];
      const month2in4days = months2[d4.getMonth()];
      const month3in4days = months3[d4.getMonth()];
      const month4in4days = months4[d4.getMonth()];
      const date1in4days = d4.getDate().toString();
      const date2in4days = date1in4days.padStart(2,"0");
      const dowin4days = d4.getDay();
      const dow1in4days = dow1str[dowin4days];
      const dow2in4days = dow2str[dowin4days];

      // Date for in 5 days
      const responseDatein5days = response.days[5].datetime;
      const forDatein5days = responseDatein5days.replace(/-/g,',');
      const d5 = new Date(forDatein5days);
      const year1in5days = d5.getFullYear().toString();
      const year2in5days = d5.getFullYear().toString().slice(-2);
      const month1in5days = months1[d5.getMonth()];
      const month2in5days = months2[d5.getMonth()];
      const month3in5days = months3[d5.getMonth()];
      const month4in5days = months4[d5.getMonth()];
      const date1in5days = d5.getDate().toString();
      const date2in5days = date1in5days.padStart(2,"0");
      const dowin5days = d5.getDay();
      const dow1in5days = dow1str[dowin5days];
      const dow2in5days = dow2str[dowin5days];

      // Date for in 6 days
      const responseDatein6days = response.days[6].datetime;
      const forDatein6days = responseDatein6days.replace(/-/g,',');
      const d6 = new Date(forDatein6days);
      const year1in6days = d6.getFullYear().toString();
      const year2in6days = d6.getFullYear().toString().slice(-2);
      const month1in6days = months1[d6.getMonth()];
      const month2in6days = months2[d6.getMonth()];
      const month3in6days = months3[d6.getMonth()];
      const month4in6days = months4[d6.getMonth()];
      const date1in6days = d6.getDate().toString();
      const date2in6days = date1in6days.padStart(2,"0");
      const dowin6days = d6.getDay();
      const dow1in6days = dow1str[dowin6days];
      const dow2in6days = dow2str[dowin6days];

      // Date for in 7 days
      const responseDatein7days = response.days[7].datetime;
      const forDatein7days = responseDatein7days.replace(/-/g,',');
      const d7 = new Date(forDatein7days);
      const year1in7days = d7.getFullYear().toString();
      const year2in7days = d7.getFullYear().toString().slice(-2);
      const month1in7days = months1[d7.getMonth()];
      const month2in7days = months2[d7.getMonth()];
      const month3in7days = months3[d7.getMonth()];
      const month4in7days = months4[d7.getMonth()];
      const date1in7days = d7.getDate().toString();
      const date2in7days = date1in7days.padStart(2,"0");
      const dowin7days = d7.getDay();
      const dow1in7days = dow1str[dowin7days];
      const dow2in7days = dow2str[dowin7days];

      // Date for in 8 days
      const responseDatein8days = response.days[8].datetime;
      const forDatein8days = responseDatein8days.replace(/-/g,',');
      const d8 = new Date(forDatein8days);
      const year1in8days = d8.getFullYear().toString();
      const year2in8days = d8.getFullYear().toString().slice(-2);
      const month1in8days = months1[d8.getMonth()];
      const month2in8days = months2[d8.getMonth()];
      const month3in8days = months3[d8.getMonth()];
      const month4in8days = months4[d8.getMonth()];
      const date1in8days = d8.getDate().toString();
      const date2in8days = date1in8days.padStart(2,"0");
      const dowin8days = d8.getDay();
      const dow1in8days = dow1str[dowin8days];
      const dow2in8days = dow2str[dowin8days];

      // Date for in 9 days
      const responseDatein9days = response.days[9].datetime;
      const forDatein9days = responseDatein9days.replace(/-/g,',');
      const d9 = new Date(forDatein9days);
      const year1in9days = d9.getFullYear().toString();
      const year2in9days = d9.getFullYear().toString().slice(-2);
      const month1in9days = months1[d9.getMonth()];
      const month2in9days = months2[d9.getMonth()];
      const month3in9days = months3[d9.getMonth()];
      const month4in9days = months4[d9.getMonth()];
      const date1in9days = d9.getDate().toString();
      const date2in9days = date1in9days.padStart(2,"0");
      const dowin9days = d9.getDay();
      const dow1in9days = dow1str[dowin9days];
      const dow2in9days = dow2str[dowin9days];

      // Date for in 10 days
      const responseDatein10days = response.days[10].datetime;
      const forDatein10days = responseDatein10days.replace(/-/g,',');
      const d10 = new Date(forDatein10days);
      const year1in10days = d10.getFullYear().toString();
      const year2in10days = d10.getFullYear().toString().slice(-2);
      const month1in10days = months1[d10.getMonth()];
      const month2in10days = months2[d10.getMonth()];
      const month3in10days = months3[d10.getMonth()];
      const month4in10days = months4[d10.getMonth()];
      const date1in10days = d10.getDate().toString();
      const date2in10days = date1in10days.padStart(2,"0");
      const dowin10days = d10.getDay();
      const dow1in10days = dow1str[dowin10days];
      const dow2in10days = dow2str[dowin10days];

      // Date for in 11 days
      const responseDatein11days = response.days[11].datetime;
      const forDatein11days = responseDatein11days.replace(/-/g,',');
      const d11 = new Date(forDatein11days);
      const year1in11days = d11.getFullYear().toString();
      const year2in11days = d11.getFullYear().toString().slice(-2);
      const month1in11days = months1[d11.getMonth()];
      const month2in11days = months2[d11.getMonth()];
      const month3in11days = months3[d11.getMonth()];
      const month4in11days = months4[d11.getMonth()];
      const date1in11days = d11.getDate().toString();
      const date2in11days = date1in11days.padStart(2,"0");
      const dowin11days = d11.getDay();
      const dow1in11days = dow1str[dowin11days];
      const dow2in11days = dow2str[dowin11days];

      // Date for in 12 days
      const responseDatein12days = response.days[12].datetime;
      const forDatein12days = responseDatein12days.replace(/-/g,',');
      const d12 = new Date(forDatein12days);
      const year1in12days = d12.getFullYear().toString();
      const year2in12days = d12.getFullYear().toString().slice(-2);
      const month1in12days = months1[d12.getMonth()];
      const month2in12days = months2[d12.getMonth()];
      const month3in12days = months3[d12.getMonth()];
      const month4in12days = months4[d12.getMonth()];
      const date1in12days = d12.getDate().toString();
      const date2in12days = date1in12days.padStart(2,"0");
      const dowin12days = d12.getDay();
      const dow1in12days = dow1str[dowin12days];
      const dow2in12days = dow2str[dowin12days];

      // Date for in 13 days
      const responseDatein13days = response.days[13].datetime;
      const forDatein13days = responseDatein13days.replace(/-/g,',');
      const d13 = new Date(forDatein13days);
      const year1in13days = d13.getFullYear().toString();
      const year2in13days = d13.getFullYear().toString().slice(-2);
      const month1in13days = months1[d13.getMonth()];
      const month2in13days = months2[d13.getMonth()];
      const month3in13days = months3[d13.getMonth()];
      const month4in13days = months4[d13.getMonth()];
      const date1in13days = d13.getDate().toString();
      const date2in13days = date1in13days.padStart(2,"0");
      const dowin13days = d13.getDay();
      const dow1in13days = dow1str[dowin13days];
      const dow2in13days = dow2str[dowin13days];

      // Date for in 14 days
      const responseDatein14days = response.days[14].datetime;
      const forDatein14days = responseDatein14days.replace(/-/g,',');
      const d14 = new Date(forDatein14days);
      const year1in14days = d14.getFullYear().toString();
      const year2in14days = d14.getFullYear().toString().slice(-2);
      const month1in14days = months1[d14.getMonth()];
      const month2in14days = months2[d14.getMonth()];
      const month3in14days = months3[d14.getMonth()];
      const month4in14days = months4[d14.getMonth()];
      const date1in14days = d14.getDate().toString();
      const date2in14days = date1in14days.padStart(2,"0");
      const dowin14days = d14.getDay();
      const dow1in14days = dow1str[dowin14days];
      const dow2in14days = dow2str[dowin14days];

      // Configure precipitation to show 'none' instaed of null
      let precipTypeNow;
      let precipTypeToday;
      let precipTypeIn1Day;
      let precipTypeIn2Days;
      let precipTypeIn3Days;
      let precipTypeIn4Days;
      let precipTypeIn5Days;
      let precipTypeIn6Days;
      let precipTypeIn7Days;
      let precipTypeIn8Days;
      let precipTypeIn9Days;
      let precipTypeIn10Days;
      let precipTypeIn11Days;
      let precipTypeIn12Days;
      let precipTypeIn13Days;
      let precipTypeIn14Days;
      let precipType;
      precipType = response.currentConditions.preciptype;
      if (precipType === null) {
        precipTypeNow = "none";
      } else {
        precipTypeNow = precipType[0];         // TODO: Should concatenate all strings
      };
      precipType = response.days[0].preciptype;
      if (precipType === null) {
        precipTypeToday = "none";
      } else {
        precipTypeToday = precipType[0];   // TODO: Should concatenate all strings
      };
      precipType = response.days[1].preciptype;
      if (precipType === null) {
        precipTypeIn1Day = "none";
      } else {
        precipTypeIn1Day = precipType[0];       // TODO: Should concatenate all strings
      };
      precipType = response.days[2].preciptype;
      if (precipType === null) {
        precipTypeIn2Days = "none";
      } else {
        precipTypeIn2Days = precipType[0];    // TODO: Should concatenate all strings
      };
      precipType = response.days[3].preciptype;
      if (precipType === null) {
        precipTypeIn3Days = "none";
      } else {
        precipTypeIn3Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[4].preciptype;
      if (precipType === null) {
        precipTypeIn4Days = "none";
      } else {
        precipTypeIn4Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[5].preciptype;
      if (precipType === null) {
        precipTypeIn5Days = "none";
      } else {
        precipTypeIn5Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[6].preciptype;
      if (precipType === null) {
        precipTypeIn6Days = "none";
      } else {
        precipTypeIn6Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[7].preciptype;
      if (precipType === null) {
        precipTypeIn7Days = "none";
      } else {
        precipTypeIn7Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[8].preciptype;
      if (precipType === null) {
        precipTypeIn8Days = "none";
      } else {
        precipTypeIn8Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[9].preciptype;
      if (precipType === null) {
        precipTypeIn9Days = "none";
      } else {
        precipTypeIn9Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[10].preciptype;
      if (precipType === null) {
        precipTypeIn10Days = "none";
      } else {
        precipTypeIn10Days = precipType[0];     // TODO: Should concatenate all strings
      };
      precipType = response.days[11].preciptype;
      if (precipType === null) {
        precipTypeIn11Days = "none";
      } else {
        precipTypeIn11Days = precipType[0];    // TODO: Should concatenate all strings
      };
      precipType = response.days[12].preciptype;
      if (precipType === null) {
        precipTypeIn12Days = "none";
      } else {
        precipTypeIn12Days = precipType[0];    // TODO: Should concatenate all strings
      };
      precipType = response.days[13].preciptype;
      if (precipType === null) {
        precipTypeIn13Days = "none";
      } else {
        precipTypeIn13Days = precipType[0];    // TODO: Should concatenate all strings
      };
      precipType = response.days[14].preciptype;
      if (precipType === null) {
        precipTypeIn14Days = "none";
      } else {
        precipTypeIn14Days = precipType[0];    // TODO: Should concatenate all strings
      };

      // Include wind speed in meters per second
      let windspeedms = 0;
      let windspeedmstoday = 0;
      let windspeedmsin1day = 0;
      let windspeedmsin2days = 0;
      let windspeedmsin3days = 0;
      let windspeedmsin4days = 0;
      let windspeedmsin5days = 0;
      let windspeedmsin6days = 0;
      let windspeedmsin7days = 0;
      let windspeedmsin8days = 0;
      let windspeedmsin9days = 0;
      let windspeedmsin10days = 0;
      let windspeedmsin11days = 0;
      let windspeedmsin12days = 0;
      let windspeedmsin13days = 0;
      let windspeedmsin14days = 0;
      if (units === "metric") {
        windspeedms = Math.round(response.currentConditions.windspeed*3.6);
        windspeedmstoday = Math.round(response.days[0].windspeed*3.6);
        windspeedmsin1day = Math.round(response.days[1].windspeed*3.6);
        windspeedmsin2days = Math.round(response.days[2].windspeed*3.6);
        windspeedmsin3days = Math.round(response.days[3].windspeed*3.6);
        windspeedmsin4days = Math.round(response.days[4].windspeed*3.6);
        windspeedmsin5days = Math.round(response.days[5].windspeed*3.6);
        windspeedmsin6days = Math.round(response.days[6].windspeed*3.6);
        windspeedmsin7days = Math.round(response.days[7].windspeed*3.6);
        windspeedmsin8days = Math.round(response.days[8].windspeed*3.6);
        windspeedmsin9days = Math.round(response.days[9].windspeed*3.6);
        windspeedmsin10days = Math.round(response.days[10].windspeed*3.6);
        windspeedmsin11days = Math.round(response.days[11].windspeed*3.6);
        windspeedmsin12days = Math.round(response.days[12].windspeed*3.6);
        windspeedmsin13days = Math.round(response.days[13].windspeed*3.6);
        windspeedmsin14days = Math.round(response.days[14].windspeed*3.6);
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
          "hours24": hours24,
          "hours12": hours12,
          "mins": mins,
          "sec": secs,
          "ampm1": ampm1,
          "ampm2": ampm2,
        },
        "Alerts": response.alerts,
        // "Alerts": {
        //   "event": event,
        //   "headline": headline,
        //   "ends": ends,
        //   "endsepoch": endsepoch,
        //   "onset": onset,
        //   "onsetepoch": onsetepoch,
        //   "id": id,
        //   "language": language,
        //   "link": link,
        //   "description": description,
        // },
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
          "preciptype": precipTypeNow, // NULL if none, Array of strings otherwise
          "windgust": Math.round(response.currentConditions.windgust),
          "windspeed": Math.round(response.currentConditions.windspeed),
          "windspeedms": windspeedms,
          "winddirdeg": Math.round(response.currentConditions.winddir),
          "winddirstr": directions[Math.round(response.currentConditions.winddir / 45) % 8],
          "pressure": response.currentConditions.pressure,
          "visibility": Math.round(response.currentConditions.visibility),
          "cloudcover": Math.round(response.currentConditions.cloudcover)+'%',
          "solarradiation": response.currentConditions.solarradiation,
          "solarenergy": response.currentConditions.solarenergy,
          "uvindex": Math.round(response.currentConditions.uvindex),
          "conditions": response.currentConditions.conditions,
          "icon": response.currentConditions.icon,
          "iconurl": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.currentConditions.icon}`+'.png?raw=true"',
          "sunrise": response.currentConditions.sunrise,
          "sunriseepoch": response.currentConditions.sunriseEpoch,
          "sunset": response.currentConditions.sunset,
          "sunsetepoch": response.currentConditions.sunsetEpoch,
          "moonphase": response.currentConditions.moonphase,
        },
        "WeatherToday": {
          "year1today": year1today,
          "year2today": year2today,
          "month1today": month1today,
          "month2today": month2today,
          "month3today": month3today,
          "month4today": month4today,
          "date1today": date1today,
          "date2today": date2today,
          "dow1today": dow1today,
          "dow2today": dow2today,
          "datetimetoday": response.days[0].datetime,
          "datetimeepochtoday": response.days[0].datetimeEpoch,
          "tempmaxtoday": Math.round(response.days[0].tempmax),
          "tempmintoday": Math.round(response.days[0].tempmin),
          "tempavgtoday": Math.round(response.days[0].temp),
          "feelslikemaxtoday": Math.round(response.days[0].feelslikemax),
          "feelslikemintoday": Math.round(response.days[0].feelslikemin),
          "feelslikeavgtoday": Math.round(response.days[0].feelslike),
          "dewtoday": Math.round(response.days[0].dew),
          "humiditytoday": Math.round(response.days[0].humidity)+'%',
          "preciptoday": response.days[0].precip,
          "precipprobtoday": Math.round(response.days[0].precipprob)+'%',
          "precipcovertoday": Math.round(response.days[0].precipcover)+'%',
          "preciptypetoday": precipTypeToday,
          "snowtoday": response.days[0].snow,
          "snowdepthtoday": response.days[0].snowdepth,
          "windgusttoday": Math.round(response.days[0].windgust),
          "windspeedtoday": Math.round(response.days[0].windspeed),
          "windspeedmstoday": windspeedmstoday,
          "winddirdegtoday": Math.round(response.days[0].winddir),
          "winddirstrtoday": directions[Math.round(response.days[0].winddir / 45) % 8],
          "pressuretoday": response.days[0].pressure,
          "cloudcovertoday": Math.round(response.days[0].cloudcover)+'%',
          "visibilitytoday": Math.round(response.days[0].visibility),
          "solarradiationtoday": response.days[0].solarradiation,
          "solarenergytoday": response.days[0].solarenergy,
          "uvindextoday": Math.round(response.days[0].uvindex),
          "severerisktoday": Math.round(response.days[0].severerisk)+'%',
          "sunrisetoday": response.days[0].sunrise,
          "sunriseepochtoday": response.days[0].sunriseEpoch,
          "sunsettoday": response.days[0].sunset,
          "sunsetepochtoday": response.days[0].sunsetEpoch,
          "moonphasetoday": response.days[0].moonphase,
          "conditionstoday": response.days[0].conditions,
          "descriptiontoday": response.days[0].description,
          "icontoday": response.days[0].icon,
          "iconurltoday": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[0].icon}`+'.png?raw=true"',

        },
        "WeatherIn1Day": {
          "year1in1day": year1in1day,
          "year2in1day": year2in1day,
          "month1in1day": month1in1day,
          "month2in1day": month2in1day,
          "month3in1day": month3in1day,
          "month4in1day": month4in1day,
          "date1in1day": date1in1day,
          "date2in1day": date2in1day,
          "dow1in1day": dow1in1day,
          "dow2in1day": dow2in1day,
          "datetimein1day": response.days[1].datetime,
          "datetimeepochin1day": response.days[1].datetimeEpoch,
          "tempmaxin1day": Math.round(response.days[1].tempmax),
          "tempminin1day": Math.round(response.days[1].tempmin),
          "tempavgin1day": Math.round(response.days[1].temp),
          "feelslikemaxin1day": Math.round(response.days[1].feelslikemax),
          "feelslikeminin1day": Math.round(response.days[1].feelslikemin),
          "feelslikeavgin1day": Math.round(response.days[1].feelslike),
          "dewin1day": Math.round(response.days[1].dew),
          "humidityin1day": Math.round(response.days[1].humidity)+'%',
          "precipin1day": response.days[1].precip,
          "precipprobin1day": Math.round(response.days[1].precipprob)+'%',
          "precipcoverin1day": Math.round(response.days[1].precipcover)+'%',
          "preciptypein1day": precipTypeIn1Day,
          "snowin1day": response.days[1].snow,
          "snowdepthin1day": response.days[1].snowdepth,
          "windgustin1day": Math.round(response.days[1].windgust),
          "windspeedin1day": Math.round(response.days[1].windspeed),
          "windspeedmsin1day": windspeedmsin1day,
          "winddirdegin1day": Math.round(response.days[1].winddir),
          "winddirstrin1day": directions[Math.round(response.days[1].winddir / 45) % 8],
          "pressurein1day": response.days[1].pressure,
          "cloudcoverin1day": Math.round(response.days[1].cloudcover)+'%',
          "visibilityin1day": Math.round(response.days[1].visibility),
          "solarradiationin1day": response.days[1].solarradiation,
          "solarenergyin1day": response.days[1].solarenergy,
          "uvindexin1day": Math.round(response.days[1].uvindex),
          "severeriskin1day": Math.round(response.days[1].severerisk)+'%',
          "sunrisein1day": response.days[1].sunrise,
          "sunriseepochin1day": response.days[1].sunriseEpoch,
          "sunsetin1day": response.days[1].sunset,
          "sunsetepochin1day": response.days[1].sunsetEpoch,
          "moonphasein1day": response.days[1].moonphase,
          "conditionsin1day": response.days[1].conditions,
          "descriptionin1day": response.days[1].description,
          "iconin1day": response.days[1].icon,
          "iconurlin1day": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[1].icon}`+'.png?raw=true"',
          },
        "WeatherIn2Days": {
          "year1in2days": year1in2days,
          "year2in2days": year2in2days,
          "month1in2days": month1in2days,
          "month2in2days": month2in2days,
          "month3in2days": month3in2days,
          "month4in2days": month4in2days,
          "date1in2days": date1in2days,
          "date2in2days": date2in2days,
          "dow1in2days": dow1in2days,
          "dow2in2days": dow2in2days,
          "datetimein2days": response.days[2].datetime,
          "datetimeepochin2days": response.days[2].datetimeEpoch,
          "tempmaxin2days": Math.round(response.days[2].tempmax),
          "tempminin2days": Math.round(response.days[2].tempmin),
          "tempavgin2days": Math.round(response.days[2].temp),
          "feelslikemaxin2days": Math.round(response.days[2].feelslikemax),
          "feelslikeminin2days": Math.round(response.days[2].feelslikemin),
          "feelslikeavgin2days": Math.round(response.days[2].feelslike),
          "dewin2days": Math.round(response.days[2].dew),
          "humidityin2days": Math.round(response.days[2].humidity)+'%',
          "precipin2days": response.days[2].precip,
          "precipprobin2days": Math.round(response.days[2].precipprob)+'%',
          "precipcoverin2days": Math.round(response.days[2].precipcover)+'%',
          "preciptypein2days": precipTypeIn2Days,
          "snowin2days": response.days[2].snow,
          "snowdepthin2days": response.days[2].snowdepth,
          "windgustin2days": Math.round(response.days[2].windgust),
          "windspeedin2days": Math.round(response.days[2].windspeed),
          "windspeedmsin2days": windspeedmsin2days,
          "winddirdegin2days": Math.round(response.days[2].winddir),
          "winddirstrin2days": directions[Math.round(response.days[2].winddir / 45) % 8],
          "pressurein2days": response.days[2].pressure,
          "cloudcoverin2days": Math.round(response.days[2].cloudcover)+'%',
          "visibilityin2days": Math.round(response.days[2].visibility),
          "solarradiationin2days": response.days[2].solarradiation,
          "solarenergyin2days": response.days[2].solarenergy,
          "uvindexin2days": Math.round(response.days[2].uvindex),
          "severeriskin2days": Math.round(response.days[2].severerisk)+'%',
          "sunrisein2days": response.days[2].sunrise,
          "sunriseepochin2days": response.days[2].sunriseEpoch,
          "sunsetin2days": response.days[2].sunset,
          "sunsetepochin2days": response.days[2].sunsetEpoch,
          "moonphasein2days": response.days[2].moonphase,
          "conditionsin2days": response.days[2].conditions,
          "descriptionin2days": response.days[2].description,
          "iconin2days": response.days[2].icon,
          "iconurlin2days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[2].icon}`+'.png?raw=true"',
        },
        "WeatherIn3Days": {
          "year1in3days": year1in3days,
          "year2in3days": year2in3days,
          "month1in3days": month1in3days,
          "month2in3days": month2in3days,
          "month3in3days": month3in3days,
          "month4in3days": month4in3days,
          "date1in3days": date1in3days,
          "date2in3days": date2in3days,
          "dow1in3days": dow1in3days,
          "dow2in3days": dow2in3days,
          "datetimein3days": response.days[3].datetime,
          "datetimeepochin3days": response.days[3].datetimeEpoch,
          "tempmaxin3days": Math.round(response.days[3].tempmax),
          "tempminin3days": Math.round(response.days[3].tempmin),
          "tempavgin3days": Math.round(response.days[3].temp),
          "feelslikemaxin3days": Math.round(response.days[3].feelslikemax),
          "feelslikeminin3days": Math.round(response.days[3].feelslikemin),
          "feelslikeavgin3days": Math.round(response.days[3].feelslike),
          "dewin3days": Math.round(response.days[3].dew),
          "humidityin3days": Math.round(response.days[3].humidity)+'%',
          "precipin3days": response.days[3].precip,
          "precipprobin3days": Math.round(response.days[3].precipprob)+'%',
          "precipcoverin3days": Math.round(response.days[3].precipcover)+'%',
          "preciptypein3days": precipTypeIn3Days,
          "snowin3days": response.days[3].snow,
          "snowdepthin3days": response.days[3].snowdepth,
          "windgustin3days": Math.round(response.days[3].windgust),
          "windspeedin3days": Math.round(response.days[3].windspeed),
          "windspeedmsin3days": windspeedmsin3days,
          "winddirdegin3days": Math.round(response.days[3].winddir),
          "winddirstrin3days": directions[Math.round(response.days[3].winddir / 45) % 8],
          "pressurein3days": response.days[3].pressure,
          "cloudcoverin3days": Math.round(response.days[3].cloudcover)+'%',
          "visibilityin3days": Math.round(response.days[3].visibility),
          "solarradiationin3days": response.days[3].solarradiation,
          "solarenergyin3days": response.days[3].solarenergy,
          "uvindexin3days": Math.round(response.days[3].uvindex),
          "severeriskin3days": Math.round(response.days[3].severerisk)+'%',
          "sunrisein3days": response.days[3].sunrise,
          "sunriseepochin3days": response.days[3].sunriseEpoch,
          "sunsetin3days": response.days[3].sunset,
          "sunsetepochin3days": response.days[3].sunsetEpoch,
          "moonphasein3days": response.days[3].moonphase,
          "conditionsin3days": response.days[3].conditions,
          "descriptionin3days": response.days[3].description,
          "iconin3days": response.days[3].icon,
          "iconurlin3days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[3].icon}`+'.png?raw=true"',
        },
        "WeatherIn4Days": {
          "year1in4days": year1in4days,
          "year2in4days": year2in4days,
          "month1in4days": month1in4days,
          "month2in4days": month2in4days,
          "month3in4days": month3in4days,
          "month4in4days": month4in4days,
          "date1in4days": date1in4days,
          "date2in4days": date2in4days,
          "dow1in4ays": dow1in4days,
          "dow2in4days": dow2in4days,
          "datetimein4days": response.days[4].datetime,
          "datetimeepochin4days": response.days[4].datetimeEpoch,
          "tempmaxin4days": Math.round(response.days[4].tempmax),
          "tempminin4days": Math.round(response.days[4].tempmin),
          "tempavgin4days": Math.round(response.days[4].temp),
          "feelslikemaxin4days": Math.round(response.days[4].feelslikemax),
          "feelslikeminin4days": Math.round(response.days[4].feelslikemin),
          "feelslikeavgin4days": Math.round(response.days[4].feelslike),
          "dewin4days": Math.round(response.days[4].dew),
          "humidityin4days": Math.round(response.days[4].humidity)+'%',
          "precipin4days": response.days[4].precip,
          "precipprobin4days": Math.round(response.days[4].precipprob)+'%',
          "precipcoverin4days": Math.round(response.days[4].precipcover)+'%',
          "preciptypein4days": precipTypeIn4Days,
          "snowin4days": response.days[4].snow,
          "snowdepthin4days": response.days[4].snowdepth,
          "windgustin4days": Math.round(response.days[4].windgust),
          "windspeedin4days": Math.round(response.days[4].windspeed),
          "windspeedmsin4days": windspeedmsin4days,
          "winddirdegin4days": Math.round(response.days[4].winddir),
          "winddirstrin4days": directions[Math.round(response.days[4].winddir / 45) % 8],
          "pressurein4days": response.days[4].pressure,
          "cloudcoverin4days": Math.round(response.days[4].cloudcover)+'%',
          "visibilityin4days": Math.round(response.days[4].visibility),
          "solarradiationin4days": response.days[4].solarradiation,
          "solarenergyin4days": response.days[4].solarenergy,
          "uvindexin4days": Math.round(response.days[4].uvindex),
          "severeriskin4days": Math.round(response.days[4].severerisk)+'%',
          "sunrisein4days": response.days[4].sunrise,
          "sunriseepochin4days": response.days[4].sunriseEpoch,
          "sunsetin4days": response.days[4].sunset,
          "sunsetepochin4days": response.days[4].sunsetEpoch,
          "moonphasein4days": response.days[4].moonphase,
          "conditionsin4days": response.days[4].conditions,
          "descriptionin4days": response.days[4].description,
          "iconin4days": response.days[4].icon,
          "iconurlin4days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[4].icon}`+'.png?raw=true"',
        },
        "WeatherIn5Days": {
          "year1in5days": year1in5days,
          "year2in5days": year2in5days,
          "month1in5days": month1in5days,
          "month2in5days": month2in5days,
          "month3in5days": month3in5days,
          "month4in5days": month4in5days,
          "date1in5days": date1in5days,
          "date2in5days": date2in5days,
          "dow1in5ays": dow1in5days,
          "dow2in5days": dow2in5days,
          "datetimein5days": response.days[5].datetime,
          "datetimeepochin5days": response.days[5].datetimeEpoch,
          "tempmaxin5days": Math.round(response.days[5].tempmax),
          "tempminin5days": Math.round(response.days[5].tempmin),
          "tempavgin5days": Math.round(response.days[5].temp),
          "feelslikemaxin5days": Math.round(response.days[5].feelslikemax),
          "feelslikeminin5days": Math.round(response.days[5].feelslikemin),
          "feelslikeavgin5days": Math.round(response.days[5].feelslike),
          "dewin5days": Math.round(response.days[5].dew),
          "humidityin5days": Math.round(response.days[5].humidity)+'%',
          "precipin5days": response.days[5].precip,
          "precipprobin5days": Math.round(response.days[5].precipprob)+'%',
          "precipcoverin5days": Math.round(response.days[5].precipcover)+'%',
          "preciptypein5days": precipTypeIn5Days,
          "snowin5days": response.days[5].snow,
          "snowdepthin5days": response.days[5].snowdepth,
          "windgustin5days": Math.round(response.days[5].windgust),
          "windspeedin5days": Math.round(response.days[5].windspeed),
          "windspeedmsin5days": windspeedmsin5days,
          "winddirdegin5days": Math.round(response.days[5].winddir),
          "winddirstrin5days": directions[Math.round(response.days[5].winddir / 45) % 8],
          "pressurein5days": response.days[5].pressure,
          "cloudcoverin5days": Math.round(response.days[5].cloudcover)+'%',
          "visibilityin5days": Math.round(response.days[5].visibility),
          "solarradiationin5days": response.days[5].solarradiation,
          "solarenergyin5days": response.days[5].solarenergy,
          "uvindexin5days": Math.round(response.days[5].uvindex),
          "severeriskin5days": Math.round(response.days[5].severerisk)+'%',
          "sunrisein5days": response.days[5].sunrise,
          "sunriseepochin5days": response.days[5].sunriseEpoch,
          "sunsetin5days": response.days[5].sunset,
          "sunsetepochin5days": response.days[5].sunsetEpoch,
          "moonphasein5days": response.days[5].moonphase,
          "conditionsin5days": response.days[5].conditions,
          "descriptionin5days": response.days[5].description,
          "iconin5days": response.days[5].icon,
          "iconurlin5days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[5].icon}`+'.png?raw=true"',
        },
        "WeatherIn6Days": {
          "year1in6days": year1in6days,
          "year2in6days": year2in6days,
          "month1in6days": month1in6days,
          "month2in6days": month2in6days,
          "month3in6days": month3in6days,
          "month4in6days": month4in6days,
          "date1in6days": date1in6days,
          "date2in6days": date2in6days,
          "dow1in6ays": dow1in6days,
          "dow2in6days": dow2in6days,
          "datetimein6days": response.days[6].datetime,
          "datetimeepochin6days": response.days[6].datetimeEpoch,
          "tempmaxin6days": Math.round(response.days[6].tempmax),
          "tempminin6days": Math.round(response.days[6].tempmin),
          "tempavgin6days": Math.round(response.days[6].temp),
          "feelslikemaxin6days": Math.round(response.days[6].feelslikemax),
          "feelslikeminin6days": Math.round(response.days[6].feelslikemin),
          "feelslikeavgin6days": Math.round(response.days[6].feelslike),
          "dewin6days": Math.round(response.days[6].dew),
          "humidityin6days": Math.round(response.days[6].humidity)+'%',
          "precipin6days": response.days[6].precip,
          "precipprobin6days": Math.round(response.days[6].precipprob)+'%',
          "precipcoverin6days": Math.round(response.days[6].precipcover)+'%',
          "preciptypein6days": precipTypeIn6Days,
          "snowin6days": response.days[6].snow,
          "snowdepthin6days": response.days[6].snowdepth,
          "windgustin6days": Math.round(response.days[6].windgust),
          "windspeedin6days": Math.round(response.days[6].windspeed),
          "windspeedmsin6days": windspeedmsin6days,
          "winddirdegin6days": Math.round(response.days[6].winddir),
          "winddirstrin6days": directions[Math.round(response.days[6].winddir / 45) % 8],
          "pressurein6days": response.days[6].pressure,
          "cloudcoverin6days": Math.round(response.days[6].cloudcover)+'%',
          "visibilityin6days": Math.round(response.days[6].visibility),
          "solarradiationin6days": response.days[6].solarradiation,
          "solarenergyin6days": response.days[6].solarenergy,
          "uvindexin6days": Math.round(response.days[6].uvindex),
          "severeriskin6days": Math.round(response.days[6].severerisk)+'%',
          "sunrisein6days": response.days[6].sunrise,
          "sunriseepochin6days": response.days[6].sunriseEpoch,
          "sunsetin6days": response.days[6].sunset,
          "sunsetepochin6days": response.days[6].sunsetEpoch,
          "moonphasein6days": response.days[6].moonphase,
          "conditionsin6days": response.days[6].conditions,
          "descriptionin6days": response.days[6].description,
          "iconin6days": response.days[6].icon,
          "iconurlin6days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[6].icon}`+'.png?raw=true"',
        },
        "WeatherIn7Days": {
          "year1in7days": year1in7days,
          "year2in7days": year2in7days,
          "month1in7days": month1in7days,
          "month2in7days": month2in7days,
          "month3in7days": month3in7days,
          "month4in7days": month4in7days,
          "date1in7days": date1in7days,
          "date2in7days": date2in7days,
          "dow1in7ays": dow1in7days,
          "dow2in7days": dow2in7days,
          "datetimein7days": response.days[7].datetime,
          "datetimeepochin7days": response.days[7].datetimeEpoch,
          "tempmaxin7days": Math.round(response.days[7].tempmax),
          "tempminin7days": Math.round(response.days[7].tempmin),
          "tempavgin7days": Math.round(response.days[7].temp),
          "feelslikemaxin7days": Math.round(response.days[7].feelslikemax),
          "feelslikeminin7days": Math.round(response.days[7].feelslikemin),
          "feelslikeavgin7days": Math.round(response.days[7].feelslike),
          "dewin7days": Math.round(response.days[7].dew),
          "humidityin7days": Math.round(response.days[7].humidity)+'%',
          "precipin7days": response.days[7].precip,
          "precipprobin7days": Math.round(response.days[7].precipprob)+'%',
          "precipcoverin7days": Math.round(response.days[7].precipcover)+'%',
          "preciptypein7days": precipTypeIn7Days,
          "snowin7days": response.days[7].snow,
          "snowdepthin7days": response.days[7].snowdepth,
          "windgustin7days": Math.round(response.days[7].windgust),
          "windspeedin7days": Math.round(response.days[7].windspeed),
          "windspeedmsin7days": windspeedmsin7days,
          "winddirdegin7days": Math.round(response.days[7].winddir),
          "winddirstrin7days": directions[Math.round(response.days[7].winddir / 45) % 8],
          "pressurein7days": response.days[7].pressure,
          "cloudcoverin7days": Math.round(response.days[7].cloudcover)+'%',
          "visibilityin7days": Math.round(response.days[7].visibility),
          "solarradiationin7days": response.days[7].solarradiation,
          "solarenergyin7days": response.days[7].solarenergy,
          "uvindexin7days": Math.round(response.days[7].uvindex),
          "severeriskin7days": Math.round(response.days[7].severerisk)+'%',
          "sunrisein7days": response.days[7].sunrise,
          "sunriseepochin7days": response.days[7].sunriseEpoch,
          "sunsetin7days": response.days[7].sunset,
          "sunsetepochin7days": response.days[7].sunsetEpoch,
          "moonphasein7days": response.days[7].moonphase,
          "conditionsin7days": response.days[7].conditions,
          "descriptionin7days": response.days[7].description,
          "iconin7days": response.days[7].icon,
          "iconurlin7days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[7].icon}`+'.png?raw=true"',
        },
        "WeatherIn8Days": {
          "year1in8days": year1in8days,
          "year2in8days": year2in8days,
          "month1in8days": month1in8days,
          "month2in8days": month2in8days,
          "month3in8days": month3in8days,
          "month4in8days": month4in8days,
          "date1in8days": date1in8days,
          "date2in8days": date2in8days,
          "dow1in8ays": dow1in8days,
          "dow2in8days": dow2in8days,
          "datetimein8days": response.days[8].datetime,
          "datetimeepochin8days": response.days[8].datetimeEpoch,
          "tempmaxin8days": Math.round(response.days[8].tempmax),
          "tempminin8days": Math.round(response.days[8].tempmin),
          "tempavgin8days": Math.round(response.days[8].temp),
          "feelslikemaxin8days": Math.round(response.days[8].feelslikemax),
          "feelslikeminin8days": Math.round(response.days[8].feelslikemin),
          "feelslikeavgin8days": Math.round(response.days[8].feelslike),
          "dewin8days": Math.round(response.days[8].dew),
          "humidityin8days": Math.round(response.days[8].humidity)+'%',
          "precipin8days": response.days[8].precip,
          "precipprobin8days": Math.round(response.days[8].precipprob)+'%',
          "precipcoverin8days": Math.round(response.days[8].precipcover)+'%',
          "preciptypein8days": precipTypeIn8Days,
          "snowin8days": response.days[8].snow,
          "snowdepthin8days": response.days[8].snowdepth,
          "windgustin8days": Math.round(response.days[8].windgust),
          "windspeedin8days": Math.round(response.days[8].windspeed),
          "windspeedmsin8days": windspeedmsin8days,
          "winddirdegin8days": Math.round(response.days[8].winddir),
          "winddirstrin8days": directions[Math.round(response.days[8].winddir / 45) % 8],
          "pressurein8days": response.days[8].pressure,
          "cloudcoverin8days": Math.round(response.days[8].cloudcover)+'%',
          "visibilityin8days": Math.round(response.days[8].visibility),
          "solarradiationin8days": response.days[8].solarradiation,
          "solarenergyin8days": response.days[8].solarenergy,
          "uvindexin8days": Math.round(response.days[8].uvindex),
          "severeriskin8days": Math.round(response.days[8].severerisk)+'%',
          "sunrisein8days": response.days[8].sunrise,
          "sunriseepochin8days": response.days[8].sunriseEpoch,
          "sunsetin8days": response.days[8].sunset,
          "sunsetepochin8days": response.days[8].sunsetEpoch,
          "moonphasein8days": response.days[8].moonphase,
          "conditionsin8days": response.days[8].conditions,
          "descriptionin8days": response.days[8].description,
          "iconin8days": response.days[8].icon,
          "iconurlin8days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[8].icon}`+'.png?raw=true"',
        },
        "WeatherIn9Days": {
          "year1in9days": year1in9days,
          "year2in9days": year2in9days,
          "month1in9days": month1in9days,
          "month2in9days": month2in9days,
          "month3in9days": month3in9days,
          "month4in9days": month4in9days,
          "date1in9days": date1in9days,
          "date2in9days": date2in9days,
          "dow1in9ays": dow1in9days,
          "dow2in9days": dow2in9days,
          "datetimein9days": response.days[9].datetime,
          "datetimeepochin9days": response.days[9].datetimeEpoch,
          "tempmaxin9days": Math.round(response.days[9].tempmax),
          "tempminin9days": Math.round(response.days[9].tempmin),
          "tempavgin9days": Math.round(response.days[9].temp),
          "feelslikemaxin9days": Math.round(response.days[9].feelslikemax),
          "feelslikeminin9days": Math.round(response.days[9].feelslikemin),
          "feelslikeavgin9days": Math.round(response.days[9].feelslike),
          "dewin9days": Math.round(response.days[9].dew),
          "humidityin9days": Math.round(response.days[9].humidity)+'%',
          "precipin9days": response.days[9].precip,
          "precipprobin9days": Math.round(response.days[9].precipprob)+'%',
          "precipcoverin9days": Math.round(response.days[9].precipcover)+'%',
          "preciptypein9days": precipTypeIn9Days,
          "snowin9days": response.days[9].snow,
          "snowdepthin9days": response.days[9].snowdepth,
          "windgustin9days": Math.round(response.days[9].windgust),
          "windspeedin9days": Math.round(response.days[9].windspeed),
          "windspeedmsin9days": windspeedmsin9days,
          "winddirdegin9days": Math.round(response.days[9].winddir),
          "winddirstrin9days": directions[Math.round(response.days[9].winddir / 45) % 8],
          "pressurein9days": response.days[9].pressure,
          "cloudcoverin9days": Math.round(response.days[9].cloudcover)+'%',
          "visibilityin9days": Math.round(response.days[9].visibility),
          "solarradiationin9days": response.days[9].solarradiation,
          "solarenergyin9days": response.days[9].solarenergy,
          "uvindexin9days": Math.round(response.days[9].uvindex),
          "severeriskin9days": Math.round(response.days[9].severerisk)+'%',
          "sunrisein9days": response.days[9].sunrise,
          "sunriseepochin9days": response.days[9].sunriseEpoch,
          "sunsetin9days": response.days[9].sunset,
          "sunsetepochin9days": response.days[9].sunsetEpoch,
          "moonphasein9days": response.days[9].moonphase,
          "conditionsin9days": response.days[9].conditions,
          "descriptionin9days": response.days[9].description,
          "iconin9days": response.days[9].icon,
          "iconurlin9days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[9].icon}`+'.png?raw=true"',
        },
        "WeatherIn10Days": {
          "year1in10days": year1in10days,
          "year2in10days": year2in10days,
          "month1in10days": month1in10days,
          "month2in10days": month2in10days,
          "month3in10days": month3in10days,
          "month4in10days": month4in10days,
          "date1in10days": date1in10days,
          "date2in10days": date2in10days,
          "dow1in10ays": dow1in10days,
          "dow2in10days": dow2in10days,
          "datetimein10days": response.days[10].datetime,
          "datetimeepochin10days": response.days[10].datetimeEpoch,
          "tempmaxin10days": Math.round(response.days[10].tempmax),
          "tempminin10days": Math.round(response.days[10].tempmin),
          "tempavgin10days": Math.round(response.days[10].temp),
          "feelslikemaxin10days": Math.round(response.days[10].feelslikemax),
          "feelslikeminin10days": Math.round(response.days[10].feelslikemin),
          "feelslikeavgin10days": Math.round(response.days[10].feelslike),
          "dewin10days": Math.round(response.days[10].dew),
          "humidityin10days": Math.round(response.days[10].humidity)+'%',
          "precipin10days": response.days[10].precip,
          "precipprobin10days": Math.round(response.days[10].precipprob)+'%',
          "precipcoverin10days": Math.round(response.days[10].precipcover)+'%',
          "preciptypein10days": precipTypeIn10Days,
          "snowin10days": response.days[10].snow,
          "snowdepthin10days": response.days[10].snowdepth,
          "windgustin10days": Math.round(response.days[10].windgust),
          "windspeedin10days": Math.round(response.days[10].windspeed),
          "windspeedmsin10days": windspeedmsin10days,
          "winddirdegin10days": Math.round(response.days[10].winddir),
          "winddirstrin10days": directions[Math.round(response.days[10].winddir / 45) % 8],
          "pressurein10days": response.days[10].pressure,
          "cloudcoverin10days": Math.round(response.days[10].cloudcover)+'%',
          "visibilityin10days": Math.round(response.days[10].visibility),
          "solarradiationin10days": response.days[10].solarradiation,
          "solarenergyin10days": response.days[10].solarenergy,
          "uvindexin10days": Math.round(response.days[10].uvindex),
          "severeriskin10days": Math.round(response.days[10].severerisk)+'%',
          "sunrisein10days": response.days[10].sunrise,
          "sunriseepochin10days": response.days[10].sunriseEpoch,
          "sunsetin10days": response.days[10].sunset,
          "sunsetepochin10days": response.days[10].sunsetEpoch,
          "moonphasein10days": response.days[10].moonphase,
          "conditionsin10days": response.days[10].conditions,
          "descriptionin10days": response.days[10].description,
          "iconin10days": response.days[10].icon,
          "iconurlin10days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[10].icon}`+'.png?raw=true"',
        },
        "WeatherIn11Days": {
          "year1in11days": year1in11days,
          "year2in11days": year2in11days,
          "month1in11days": month1in11days,
          "month2in11days": month2in11days,
          "month3in11days": month3in11days,
          "month4in11days": month4in11days,
          "date1in11days": date1in11days,
          "date2in11days": date2in11days,
          "dow1in11ays": dow1in11days,
          "dow2in11days": dow2in11days,
          "datetimein11days": response.days[11].datetime,
          "datetimeepochin11days": response.days[11].datetimeEpoch,
          "tempmaxin11days": Math.round(response.days[11].tempmax),
          "tempminin11days": Math.round(response.days[11].tempmin),
          "tempavgin11days": Math.round(response.days[11].temp),
          "feelslikemaxin11days": Math.round(response.days[11].feelslikemax),
          "feelslikeminin11days": Math.round(response.days[11].feelslikemin),
          "feelslikeavgin11days": Math.round(response.days[11].feelslike),
          "dewin11days": Math.round(response.days[11].dew),
          "humidityin11days": Math.round(response.days[11].humidity)+'%',
          "precipin11days": response.days[11].precip,
          "precipprobin11days": Math.round(response.days[11].precipprob)+'%',
          "precipcoverin11days": Math.round(response.days[11].precipcover)+'%',
          "preciptypein11days": precipTypeIn11Days,
          "snowin11days": response.days[11].snow,
          "snowdepthin11days": response.days[11].snowdepth,
          "windgustin11days": Math.round(response.days[11].windgust),
          "windspeedin11days": Math.round(response.days[11].windspeed),
          "windspeedmsin11days": windspeedmsin11days,
          "winddirdegin11days": Math.round(response.days[11].winddir),
          "winddirstrin11days": directions[Math.round(response.days[11].winddir / 45) % 8],
          "pressurein11days": response.days[11].pressure,
          "cloudcoverin11days": Math.round(response.days[11].cloudcover)+'%',
          "visibilityin11days": Math.round(response.days[11].visibility),
          "solarradiationin11days": response.days[11].solarradiation,
          "solarenergyin11days": response.days[11].solarenergy,
          "uvindexin11days": Math.round(response.days[11].uvindex),
          "severeriskin11days": Math.round(response.days[11].severerisk)+'%',
          "sunrisein11days": response.days[11].sunrise,
          "sunriseepochin11days": response.days[11].sunriseEpoch,
          "sunsetin11days": response.days[11].sunset,
          "sunsetepochin11days": response.days[11].sunsetEpoch,
          "moonphasein11days": response.days[11].moonphase,
          "conditionsin11days": response.days[11].conditions,
          "descriptionin11days": response.days[11].description,
          "iconin11days": response.days[11].icon,
          "iconurlin11days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[11].icon}`+'.png?raw=true"',
        },
        "WeatherIn12Days": {
          "year1in12days": year1in12days,
          "year2in12days": year2in12days,
          "month1in12days": month1in12days,
          "month2in12days": month2in12days,
          "month3in12days": month3in12days,
          "month4in12days": month4in12days,
          "date1in12days": date1in12days,
          "date2in12days": date2in12days,
          "dow1in12ays": dow1in12days,
          "dow2in12days": dow2in12days,
          "datetimein12days": response.days[12].datetime,
          "datetimeepochin12days": response.days[12].datetimeEpoch,
          "tempmaxin12days": Math.round(response.days[12].tempmax),
          "tempminin12days": Math.round(response.days[12].tempmin),
          "tempavgin12days": Math.round(response.days[12].temp),
          "feelslikemaxin12days": Math.round(response.days[12].feelslikemax),
          "feelslikeminin12days": Math.round(response.days[12].feelslikemin),
          "feelslikeavgin12days": Math.round(response.days[12].feelslike),
          "dewin12days": Math.round(response.days[12].dew),
          "humidityin12days": Math.round(response.days[12].humidity)+'%',
          "precipin12days": response.days[12].precip,
          "precipprobin12days": Math.round(response.days[12].precipprob)+'%',
          "precipcoverin12days": Math.round(response.days[12].precipcover)+'%',
          "preciptypein12days": precipTypeIn12Days,
          "snowin12days": response.days[12].snow,
          "snowdepthin12days": response.days[12].snowdepth,
          "windgustin12days": Math.round(response.days[12].windgust),
          "windspeedin12days": Math.round(response.days[12].windspeed),
          "windspeedmsin12days": windspeedmsin12days,
          "winddirdegin12days": Math.round(response.days[12].winddir),
          "winddirstrin12days": directions[Math.round(response.days[12].winddir / 45) % 8],
          "pressurein12days": response.days[12].pressure,
          "cloudcoverin12days": Math.round(response.days[12].cloudcover)+'%',
          "visibilityin12days": Math.round(response.days[12].visibility),
          "solarradiationin12days": response.days[12].solarradiation,
          "solarenergyin12days": response.days[12].solarenergy,
          "uvindexin12days": Math.round(response.days[12].uvindex),
          "severeriskin12days": Math.round(response.days[12].severerisk)+'%',
          "sunrisein12days": response.days[12].sunrise,
          "sunriseepochin12days": response.days[12].sunriseEpoch,
          "sunsetin12days": response.days[12].sunset,
          "sunsetepochin12days": response.days[12].sunsetEpoch,
          "moonphasein12days": response.days[12].moonphase,
          "conditionsin12days": response.days[12].conditions,
          "descriptionin12days": response.days[12].description,
          "iconin12days": response.days[12].icon,
          "iconurlin12days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[12].icon}`+'.png?raw=true"',
        },
        "WeatherIn13Days": {
          "year1in13days": year1in13days,
          "year2in13days": year2in13days,
          "month1in13days": month1in13days,
          "month2in13days": month2in13days,
          "month3in13days": month3in13days,
          "month4in13days": month4in13days,
          "date1in13days": date1in13days,
          "date2in13days": date2in13days,
          "dow1in13ays": dow1in13days,
          "dow2in13days": dow2in13days,
          "datetimein13days": response.days[13].datetime,
          "datetimeepochin13days": response.days[13].datetimeEpoch,
          "tempmaxin13days": Math.round(response.days[13].tempmax),
          "tempminin13days": Math.round(response.days[13].tempmin),
          "tempavgin13days": Math.round(response.days[13].temp),
          "feelslikemaxin13days": Math.round(response.days[13].feelslikemax),
          "feelslikeminin13days": Math.round(response.days[13].feelslikemin),
          "feelslikeavgin13days": Math.round(response.days[13].feelslike),
          "dewin13days": Math.round(response.days[13].dew),
          "humidityin13days": Math.round(response.days[13].humidity)+'%',
          "precipin13days": response.days[13].precip,
          "precipprobin13days": Math.round(response.days[13].precipprob)+'%',
          "precipcoverin13days": Math.round(response.days[13].precipcover)+'%',
          "preciptypein13days": precipTypeIn13Days,
          "snowin13days": response.days[13].snow,
          "snowdepthin13days": response.days[13].snowdepth,
          "windgustin13days": Math.round(response.days[13].windgust),
          "windspeedin13days": Math.round(response.days[13].windspeed),
          "windspeedmsin13days": windspeedmsin13days,
          "winddirdegin13days": Math.round(response.days[13].winddir),
          "winddirstrin13days": directions[Math.round(response.days[13].winddir / 45) % 8],
          "pressurein13days": response.days[13].pressure,
          "cloudcoverin13days": Math.round(response.days[13].cloudcover)+'%',
          "visibilityin13days": Math.round(response.days[13].visibility),
          "solarradiationin13days": response.days[13].solarradiation,
          "solarenergyin13days": response.days[13].solarenergy,
          "uvindexin13days": Math.round(response.days[13].uvindex),
          "severeriskin13days": Math.round(response.days[13].severerisk)+'%',
          "sunrisein13days": response.days[13].sunrise,
          "sunriseepochin13days": response.days[13].sunriseEpoch,
          "sunsetin13days": response.days[13].sunset,
          "sunsetepochin13days": response.days[13].sunsetEpoch,
          "moonphasein13days": response.days[13].moonphase,
          "conditionsin13days": response.days[13].conditions,
          "descriptionin13days": response.days[13].description,
          "iconin13days": response.days[13].icon,
          "iconurlin13days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[13].icon}`+'.png?raw=true"',
        },
        "WeatherIn14Days": {
          "year1in14days": year1in14days,
          "year2in14days": year2in14days,
          "month1in14days": month1in14days,
          "month2in14days": month2in14days,
          "month3in14days": month3in14days,
          "month4in14days": month4in14days,
          "date1in14days": date1in14days,
          "date2in14days": date2in14days,
          "dow1in14ays": dow1in14days,
          "dow2in14days": dow2in14days,
          "datetimein14days": response.days[14].datetime,
          "datetimeepochin14days": response.days[14].datetimeEpoch,
          "tempmaxin14days": Math.round(response.days[14].tempmax),
          "tempminin14days": Math.round(response.days[14].tempmin),
          "tempavgin14days": Math.round(response.days[14].temp),
          "feelslikemaxin14days": Math.round(response.days[14].feelslikemax),
          "feelslikeminin14days": Math.round(response.days[14].feelslikemin),
          "feelslikeavgin14days": Math.round(response.days[14].feelslike),
          "dewin14days": Math.round(response.days[14].dew),
          "humidityin14days": Math.round(response.days[14].humidity)+'%',
          "precipin14days": response.days[14].precip,
          "precipprobin14days": Math.round(response.days[14].precipprob)+'%',
          "precipcoverin14days": Math.round(response.days[14].precipcover)+'%',
          "preciptypein14days": precipTypeIn14Days,
          "snowin14days": response.days[14].snow,
          "snowdepthin14days": response.days[14].snowdepth,
          "windgustin14days": Math.round(response.days[14].windgust),
          "windspeedin14days": Math.round(response.days[14].windspeed),
          "windspeedmsin14days": windspeedmsin14days,
          "winddirdegin14days": Math.round(response.days[14].winddir),
          "winddirstrin14days": directions[Math.round(response.days[14].winddir / 45) % 8],
          "pressurein14days": response.days[14].pressure,
          "cloudcoverin14days": Math.round(response.days[14].cloudcover)+'%',
          "visibilityin14days": Math.round(response.days[14].visibility),
          "solarradiationin14days": response.days[14].solarradiation,
          "solarenergyin14days": response.days[14].solarenergy,
          "uvindexin14days": Math.round(response.days[14].uvindex),
          "severeriskin14days": Math.round(response.days[14].severerisk)+'%',
          "sunrisein14days": response.days[14].sunrise,
          "sunriseepochin14days": response.days[14].sunriseEpoch,
          "sunsetin14days": response.days[14].sunset,
          "sunsetepochin14days": response.days[14].sunsetEpoch,
          "moonphasein14days": response.days[14].moonphase,
          "conditionsin14days": response.days[14].conditions,
          "descriptionin14days": response.days[14].description,
          "iconin14days": response.days[14].icon,
          "iconurlin14days": '"https://github.com/visualcrossing/WeatherIcons/blob/main/PNG/1st%20Set%20-%20Color/'+`${response.days[14].icon}`+'.png?raw=true"',
        }
      }
    return weatherData;
    };

  };

