import inquirer from "inquirer";
export class SurveyService {
    constructor() {
        this.questions = [];
    }
    prepareQuestions(settings) {
        this.questions = settings.reduce((initial, item) => {
            initial.push({
                type: item.type,
                message: item.question,
                name: item.param,
                choices: item.choices
            });
            return initial;
        }, []);
        return this;
    }
    start() {
        return inquirer.prompt(this.questions);
    }
}
//# sourceMappingURL=survey-service.js.map