const app = require("./progress");
const PORT = 80;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
