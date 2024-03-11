import { SlashCommandBuilder } from 'discord.js';

import { SlashCommand } from '@/src/types';

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with Pong!'),

  execute: async (interaction) => {
    await interaction.reply('Pong!');
  },
};

export default command;
