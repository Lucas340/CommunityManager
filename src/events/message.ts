import Discord, { Message } from 'discord.js'
import Command from '../structures/Command'
import CommunityManager from '../CommunityManager'

module.exports = class {
    public client: CommunityManager

    constructor(client: CommunityManager) {
        this.client = client;
    }
    async run(message: Message) {
        if (message.channel.type == 'dm') return;
        if (message.author.bot) return;
        if (!message.content.startsWith('cm!')) return

        const prefix = 'cm!'

        const args = message.content.split(/\s+/g);

        const arg = args.shift()

        if (arg === undefined) return

        const command = arg.slice(String('cm!').length).toLowerCase();
        const cmd = this.client.commands.find((c: Command) => c.name.toLowerCase() === command || (c.aliases && c.aliases.includes(command)));

        if (!cmd) return;

        cmd.setMessage(message, args);
        const Embed = new Discord.MessageEmbed()
            .setFooter(message.author.username, message.author.displayAvatarURL())

        if (cmd.cooldown.has(message.author.id)) {
            return message.channel.send(Embed.setDescription('You are in cooldown time. Take a break.'))
        }

        const verify = await cmd.verifyRequirementes()
        if (verify) return

        cmd.run({ message, args, prefix });

        if (cmd.conf.cooldown > 0) cmd.startCooldown(message.author.id);
    }
};