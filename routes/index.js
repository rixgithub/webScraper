var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var mongoose = require("mongoose");
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

mongoose.Promise = Promise;


module.exports = function(router) {
	
	// GET the home page
	router.get('/', function(req, res, next) {
		res.render('home');
	});


	// This will get the articles we scraped from the mongoDB and send to Saved page
	router.get('/saved', function(req, res, next) {
		  // Grab every doc in the Articles array
		  Article.find({}, function(error, doc) {
		    // Log any errors
		    if (error) {
		      console.log(error);
		    }
		    // Or send the doc to the browser as an OBJECT AND NOT AN ARRAY
		    else {

		    	var saveArticlesData = {
		    		articles: []
		    	};

		    	for (var i = 0; i < doc.length; i++) {
		    		var currentArticle = doc[i];
		    		saveArticlesData.articles.push(currentArticle);
	      		}
      			res.render("saved", saveArticlesData);
		    }
		  });
	});


	// A GET request to scrape the website
	router.get("/scrape", function(req, res, next) {

	  // First, we grab the body of the html with request
	  request("https://zcomm.org/znet/", function(error, response, html) {
	    // Then, we load that into cheerio and save it to $ for a shorthand selector
	    if (error) {
	    	console.log("error");
	    	console.log(error);
	    }

	    else {
		    var $ = cheerio.load(html);

		    // save titlesLinks object in array
		    var scrapedArticles = {
		    	articles: []
		    };

		    // within top-coloumns-left class and upw-content class grab items
		    $(".top-coloumns-left .upw-content").each(function(i, element) {

		      // Save the text of each title enclosed in the current element
		      var title = $(this).children(".post-title").text();
		      // Save the text of each excerpt enclosed in the current element
		      var excerpt = $(this).children(".post-excerpt").text();
		      // Save the href value of each link enclosed in the current element
		      var link = $(this).children(".post-title").children("a").attr("href")

		      // If this title element had both a title and a link
		          if (title && excerpt && link) {
		            // Save the data in a variable
		            var titlesExcerptsLinks = {
		            	 title: title,
		            	 excerpt: excerpt,
	                     link: link
		            };  
			    	scrapedArticles.articles.push(titlesExcerptsLinks);
			      };
		    });  
		    res.render("home", scrapedArticles);
	    }

	  }); 
	});


	// Route will save articles to our DB
	router.post("/articles", function(req, res) { 
	  var entry = new Article(req.body);
      // Save that entry to the db
      entry.save(function(err, doc) {
        // Log any errors
        if (err) {
          console.log(err);
        }
        // Or log the doc
        else {
          console.log(doc);
        }
      });
	});


	// Grab an article by it's ObjectId
	router.get("/articles/:id", function(req, res) {
		console.log(req.params.id);
	  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	  Article.findOne({ "_id": req.params.id })
	  // ..and populate all of the notes associated with it
	  .populate("notes")
	  // now, execute our query
	  .exec(function(error, data) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    // Otherwise, send the doc to the browser as a json object
	    else {
	      res.json(data);
	    }
	  });
	});


	// Create a new note or replace an existing note
	router.post("/articles/:id", function(req, res) {
	  // Create a new note and pass the req.body to the entry
	  var newNote = new Note(req.body);

	  // And save the new note the db
	  newNote.save(function(error, data) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    // Otherwise
	    else {
	      // Use the article id to find and update it's note
	      Article.findOneAndUpdate({ "_id": req.params.id }, { "note": data._id })
	      // Execute the above query
	      .exec(function(err, data) {
	        // Log any errors
	        if (err) {
	          console.log(err);
	        }
	        else {
	          // Or send the document to the browser
	          res.send(data);
	        }
	      });
	    }
	  });
	});

		// DELETE ARTICLE route
	// Grab an article by it's ObjectId
	router.post("/delete/:id", function(req, res) {
	  // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
	  Article.findByIdAndRemove({ "_id": req.params.id })
	  .exec(function(error, data) {
	    // Log any errors
	    if (error) {
	      console.log(error);
	    }
	    else {
	    	console.log("need to render page again?");
	    	res.render('saved');
	    }
	  });
	});



};
