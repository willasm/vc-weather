import { App, Editor, MarkdownView, Modal, Notice, Plugin, setTooltip } from 'obsidian';
import { VCWSettingsTab, vcwSettings, DEFAULT_SETTINGS } from './settings';
import FormatTemplates from './formatTemplates';
import UpdateWeather from './updateWeather';
import InsertTemplatesModal from './insertWeatherModal'
import DisplayWeatherModal from './displayWeatherModal';


//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                             ● Class vcwPlugin ●                              │
//  │                                                                              │
//  │                      • Visual Crossing Weather Plugin •                      │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
export default class vcwPlugin extends Plugin {
  settings: vcwSettings;
//  weatherTemplateTitle1: string;

  async onload() {

    // location results;
    let l1results;
    let l2results;
    let l3results;
    let l4results;
    let l5results;

    // Formatted location results;
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
    const ribbonIconEl = this.addRibbonIcon('thermometer-snowflake', 'Visual Crossing Weather', (evt: MouseEvent) => {
      // Called when the user clicks the icon.
      //"insert-vcweather-templates"
      const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
      if (markdownView) {
        const view = this.app.workspace.getActiveViewOfType(MarkdownView);
        let editor = view?.editor;
        new InsertTemplatesModal(this.app, editor, weatherTemplateTitle1, weatherTemplateBody1, weatherTemplateTitle2, weatherTemplateBody2, weatherTemplateTitle3, weatherTemplateBody3, weatherTemplateTitle4, weatherTemplateBody4, weatherTemplateTitle5, weatherTemplateBody5, weatherTemplateTitle6, weatherTemplateBody6, weatherTemplateTitle7, weatherTemplateBody7, weatherTemplateTitle8, weatherTemplateBody8).open();
      };
    });

    // • Adds plugins status bar item to display weather information. Does not work on mobile apps. • 
    const statusBarItem = this.addStatusBarItem();
    statusBarItem.setText('[Visual Crossing Weather]');
    setTooltip(statusBarItem,"View detailed info on todays weather",{ placement: "top" });
    statusBarItem.addClass("statusbar-click");
    statusBarItem.addEventListener("click", () => new DisplayWeatherModal(this.app, formattedInternalCurrentData).open());

    // onload - registerEvent - 'file-open' 
    this.registerEvent(this.app.workspace.on('file-open', async (file) => {
      if (file) {
        //await new Promise(r => setTimeout(r, 2000));    // Wait for Templater to do its thing
        this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);
      }
    }));

