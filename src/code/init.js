$(document).ready(function() {
    
    if (!Array.prototype.forEach) {
		Array.prototype.forEach = function(fun /*, thisp*/) {
			var len = this.length >>> 0;
			if (typeof fun != "function") {
				throw new TypeError();
			}
			var thisp = arguments[1];
			for (var i = 0; i < len; i++) {
				if (i in this) {
					fun.call(thisp, this[i], i, this);
				}
			}
		};
	}
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

    $('#logOut').on('click', function() {
        instagramApi.deauthenticate();
        document.location.href = 'https://instagram.com/accounts/logout'
    });

	photoHasLocation = function(photo) {
		return photo.hasLocation;
	};

    addPhotoToPage = function(photo) {
        var newImage = $('<div class="photoContainer"><img class="photo" src="' + photo.url + '"/></div>' );
        $('#photos').append(newImage);
    };

    addPhotoToMap = function(photo) {
        var url = photo.url,
            latitude = photo.latitude,
            longitude = photo.longitude;
            
        if (!latitude || !longitude) {
			alert("No location info found :(");        
        } else {
            if (!this.map) {
                $('#mapDiv').removeClass('hidden');
                map = new google.maps.Map(document.getElementById("mapDiv"), {
                    zoom: 1,
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
				image.attr('src', url);
			});
        }
        
        
    };
    
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
    };
    
    loadPhotos();
});

