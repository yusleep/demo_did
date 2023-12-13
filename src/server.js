const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // This enables all CORS requests

app.get("/", (req, res) => {
  res.json({ did: "DID:11111111" });
});

app.post("/getaddress", (req, res) => {
  // You can access the JSON sent by the client via req.body
  console.log("Here is the user did: ");
  console.log(req.body);
  console.log("---------------------------------------");
  // Respond with a JSON object
  res.json({
    address: "abcdefg",
  });
});

app.post("/getUserSign", (req, res) => {
  // You can access the JSON sent by the client via req.body
  console.log("Here is the message need user to sign :");
  console.log(req.body);
  console.log("---------------------------------------");
  // Respond with a JSON object
  res.json({
    signature: "abcdefg",
  });
});

app.post("/serverVerify", (req, res) => {
  // You can access the JSON sent by the client via req.body
  console.log("Here is the full information that used to verify: ");
  console.log(req.body);
  console.log("---------------------------------------");
  // Respond with a JSON object
  res.json({
    status: "success",
  });
});

app.post("/", (req, res) => {
  // You can access the JSON sent by the client via req.body
  console.log(req.body);

  // Respond with a JSON object
  res.json({
    yourData: req.body,
  });
});

app.listen(8080, () => {
  console.log("Server started on http://localhost:8080");
});
