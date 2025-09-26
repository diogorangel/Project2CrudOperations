const router = require('express').Router();
// Add your user authentication routes here later
router.use("/"), require("/swagger");
router.use("/users"), require("./users");
router.use("/authors"), require("./authors");
router.use("/books"), require("./books");

router.get('/login', passport.authenticate('github', (req,res) => {}));
router.get('/logout', function (req,res,next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;