import { Message, MessageReaction } from 'discord.js';

import getSauce from '@/src/components/saucenao/main';
import { BotEvent } from '@/src/types';

const event: BotEvent = {
  name: 'messageCreate',
  execute: (message: Message) => {
    const sauceEmojiFilter = (reaction: MessageReaction) => {
      return reaction.emoji.name === '🍝';
    };

    const sauceEmojiCollector = message.createReactionCollector({
      filter: sauceEmojiFilter,
    });

    sauceEmojiCollector.on('collect', async () => {
      const typeUrl = message.attachments?.first()?.url;
      const typeEmbed = message.embeds[0]?.data.url;

      if (!typeUrl && !typeEmbed) return;

      await getSauce((typeUrl ? typeUrl : typeEmbed) as string, message);
    });

    sauceEmojiCollector.on('end', (collected) => {
      console.log(`Collected ${collected.size} items`);
    });
  },
};

export default event;
