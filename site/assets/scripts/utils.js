function webcam(success, failure) {
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;

    // check for camerasupport
    if (navigator.mediaDevices) {
        navigator.mediaDevices.getUserMedia({video : true}).then(success).catch(failure);
    } else if (navigator.getUserMedia) {
        navigator.getUserMedia({video : true}, gumSuccess, gumFail);
    } else {
        alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
    }
}