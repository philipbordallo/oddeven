const path = require('path');

const ROOT_PATH = path.resolve(__dirname, '..');
const CONFIGS_PATH = path.resolve(ROOT_PATH, 'configs');
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {
  ROOT_PATH,
  CONFIGS_PATH,
  APP_PATH,
  DIST_PATH,
};
