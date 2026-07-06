import { App, PluginSettingTab, Setting, TAbstractFile, TFolder, TextAreaComponent, Platform, setTooltip } from 'obsidian';
import VCWPlugin from './main';

export interface VCWSettings {
  apikey: string;
  location_one: string;
  location_two: string;
  location_three: string;
  location_four: string;
  location_five: string;
  units: string;
  language: string;
  excludeFolder: string;
  excludeFolder2: string;
  updateFrequency: string;
  statusbarActive: boolean;
  statusbarCycle: boolean;
  statusbarAlerts: boolean;
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
  language: "en",
  excludeFolder: "",
  excludeFolder2: "",
  updateFrequency: "15",
  statusbarActive: true,
  statusbarCycle: true,
  statusbarAlerts: true,
  weatherTemplate1SB: "🔸%address%: %dow2-now% %month3-now% %date1-now% (today)🔸High: %tempmax-today%° Low: %tempmin-today%°🔸Currently: %conditions%🔸Temp: %temp%°🔸Feels Like: %feelslike%°🔸",
  weatherTemplate2SB: "🔸%address%: %dow2-in1day% %month3-in1day% %date1-in1day% (tomorrow)🔸High: %tempmax-in1day%° Low: %tempmin-in1day%°🔸Clouds: %cloudcover-in1day%🔸PoP: %precipprob-in1day% (%preciptype-in1day%)🔸",
  weatherTemplate1: "1) Short one liner\n%conditions% • Current Temp: %temp%° • Feels Like: %feelslike%°\n",
  weatherTemplate2: "2) More detailed\n%address%: %dow2-now% %month4-now% %date1-now% - %hours12-now%:%mins-now% %ampm2-now%\nProbability of precipitation: %precipprob% • (%preciptype%)\nCurrent Temp: %temp%°C • Feels Like: %feelslike%°C\nWind: %windspeed% km/h from the %winddirstr% with gusts up to %windgust% km/h\nSunrise: %sunrise% • Sunset: %sunset%\n",
  weatherTemplate3: "3) Historical DIV\n<img src=\"%iconurl%\" />&nbsp;%month4-now% %date1-now% %year1-now% • %hours12-now%:%mins-now% %ampm2-now% • %conditions%\n&nbsp;Recorded Temp: %temp% • Felt like: %feelslike%\n&nbsp;Wind: %windspeed% km/h from the %winddirstr% with gusts up to %windgust% km/h\n&nbsp;Sunrise: %sunrise% • Sunset: %sunset%\n",
  weatherTemplate4: "4) Current DIV\n<img src=\"%iconurl%\"  />&nbsp;%month4-now% %date1-now% %year1-now% • %hours12-now%:%mins-now% %ampm2-now% • %conditions%\n&nbsp;Current Temp: %temp% • Feels like: %feelslike%\n&nbsp;Wind: %windspeed% km/h from the %winddirstr% with gusts up to %windgust% km/h\n&nbsp;Sunrise: %sunrise% • Sunset: %sunset%\n",
  weatherTemplate5: "5) Today with next 3 days in a table\n|         |  Today<br>%month3-today% %date1-today%   |  %dow1-in1day%<br>%month3-in1day% %date1-in1day%  |  %dow1-in2days%<br>%month3-in2days% %date1-in2days%  |  %dow1-in3days%<br>%month3-in3days% %date1-in3days%  |\n| ------- | :---------------: | :---------------: | :---------------: | :---------------: |\n| High    | **%tempmax-today%°C**          | **%tempmax-in1day%°C**          | **%tempmax-in2days%°C**          | **%tempmax-in3days%°C**          |\n| Low     | **%tempmin-today%°C**          | **%tempmin-in1day%°C**          | **%tempmin-in2days%°C**          | **%tempmin-in3days%°C**          |\n| Skies   | %conditions-today%             | %conditions-in1day% | %conditions-in2days%           | %conditions-in3days%           |\n| PoP     | %precipprob-today%                | %precipprob-in1day%               | %precipprob-in2days%               | %precipprob-in2days%               |\n",
  weatherTemplate6: "6) Weather in a block quote\n<blockquote class=\"quote-vc\"><br>\n%address%: %dow2-now% %month4-now% %date1-now% - %hours12-now%:%mins-now% %ampm2-now%<br>\nProbability of precipitation: %precipprob% • (%preciptype%)<br>\nCurrent Temp: %temp%°C • Feels Like: %feelslike%°C<br>\nWind: %windspeed% km/h from the %winddirstr% with gusts up to %windgust% km/h<br>\nSunrise: %sunrise% • Sunset: %sunset%<br><br>\n</blockquote>\n",
  weatherTemplate7: "7) Weather in a callout\n> [!weather-vc]- %conditions% • Current Temp: %temp%° • Feels Like: %feelslike%°\n> \n> %address%: %dow2-now% %month4-now% %date1-now% - %hours12-now%:%mins-now% %ampm2-now%\n> Probability of precipitation: %precipprob% • (%preciptype%)\n> Current Temp: %temp%°C • Feels Like: %feelslike%°C\n> Wind: %windspeed% km/h from the %winddirstr% with gusts up to %windgust% km/h\n> Sunrise: %sunrise% • Sunset: %sunset%\n",
  weatherTemplate8: "8) Weather for the next week\n<div class=\"container-vc\">\n   <div class=\"child-title\">%resolvedaddress%</div>\n  <div class=\"child-wide-day\">Today</div>\n  <div class=\"child-wide-day\">%dow1-in1day%</div>\n  <div class=\"child-wide-day\">%dow1-in2days%</div>\n  <div class=\"child-wide-day\">%dow1-in3days%</div>\n  <div class=\"child-wide-day\">%dow1-in4days%</div>\n  <div class=\"child-wide-day\">%dow1-in5days%</div>\n  <div class=\"child-wide-day\">%dow1-in6days%</div>\n  <div class=\"child-wide-date\">%month3-today% %date1-today%</div>\n  <div class=\"child-wide-date\">%month3-in1day% %date1-in1day%</div>\n  <div class=\"child-wide-date\">%month3-in2days% %date1-in2days%</div>\n  <div class=\"child-wide-date\">%month3-in3days% %date1-in3days%</div>\n  <div class=\"child-wide-date\">%month3-in4days% %date1-in4days%</div>\n  <div class=\"child-wide-date\">%month3-in5days% %date1-in5days%</div>\n  <div class=\"child-wide-date\">%month3-in6days% %date1-in6days%</div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-today%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-in1day%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-in2days%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-in3days%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-in4days%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-in5days%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-icon\"><img class=\"%icon-in6days%\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-wide-temp\">%tempmax-today%°</div>\n  <div class=\"child-wide-temp\">%tempmax-in1day%°</div>\n  <div class=\"child-wide-temp\">%tempmax-in2days%°</div>\n  <div class=\"child-wide-temp\">%tempmax-in3days%°</div>\n  <div class=\"child-wide-temp\">%tempmax-in4days%°</div>\n  <div class=\"child-wide-temp\">%tempmax-in5days%°</div>\n  <div class=\"child-wide-temp\">%tempmax-in6days%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-today%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-in1day%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-in2days%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-in3days%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-in4days%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-in5days%°</div>\n  <div class=\"child-wide-night\">Night %tempmin-in6days%°</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-today%</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-in1day%</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-in2days%</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-in3days%</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-in4days%</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-in5days%</div>\n  <div class=\"child-narrow-left\"><img class=\"cloudy-small\" src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='/></div>\n  <div class=\"child-narrow-right\">%cloudcover-in6days%</div>\n</div>\n",
};

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                           ● Class VCWSettingsTab ●                           │
//  │                                                                              │
//  │                   • Visual Crossing Weather Settings Tab •                   │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
export class VCWSettingsTab extends PluginSettingTab {

