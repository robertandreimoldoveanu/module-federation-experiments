export class LoggerService {
    private _mode: DebugMode = "debug";

    log(message: string) {
        if (this._mode === "debug") {
            console.log('remote log: - ' + message);
        }
    }

    constructor() {

    }
}

type DebugMode = "debug" | "production";