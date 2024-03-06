import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import { SlashCommand } from '@/src/types';

import { config } from './config.ts';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const handlersDir = join(__dirname, './handlers');

// Collection imports
client.slashCommands = new Collection<string, SlashCommand>();

// Handlers are where every major part of the bot defined
readdirSync(handlersDir).forEach((handlerFileName: string) => {
  if (!handlerFileName.endsWith('.ts')) return;

  import(`${handlersDir}/${handlerFileName}`).then((handler) => {
    handler.default(client);
  });
});

client.login(config.DISCORD_TOKEN);
