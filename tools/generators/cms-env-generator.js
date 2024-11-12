'use strict';

const fs = require('fs');
const crypto = require('crypto');

/////////////////////////////////////////////////
// STRAPI
const STRAPI_HOST = '0.0.0.0';
const STRAPI_PORT = '1337';
const JWT_EXPIRES_IN = '1d';
const REFRESH_EXPIRES_IN = '5d';
const DEFAULT_ADMIN = 'user,user@example.com,password';
// DATABASE
const DATABASE_CLIENT = 'mysql2';
const DATABASE_HOST = 'localhost';
const DATABASE_PORT = '3306';
const DATABASE_NAME = 'ulma_cms';
const DATABASE_USERNAME = 'ulma_cms';
const DATABASE_PASSWORD = 'ulma_cms';
const DATABASE_SSL = true;
const DATABASE_SSL_REJECT_UNAUTHORIZED = false;
const DATABASE_DEBUG = false;
// EMAIL
const EMAIL_PROVIDER = '@strapi/provider-email-nodemailer';
const EMAIL_HOST = '127.0.0.1';
const EMAIL_PORT = 1025;
const EMAIL_SECURE = 0;
const EMAIL_REJECT_UNAUTHORIZED = 0;
const EMAIL_REQUIRE_TLS = 0;
const EMAIL_TIMEOUT = 0;
const EMAIL_FROM = 'noreply@ulma.com';
const EMAIL_TEST_ADDRESS = 'user+strapi.ulma@irontec.com';
// SSR
const SSR_ULS = 'http://localhost:4000';
const SSR_CARRETILLAS = 'http://localhost:4000';
const SSR_INOXTRUCK = 'http://localhost:4000';
const SSR_INTRUCK = 'http://localhost:4000';
const SSR_ESE_ERRE = 'http://localhost:4000';
const INVALIDATE_TOKEN = 'TOKEN';
/////////////////////////////////////////////////

const args = process.argv.slice(2);

// Help flag
const helpFlagIndex = args.findIndex((arg) => arg === '--help');
if (helpFlagIndex !== -1) {
  console.log(
    'Creates an packages/cms/.env.random.example file with random keys.',
  );
  console.log(
    'A --replace flag can be used to overwrite the packages/cms/.env file directly.',
  );
  console.log('example: node generate-routes.mjs [--replace [--force]] ');
  console.log('--help: Help');
  console.log(
    '--replace: Will overwrite packages/cms/.env (asks for permission)',
  );
  console.log('  --force: Will not ask for permission');
  return;
}

let fileName = '.env.random.example';

const rand = () => crypto.randomBytes(16).toString('base64');
const create = (filename) => {
  try {
    var file = fs.createWriteStream(`packages/cms/${filename}`);
    file.on('error', (err) => {
      throw new Error(`[ERROR] Generating file (${err.message})`);
    });
    file.write(`# STRAPI\n`);
    file.write(`HOST=${STRAPI_HOST}\n`);
    file.write(`PORT=${STRAPI_PORT}\n`);
    file.write(`APP_KEYS=${rand()},${rand()},${rand()},${rand()}\n`);
    file.write(`API_TOKEN_SALT=${rand()}\n`);
    file.write(`TRANSFER_TOKEN_SALT=${rand()}\n`);
    file.write(`ADMIN_JWT_SECRET=${rand()}\n`);
    file.write(`JWT_SECRET=${rand()}\n`);
    file.write(`JWT_EXPIRES_IN=${JWT_EXPIRES_IN}\n`);
    file.write(`REFRESH_SECRET=${rand()}\n`);
    file.write(`REFRESH_EXPIRES_IN=${REFRESH_EXPIRES_IN}\n`);
    file.write(`# DEFAULT_ADMIN=${DEFAULT_ADMIN}\n`);
    file.write(`\n`);
    file.write(`# DATABASE\n`);
    file.write(`DATABASE_CLIENT=${DATABASE_CLIENT}\n`);
    file.write(`DATABASE_HOST=${DATABASE_HOST}\n`);
    file.write(`DATABASE_PORT=${DATABASE_PORT}\n`);
    file.write(`DATABASE_NAME=${DATABASE_NAME}\n`);
    file.write(`DATABASE_USERNAME=${DATABASE_USERNAME}\n`);
    file.write(`DATABASE_PASSWORD=${DATABASE_PASSWORD}\n`);
    file.write(`DATABASE_SSL=${DATABASE_SSL}\n`);
    file.write(
      `DATABASE_SSL_REJECT_UNAUTHORIZED=${DATABASE_SSL_REJECT_UNAUTHORIZED}\n`,
    );
    file.write(`DATABASE_DEBUG=${DATABASE_DEBUG}\n`);
    file.write(`\n`);
    file.write(`# EMAIL\n`);
    file.write(`EMAIL_PROVIDER=${EMAIL_PROVIDER}\n`);
    file.write(`EMAIL_HOST=${EMAIL_HOST}\n`);
    file.write(`EMAIL_PORT=${EMAIL_PORT}\n`);
    file.write(`EMAIL_SECURE=${EMAIL_SECURE}\n`);
    file.write(`EMAIL_REJECT_UNAUTHORIZED=${EMAIL_REJECT_UNAUTHORIZED}\n`);
    file.write(`EMAIL_REQUIRE_TLS=${EMAIL_REQUIRE_TLS}\n`);
    file.write(`EMAIL_TIMEOUT=${EMAIL_TIMEOUT}\n`);
    file.write(`EMAIL_FROM=${EMAIL_FROM}\n`);
    file.write(`# EMAIL_TEST_ADDRESS=${EMAIL_TEST_ADDRESS}\n`);
    file.write(`\n`);
    file.write(`# SSR\n`);
    file.write(`SSR_ULS=${SSR_ULS}\n`);
    file.write(`SSR_CARRETILLAS=${SSR_CARRETILLAS}\n`);
    file.write(`SSR_INOXTRUCK=${SSR_INOXTRUCK}\n`);
    file.write(`SSR_INTRUCK=${SSR_INTRUCK}\n`);
    file.write(`SSR_ESE_ERRE=${SSR_ESE_ERRE}\n`);
    file.write(`INVALIDATE_TOKEN=${INVALIDATE_TOKEN}\n`);
    file.end();
    console.log(
      `[SUCCESS] packages/cms/${filename} with random keys generated.`,
    );
  } catch (err) {
    throw new Error(
      `[ERROR] Creating packages/cms/${filename}\n${err.message}`,
    );
  }
};

// Replace flag
const replaceFlagIndex = args.findIndex((arg) => arg === '--replace');
if (replaceFlagIndex !== -1) {
  fileName = '.env';
  // Force flag
  const forceFlagIndex = args.findIndex((arg) => arg === '--force');
  if (forceFlagIndex !== -1) {
    create(fileName);
  } else {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    readline.question(
      `[WARNING] This will overwrite the packages/cms/.env file.\nAre you sure? (y/n) `,
      (res) => {
        const correct = ['y', 'yes'];
        if (correct.includes(res?.toLocaleLowerCase())) {
          create(fileName);
        } else {
          console.log(`[INFO] Process canceled`);
        }
        readline.close();
      },
    );
  }
} else {
  create(fileName);
}
