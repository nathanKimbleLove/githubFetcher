const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  ownerName: String,
  link: String,
  watcherCount: Number,
  createdAt: Date,
  modifiedAt: Date,
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArray, owner) => {

  const inner = (repo) => {
    return new Promise((res, rej) => {
      var schemed = new Repo({
        id: repo.id,
        name: repo.name,
        ownerName: owner,
        link: repo.url,
        watcherCount: repo.watchers_count,
        createdAt: repo.created_at,
        modifiedAt: repo.pushed_at,
        forks: repo.forks_count
      });
      schemed.save((err, schemed) => {
        err? rej(err) : res(schemed);
      });
    })
  }

  if (!Array.isArray(repoArray)) {
    repoArray = [repoArray];
  }
  var repoPromises = repoArray.map(element => inner(element));

  return Promise.all(repoPromises).then(r => console.log('DONE WITH PROMISES'));

};






//try to make a key work
let sortBy = (key = 'watcherCount', direction = -1) => {
  return Repo.find({}).sort({ watcherCount: direction, name: 1 }).limit(25);
}

module.exports.save = save;
module.exports.sortBy = sortBy;
