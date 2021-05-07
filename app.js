const express = require("express");

const https = require("https");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const appkey="d88fbd073d9d36adc4c4c00bb7ef0e6d";
  const unit ="metric";
  const query = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+appkey+"&units="+unit;

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const jsondata = JSON.parse(data);
      const temp = jsondata.main.temp;
          const desc = jsondata.weather[0].description;

      const icon = jsondata.weather[0].icon;

      const imageurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

      res.write("<h1>The temperature in "+query+" is: " + temp + " degrees Celcius.</h1>")
      res.write("The weather is currently " + desc+ "<br>");
      res.write("<img src="+imageurl+">");

      res.send();
    })


  })
})

app.listen(3000, function() {
  console.log("Server Started at port 3000");
})
