import { App, MarkdownView, View, DropdownComponent, Editor, Modal, Setting, Plugin } from "obsidian";
import VCWPlugin from './main'

export default class InsertTemplatesModal extends Modal {
  app: App;
  editor: Editor;
  title1: string;
  template1: string;
  title2: string;
  template2: string;
  title3: string;
  template3: string;
  title4: string;
  template4: string;
  title5: string;
  template5: string;
  title6: string;
  template6: string;
  title7: string;
  template7: string;
  title8: string;
  template8: string;

  constructor(app: App, editor: any, title1: string, template1: string, title2: string, template2: string, title3: string, template3: string, title4: string, template4: string, title5: string, template5: string, title6: string, template6: string, title7: string, template7: string, title8: string, template8: string) {
    super(app);
    this.app = app;
    this.editor = editor
    this.title1 = title1;
    this.template1 = template1;
    this.title2 = title2;
    this.template2 = template2;
    this.title3 = title3;
    this.template3 = template3;
    this.title4 = title4;
    this.template4 = template4;
    this.title5 = title5;
    this.template5 = template5;
    this.title6 = title6;
    this.template6 = template6;
    this.title7 = title7;
    this.template7 = template7;
    this.title8 = title8;
    this.template8 = template8;
  }

  async onOpen() {
    const { contentEl } = this;
    let currentTemplate = 't1';

    let temp1 = await VCWPlugin.prototype.setCurrentDateTime(this.template1);
    let temp2 = await VCWPlugin.prototype.setCurrentDateTime(this.template2);
    let temp3 = await VCWPlugin.prototype.setCurrentDateTime(this.template3);
    let temp4 = await VCWPlugin.prototype.setCurrentDateTime(this.template4);
    let temp5 = await VCWPlugin.prototype.setCurrentDateTime(this.template5);
    let temp6 = await VCWPlugin.prototype.setCurrentDateTime(this.template6);
    let temp7 = await VCWPlugin.prototype.setCurrentDateTime(this.template7);
    let temp8 = await VCWPlugin.prototype.setCurrentDateTime(this.template8);

    contentEl.createEl("br");

    // Visual Crossing Header Image 
    const imageLink = contentEl.createEl("a");
    const imageHeader = contentEl.createEl("img");
    imageHeader.setAttribute("src", "https://www.visualcrossing.com/images/vclogo.svg");
    imageHeader.setAttribute("height", "125px");
    imageHeader.setAttribute("padding-top", "45px");
    imageHeader.setAttribute("width", "100%");
    imageHeader.setAttribute("alt", "Visual Crossing Corporation");
    imageHeader.setAttribute("style", "background-color: RGB(209, 198, 70); cursor: pointer; border-radius: 12px;");
    imageHeader.setAttribute("title", "Visit Visual Crossing Home Page");
    imageHeader.setAttribute("cursor", "pointer");
    imageLink.appendChild(imageHeader);
    imageLink.setAttribute('href', "https://www.visualcrossing.com/");

    contentEl.createEl("h2", { text: "Select template to insert" });

    new Setting(contentEl)
      //.setName("Name")
      .addButton(btn => {
        btn.setButtonText('Insert this template');
        btn.onClick(value => {
          this.onSelected(currentTemplate);
        })
        btn.buttonEl.setAttribute("style", "width:50%;");
      })
      .addDropdown(dropDown => {
        dropDown.addOption('t1', this.title1);
        if (this.title2.length > 0) {
          dropDown.addOption('t2', this.title2);
        };
        if (this.title3.length > 0) {
          dropDown.addOption('t3', this.title3);
        };
        if (this.title4.length > 0) {
          dropDown.addOption('t4', this.title4);
        };
        if (this.title5.length > 0) {
          dropDown.addOption('t5', this.title5);
        };
        if (this.title6.length > 0) {
          dropDown.addOption('t6', this.title6);
        };
        if (this.title7.length > 0) {
          dropDown.addOption('t7', this.title7);
        };
        if (this.title8.length > 0) {
          dropDown.addOption('t8', this.title8);
        };
        dropDown.onChange(async (value) => {
          if (value === 't1') {
            paragraph.innerText = `${temp1}`;
            currentTemplate = 't1';
          };
          if (value === 't2') {
            paragraph.innerText = `${temp2}`;
            currentTemplate = 't2';
          };
          if (value === 't3') {
            paragraph.innerText = `${temp3}`;
            currentTemplate = 't3';
          };
          if (value === 't4') {
            paragraph.innerText = `${temp4}`;
            currentTemplate = 't4';
          };
          if (value === 't5') {
            paragraph.innerText = `${temp5}`;
            currentTemplate = 't5';
          };
          if (value === 't6') {
            paragraph.innerText = `${temp6}`;
            currentTemplate = 't6';
          };
          if (value === 't7') {
            paragraph.innerText = `${temp7}`;
            currentTemplate = 't7';
          };
          if (value === 't8') {
            paragraph.innerText = `${temp8}`;
            currentTemplate = 't8';
          };
          //return value;
        })
        dropDown.selectEl.setAttribute("style", "width:100%;");
        dropDown.setValue('t1');
      })
    
      contentEl.createEl("br");
      let paragraph = contentEl.createEl("p",{text: `${this.template1}`});

  }

  async onSelected(selected: string) {
    const {contentEl} = this;
    contentEl.empty();
    this.close();

    let temp1 = await VCWPlugin.prototype.setCurrentDateTime(this.template1);
    let temp2 = await VCWPlugin.prototype.setCurrentDateTime(this.template2);
    let temp3 = await VCWPlugin.prototype.setCurrentDateTime(this.template3);
    let temp4 = await VCWPlugin.prototype.setCurrentDateTime(this.template4);
    let temp5 = await VCWPlugin.prototype.setCurrentDateTime(this.template5);
    let temp6 = await VCWPlugin.prototype.setCurrentDateTime(this.template6);
    let temp7 = await VCWPlugin.prototype.setCurrentDateTime(this.template7);
    let temp8 = await VCWPlugin.prototype.setCurrentDateTime(this.template8);

    if (selected === 't1') {
      this.editor.replaceSelection(temp1);
    };
    if (selected === 't2') {
      this.editor.replaceSelection(temp2);
    };
    if (selected === 't3') {
      this.editor.replaceSelection(temp3);
    };
    if (selected === 't4') {
      this.editor.replaceSelection(temp4);
    };
    if (selected === 't5') {
      this.editor.replaceSelection(temp5);
    };
    if (selected === 't6') {
      this.editor.replaceSelection(temp6);
    };
    if (selected === 't7') {
      this.editor.replaceSelection(temp7);
    };
    if (selected === 't8') {
      this.editor.replaceSelection(temp8);
    };
  };

  onClose() {
    const {contentEl} = this;
    contentEl.empty();
  };
};
