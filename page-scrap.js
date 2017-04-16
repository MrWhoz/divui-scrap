var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
  // Let's scrape Anchorman 2
  url = 'http://divui.com/Dap-xe-chinh-phuc-man-bac-Da-Lat';
  var price, desc, title;
  var img = [];
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      // $('.product-list').filter(function(){
      //   let data = $(this);
      //   data.children().each(function(){
      //   	console.log($(this).children().attr('href'));
      //   });
      // });
      $('.product-title').filter(function(){
        let data = $(this);
        title = data.text().trim();
        console.log('Title : ',title)
      });
      $('.actual-price-display').filter(function(){
        let data = $(this);
        price = data.text().trim();
        console.log('Price : ', price);
      });
      $('.carousel-inner').filter(function(){
        let data = $(this);
        data.children().each(function(){
          img.push($(this).children().attr('src'));
        });
        console.log('img src: ', img);
      });
      $('.overview').filter(function(){
        let data = $(this);
        desc = data.children().first().next().text();
        console.log('Overview : ', desc);
      })
    }

    // fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
    //   console.log('File successfully written! - Check your project directory for the output.json file');
    // })

    res.send(title + ' ' +price + ' ' + img);
  })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;