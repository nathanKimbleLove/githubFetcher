const express = require('express');
let app = express();
let data = require('../data.json');
let db = require('../database/');
let getReposByUsername = require('../helpers/github.js').getReposByUsername;


app.use(express.json())
app.use(express.static('client/dist'));

app.post('/repos', function (req, res) {
  getReposByUsername(req.body.term)
  .then(results => {
    return db.save(results.data, req.body.term);
  })
  .then(res => {
    return db.sortBy();
  })
  .then(data => {
    console.log(data);
    res.send(JSON.stringify(data))
  });
});

app.get('/repos', function (req, res) {

  db.sortBy()
  .then(data => res.send(JSON.stringify(data)));

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

