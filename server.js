const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

let progressData = [];

// 读取进度数据文件
if (fs.existsSync("progressData.json")) {
  const data = fs.readFileSync("progressData.json");
  progressData = JSON.parse(data);
}

// 读取进度数据
app.get("/progress", (req, res) => {
  res.json(progressData);
});

// 保存进度数据
app.post("/progress", (req, res) => {
  progressData = req.body;
  fs.writeFileSync("progressData.json", JSON.stringify(progressData));
  res.sendStatus(200);
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
