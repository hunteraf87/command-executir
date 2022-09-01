import { spawn } from 'child_process';
import { LoggerFactory } from "./loggers/logger-factory.js";
export class CommandExecuter {
    constructor(app, logger) {
        this.app = app;
        this.arguments = [];
        this.defaultLogger = LoggerFactory.create('console');
        if (logger && logger !== 'console') {
            this.logger = LoggerFactory.create(logger);
        }
    }
    setArguments(answers) {
        Object.keys(answers).forEach((param) => {
            if (param.match(/^__/) && answers[param]) {
                this.arguments.push(answers[param]);
                return;
            }
            if (!answers[param]) {
                return;
            }
            switch (typeof answers[param]) {
                case "boolean":
                    this.arguments.push(param);
                    break;
            }
        });
    }
    run() {
        const command = spawn(this.app, this.arguments);
        command.stdout.on('data', (data) => {
            this.defaultLogger.log(data.toString());
        });
        command.stderr.on('data', (err) => {
            this.defaultLogger.error(err.toString());
            if (this.logger) {
                this.logger.log(`The command ${this.app} returned error`);
            }
        });
        command.on('close', () => {
            this.defaultLogger.log(`The command ${this.app} was executed successfully`);
            if (this.logger) {
                this.logger.log(`The command ${this.app} was executed successfully`);
            }
        });
    }
}
//# sourceMappingURL=command-executer.js.map