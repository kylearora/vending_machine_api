const express = require("express")
const app = express()
const bodyParser = require("body-parser")
app.use(bodyParser.json())




const items = require("./routes/items")
app.use(items)

const update = require("./routes/update")
app.use(update)

const purchase = require("./routes/purchase")
app.use(purchase)

const monies = require("./routes/monies")
app.use(monies)

app.listen(3000, function(req, res){
  console.log("We are vending apples");
})
