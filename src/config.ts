import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, DISCORD_CLIENT_ID, SAUCENAO_API_KEY } = process.env;

if (!DISCORD_TOKEN || !DISCORD_CLIENT_ID || !SAUCENAO_API_KEY) {
  throw new Error(
    'Missing environment variables. Make sure `.env` file is present.',
  );
}

export const config = {
  DISCORD_TOKEN,
  DISCORD_CLIENT_ID,
  SAUCENAO_API_KEY,
};
