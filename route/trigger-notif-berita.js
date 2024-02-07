const request = require("request");
const express = require("express");
const router = express.Router();
const Berita = require("../model/berita");

const { getAccessToken } = require("../config/get_AccessToken");

router.post("/berita", async (req, res) => {
  try {
    let { judul, isi } = req.body;
    let berita = new Berita({
      judul,
      isi,
    });
    let saveBerita = await berita.save();
    if (saveBerita) {
      getAccessToken().then((accessToken) => {
        request.post(
          {
            url: "https://fcm.googleapis.com/v1/projects/taufiq-notification/messages:send",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + accessToken,
            },
            body: JSON.stringify({
              message: {
                topic: "fcm_test",
                notification: {
                  title: judul,
                  body: isi,
                },
                data: {
                  via: "0ad971c0-e890-11ec-809e-8fbd082ffea1",
                  route: "/message",
                },
                android: {
                  notification: {
                    channel_id: "taufiq-notification",
                  },
                },
              },
            }),
          },
          (error, response, body) => {
            res.end(body);
            console.log(body);
          }
        );
      });
      return res.status(201).json({
        message: "Berita berhasil ditambahkan",
      });
    }
    return res.status(500).json({
      message: "Berita gagal ditambahkan",
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
