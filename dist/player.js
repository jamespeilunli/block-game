import { Hitbox } from "./hitbox.js";
var Player = /** @class */ (function () {
    function Player(x, y, width, height, color) {
        this.hitbox = new Hitbox(x, y, width, height);
        this.color = color;
    }
    Player.prototype.tick = function (canvas) {
        this.hitbox.tick(canvas);
    };
    Player.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    };
    return Player;
}());
export { Player };
//# sourceMappingURL=player.js.map