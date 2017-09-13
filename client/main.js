// fetch('http://localhost:3000/task', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(params)
//   }).then(function(response){
//     return response.json()
//   }).then(function(json){



  function getAllItems() {

      fetch('http://localhost:3000/')
      .then(function(response) {
      return response.json()
      }).then(function(json) {

        // display on the screen
        let vendingItems = json.vendingItems

        var vendingJSON = document.querySelector("#vendingJSON")

        for(var i = 0; i<vendingItems.length;i++) {

              let li = document.createElement("li")
              li.innerHTML = vendingItems[i].name


              vendingJSON.appendChild(li)

        }

    }).catch(function(ex) {
      // console.log('parsing failed', ex)
    })

  }

getAllItems()
