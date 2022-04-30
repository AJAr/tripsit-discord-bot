const { SlashCommandBuilder } = require('@discordjs/builders');
const logger = require('../utils/logger.js');
const PREFIX = require('path').parse(__filename).name;

module.exports = {
    data: new SlashCommandBuilder().setName('combochart').setDescription('Display TripSit\'s Combo Chart'),
    async execute(interaction) {
        const url = 'https://i.imgur.com/juzYjDl.png';
        interaction.reply(url);
        logger.debug(`[${PREFIX}] finished!`);
        return;
    },
};
