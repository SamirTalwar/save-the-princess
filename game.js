(function() {
    "use strict";

    var cellSize = 50,

        framesPerSecond = 100,
        millisecondsPerFrame = 1000 / framesPerSecond,

        scene, ticker, input, background, foreground,
        player;

    function Character(color, x, y) {
        this.sprite = foreground.Sprite(false, {
            color: color,
            x: cellSize * x,
            y: cellSize * y,
            w: cellSize,
            h: cellSize
        });
    }

    Character.prototype.draw = function() {
        this.sprite.update();
    };

    function setup() {
        player = new Character('#66f', 5, 3);
        player.draw();
    }

    function step() {
    }

    function createGame() {
        var width = document.body.offsetWidth,
            height = document.body.offsetHeight;

        scene = sjs.Scene({w: width, h: height});
        ticker = scene.Ticker(step, {tickDuration: millisecondsPerFrame});
        input = scene.Input();
        background = scene.Layer('background', {color: '#3c3'});
        foreground = scene.Layer('foreground');

        setup();
        ticker.run();
    }

    window.addEventListener('load', createGame, false);
}());
