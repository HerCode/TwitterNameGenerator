var express = require('express');
var index = require('./routes/index');
var pg = require('pg');
var bodyParser = require('body-parser');
var app = express();

var jsonParser = bodyParser.json();

var config = {
  database: 'twittergenerator',
  port: 5432
};

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/', index);

app.get('/nouns', function(request, response){
  var nounsArray = [];

  var client = new pg.Client(config);
  console.log(request);
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('SELECT noun FROM words ORDER BY id DESC', jsonParser, function(err, rows){
      if(err){
        console.log('Query error', err);
        response.sendStatus(500);
      }else{
        console.log('Here is the query response:', rows.rows)
        for (var i = 0; i < rows.rows.length; i++){
          nounsArray.push(rows.rows[i].noun);
        }
        response.send(nounsArray);
      }

      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })

    })
  })

});

app.get('/adjectives', function(request, response){
  var client = new pg.Client(config);
  var adjectivesArray = [];
  client.connect(function(err){
    if(err){
      console.log('Connection error', err);
    }
    client.query('SELECT adjective FROM words ORDER BY id DESC', jsonParser, function(err, rows){
      if(err){
        console.log('Query error', err);
        response.sendStatus(500);
      }else{
        console.log('Here is the query response:', rows.rows)
        for (var i = 0; i < rows.rows.length; i++){
          adjectivesArray.push(rows.rows[i].adjective);
        }
        response.send(adjectivesArray);
      }

      client.end(function(err){
        if(err){
          console.log('Disconnect error', err);
        }
      })

    })
  })

});


var server = app.listen(3000, handleServerStart);

function handleServerStart() {
  var port = server.address().port;
  console.log("Listening on port ", port);
}
