'use strict';

const { Client, Intents } = require('discord.js');

module.exports = function createDiscordClient() {
    return new Client({
        intents: [
            Intents.FLAGS.GUILDS,
            Intents.FLAGS.GUILD_MESSAGES,
            Intents.FLAGS.GUILD_MEMBERS,
            // Intents.FLAGS.GUILD_PRESENCES,
            Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
            Intents.FLAGS.GUILD_INVITES,
        ],
        partials: [
            'MESSAGE',
            'CHANNEL',
            'USER',
            'GUILD_MEMBER',
            'REACTION',
        ],
    });
};