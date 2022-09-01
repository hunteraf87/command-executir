import { readdir, readFile } from 'fs/promises'
import { type Dirent } from 'fs'
import {type IInputQuestion } from './interfaces'

export class Settings {
    private apps: Map<string, string> = new Map()

    async readSettings (directory: URL): Promise<void> {
        const items = await readdir(directory, { withFileTypes: true })
        items.forEach((item: Dirent) => {
            if (item.isFile() && item.name.match(/\.json$/)) {
                this.apps.set(item.name.replace(/\.json$/, ''), `${directory}/${item.name}`)
            }
        })
    }

    async readAppSettings (app: string): Promise<IInputQuestion[]> {
        if (this.apps.has(app)) {
            const appFile = this.apps.get(app)
            if (appFile !== undefined) {
                let fileBuffer = await readFile(new URL(appFile, import.meta.url))
                const settings = JSON.parse(fileBuffer.toString()) as IInputQuestion[]
                if (Array.isArray(settings)) {
                    return settings
                }
            }
        }
        throw new Error('Error selected app.')
    }

    getApps (): Map<string, string> {
        return this.apps
    }
}