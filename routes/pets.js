var express = require('express');
var router = express.Router();
const Pet  = require('../models/Pet.model')

router.get('/add-pet', function(req, res, next) {
  res.render('add-pets');
});

router.post('/create-pet', (req, res)=>{
  console.log("This is the body", req.body)
  Pet.create({
    name: req.body.name,
    age: req.body.age,
    animalType: req.body.animalType, 
    isFixed: req.body.isFixed === 'on',
  }).then((results)=>{
    console.log("Pet was added", results)
    res.render('index', {title: `${req.body.name} was added!`})
  }).catch(err=>{
    console.log("Something went wrong", err)
  })
})

router.get('/all-pets', (req, res)=>{
  //Get all pets
  Pet.find()
  .then((allPets)=>{
    res.render('all-pets', {pets: allPets})
  })
  .catch(err=>{
    console.log("Something went wrong", err)
  })
})


router.get('/update-pet-info/:petId', (req, res)=>{
  //Get all pets
  Pet.findById(req.params.petId)
  .then((foundPet)=>{
    console.log("We found this pet", foundPet)
    res.render('update-pet-info', {
      name: foundPet.name,
      age: foundPet.age,
      animalType: foundPet.animalType,
      isFixed: foundPet.isFixed ? 'on': undefined,
      _id: foundPet._id
    })
  })
  .catch(err=>{
    console.log("Something went wrong", err)
  })
})

router.post('/update-pet-info/:petId', (req, res)=>{
  console.log("BODY", req.body)
  Pet.findByIdAndUpdate(req.params.petId, {
    name: req.body.name,
    age: req.body.age,
    animalType: req.body.animalType, 
    isFixed: req.body.isFixed === 'on',
  })
  .then((foundPet)=>{
    res.render('index', {title: `${req.body.name} updated`})
  })
  .catch(err=>{
    console.log("Something went wrong", err)
  })
})


router.get('/adopt-pet/:petId', (req, res)=>{
  Pet.findByIdAndRemove(req.params.petId)
  .then((adoptedPet)=>{
    console.log("Adopted pet",adoptedPet )
    res.render('index', {title: `${adoptedPet.name} has found a good home`})
  })
  .catch(err=>{
    console.log("Something went wrong:", err)
  })
})

module.exports = router;
