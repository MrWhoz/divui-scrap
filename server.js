var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://divui.com/search?countryId=11&cityId=0&categoryId=0&collectionId=0&attractionId=0';

  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var title, release, rating;
      var json = { title : "", release : "", rating : ""};

      $('.product-list').filter(function(){
        var data = $(this);
        data.children().each(function(){
        	console.log($(this).children().attr('href'));
        });
        //}).children().attr('href');
        // title = data.children().first().text().trim();
        // release = data.children().last().children().closest('time').text().trim();
        // console.log(release);
         // json.title = data;
         // json.release = release;
      })

      // $('.ratingValue').filter(function(){
      //   var data = $(this);
      //   rating = data.text().trim();

      //   json.rating = rating;
      // })
    }

    // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    // })

    res.send('Check your console!')
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;