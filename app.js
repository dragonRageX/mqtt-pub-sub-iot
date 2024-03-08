let express = require("express");
let bodyParser = require("body-parser");
let app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");

let mqttHandler = require("./mqtt_handler");

const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

let mqttClient = new mqttHandler();
mqttClient.connect();

// Routes
app.post("/send-mqtt", (req, res) => {
    console.log(req.body);
    console.log("Request message: " + req.body.temperature);
    mqttClient.sendMessage(String(req.body.temperature));
    res.status(200).send("Message sent to mqtt");
});

app.listen(port, () => console.log(`Server is running on port ${port}`));