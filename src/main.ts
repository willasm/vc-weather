import { Editor, MarkdownView, Notice, Plugin, setTooltip } from 'obsidian';
import { VCWSettingsTab, VCWSettings, DEFAULT_SETTINGS } from './settings';
import FormatTemplates from './formatTemplates';
import UpdateWeather from './updateWeather';
import InsertTemplatesModal from './insertWeatherModal'
import DisplayWeatherModal from './displayWeatherModal';

// Location results
let l1results: any;
let l2results: any;
let l3results: any;
let l4results: any;
let l5results: any;

// Formatted location results
let l1formattedresults: any;
let l2formattedresults: any;
let l4formattedresults: any;
let l5formattedresults: any;
let l3formattedresults: any;

interface alert {
  "event": string;
  "headline": string;
  "ends": string;
  "endsepoch": number;
  "onset": string;
  "onsetepoch": number;
  "id": string;
  "language": string;
  "link": string;
  "description": string
}

type Alerts = alert[];

// Alerts
let l1Alerts: Alerts;
let l2Alerts: Alerts;
let l3Alerts: Alerts;
let l4Alerts: Alerts;
let l5Alerts: Alerts;

//'{"address":"%address%","resAddress":"%resolvedaddress%","lat":"%latitude%","lon":"%longitude%","timezone":"%timezone%",
//"year":"%year1-today%","month":"%month3-today%","date":"%date1-today%","dow":"%dow1-today%","hours24":"%hours24%",
//"hours12":"%hours12%","mins":"%mins%","ampm1":"%ampm1%","ampm2":"%ampm2%","datetime":"%datetime%","temp":"%temp%",
//"feelslike":"%feelslike%","humidity":"%humidity%","dew":"%dew%","precip":"%precip%","pop":"%precipprob%",
//"preciptype":"%preciptype%","snow":"%snow%","snowdepth":"%snowdepth%","windgust":"%windgust%","windspeed":"%windspeed%",
//"windspeedms":"%windspeedms%","winddirdeg":"%winddirdeg%","winddirstr":"%winddirstr%","pressure":"%pressure%",
//"visibility":"%visibility%","solarradiation":"%solarradiation%","solarenergy":"%solarenergy%","uvindex":"%uvindex%",
//"conditions":"%conditions%","desc":"%description-today%","iconUrl":"%iconurl%","sunrise":"%sunrise%","sunset":"%sunset%",
//"moonphase":"%moonphase%"}'
interface internalCurrentData {
  "address": string;
  "resAddress": string;
  "lat": string;
  "lon": number;
  "timezone": string;
  "year": number;
  "month": string;
  "date": string;
  "dow": string;
  "hours24": string
  "hours12": string
  "mins": string
  "ampm1": string
  "ampm2": string
  "datetime": string
  "temp": string
  "feelslike": string
  "humidity": string
  "dew": string
  "precip": string
  "pop": string
  "preciptype": string
  "snow": string
  "snowdepth": string
  "windgust": number
  "windspeed": string
  "windspeedms": string
  "winddirdeg": string
  "winddirstr": string
  "pressure": string
  "visibility": string
  "solarradiation": string
  "solarenergy": string
  "uvindex": string
  "conditions": string
  "desc": string
  "icon": string
  "iconUrl": string
  "sunrise": string
  "sunset": string
  "moonphase": string
}

let internalCurrentData: any;

interface dailyData {
  "year1": string,
  "year2": string,
  "month1": string,
  "month2": string,
  "month3": string,
  "month4": string,
  "date1": string,
  "date2": string,
  "dow1": string,
  "dow2": string,
  "datetime": string,
  "datetimeepoch": number,
  "tempmax": number,
  "tempmin": number,
  "tempavg": number,
  "feelslikemax": number,
  "feelslikemin": number,
  "feelslikeavg": number,
  "dew": number,
  "humidity": string,
  "precip": number,
  "precipprob": string,
  "precipcover": string,
  "preciptype": string,
  "snow": number,
  "snowdepth": number,
  "windgust": number,
  "windspeed": number,
  "windspeedms": number,
  "winddirdeg": number,
  "winddirstr": string,
  "winddirstrshort": string,
  "pressure": number,
  "cloudcover": string,
  "visibility": number,
  "solarradiation": number,
  "solarenergy": number,
  "uvindex": string,
  "severerisk": string,
  "sunrise": string,
  "sunriseepoch": number,
  "sunset": string,
  "sunsetepoch": number,
  "moonphase": number,
  "conditions": string,
  "description": string,
  "icon": string,
  "iconurl": string,
  "iconurlloc": string,
}

let dailyData: any;

interface Global {
  statusbarEl: HTMLSpanElement;
  statusbarAlertEl: HTMLSpanElement;
  formattedSBTemplate1: string;
  formattedSBTemplate2: string;
  weatherTemplateTitle1: string;
  weatherTemplateTitle2: string;
  weatherTemplateTitle3: string;
  weatherTemplateTitle4: string;
  weatherTemplateTitle5: string;
  weatherTemplateTitle6: string;
  weatherTemplateTitle7: string;
  weatherTemplateTitle8: string;
  // Formatted template body strings
  weatherTemplateBody1: string;
  weatherTemplateBody2: string;
  weatherTemplateBody3: string;
  weatherTemplateBody4: string;
  weatherTemplateBody5: string;
  weatherTemplateBody6: string;
  weatherTemplateBody7: string;
  weatherTemplateBody8: string;
  // Formatted template current weather info
  formattedInternalCurrentData: string;
  // Formatted Daily Data
  formattedDailyData: dailyData;
}

