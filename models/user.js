const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const leagueAccountSchema = new Schema({
  username: { type: String, required: true },
  rank: { tier: { type: String }, division: { type: String }, lp: { type: Number } },
  championPlayed: [{
    champion: { type: String },
    games: { type: Number },
    wins: { type: Number },
    losses: { type: Number },
  }]
});

const userSchema = new Schema({
  username: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, trim: true },
  password: { type: String, required: true, validate: [({ length }) => length >= 8, "Password needs to be at least 8 characters."] },
  leagueUsernames: { type: [leagueAccountSchema] },
  twoSplits: { type: Boolean },
  sixSplits: { type: Boolean },
  threeSG: { type: Boolean },
  surveySent: { type: Boolean },
  cycles: {
    cycleOne: { type: Boolean },
    cycleTwo: { type: Boolean },
    cycleThree: { type: Boolean },
    cycleFour: { type: Boolean },
    cycleFive: { type: Boolean },
    cycleSix: { type: Boolean },
    cycleSeven: { type: Boolean },
  },
});

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
