import { Player } from "./player.js";
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.keys = new Map();
        this.player = new Player(100, 100, 24, 30, "green");
        this.tick();
    }
    Game.prototype.tick = function () {
        var _this = this;
        this.handle_input();
        this.player.tick(this.canvas);
        this.draw();
        window.requestAnimationFrame(function () { return _this.tick(); });
    };
    Game.prototype.draw = function () {
        this.background();
        this.player.draw(this.ctx);
    };
    Game.prototype.background = function () {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    };
    Game.prototype.handle_input = function () {
        if (this.keys.get("w")) {
            if (game.player.hitbox.is_blocked_down(game.canvas)) {
                game.player.hitbox.yv = -3;
            }
        }
        if (this.keys.get("a")) {
            game.player.hitbox.xv = -2.2;
        }
        if (this.keys.get("d")) {
            game.player.hitbox.xv = 2.2;
        }
    };
    return Game;
}());
var game = new Game();
game.tick();
window.addEventListener("keydown", function (event) {
    game.keys.set(event.key, true);
});
window.addEventListener("keyup", function (event) {
    game.keys.set(event.key, false);
});
//# sourceMappingURL=main.js.map