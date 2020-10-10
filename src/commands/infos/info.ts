import Command from '../../structures/Command'
import CommunityManager from '../../CommunityManager'
import { Message } from 'discord.js'

module.exports = class Info extends Command {
  constructor (client: CommunityManager) {
    super({
      name: 'info',
      category: 'Informations',
      requirements: {  }
    }, client)
  }

  async run ({ message }: { message: Message }) {
    message.channel.send('Hey, dude! I\'m **CommunityManager**, a bot that will be to manager your community with precision. Maybe I do not be so good, because I\'m in development state')
  }
}
