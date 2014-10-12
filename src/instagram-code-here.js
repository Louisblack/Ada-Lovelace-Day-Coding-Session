photosLoaded = function(photos) {
    console.log(photos); // So we can see what we get back from Instagram

    // For loop to add photos to page goes here.

    photos.forEach(function(photo) {
        addPhotoToPage(photo);
        if (photoHasLocation(photo)) {
            addPhotoToMap(photo);
        }
        
    });

};



