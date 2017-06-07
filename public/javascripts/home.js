$(document).ready(function() {
    console.log( "ready!" );

	// get new article Button click
	$("#newScrape").on("click", function(){

		$.getJSON("/scrape", function(data) {
		
			for (var i = 0; i < data.length; i++) {
																											
				$("#scrapeResults").append("<div class='container articleDivs'><div class='well'><ul><li class=title>" + data[i].title + 
					"</li><li><a href=" + data[i].link + " target=_blank>" + data[i].link + 
					"</a></li><li><button class='saveButton btn btn-default'>Save Article</button></li></ul></div></div>");
			}
	 	});
	});

	// Save article button
	$(document).on("click", ".saveButton", function() {
		
		title = $(this).closest(".articleDivs").find(".title");
		link = $(this).closest(".articleDivs").find("a");

		var savedArticleData = {title: title[0].textContent, 
							     link: link[0].href};

		  // Run a POST request to save the article data to DB
		  $.ajax({
		    method: "POST",
		    url: "/articles",
		    data: savedArticleData
		  });
		
	});	




});
