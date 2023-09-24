import { MovableHitbox } from "./hitbox.js";
var Player = /** @class */ (function () {
    function Player(x, y, width, height, color) {
        this.hitbox = new MovableHitbox(x, y, width, height, true);
        this.color = color;
    }
    Player.prototype.tick = function (block_hitboxes) {
        this.hitbox.tick(block_hitboxes);
    };
    Player.prototype.draw = function (display) {
        display.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, this.color);
    };
    return Player;
}());
export { Player };
//# sourceMappingURL=player.js.map