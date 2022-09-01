import {ILogger, TypeLogger} from "../interfaces";
import {TelegramLogger} from "./telegram.js";
import {ConsoleLogger} from "./console.js";

export class LoggerFactory {
    static create (typeLogger: TypeLogger): ILogger {
        switch (typeLogger) {
            case 'telegram':
                return new TelegramLogger()
            case 'console':
            default:
                return new ConsoleLogger()
        }
    }
}