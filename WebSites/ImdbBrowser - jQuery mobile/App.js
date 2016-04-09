var api = "http://www.omdbapi.com/?"

$(document).on('pagecreate', '#page1', function () {
    $("#search-input").keyup( function () {
        $.getJSON(api, { s: $("input:first").val() }, function (data) {

            $("#search-results").html("");
            $.each(data.Search, function (key, val) {
                $("#search-results").append("<li class='" + val.Type + "'><a id='" + val.imdbID + "' href='#'><img src='" + val.Poster + "'/><h1>" + val.Title + "</h1><p>Year: " + val.Year + "</p></a></li>");
            });

            $("#search-results").listview({
                autodividers: true,
                autodividersSelector: function (li) {
                    var out = li.attr("class");
                    return out;
                }
            }).listview("refresh");

            $("#page1 a").click( function (event) {
                event.preventDefault();
                sessionStorage.selectedId = $(this).attr("id");
                $.mobile.changePage("#page2");
            });
        });      
    });

    $("#form").on("submit", function (event) {
        event.preventDefault();
    });
});

$(document).on("pageshow", "#page2", function () {

    $.getJSON(api, { i: sessionStorage.selectedId }, function (data) {
        $("#Title").text(data.Title + " (" + data.Year + ")");
        $("#Content").text(data.imdbRating + "/10 | " + data.Runtime + " | " + data.Genre + " | " + data.Released)
        $("#Poster").attr("src", data.Poster);
    });
});
