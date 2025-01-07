const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

let progressData = [];

// 读取进度数据文件
if (fs.existsSync(path.join(__dirname, "../progressData.json"))) {
  const data = fs.readFileSync(path.join(__dirname, "../progressData.json"));
  progressData = JSON.parse(data);
}

// 读取进度数据
app.get("/api/progress", (req, res) => {
  res.json(progressData);
});

// 保存进度数据
app.post("/api/progress", (req, res) => {
  progressData = req.body;
  fs.writeFileSync(
    path.join(__dirname, "../progressData.json"),
    JSON.stringify(progressData)
  );
  res.sendStatus(200);
});

module.exports = app;
