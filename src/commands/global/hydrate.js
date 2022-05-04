const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../../utils/logger');
const PREFIX = require('path').parse(__filename).name;
const template = require('../../utils/embed-template');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('hydrate')
    .setDescription('Remember to hydrate!'),
  async execute(interaction) {
    const output = '💧🌊💧🌊💧🌊💧🌊💧🌊💧🌊💧🌊💧🌊\n\n'
        + '⚠️ ＨＹＤＲＡＴＩＯＮ ＲＥＭＩＮＤＥＲ ⚠️\n\n'
        + '💧🌊💧🌊💧🌊💧🌊💧🌊💧🌊💧🌊💧🌊';
    const embed = template.embedTemplate()
      .setColor('DARK_BLUE')
      .setDescription(output)
      .setAuthor(null)
      .setFooter(null);
    if (!interaction.replied) { interaction.reply({ embeds: [embed], ephemeral: false }); } else { interaction.followUp({ embeds: [embed], ephemeral: false }); }
    logger.debug(`[${PREFIX}] finished!`);
  },
};
