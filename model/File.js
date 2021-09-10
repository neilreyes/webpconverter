const mongoose = require("mongoose");
const fileSchema = mongoose.Schema(
    {
        file_path: {
            type: String,
            required: true,
        },
        file_mimetype: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = File = mongoose.model("File", fileSchema);
