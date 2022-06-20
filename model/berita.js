const mongoose = require("mongoose");

const beritaSchema = mongoose.Schema({
    judul: {
        type: String,
        required: true
    },
    isi: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model("Berita", beritaSchema);