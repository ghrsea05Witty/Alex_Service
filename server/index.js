const express = require('express');

const app = express();
const PORT = 4000 || process.env.PORT;
const bp = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/items', { useNewUrlParser: true, useUnifiedTopology: true });
const itemModel = require('../database/mongooseModel.js');

app.use(express.static(path.resolve(__dirname, '..', 'client', 'src', 'dist')));
app.use(bp.json());

app.get('/items/:id', (req, res) => {
  itemModel.item.findOne(req.params, (err, data) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port: ${PORT}`);
});
