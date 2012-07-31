define(function() {
    "use strict";

    var sprite;

    function Obstacle(layer, color, location) {
        sprite = layer.Sprite(false, {
            color: color,
            x: location.x * cellSize,
            y: location.y * cellSize,
            w: location.w * cellSize,
            h: location.h * cellSize
        });
        sprite.update();
    }

    return Obstacle;
});
