// basic array to draw from
var gifTopics = ["You're trippin", "WTF", "Ah Hell Nah!", "Rude!", "I didn't do it", "I quit!"];

// making some buttons
function renderButtons() {
    $("#buttonsView").empty();

    for (var i = 0; i < gifTopics.length; i++) {
        var a = $("<button>");

        // add class
        a.addClass("ajaxRequestButton btn btn-warning");
        // add data-attribute for value of movie in array
        a.attr("data-name", gifTopics[i]);
        // providing the button's text
        a.text(gifTopics[i]);
        // push button to HTML
        $("#buttonsView").append(a);
        // $("#buttonsView").addClass("btn btn-primary");
    }
}
renderButtons();
var whatsUP = "";

$(document).on("click", ".ajaxRequestButton", function () {
    var gif = $(this).attr("data-name");
    var howMany = $("#quantity option:selected").val();

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=ewqhL9xsE6CCXibSRfW7hn6HVK6cRSfz&q=" + gif + "&limit=" + howMany + "&rating=pg";
    // this is for ajax call later

    event.preventDefault();


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        $("#GIFDisplay").empty();
        console.log(response);
        var gifDiv = $("<div class='movie'>");

        for (var i = 0; i < response.data.length; i++) {
            var contDIV = $("<div class='stackLeft'>")
            var imgDIV = $("<img>")
            imgDIV.attr("data-state", "still");
            imgDIV.attr("src", response.data[i].images.fixed_height_still.url);

            imgDIV.attr("data-animated", response.data[i].images.fixed_height.url);
            imgDIV.attr("data-still", response.data[i].images.fixed_height_still.url);
            imgDIV.addClass("playPause");

            contDIV.append("<p>" + response.data[i].rating + "</p>");
            contDIV.append(imgDIV);
            $("#GIFDisplay").append(contDIV);
        }
    });
})
                $(document).on("click", ".playPause", function () {
                    if ($(this).attr("data-state") === "animate") {
        
                        var stillURL = $(this).attr("data-still");
                        console.log(animatedURL);
                        $(this).attr("data-state", "still");
                        $(this).attr("src", stillURL);
        
                    } else if ($(this).attr("data-state") === "still") {
        
                        var animatedURL = $(this).attr("data-animated");
                        console.log(animatedURL);
                        $(this).attr("data-state", "animate");
                        $(this).attr("src", animatedURL);
                    }
                });


$("#addGIFButton").on("click", function () {
    event.preventDefault();
    var gif = $("#gifEntry").val();
    gifTopics.push(gif);
    renderButtons();
})