// Statusbar elements
let statusbarEl: HTMLSpanElement
let statusbarAlertEl: HTMLSpanElement
// Statusbar strings
let formattedSBTemplate1: string;
let formattedSBTemplate2: string;
// Formatted template title strings
let weatherTemplateTitle1: string;
let weatherTemplateTitle2: string;
let weatherTemplateTitle3: string;
let weatherTemplateTitle4: string;
let weatherTemplateTitle5: string;
let weatherTemplateTitle6: string;
let weatherTemplateTitle7: string;
let weatherTemplateTitle8: string;
// Formatted template body strings
let weatherTemplateBody1: string;
let weatherTemplateBody2: string;
let weatherTemplateBody3: string;
let weatherTemplateBody4: string;
let weatherTemplateBody5: string;
let weatherTemplateBody6: string;
let weatherTemplateBody7: string;
let weatherTemplateBody8: string;
// Formatted template current weather info
let formattedInternalCurrentData: string;
// Formatted template current weather info
let formattedDailyData: any;

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                             ● Class VCWPlugin ●                              │
//  │                                                                              │
//  │                      • Visual Crossing Weather Plugin •                      │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
export default class VCWPlugin extends Plugin {
  settings: VCWSettings;
  statusbarAlertEl: HTMLSpanElement;
  statusbarEl: HTMLSpanElement;

