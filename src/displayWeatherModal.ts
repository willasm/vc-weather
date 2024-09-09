import { App, Modal, Setting } from "obsidian";

export default class DisplayWeatherModal extends Modal {
  constructor(app: App) {
    super(app);
  }

  onOpen() {
    const {contentEl} = this;
    contentEl.setText('This is coming soon!');
    
  }

  onClose() {
    const {contentEl} = this;
    contentEl.empty();
  }
}
