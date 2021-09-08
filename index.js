const express = require("express");
const app = express();
const PORT = 8000;
const multer = require("multer");
const cors = require("cors");
const webp = require("webp-converter");
const upload = multer({ dest: "public/uploads" }).array("files");
/* // grant 755 permission to webp executables
webp.grant_permission();

const result = webp.cwebp("logo.jpg", "logo.webp", "-q 80", (logging = "-v"));

result.then((response) => {
    console.log(response);
}); */
app.use(cors());
app.post("/upload", (req, res) => {
    console.log(req.files);

    upload(req, res, (err) => {
        try {
            return res.status(200).json(req.files);
        } catch (error) {
            return res.status(500).json({ error, err });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Webp converter  running on http://localhost:${PORT}`);
});
