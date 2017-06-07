$(document).ready(function() {
    console.log( "ready!" );


	$(document).on("click", ".leaveNote", function() {
		// Empty the notes from the note section
		  $("#articleNotes").empty();
		  // Get the unique id for the closest button
		  var thisId = $(this).attr("data-id");

		  // Now make an ajax call for the Article
		  $.ajax({
		    method: "GET",
		    url: "/articles/" + thisId
		  })
		    // With that done, add the note information to the page
		    .done(function(data) {
		
		      // The title of the article
		      var noteDiv = $("<div id='noteDiv'>");
		      noteDiv.append("<h3>" + data.title + "</h3r>");
		      // An input to enter a new title
		      noteDiv.append("<input id='titleinput' name='title' >");
		      // A textarea to add a new note body
		      noteDiv.append("<textarea id='bodyinput' name='body'></textarea>");
		      // A button to submit a new note, with the id of the article saved to it
		      noteDiv.append("<button data-id='" + data._id + "' class='saveNote'>Save Note</button>");

		      $("#articleNotes").prepend(noteDiv);

		      // If there's a note in the article
		      if (data.note) {
		        // Place the title of the note in the title input
		        $("#titleinput").val(data.note.title);
		        // Place the body of the note in the body textarea
		        $("#bodyinput").val(data.note.body);
		      }
	    });
	});


	// When you click the save note button
	$(document).on("click", ".saveNote", function() {
		  // Grab the id associated with the article from the submit button
		  var thisId = $(this).attr("data-id");

		  // Run a POST request to change the note, using what's entered in the inputs
		  $.ajax({
		    method: "POST",
		    url: "/articles/" + thisId,
		    data: {
		      // Value taken from title input
		      title: $("#titleinput").val(),
		      // Value taken from note textarea
		      body: $("#bodyinput").val()
		    }
		  })
		    // With that done
		    .done(function(data) {
		      // Log the response
		      // console.log(data);
		      // Empty the notes section
		      $("#notes").empty();
		    });

		  // Also, remove the values entered in the input and textarea for note entry
		  $("#titleinput").val("");
		  $("#bodyinput").val("");
	});

		// When you click the delete article button
		$(document).on("click", ".deleteArticle", function() {
		// Grab the id associated with the button
		  var thisId = $(this).attr("data-id");
		  console.log(thisId);
		  // Run a POST request to delete article
		   $.ajax({
		    method: "POST",
		    url: "/delete/" + thisId,
		    data: thisId
		   });
		});












});





