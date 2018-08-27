// Grab the articles as a json
$.getJSON("/articles", function (data) {
  console.log("Getting the articles");
  // For each one
  for (var i = 0; i < data.length; i++) {

    // Display the apropos information on the page
    $("#articles").append("<h3 data-id='" + data[i]._id + "'>" + data[i].title + "</h3><a href='" + data[i].link + "'>Link To Article</a><hr>");
  }
});


// Whenever someone clicks a h3 tag
$(document).on("click", "h3", function () {

  // Empty the notes from the note section
  $("#notes").empty();

  // Save the id from the h3 tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log(data);
      // The title of the article
      // $("#notes").append("<h2>" + data.title + "</h2>");
    
      // A textarea to add a new note body
      $("#notes").append("<p>Add Comment:</p><textarea id='bodyinput' name='body'></textarea>");

      // A button to submit a new note, with the id of the article saved to it
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button><hr>");

      console.log("Notes: ", data.note);

      // load all notes for this article
      for (let i in data.note) {
        // add the content of the note(s) down below
        $("#notes").append(`<p>${data.note[i].body}</p><hr>`);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      console.log(data);

      // add the new content to the note list
      $("#notes").append(`<p>${data.note.body}</p><hr>`);

      // Empty the notes section
      // $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#bodyinput").val("");
});


// When you click the scrape button
$(document).on("click", "#scrape", function () {

  // call the scrape route to get articles
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    // With that done, add the note information to the page
    .then(function (data) {
      console.log("Scraped our website");
    })


});
