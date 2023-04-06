import { InjectionToken } from "@angular/core";

interface Logger {
    log: (message: string) => void;
}
export const LOGGER_SERVICE = new InjectionToken<Logger>('BaseUrl');