const dev = import.meta.env.DEV;
const debug = import.meta.env.DEBUGGING;


export class Logger {
  public static debug(...args: any[]): void {
    (dev || debug) && console.debug(String.fromCodePoint(0x2728), ...args);
  }
  public static info(...args: any[]): void {
    (dev || debug) && console.info(String.fromCodePoint(0x2728), ...args);
  }
  public static log(...args: any[]): void {
    (dev || debug) && console.log(String.fromCodePoint(0x2728), ...args);
  }
  public static warn(...args: any[]): void {
    (dev || debug) && console.warn(String.fromCodePoint(0x1f915), ...args);
  }
  public static error(...args: any[]): void {
    (dev || debug) && console.error(String.fromCodePoint(0x1f92f), ...args);
  }
}
