'use strict';

require('dotenv').config();
const path = require('path');

exports.NODE_ENV = process.env.NODE_ENV;
exports.LOG_PATH = path.resolve(process.env.LOG_PATH);

exports.DISCORD_CLIENT_ID = process.env.clientId;
exports.DISCORD_TOKEN = process.env.token;
exports.TRIPSIT_GUILD_ID = process.env.guildId;

exports.IRC_SERVER = process.env.IRC_SERVER;
exports.IRC_USERNAME = process.env.IRC_USERNAME;
exports.IRC_PASSWORD = process.env.IRC_PASSWORD;

exports.FIREBASE_PRIVATE_KEY_ID = process.env.FIREBASE_PRIVATE_KEY_ID;
exports.FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;
exports.FIREBASE_CLIENT_ID = process.env.FIREBASE_CLIENT_ID;
exports.FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;

exports.TS_ICON_URL = process.env.TS_ICON_URL;
exports.TS_FLAME_URL = process.env.TS_FLAME_URL;
exports.DISCLAIMER = process.env.DISCLAIMER; // TODO: Should this really be an environment variable?
