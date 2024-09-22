import { App, Plugin, Notice, PluginSettingTab, Setting, TAbstractFile, TFolder, TextAreaComponent, Platform, FileSystemAdapter } from 'obsidian';
import VCWPlugin from './main';

export interface VCWSettings {
  apikey: string;
  location_one: string;
  location_two: string;
  location_three: string;
  location_four: string;
  location_five: string;
  units: string;
  excludeFolder: string;
  excludeFolder2: string;
  updateFrequency: string;
  statusbarActive: boolean;
  statusbarCycle: boolean;
  weatherTemplate1SB: string;
  weatherTemplate2SB: string;
  weatherTemplate1: string;
  weatherTemplate2: string;
  weatherTemplate3: string;
  weatherTemplate4: string;
  weatherTemplate5: string;
  weatherTemplate6: string;
  weatherTemplate7: string;
  weatherTemplate8: string;
}

export const DEFAULT_SETTINGS: VCWSettings = {
  apikey: "",
  location_one: "",
  location_two: "",
  location_three: "",
  location_four: "",
  location_five: "",
  units: "us",
  excludeFolder: "",
  excludeFolder2: "",
  updateFrequency: "15",
  statusbarActive: true,
  statusbarCycle: true,
  weatherTemplate1SB: "🔸%address%: %dow2-now% %month3-now% %date1-now% %hours24-now%:%mins-now%:%secs-now%🔸High: %tempmax-today%° Low: %tempmin-today%°🔸Currently: %conditions% Temperature: %temp%° Feels Like: %feelslike%°🔸",
  weatherTemplate2SB: "🔸%address%: %dow2-in1day% %month3-in1day% %date1-in1day%🔸High: %tempmax-in1day%° Low: %tempmin-in1day%° 🔸 Clouds: %cloudcover-in1day% Probabilty of precipitation: %precipprob-in1day% (%preciptype-in1day%)🔸",
  weatherTemplate1: "Short one liner\n%conditions% • Current Temp: %temp%° • Feels Like: %feelslike%°\n",
  weatherTemplate2: "More detailed\n%address%: %dow2-now% %month4-now% %date1-now% - %hours12-now%:%mins-now% %ampm2-now%\nProbability of precipitation: %precipprob% • (%preciptype%)\nCurrent Temp: %temp%°C • Feels Like: %feelslike%°C\nWind: %windspeed-today% km/h from the %winddirstr-today% with gusts up to %windgust-today% km/h\nSunrise: %sunrise-today% • Sunset: %sunset-today%\n",
  weatherTemplate3: "Historical DIV\n<img src=%iconurl% />&nbsp;%month4-now% %date1-now% %year1-now% • %hours12-now%:%mins-now% %ampm2-now% • %conditions%\n&nbsp;Recorded Temp: %temp% • Felt like: %feelslike%\n&nbsp;Wind: %windspeed-today% km/h from the %winddirstr-today% with gusts up to %windgust-today% km/h\n&nbsp;Sunrise: %sunrise-today% • Sunset: %sunset-today%",
  weatherTemplate4: "Current DIV\n<img src=%iconurl%  />&nbsp;%month4-now% %date1-now% %year1-now% • %hours12-now%:%mins-now% %ampm2-now% • %conditions%\n&nbsp;Current Temp: %temp% • Feels like: %feelslike%\n&nbsp;Wind: %windspeed-today% km/h from the %winddirstr-today% with gusts up to %windgust-today% km/h\n&nbsp;Sunrise: %sunrise-today% • Sunset: %sunset-today%",
  weatherTemplate5: "",
  weatherTemplate6: "",
  weatherTemplate7: "",
  weatherTemplate8: "Today with next 3 days in a table\n|         |  Today<br>%month3-today% %date1-today%   |  %dow1-in1day%<br>%month3-in1day% %date1-in1day%  |  %dow1-in2days%<br>%month3-in2days% %date1-in2days%  |  %dow1-in3days%<br>%month3-in3days% %date1-in3days%  |\n| ------- | :---------------: | :---------------: | :---------------: | :---------------: |\n| High    | **%tempmax-today%°C**          | **%tempmax-in1day%°C**          | **%tempmax-in2days%°C**          | **%tempmax-in3days%°C**          |\n| Low     | **%tempmin-today%°C**          | **%tempmin-in1day%°C**          | **%tempmin-in2days%°C**          | **%tempmin-in3days%°C**          |\n| Skies   | %conditions-today%             | %conditions-in1day% | %conditions-in2days%           | %conditions-in3days%           |\n| PoP     | %precipprob-today%                | %precipprob-in1day%               | %precipprob-in2days%               | %precipprob-in2days%               |\n",
}

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                           ● Class VCWSettingsTab ●                           │
//  │                                                                              │
//  │                   • Visual Crossing Weather Settings Tab •                   │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
export class VCWSettingsTab extends PluginSettingTab {

