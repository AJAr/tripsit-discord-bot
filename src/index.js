// TODO: Look into not including this in the main process
require('../deploy-commands');
const PREFIX = require('path').parse(__filename).name;
const { Collection } = require('discord.js');
const createDiscordClient = require('./discord-client');
const logger = require('./utils/logger.js');
const createFirebase = require('./firebase');
const registerCommands = require('./commands');
const registerEvents = require('./events');
const irc_config = require('./assets/irc_config.json');
const {
    DISCORD_TOKEN,
    IRC_SERVER,
    IRC_USERNAME,
    IRC_PASSWORD,
} = require('../env');

// TODO: Do we really need this? Perhps we can just use Matterbridge?
// IRC Connection, this takes a while so do it first
irc_config[0].discordToken = DISCORD_TOKEN;
irc_config[0].server = IRC_SERVER;
irc_config[0].ircOptions.username = IRC_USERNAME;
irc_config[0].ircOptions.password = IRC_PASSWORD;
irc_config[0].webhooks['960606558549594162'] = process.env['960606558549594162'];
// discordIRC(irc_config);

// Initialize firebase app
createFirebase();

const client = createDiscordClient();

// Initialize this for later
client.invites = new Collection();
Promise.all([registerCommands(client), registerEvents(client)])
    .then(() => client.login(DISCORD_TOKEN))
    .then(() => logger.info(`[${PREFIX}] Discord bot successfully started...`));