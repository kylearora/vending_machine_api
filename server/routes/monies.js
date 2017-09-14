const express = require("express")
const router = express.Router()
const models = require("../models")


//get to find current total money in the vending machine
router.get("/api/vendor/money", function (req, res){
  models.monies.findAll()
  .then(function(money){
    res.json(money);
  })
})

//get to find current running count of money in vending machine
router.get("/api/vendor/money/count", function(req, res){
  models.moneycounter.findAll().then(function(moneyCount){
    res.json(moneyCount)
  })
})

//post to post new money to the vending machine
router.post("/api/vendor/money", function(req, res){
  const newMoney = models.monies.build({
    totalmoney : req.body.totalmoney
  })
  newMoney.save()
  .then(function(money){
    res.json({success:true})
  })
})

//put to update current money in the vending machine
router.put("/api/vendor/money/:itemId", function(req, res){
  models.monies.find({
    where: {
      id: req.params.itemId
    }
})
 .then(function(monies){
   monies.totalmoney = req.body.totalmoney
   monies.save()
   .then(function(monies){
     res.json({monies:monies})
   })
 })
 .catch(function (error){
   res.status(404).json({errorMessage: "ERROR BRO"})
  })
 })


module.exports = router
