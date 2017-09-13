const express = require("express")
const router = express.Router()
const models = require("../models")


router.post("/api/customer/items/:itemId/purchases", function(req, res){
  let purchaseMoney = req.body.moneyGiven
  models.vendingItems.find({
    where:{
      id: req.params.itemId
    }
  })
  .then(function(item){
    let change = purchaseMoney - item.cost
    item.quantity -= 1
    item.save()
    .then(function(item){
      models.monies.find({
        where: {
          id: req.params.itemId
        }
      })
      .then (function(monies){
        if(change > 0){
          monies.totalmoney += item.cost
        }
      })
      monies.save()
      .then(function(money){
        res.json({item:item})
      })
    })
  })
  .catch(function (error){
    res.status(404).json({errorMessage: "YOU NEED MORE MONEY, DAWG"})
  })
})



module.exports = router
//
// router.post('/api/customer/items/:itemId/purchases', function (req, res) {
//   let moneyInput = req.body.moneyGiven
//
//   Item.findOne({
//     _id: req.params.itemId
//   })
//   .then(function (item) {
//     let changeGiven = moneyInput - item.cost
//     item.quantity -= 1
//     item.save()
//     .then(function (item) {
//       Machine.findOne()
//       .then(function (machine) {
//         if (changeGiven > 0) {
//           machine.totalMoney += item.cost
//           machine.log.push({
//             status: 'Success',
//             data: {
//               item: item.description,
//               moneyInput: moneyInput,
//               changeGiven: changeGiven,
//               time: Date.now()
//             }
//           })
//           machine.save()
//           .then(function (machine) {
//             res.json({
//               status: 'Success',
//               data: {
//                 item: item.description,
//                 moneyInput: moneyInput,
//                 changeGiven: changeGiven,
//                 time: Date.now()
//               }
//             })
//           })
//           .catch(function (error) {
//             res.status(400).json(error)
//           })
//         } else {
//           machine.log.push({
//             status: 'Failure',
//             data: {
//               moneyInput: moneyInput,
//               moneyRequired: item.cost
//             }
//           })
//           machine.save()
//           .then(function (machine) {
//             res.json({
//               status: 'Failure',
//               data: {
//                 moneyInput: moneyInput,
//                 moneyRequired: item.cost
//               }
//             })
//           })
//           .catch(function (error) {
//             res.status(400).json(error)
//           })
//         }
//       })
//     })
//   })
//   .catch(function (error) {
//     res.status(404).json({errorMessage: 'Item not found in inventory. Please select again'})
//   })
// })
