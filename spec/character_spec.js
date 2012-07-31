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
                    applyVelocity: jasmine.createSpy(),
                    x: 4 * cellSize,
                    y: 5 * cellSize
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
                    x: 6 * cellSize,
                    y: 2 * cellSize
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
            expect(sprite.x).toEqual(350);
            expect(sprite.y).toEqual(100);
            expect(sprite.xv).toEqual(0);
            expect(sprite.yv).toEqual(0);
        });

        it('cannot change direction mid-stride', function() {
            var sprite = {
                    update: jasmine.createSpy(),
                    applyVelocity: jasmine.createSpy(),
                    x: 2 * cellSize,
                    y: 1 * cellSize
                },
                character;

            layer.Sprite.andReturn(sprite);

            sprite.applyVelocity.andCallFake(function() {
                sprite.x += sprite.xv;
                sprite.y += sprite.yv;
            });

            character = new Character(layer, 'green', 2, 1);

            character.move(1, 0);
            _(_.range(framesToMove / 2)).each(function() { character.update(); });

            character.move(0, -1);
            _(_.range(framesToMove / 2)).each(function() { character.update(); });

            expect(sprite.x).toEqual(150);
            expect(sprite.y).toEqual(50);
        });

        it('gets in the way of others', function() {
            var sprite = {
                    update: jasmine.createSpy(),
                    applyVelocity: jasmine.createSpy()
                },
                character;

            layer.Sprite.andReturn(sprite);

            character = new Character(layer, '#fff', 7, 3);

            expect(character.isAt(7, 3)).toBe(true);
            expect(character.isAt(8, 3)).toBe(false);
        });
    });
});
