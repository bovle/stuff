var api = "http://www.omdbapi.com/?";
var id = "nothing";

$(document).on("pagecreate", "#page1", function () {
    ko.applyBindings(new page1ViewModel(), document.getElementById('page1'));
});

function page1ViewModel() {
    var self = this;
    self.search = ko.observable();
    self.searchData = ko.observableArray();
    self.search.subscribe(function (newValue) {
        $.getJSON(api, { s: newValue }, function (data) {
            self.searchData(data.Search);          
        });
    });

    self.movieClicked = function (movie) {
        id = movie.imdbID;
        $.mobile.changePage("#page2");
    }
    self.doNothing = function () {}
};


$(document).on("pagecreate", "#page2", function () {
    ko.applyBindings(new page2ViewModel, document.getElementById('page2'));
});

$(document).on("pagebeforeshow", "#page2", function () {
    var self = ko.dataFor($("#page2")[0]);
    $.getJSON(api, { i: id }, function (data) {
        self.Title(data.Title);
        self.Year(data.Year);
        self.imdbRating(data.imdbRating);
        self.RunTime(data.Runtime);
        self.Genre(data.Genre);
        self.Released(data.Released);
        self.Poster(data.Poster);
    });
});

function page2ViewModel() {
    var self = this;
    self.Title = ko.observable();
    self.Year = ko.observable();
    self.imdbRating = ko.observable();
    self.RunTime = ko.observable();
    self.Genre = ko.observable();
    self.Released = ko.observable();
    self.Poster = ko.observable();

    self.TitleWithYear = ko.computed(function () {
        return self.Title() + " (" + self.Year() + ")";
    });
    self.Content = ko.computed(function () {
        return self.imdbRating() + "/10 | " + self.RunTime() + " | " + self.Genre() + " | " + self.Released()
    });
};