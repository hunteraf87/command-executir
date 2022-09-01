import {Question} from "inquirer";

export interface IInputQuestion {
    question: string,
    type: string,
    param: string,
    choices?: string[]
}

export interface IQuestion extends Question {
    choices?: string[]
}

export type TypeLogger = 'console' | 'telegram'

export interface ILogger {
    log (message: string): void
    error (message: string): void
}

export interface IAppOptions {
    logger?: TypeLogger
}