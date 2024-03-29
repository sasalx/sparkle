import { CronJob } from 'cron';
import { SlashCommandBuilder } from 'discord.js';

import { SlashCommand } from '@/src/types';

const command: SlashCommand = {
  command: new SlashCommandBuilder()
    .setName('hsr')
    .setDescription('Commands related with Honkai Star Rails')
    .addStringOption((option) =>
      option
        .setName('option')
        .setDescription('The command you want to run')
        .setRequired(true)
        .addChoices({ name: 'Daily Ping', value: 'ping_daily' }),
    ),

  execute: async (interaction) => {
    if (interaction.options.data[0].value === 'ping_daily') {
      await interaction.reply('はいはい');

      new CronJob(
        '0 0 19 * * *',
        async () => {
          await interaction.followUp('Daily reminder time~~');
        },
        null,
        true,
        'Europe/Berlin',
      );
    }
  },
};

export default command;
