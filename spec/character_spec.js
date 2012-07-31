require(['lib/character'], function(Character) {
    "use strict";

    var framesToMove = framesPerSecond / 4;

    describe('Character', function() {
        var layer;
        
        beforeEach(function() {
            layer = jasmine.createSpyObj('layer', ['Sprite']);
        });

        it('draws itself onto the layer provided', function() {
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
                    applyVelocity: jasmine.createSpy()
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

        it('stops after moving one square', function() {
            var sprite = {
                    update: jasmine.createSpy(),
                    applyVelocity: jasmine.createSpy(),
                    x: 300,
                    y: 100
                },
                character;

            layer.Sprite.andReturn(sprite);

            sprite.applyVelocity.andCallFake(function() {
                sprite.x += sprite.xv;
                sprite.y += sprite.yv;
            });

            character = new Character(layer, 'green', 6, 2);

            character.move(1, 0);

            _(_.range(framesToMove)).each(function() { character.update(); });

            character.update();
            expect(sprite.xv).toEqual(0);
            expect(sprite.yv).toEqual(0);
        });
    });
});
