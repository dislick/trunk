import * as express from 'express';
import * as path from 'path';
const app = express();

app.get('/', (req, res) => {
  let x = path.join(__dirname, '../build-client/index.html');
  console.log(x, x);
  res.sendFile(x);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'));
