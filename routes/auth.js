const router = require('express').Router()

router.get("/signin",(req, res, next) =>{
    res.render("auth/signin")
})

router.get("/signup", (req, res, next) => {
    res.render("auth/signup")
}) 



module.exports = router 