import { Hitbox } from "./hitbox.js";
var Block = /** @class */ (function () {
    function Block(x, y, collidable, size, color) {
        this.hitbox = new Hitbox(x, y, size, size, collidable);
        this.color = color;
    }
    Block.prototype.draw = function (ctx) {
        if (this.hitbox.collidable) {
            ctx.beginPath();
            ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }
    };
    Block.prototype.destroy = function () {
        this.hitbox.collidable = false;
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=block.js.map