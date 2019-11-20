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
