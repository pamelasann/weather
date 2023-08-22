//Cities autocomple Google Api function

function initialize() {
    var searchInput = document.querySelector(".search-container input");
    var options = {
        types: ['(cities)']
    };
    var autocomplete = new google.maps.places.Autocomplete(searchInput, options);

    autocomplete.addListener('place_changed', function () {
        var place = autocomplete.getPlace();
        //$('#lat').val(place.geometry['location'].lat());
        //$('#long').val(place.geometry['location'].lng());
    });
};

window.addEventListener('load', initialize);