import winston, { Logger } from 'winston'
import { Client } from 'discord.js'

class CommunityManager extends Client {
  public logger: Logger|null;
  
  constructor () {
    super()

    this.logger = null;
  }

  async login(token: string) {
    return super.login(token)
  }

  async log() { 
    this.logger = winston.createLogger()

    if (process.env.NODE_ENV === 'production') {
      this.logger.add(new winston.transports.Console({ level: process.env.LOGGING_LEVEL || 'silly' }))
    } else {
      this.logger.add(new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          winston.format.timestamp(),
          winston.format.printf(
            info => `${info.timestamp} ${info.level}${info.label ? ` [${info.label || ''}]` : ''}: ${info.message}`
          )
        ),
        level: process.env.LOGGING_LEVEL || 'silly'
      }))
    }
  }

}

export default CommunityManager;