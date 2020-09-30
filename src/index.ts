import 'dotenv/config'
import CommunityManager from "./CommunityManager";

const client = new CommunityManager();

// INIT's
client.initWinston()
client.initComamnds()

client.login(String(process.env.TOKEN))
  .then(() => client.logger.info('CommunityManager bot is running'))
  .catch(() => client.logger.error('CommunityManager does not online, because an error occurred'))
  