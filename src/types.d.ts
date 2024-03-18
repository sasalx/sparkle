import {
  AutocompleteInteraction,
  CacheType,
  ChatInputCommandInteraction,
  Collection,
  Message,
  ModalSubmitInteraction,
  PermissionResolvable,
  SlashCommandBuilder,
} from 'discord.js';

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

export interface Command {
  name: string;
  execute: (message: Message, args: Array<string>) => void;
  permissions: Array<PermissionResolvable>;
  aliases: Array<string>;
  cooldown?: number;
}

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
