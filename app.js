const express = require('express');
const bodyParser = require('body-parser');
const apiv1 = require('./routes/apiv1');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();
const port = app.listen(process.env.PORT || 3000);
app.use(bodyParser.json());
app.use('/api/v1/', apiv1);
mongoConnect(() => {
  app.listen(port, function () {
    console.log('server started', process.env.PORT);
  });
});