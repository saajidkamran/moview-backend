const router = require('express').Router();
const passport = require('passport');

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/github', passport.authenticate('github', { scope: ['profile'] }));


router.get('/login/fail', (req, res) => {
    res.status(401).json({
        success: false,
        message: 'failure',
    });
});

router.get('/login/success', (req, res) => {
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'successful',
            user: req.user,
        });
    }
});

router.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("http://localhost:3001")
})

router.get(
    '/google/calback',
    passport.authenticate('google', {
        failureRedirect: '/login/failed',
       
    }),
);
router.get(
    '/github/calback',
    passport.authenticate('github', {
        failureRedirect: '/login/failed',
        successRedirect: 'http://localhost:3001/review',
    }),
);
module.exports = router;
