//To check when animations are done then do something
$.fn.extend({
  animateCss: function (animationName, callback) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    this.addClass('animated ' + animationName).one(animationEnd, function() {
      $(this).removeClass('animated ' + animationName);
      if (callback) {
        callback();
      }
    });
    return this;
  }
});
// Initial array of gifs
var querys = ["Cow", "Rabbit", "Spongebob", "Mr.Bean", "Science", "Coffee", "Race", "Prank", "Car","Farmer","Burger", "Football"];

function requestGiphy(name) {
  var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=661a0289776d482eb0c501d5a2c52323&q="+name+"&limit=15&offset=0&rating=G&lang=en";
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    if(response.data.length === 0){
      $("#gifs-view").empty()
      .html('<h1>Sorry no results found! try another word.</h1>')
      .addClass('text-center')
    }
    else {
      $("#gifs-view").empty();
      for(var i=0; i < 15; i++ ){
        var gifURL = response.data[i].images.original.url;
        var gifURLStill = response.data[i].images.original_still.url;
        // Creating a div to hold the gif img
        var gifDiv = $("<div class='gif animated flip'>")
        // Creating an element to hold the image
        var gif = $("<img class='img-thumbnail'>")
        .attr("src", gifURLStill)
        .attr('data-name', gif)
        .attr('data-still', gifURLStill)
        .attr('data-moving', gifURL)
        // Appending the image
        gifDiv.append(gif);
        // Putting the entire gif above the previous gifs
        $("#gifs-view").prepend(gifDiv);
      }
    }
  });
}

$('#buttons-view').on('click', '.gifBtn', function(){
  var gifName = $(this).attr("data-name");
  requestGiphy(gifName);
});

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
});

function animateInput() {
  $('input[name=addAnimal').animateCss('bounce');
}

// Function for displaying querys data buttons
/**
* @return {[type]}
*/
function renderButtons(array) {
  // Deleting the gifs prior to adding new gifs
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Looping through the array of gifs
  for (var i = 0; i < array.length; i++) {
    // Then dynamicaly generating buttons for each gif in the array
    var btn = $("<button>");
    // Adding btn class of gif to our button
    btn.addClass("gifBtn btn-primary btn");
    // Adding btn data-attribute
    btn.attr("data-name", array[i]);
    // Providing the initial button text
    btn.text(array[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(btn);
  }
}
renderButtons(querys);
// This function handles events where a gif button is clicked
$("#add-gif").on("click submit", function(event) {
  event.preventDefault();
  // This line grabs the input from the textbox
  // 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend'
  var gif = $("#gif-input").val().trim();
  if(!gif){
    animateInput();
  }
  else {
    if(querys.indexOf(gif) === -1){
      querys.push(gif);
      // Adding gif from the textbox to our array
      // Calling renderButtons which handles the processing of our gif array
      renderButtons(querys);
      requestGiphy(gif);
      $("#gif-input").val('');
    }
    else {
      $("#gif-input").val('')
      .attr('placeholder','Name exists try another!')
      animateInput();
    }
  }
});
// Calling the renderButtons function to display the intial buttons
