const path = require("path");
const router = require("express").Router();
const userRoutes = require("./users");
const leagueRotues = require("./league")

// user routes
router.use("/users", userRoutes);
router.use("/league", leagueRotues)

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
