const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const https = require("https")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {
    let city = req.body.city;
    let unit = req.body.unit
    let appID = req.body.appID;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=" + unit + "&appid=" + appID;

    https.get(url, (response) => {
        response.on("data", (data) => {
            let weatherData = JSON.parse(data);
            let description = weatherData.weather[0].description;
            let tem = weatherData.main.feels_like;
            res.write("<h1>Hello</h1>")
            res.write("<h1>Weather description in " + city + " is currently " + description + ". </h1>")
            res.write("Temperature in " + city + " is " + tem + " degrees Celcius.");
            res.send()
        })
    })
})

app.listen(3000, () => {
    console.log("Server is running on port 3000....")
})