const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZUt0Qlh6YW94MXNYOXIxZzNGNWhydkVaNlFiT2U4RFVVMXpCQXhlVHBFVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSXZjd09ZVXd3V0xwVG5ySGRVWkN6Nm5sOUx2QWFqSUhucWZnTndtMjN5VT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwRDlYVGJjTXgycGNyMjNIRmxETnVYL1g0M21NY2Z4N2g0SGdnVVFtSjFzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJnY2Y3MHF5MFpQNlEyUEQ2Q0hGcjFJNlFINlkrYnZ4b2UxR0ZBUVN6a0h3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImVITXVTRnVDN2hRa2Q4OExRL1IzZ2NnSDJZZUxXZDZ5bEVPNFV2ZFo2Rzg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImhkTUUwS3h2R0VYeWRUdlMvZFFNUkVZZGpQa0JsM3k2S1RHWlgvVysvQkU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEtzVGNsRms3SUVCVE0zSDRzb2ZKb3lVdHo2K3huOHV2TjRpYytEYUhrMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUxkTkQvOFlnSm1NRzcyQ0RTMy9XbjFaMTZXMm5oWkFFMGNqcVNOV3BtST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjN6YS9EcE5hdktjYjh2UGgrL0dvSS9vbHFHZ3lPNE5YV3QvYzUwSXVSZ0Y3QmYrVG5QQkVZaEQ0TGZUYzlSRmF0U3VFU3VTNWlOeW80UEdrallwSmdRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI1LCJhZHZTZWNyZXRLZXkiOiIxUU1kMTd5VjRKMXZXcjQyOUZSSmsxc0JWaGVYS0VHUE55bnREK2VKR0ZBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJoenpJMEZpZlFmT1UwNlZiUmZIbkJnIiwicGhvbmVJZCI6Ijc4MzJlNzc4LTFlZmYtNDlkMy05NzRmLWM0ZmU1ZWQzZjYwOSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ4VVBvbGtOdmNDZllNVG5DTkZ1MDBncWhQQWM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0JyaEhWMFArM21mZmNVcURPTXh6NytyUFN3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkY4N1kzRkNCIiwibWUiOnsiaWQiOiIyNjM3MTQyOTY1NTA6MTZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lXRnFOUUhFTWk2MDdVR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IkUyTzJsdTRHTGJjVExMdENVczIwdWhGSVpKTm16dStCK2pKcWRSTzF4eG89IiwiYWNjb3VudFNpZ25hdHVyZSI6IjI3bjd1cWtJMnA2MjN2Z1FEZ0F2c29Fb0V3cmd1aWhPRnNMdXNubmtJc3BHTVplUm10eTdTOThsNFVKRFBGZWZqUUZaSkc2Y3U1WWpMdFFkT2lPMENBPT0iLCJkZXZpY2VTaWduYXR1cmUiOiI2UjZRWG1Hd0NuenZkYTR4L0o4aDZzZmJyLzlkeUVtWWhiZjVLUkRjOXpQblMwcFFha3ZvV1BwZEFRQ1RZLzI2VmZZSE9VSzlhZ0VucVNFMTRISmVpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI2MzcxNDI5NjU1MDoxNkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSTmp0cGJ1QmkyM0V5eTdRbExOdExvUlNHU1Raczd2Z2ZveWFuVVR0Y2NhIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzMTI5MTc0LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUo1VyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Sage Dickson",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "263780597802", 
    A_REACT : process.env.AUTO_REACTION || 'off',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'Sage Dickson_MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://whatsapp.com/channel/0029VaZypgoIyPtaodVKp61o',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
