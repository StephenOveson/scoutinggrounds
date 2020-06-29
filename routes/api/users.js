const router = require("express").Router();
const userController = require("../../controllers/userController");
const passport = require("../../passport/passport");

router
  .route("/")
  .get(userController.findAll)
  .post(userController.create);

router
  .route('/login')
  .post(passport.authenticate('local'), (req, res) => res.json(req.user))

router
  .route('/logout')
  .get((req, res) => {
    req.logout();
    res.redirect('/');
  })

router
  .route('/me')
  .get((req, res) => {
    res.json(req.user)
  })

router
  .route("/:id")
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;
