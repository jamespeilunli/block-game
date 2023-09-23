import { Hitbox } from "./hitbox.js";
var Block = /** @class */ (function () {
    function Block(x, y, size, color) {
        if (size === void 0) { size = 12; }
        this.hitbox = new Hitbox(x, y, size, size);
        this.color = color;
    }
    Block.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    return Block;
}());
export { Block };
//# sourceMappingURL=block.js.map