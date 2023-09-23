import { MovableHitbox } from "./hitbox.js";
var Player = /** @class */ (function () {
    function Player(x, y, width, height, color) {
        this.hitbox = new MovableHitbox(x, y, width, height);
        this.color = color;
    }
    Player.prototype.tick = function (blocks) {
        this.hitbox.tick(blocks.map(function (block) { return block.hitbox; }));
    };
    Player.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    Player.prototype.jumpable = function (hitboxes) {
        //return this.hitbox.is_blocked_down(hitboxes, this.hitbox.x, this.hitbox.y);
        return this.hitbox.yv === 0;
    };
    return Player;
}());
export { Player };
//# sourceMappingURL=player.js.map