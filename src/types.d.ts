import {
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  ModalSubmitInteraction,
  SlashCommandBuilder,
} from 'discord.js';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_TOKEN: string;
      DISCORD_CLIENT_ID: string;
    }
  }
}

declare module 'discord.js' {
  export interface Client {
    slashCommands: Collection<string, SlashCommand>;
    commands: Collection<string, Command>;
    cooldowns: Collection<string, number>;
  }
}

export interface BotEvent {
  name: string;
  once?: boolean | false;
  execute: (...args) => void;
}

export interface SlashCommand {
  command: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => void;
  autocomplete?: (interaction: AutocompleteInteraction) => void;
  modal?: (interaction: ModalSubmitInteraction<CacheType>) => void;
  cooldown?: number;
}
