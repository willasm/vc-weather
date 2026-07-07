import { App, Modal } from "obsidian";

export default class DisplayWeatherModal extends Modal {
  data: string;

  constructor(app: App, data: string) {
    super(app);
    this.data = data;
  }

  onOpen() {
    let dataJson = JSON.parse(this.data);

    const { contentEl } = this;

    contentEl.createEl("span", { text: `${dataJson.address} - ${dataJson.dow} ${dataJson.month} ${dataJson.date} ${dataJson.year}`, cls: "current-weather-title" });

    const imgIcon = contentEl.createEl("img");
    imgIcon.setAttribute("alt", "Visual Crossing Weather Icon");
    imgIcon.className = `${dataJson.icon}-styled`;
    contentEl.createEl("span", { text: `${dataJson.desc}`, cls: "current-weather-desc" });

    contentEl.createEl('hr', { cls: "hr-vc" });

    contentEl.createEl('span', { text: `Current tempature: ${dataJson.temp}° 🔹 Feels like: ${dataJson.feelslike}°`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `Wind speed: ${dataJson.windspeed} 🔹 Gusting to: ${dataJson.windgust}`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `Wind direction: ${dataJson.winddirdeg}° from the ${dataJson.winddirstr}`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `PoP: ${dataJson.pop} 🔹 Type: ${dataJson.preciptype}`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `Humidity: ${dataJson.humidity} 🔹 Dew point: ${dataJson.dew}°`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `Air pressure: ${dataJson.pressure} 🔹 Visibility: ${dataJson.visibility}`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `Solar energy: ${dataJson.solarenergy} 🔹 UV index: ${dataJson.uvindex}`, cls: "current-weather-data" });
    contentEl.createEl('span', { text: `Sunrise: ${dataJson.sunrise} 🔹 Sunset: ${dataJson.sunset}`, cls: "current-weather-data" });

  }

  onClose() {
    const { contentEl } = this;
    contentEl.empty();
  }
}
