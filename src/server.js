const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors()); // This enables all CORS requests

app.get("/", (req, res) => {
  res.json({ did: "exam::010101010101010101" });
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
