require(['lib/obstacle'], function (Obstacle) {
    "use strict";

    describe('Obstacle', function() {
        var layer, sprite;

        beforeEach(function() {
            layer = jasmine.createSpyObj('layer', ['Sprite']);
            sprite = jasmine.createSpyObj('sprite', ['update']);
            layer.Sprite.andReturn(sprite);
        });

        it('draws itself', function() {
            var obstacle = new Obstacle(layer, 'black', {x: 3, y: 4, w: 2, h: 3});

            expect(layer.Sprite).toHaveBeenCalledWith(false, {
                color: 'black',
                x: 150,
                y: 200,
                w: 100,
                h: 150
            });
            expect(sprite.update).toHaveBeenCalled();
        });

        it('gets in the way', function() {
            var obstacle = new Obstacle(layer, 'black', {x: 6, y: 2, w: 1, h: 5});

            expect(obstacle.isAt(6, 2)).toEqual(true);
            expect(obstacle.isAt(6, 3)).toEqual(true);
            expect(obstacle.isAt(6, 4)).toEqual(true);
            expect(obstacle.isAt(6, 5)).toEqual(true);
            expect(obstacle.isAt(6, 6)).toEqual(true);
        });

        it('does not always get in the way', function() {
            var obstacle = new Obstacle(layer, 'black', {x: 6, y: 2, w: 1, h: 5});

            expect(obstacle.isAt(6, 1)).toEqual(false);
            expect(obstacle.isAt(6, 7)).toEqual(false);
            expect(obstacle.isAt(5, 3)).toEqual(false);
            expect(obstacle.isAt(7, 4)).toEqual(false);
        });
    });
});
