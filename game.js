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

    Character.prototype.move = function(vx, vy) {
        this.sprite.move(vx * cellSize, vy * cellSize);
        this.draw();
    };

    function setup() {
        player = new Character('#66f', 5, 3);
        player.draw();
    }

    function step() {
        if (input.keyboard.up) {
            player.move(0, -1);
        }
        if (input.keyboard.right) {
            player.move(1, 0);
        }
        if (input.keyboard.down) {
            player.move(0, 1);
        }
        if (input.keyboard.left) {
            player.move(-1, 0);
        }
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
