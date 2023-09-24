import { Hitbox } from "./hitbox.js";
var Block = /** @class */ (function () {
    function Block(x, y, collidable, size, color) {
        this.hitbox = new Hitbox(x, y, size, size, collidable);
        this.color = color;
    }
    Block.prototype.draw = function (display) {
        display.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, this.color);
    };
    Block.prototype.destroy = function () {
        this.hitbox.collidable = false;
    };
    Block.prototype.create = function () {
        this.hitbox.collidable = true;
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=block.js.map