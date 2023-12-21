export function debugLog(message: string, ...optionalParams: any[]) {
  if (process.env.DEBUG === "true") {
    console.log(message, ...optionalParams);
  }
}
