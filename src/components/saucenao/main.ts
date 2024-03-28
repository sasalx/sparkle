import { EmbedBuilder, Message } from 'discord.js';

import { config } from '@/src/config';

// import sites from './sites';

// Discord embed colours
const successColour = '#14e7ba';
const errorColour = '#e33310';

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
  // const id: number = header.index_id;
  const similarity: string = header.similarity;

  // Check similarity
  if (header.similarity <= 80) {
    const errorEmbed = new EmbedBuilder()
      .setColor(errorColour)
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

    return;
  }

  // Check if the source id is known by the bot
  // if (sites[id] === undefined) {
  //   const errorEmbed = new EmbedBuilder()
  //     .setColor(errorColour)
  //     .setTitle('When I am mad, you are mad too.')
  //     .setDescription(
  //       "I don't know about much about this source. Blame the developer and maybe pass the id to create more work for him.",
  //     )
  //     .setThumbnail(url)
  //     .addFields({
  //       name: 'Source ID',
  //       value: id.toString(),
  //       inline: true,
  //     });

  //   message.reply({ embeds: [errorEmbed] });

  //   return;
  // }

  // Return if there is a result
  if (data.source) {
    // const resultUrl: [string] =
    //   data.ext_urls.length > 1
    //     ? data.ext_urls.filter((url: string) => sites[id]?.urlMatcher.test(url))
    //     : data.ext_urls;

    console.log(data.source);

    const resultEmbed = new EmbedBuilder()
      .setColor(successColour)
      .setTitle('When I am smiling, you are smiling too.')
      .setDescription('Found it!')
      .setThumbnail(url)
      .addFields({
        name: 'Source URL',
        value: data.source,
        inline: false,
      });

    message.reply({ embeds: [resultEmbed] });
  } else {
    message.reply('F');
  }
};

export default getSauce;
