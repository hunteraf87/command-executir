import { executor } from './dist/index.js'

executor.execute(new URL('./settings', import.meta.url), { logger: 'telegram' })