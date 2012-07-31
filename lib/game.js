require(['vendor/underscore', 'vendor/sprite', 'lib/globals', 'lib/character', 'lib/obstacle'],
function(_underscore, _sprite, _globals, Character, Obstacle) {
    "use strict";

    var Movements = {
            up:    {x:  0, y: -1},
            right: {x:  1, y:  0},
            down:  {x:  0, y:  1},
            left:  {x: -1, y:  0},
        },

        scene, ticker, input, background, foreground,
        player,
        upperWall, lowerWall,
        objects;

    function setup() {
        player = new Character(foreground, '#66f', 5, 3);
        upperWall = new Obstacle(foreground, '#666', {x: 15, y: 0, w: 1, h: 5});
        lowerWall = new Obstacle(foreground, '#666', {x: 15, y: 6, w: 1, h: 5});
        objects = [player, upperWall, lowerWall];
    }

    function step() {
        var move = movement();
        if (move && !_(objects).any(function(object) { return object.isAt(player.x + move.x, player.y + move.y); })) {
            player.move(move.x, move.y);
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

    function movement() {
        var move = _([[Movements.up, input.keyboard.up],
                      [Movements.right, input.keyboard.right],
                      [Movements.down, input.keyboard.down],
                      [Movements.left, input.keyboard.left]])
                .find(function(item) {
            return item[1];
        });
        return move && move[0];
    }

    window.addEventListener('load', createGame, false);
});
