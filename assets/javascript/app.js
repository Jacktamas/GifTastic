
// Initial array of gifs
var animals = ["cow", "rabit", "monkey", "zebra", "lion", "sheep", "hourse", "pig", "jaguar"];

$('#buttons-view').on('click', '.gifBtn', function(){
  var gif = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=661a0289776d482eb0c501d5a2c52323&q="+gif+"&limit=12&offset=0&rating=G&lang=en'";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    // console.log(response);
    $("#gifs-view").empty();
    for(var i=0; i < response.data.length; i++ ){
      var gifURL = response.data[i].images.original.url;
      var gifURLStill = response.data[i].images.original_still.url;
      // Creating a div to hold the gif img
      var gifDiv = $("<div class='gif animated zoomIn'>")

      // Creating an element to hold the image
      var gif = $("<img width='282' height='180' img img-responsive>")
      .attr("src", gifURLStill)
      .attr('data-name', gif)
      .attr('data-still', gifURLStill)
      .attr('data-moving', gifURL)
      // Appending the image
      gifDiv.append(gif);

      // Putting the entire gif above the previous gifs
      $("#gifs-view").prepend(gifDiv);
    }


  });
  //<div dat-name, data-still, data-moving><img></div>

})

$('#gifs-view').on('click', 'img', function(){
  var movingGif =  $(this).attr('data-moving');
  var stillGif = $(this).attr('data-still');

  var state = $(this).attr('src');
  if(state === movingGif){
    $(this).attr('src', stillGif)
  }
  else {
    $(this).attr('src', movingGif);
  }

})

// Function for displaying gif data
function renderButtons() {

  // Deleting the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of gifs
  for (var i = 0; i < animals.length; i++) {

    // Then dynamicaly generating buttons for each gif in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var btn = $("<button>");
    // Adding btn class of gif to our button
    btn.addClass("gifBtn");
    // Adding btn data-attribute
    btn.attr("data-name", animals[i]);
    // Providing the initial button text
    btn.text(animals[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(btn);
  }
}

// This function handles events where a gif button is clicked
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  var gif = $("#gif-input").val().trim();

  // Adding gif from the textbox to our array
  animals.push(gif);

  // Calling renderButtons which handles the processing of our gif array
  renderButtons();
});

// Calling the renderButtons function to display the intial buttons
renderButtons();
