const express = require("express")
const router = express.Router()
const models = require("../models")


//get to list all items in the vending machine
router.get("/api/customer/items", function (req,res){
  models.vendingItems.findAll()
  .then(function(items){
    res.json(items);
  })
})


//post to add new items to the vending machine
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
