define(function() {
    "use strict";

    function Character(layer, color, x, y) {
        this.sprite = layer.Sprite(false, {
            color: color,
            x: cellSize * x,
            y: cellSize * y,
            w: cellSize,
            h: cellSize
        });
        this.targetX = this.sprite.x;
        this.targetY = this.sprite.y;
    }

    Character.prototype.move = function(xv, yv) {
        this.targetX = this.sprite.x + xv * cellSize;
        this.targetY = this.sprite.y + yv * cellSize;
        this.sprite.xv = xv;
        this.sprite.yv = yv;
    };

    Character.prototype.update = function() {
        this.sprite.applyVelocity();
        this.sprite.update();
    };

    return Character;
});
