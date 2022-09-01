import { CommandExecuter } from './command-executer.js'
import { SurveyService } from "./survey-service.js"
import { Settings } from './settings.js'
import { IAppOptions } from "./interfaces";

async function execute(directorySettings: URL, options?: IAppOptions) {

    const appsSettings = new Settings()
    await appsSettings.readSettings(directorySettings)

    const serveyApp = new SurveyService().prepareQuestions([{
        type: 'list',
        param: "app",
        question: 'Выберите приложение',
        choices: Array.from(appsSettings.getApps().keys())
    }])

    const selectedApp = await serveyApp.start()
    const settings = await appsSettings.readAppSettings(selectedApp['app'])

    const Servey = new SurveyService().prepareQuestions(settings)
    const answers = await Servey.start()

    const Command = new CommandExecuter(selectedApp['app'], options?.logger)
    Command.setArguments(answers)
    Command.run()

}

export const executor = {
    execute
}

