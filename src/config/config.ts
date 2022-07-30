import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

const ENV = process.env;

const PROVIDER_SMS = ENV.PROVIDER_SMS as 'Contele' | 'AWS';

export const config = {
  PORT: ENV.PORT || 3000,
  MONGO_URI: ENV.MONGO_URI || 'mongodb://localhost/reacteurope',
  DATA_365_URL: ENV.DATA_365_URL || '',
  DATA_365_ACCESS_TOKEN: ENV.DATA_365_ACCESS_TOKEN || '',
  AWS_REGION: ENV.AWS_REGION || '',
  AWS_ACCESS_KEY_ID: ENV.AWS_ACCESS_KEY_ID || '',
  AWS_SECRET_ACCESS_KEY: ENV.AWS_SECRET_ACCESS_KEY || '',
  AWS_BUCKET_NAME: ENV.AWS_BUCKET_NAME || ''
};
