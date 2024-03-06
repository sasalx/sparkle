import { Client } from 'discord.js';

import { BotEvent } from '../types';

const event: BotEvent = {
  name: 'ready',
  once: true,
  execute: (client: Client<true>) => {
    console.log(`${client.user.tag} is realy to elate.`);
  },
};

export default event;
