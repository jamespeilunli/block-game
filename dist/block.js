import { Hitbox } from "./hit_box.js";
var Block = /** @class */ (function () {
    function Block(x, y, collidable, size, texture) {
        this.hitbox = new Hitbox(x, y, size, size, collidable);
        this.texture = texture;
    }
    Block.prototype.draw = function (display) {
        display.image(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, this.texture);
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=block.js.map