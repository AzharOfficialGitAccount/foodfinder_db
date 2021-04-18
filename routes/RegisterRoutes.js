const {Register} = require('../models/Register');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

//getting RegisterUsers details list
router.get(`/`, async (req, res) => {
  const registerId = await Register.find();
  if (!registerId) {
    res.status(500).json({success: false});
  }
  res.status(200).send(registerId);
});

//getting RegisterUsers list by id
router.get('/:id', async (req, res) => {
  const registerId = await Register.findById(req.params.id);

  if (!registerId) {
    res
      .status(500)
      .json({message: 'The user with the given ID was not found.'});
  }
  res.status(200).send(registerId);
});

//creating RegisterUsers
router.post('/', async (req, res) => {
  let registerId = new Register({
    username: req.body.username,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
  });
  registerId = await registerId.save();

  if (!registerId) return res.status(400).send('the user cannot be created!');

  res.send(registerId);
});

//updating RegisterUsers by id
router.put('/:id', async (req, res) => {
  const registerId = await Register.findByIdAndUpdate(
    req.params.id,
    {
      username: req.body.username,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    },
    {new: true},
  );

  if (!registerId) return res.status(400).send('the user cannot be updated!');

  res.send(registerId);
});

//deleting RegisterUsers list by id
router.delete('/:id', (req, res) => {
  Register.findByIdAndRemove(req.params.id)
    .then(registerId => {
      if (registerId) {
        return res
          .status(200)
          .json({success: true, message: 'the user is deleted!'});
      } else {
        return res
          .status(404)
          .json({success: false, message: 'user not found!'});
      }
    })
    .catch(err => {
      return res.status(500).json({success: false, error: err});
    });
});
//retriveing data from register for login authentication
router.post('/login', async (req, res) => {
  const userP = await Register.findOne({username: req.body.username});
  console.log(userP);
  if (
    userP.username == req.body.username &&
    userP.password == req.body.password
  ) {
    const token = jwt.sign(
      // jwt.sign() demands for an object the second parameter is
      {
        userId: userP._id,
      },
      'my name is khan',

      {expiresIn: '1d'},
    );
    res.send({username: userP.username, userToken: token});
  }
});
// end data

module.exports = router;
