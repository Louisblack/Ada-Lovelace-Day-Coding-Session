photosLoaded = function(photos) {

    // add your code under this line
    
    forEach(photos, function(photo) {
        addPhotoToPage(photo);
        if (photoHasLocation(photo)) {
            addPhotoToMap(photo);
        }
        
    });

};



