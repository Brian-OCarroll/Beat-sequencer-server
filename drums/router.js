'use strict';

const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


const {drums} = require('./models');


const jwtAuth = require('passport').authenticate('jwt', {
  session: false,
});

// GET mongo endpoint
router.get('/', jwtAuth, (req,res) =>{
   drums.find({ user: req.user.id }).then(posts =>{
      res.json(posts.map(post=> post.serialize()));
    })
    .catch(err =>{
      res.status(500).json({error:'Internal Server Error'})
    });
  });

//Get mongo endpoint by ID
router.get('/:id',(req,res) => {

  drums
    .findById(req.params.id)
    .then(post => res.json(post.serialize()))
      .catch(error =>{
      res.status(500).json({error:'Internal Server Error'})
    });
});

//Post Endpoint for Mongo
router.post('/', (req,res) => {
  // console.log(req.body)
  // res.send(200)
  const requiredkeys = ['user', 'name', 'pads', 'drums'];

  for(let i = 0;i<requiredkeys.length;i++){
    const selector = requiredkeys[i];
    if(!(selector in req.body)){
      const message = `${selector} is not in the body`
      return res.status(400).send(message);
    }
  }
  drums.find({$and: [{name:req.body.name}, {user:req.body.user}]})
  .countDocuments()
  .then(count =>{
    if(count>0){
      return Promise.reject({
        code: 400,
          message: 'Name already in use'
      })
    }
    return;
  })
  .then(data =>{
    return drums.create({
       user: req.body.user,
       name: req.body.name,
       pads: req.body.pads,
       drums: req.body.drums
     });
    })
  .then(drumsPost => res.status(201).json(drumsPost.serialize()))
  .catch(err => {
       res.status(500).json({ error: 'Something went wrong' });
     });
});



//Delete endpoint
 router.delete('/:id', (req, res) => {
  drums
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success' });
    })
    .catch(err => {
      res.status(500).json({ error: 'something went wrong while deleting' });
    });
});






module.exports = {router};