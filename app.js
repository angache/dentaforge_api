const express = require('express');
const bodyParser = require('body-parser');
const feedRoutes = require('./routes/feed');

const app = express();
const port = app.listen(process.env.PORT || 3000);
app.use(bodyParser.json());

app.use('/feed', feedRoutes);
app.listen(port, function () {
  console.log('server started');
});