const storage = "";
const multer = require("multer");
const upload = multer({ dest: "public/uploads" }).array("files");
const webp = require("webp-converter");

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

module.exports = (req, res, next) => {
    webp.grant_permission();

    upload(req, res, (err) => {
        try {
            //return res.status(200).json(req.files);
            processImage(req.files);
        } catch (error) {
            return res.status(500).json({ error, err });
        }
    });
};
