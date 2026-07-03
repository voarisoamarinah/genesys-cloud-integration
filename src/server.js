import "./config/env.js";
import app from "./app.js";
import { getUsers } from "./services/genesys/api.service.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

getUsers()
    .then(data => {
        console.log("USERS COUNT:", data?.entities?.length || data.length);
        console.log("USERS:", data?.entities);
    })
    .catch(err => {
        console.error("Genesys API error:", err.message);
    });