require(['vendor/underscore', 'vendor/sprite', 'vendor/jquery'], function() {
require(['lib/globals', 'lib/character', 'lib/obstacle', 'lib/interaction'],
function(Globals, Character, Obstacle, Interaction) {
    "use strict";

    var Movements = {
            up:    {x:  0, y: -1},
            right: {x:  1, y:  0},
            down:  {x:  0, y:  1},
            left:  {x: -1, y:  0},
        },

        scene, ticker, input, background, foreground,
        player, characters, objects, interactions, currentInteraction;

    function setup() {
        var guard = new Character(foreground, '#f33', 14, 5),
            upperWall = new Obstacle(foreground, '#666', {x: 15, y: 0, w: 1, h: 5}),
            lowerWall = new Obstacle(foreground, '#666', {x: 15, y: 6, w: 1, h: 50});
        player = new Character(foreground, '#66f', 12, 5);

        characters = [player, guard];
        objects = [player, guard, upperWall, lowerWall];

        var letMeIn = new Interaction(
            [{x: 13, y: 5}, {x: 14, y: 4}, {x: 14, y: 6}],
            'var name = "Jeremy Cricket";',
            function() {
                this.write('<big>Halt!</big>');
                this.clear();
                this.write('I can\'t let you in unless you\'re on the list.');
                if (this.context.name !== 'Edgar von Lichtenstein') {
                    this.write(' You\'re not on the list.');
                    this.clear();
                    this.write('Who is on the list?');
                    this.clear();
                    this.write('No one. Only <strong>Edgar von Lichtenstein</strong> himself.');
                    this.editor();
                } else {
                    this.clear();
                    this.write('Aha! Looks like you\'re on here, sir. Step right this way.');
                    this.act(function() { guard.move(0, -1); });
                    this.destroy();
                }
            }
        );
        interactions = [letMeIn];

        $('body').click(function(event) {
            $('#editor > textarea').blur();
        });
        $('#editor > textarea').click(function(event) {
            $(this).focus();
            event.stopPropagation();
        }).keypress(stopProp).keydown(stopProp).keyup(stopProp);
    }

    function stopProp(event) {
        event.stopPropagation();
    }

    function step() {
        move();
        pan();
        interact();
    }

    function move() {
        var move = movement();
        if (move && !_(objects).any(function(object) { return object.isAt(player.x + move.x, player.y + move.y); })) {
            player.move(move.x, move.y);
        }
        _(characters).each(function(character) { character.update(); });
    }

    function pan() {
        var map = $('#map');
        map.offset({
            left: Math.floor(Math.min(0, map.width() / 2 - player.offset().x + cellSize / 2) + $('#editor').width()),
            top: Math.floor(Math.min(0, map.height() / 2 - player.offset().y + cellSize / 2))
        });
    }

    function interact() {
        var interaction = _(interactions).find(function(interaction) { return interaction.isAt(player.x, player.y); });
        if (!interaction && currentInteraction) {
            currentInteraction.stop();
        } else if (interaction !== currentInteraction) {
            interaction.execute();
        }

        currentInteraction = interaction;
    }

    function createGame() {
        var sceneElement = $('#scene'),
            width = 40 * cellSize,
            height = 20 * cellSize;

        scene = sjs.Scene({w: width, h: height, autoPause: false, parent: sceneElement[0]});
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
})});
