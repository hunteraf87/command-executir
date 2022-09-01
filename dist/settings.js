import { readdir, readFile } from 'fs/promises';
export class Settings {
    constructor() {
        this.apps = new Map();
    }
    async readSettings(directory) {
        const items = await readdir(directory, { withFileTypes: true });
        items.forEach((item) => {
            if (item.isFile() && item.name.match(/\.json$/)) {
                this.apps.set(item.name.replace(/\.json$/, ''), `${directory}/${item.name}`);
            }
        });
    }
    async readAppSettings(app) {
        if (this.apps.has(app)) {
            const appFile = this.apps.get(app);
            if (appFile !== undefined) {
                let fileBuffer = await readFile(new URL(appFile, import.meta.url));
                const settings = JSON.parse(fileBuffer.toString());
                if (Array.isArray(settings)) {
                    return settings;
                }
            }
        }
        throw new Error('Error selected app.');
    }
    getApps() {
        return this.apps;
    }
}
//# sourceMappingURL=settings.js.map