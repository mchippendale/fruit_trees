const express = require('express');
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('many, many fruit trees');
});
