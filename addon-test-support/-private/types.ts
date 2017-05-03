export type ElementOrSelector = string | HTMLElement;
export interface EventOptions {
  bubbles?: boolean,
  cancelable?: boolean,
  [propName: string]: any;
};
