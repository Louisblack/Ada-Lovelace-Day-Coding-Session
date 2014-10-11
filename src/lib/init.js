$(document).ready(function() {
    /*
        Initialise the Instagram API and authenticate.
    */
    instagramApi = Instajam.init({
        clientId: instagramKey,
        redirectUri: 'http://localhost:8080',
        scope: ['basic', 'comments']
    });

    if (!instagramApi.authenticated) {
            window.location = instagramApi.authUrl;
    } else {
        console.log("Logged in");
        console.log(instagramApi);
    }



    addPhotoToPage = function(photo) {
        var newImage = $('<div class="photoContainer"><img class="photo" src="' + photo + '"/></div>' );
        $('#photos').append(newImage);
    }

    addPhotoToMap = function(photo, latitude, longitude) {
        if (!latitude || !longitude) {
			alert("No location info found :(");        
        } else {
            if (!this.map) {
                $('#mapDiv').removeClass('hidden');
                map = new google.maps.Map(document.getElementById("mapDiv"), {
                    zoom: 6,
                    mapTypeId: google.maps.MapTypeId.HYBRID,
                    center: new google.maps.LatLng(latitude, longitude),
                });
                
            }
			
			var myLatlng = new google.maps.LatLng(latitude, longitude);

			var marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});

			google.maps.event.addListener(marker, 'mouseover', function() {
				var image = $("#mapPhoto");
				image.removeClass('hidden');
				image.attr('src', photo);
			});
        }
        
        
    }
    
    loadPhotos = function() {
        instagramApi.user.self.media(function(photos) {
            var moddedPhotos = [];
            photos.data.forEach(function(photo) {
                if (photo.type === "image") {
                    moddedPhotos.push({
                        url: photo.images.standard_resolution.url,
                        longitude: photo.location ? photo.location.longitude : null,
                        latitude: photo.location ? photo.location.latitude : null,
                        hasLocation: photo.location ? true : false
                    });
                }
            });
            photosLoaded(moddedPhotos);
        });
    }
    
    loadPhotos();
});

