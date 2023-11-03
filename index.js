const auth=require(__dirname + "/auth.js");

const api=require(__dirname + "/api.js");

let token="";
let playLink="";
//Template of express

const express = require("express");
const bodyParser = require('body-parser');
const { createSpotifyPlaylist } = require("./api");


let app = express();
app.use(express.static("src"));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(8888, function() {
  console.log("Server started at port 8888");
});

// Template end

app.get('/', function(req, res) {

    res.sendFile(__dirname + '/src/login.html');
    
});

app.post('/', function(req,res){
    
    
    res.redirect(auth.getAuthLink());
    
});

app.get('/callback' , async function(req,res){
    var code=req.query.code;
    token= await auth.getAccessToken(code);
    res.sendFile(__dirname + '/src/main.html');

});

app.post('/callback',  async function(req,res){
    
    playLink=await api.createSpotifyPlaylist(token,req.body.Genre,req.body.Songnum);
    res.redirect(playLink);
})