  plugin: VCWPlugin;
  app: App;

  constructor(app: App, plugin: VCWPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.app = app;
  }

  async display(): Promise<void> {
    const {containerEl} = this;

    containerEl.empty();

    // • Get vault folders for exclude folder dropdown list • 
    const abstractFiles = this.app.vault.getAllLoadedFiles();
    const folders: TFolder[] = [];
    abstractFiles.forEach((folder: TAbstractFile) => {
      if (
        folder instanceof TFolder && folder.name.length > 0
      ) {
        folders.push(folder);
      }
    });

    // Get "Templates" folder if it is defined in core plugin "Templates" 
    let adapter = this.app.vault.adapter;
    let basePath = "";
    let templateFolder = "";
    if (adapter instanceof FileSystemAdapter) {
      basePath = adapter.getBasePath();
      const configDir = this.app.vault.configDir;
      const templateConfigPath = `${basePath}/${configDir}/templates.json`;
       let json = require(templateConfigPath);
      templateFolder = json.folder;
    };

    // If "Templates" folder exists and excludeFolder setting is an empty string, write template folder to settings 
    if (templateFolder.length > 0 && this.plugin.settings.excludeFolder == "") {
      this.plugin.settings.excludeFolder = templateFolder;
      await this.plugin.saveSettings();
    };

    // • Settings for Visual Crossing API • 

    // Visual Crossing Header Image 
    const imageLink = containerEl.createEl("a");
    const imageHeader = containerEl.createEl("img");
    imageHeader.setAttribute("src", "https://www.visualcrossing.com/images/vclogo.svg");
    imageHeader.setAttribute("height", "15%");
    imageHeader.setAttribute("width", "100%");
    imageHeader.setAttribute("alt", "Visual Crossing Corporation");
    imageHeader.setAttribute("style", "background-color: RGB(209, 198, 70); cursor: pointer");
    imageHeader.setAttribute("title", "Visit Visual Crossing Home Page");
    imageHeader.setAttribute("cursor", "pointer");
    imageLink.appendChild(imageHeader);
    imageLink.setAttribute('href', "https://www.visualcrossing.com/");

    // Visual Crossing button links 
    new Setting(containerEl)
    .setName('Visual Crossing Info:')
    .addButton(cb => {
      cb.setButtonText('Homepage');
      cb.setTooltip('Weather Data & API\nGlobal Forecast & History Data');
      cb.onClick(() => {
        window.open("https://www.visualcrossing.com/");
      });
    })
    .addButton(cb => {
      cb.setButtonText('About Visual Crossing');
      cb.setTooltip('Information About Visual Crossing');
      cb.onClick(() => {
        window.open("https://www.visualcrossing.com/about");
      });
    })
    .addButton(cb => {
      cb.setButtonText('Weather Query Builder');
      cb.setTooltip('Weather Query Builder');
      cb.onClick(() => {
        window.open("https://www.visualcrossing.com/weather/weather-data-services");
      });
    })
    .addButton(cb => {
      cb.setButtonText('Get API Key');
      cb.setTooltip('Sign up for your free account.\n\nSign up requires an email.\nNo credit card is required to sign up\nFree 1000 records per day.');
      cb.onClick(() => {
        window.open("https://www.visualcrossing.com/sign-up");
      });
    })

    // • This Plugins button links • 
    new Setting(containerEl)
    .setName('This Plugins Info:')
    .addButton(cb => {
      cb.setButtonText('View README.md on Github');
      cb.setTooltip('View this plugins Github Repository Readme');
      cb.onClick(() => {
        window.open("https://github.com/willasm/vc-weather#readme");
      });
    })
    .addButton(cb => {
      cb.setButtonText('Report Issues Here');
      cb.setTooltip('Have any questions, comments or bug reports? Feel free to post them here');
      cb.onClick(() => {
        window.open("https://github.com/willasm/vc-weather/issues");
      });
    })
  
    // • VCWSettingsTab - Visual Crossing API Authentication key (required) • 
    new Setting(containerEl).setName('Visual Crossing API authentication key (required)').setHeading();

    // API Key 
    new Setting(containerEl)
    .setName('API Key')
    .setDesc('Enter your Visual Crossing API Key')
    .addText(text => text
      .setPlaceholder('Enter your API key')
      .setValue(this.plugin.settings.apikey)
      .onChange(async (value) => {
        this.plugin.settings.apikey = value;
        await this.plugin.saveSettings();
      })
    );

    // • VCWSettingsTab - User Locations • 
    new Setting(containerEl).setName('Locations - Primary location is required, the others are optional').setHeading();

    // Primary location (Required) 
    new Setting(containerEl)
    .setName('Primary location')
    .setDesc('Address location for which to retrieve weather data (Eg. London,UK), partial address (London) or latitude,longitude (Eg.38.9697,-77.385)')
    .addText(text => text
      .setPlaceholder('Enter location Eg. Edmonton,AB,CA')
      .setValue(this.plugin.settings.location_one)
      .onChange(async (value) => {
        this.plugin.settings.location_one = value;
        await this.plugin.saveSettings();
      })
    );

    // Additional location One (Optional) 
    new Setting(containerEl)
    .setName('Additional location')
    .setDesc('Additional city to get weather data for (Optional) Leave blank if not required')
    .addText(text => text
      .setPlaceholder('Enter location Eg. South Bend,WA,US')
      .setValue(this.plugin.settings.location_two)
      .onChange(async (value) => {
        this.plugin.settings.location_two = value;
        await this.plugin.saveSettings();
      })
    );

    // Additional location Two (Optional) 
    new Setting(containerEl)
    .setName('Additional location')
    .setDesc('Additional city to get weather data for (Optional) Leave blank if not required')
    .addText(text => text
      .setPlaceholder('Enter location Eg. Chicago,US')
      .setValue(this.plugin.settings.location_three)
      .onChange(async (value) => {
        this.plugin.settings.location_three = value;
        await this.plugin.saveSettings();
      })
    );
    
    // Additional location Three (Optional) 
    new Setting(containerEl)
    .setName('Additional location')
    .setDesc('Additional city to get weather data for (Optional) Leave blank if not required')
    .addText(text => text
      .setPlaceholder('Enter location Eg. Calgary,CA')
      .setValue(this.plugin.settings.location_four)
      .onChange(async (value) => {
        this.plugin.settings.location_four = value;
        await this.plugin.saveSettings();
      })
    );

    // Additional location Four (Optional) 
    new Setting(containerEl)
    .setName('Additional location')
    .setDesc('Additional city to get weather data for (Optional) Leave blank if not required')
    .addText(text => text
      .setPlaceholder('Enter city Eg. South Bend,WA,US')
      .setValue(this.plugin.settings.location_five)
      .onChange(async (value) => {
        this.plugin.settings.location_five = value;
        await this.plugin.saveSettings();
      })
    );
        
    // • VCWSettingsTab - Advanced options • 
    new Setting(containerEl).setName('Advanced options').setHeading();

    // Units of measurement 
    new Setting(containerEl)
    .setName("Units of measurement")
    .setDesc("Units of measurement: United States, Metric, United Kingdom and Base")
    .addDropdown(dropDown => {
      dropDown.addOption('us', 'United States');
      dropDown.addOption('metric', 'Metric');
      dropDown.addOption('uk', 'United Kingdom');
      dropDown.addOption('base', 'Base');
      dropDown.onChange(async (value) => {
        this.plugin.settings.units = value;
        await this.plugin.saveSettings();
      })
    .setValue(this.plugin.settings.units);
    })
    .addButton(cb => {
      cb.setButtonText('View Info');
      cb.setTooltip('Weather Query Builder');
      cb.onClick(() => {
        window.open("https://www.visualcrossing.com/resources/documentation/weather-api/unit-groups-and-measurement-units/");
      });
    });

    // TODO Language (To be added later)

    // Exclude template folder 
    new Setting(containerEl)
    .setName("Exclude template folder")
    .setDesc("You need to exclude your template folder or any files containing weather template strings will have that text replaced")
    .addDropdown(dropDown => {
      folders.forEach(e => {
        dropDown.addOption(e.name,e.name);
      });
      dropDown.onChange(async (value) => {
        this.plugin.settings.excludeFolder = value;
        await this.plugin.saveSettings();
      })
    .setValue(this.plugin.settings.excludeFolder);
    });

    // Exclude template folder secondary 
    new Setting(containerEl)
    .setDesc("You may want to exclude your scripts folder as well if any files in it contain macro strings")
    .addDropdown(dropDown => {
      folders.forEach(e => {
        dropDown.addOption(e.name,e.name);
      });
      dropDown.onChange(async (value) => {
        this.plugin.settings.excludeFolder = value;
        await this.plugin.saveSettings();
      })
    .setValue(this.plugin.settings.excludeFolder2);
    });

    // Weather update frequency 
    new Setting(containerEl)
    .setName("Update frequency")
    .setDesc("Update frequency for getting weather information")
    .addDropdown(dropDown => {
      dropDown.addOption('5', 'Every 5 Minutes');
      dropDown.addOption('10', 'Every 10 Minutes');
      dropDown.addOption('15', 'Every 15 Minutes');
      dropDown.addOption('20', 'Every 20 Minutes');
      dropDown.addOption('30', 'Every 30 Minutes');
      dropDown.addOption('60', 'Every Hour');
      dropDown.onChange(async (value) => {
        this.plugin.settings.updateFrequency = value;
        await this.plugin.saveSettings();
      })
    .setValue(this.plugin.settings.updateFrequency)
  });

    // • OpenWeatherSettingsTab - Show Weather in Statusbar Options - Not available for mobile • 
    if (Platform.isDesktop) {
      new Setting(containerEl).setName('Show weather in statusbar options').setHeading();

    // Weather update frequency 
    new Setting(containerEl)
    .setName('Show weather in statusbar')
    .setDesc('Enable weather display in statusbar')
    .addToggle(toggle => toggle
      .setValue(this.plugin.settings.statusbarActive)
      .onChange(async (value) => {
        this.plugin.settings.statusbarActive = value;
        await this.plugin.saveSettings();
      }));
      
    // Cycle statusbar display 
    new Setting(containerEl)
    .setName('Cycle statusbar display')
    .setDesc('Cycle between primary and secondary statusbar templates every 30 seconds')
    .addToggle(toggle => toggle
      .setValue(this.plugin.settings.statusbarActive)
      .onChange(async (value) => {
        this.plugin.settings.statusbarActive = value;
        await this.plugin.saveSettings();
      }));
      
    // Cycle statusbar display 
    new Setting(containerEl)
    .setDesc("Weather template string for the statusbar primary")
    .addButton(cb => {
      cb.setButtonText('View Statusbar Template Documentation');
      cb.setTooltip('View Statusbar Weather Template Documentation on Github');
      cb.onClick(() => {
        window.open("https://github.com/willasm/vc-weather?tab=readme-ov-file#the-statusbar-weather-display--templates");
      })
    });
    
    // Text area for statusbar primary 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Statusbar Weather Template')
      .setValue(this.plugin.settings.weatherTemplate1SB)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate1SB = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 3);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Text area for statusbar secondary 
    new Setting(containerEl)
    .setDesc("Weather template string for the statusbar secondary")

    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Statusbar Weather Template Secondary')
      .setValue(this.plugin.settings.weatherTemplate2SB)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate2SB = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 3);
      textArea.inputEl.setAttr("cols", 80);
    });

    } else {
      this.plugin.settings.statusbarActive = false;   // Set statusbar inactive for mobile
    };

    // • VCWSettingsTab - Weather templates • 
    new Setting(containerEl).setName('Weather templates').setHeading();

    // Weather template one help button 
    new Setting(containerEl)
    .setName("Weather template 1")
    .setDesc("First line is the descriptive text used in menus for this template")
    .addButton(cb => {
      cb.setButtonText('View Template Documentation');
      cb.setTooltip('View Weather Template Documentation on Github');
      cb.onClick(() => {
        window.open("https://github.com/willasm/vc-weather?tab=readme-ov-file#the-weather-templates");
      })
    });

    // Weather template one text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 1')
      .setValue(this.plugin.settings.weatherTemplate1)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate1 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template two 
    new Setting(containerEl)
    .setName("Weather template 2")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template two text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 2')
      .setValue(this.plugin.settings.weatherTemplate2)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate2 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template three 
    new Setting(containerEl)
    .setName("Weather template 3")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template three text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 3')
      .setValue(this.plugin.settings.weatherTemplate3)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate3 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template four 
    new Setting(containerEl)
    .setName("Weather template 4")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template four text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 4')
      .setValue(this.plugin.settings.weatherTemplate4)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate4 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template five 
    new Setting(containerEl)
    .setName("Weather template 5")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template five text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 5')
      .setValue(this.plugin.settings.weatherTemplate5)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate5 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template six 
    new Setting(containerEl)
    .setName("Weather template 6")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template six text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 6')
      .setValue(this.plugin.settings.weatherTemplate6)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate6 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template seven 
    new Setting(containerEl)
    .setName("Weather template 7")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template seven text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 7')
      .setValue(this.plugin.settings.weatherTemplate7)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate7 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // Weather template eight 
    new Setting(containerEl)
    .setName("Weather template 8")
    .setDesc("First line is the descriptive text used in menus for this template")

    // Weather template eight text area 
    new Setting(containerEl)
    .addTextArea((textArea: TextAreaComponent) => {
      textArea
      .setPlaceholder('Weather template 8')
      .setValue(this.plugin.settings.weatherTemplate8)
      .onChange(async (value) => {
        this.plugin.settings.weatherTemplate8 = value;
        await this.plugin.saveSettings();
      })
      textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
      textArea.inputEl.setAttr("rows", 10);
      textArea.inputEl.setAttr("cols", 80);
    });

    // • VCWSettingsTab - Donation Support Links • 
    containerEl.createEl('hr');
    containerEl.createEl('h2', {text: 'If you would like to make a small donation to help support my work, please use one of the buttons below.'});

    // Buy me a coffee donation button 
    const bmacLink = containerEl.createEl("a");
    const bmacHeader = containerEl.createEl("img");
    bmacHeader.setAttribute("src", "https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png");
    bmacHeader.setAttribute("alt", "Buy Me A Coffee");
    bmacHeader.setAttribute("style", "height: 40px !important;width: 180px !important; cursor: pointer; border-radius: 25px;"); // 60 x 217
    bmacHeader.setAttribute("title", "Support me through Buy Me A Coffee");
    bmacHeader.setAttribute("cursor", "pointer");
    bmacLink.appendChild(bmacHeader);
    bmacLink.setAttribute('href', "https://www.buymeacoffee.com/willasm");

    // PayPal donation button 
    const paypalLink = containerEl.createEl("a");
    const paypalHeader = containerEl.createEl("img");
    paypalHeader.setAttribute("src", "https://www.paypalobjects.com/webstatic/i/logo/rebrand/ppcom.svg");
    paypalHeader.setAttribute("alt", "Donate on PayPal");
    paypalHeader.setAttribute("style", "background-color:gold; margin-left: 30px; height: 40px !important;width: 180px !important; cursor: pointer; border-radius: 25px;"); // 60 x 217
    paypalHeader.setAttribute("title", "Support me through PayPal");
    paypalHeader.setAttribute("cursor", "pointer");
    paypalLink.appendChild(paypalHeader);
    paypalLink.setAttribute('href', "https://www.paypal.com/donate/?business=RPSQD5E9KJPUL&amount=5&no_recurring=0&item_name=If+you+enjoy+using+my+software%2C+please+consider+making+a+small+donation+to+help+me+to+continue+with+my+programming+endeavors.&currency_code=CAD");

  }
}
