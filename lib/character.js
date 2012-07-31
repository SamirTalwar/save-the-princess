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
        this.x = x;
        this.y = y;
    }

    Character.prototype.move = function(xv, yv) {
        if (this.moving()) {
            return;
        }

        this.x += xv;
        this.y += yv;
        this.sprite.xv = xv * framesPerSecond / cellSize;
        this.sprite.yv = yv * framesPerSecond / cellSize;
    };

    Character.prototype.update = function() {
        if (!this.moving()) {
            this.sprite.xv = 0;
            this.sprite.yv = 0;
        }
        this.sprite.applyVelocity();
        this.sprite.update();
    };

    Character.prototype.moving = function() {
        return this.sprite.x !== this.x * cellSize || this.sprite.y !== this.y * cellSize;
    }

    Character.prototype.isAt = function(x, y) {
        return this.x === x && this.y === y; 
    }

    return Character;
});
