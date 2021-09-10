const express = require("express");
const Router = express.Router();
const File = require("../model/File");

const multer = require("multer");
const upload = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./files");
    },
    filename: (req, file, cb) => {
        cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
    limits: {
        fileSize: 1000000, // max file size 1MB == 1000000 bytes
    },
    fileFilter: (req, file, cb) => {
        if (!file.originalname.match("/.(jpeg|jpg|png|gif)")) {
            return cb(new Error("Invali file format"));
        }
        cb(undefined, true);
    },
});

Router.post("/api/v1/file/upload", async (req, res) => {
    try {
        const { path, mimetype } = req.file;
        const file = new File({
            file_path: path,
            file_mimetype: mimetype,
        });
        await file.save();
        res.status(200).json({
            message: "Files have been uploaded successfully",
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

Router.get("/api/v1/file/list", async (req, res) => {
    try {
        const files = await File.find({});
        // Todo:
        // [ ] check to see if there are files available
        res.status(200).json({ files });
    } catch (error) {
        res.status(500).json({ error });
    }
});

Router.get("/api/v1/file/download/:id", async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        res.set({
            "Content-Type": file.file_mimetype,
        });
        res.sendFile(path.join(__dirname, "..", file.file_path));
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = Router;
