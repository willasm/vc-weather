import { App, Modal, Setting } from "obsidian";

export default class DisplayWeatherModal extends Modal {
  data: string;

  constructor(app: App, data: string) {
    super(app);
    this.data = data
  }

  onOpen() {
    let dataJson = JSON.parse(this.data);

    const {contentEl} = this;

    contentEl.createEl("h1", {text: `${dataJson.address} - ${dataJson.dow} ${dataJson.month} ${dataJson.date} ${dataJson.year}`});

    const imgIcon = contentEl.createEl("img");
    imgIcon.setAttribute("alt", "Visual Crossing Weather Icon");
    imgIcon.src='data:image/png;base64,R0lGODlhFAAUAIAAAP///wAAACH5BAEAAAAALAAAAAAUABQAAAIRhI+py+0Po5y02ouz3rz7rxUAOw=='
    imgIcon.className = `${dataJson.icon}`
    console.log("📢imgIcon: ", imgIcon);
    const imgText = contentEl.createEl("span",{text: `${dataJson.desc}`});
    imgText.setAttribute("style","display: block; text-align: center; ");
    
    contentEl.createEl('br');

    contentEl.createEl('h4', {text: `Current tempature: ${dataJson.temp}° 🔹 Feels like: ${dataJson.feelslike}°`});
    contentEl.createEl('h4', {text: `Wind speed: ${dataJson.windspeed} 🔹 Gusting to: ${dataJson.windgust}`});
    contentEl.createEl('h4', {text: `Wind direction: ${dataJson.winddirdeg}° from the ${dataJson.winddirstr}`});
    contentEl.createEl('h4', {text: `PoP: ${dataJson.pop} 🔹 Type: ${dataJson.preciptype}`});
    contentEl.createEl('h4', {text: `Humidity: ${dataJson.humidity} 🔹 Dew point: ${dataJson.dew}°`});
    contentEl.createEl('h4', {text: `Air pressure: ${dataJson.pressure} 🔹 Visibility: ${dataJson.visibility}`});
    contentEl.createEl('h4', {text: `Solar energy: ${dataJson.solarenergy} 🔹 UV index: ${dataJson.uvindex}`});
    contentEl.createEl('h4', {text: `Sunrise: ${dataJson.sunrise} 🔹 Sunset: ${dataJson.sunset}`});

  }

  onClose() {
    const {contentEl} = this;
    contentEl.empty();
  }
}
