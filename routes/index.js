const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const dbConnection = mongoose.connection;
const Exercise = require('../models');
var dotenv = require('dotenv');
dotenv.config();

router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

router.get('/home', ensureAuthenticated, (req, res) =>
  res.render('home', {
    user: req.user
  })
);

router.get('/exercise', ensureAuthenticated, (req, res) => {
  dbConnection.collection("exercises").find({user: req.user._id}).toArray((err,documents)=>{
    if(err){
     console.log(err);
     res.render('excercise', {data: null, user: req.user, error: 'Error, please try again'});
     } else {
        console.log(documents); 
       var data = documents;
       res.render('exercise', {data: data, user: req.user, error: null});
       console.log(req.user._id)
     }
    });
  });


router.post('/exercise', function (req, res) {
  let exercise = new Exercise(
      {
          user: req.user._id,
          activity: req.body.activity,
          exercisetype: req.body.exercisetype,
          weight: req.body.weight,
          reps: req.body.reps,
          sets: req.body.sets,
          description: req.body.description,
          duration: req.body.duration,
          date: req.body.date
      }
  );
 
  exercise.save(function (err) {
      if (err) {
          if (err) return handleError(err);
      } else {
        dbConnection.collection("exercises").find({user: req.user._id}).toArray((err,documents)=>{
              if(err){
               console.log(err);
               res.render('excercise', {data: null, user: req.user, error: 'Error, please try again'});
               } else {
                  console.log(documents); 
                 var data = documents;
                 res.render('exercise', {data: data, user: req.user, error: null}); 
               } 
          })
      }
  })
});


router.delete ('/exercise/:id', function (req, res) {
  Exercise.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
          if (err) return handleError(err);
      } else {
        dbConnection.collection("exercises").find({user: req.user._id}).toArray((err,documents)=>{
              if(err){
               console.log(err);
               res.render('excercise', {data: null, user: req.user, error: 'Error, please try again'});
               } else {
                  console.log(documents); 
                 var data = documents;
                 res.render('exercise', {data: data, user: req.user, error: null}); 
               } 
          })
      }
  });
});

router.get('/options', ensureAuthenticated, (req, res) =>
  res.render('options',  {
    user: req.user
  })
);


router.get('/overview', ensureAuthenticated, (req, res) =>{
  dbConnection.collection("exercises").find({user: req.user._id}).toArray((err,documents)=>{
      if(err){
       console.log(err);
       res.render('overview', {data: null, user: req.user, error: 'Error, please try again'});
       } else {
          console.log(documents);
         res.render('overview', {data: documents, user: req.user, error: null});
         console.log(documents);
        console.log({user: req.user});     
          }
  });
})



router.get('/data',(req,res)=>{
  dbConnection.collection("exercises").find({user: req.user._id}).toArray((err,documents)=>{
      if(err)
       console.log(err);
      else{
          console.log(documents);
          res.json(documents);
      }
  });
});


module.exports = router;
