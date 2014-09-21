
/*
	Initialise the Instagram API and authenticate.
*/
var instagramApi = Instajam.init({
    clientId: instagramKey,
    redirectUri: 'http://localhost:8080',
    scope: ['basic', 'comments']
});

if (!instagramApi.authenticated) {
        window.location = API.authUrl;
} else {
	console.log("Logged in");
	console.log(instagramApi);
}

var map = new google.maps.Map(document.getElementById("map"), {
	zoom: 6
});

var addPhotoToPage = function(photo) {
	var newImage = $('<img src="' + photo + '"/>' );
	$('#photos').append(newImage);
}

var addPhotoToMap = function(photo, lat, long) {
	$('#map').removeClass('hidden');
	var myLatlng = new google.maps.LatLng(lat, long);

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map
	});

	google.maps.event.addListener(marker, 'mouseover', function() {
		var image = $("#image");
		image.removeClass('hidden');
		image.attr('src', photo);
  	});
}

$(document).ready(function() {
	loadPhotos();
});