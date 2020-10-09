import winston, { Logger } from 'winston'
import moment from 'moment'
import { Client } from 'discord.js'
import { init } from './api/server'

import glob from 'glob'
import path from 'path'

moment.locale('pt-br')

class CommunityManager extends Client {
  public logger: Logger;
  public commands: any[]

  constructor() {
    super({})

    this.logger = winston.createLogger()
    this.commands = []
  }

  async login(token: string) {
    return super.login(token)
  }

  async initWinston() {
    if (process.env.NODE_ENV === 'production') {
      this.logger.add(new winston.transports.Console({ level: process.env.LOGGING_LEVEL || 'silly' }))
    } else {
      this.logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(
            info => `[${moment(info.timestamp).format('DD/MM/YYYY hh:mm:ss')}] ${info.level}: ${info.message}`
          )
        ),
        level: process.env.LOGGING_LEVEL || 'silly'
      }))
    }
  }

  initComamnds() {
    glob.sync('./src/commands/**/*.ts').forEach(file => {
      this.logger.debug(`Loading command ${file}`)
      const Command = require(path.resolve(file))
      this.commands.push(new Command())
    })
  }

  async initWebSite() {
    init(this)
  }

  loadEvents() {
    glob.sync('./src/events/*.ts').forEach(file => {
      const event = new (require(`./events/${file}`))(this);

      super.on(file.split(".")[0], (...args) => event.run(...args));
    });

    return this;
  }
}

export default CommunityManager;