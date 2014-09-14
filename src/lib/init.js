
/*
	Initialise the Instagram API and authenticate.
*/
var instagramApi = Instajam.init({
    clientId: '4f9f3a58b64c47fb9f0f9ec8a94b1ea3',
    redirectUri: 'http://localhost:8080',
    scope: ['basic', 'comments']
});

if (!instagramApi.authenticated) {
        window.location = API.authUrl;
} else {
	console.log("Logged in");
	console.log(instagramApi);
}

var addPhotoToPage = function(photo) {
	var newImage = $('<img src="' + photo + '"/>' );
	$('#photos').append(newImage);
}

$(document).ready(function() {
	loadPhotos();
});