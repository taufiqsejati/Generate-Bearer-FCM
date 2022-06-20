require('dotenv').config()

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routerSendNotif= require("./route/send-notif");
const routerCreateBerita = require('./route/trigger-notif-berita');

app.use("/api", routerSendNotif);
app.use("/api", routerCreateBerita);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log("Error: " + err);
});
