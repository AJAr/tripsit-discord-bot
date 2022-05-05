'use strict';

// TODO: Look into not including this in the main process
require('../deploy-commands');
const { Client, Collection, Intents } = require('discord.js');
const PREFIX = require('path').parse(__filename).name;
const { initializeApp, cert } = require('firebase-admin/app'); // eslint-disable-line
const { getFirestore } = require('firebase-admin/firestore'); // eslint-disable-line
const createLogger = require('./logger');
const registerCommands = require('./commands');
const registerEvents = require('./events');
const serviceAccount = require('./assets/firebase_creds.json');
const {
  DISCORD_TOKEN,
  // IRC_SERVER,
  // IRC_USERNAME,
  // IRC_PASSWORD,
  FIREBASE_PRIVATE_KEY_ID,
  FIREBASE_PRIVATE_KEY,
  FIREBASE_CLIENT_ID,
  FIREBASE_CLIENT_EMAIL,
} = require('../env');

const logger = createLogger();

serviceAccount.private_key_id = FIREBASE_PRIVATE_KEY_ID;
serviceAccount.private_key = FIREBASE_PRIVATE_KEY ? FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;
serviceAccount.client_email = FIREBASE_CLIENT_ID;
serviceAccount.client_id = FIREBASE_CLIENT_EMAIL;

// IRC Connection, this takes a while so do it first
// irc_config[0].discordToken = DISCORD_TOKEN;
// irc_config[0].server = IRC_SERVER;
// irc_config[0].ircOptions.username = IRC_USERNAME;
// irc_config[0].ircOptions.password = IRC_PASSWORD;
// irc_config[0].webhooks['960606558549594162'] = process.env['960606558549594162'];
// discordIRC(irc_config);

// Initialize firebase app
if (serviceAccount.private_key_id) {
  initializeApp({
    credential: cert(serviceAccount),
    databaseURL: 'https://tripsit-me-default-rtdb.firebaseio.com',
  });
  global.db = getFirestore();
}

const client = new Client({
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

// Initialize this for later
client.invites = new Collection();

const deps = { logger };
Promise.all([registerCommands(client, deps), registerEvents(client, deps)])
  .then(() => client.login(DISCORD_TOKEN))
  .then(() => logger.info(`[${PREFIX}] Discord bot successfully started...`));
