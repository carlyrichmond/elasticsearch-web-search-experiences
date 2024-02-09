const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../')));
app.use(express.static(path.join(__dirname, '../public')));

app.listen(port, () => {
  console.log(`Recommending movies on port ${port}`);
});
