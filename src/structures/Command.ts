import { Client } from "discord.js"

interface Configs {
  name: string,
  aliases?: Array<string>,
  usage?: string,
  description?: string,
  hidden?: Boolean,
  category?: string,
  requirements?: {

  }
}

class Command {
  public name: string
  public aliases: Array<String>
  public usage: string
  public description: string
  public hidden: Boolean
  public category: string
  public requirements: {}
  public client: Client

  constructor (configs: Configs, client: Client) {
    this.name = configs.name
    this.aliases = configs.aliases || []
    this.usage = configs.usage || ''
    this.description = configs.description || ''
    this.hidden = configs.hidden || false
    this.category = configs.category || 'Others'

    this.requirements = configs.requirements || {}

    this.client = client;
  }

  
}

export default Command