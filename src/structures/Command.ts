import Discord, { Collection, Message, User } from "discord.js";
import CommunityManager from '../CommunityManager';

interface Requirements {
    devsOnly?: boolean
}

interface Configs {
    name: string,
    aliases?: Array<string>,
    usage?: string,
    description?: string,
    hidden?: Boolean,
    category?: string,
    cooldownTime?: number,
    requirements?: Requirements
}

class Command {
    public name: string
    public aliases: Array<String>
    public usage: string
    public description: string
    public hidden: Boolean
    public category: string
    public requirements: {}
    public client: CommunityManager
    public message: any
    public args: any
    public cooldown: any 
    public cooldownTime: number

    constructor(configs: Configs, client: CommunityManager) {
        this.name = configs.name
        this.aliases = configs.aliases || []
        this.usage = configs.usage || ''
        this.description = configs.description || ''
        this.hidden = configs.hidden || false
        this.category = configs.category || 'Others'
        this.cooldownTime = configs.cooldownTime || 5000
        this.cooldown = new Collection()

        this.requirements = configs.requirements || {}

        this.client = client;
    }

    startCooldown(user: string) {
        this.cooldown.set(user, Date.now() + this.cooldownTime);

        setTimeout(() => {
            this.cooldown.delete(user);
        }, this.cooldownTime);
    }

    setMessage(message: Message, args: string[]) {
        this.message = message;
        this.args = args;
    }

    getUsers() {
        const array = [];

        for (let i = 0; i < this.args.length; i++) {
            let tostring = this.args[i].toString().replace('@', '').replace('<', '').replace('>', '').replace('!', '');

            const user = this.message.guild.members.cache.get(tostring) || this.message.guild.members.cache.find((member: any) => member.user.username === this.args[i]) || this.message.guild.members.cache.find((member: any) => member.nickname === this.args[i]);
            if (user) array.push(user);
        }

        return array;
    }

    async verifyRequirementes() {
        // Later...
    }

    run ({ message, args, prefix }: { message: Message, args: string[], prefix: string }) {
        message.channel.send('Hello, world! This is an empty command.')
    }
}

export default Command