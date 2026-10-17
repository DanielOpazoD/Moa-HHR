import base from './playwright.config.js';
export default {...base, use:{...base.use, launchOptions:{executablePath:process.env.CHROMIUM_PATH || '/usr/bin/chromium',args:['--no-sandbox']}}};
