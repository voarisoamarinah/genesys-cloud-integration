import axios from "axios";
import config from "../../config/genesys.config.js";

let cachedToken = null;
let tokenExpiry = null;

export async function getAccessToken() {
    const now = Date.now();

    if (cachedToken && tokenExpiry && now < tokenExpiry) {
        return cachedToken;
    }

    const tokenUrl = `${config.loginUrl}/oauth/token`;

    const body = new URLSearchParams({
        grant_type: "client_credentials"
    });

    try {
        const response = await axios.post(tokenUrl, body, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                'Authorization': `Basic ${Buffer.from(config.clientId + ':' + config.clientSecret).toString('base64')}`
            }
        });

        const { access_token, expires_in } = response.data;

        cachedToken = access_token;

        tokenExpiry = now + expires_in * 1000;

        return access_token;
    } catch (error) {
        console.error("Genesys OAuth error:", error.response?.data || error.message);

        throw new Error("Failed to authenticate with Genesys");
    }
}