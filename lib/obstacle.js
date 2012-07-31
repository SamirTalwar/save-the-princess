define(function() {
    "use strict";

    var sprite;

    function Obstacle(layer, color, location) {
        this.location = location;
        sprite = layer.Sprite(false, {
            color: color,
            x: location.x * cellSize,
            y: location.y * cellSize,
            w: location.w * cellSize,
            h: location.h * cellSize
        });
        sprite.update();
    }

    Obstacle.prototype.isAt = function(x, y) {
        return this.location.x <= x
            && this.location.x + this.location.w > x
            && this.location.y <= y
            && this.location.y + this.location.h > y;
    };

    return Obstacle;
});
