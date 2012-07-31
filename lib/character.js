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
    }

    Character.prototype.move = function(xv, yv) {
        this.targetX = this.sprite.x + xv * cellSize;
        this.targetY = this.sprite.y + yv * cellSize;
        this.sprite.xv = xv * framesPerSecond / cellSize;
        this.sprite.yv = yv * framesPerSecond / cellSize;
    };

    Character.prototype.update = function() {
        if (this.sprite.x === this.targetX && this.sprite.y === this.targetY) {
            this.sprite.xv = 0;
            this.sprite.yv = 0;
        }
        this.sprite.applyVelocity();
        this.sprite.update();
    };

    return Character;
});
