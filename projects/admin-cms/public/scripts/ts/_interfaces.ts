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
  private logoURL: string;

  constructor() {
    this.screenshotURLs = [];
    this.logoURL = "";
  }

  setScreenshotURLs(screenshotURLs: string[]): void {
    this.screenshotURLs = screenshotURLs;
  }

  getScreenshotURLs(): string[] {
    return this.screenshotURLs;
  }

  setLogoURL(logoURL: string): void {
    this.logoURL = logoURL;
  }

  getLogoURL(): string {
    return this.logoURL;
  }
}
