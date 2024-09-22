import { App, Editor, MarkdownView, Modal, Notice, Plugin, setTooltip } from 'obsidian';
import { VCWSettingsTab, VCWSettings, DEFAULT_SETTINGS } from './settings';
import FormatTemplates from './formatTemplates';
import UpdateWeather from './updateWeather';
import InsertTemplatesModal from './insertWeatherModal'
import DisplayWeatherModal from './displayWeatherModal';

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

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                             ● Class VCWPlugin ●                              │
//  │                                                                              │
//  │                      • Visual Crossing Weather Plugin •                      │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
export default class VCWPlugin extends Plugin {
  settings: VCWSettings;
  statusbarAlertEl: HTMLSpanElement;



  async onload() {

    // location results
    let l1results;
    let l2results;
    let l3results;
    let l4results;
    let l5results;

    // Formatted location results
    let l1formattedresults = {};
    let l2formattedresults = {};
    let l3formattedresults = {};
    let l4formattedresults = {};
    let l5formattedresults = {};

    // Formatted template strings
    let formattedSBTemplate1 = "";
    let formattedSBTemplate2 = "";

    let weatherTemplateTitle1 = "";
    let weatherTemplateTitle2 = "";
    let weatherTemplateTitle3 = "";
    let weatherTemplateTitle4 = "";
    let weatherTemplateTitle5 = "";
    let weatherTemplateTitle6 = "";
    let weatherTemplateTitle7 = "";
    let weatherTemplateTitle8 = "";

    let weatherTemplateBody1 = "";
    let weatherTemplateBody2 = "";
    let weatherTemplateBody3 = "";
    let weatherTemplateBody4 = "";
    let weatherTemplateBody5 = "";
    let weatherTemplateBody6 = "";
    let weatherTemplateBody7 = "";
    let weatherTemplateBody8 = "";

    // Alerts
    let l1Alerts: Alerts;
    let l2Alerts: Alerts;
    let l3Alerts: Alerts;
    let l4Alerts: Alerts;
    let l5Alerts: Alerts;

    // Data for internal template used for display current weather modal
    let formattedInternalCurrentData = "";
    let internalCurrentData = '{"address":"%address%","resAddress":"%resolvedaddress%","lat":"%latitude%","lon":"%longitude%","timezone":"%timezone%","year":"%year1-today%","month":"%month3-today%","date":"%date1-today%","dow":"%dow1-today%","hours24":"%hours24%","hours12":"%hours12%","mins":"%mins%","secs":"%sec%","ampm1":"%ampm1%","ampm2":"%ampm2%","datetime":"%datetime%","temp":"%temp%","feelslike":"%feelslike%","humidity":"%humidity%","dew":"%dew%","precip":"%precip%","pop":"%precipprob%","preciptype":"%preciptype%","snow":"%snow%","snowdepth":"%snowdepth%","windgust":"%windgust%","windspeed":"%windspeed%","windspeedms":"%windspeedms%","winddirdeg":"%winddirdeg%","winddirstr":"%winddirstr%","pressure":"%pressure%","visibility":"%visibility%","solarradiation":"%solarradiation%","solarenergy":"%solarenergy%","uvindex":"%uvindex%","conditions":"%conditions%","desc":"%description-today%","iconUrl":%iconurl%,"sunrise":"%sunrise%","sunset":"%sunset%","moonphase":"%moonphase%"}'

    // • Load plugin settings • 
    await this.loadSettings();

    // • Ensure settings are configured, inform user if required items are not set. • 
    if (this.settings.apikey.length === 0 || this.settings.location_one.length === 0 || this.settings.excludeFolder.length === 0) {
      new Notice('Visual Crossing Weather plugin is missing required settings. Please configure the plugins settings.',6000);
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

    // • Adds plugins status bar item to display weather information. Does not work on mobile apps. • 
    // Statusbar weather alert
    const statusbarAlertEl = this.addStatusBarItem().createEl('span');
    statusbarAlertEl.setAttr("style","color: red;");
    statusbarAlertEl.setText("");
    setTooltip(statusbarAlertEl,"WEATHER ALERT\n\nClick to open link...",{ placement: "top" });
    statusbarAlertEl.addClass("statusbar-alert-click");
    statusbarAlertEl.addEventListener("click", () => {
      if (this.settings.location_one.length > 0) {
        if (l1Alerts.length > 0) {
          window.open(`${l1Alerts[0].link}`);
        };
      };
      if (this.settings.location_two.length > 0) {
        if (l2Alerts.length > 0) {
          window.open(`${l2Alerts[0].link}`);
        };
      };
      if (this.settings.location_three.length > 0) {
        if (l3Alerts.length > 0) {
          window.open(`${l3Alerts[0].link}`);
        };
      };
      if (this.settings.location_four.length > 0) {
        if (l4Alerts.length > 0) {
          window.open(`${l4Alerts[0].link}`);
        };
      };
      if (this.settings.location_five.length > 0) {
        if (l5Alerts.length > 0) {
          window.open(`${l5Alerts[0].link}`);
        };
      };
    });
    // Statusbar weather
    const statusBarItem = this.addStatusBarItem();
    statusBarItem.setText('[Visual Crossing Weather]');
    setTooltip(statusBarItem,"Click to view detailed info on todays weather",{ placement: "top" });
    statusBarItem.addClass("statusbar-click");
    statusBarItem.addEventListener("click", () => new DisplayWeatherModal(this.app, formattedInternalCurrentData).open());

    // onload - registerEvent - 'file-open' 
    this.registerEvent(this.app.workspace.on('file-open', async (file) => {
      if (file) {
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
      }
    }));

    // onload - registerEvent - 'layout-change' 
    this.registerEvent(this.app.workspace.on('layout-change', async () => {
      this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
    }));

    // onload - registerEvent - 'resolved' 
    this.registerEvent(this.app.metadataCache.on('resolved', async () => {
      this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
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
        this.settings.units
      );
      // get alerts
      l5Alerts = getResults.getAlerts(l5results);
      if (l5Alerts.length > 0) {
        statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_five.toUpperCase()} - ${l5Alerts[0].headline}`);
        setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l5Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l5Alerts[0].description}`,{ placement: "top" })
        new Notice(`WEATHER ALERT...\n\n${this.settings.location_five.toUpperCase()}\n\n${l5Alerts[0].headline}`,8000);
      };
    };

    // Location 4 unformatted results
    if (this.settings.location_four.length > 0) {
      l4results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_four,
        this.settings.units
      );
      // get alerts
      l4Alerts = getResults.getAlerts(l4results);
      if (l4Alerts.length > 0) {
        statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_four.toUpperCase()} - ${l4Alerts[0].headline}`);
        setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l4Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l4Alerts[0].description}`,{ placement: "top" })
        new Notice(`WEATHER ALERT...\n\n${this.settings.location_four.toUpperCase()}\n\n${l4Alerts[0].headline}`,8000);
      };
    };

    // Location 3 unformatted results
    if (this.settings.location_three.length > 0) {
      l3results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_three,
        this.settings.units
      );
      // get alerts
      l3Alerts = getResults.getAlerts(l3results);
      if (l3Alerts.length > 0) {
        statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_three.toUpperCase()} - ${l3Alerts[0].headline}`);
        setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l3Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l3Alerts[0].description}`,{ placement: "top" })
        new Notice(`WEATHER ALERT...\n\n${this.settings.location_three.toUpperCase()}\n\n${l3Alerts[0].headline}`,8000);
      };
    };

    // Location 2 unformatted results
    if (this.settings.location_two.length > 0) {
      l2results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_two,
        this.settings.units
      );
      // get alerts
      l2Alerts = getResults.getAlerts(l2results);
      if (l2Alerts.length > 0) {
        statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_two.toUpperCase()} - ${l2Alerts[0].headline}`);
        setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l2Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l2Alerts[0].description}`,{ placement: "top" })
        new Notice(`WEATHER ALERT...\n\n${this.settings.location_two.toUpperCase()}\n\n${l2Alerts[0].headline}`,8000);
      };
    };

    // Location 1 unformatted results
    l1results = await getResults.getWeather(
      0,
      this.settings.updateFrequency,
      this.settings.apikey,
      this.settings.location_one,
      this.settings.units
    );
    // get alerts
    l1Alerts = getResults.getAlerts(l1results);
    if (l1Alerts.length > 0) {
      statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_one.toUpperCase()} - ${l1Alerts[0].headline}`);
      setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l1Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l1Alerts[0].description}`,{ placement: "top" })
      new Notice(`WEATHER ALERT...\n\n${this.settings.location_one.toUpperCase()}\n\n${l1Alerts[0].headline}`,8000);
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

    // Get formatted string for weather 1 from template 
    const getFormatted = new FormatTemplates;
    if (this.settings.weatherTemplate1.length > 0) {
      weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
      let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
      weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
    } else {
      weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody1 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 2 from template 
    if (this.settings.weatherTemplate2.length > 0) {
      weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
      let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
      weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
    } else {
      weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody2 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 3 from template 
    if (this.settings.weatherTemplate3.length > 0) {
      weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
      let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
      weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
    } else {
      weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody3 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 4 from template 
    if (this.settings.weatherTemplate4.length > 0) {
      weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
      let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
      weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
    } else {
      weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody4 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 5 from template 
    if (this.settings.weatherTemplate5.length > 0) {
      weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
      let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
      weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
    } else {
      weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody5 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 6 from template 
    if (this.settings.weatherTemplate6.length > 0) {
      weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
      let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
      weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
    } else {
      weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody6 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 7 from template 
    if (this.settings.weatherTemplate7.length > 0) {
      weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
      let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
      weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
    } else {
      weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody7 = "";        //   and will not be added to insert template menu
    };

    // Get formatted string for weather 8 from template 
    if (this.settings.weatherTemplate8.length > 0) {
      weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
      let withoutTitleTemplate8 = this.settings.weatherTemplate8.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
      weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
    } else {
      weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody8 = "";        //   and will not be added to insert template menu
    };

    // Get formatted strings for statusbar from templates 
    formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
    let sbWithDate  = await this.setCurrentDateTime(formattedSBTemplate1);
    formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);
    statusBarItem.setText(sbWithDate);

    // Get formatted string for display current weather modal 
    formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

    // Replace template strings and update DIV's 
    this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

    // • Initialize all weather update intervals • 

    // Initialize timer for DIV's Update 
    this.registerInterval(window.setInterval(async () => {
    // Update weather DIV's
    if(document.getElementsByClassName('weather_current_1').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_1')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody1);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_2').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_2')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody2);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_3').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_3')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody3);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_4').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_4')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody4);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_5').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_5')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody5);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_6').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_6')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody6);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_7').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_7')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody7);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_8').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_8')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody8);
      divEl.innerHTML = withDate;
    };
    }, 1 * 1000))

    // Initialize timer for statusbar cycle 
    let sbCycle = false;
    this.registerInterval(window.setInterval(async () => {
      statusbarAlertEl.setText("");
      if (this.settings.location_five.length > 0) {
        if (l5Alerts.length > 0) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_five.toUpperCase()} - ${l5Alerts[0].headline}`);
          setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l5Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l5Alerts[0].description}`,{ placement: "top" })
        };
      };
      if (this.settings.location_four.length > 0) {
        if (l4Alerts.length > 0) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_four.toUpperCase()} - ${l4Alerts[0].headline}`);
         setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l4Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l4Alerts[0].description}`,{ placement: "top" })
        };
      };
      if (this.settings.location_three.length > 0) {
        if (l3Alerts.length > 0) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_three.toUpperCase()} - ${l3Alerts[0].headline}`);
          setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l3Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l3Alerts[0].description}`,{ placement: "top" })
        };
      };
      if (this.settings.location_two.length > 0) {
        if (l2Alerts.length > 0) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_two.toUpperCase()} - ${l2Alerts[0].headline}`);
          setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l2Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l2Alerts[0].description}`,{ placement: "top" })
        };
      };
      if (this.settings.location_one.length > 0) {
        if (l1Alerts.length > 0) {
          statusbarAlertEl.setText(`WEATHER ALERT - ${this.settings.location_one.toUpperCase()} - ${l1Alerts[0].headline}`);
          setTooltip(statusbarAlertEl,`WEATHER ALERT\n\nENDS: ${l1Alerts[0].ends.replace('T',' - ')}\n\nClick to open link...\n${l1Alerts[0].description}`,{ placement: "top" })
        };
      };

      if (sbCycle) {
        let sb1WithDate = await this.setCurrentDateTime(formattedSBTemplate1)
        statusBarItem.setText(sb1WithDate as string);
        sbCycle = false;
      } else {
        let sb2WithDate = await this.setCurrentDateTime(formattedSBTemplate2)
        statusBarItem.setText(sb2WithDate as string);
        sbCycle = true;
      };
    }, 30 * 1000))
    
    // Initialize and process 5 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "5") {
        //Get the new weather data for location 1 which must exist
        l1results = await getResults.getWeather(
          5,
          this.settings.updateFrequency,
          this.settings.apikey,
          this.settings.location_one,
          this.settings.units
        );
        l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
        statusbarAlertEl.setText("");
        l1Alerts = [];
        l1Alerts = getResults.getAlerts(l1results);

        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            5,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
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
            5,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_three,
            this.settings.units
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
            5,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_four,
            this.settings.units
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
            5,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_five,
            this.settings.units
          );
          statusbarAlertEl.setText("");
          l5Alerts = [];
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
            l5Alerts = getResults.getAlerts(l5results);
          };
        };
            
        // Get formatted string for weather 1 from template 
        if (this.settings.weatherTemplate1.length > 0) {
          weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
          let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
          weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
        } else {
          weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody1 = "";
        };
        // Get formatted string for weather 2 from template 
        if (this.settings.weatherTemplate2.length > 0) {
          weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
          let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
          weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
        } else {
          weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody2 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 3 from template 
        if (this.settings.weatherTemplate3.length > 0) {
          weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
          let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
          weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
        } else {
          weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody3 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 4 from template 
        if (this.settings.weatherTemplate4.length > 0) {
          weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
          let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
          weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
        } else {
          weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody4 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 5 from template 
        if (this.settings.weatherTemplate5.length > 0) {
          weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
          let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
          weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
        } else {
          weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody5 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 6 from template 
        if (this.settings.weatherTemplate6.length > 0) {
          weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
          let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
          weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
        } else {
          weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody6 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 7 from template 
        if (this.settings.weatherTemplate7.length > 0) {
          weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
          let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
          weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
        } else {
          weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody7 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 8 from template 
        if (this.settings.weatherTemplate8.length > 0) {
          weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
          let withoutTitleTemplate8 = this.settings.weatherTemplate8.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
          weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
        } else {
          weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody8 = "";        //   and will not be added to insert template menu
        };

        // Replace template strings and update DIV's 
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

        // Get formatted strings for statusbar from templates 
        formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
        formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

        // Get formatted string for display current weather modal 
        formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

      };
    }, 5 * 60 * 1000))

    // Initialize and process 10 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "10") {
        // Get the new weather data for location 1 which must exist
        l1results = await getResults.getWeather(
          10,
          this.settings.updateFrequency,
          this.settings.apikey,
          this.settings.location_one,
          this.settings.units
        );
        l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
        statusbarAlertEl.setText("");
        l1Alerts = [];
        l1Alerts = getResults.getAlerts(l1results);

        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            10,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
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
            10,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_three,
            this.settings.units
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
            10,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_four,
            this.settings.units
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
            10,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_five,
            this.settings.units
          );
          statusbarAlertEl.setText("");
          l5Alerts = [];
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
            l5Alerts = getResults.getAlerts(l5results);
          };
        };
            
        // Get formatted string for weather 1 from template 
        if (this.settings.weatherTemplate1.length > 0) {
          weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
          let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
          weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
        } else {
          weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody1 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 2 from template 
        if (this.settings.weatherTemplate2.length > 0) {
          weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
          let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
          weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
        } else {
          weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody2 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 3 from template 
        if (this.settings.weatherTemplate3.length > 0) {
          weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
          let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
          weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
        } else {
          weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody3 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 4 from template 
        if (this.settings.weatherTemplate4.length > 0) {
          weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
          let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
          weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
        } else {
          weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody4 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 5 from template 
        if (this.settings.weatherTemplate5.length > 0) {
          weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
          let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
          weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
        } else {
          weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody5 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 6 from template 
        if (this.settings.weatherTemplate6.length > 0) {
          weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
          let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
          weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
        } else {
          weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody6 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 7 from template 
        if (this.settings.weatherTemplate7.length > 0) {
          weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
          let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
          weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
        } else {
          weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody7 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 8 from template 
        if (this.settings.weatherTemplate8.length > 0) {
          weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
          let withoutTitleTemplate8 = this.settings.weatherTemplate8.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
          weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
        } else {
          weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody8 = "";        //   and will not be added to insert template menu
        };

        // Replace template strings and update DIV's 
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

        // Get formatted strings for statusbar from templates 
        formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
        formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

        // Get formatted string for display current weather modal 
        formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

      }
    }, 10 * 60 * 1000))

    // Initialize and process 15 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "15") {
        // Get the new weather data for location 1 which must exist
        l1results = await getResults.getWeather(
          15,
          this.settings.updateFrequency,
          this.settings.apikey,
          this.settings.location_one,
          this.settings.units
        );
        l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
        statusbarAlertEl.setText("");
        l1Alerts = [];
        l1Alerts = getResults.getAlerts(l1results);
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            15,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
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
            15,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_three,
            this.settings.units
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
            15,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_four,
            this.settings.units
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
            15,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_five,
            this.settings.units
          );
          statusbarAlertEl.setText("");
          l5Alerts = [];
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
            l5Alerts = getResults.getAlerts(l5results);
          };
        };
            
        // Get formatted string for weather 1 from template 
        if (this.settings.weatherTemplate1.length > 0) {
          weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
          let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
          weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
        } else {
          weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody1 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 2 from template 
        if (this.settings.weatherTemplate2.length > 0) {
          weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
          let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
          weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
        } else {
          weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody2 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 3 from template 
        if (this.settings.weatherTemplate3.length > 0) {
          weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
          let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
          weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
        } else {
          weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody3 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 4 from template 
        if (this.settings.weatherTemplate4.length > 0) {
          weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
          let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
          weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
        } else {
          weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody4 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 5 from template 
        if (this.settings.weatherTemplate5.length > 0) {
          weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
          let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
          weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
        } else {
          weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody5 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 6 from template 
        if (this.settings.weatherTemplate6.length > 0) {
          weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
          let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
          weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
        } else {
          weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody6 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 7 from template 
        if (this.settings.weatherTemplate7.length > 0) {
          weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
          let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
          weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
        } else {
          weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody7 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 8 from template 
        if (this.settings.weatherTemplate8.length > 0) {
          weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
          let withoutTitleTemplate8 = this.settings.weatherTemplate8.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
          weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
        } else {
          weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody8 = "";        //   and will not be added to insert template menu
        };

        // Replace template strings and update DIV's 
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

        // Get formatted strings for statusbar from templates 
        formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
        formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

        // Get formatted string for display current weather modal 
        formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

      }
    }, 15 * 60 * 1000))

    // Initialize and process 20 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "20") {
        // Get the new weather data for location 1 which must exist
        l1results = await getResults.getWeather(
          20,
          this.settings.updateFrequency,
          this.settings.apikey,
          this.settings.location_one,
          this.settings.units
        );
        l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
        statusbarAlertEl.setText("");
        l1Alerts = [];
        l1Alerts = getResults.getAlerts(l1results);
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            20,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
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
            20,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_three,
            this.settings.units
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
            20,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_four,
            this.settings.units
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
            20,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_five,
            this.settings.units
          );
          statusbarAlertEl.setText("");
          l5Alerts = [];
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
            l5Alerts = getResults.getAlerts(l5results);
          };
        };
            
        // Get formatted string for weather 1 from template 
        if (this.settings.weatherTemplate1.length > 0) {
          weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
          let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
          weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
        } else {
          weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody1 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 2 from template 
        if (this.settings.weatherTemplate2.length > 0) {
          weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
          let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
          weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
        } else {
          weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody2 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 3 from template 
        if (this.settings.weatherTemplate3.length > 0) {
          weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
          let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
          weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
        } else {
          weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody3 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 4 from template 
        if (this.settings.weatherTemplate4.length > 0) {
          weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
          let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
          weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
        } else {
          weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody4 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 5 from template 
        if (this.settings.weatherTemplate5.length > 0) {
          weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
          let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
          weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
        } else {
          weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody5 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 6 from template 
        if (this.settings.weatherTemplate6.length > 0) {
          weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
          let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
          weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
        } else {
          weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody6 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 7 from template 
        if (this.settings.weatherTemplate7.length > 0) {
          weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
          let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
          weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
        } else {
          weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody7 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 8 from template 
        if (this.settings.weatherTemplate8.length > 0) {
          weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
          let withoutTitleTemplate8 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
          weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
        } else {
          weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody8 = "";   //   and will not be added to insert template menu
        };

        // Replace template strings and update DIV's 
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

        // Get formatted strings for statusbar from templates 
        formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
        formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

        // Get formatted string for display current weather modal 
        formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

      }
    }, 20 * 60 * 1000))

    // Initialize and process 30 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "30") {
        // Get the new weather data for location 1 which must exist
        l1results = await getResults.getWeather(
          30,
          this.settings.updateFrequency,
          this.settings.apikey,
          this.settings.location_one,
          this.settings.units
        );
        l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
        statusbarAlertEl.setText("");
        l1Alerts = [];
        l1Alerts = getResults.getAlerts(l1results);
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            30,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
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
            30,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_three,
            this.settings.units
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
            30,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_four,
            this.settings.units
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
            30,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_five,
            this.settings.units
          );
          statusbarAlertEl.setText("");
          l5Alerts = [];
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
            l5Alerts = getResults.getAlerts(l5results);
          };
        };
            
        // Get formatted string for weather 1 from template 
        if (this.settings.weatherTemplate1.length > 0) {
          weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
          let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
          weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
        } else {
          weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody1 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 2 from template 
        if (this.settings.weatherTemplate2.length > 0) {
          weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
          let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
          weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
        } else {
          weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody2 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 3 from template 
        if (this.settings.weatherTemplate3.length > 0) {
          weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
          let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
          weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
        } else {
          weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody3 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 4 from template 
        if (this.settings.weatherTemplate4.length > 0) {
          weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
          let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
          weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
        } else {
          weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody4 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 5 from template 
        if (this.settings.weatherTemplate5.length > 0) {
          weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
          let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
          weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
        } else {
          weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody5 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 6 from template 
        if (this.settings.weatherTemplate6.length > 0) {
          weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
          let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
          weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
        } else {
          weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody6 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 7 from template 
        if (this.settings.weatherTemplate7.length > 0) {
          weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
          let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
          weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
        } else {
          weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody7 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 8 from template 
        if (this.settings.weatherTemplate8.length > 0) {
          weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
          let withoutTitleTemplate8 = this.settings.weatherTemplate8.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
          weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
        } else {
          weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody8 = "";        //   and will not be added to insert template menu
        };

        // Replace template strings and update DIV's 
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

        // Get formatted strings for statusbar from templates 
        formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
        formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

        // Get formatted string for display current weather modal 
        formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

      }
    }, 30 * 60 * 1000))

    // Initialize and process 60 minutes intervals 
    this.registerInterval(window.setInterval(async () => {
      if (this.settings.updateFrequency == "60") {
        // Get the new weather data for location 1 which must exist
        l1results = await getResults.getWeather(
          60,
          this.settings.updateFrequency,
          this.settings.apikey,
          this.settings.location_one,
          this.settings.units
        );
        l1formattedresults = getResults.processWeatherData(l1results, this.settings.units);
        statusbarAlertEl.setText("");
        l1Alerts = [];
        l1Alerts = getResults.getAlerts(l1results);
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            60,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
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
            60,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_three,
            this.settings.units
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
            60,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_four,
            this.settings.units
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
            60,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_five,
            this.settings.units
          );
          statusbarAlertEl.setText("");
          l5Alerts = [];
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
            l5Alerts = getResults.getAlerts(l5results);
          };
        };
            
        // Get formatted string for weather 1 from template 
        if (this.settings.weatherTemplate1.length > 0) {
          weatherTemplateTitle1 = this.settings.weatherTemplate1.slice(0,this.settings.weatherTemplate1.indexOf("\n"));
          let withoutTitleTemplate1 = this.settings.weatherTemplate1.slice(this.settings.weatherTemplate1.indexOf("\n")+1);
          weatherTemplateBody1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate1);
        } else {
          weatherTemplateTitle1 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody1 = "";
        };
        // Get formatted string for weather 2 from template 
        if (this.settings.weatherTemplate2.length > 0) {
          weatherTemplateTitle2 = this.settings.weatherTemplate2.slice(0,this.settings.weatherTemplate2.indexOf("\n"));
          let withoutTitleTemplate2 = this.settings.weatherTemplate2.slice(this.settings.weatherTemplate2.indexOf("\n")+1);
          weatherTemplateBody2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate2);
        } else {
          weatherTemplateTitle2 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody2 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 3 from template 
        if (this.settings.weatherTemplate3.length > 0) {
          weatherTemplateTitle3 = this.settings.weatherTemplate3.slice(0,this.settings.weatherTemplate3.indexOf("\n"));
          let withoutTitleTemplate3 = this.settings.weatherTemplate3.slice(this.settings.weatherTemplate3.indexOf("\n")+1);
          weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate3);
        } else {
          weatherTemplateTitle3 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody3 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 4 from template 
        if (this.settings.weatherTemplate4.length > 0) {
          weatherTemplateTitle4 = this.settings.weatherTemplate4.slice(0,this.settings.weatherTemplate4.indexOf("\n"));
          let withoutTitleTemplate4 = this.settings.weatherTemplate4.slice(this.settings.weatherTemplate4.indexOf("\n")+1);
          weatherTemplateBody4 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate4);
        } else {
          weatherTemplateTitle4 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody4 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 5 from template 
        if (this.settings.weatherTemplate5.length > 0) {
          weatherTemplateTitle5 = this.settings.weatherTemplate5.slice(0,this.settings.weatherTemplate5.indexOf("\n"));
          let withoutTitleTemplate5 = this.settings.weatherTemplate5.slice(this.settings.weatherTemplate5.indexOf("\n")+1);
          weatherTemplateBody5 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate5);
        } else {
          weatherTemplateTitle5 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody5 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 6 from template 
        if (this.settings.weatherTemplate6.length > 0) {
          weatherTemplateTitle6 = this.settings.weatherTemplate6.slice(0,this.settings.weatherTemplate6.indexOf("\n"));
          let withoutTitleTemplate6 = this.settings.weatherTemplate6.slice(this.settings.weatherTemplate6.indexOf("\n")+1);
          weatherTemplateBody6 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate6);
        } else {
          weatherTemplateTitle6 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody6 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 7 from template 
        if (this.settings.weatherTemplate7.length > 0) {
          weatherTemplateTitle7 = this.settings.weatherTemplate7.slice(0,this.settings.weatherTemplate7.indexOf("\n"));
          let withoutTitleTemplate7 = this.settings.weatherTemplate7.slice(this.settings.weatherTemplate7.indexOf("\n")+1);
          weatherTemplateBody7 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate7);
        } else {
          weatherTemplateTitle7 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody7 = "";        //   and will not be added to insert template menu
        };
        // Get formatted string for weather 8 from template 
        if (this.settings.weatherTemplate8.length > 0) {
          weatherTemplateTitle8 = this.settings.weatherTemplate8.slice(0,this.settings.weatherTemplate8.indexOf("\n"));
          let withoutTitleTemplate8 = this.settings.weatherTemplate8.slice(this.settings.weatherTemplate8.indexOf("\n")+1);
          weatherTemplateBody8 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
        } else {
          weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
          weatherTemplateBody8 = "";        //   and will not be added to insert template menu
        };

        // Replace template strings and update DIV's 
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

        // Get formatted strings for statusbar from templates 
        formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
        formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);

        // Get formatted string for display current weather modal 
        formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

      }
    }, 60 * 60 * 1000))

    // • Add insert template commands • 

    // Insert template one 
    this.addCommand({
      id: 'insert-vcweather-template-one',
      name: `Insert '${weatherTemplateTitle1}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody1.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather1%"); //weatherTemplateBody1
          };
          return true;
        };
        return false;
      }
    });

    // Insert template two 
    this.addCommand({
      id: 'insert-vcweather-template-two',
      name: `Insert '${weatherTemplateTitle2}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody2.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather2%"); //weatherTemplateBody2
          };
          return true;
        };
        return false;
      }
    });

    // Insert template three 
    this.addCommand({
      id: 'insert-vcweather-template-three',
      name: `Insert '${weatherTemplateTitle3}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody3.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather3%"); //weatherTemplateBody3
          };
          return true;
        };
        return false;
      }
    });

    // Insert template four 
    this.addCommand({
      id: 'insert-vcweather-template-four',
      name: `Insert '${weatherTemplateTitle4}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody4.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather4%"); //weatherTemplateBody4
          };
          return true;
        };
        return false;
      }
    });

    // Insert template five 
    this.addCommand({
      id: 'insert-vcweather-template-five',
      name: `Insert '${weatherTemplateTitle5}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody5.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather5%"); //weatherTemplateBody5
          };
          return true;
        };
        return false;
      }
    });

    // Insert template six 
    this.addCommand({
      id: 'insert-vcweather-template-six',
      name: `Insert '${weatherTemplateTitle6}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody6.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather6%"); //weatherTemplateBody6
          }
          return true;
        }
        return false;
      }
    });

    // Insert template seven 
    this.addCommand({
      id: 'insert-vcweather-template-seven',
      name: `Insert '${weatherTemplateTitle7}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody7.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather7%"); //weatherTemplateBody7
          }
          return true;
        }
        return false;
      }
    });

    // Insert template eight 
    this.addCommand({
      id: 'insert-vcweather-template-eight',
      name: `Insert '${weatherTemplateTitle8}' Template`,
      editorCheckCallback: (checking: boolean, editor: Editor, view: MarkdownView) => {
        const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
        const weatherOneLength = weatherTemplateBody8.length;
        if (markdownView && weatherOneLength) {
          if (!checking) {
            editor.replaceSelection("%weather8%"); //weatherTemplateBody8
          }
          return true;
        }
        return false;
      }
    });

    // Insert template from modal picker 
    this.addCommand({
      id: 'insert-vcweather-templates',
      name: `Insert Template from Picker with Preview`,
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

    // Replace template strings 
    this.addCommand({
      id: 'replace-vcweather-template-strings',
      name: `Replace Template Strings`,
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

  // • Handle external changes to data.json settings file • 
  async onExternalSettingsChange() {
    await this.loadSettings();
  };

  // • Handle external changes to data.json settings file • 
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
    // Date strings
    const dow1str = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
    const dow2str = ["Sunday","Monday","Tueday","Wednesday","Thursday","Friday","Saturday"]
    const months1 = ["1","2","3","4","5","6","7","8","9","10","11","12"];
    const months2 = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    const months3 = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const months4 = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    const d = new Date();
    const year1now = d.getFullYear().toString();
    const year2now = d.getFullYear().toString().slice(-2);
    const month1now = months1[d.getMonth()];
    const month2now = months2[d.getMonth()];
    const month3now = months3[d.getMonth()];
    const month4now = months4[d.getMonth()];
    const date1now = d.getDate().toString();
    const date2now = date1now.padStart(2,"0");
    const downow = d.getDay();
    const dow1now = dow1str[downow];
    const dow2now = dow2str[downow];
    // Current time
    const hours24num = d.getHours();
    const hours24 = d.getHours().toString().padStart(2,'0');
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
    const mins = d.getMinutes().toString().padStart(2,'0');
    const secs = d.getSeconds().toString().padStart(2,'0');
    let ampm1 = "AM";
    let ampm2 = "am";
    if (hours24num > 11) {
      ampm1 = "PM";
      ampm2 = "pm"
    };
    // Replace template strings
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
    if (view.file?.parent?.path.includes(this.settings.excludeFolder)) return;      // Ignore this folder and any subfolders for Template String Replacement
    if (this.settings.excludeFolder2.length > 0) {
      if (view.file?.parent?.path.includes(this.settings.excludeFolder2)) return;   // Ignore this folder and any subfolders for Template String Replacement
    }
    let editor = view.getViewData();
    if (editor == null) return;
    if (this.settings.weatherTemplate1.length > 0) {
      if (editor.contains("%weather1%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody1);
        let idx = editor.indexOf('%weather1%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate2.length > 0) {
      if (editor.contains("%weather2%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody2);
        let idx = editor.indexOf('%weather2%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate3.length > 0) {
      if (editor.contains("%weather3%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody3);
        let idx = editor.indexOf('%weather3%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate4.length > 0) {
      if (editor.contains("%weather4%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody4);
        let idx = editor.indexOf('%weather4%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate5.length > 0) {
      if (editor.contains("%weather5%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody5);
        let idx = editor.indexOf('%weather5%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate6.length > 0) {
      if (editor.contains("%weather6%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody6);
        let idx = editor.indexOf('%weather6%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate7.length > 0) {
      if (editor.contains("%weather7%")) {
        //console.log("📢weatherTemplateBody7: ", weatherTemplateBody7);
        let withDate = await this.setCurrentDateTime(weatherTemplateBody7);
        //console.log("📢withDate: ", withDate);
        let idx = editor.indexOf('%weather7%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    if (this.settings.weatherTemplate8.length > 0) {
      if (editor.contains("%weather8%")) {
        let withDate = await this.setCurrentDateTime(weatherTemplateBody8);
        let idx = editor.indexOf('%weather8%');
        let editPosStart = view.editor.offsetToPos(idx);
        let editPosEnd = view.editor.offsetToPos(idx+10);
        view.editor.replaceRange(withDate, editPosStart,editPosEnd);
      };
    };
    // Update weather DIV's
    //  Need to wait for document string replacements to complete first
    await new Promise(r => setTimeout(r, 1000));
    if(document.getElementsByClassName('weather_current_1').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_1')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody1);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_2').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_2')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody2);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_3').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_3')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody3);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_4').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_4')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody4);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_5').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_5')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody5);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_6').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_6')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody6);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_7').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_7')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody7);
      divEl.innerHTML = withDate;
    };
    if(document.getElementsByClassName('weather_current_8').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_8')[0];
      let withDate = await this.setCurrentDateTime(weatherTemplateBody8);
      divEl.innerHTML = withDate;
    };
  }

}
