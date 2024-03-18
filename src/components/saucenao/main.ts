import { EmbedBuilder, Message } from 'discord.js';

import { config } from '@/src/config';

const getSauce = async (url: string, message: Message) => {
  const form = new FormData();

  form.append('api_key', config.SAUCENAO_API_KEY as string);
  form.append('output_type', '2'); // Return json
  form.append('numres', '1'); // Max number of results
  form.append('url', url);

  const response = await fetch('https://saucenao.com/search.php', {
    body: form,
    method: 'post',
  });

  const source = await response.json();

  console.log(source.results[0]);

  const { data, header } = source.results[0];
  const id = header.index_id;
  const similarity = header.similarity;

  if (header.similarity <= 80) {
    const errorEmbed = new EmbedBuilder()
      .setColor(0xd91a1a)
      .setTitle('When I am sad, you are sad too.')
      .setDescription(
        'Similarity is below 80%, too bad. Maybe it is AI generated or something.',
      )
      .setThumbnail(url)
      .addFields({
        name: 'Similarity',
        value: similarity,
        inline: true,
      });

    message.reply({ embeds: [errorEmbed] });
  }
};

export default getSauce;
