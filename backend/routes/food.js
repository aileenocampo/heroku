var express = require('express');
var router = express.Router();
const knex = require('knex')(require('../knexfile.js')['development']);

/* GET users listing. */
router.get('/', function(req, res) {
  knex.select().table('data').orderBy('id', 'asc')
    .then(response => res.status(200).json(response))
    .catch(err => res.status(404).send("There was an error"))
});

router.post('/', function(req, res) {
  knex('data')
    .insert({
      name: req.body.name,
      servings: req.body.servings,
      image_url: req.body.image_url
    })
    .then(response => res.status(200).json({message: 'Success'}))
    .catch(err => res.status(404).send("Failed to submit meal"))
})

router.delete('/', function(req, res) {
  knex('data')
    .del()
    .where({id: req.body.id})
    .then(response => res.status(200).json({message: 'Success'}))
    .catch(err => res.status(404).send("Failed to delete meal"))
})

router.patch('/', function(req, res) {
  knex('data')
    .update({servings: req.body.servings})
    .where({id: req.body.id})
    .then(response => res.status(200).json({message: 'Success'}))
    .catch(err => res.status(404).send("Failed to delete meal"))
})

module.exports = router;
