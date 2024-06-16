import express from 'express';
import fs from 'fs';

const app = express();

app.use(express.static('dist/Public'));

app.listen(8000, () => {
  console.log("Server running at PORT: ", 8000);
}).on("error", (e) => {
  fs.writeFileSync(`error_${new Date().toISOString()}.json`, JSON.stringify(e, null, '  '));
  process.exit();
});
