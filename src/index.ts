import 'dotenv/config'
import CommunityManager from "./CommunityManager";

const client = new CommunityManager();

client.login(String(process.env.TOKEN))