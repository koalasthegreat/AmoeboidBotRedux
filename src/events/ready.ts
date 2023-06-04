import { GUILD_ID } from "../bot";
import Client from "../classes/client";

export default (client: Client) => {
  console.log(`${client.user?.username} is online`);

  client.application?.commands.set(client.commands.map(c => c.data), GUILD_ID)
};