  plugin: VCWPlugin;
  app: App;
  settings: any;
  // Minimum required settings flag (true = API Key, Location, and Exclude folder set)
  dataSet: Boolean = true;

  constructor(app: App, plugin: VCWPlugin) {
    super(app, plugin);
    this.plugin = plugin;
    this.app = app;
  }

  async display(): Promise<void> {
    const { containerEl } = this;

    containerEl.empty();

    // • Get vault folders for exclude folder dropdown list • 
    const abstractFiles = this.app.vault.getAllLoadedFiles();
    const folders: TFolder[] = [];
    abstractFiles.forEach(async (folder: TAbstractFile) => {
      if (
        folder instanceof TFolder && folder.name.length > 0
      ) {
        folders.push(folder);
        // If Obsidians default templates folder exists, save it as exclude folder 
        if (folder.name.toLowerCase() === 'templates') {
          this.plugin.settings.excludeFolder = folder.name;
          await this.plugin.saveSettings();
        };
      };
    });

    // • Get status of data.json required settings (true = all required settings are defined) • 
    if ((this.plugin.settings.apikey.length === 0) || (this.plugin.settings.location_one.length === 0) || (this.plugin.settings.excludeFolder.length === 0)) {
      // If not all required settings are set then no weather updates will occur 
      this.dataSet = false;
    };

    // • VCWSettingsTab - Section API Key • 

    // API Authentication key (required) 
    new Setting(containerEl)
      .setName('API key')
      .setDesc('Enter your Visual Crossing API key (required)')
      .addText(text => text
        .setPlaceholder('Enter your API key')
        .setValue(this.plugin.settings.apikey)
        .onChange(async (value) => {
          this.plugin.settings.apikey = value;
          await this.plugin.saveSettings();
        })
      );

    // • VCWSettingsTab - Section User Locations • 
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

    // • VCWSettingsTab - Section Advanced Options • 
    new Setting(containerEl).setName('Advanced').setHeading();

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
          // if (this.dataSet) {
          //   await this.plugin.updateWeather(0);
          //   await this.plugin.updatedSettings();
          // };
        })
          .setValue(this.plugin.settings.units);
      })
      .addButton(cb => {
        cb.setButtonText('View info');
        cb.setTooltip('Weather query builder');
        cb.onClick(() => {
          window.open("https://www.visualcrossing.com/resources/documentation/weather-api/unit-groups-and-measurement-units/");
        });
      });

    // Language for API returned text 
    new Setting(containerEl)
      .setName("Language")
      .setDesc("Supported languages available Note: This only affects text returned from the Visual Crossing API")
      .addDropdown(dropDown => {
        dropDown.addOption('ar', 'Arabic');
        dropDown.addOption('bg', 'Bulgarian');
        dropDown.addOption('zh', 'Chinese');
        dropDown.addOption('cs', 'Czech');
        dropDown.addOption('da', 'Danish');
        dropDown.addOption('nl', 'Dutch');
        dropDown.addOption('en', 'English');
        dropDown.addOption('fa', 'Farsi');
        dropDown.addOption('fi', 'Finnish');
        dropDown.addOption('fr', 'French');
        dropDown.addOption('de', 'German');
        dropDown.addOption('el', 'Greek Modern');
        dropDown.addOption('he', 'Hebrew');
        dropDown.addOption('hu', 'Hungarian');
        dropDown.addOption('it', 'Italian');
        dropDown.addOption('ja', 'Japanese');
        dropDown.addOption('ko', 'Korean');
        dropDown.addOption('pl', 'Polish');
        dropDown.addOption('pt', 'Portuguese');
        dropDown.addOption('ru', 'Russian');
        dropDown.addOption('sr', 'Serbian');
        dropDown.addOption('sk', 'Slovakian');
        dropDown.addOption('es', 'Spanish');
        dropDown.addOption('sv', 'Swedish');
        dropDown.addOption('tr', 'Turkish');
        dropDown.addOption('uk', 'Ukrainian');
        dropDown.addOption('vi', 'Vietnamese');
        dropDown.onChange(async (value) => {
          this.plugin.settings.language = value;
          await this.plugin.saveSettings();
          if (this.dataSet) {
            await this.plugin.updateWeather(0);
            await this.plugin.updatedSettings();
          };
        })
          .setValue(this.plugin.settings.language);
      });

    // Exclude template folder 
    new Setting(containerEl)
      .setName("Exclude template folder (required)")
      .setDesc("You need to exclude your templates folder or any files containing weather template strings will have that text replaced")
      .addDropdown(dropDown => {
        folders.forEach(e => {
          dropDown.addOption(e.name, e.name);
        });
        dropDown.onChange(async (value) => {
          this.plugin.settings.excludeFolder = value;
          await this.plugin.saveSettings();
          // if (this.dataSet) {
          //   await this.plugin.updateWeather(0);
          //   await this.plugin.updatedSettings();
          // };
        })
          .setValue(this.plugin.settings.excludeFolder);
      });

    // Exclude template folder secondary 
    new Setting(containerEl)
      .setDesc("You may want to exclude your scripts folder as well if any files in it contain macro strings")
      .addDropdown(dropDown => {
        folders.forEach(e => {
          dropDown.addOption(e.name, e.name);
        });
        dropDown.onChange(async (value) => {
          this.plugin.settings.excludeFolder2 = value;
          await this.plugin.saveSettings();
          // if (this.dataSet) {
          //   await this.plugin.updateWeather(0);
          //   await this.plugin.updatedSettings();
          // };
        })
          .setValue(this.plugin.settings.excludeFolder2);
      });

    // Weather update frequency 
    new Setting(containerEl)
      .setName("Update frequency")
      .setDesc("Update frequency for getting weather information")
      .addDropdown(dropDown => {
        dropDown.addOption('10', 'Every 10 Minutes');
        dropDown.addOption('15', 'Every 15 Minutes');
        dropDown.addOption('20', 'Every 20 Minutes');
        dropDown.addOption('30', 'Every 30 Minutes');
        dropDown.addOption('60', 'Every Hour');
        dropDown.onChange(async (value) => {
          this.plugin.settings.updateFrequency = value;
          await this.plugin.saveSettings();
          // if (this.dataSet) {
          //   await this.plugin.updateWeather(0);
          //   await this.plugin.updatedSettings();
          // };
        })
          .setValue(this.plugin.settings.updateFrequency);
      });

    // • VCWSettingsTab - Section Show Weather in Statusbar Options (Not available for mobile) • 
    if (Platform.isDesktop) {
      new Setting(containerEl).setName('Show weather in statusbar').setHeading();

      // Show weather in statusbar 
      new Setting(containerEl)
        .setName('Show weather in statusbar')
        .setDesc('Enable weather display in statusbar')
        .addToggle(toggle => toggle
          .setValue(this.plugin.settings.statusbarActive)
          .onChange(async (value) => {
            this.plugin.settings.statusbarActive = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          }));

      // Cycle statusbar display 
      new Setting(containerEl)
        .setName('Cycle statusbar display')
        .setDesc('Cycle between primary and secondary statusbar templates every 30 seconds')
        .addToggle(toggle => toggle
          .setValue(this.plugin.settings.statusbarCycle)
          .onChange(async (value) => {
            this.plugin.settings.statusbarCycle = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          }));

      // Show alerts in statusbar 
      new Setting(containerEl)
        .setName('Show weather alerts in statusbar')
        .setDesc('Enable weather alerts display in statusbar')
        .addToggle(toggle => toggle
          .setValue(this.plugin.settings.statusbarAlerts)
          .onChange(async (value) => {
            this.plugin.settings.statusbarAlerts = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          }));

      // Weather template string for the statusbar primary 
      new Setting(containerEl)
        .setDesc("Weather template string for the statusbar primary")
        .addButton(cb => {
          cb.setButtonText('View Statusbar Template Documentation');
          cb.setTooltip('View Statusbar Weather Template Documentation on Github');
          cb.onClick(() => {
            window.open("https://github.com/willasm/vc-weather?tab=readme-ov-file#the-statusbar-weather-display--templates");
          });
        });

      // Text area for statusbar primary 
      new Setting(containerEl)
        .addTextArea((textArea: TextAreaComponent) => {
          textArea
            .setPlaceholder('Statusbar weather template')
            .setValue(this.plugin.settings.weatherTemplate1SB)
            .onChange(async (value) => {
              this.plugin.settings.weatherTemplate1SB = value;
              await this.plugin.saveSettings();
              if (this.dataSet) {
                // await this.plugin.updateWeather(0);
                await this.plugin.updatedSettings();
              };
            });
          textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
          textArea.inputEl.setAttr("rows", 3);
          textArea.inputEl.setAttr("cols", 80);
        });

      // Text area for statusbar secondary 
      new Setting(containerEl)
        .setDesc("Weather template string for the statusbar secondary");

      new Setting(containerEl)
        .addTextArea((textArea: TextAreaComponent) => {
          textArea
            .setPlaceholder('Statusbar weather template secondary')
            .setValue(this.plugin.settings.weatherTemplate2SB)
            .onChange(async (value) => {
              this.plugin.settings.weatherTemplate2SB = value;
              await this.plugin.saveSettings();
              if (this.dataSet) {
                // await this.plugin.updateWeather(0);
                await this.plugin.updatedSettings();
              };
            });
          textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
          textArea.inputEl.setAttr("rows", 3);
          textArea.inputEl.setAttr("cols", 80);
        });

    } else {
      this.plugin.settings.statusbarActive = false;   // Set statusbar inactive for mobile
    };

    // • VCWSettingsTab - Section Weather Templates • 
    new Setting(containerEl).setName('Weather templates').setHeading();

    // Weather template one help button 
    new Setting(containerEl)
      .setName("Weather template 1")
      .setDesc("First line is the descriptive text used in menus for this template")
      .addButton(cb => {
        cb.setButtonText('View template documentation');
        cb.setTooltip('View weather template documentation on Github');
        cb.onClick(() => {
          window.open("https://github.com/willasm/vc-weather?tab=readme-ov-file#the-weather-templates");
        });
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
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template two 
    new Setting(containerEl)
      .setName("Weather template 2")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template two text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 2')
          .setValue(this.plugin.settings.weatherTemplate2)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate2 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template three 
    new Setting(containerEl)
      .setName("Weather template 3")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template three text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 3')
          .setValue(this.plugin.settings.weatherTemplate3)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate3 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template four 
    new Setting(containerEl)
      .setName("Weather template 4")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template four text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 4')
          .setValue(this.plugin.settings.weatherTemplate4)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate4 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template five 
    new Setting(containerEl)
      .setName("Weather template 5")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template five text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 5')
          .setValue(this.plugin.settings.weatherTemplate5)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate5 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template six 
    new Setting(containerEl)
      .setName("Weather template 6")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template six text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 6')
          .setValue(this.plugin.settings.weatherTemplate6)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate6 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template seven 
    new Setting(containerEl)
      .setName("Weather template 7")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template seven text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 7')
          .setValue(this.plugin.settings.weatherTemplate7)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate7 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // Weather template eight 
    new Setting(containerEl)
      .setName("Weather template 8")
      .setDesc("First line is the descriptive text used in menus for this template");

    // Weather template eight text area 
    new Setting(containerEl)
      .addTextArea((textArea: TextAreaComponent) => {
        textArea
          .setPlaceholder('Weather template 8')
          .setValue(this.plugin.settings.weatherTemplate8)
          .onChange(async (value) => {
            this.plugin.settings.weatherTemplate8 = value;
            await this.plugin.saveSettings();
            if (this.dataSet) {
              // await this.plugin.updateWeather(0);
              await this.plugin.updatedSettings();
            };
          });
        textArea.inputEl.setAttr("style", "margin-top: 12px; padding-left: 0px; margin-left: 0px; margin-right: 20px;");
        textArea.inputEl.setAttr("rows", 10);
        textArea.inputEl.setAttr("cols", 80);
      });

    // • VCWSettingsTab - Section Donation Support Links • 
    containerEl.createEl('hr');
    containerEl.createEl('h2', { text: 'If you would like to make a small donation to help support my work, please use one of the buttons below.' });

    // Buy me a coffee donation button 
    const bmacLink = containerEl.createEl("a");
    const bmacHeader = containerEl.createEl("img");
    bmacHeader.className = "bmac";
    bmacLink.appendChild(bmacHeader);
    bmacLink.setAttribute('href', "https://www.buymeacoffee.com/willasm");
    setTooltip(bmacHeader, "Make a donation through Buy Me a Coffee", { delay: 500, placement: 'top' });

    // PayPal donation button 
    const paypalLink = containerEl.createEl("a");
    const paypalHeader = containerEl.createEl("img");
    paypalHeader.className = "pp";
    paypalLink.appendChild(paypalHeader);
    paypalLink.setAttribute('href', "https://www.paypal.com/donate/?business=RPSQD5E9KJPUL&amount=5&no_recurring=0&item_name=If+you+enjoy+using+my+software%2C+please+consider+making+a+small+donation+to+help+me+to+continue+with+my+programming+endeavors.&currency_code=CAD");
    setTooltip(paypalHeader, "Make a donation through PayPal", { delay: 500, placement: 'top' });

  }
}
