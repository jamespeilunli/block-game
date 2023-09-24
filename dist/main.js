import { Player } from "./player.js";
import { Block } from "./block.js";
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.width = 80;
        this.height = 45;
        this.block_size = 12;
        this.canvas.width = this.width * this.block_size;
        this.canvas.height = this.height * this.block_size;
        this.keys = new Map();
        this.mouse_x = -this.block_size;
        this.mouse_y = -this.block_size;
        this.mouse_down = false;
        this.player = new Player(120, 12, 24, 24, "green");
        this.blocks = [];
        this.block_hitboxes = [];
        for (var i = 0; i < this.height; i++) {
            var new_row = [];
            for (var j = 0; j < this.width; j++) {
                var collidable = i > 10;
                var block = new Block(j * this.block_size, i * this.block_size, collidable, this.block_size, "white");
                new_row.push(block);
                this.block_hitboxes.push(block.hitbox);
            }
            this.blocks.push(new_row);
        }
        this.tick();
    }
    Game.prototype.tick = function () {
        var _this = this;
        this.handle_input();
        this.player.tick(this.block_hitboxes);
        this.draw();
        window.requestAnimationFrame(function () { return _this.tick(); });
    };
    Game.prototype.draw = function () {
        this.background();
        this.player.draw(this.ctx);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block_row = _a[_i];
            for (var _b = 0, block_row_1 = block_row; _b < block_row_1.length; _b++) {
                var block = block_row_1[_b];
                block.draw(this.ctx);
                if (block.hitbox.is_selected(this.mouse_x, this.mouse_y)) {
                    block.hitbox.draw(this.ctx);
                    if (this.mouse_down) {
                        //block.hitbox.draw(this.ctx, "red");
                        block.destroy();
                    }
                }
            }
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
        if (this.keys.get("w") && this.player.hitbox.yv === 0)
            this.player.hitbox.set_yv(this.block_hitboxes, -3);
        if (this.keys.get("a"))
            this.player.hitbox.set_xv(this.block_hitboxes, -2.2);
        if (this.keys.get("d"))
            this.player.hitbox.set_xv(this.block_hitboxes, 2.2);
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
game.canvas.addEventListener("mousemove", function (event) {
    game.mouse_x = event.offsetX;
    game.mouse_y = event.offsetY;
});
game.canvas.addEventListener("mousedown", function (event) {
    game.mouse_down = true;
});
game.canvas.addEventListener("mouseup", function (event) {
    game.mouse_down = false;
});
//# sourceMappingURL=main.js.map