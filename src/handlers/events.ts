import { Client } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

import { BotEvent } from '@/src/types';

const handler = (client: Client) => {
  const eventsDir = join(__dirname, '../events');

  readdirSync(eventsDir).forEach((eventFileName) => {
    if (!eventFileName.endsWith('.ts')) return;

    import(`${eventsDir}/${eventFileName}`).then((eventFile) => {
      const event: BotEvent = eventFile.default;

      event.once
        ? client.once(event.name, (...args) => event.execute(...args))
        : client.on(event.name, (...args) => event.execute(...args));

      console.log(`Successfully loaded event ${event.name}`);
    });
  });
};

export default handler;
