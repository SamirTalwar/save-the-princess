require(['lib/character'], function(Character) {
    describe('Character', function() {
        it('draws itself onto the layer provided', function() {
            var layer = jasmine.createSpyObj('layer', ['Sprite']);

            new Character(layer, 'red', 8, 3);

            expect(layer.Sprite).toHaveBeenCalledWith(false, {
                color: 'red',
                x: 400,
                y: 150,
                w: 50,
                h: 50
            });
        });
    });
});
