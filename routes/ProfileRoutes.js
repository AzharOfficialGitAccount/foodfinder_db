const {Profile} = require('../models/Profile');
const express = require('express');
const router = express.Router();

//getting ProfileUsers details list
router.get(`/`, async (req, res) => {
  const profile = await Profile.find();
  if (!profile) {
    res.status(500).json({success: false});
  }
  res.status(200).send(profile);
});

//getting ProfileUsers list by id
router.get('/:id', async (req, res) => {
  const profile = await Profile.findById(req.params.id);

  if (!profile) {
    res
      .status(500)
      .json({message: 'The user with the given ID was not found.'});
  }
  res.status(200).send(profile);
});

//creating ProfileUsers
router.post('/', async (req, res) => {
  let profile = new Profile({
    image: req.body.image,
    profileName: req.body.profileName,
    email: req.body.email,
    contact: req.body.contact,
    location: req.body.location,
  });
  profile = await profile.save();

  if (!profile) return res.status(400).send('the user cannot be created!');

  res.send(profile);
});

//updating ProfileUsers by id
router.put('/:id', async (req, res) => {
  const profile = await Profile.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      profileName: req.body.profileName,
      email: req.body.email,
      contact: req.body.contact,
      location: req.body.location,
    },
    {new: true},
  );

  if (!profile) return res.status(400).send('the user cannot be updated!');

  res.send(profile);
});

//deleting ProfileUsers list by id
router.delete('/:id', (req, res) => {
  Profile.findByIdAndRemove(req.params.id)
    .then(profile => {
      if (profile) {
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

module.exports = router;
