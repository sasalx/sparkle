import { Client, Events, GatewayIntentBits } from "discord.js";

import { config } from "./config.ts";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} is realy to elate.`);
});

client.login(config.DISCORD_TOKEN);
