import "./env.js";

const region = process.env.GENESYS_REGION;

export default {
    region,

    clientId: process.env.GENESYS_CLIENT_ID,

    clientSecret: process.env.GENESYS_CLIENT_SECRET,

    loginUrl: `https://login.${region}`,

    apiUrl: `https://api.${region}`
};