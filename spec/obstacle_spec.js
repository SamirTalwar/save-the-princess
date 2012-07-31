require(['lib/obstacle'], function (Obstacle) {
    describe('obstacle', function() {
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
    });
});
