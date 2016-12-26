const express = require('express');
const router = express.Router();
const db = require('../db');


/* GET users listing. */
router.get('/', function(req, res, next) {

  db("users").then((users) => {
    res.render("users/index",{
      title: "Usuários",
      users: users,
      partials:  {
        nav: "partials/nav"
      }
    });

  },next)
});

router.get('/add',(req,res,next)=>{
  res.render('users/add',{title: "Adicionar usuário",partials:  {
    nav: "partials/nav"
  }});
});

router.post('/',(req,res,next)=>{
  db("users").insert(req.body).then((ids) => {
    res.redirect('/users');
  },next)
});

module.exports = router;
