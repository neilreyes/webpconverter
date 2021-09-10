const PORT = 5000;
const express = require("express");
const app = express();
const cors = require("cors");

const fileRoute = require("./route/file.route");

app.use(cors());

// Route to files
app.use(fileRoute);

app.listen(PORT, () => {
    console.log(`Webp converter server running on http://localhost:${PORT}`);
});
