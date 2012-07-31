require(['lib/character'], function(Character) {
    "use strict";

    var framesToMove = framesPerSecond / 4;

    describe('Character', function() {
        var layer;
        
        beforeEach(function() {
            layer = jasmine.createSpyObj('layer', ['Sprite']);
        });

        it('draws itself onto the layer provided', function() {
            var sprite = {
                x: 400,
                y: 150
            };

            layer.Sprite.andReturn(sprite);

            new Character(layer, 'red', 8, 3);

            expect(layer.Sprite).toHaveBeenCalledWith(false, {
                color: 'red',
                x: 400,
                y: 150,
                w: 50,
                h: 50
            });
        });

        it('moves one square per quarter second', function() {
            var sprite = {
                    update: jasmine.createSpy(),
                    applyVelocity: jasmine.createSpy(),
                    x: 200,
                    y: 250
                },
                character;

            layer.Sprite.andReturn(sprite);

            character = new Character(layer, 'green', 4, 5);

            character.move(0, 1);

            _(_.range(framesToMove)).each(function(i) {
                character.update();
                expect(sprite.xv).toEqual(0);
                expect(sprite.yv).toEqual(2);
                expect(sprite.applyVelocity.calls.length).toEqual(i + 1);
                expect(sprite.update).toHaveBeenCalled();
            });
        });
    });
});
