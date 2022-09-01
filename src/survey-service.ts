import inquirer, {Answers, Question} from "inquirer";
import {type IInputQuestion, IQuestion } from './interfaces'

export class SurveyService {
    private questions: Question[] = []

    prepareQuestions (settings: IInputQuestion[]): SurveyService {
        this.questions = settings.reduce((initial: IQuestion[], item: IInputQuestion) => {
            initial.push({
                type: item.type,
                message: item.question,
                name: item.param,
                choices: item.choices
            })
            return initial
        }, [])
        return this
    }

    start (): Promise<Answers> {
        return inquirer.prompt(this.questions)
    }
}