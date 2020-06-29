const db = require("../models");
const { User } = require("../models");

// Defining methods for the UserController
module.exports = {
  findAll: async function (req, res) {
    const user = await db.User.findOne({ username: 'spiritbr8ker' })
    res.json(user.leagueUsernames.id(user.leagueUsernames[0]._id))
  },
  findById: function (req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    if (password.length < 8) {
      return res.status(422).json({ "error": "Password must be at least 8 characters" })
    }
    user.password = user.generateHash(password);
    user.save()
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  update: async function (req, res) {
    console.log(req.body)
    const user = await db.User.findById(req.params.id)
    console.log(user)
    user.leagueUsernames.push(req.body)
    console.log(user)
    user.save()
      .then(data => res.json(data))
      .catch(err => console.log(err));
  },
  remove: function (req, res) {
    db.User.findById(req.params.id)
      .then(dbUser => dbUser.remove())
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
