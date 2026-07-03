import "./config/env.js";
import app from "./app.js";
import { getAccessToken } from "./services/genesys/auth.service.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

getAccessToken()
    .then(token => {
        console.log("ACCESS TOKEN:", token);
    })
    .catch(err => {
        console.error(err.message);
    });