import {type ILogger} from "../interfaces";

// TODO заглушка для телеграмм
export class TelegramLogger implements ILogger {
    log(message: string): void {
        console.log('Telegram: ', message)
    }
    error(message: string): void {
        console.error('Telegram: ', message)
    }
}