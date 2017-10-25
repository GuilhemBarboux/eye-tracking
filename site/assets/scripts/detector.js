var detector = (function() {
    var lastTime = 0,
        URL = window.URL || window.webkitURL,
        clmTrackr,
        canvasDisplay,
        scoreDisplay,
        convergenceDisplay,
        started;

    // Public Methods
    function start(options) {
        options = options || {};

        if (!clmTrackr)
            initClmTrackr();

        if (options.canvas)
            canvasDisplay = options.canvas;

        if (options.score)
            scoreDisplay = options.score;

        if (options.convergence)
            convergenceDisplay = options.convergence;

        if (video) {
            started = true;
            clmTrackr.start(video);
            drawClmTrackr();
        }
    }

    function stop() {
        started = false;
        clmTrackr.stop();
    }

    // Private Methods
    function initClmTrackr() {
        clmTrackr = new clm.tracker();
        clmTrackr.init();
    }

    function detectFace() {
        return clmTrackr.getCurrentPosition();
    }

    function detectEyes() {

    }

    function drawClmTrackr() {
        canvasDisplay.getContext('2d').clearRect(0,0,400,300);
        clmTrackr.draw(canvasDisplay);

        if (scoreDisplay)
            scoreDisplay.innerHTML = clmTrackr.getScore();

        if (convergenceDisplay)
            convergenceDisplay.innerHTML = clmTrackr.getScore();

        if (started) {
            rac(drawClmTrackr);
        }
    }

    // Helpers
    function rac(callback, element) {
        var requestAnimationFrame =
            window.requestAnimationFrame		||
            window.webkitRequestAnimationFrame	||
            window.mozRequestAnimationFrame		||
            window.oRequestAnimationFrame		||
            function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() {
                    callback(currTime + timeToCall);
                }, timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        return requestAnimationFrame.call(window, callback, element);
    }

    function gum(options, success, error) {
        var getUserMedia =
            window.navigator.getUserMedia ||
            window.navigator.mozGetUserMedia ||
            window.navigator.webkitGetUserMedia ||
            function(options, success, error) {
                error();
            };

        return getUserMedia.call(window.navigator, options, success, error);
    }

    return {
        URL: URL,
        requestAnimationFrame: rac,
        getUserMedia: gum,
        start: start,
        stop: stop
    };
})();