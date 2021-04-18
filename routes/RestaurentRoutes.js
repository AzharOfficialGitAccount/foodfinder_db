const {Restaurent} = require('../models/Restaurent');
const express = require('express');
const router = express.Router();

//getting RestaurentDetails details list
router.get(`/`, async (req, res) => {
  const restuarent = await Restaurent.find();
  if (!restuarent) {
    res.status(500).json({success: false});
  }
  res.status(200).send(restuarent);
});

//getting RestaurentDetails list by id
router.get('/:id', async (req, res) => {
  const restuarent = await Restaurent.findById(req.params.id);

  if (!restuarent) {
    res
      .status(500)
      .json({message: 'The restaurent with the given ID was not found.'});
  }
  res.status(200).send(restuarent);
});

//creating RestaurentDetails
router.post('/', async (req, res) => {
  let restuarent = new Restaurent({
    images: req.body.images,
    title: req.body.title,
    descriptions: req.body.descriptions,
    image: req.body.image,
    ratings: req.body.ratings,
    reviews: req.body.reviews,
  });
  restuarent = await restuarent.save();

  if (!restuarent)
    return res.status(400).send('the restaurent cannot be created!');

  res.send(restuarent);
});

//updating RestaurentDetails by id
router.put('/:id', async (req, res) => {
  const restuarent = await Restuarent.findByIdAndUpdate(
    req.params.id,
    {
      image: req.body.image,
      title: req.body.title,
      descriptions: req.body.descriptions,
      image: req.body.image,
      ratings: req.body.ratings,
      reviews: req.body.reviews,
    },
    {new: true},
  );

  if (!profile)
    return res.status(400).send('the restaurent cannot be updated!');

  res.send(profile);
});

//deleting RestaurentDetails list by id
router.delete('/:id', (req, res) => {
  Restuarent.findByIdAndRemove(req.params.id)
    .then(restuarent => {
      if (restuarent) {
        return res
          .status(200)
          .json({success: true, message: 'the restaurent is deleted!'});
      } else {
        return res
          .status(404)
          .json({success: false, message: 'restaurent not found!'});
      }
    })
    .catch(err => {
      return res.status(500).json({success: false, error: err});
    });
});

module.exports = router;
