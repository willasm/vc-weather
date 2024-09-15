import { App, Modal, Setting } from "obsidian";
import { text } from "stream/consumers";

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
    imgIcon.setAttribute("src", `${dataJson.iconUrl}`);
    //imgIcon.setAttribute("height", "100%");
    //imgIcon.setAttribute("padding-top", "45px");
    //imgIcon.setAttribute("width", "100%");
    imgIcon.setAttribute("style","display: block; margin: 10px auto 20px;");
    imgIcon.setAttribute("alt", "Visual Crossing Corporation");
    //imgIcon.setAttribute("style", "background-color: RGB(209, 198, 70); cursor: pointer; border-radius: 12px;");
    imgIcon.setAttribute("title", `${dataJson.conditions}`);
    const imgText = contentEl.createEl("span",{text: `${dataJson.desc}`});
    imgText.setAttribute("style","display: block; text-align: center; ");

    contentEl.createEl('br');

    contentEl.createEl('h4', {text: `Current Tempature: ${dataJson.temp}° 🔹 Feels Like: ${dataJson.feelslike}°`});
    contentEl.createEl('h4', {text: `Wind Speed: ${dataJson.windspeed} 🔹 Gusting To: ${dataJson.windgust}`});
    contentEl.createEl('h4', {text: `Wind Direction: ${dataJson.winddirdeg}° from the ${dataJson.winddirstr}`});
    contentEl.createEl('h4', {text: `PoP: ${dataJson.pop} 🔹 Type: ${dataJson.preciptype}`});
    contentEl.createEl('h4', {text: `Humidity: ${dataJson.humidity} 🔹 Dew Point: ${dataJson.dew}°`});
    contentEl.createEl('h4', {text: `Air Pressure: ${dataJson.pressure} 🔹 Visibility: ${dataJson.visibility}`});
    contentEl.createEl('h4', {text: `Solar Energy: ${dataJson.solarenergy} 🔹 UV Index: ${dataJson.uvindex}`});
    contentEl.createEl('h4', {text: `Sunrise: ${dataJson.sunrise} 🔹 Sunset: ${dataJson.sunset}`});

  }

  onClose() {
    const {contentEl} = this;
    contentEl.empty();
  }
}
