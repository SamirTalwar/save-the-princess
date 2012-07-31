require(['vendor/sprite', 'lib/globals', 'lib/character'], function(_sprite, _globals, Character) {
    "use strict";

    var scene, ticker, input, background, foreground, player;

    function setup() {
        player = new Character(foreground, '#66f', 5, 3);
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
        player.update();
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
});
