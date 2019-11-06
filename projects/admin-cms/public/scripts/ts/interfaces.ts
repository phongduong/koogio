export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
  dataTransfer: DataTransfer;
}

export interface IScreenshot {
  index: number;
  url: string;
}
