import { TelegramLogger } from "./telegram.js";
import { ConsoleLogger } from "./console.js";
export class LoggerFactory {
    static create(typeLogger) {
        switch (typeLogger) {
            case 'telegram':
                return new TelegramLogger();
            case 'console':
            default:
                return new ConsoleLogger();
        }
    }
}
//# sourceMappingURL=logger-factory.js.map