import { app } from './app'
import Client from '../CommunityManager'

export const init = async (client: Client) => {
  app.listen(3333);
  client.logger.info('Server is online')
}