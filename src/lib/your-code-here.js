photosLoaded = function(photos) {
    console.log(photos); // So we can see what we get back from Instagram

    // For loop to add photos to page goes here.
    for (var i = 0 ; i < photos.length ; i = i + 1) {
        var photo = photos[i];
        addPhotoToPage(photo.url);
    }
};



