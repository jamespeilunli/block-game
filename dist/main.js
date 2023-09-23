import { Player } from "./player.js";
import { Block } from "./block.js";
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.keys = new Map();
        this.player = new Player(120, 12, 24, 24, "green");
        this.blocks = [];
        for (var i = 0; i < 30; i++) {
            this.blocks.push(new Block(120 + i * 12, 216, 12, "white"));
        }
        for (var i = 0; i < 5; i++) {
            this.blocks.push(new Block(120, 144 + i * 12, 12, "white"));
        }
        for (var i = 0; i < 5; i++) {
            this.blocks.push(new Block(120 + 30 * 12, 144 + i * 12, 12, "white"));
        }
        for (var i = 5; i < 15; i++) {
            this.blocks.push(new Block(144 + i * 12, 180 - 12, 12, "white"));
        }
        this.block_hitboxes = this.blocks.map(function (block) { return block.hitbox; });
        this.tick();
    }
    Game.prototype.tick = function () {
        var _this = this;
        this.handle_input();
        this.player.tick(this.blocks);
        this.draw();
        window.requestAnimationFrame(function () { return _this.tick(); });
    };
    Game.prototype.draw = function () {
        this.background();
        this.player.draw(this.ctx);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            block.draw(this.ctx);
        }
    };
    Game.prototype.background = function () {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    };
    Game.prototype.handle_input = function () {
        if (this.keys.get("w") && this.player.jumpable(this.block_hitboxes))
            this.player.hitbox.change_y(this.block_hitboxes, -3);
        if (this.keys.get("a"))
            this.player.hitbox.change_x(this.block_hitboxes, -2.2);
        if (this.keys.get("d"))
            this.player.hitbox.change_x(this.block_hitboxes, 2.2);
    };
    return Game;
}());
var game = new Game();
game.tick();
window.game = game; // for debugging
window.addEventListener("keydown", function (event) {
    game.keys.set(event.key, true);
});
window.addEventListener("keyup", function (event) {
    game.keys.set(event.key, false);
});
//# sourceMappingURL=main.js.map