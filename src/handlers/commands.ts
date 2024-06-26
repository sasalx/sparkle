import { REST } from '@discordjs/rest';
import { Client, Routes, SlashCommandBuilder } from 'discord.js';
import fs from 'fs';
import { join } from 'path';

import { config } from '@/src/config';
import { SlashCommand } from '@/src/types';

// Note: Move to utils if needed
const listFilesInDirectory = async (path: string) =>
  new Promise<string[]>((resolve, reject) =>
    fs.readdir(path, (err, content) => (err ? reject(err) : resolve(content))),
  );

const handler = async (client: Client) => {
  const slashCommands: Omit<
    SlashCommandBuilder,
    'addSubcommand' | 'addSubcommandGroup'
  >[] = [];
  const slashCommandsDir = join(__dirname, '../commands/slashCommands');

  await listFilesInDirectory(slashCommandsDir).then(
    async (commandFileArray) => {
      for (const commandFileName of commandFileArray) {
        await import(`${slashCommandsDir}/${commandFileName}`).then(
          (commandFile) => {
            const command: SlashCommand = commandFile.default;

            slashCommands.push(command.command);
            client.slashCommands.set(command.command.name, command);
          },
        );
      }
    },
  );

  const rest = new REST({ version: '10' }).setToken(config.DISCORD_TOKEN);

  rest
    .put(Routes.applicationCommands(config.DISCORD_CLIENT_ID), {
      body: slashCommands.map((command) => command.toJSON()),
    })
    .then((data: unknown) => {
      console.log(
        `🔥 Successfully loaded ${(data as []).length} slash command(s)`,
      );
    })
    .catch((e) => {
      console.log(e);
    });
};

export default handler;
