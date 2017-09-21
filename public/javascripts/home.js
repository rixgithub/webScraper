$(document).ready(function() {

	// Save article button
	$(document).on("click", ".saveButton", function() {
		
		title = $(this).closest(".articleDivs").find(".panel-title");
		excerpt = $(this).closest(".articleDivs").find(".panel-body")
		link = $(this).closest(".articleDivs").find("a");

		// console.log(title[0].textContent);
		// console.log(excerpt[0].textContent);
		// console.log(link[0].href);

		var savedArticleData = {
								title: title[0].textContent, 
								excerpt: excerpt[0].textContent,
						     	link: link[0].href
						 	   };

		  // Run a POST request to save the article data to DB
		  $.ajax({
		    method: "POST",
		    url: "/articles",
		    data: savedArticleData
		  });
		
	});	

});
