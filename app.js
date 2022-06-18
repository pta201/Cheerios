const fs = require("fs");
const path = require("path");
const express = require("express");

const { scrape } = require("./puppeteer");

const app = express();
const port = 3000;
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res) {
  res.send("<div>Hello</div>");
});
app.get("/scrape", function (req, res) {
  scrape();
  res.send("<div>Hello</div>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
