window.addEventListener('load', function() {
    "use strict";

    var width = document.body.offsetWidth,
        height = document.body.offsetHeight,

        cellSize = 50,

        framesPerSecond = 100,
        millisecondsPerFrame = 1000 / framesPerSecond,

        scene, ticker, background, foreground,
        player;

    function pos(n) {
        return cellSize * n;
    }

    function setup() {
        player = foreground.Sprite(false, {
            color: '#66f',
            x: pos(5),
            y: pos(3),
            w: cellSize,
            h: cellSize
        });
        player.update();
    }

    function step() {
    }

    scene = sjs.Scene({w: width, h: height});
    ticker = scene.Ticker(step, {tickDuration: millisecondsPerFrame});
    background = scene.Layer('background', {color: '#3c3'});
    foreground = scene.Layer('foreground');

    setup();
    ticker.run();
}, false);