    // onload - registerEvent - 'layout-change' 
    this.registerEvent(this.app.workspace.on('layout-change', async () => {
      //await new Promise(r => setTimeout(r, 2000));    // Wait for Templater to do its thing
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

    // Location 1 unformatted results
    l1results = await getResults.getWeather(
      0,
      this.settings.updateFrequency,
      this.settings.apikey,
      this.settings.location_one,
      this.settings.units
    );

    // Location 2 unformatted results
    if (this.settings.location_two.length > 0) {
      l2results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_two,
        this.settings.units
      );
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
    };

    // Location 5 unformatted results
    if (this.settings.location_five.length > 0) {
      l5results = await getResults.getWeather(
        0,
        this.settings.updateFrequency,
        this.settings.apikey,
        this.settings.location_five,
        this.settings.units
      );
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
      weatherTemplateBody3 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, withoutTitleTemplate8);
    } else {
      weatherTemplateTitle8 = "";       // Ensure title and template are empty strings in case user deleted the template
      weatherTemplateBody8 = "";        //   and will not be added to insert template menu
    };

    // Get formatted strings for statusbar from templates 
    formattedSBTemplate1 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate1SB);
    formattedSBTemplate2 = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, this.settings.weatherTemplate2SB);
    statusBarItem.setText(formattedSBTemplate1);

    // Get formatted string for display current weather modal 
    formattedInternalCurrentData = getFormatted.formatTemplate(l1formattedresults, l2formattedresults, l3formattedresults, l4formattedresults, l5formattedresults, internalCurrentData)

    // Replace template strings and update DIV's 
    this.replaceTemplateStrings(weatherTemplateBody1, weatherTemplateBody2, weatherTemplateBody3, weatherTemplateBody4, weatherTemplateBody5, weatherTemplateBody6, weatherTemplateBody7, weatherTemplateBody8);

    // • Initialize all weather update intervals • 

    // Initialize timer for statusbar cycle 
    let sbCycle = false;
    this.registerInterval(window.setInterval(() => {
      if (sbCycle) {
        statusBarItem.setText(formattedSBTemplate1 as string);
        sbCycle = false;
      } else {
        statusBarItem.setText(formattedSBTemplate2 as string);
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
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            5,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
          );
          if (l2results != undefined) {
            l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
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
          if (l3results != undefined) {
            l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
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
          if (l4results != undefined) {
            l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
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
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
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
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            10,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
          );
          if (l2results != undefined) {
            l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
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
          if (l3results != undefined) {
            l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
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
          if (l4results != undefined) {
            l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
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
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
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
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            15,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
          );
          if (l2results != undefined) {
            l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
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
          if (l3results != undefined) {
            l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
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
          if (l4results != undefined) {
            l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
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
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
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
          console.log("📢weatherTemplateBody4 15 Min:\n", weatherTemplateBody4);
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
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            20,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
          );
          if (l2results != undefined) {
            l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
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
          if (l3results != undefined) {
            l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
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
          if (l4results != undefined) {
            l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
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
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
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
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            30,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
          );
          if (l2results != undefined) {
            l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
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
          if (l3results != undefined) {
            l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
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
          if (l4results != undefined) {
            l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
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
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
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
        // Get the new weather data for location 2
        if (this.settings.location_two.length > 0) {
          l2results = await getResults.getWeather(
            60,
            this.settings.updateFrequency,
            this.settings.apikey,
            this.settings.location_two,
            this.settings.units
          );
          if (l2results != undefined) {
            l2formattedresults = getResults.processWeatherData(l2results, this.settings.units);
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
          if (l3results != undefined) {
            l3formattedresults = getResults.processWeatherData(l3results, this.settings.units);
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
          if (l4results != undefined) {
            l4formattedresults = getResults.processWeatherData(l4results, this.settings.units);
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
          if (l5results != undefined) {
            l5formattedresults = getResults.processWeatherData(l5results, this.settings.units);
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
            editor.replaceSelection(weatherTemplateBody1);
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
            editor.replaceSelection(weatherTemplateBody2);
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
            editor.replaceSelection(weatherTemplateBody3);
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
            editor.replaceSelection(weatherTemplateBody4);
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
            editor.replaceSelection(weatherTemplateBody5);
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
            editor.replaceSelection(weatherTemplateBody6);
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
            editor.replaceSelection(weatherTemplateBody7);
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
            editor.replaceSelection(weatherTemplateBody8);
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

  // • replaceTemplateStrings - Replace any template strings in current file • 
  async replaceTemplateStrings(weatherTemplateBody1:string, weatherTemplateBody2:string, weatherTemplateBody3:string, weatherTemplateBody4:string, weatherTemplateBody5:string, weatherTemplateBody6:string, weatherTemplateBody7:string, weatherTemplateBody8:string) {
    const view = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (!view) return;
    const file = this.app.workspace.getActiveFile();
    if (view.file?.parent?.path.includes(this.settings.excludeFolder)) return;    // Ignore this folder and any subfolders for Template String Replacement
    if (this.settings.excludeFolder2.length > 0) {
      if (view.file?.parent?.path.includes(this.settings.excludeFolder2)) return;   // Ignore this folder and any subfolders for Template String Replacement
    }
    let editor = view.getViewData();
    if (editor == null) return;
    if (this.settings.weatherTemplate1.length > 0) {
      if (editor.contains("%weather1%")) {
        editor = editor.replace(/%weather1%/gmi, weatherTemplateBody1);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate2.length > 0) {
      if (editor.contains("%weather2%")) {
        editor = editor.replace(/%weather2%/gmi, weatherTemplateBody2);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate3.length > 0) {
      if (editor.contains("%weather3%")) {
        editor = editor.replace(/%weather3%/gmi, weatherTemplateBody3);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate4.length > 0) {
      if (editor.contains("%weather4%")) {
        editor = editor.replace(/%weather4%/gmi, weatherTemplateBody4);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate5.length > 0) {
      if (editor.contains("%weather5%")) {
        editor = editor.replace(/%weather5%/gmi, weatherTemplateBody5);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate6.length > 0) {
      if (editor.contains("%weather6%")) {
        editor = editor.replace(/%weather6%/gmi, weatherTemplateBody6);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate7.length > 0) {
      if (editor.contains("%weather7%")) {
        editor = editor.replace(/%weather7%/gmi, weatherTemplateBody7);
        file?.vault.modify(file, editor);
      };
    };
    if (this.settings.weatherTemplate8.length > 0) {
      if (editor.contains("%weather8%")) {
        editor = editor.replace(/%weather8%/gmi, weatherTemplateBody8);
        file?.vault.modify(file, editor);
      };
    };
    // Update weather DIV's
    //  Need to wait for document string replacements to complete first
    await new Promise(r => setTimeout(r, 1000));
    if(document.getElementsByClassName('weather_current_1').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_1')[0];
      divEl.innerHTML = weatherTemplateBody1;
    };
    if(document.getElementsByClassName('weather_current_2').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_2')[0];
      divEl.innerHTML = weatherTemplateBody2;
    };
    if(document.getElementsByClassName('weather_current_3').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_3')[0];
      divEl.innerHTML = weatherTemplateBody3;
    };
    if(document.getElementsByClassName('weather_current_4').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_4')[0];
      divEl.innerHTML = weatherTemplateBody4;
    };
    if(document.getElementsByClassName('weather_current_5').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_5')[0];
      divEl.innerHTML = weatherTemplateBody5;
    };
    if(document.getElementsByClassName('weather_current_6').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_6')[0];
      divEl.innerHTML = weatherTemplateBody6;
    };
    if(document.getElementsByClassName('weather_current_7').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_7')[0];
      divEl.innerHTML = weatherTemplateBody7;
    };
    if(document.getElementsByClassName('weather_current_8').length > 0) {
      const divEl = document.getElementsByClassName('weather_current_8')[0];
      divEl.innerHTML = weatherTemplateBody8;
    };
  }

}