  async onload() {

    // Data for internal template used for display current weather modal
    formattedInternalCurrentData = "";
    internalCurrentData = '{"address":"%address%","resAddress":"%resolvedaddress%","lat":"%latitude%","lon":"%longitude%","timezone":"%timezone%","year":"%year1-today%","month":"%month3-today%","date":"%date1-today%","dow":"%dow1-today%","hours24":"%hours24%","hours12":"%hours12%","mins":"%mins%","ampm1":"%ampm1%","ampm2":"%ampm2%","datetime":"%datetime%","temp":"%temp%","feelslike":"%feelslike%","humidity":"%humidity%","dew":"%dew%","precip":"%precip%","pop":"%precipprob%","preciptype":"%preciptype%","snow":"%snow%","snowdepth":"%snowdepth%","windgust":"%windgust%","windspeed":"%windspeed%","windspeedms":"%windspeedms%","winddirdeg":"%winddirdeg%","winddirstr":"%winddirstr%","pressure":"%pressure%","visibility":"%visibility%","solarradiation":"%solarradiation%","solarenergy":"%solarenergy%","uvindex":"%uvindex%","conditions":"%conditions%","desc":"%description-today%","icon":"%icon%","iconUrl":"%iconurl%","sunrise":"%sunrise%","sunset":"%sunset%","moonphase":"%moonphase%"}'

    // • Load plugin settings • 
    await this.loadSettings();

    // • Ensure settings are configured, inform user if required items are not set. • 
    if (this.settings.apikey.length === 0 || this.settings.location_one.length === 0 || this.settings.excludeFolder.length === 0) {
      new Notice('Visual Crossing Weather plugin is missing required settings. Please configure the plugins settings.',5000);
    };

    // • Create icon in the left ribbon bar • 
    const ribbonIconEl = this.addRibbonIcon('thermometer-snowflake', 'Visual Crossing Weather', async (evt: MouseEvent) => {
      // Called when the user clicks the icon.
      //"insert-vcweather-templates"
      let view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (!view) {
        new Notice("Open a Markdown file first.");
      } else {
        let view_mode = view.getMode();
        if (view_mode != 'preview') {
          let editor = view.editor;
          new InsertTemplatesModal(this.app, editor, weatherTemplateTitle1, weatherTemplateBody1, weatherTemplateTitle2, weatherTemplateBody2, weatherTemplateTitle3, weatherTemplateBody3, weatherTemplateTitle4, weatherTemplateBody4, weatherTemplateTitle5, weatherTemplateBody5, weatherTemplateTitle6, weatherTemplateBody6, weatherTemplateTitle7, weatherTemplateBody7, weatherTemplateTitle8, weatherTemplateBody8).open();
        } else {
          new Notice("Markdown file must be in edit mode to insert weather template.")
        };
      };
    });

    // • Adds plugins statusbar item to display weather information. Does not work on mobile apps. • 
    // Statusbar weather alert
    statusbarAlertEl = this.addStatusBarItem().createEl('span');
    statusbarAlertEl.setText("");
    setTooltip(statusbarAlertEl,"WEATHER ALERT\n\nClick to open link...",{ placement: "top" });
    statusbarAlertEl.addClass("statusbar-alert-vc");
    statusbarAlertEl.addEventListener("click", () => {
      if (this.settings.location_one.length > 0) {
        if (l1Alerts.length > 0) {
          let link = l1Alerts[0].link;
          if (link != null) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(`${l1Alerts[0].link}`);
            } else {
              new Notice('A valid link was not returned with this weather alert');
            };
          } else {
            new Notice('A valid link was not returned with this weather alert');
          };
        };
      };
      if (this.settings.location_two.length > 0) {
        if (l2Alerts.length > 0) {
          let link = l2Alerts[0].link;
          if (link != null) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(`${l1Alerts[0].link}`);
            } else {
              new Notice('A valid link was not returned with this weather alert');
            };
          } else {
            new Notice('A valid link was not returned with this weather alert');
          };
        };
      };
      if (this.settings.location_three.length > 0) {
        if (l3Alerts.length > 0) {
          let link = l3Alerts[0].link;
          if (link != null) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(`${l1Alerts[0].link}`);
            } else {
              new Notice('A valid link was not returned with this weather alert');
            };
          } else {
            new Notice('A valid link was not returned with this weather alert');
          };
        };
      };
      if (this.settings.location_four.length > 0) {
        if (l4Alerts.length > 0) {
          let link = l4Alerts[0].link;
          if (link != null) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(`${l1Alerts[0].link}`);
            } else {
              new Notice('A valid link was not returned with this weather alert');
            };
          } else {
            new Notice('A valid link was not returned with this weather alert');
          };
        };
      };
      if (this.settings.location_five.length > 0) {
        if (l5Alerts.length > 0) {
          let link = l5Alerts[0].link;
          if (link != null) {
            if (link.startsWith('http://') || link.startsWith('https://')) {
              window.open(`${l1Alerts[0].link}`);
            } else {
              new Notice('A valid link was not returned with this weather alert');
            };
          } else {
            new Notice('A valid link was not returned with this weather alert');
          };
        };
      };
    });
    // Statusbar weather
    statusbarEl = this.addStatusBarItem().createEl('span');
    statusbarEl.setText('');
    setTooltip(statusbarEl,"Click to view detailed info on todays weather",{ placement: "top" });
    statusbarEl.addClass("statusbar-vc");
    statusbarEl.addEventListener("click", () => new DisplayWeatherModal(this.app, formattedInternalCurrentData).open());

    // onload - registerEvent - 'file-open' 
    this.registerEvent(this.app.workspace.on('file-open', async (file) => {
      if (file) {
        //console.log('File Opened...');
        await new Promise(r => setTimeout(r, 500));  // Delay to let Templater do its thing
        await this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
        await this.replaceDailyTemplateStrings();
      };
    }));

    // onload - registerEvent - 'editor-change' 
    // this.registerEvent(this.app.workspace.on('editor-change', async () => {
    //   console.log('Editor Changed...');
    //   await this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
    //   await this.replaceDailyTemplateStrings();
    // }));

    // onload - registerEvent - 'layout-change' 
    // this.registerEvent(this.app.workspace.on('layout-change', async () => {
    //   console.log('Layout Changed...');
    //   await this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
    //   await this.replaceDailyTemplateStrings();
    // }));

    // onload - registerEvent - 'resolved' 
    this.registerEvent(this.app.metadataCache.on('resolved', async () => {
    //console.log('Resolved...');
    await this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
    //await this.replaceDailyTemplateStrings();
    }));

    // • Add settings tab so users can configure this plugin • 
    this.addSettingTab(new VCWSettingsTab(this.app, this));

    // • Get current weather for all given locations • 
    const getResults = new UpdateWeather();

    statusbarAlertEl.setText("");
    // Location 5 unformatted results
    if (this.settings.location_five.length > 0) {
      l5results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_five,
        this.settings.units,
        this.settings.language
      );
      // get alerts
      l5Alerts = getResults.getAlerts(l5results);
      if (this.settings.statusbarAlerts) {
        if (l5Alerts.length > 0) {
          if (this.settings.statusbarActive) {
            statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_five.toUpperCase()}`);
            setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l5Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l5Alerts[0].description}`,{ placement: "top" })
            new Notice(`WEATHER ALERT...\n\n${this.settings.location_five.toUpperCase()}\n\n${l5Alerts[0].headline}`,8000);
          };
        };
      };
    };

    // Location 4 unformatted results
    if (this.settings.location_four.length > 0) {
      l4results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_four,
        this.settings.units,
        this.settings.language
      );
      // get alerts
      l4Alerts = getResults.getAlerts(l4results);
      if (this.settings.statusbarAlerts) {
        if (this.settings.statusbarActive) {
          if (l4Alerts.length > 0) {
            statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_four.toUpperCase()}`);
            setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l4Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l4Alerts[0].description}`,{ placement: "top" })
            new Notice(`WEATHER ALERT...\n\n${this.settings.location_four.toUpperCase()}\n\n${l4Alerts[0].headline}`,8000);
          };
        };
      };
    };

    // Location 3 unformatted results
    if (this.settings.location_three.length > 0) {
      l3results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_three,
        this.settings.units,
        this.settings.language
      );
      // get alerts
      l3Alerts = getResults.getAlerts(l3results);
      if (this.settings.statusbarAlerts) {
        if (this.settings.statusbarActive) {
          if (l3Alerts.length > 0) {
            statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_three.toUpperCase()}`);
            setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l3Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l3Alerts[0].description}`,{ placement: "top" })
            new Notice(`WEATHER ALERT...\n\n${this.settings.location_three.toUpperCase()}\n\n${l3Alerts[0].headline}`,8000);
          };
        };
      };
    };

    // Location 2 unformatted results
    if (this.settings.location_two.length > 0) {
      l2results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_two,
        this.settings.units,
        this.settings.language
      );
      // get alerts
      l2Alerts = getResults.getAlerts(l2results);
      if (this.settings.statusbarAlerts) {
        if (this.settings.statusbarActive) {
          if (l2Alerts.length > 0) {
            statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_two.toUpperCase()}`);
            setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l2Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l2Alerts[0].description}`,{ placement: "top" })
            new Notice(`WEATHER ALERT...\n\n${this.settings.location_two.toUpperCase()}\n\n${l2Alerts[0].headline}`,8000);
          };
        };
      };
    };

    // Location 1 unformatted results
    l1results = await getResults.getWeather(
      0,
      this.settings.updateFrequency,
      this.settings.apikey,
      this.settings.location_one,
      this.settings.units,
      this.settings.language
    );
    // get alerts
    l1Alerts = getResults.getAlerts(l1results);
    if (this.settings.statusbarAlerts) {
      if (this.settings.statusbarActive) {
        if (l1Alerts.length > 0) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_one.toUpperCase()}`);
          setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l1Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l1Alerts[0].description}`,{ placement: "top" })
          new Notice(`WEATHER ALERT...\n\n${this.settings.location_one.toUpperCase()}\n\n${l1Alerts[0].headline}`,8000);
        };
      };
    };


    // • Get formatted results for all existing locations and get all formatted templates • 
    // Formatted results for location one (primary - Must Exist)
    l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);

    // Formatted results for location two
    if (l2results != undefined) {
      l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
    } else {
      l2formattedresults = l1formattedresults;
    };

    // Formatted results for location three
    if (l3results != undefined) {
      l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
    } else {
      l3formattedresults = l1formattedresults;
    };

    // Formatted results for location four
    if (l4results != undefined) {
      l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
    } else {
      l4formattedresults = l1formattedresults;
    };

    // Formatted results for location five
    if (l5results != undefined) {
      l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
    } else {
      l5formattedresults = l1formattedresults;
    };

    // Get formatted strings for all weather templates 
    const getFormatted = new FormatTemplates;

    let templates = [this.settings.weatherTemplate1, this.settings.weatherTemplate2, this.settings.weatherTemplate3, this.settings.weatherTemplate4, this.settings.weatherTemplate5, this.settings.weatherTemplate6, this.settings.weatherTemplate7, this.settings.weatherTemplate8];
    let templateBodies = [weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8];
    let templateTitles = [weatherTemplateTitle1, weatherTemplateTitle2, weatherTemplateTitle3, weatherTemplateTitle4, weatherTemplateTitle5, weatherTemplateTitle6, weatherTemplateTitle7, weatherTemplateTitle8];
    for (let i = 0; i < 8; i++) {
      if (templates[i].length > 0) {
        templateTitles[i] = templates[i].slice(0,templates[i].indexOf("\n"));
        let withoutTitleTemplate = templates[i].slice(templates[i].indexOf("\n")+1);
        templateBodies[i] = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate);
      } else {
        templateTitles[i] = "";       // Ensure title and template are empty strings in case user deleted the template
        templateBodies[i] = "";        //  and will not be added to insert template menu
      };
    };
    weatherTemplateTitle1 = templateTitles[0];
    weatherTemplateTitle2 = templateTitles[1];
    weatherTemplateTitle3 = templateTitles[2];
    weatherTemplateTitle4 = templateTitles[3];
    weatherTemplateTitle5 = templateTitles[4];
    weatherTemplateTitle6 = templateTitles[5];
    weatherTemplateTitle7 = templateTitles[6];
    weatherTemplateTitle8 = templateTitles[7];
    weatherTemplateBody1 = templateBodies[0];
    weatherTemplateBody2 = templateBodies[1];
    weatherTemplateBody3 = templateBodies[2];
    weatherTemplateBody4 = templateBodies[3];
    weatherTemplateBody5 = templateBodies[4];
    weatherTemplateBody6 = templateBodies[5];
    weatherTemplateBody7 = templateBodies[6];
    weatherTemplateBody8 = templateBodies[7];

    // Get formatted strings for statusbar from templates 
    formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
    let sbWithDate  = await this.setCurrentDateTime(formattedSBTemplate1);
    formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);
    if (this.settings.statusbarActive) {
      statusbarEl.setText(sbWithDate);
    } else {
      statusbarEl.setText('');
    };

    // Get formatted string for display current weather modal 
    formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

    // Replace template strings and update DIV's 
    this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

    // • Initialize all weather update intervals • 

    // Initialize timer for DIV's Update 
    this.registerInterval(window.setInterval(async () => {
      // Update weather DIV's
      const view = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (view) {
        const file = this.app.workspace.getActiveFile();
        const filePath = file?.path;
        // Ignore this folder and any subfolders for Template String Replacement
        if (filePath?.includes(this.settings.excludeFolder)) {
          return;
        };
        // Ignore this folder and any subfolders for Template String Replacement
        if (this.settings.excludeFolder2.length > 0) {
          if (filePath?.includes(this.settings.excludeFolder2)) {
            return;
          };
        };
        let editor = view.getViewData();
        if (editor != null) {
          let classNames = ['weather_current_1', 'weather_current_2', 'weather_current_3', 'weather_current_4', 'weather_current_5', 'weather_current_6', 'weather_current_7', 'weather_current_8'];
          let templateBodies = [weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8];
          for (let i = 0; i < 8; i++) {
            if (document.getElementsByClassName(classNames[i]).length > 0) {
              if (editor.contains(`class="${classNames[i]}">`)) {
                let withDate = await this.setCurrentDateTime(templateBodies[i]);
                let idxStart = editor.indexOf(classNames[i])+19;
                let idxEnd = editor.indexOf("</div>",idxStart);
                let startStr = editor.substring(0,idxStart);
                let endStr = editor.substring(idxEnd);
                let newTemplate = startStr+withDate+endStr;
                file?.vault.modify(file, newTemplate);
              };
            };
          };
        };
      };
    }, 1 * 1000))

    // Initialize timer for statusbar cycle 
    let sbCycled = false;
    this.registerInterval(window.setInterval(async () => {
      statusbarAlertEl.setText("");
      let location = [this.settings.location_five, this.settings.location_four, this.settings.location_three, this.settings.location_two, this.settings.location_one];
      let alerts = [l5Alerts, l4Alerts, l3Alerts, l2Alerts, l1Alerts];
      if (this.settings.statusbarAlerts) {
        if (this.settings.statusbarActive) {
          for (let i = 0; i < 5; i++) {
            if (location[i].length > 0) {
              if (alerts[i].length > 0) {
                statusbarAlertEl.setText(`WEATHER ALERT - ${location[i].toUpperCase()}`);
                setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${alerts[i][0].ends.replace('T',' - ')}\n\nClick to open link...\n${alerts[i][0].description}`,{ placement: "top" })
              };
            };
          };
        };
      } else {
        statusbarAlertEl.setText('');
      };

      // Cycle statusbar 
      if (this.settings.statusbarActive) {
        if (this.settings.statusbarCycle) {
          if (sbCycled) {
            let sb1WithDate = await this.setCurrentDateTime(formattedSBTemplate1)
            statusbarEl.setText(sb1WithDate as string);
            sbCycled = false;
          } else {
            let sb2WithDate = await this.setCurrentDateTime(formattedSBTemplate2)
            statusbarEl.setText(sb2WithDate as string);
            sbCycled = true;
          };
        };
      } else {
        statusbarEl.setText('');
        statusbarAlertEl.setText('');
      };
      }, 30 * 1000))

    // Initialize and process 10 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "10") {
        this.updateWeather(10);
      }
    }, 10 * 60 * 1000))

    // Initialize and process 15 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "15") {
        this.updateWeather(15);
      }
    }, 15 * 60 * 1000))

    // Initialize and process 20 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "20") {
        this.updateWeather(20);
      }
    }, 20 * 60 * 1000))

    // Initialize and process 30 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "30") {
        this.updateWeather(30);
      }
    }, 30 * 60 * 1000))

    // Initialize and process 60 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "60") {
        this.updateWeather(60);
      }
    }, 60 * 60 * 1000))

    // • Add insert template commands • 

    // Insert template one 
    this.addCommand({
      id: 'insert-vcweather-template-one',
      name: `Insert '${weatherTemplateTitle1}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody1.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather1%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template two 
    this.addCommand({
      id: 'insert-vcweather-template-two',
      name: `Insert '${weatherTemplateTitle2}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody2.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather2%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template three 
    this.addCommand({
      id: 'insert-vcweather-template-three',
      name: `Insert '${weatherTemplateTitle3}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody3.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather3%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template four 
    this.addCommand({
      id: 'insert-vcweather-template-four',
      name: `Insert '${weatherTemplateTitle4}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody4.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather4%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template five 
    this.addCommand({
      id: 'insert-vcweather-template-five',
      name: `Insert '${weatherTemplateTitle5}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody5.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather5%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template six 
    this.addCommand({
      id: 'insert-vcweather-template-six',
      name: `Insert '${weatherTemplateTitle6}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody6.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather6%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template seven 
    this.addCommand({
      id: 'insert-vcweather-template-seven',
      name: `Insert '${weatherTemplateTitle7}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody7.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather7%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template eight 
    this.addCommand({
      id: 'insert-vcweather-template-eight',
      name: `Insert '${weatherTemplateTitle8}' template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody8.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather8%");
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
            markdownView.save;
          };
          return true;
        };
        return false;
      }
    });

    // Insert template from modal picker 
    this.addCommand({
      id: 'insert-vcweather-templates',
      name: `Insert template from picker with preview`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          if (!checking) {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);
            let editor = view?.editor;
            new InsertTemplatesModal(this.app, editor, weatherTemplateTitle1, weatherTemplateBody1, weatherTemplateTitle2, weatherTemplateBody2, weatherTemplateTitle3, weatherTemplateBody3, weatherTemplateTitle4, weatherTemplateBody4, weatherTemplateTitle5, weatherTemplateBody5, weatherTemplateTitle6, weatherTemplateBody6, weatherTemplateTitle7, weatherTemplateBody7, weatherTemplateTitle8, weatherTemplateBody8).open();
          };
          return true;
        };
        return false;
      }
    });

    // View current weather information 
    this.addCommand({
      id: 'view-current-weather',
      name: 'View current weather information',
      callback: () => {
        new DisplayWeatherModal(this.app, formattedInternalCurrentData).open();
      },
    });

    // Replace template strings 
    this.addCommand({
      id: 'replace-vcweather-template-strings',
      name: `Replace template strings`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        if (markdownView) {
          if (!checking) {
            this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8)
          };
          return true;
        };
        return false;
      }
    });

  };

  // • Plugin is being unloaded, perform any needed cleanup • 
    onunload() {

  };

  // • Load this plugins settings • 
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  };

  // • Save this plugins settings • 
  async saveSettings() {
    await this.saveData(this.settings);
  };

  // • Update this plugins settings • 
  async updatedSettings() {
    const getFormatted = new FormatTemplates;
    formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
    let sbWithDate  = await this.setCurrentDateTime(formattedSBTemplate1);
    formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);
    if (this.settings.statusbarActive) {
      statusbarEl.setText(sbWithDate);
      if (this.settings.statusbarAlerts) {
        if (l5Alerts) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_five.toUpperCase()}`)
        };
        if (l4Alerts) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_four.toUpperCase()}`)
        };
        if (l3Alerts) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_three.toUpperCase()}`)
        };
        if (l2Alerts) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_two.toUpperCase()}`)
        };
        if (l1Alerts) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_one.toUpperCase()}`)
        };
      };
    } else {
      statusbarEl.setText('');
      statusbarAlertEl.setText('');
    };

    // Get formatted strings for all weather templates 
    let templates = [this.settings.weatherTemplate1, this.settings.weatherTemplate2, this.settings.weatherTemplate3, this.settings.weatherTemplate4, this.settings.weatherTemplate5, this.settings.weatherTemplate6, this.settings.weatherTemplate7, this.settings.weatherTemplate8];
    let templateBodies = [weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8];
    let templateTitles = [weatherTemplateTitle1, weatherTemplateTitle2, weatherTemplateTitle3, weatherTemplateTitle4, weatherTemplateTitle5, weatherTemplateTitle6, weatherTemplateTitle7, weatherTemplateTitle8];
    for (let i = 0; i < 8; i++) {
      if (templates[i].length > 0) {
        templateTitles[i] = templates[i].slice(0,templates[i].indexOf("\n"));
        let withoutTitleTemplate = templates[i].slice(templates[i].indexOf("\n")+1);
        templateBodies[i] = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate);
      } else {
        templateTitles[i] = "";       // Ensure title and template are empty strings in case user deleted the template
        templateBodies[i] = "";        //  and will not be added to insert template menu
      };
    };
    weatherTemplateTitle1 = templateTitles[0];
    weatherTemplateTitle2 = templateTitles[1];
    weatherTemplateTitle3 = templateTitles[2];
    weatherTemplateTitle4 = templateTitles[3];
    weatherTemplateTitle5 = templateTitles[4];
    weatherTemplateTitle6 = templateTitles[5];
    weatherTemplateTitle7 = templateTitles[6];
    weatherTemplateTitle8 = templateTitles[7];
    weatherTemplateBody1 = templateBodies[0];
    weatherTemplateBody2 = templateBodies[1];
    weatherTemplateBody3 = templateBodies[2];
    weatherTemplateBody4 = templateBodies[3];
    weatherTemplateBody5 = templateBodies[4];
    weatherTemplateBody6 = templateBodies[5];
    weatherTemplateBody7 = templateBodies[6];
    weatherTemplateBody8 = templateBodies[7];
  };

  // • Handle external changes to data.json settings file • 
  async onExternalSettingsChange() {
    await this.loadSettings();
  };

  // • Update weather • 
  async updateWeather(delayTime: number) {
    const getResults = new UpdateWeather();
    const getFormatted = new FormatTemplates;
    // Get the new weather data for location 1 which must exist
    l1results = await getResults.getWeather(
      delayTime,
      this.settings.updateFrequency,
      this.settings.apikey,
      this.settings.location_one,
      this.settings.units,
      this.settings.language
    );
    l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
    statusbarAlertEl.setText("");
    l1Alerts = [];
    l1Alerts = getResults.getAlerts(l1results);

    // Get the new weather data for location 2
    if (this.settings.location_two.length > 0) {
      l2results = await getResults.getWeather(
        delayTime,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_two,
        this.settings.units,
        this.settings.language
      );
      statusbarAlertEl.setText("");
      l2Alerts = [];
      if (l2results != undefined) {
        l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
        l2Alerts = getResults.getAlerts(l2results);
      };
    };

    // Get the new weather data for location 3
    if (this.settings.location_three.length > 0) {
      l3results = await getResults.getWeather(
        delayTime,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_three,
        this.settings.units,
        this.settings.language
      );
      statusbarAlertEl.setText("");
      l3Alerts = [];
      if (l3results != undefined) {
        l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
        l3Alerts = getResults.getAlerts(l3results);
      };
    };
    // Get the new weather data for location 4
    if (this.settings.location_four.length > 0) {
      l4results = await getResults.getWeather(
        delayTime,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_four,
        this.settings.units,
        this.settings.language
      );
      statusbarAlertEl.setText("");
      l4Alerts = [];
      if (l4results != undefined) {
        l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
        l4Alerts = getResults.getAlerts(l4results);
      };
    };
    // Get the new weather data for location 5
    if (this.settings.location_five.length > 0) {
      l5results = await getResults.getWeather(
        delayTime,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_five,
        this.settings.units,
        this.settings.language
      );
      statusbarAlertEl.setText("");
      l5Alerts = [];
      if (l5results != undefined) {
        l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
        l5Alerts = getResults.getAlerts(l5results);
      };
    };

    // Get formatted strings for all weather templates 
    let templates = [this.settings.weatherTemplate1, this.settings.weatherTemplate2, this.settings.weatherTemplate3, this.settings.weatherTemplate4, this.settings.weatherTemplate5, this.settings.weatherTemplate6, this.settings.weatherTemplate7, this.settings.weatherTemplate8];
    let templateBodies = [weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8];
    let templateTitles = [weatherTemplateTitle1, weatherTemplateTitle2, weatherTemplateTitle3, weatherTemplateTitle4, weatherTemplateTitle5, weatherTemplateTitle6, weatherTemplateTitle7, weatherTemplateTitle8];
    for (let i = 0; i < 8; i++) {
      if (templates[i].length > 0) {
        templateTitles[i] = templates[i].slice(0,templates[i].indexOf("\n"));
        let withoutTitleTemplate = templates[i].slice(templates[i].indexOf("\n")+1);
        templateBodies[i] = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate);
      } else {
        templateTitles[i] = "";       // Ensure title and template are empty strings in case user deleted the template
        templateBodies[i] = "";        //  and will not be added to insert template menu
      };
    };
    weatherTemplateTitle1 = templateTitles[0];
    weatherTemplateTitle2 = templateTitles[1];
    weatherTemplateTitle3 = templateTitles[2];
    weatherTemplateTitle4 = templateTitles[3];
    weatherTemplateTitle5 = templateTitles[4];
    weatherTemplateTitle6 = templateTitles[5];
    weatherTemplateTitle7 = templateTitles[6];
    weatherTemplateTitle8 = templateTitles[7];
    weatherTemplateBody1 = templateBodies[0];
    weatherTemplateBody2 = templateBodies[1];
    weatherTemplateBody3 = templateBodies[2];
    weatherTemplateBody4 = templateBodies[3];
    weatherTemplateBody5 = templateBodies[4];
    weatherTemplateBody6 = templateBodies[5];
    weatherTemplateBody7 = templateBodies[6];
    weatherTemplateBody8 = templateBodies[7];

    // Replace template strings and update DIV's 
    this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

    // Get formatted strings for statusbar from templates 
    formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
    formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

    // Get formatted string for display current weather modal 
    formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

  };

  // • Replace current time macros • 
  async setCurrentDateTime(template: string) {
    // | Macro               | Description                            | Replaced With Example |
    // | ------------------- | -------------------------------------- | --------------------- |
    // | `%year1-now%`       | Expands to the current year long       | 2024                  |
    // | `%year2-now%`       | Expands to current year short          | 24                    |
    // | `%month1-now%`      | Expands to current month               | 1 - 12                |
    // | `%month2-now%`      | Expands to current month               | 01 - 12               |
    // | `%month3-now%`      | Expands to current month               | Jan                   |
    // | `%month4-now%`      | Expands to current month               | January               |
    // | `%date1-now%`       | Expands to current month               | 1 - 31                |
    // | `%date2-now%`       | Expands to current month               | 01 - 31               |
    // | `%dow1-now%`        | Expands to current day of the week     | Sun                   |
    // | `%dow2-now%`        | Expands to current day of the week     | Sunday                |
    // | `%hours24-now%`     | Current 24 hours                       | 00 to 23, 1:00am = 13 |
    // | `%hours12-now%`     | Current 12 hours                       | 12 hours format       |
    // | `%mins-now%`        | Current minutes                        | 00 - 59               |
    // | `%secs-now%`        | Current seconds                        | 00 - 59               |
    // | `%ampm1-now%`       | AM or PM for 12 hour time              | AM or PM              |
    // | `%ampm2-now%`       | am or pm for 12 hour time              | am or pm              |

    // Current date
    const year1now = window.moment().format('YYYY');
    const year2now = window.moment().format('YY');
    const month1now = window.moment().format('M');
    const month2now = window.moment().format('MM');
    const month3now = window.moment().format('MMM');
    const month4now = window.moment().format('MMMM');
    const date1now = window.moment().format('D');
    const date2now = window.moment().format('DD');
    const dow1now = window.moment().format('ddd');
    const dow2now = window.moment().format('dddd');
    // Current time
    const hours24 = window.moment().format('HH');
    const hours12 = window.moment().format('h');
    const mins = window.moment().format('mm');
    const secs = window.moment().format('ss');
    const ampm1 = window.moment().format('A');
    const ampm2 = window.moment().format('a');
    // Replace template date/time strings
    template = template.replace(/%year1-now%/gmi, year1now);
    template = template.replace(/%year2-now%/gmi, year2now);
    template = template.replace(/%month1-now%/gmi, month1now);
    template = template.replace(/%month2-now%/gmi, month2now);
    template = template.replace(/%month3-now%/gmi, month3now);
    template = template.replace(/%month4-now%/gmi, month4now);
    template = template.replace(/%date1-now%/gmi, date1now);
    template = template.replace(/%date2-now%/gmi, date2now);
    template = template.replace(/%dow1-now%/gmi, dow1now);
    template = template.replace(/%dow2-now%/gmi, dow2now);
    template = template.replace(/%hours24-now%/gmi, hours24);
    template = template.replace(/%hours12-now%/gmi, hours12);
    template = template.replace(/%mins-now%/gmi, mins);
    template = template.replace(/%secs-now%/gmi, secs);
    template = template.replace(/%ampm1-now%/gmi, ampm1);
    template = template.replace(/%ampm2-now%/gmi, ampm2);
    return template;
  };

  // • replaceTemplateStrings - Replace any template strings in current file • 
  async replaceTemplateStrings(weatherTemplateBody1:string, weatherTemplateBody2:string, weatherTemplateBody3:string, weatherTemplateBody4:string, weatherTemplateBody5:string, weatherTemplateBody6:string, weatherTemplateBody7:string, weatherTemplateBody8:string) {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    const file = this.app.workspace.getActiveFile();
    const filePath = file?.path;
    // Ignore this folder and any subfolders for Template String Replacement
    if (filePath?.includes(this.settings.excludeFolder)) {
      return;
    };
    // Ignore this folder and any subfolders for Template String Replacement
    if (this.settings.excludeFolder2.length > 0) {
      if (filePath?.includes(this.settings.excludeFolder2)) {
        return;
      };
    };
    let editor = view.getViewData();
    if (editor == null) return;

    let macros = ["%weather1%", "%weather2%", "%weather3%", "%weather4%", "%weather5%", "%weather6%", "%weather7%", "%weather8%"];
    let templates = [this.settings.weatherTemplate1, this.settings.weatherTemplate2, this.settings.weatherTemplate3, this.settings.weatherTemplate4, this.settings.weatherTemplate5, this.settings.weatherTemplate6, this.settings.weatherTemplate7, this.settings.weatherTemplate8];
    let templateBodies = [weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8];

    for (let i = 0; i < 8; i++) {
      if (templates[i].length > 0) {
        if (editor.contains(macros[i])) {
          let withDate = await this.setCurrentDateTime(templateBodies[i]);
          let idx = editor.indexOf(macros[i]);
          let editPosStart = view.editor.offsetToPos(idx);
          let editPosEnd = view.editor.offsetToPos(idx+10);
          view.editor.replaceRange(withDate, editPosStart,editPosEnd);
          view.save();
          return;
        };
      };
    }
  };

  // • replaceDailyTemplateStrings - Replace any template strings in current file • 
  async replaceDailyTemplateStrings() {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    const file = this.app.workspace.getActiveFile();
    const filePath = file?.path;

    const fname = file?.basename;
    if (/\d{4}-\d{2}-\d{2}/.test(fname as string)) {
    
      formattedDailyData = {} as any;
      for (let i = 0; i < 15; i++) {
        if (fname === l1results.days[i].datetime) {
          // Get data from existing future dates
          formattedDailyData = Object.values(l1formattedresults)[i+3];
          break;
        };
      };
      if (Object.keys(formattedDailyData).length == 0) {
        // Get data by past date
        for (let i = 1; i < 15; i++) {
          if (fname === window.moment().subtract(i, "days").format("YYYY-MM-DD")) {

            // • Get weather for daily notes • 
            const getResults = new UpdateWeather();
            let dailyNoteResult = await getResults.getDailyNoteWeather(
              this.settings.apikey,
              this.settings.location_one,
              fname,
              this.settings.units,
              this.settings.language
            );
            formattedDailyData = getResults.processDailyWeatherData(dailyNoteResult, this.settings.units);
            break;
          };
        };
      };
      if (Object.keys(formattedDailyData).length == 0) {
        return;
      };
    } else {
      return;
    };
    
    // Ignore this folder and any subfolders for Template String Replacement
    if (filePath?.includes(this.settings.excludeFolder)) {
      return;
    };
    // Ignore this folder and any subfolders for Template String Replacement
    if (this.settings.excludeFolder2.length > 0) {
      if (filePath?.includes(this.settings.excludeFolder2)) {
        return;
      };
    };
    let editor = view.getViewData();
    if (editor == null) return;

    let macros = ["%year1-daily%", "%year2-daily%", "%month1-daily%", "%month2-daily%", "%month3-daily%", "%month4-daily%", "%date1-daily%", "%date2-daily%", "%dow1-daily%", "%dow2-daily%", "%datetime-daily%", "%datetimeepoch-daily%", "%tempmax-daily%", "%tempmin-daily%", "%tempavg-daily%", "%feelslikemax-daily%", "%feelslikemin-daily%", "%feelslikeavg-daily%", "%dew-daily%", "%humidity-daily%", "%precip-daily%", "%precipprob-daily%", "%precipcover-daily%", "%preciptype-daily%", "%snow-daily%", "%snowdepth-daily%", "%windgust-daily%", "%windspeed-daily%", "%windspeedms-daily%", "%winddirdeg-daily%", "%winddirstr-daily%", "%winddirstrshort-daily%", "%pressure-daily%", "%cloudcover-daily%", "%visibility-daily%", "%solarradiation-daily%", "%solarenergy-daily%", "%uvindex-daily%", "%severerisk-daily%", "%sunrise-daily%", "%sunriseepoch-daily%", "%sunset-daily%", "%sunsetepoch-daily%", "%moonphase-daily%", "%conditions-daily%", "%description-daily%", "%icon-daily%", "%iconurl-daily%", "%iconurlloc-daily%"];
    let macrosExpanded = [formattedDailyData.year1, formattedDailyData.year2, formattedDailyData.month1, formattedDailyData.month2, formattedDailyData.month3, formattedDailyData.month4, formattedDailyData.date1, formattedDailyData.date2, formattedDailyData.dow1, formattedDailyData.dow2, formattedDailyData.datetime, formattedDailyData.datetimeepoch, formattedDailyData.tempmax, formattedDailyData.tempmin, formattedDailyData.tempavg, formattedDailyData.feelslikemax, formattedDailyData.feelslikemin, formattedDailyData.feelslikeavg, formattedDailyData.dew, formattedDailyData.humidity, formattedDailyData.precip, formattedDailyData.precipprob, formattedDailyData.precipcover, formattedDailyData.preciptype, formattedDailyData.snow, formattedDailyData.snowdepth, formattedDailyData.windgust, formattedDailyData.windspeed, formattedDailyData.windspeedms, formattedDailyData.winddirdeg, formattedDailyData.winddirstr, formattedDailyData.winddirstrshort, formattedDailyData.pressure, formattedDailyData.cloudcover, formattedDailyData.visibility, formattedDailyData.solarradiation, formattedDailyData.solarenergy, formattedDailyData.uvindex, formattedDailyData.severerisk, formattedDailyData.sunrise, formattedDailyData.sunriseepoch, formattedDailyData.sunset, formattedDailyData.sunsetepoch, formattedDailyData.moonphase, formattedDailyData.conditions, formattedDailyData.description, formattedDailyData.icon, formattedDailyData.iconurl, formattedDailyData.iconurlloc];

    let withDate = await this.setCurrentDateTime(editor);
    for (let i = 0; i < macros.length; i++) {
      if (withDate.contains(macros[i])) {
        let variable = macros[i];
        let expression = `${variable}`;
        var re = new RegExp(expression, 'g');
        withDate = withDate.replace(re, macrosExpanded[i]);
      };
    };
    // let editPosStart = view.editor.offsetToPos(0);
    // let editPosEnd = view.editor.offsetToPos(editor.length);
    file?.vault.modify(file, withDate);
    // view.editor.replaceRange(withDate, editPosStart, editPosEnd);
    // view.save();
  };
}
