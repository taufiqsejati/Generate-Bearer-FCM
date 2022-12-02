const request = require("request");
const express = require("express");
const router = express.Router();

const { getAccessToken } = require("../config/get_AccessToken");

router.post("/send-notif", (req, res) => {
  try {
    const { token, notification, android, data, topic } = req.body;
    getAccessToken().then((accessToken) => {
      console.log("accessToken", accessToken);
      request.post(
        {
          url: "https://fcm.googleapis.com/v1/projects/datakara-f5d14/messages:send",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + accessToken,
          },
          body: JSON.stringify({
            message: {
              topic: topic,
              token: token,
              notification: notification,
              //   android: android,
              data: data,
            },
          }),
        },
        (error, response, body) => {
          res.end(body);
          console.log(body);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
