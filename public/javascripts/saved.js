$(document).ready(function() {

	$(document).on("click", ".leaveNote", function() {

		$('#myModal').modal();
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

		   	  console.log("this is the " + data);
		      // The title of the article
		      var noteDiv = $("<div class='form-group' id='noteDiv'>");
		      // A textarea to add a new note body
		      noteDiv.append("<textarea class='form-control' rows='3' id='bodyInput' max-width='50px' name='body'</textarea>");
		      // A button to submit a new note, with the id of the article saved to it
		      noteDiv.append("<button data-id='" + data._id + "'class='saveNote btn btn-primary'>Save Note</button>");

		      $("#articleNotes").prepend(noteDiv);

		      // If there's a note in the article
		      if (data.note) {
		        // Place the body of the note in the body textarea
		        $("#bodyInput").val(data.note.body);
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
		      // Value taken from note textarea
		      body: $("#bodyInput").val()
		    }
		  })
		    // With that done
		    .done(function(data) {
		      $("#bodyInput").val("");
		    });

		  // Also, remove the values entered in the input and textarea for note entry
		  // $("#bodyInput").val("");
	});

		// When you click the delete article button
		$(document).on("click", ".deleteArticle", function() {
		// Grab the id associated with the button
		  var thisId = $(this).attr("data-id");

		  // Run a POST request to delete article
		   $.ajax({
		    method: "POST",
		    url: "/delete/" + thisId,
		    data: thisId
		   });
		   location.reload();
		});

});
