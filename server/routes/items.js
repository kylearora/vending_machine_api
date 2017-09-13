const express = require("express")
const router = express.Router()
const models = require("../models")

router.get("/api/customer/items", function (req,res){
  models.vendingItems.findAll()
  .then(function(items){
    res.json(items);
  })
})


//Use postman to input items into table in JSON format
//for postman, change to post, headers = key -> Content-Type values -> application/json, then click raw for body and type out your object
router.post("/api/vendor/items", function(req,res) {
  const newVending = models.vendingItems.build({
    name: req.body.name,
    cost: req.body.cost,
    quantity: req.body.quantity,
    desc: req.body.desc
  })
  newVending.save()
  .then(function(newItem){
    res.json({success: true})
  })
})

module.exports = router
