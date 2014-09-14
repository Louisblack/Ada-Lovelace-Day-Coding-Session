var photosLoaded = function(response) {
	console.log(response); // So we can see what we get back from Instagram
	var listOfInstagramItems = response.data;

	// For loop to add photos to page goes here.
	for (var i = 0 ; i < listOfInstagramItems.length ; i = i + 1) {
		var item = listOfInstagramItems[i];
		if (item.type === 'image') {
			addPhotoToPage(item.images.standard_resolution.url);
		}	
	}
};


loadPhotos = function() {
	instagramApi.user.self.media(photosLoaded);
}
