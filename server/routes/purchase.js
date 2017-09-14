const express = require("express")
const router = express.Router()
const models = require("../models")

//get to find all logs of purchases made
router.get("/api/vendor/purchases", function(req, res){
  models.log.findAll().then(function(purchases){
    res.json(purchases)
  })
})

//post to allow customer to purchase items
//once customer purchases item, total money is updated
//once total money is updated, running money counter table is updated
//once money counter table is updated, log of purchase is made
router.post("/api/customer/items/:itemId/purchases", function(req, res){
  let purchaseMoney = req.body.moneyGiven
  models.vendingItems.find({
    where:{
      id: req.params.itemId
    }
  })
  .then(function(item){
    var change = purchaseMoney - item.cost
    console.log(change);
    item.quantity -= 1
    item.save()
    .then(function(){
      models.monies.findAll()
      .then(function(monies){
        const moniesRecord = monies[0]
        if(change >= 0){
          moniesRecord.totalmoney += item.cost
        }
        moniesRecord.save()
        .then(function(){
          let moneyCounter = models.moneycounter.build({
            moneycount : moniesRecord.totalmoney
          })
          moneyCounter.save()
        })
        .then(function(){
          let newLog = models.log.build({
            name:item.name
          })
            newLog.save()
        })
        .then(function(money){
          res.json({item:item, money:money})
        })
      })
    })
  })
  .catch(function (error){
    console.log(error);
    res.status(400).json(error)
  })
})


module.exports = router
