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

router.get('/edit/:id',(req,res,next)=>{
  const {id} = req.params;

  db("users")
  .where("id", id)
  .first()
  .then((user) => {

    res.render("users/update",{
      title: "Atualizar usuário",
      user: user,
      partials:  {
        nav: "partials/nav"
      }
    });
  },next);


});

router.put('/edit/:id', (req,res,next)=>{
  const {id} = req.params;

  db("users")
  .where('id', id)
  .update(req.body)
  .then((r) => {
    if (r === 0) {
      return res.send(400);
    }
    res.redirect('/users');
  },next)
});

router.delete('/delete/:id', (req,res,next)=>{
  const {id} = req.params;

  db("users")
  .where('id', id)
  .delete()
  .then((r) => {
    if (r === 0) {
      return res.send(400);
    }
    res.redirect('/users');
  },next)
});

module.exports = router;
