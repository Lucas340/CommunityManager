import { Client, Message } from "discord.js";
import CommunityManager from "../CommunityManager";

export default class {
  public client: CommunityManager

  constructor(client: CommunityManager) {
    this.client = client;
  }
  async run(message: Message) {
    const prefix = 'cm!'

    if (message.channel.type == 'dm') return
    if (message.author.bot) return
    if (!message.content.startsWith(prefix)) return

    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(prefix.length).toLowerCase();
    const cmd = this.client.commands.find(c => c.help.name.toLowerCase() === command || (c.conf.aliases && c.conf.aliases.includes(command)));

    if (!cmd) return;

    cmd.setMessage(message, args);

    const t = await this.client.getTranslate(message.guild);

    const Embed = new this.client.embed(message.author)

    if (cmd.cooldown.has(message.author.id)) {
      return message.channel.send(Embed.setDescription('<:errado:739176302317273089> ' + t('errors:cooldownError')))
    }

    const verify = await cmd.verifyRequirementes(t)
    if (verify) return

    const action = [
      {
        name: message.author.username,
        id: message.author.id,
        display: message.author.displayAvatarURL()
      },
      {
        name: message.guild.name,
        id: message.guild.id
      },
      {
        uuid: v4(),
        time: convertHourToMinutes(msToTime(Date.now())),
        cmd
      }
    ]

    cmd.run({ message, args, prefix }, t);
    this.client.instance.log('COMMAND_EXECUTED', action)

    if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
  }
};