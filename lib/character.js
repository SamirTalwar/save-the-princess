define(function() {
    "use strict";

    var cellSize = 50;

    function Character(layer, color, x, y) {
        this.sprite = layer.Sprite(false, {
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

    return Character;
});
