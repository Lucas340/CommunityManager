import 'dotenv/config'
import CommunityManager from "./CommunityManager";

const client = new CommunityManager();

client.initWinston()
client.login(String(process.env.TOKEN))

client.logger.info('CommunityManager online', { label: "CommunityManager" })