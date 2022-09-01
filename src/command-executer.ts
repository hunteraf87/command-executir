import { spawn } from 'child_process'
import {type Answers} from 'inquirer'
import {type ILogger, type TypeLogger} from "./interfaces";
import {LoggerFactory} from "./loggers/logger-factory.js";

export class CommandExecuter {
    private arguments: string[] = []
    private defaultLogger: ILogger
    private logger?: ILogger

    constructor(private app: string, logger?: TypeLogger) {
        this.defaultLogger = LoggerFactory.create('console')
        if (logger && logger !== 'console') {
            this.logger = LoggerFactory.create(logger)
        }
    }

    setArguments (answers: Answers): void {
        Object.keys(answers).forEach((param: string) => {
            if (param.match(/^__/) && answers[param]) {
                this.arguments.push(answers[param])
                return;
            }
            if (!answers[param]) {
                return;
            }
            switch (typeof answers[param]) {
                case "boolean":
                    this.arguments.push(param)
                    break;
                case "string":
                    this.arguments.push(`${param} ${answers[param]}`)
                    break;
            }
        })
    }

    run () {
        const command = spawn(this.app, this.arguments)
        command.stdout.on('data', (data) => {
            this.defaultLogger.log(data.toString())
        })
        command.stderr.on('data', (err) => {
            this.defaultLogger.error(err.toString())
            if (this.logger) {
                this.logger.log(`The command ${this.app} returned error`)
            }
        })
        command.on('close', () => {
            this.defaultLogger.log(`The command ${this.app} was executed successfully`)
            if (this.logger) {
                this.logger.log(`The command ${this.app} was executed successfully`)
            }
        })
    }
}