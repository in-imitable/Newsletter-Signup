const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/signup.html`)
})

app.post('/', (req, res) => {
    const fName = req.body.fName
    const lName = req.body.lName
    const email = req.body.email
    
    const data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: fName,
                LNAME: lName,
            }
        }]
    }
    const jsonData = JSON.stringify(data)
    
    const API_KEY = "fb43c067178e1a91039f24dae8b3cd16-us21"
    const API_SERVER = "us21"
    const LIST_ID = "3b88a0def3"
    const URL = `https://${API_SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}`

    const options = {
        method: "POST",
        auth: `user1:${API_KEY}`
    }

    const request = https.request(URL, options, (response) => {

        if (response.statusCode === 200){
            res.sendFile(`${__dirname}/success.html`)
        }
        else{
            res.sendFile(`${__dirname}/failure.html`)
        }

        response.on('data', (data) => {
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData)
    request.end()
})

app.post('/failure', (req, res) => {
    res.redirect('/')
})

app.listen(process.env.PORT || 3000, () => {console.log(`Server is running on port 3000`)})











// API Key
// fb43c067178e1a91039f24dae8b3cd16-us21

// List ID
// 3b88a0def3