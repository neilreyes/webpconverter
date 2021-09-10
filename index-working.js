const express = require("express");
const app = express();
const PORT = 5000;
const multer = require("multer");
const cors = require("cors");
const webp = require("webp-converter");
const upload = multer({ dest: "public/uploads" }).array("filessss");

// grant 755 permission to webp executables
webp.grant_permission();

app.use(cors());

const processImage = (data, res) => {
    const options = "-q 80";

    data.forEach((entry) => {
        const input = entry.path;
        const output = entry.destination + "/" + entry.filename + ".webp";
        const result = webp.cwebp(
            input,
            output,
            options /* , logging = "-v" */
        );

        result.then((result) => res.status(200).json(result));
    });
};

app.post("/upload", (req, res) => {
    /* try {
        return res.status(200).json(req.files);
    } catch (error) {
        return res.status(500).json({ error });
    } */

    /* const result = webp.cwebp(
        "logo.jpg",
        "logo.webp",
        "-q 80",
        (logging = "-v")
    );

    result.then((response) => {
        console.log(response);
    }); */

    upload(req, res, (err) => {
        try {
            //return res.status(200).json(req.files[0]);
            processImage(req.files, res);
        } catch (error) {
            return res.status(500).json({ error, err });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Webp converter server running on http://localhost:${PORT}`);
});
