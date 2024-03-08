let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const dotenv = require("dotenv").config();

let mqttHandler = require("./mqtt_handler");

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/send-mqtt", (req, res) => {
    console.log("Request message: " + req.body.message);
    mqttClient.sendMessage(req.body.message);
    res.status(200).send("Message sent to mqtt");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));