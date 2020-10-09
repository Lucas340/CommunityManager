import Command from '../../structures/Command'
import { Client } from 'discord.js'

export default class Info extends Command {
  constructor (client: Client) {
    super({
      name: 'info',
      category: 'Informations',
      requirements: {  }
    }, client)
  }

  async run () {
    
  }
}
