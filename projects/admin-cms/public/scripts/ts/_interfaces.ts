export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
  dataTransfer: DataTransfer;
  value: any;
}

export interface IScreenshot {
  index: number;
  url: string;
}

export interface IImgElement extends Element {
  src: string;
}

export interface IButtonElement extends Element {
  disabled: boolean;
}

export class Data {
  private screenshotURLs: string[];
  private iconURL: string;

  constructor() {
    this.screenshotURLs = [];
    this.iconURL = "";
  }

  setScreenshotURLs(screenshotURLs: string[]): void {
    this.screenshotURLs = screenshotURLs;
  }

  getScreenshotURLs(): string[] {
    return this.screenshotURLs;
  }

  setIconURL(iconURL: string): void {
    this.iconURL = iconURL;
  }

  getIconURL(): string {
    return this.iconURL;
  }
}
