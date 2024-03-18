import { Interaction } from 'discord.js';

import { BotEvent } from '@/src/types';

const event: BotEvent = {
  name: 'interactionCreate',
  execute: (interaction: Interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.slashCommands.get(
      interaction.commandName,
    );

    if (!command) return;
    command.execute(interaction);
  },
};

export default event;
