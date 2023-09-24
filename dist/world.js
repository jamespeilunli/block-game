import { Player } from "./player.js";
import { Block } from "./block.js";
var World = /** @class */ (function () {
    function World(canvas_width, canvas_height, block_size) {
        this.block_size = block_size;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.player = new Player(120, 12, 24, 24, "green");
        this.blocks = [];
        this.block_hitboxes = [];
        for (var i = 0; i < this.canvas_height / this.block_size; i++) {
            var new_row = [];
            for (var j = 0; j < this.canvas_width / this.block_size; j++) {
                var collidable = i > 10;
                var block = new Block(j * this.block_size, i * this.block_size, collidable, this.block_size, "white");
                new_row.push(block);
                this.block_hitboxes.push(block.hitbox);
            }
            this.blocks.push(new_row);
        }
    }
    World.prototype.tick = function (input) {
        this.player.tick(this.block_hitboxes);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block_row = _a[_i];
            for (var _b = 0, block_row_1 = block_row; _b < block_row_1.length; _b++) {
                var block = block_row_1[_b];
                if (block.hitbox.is_selected(input.mouse_x, input.mouse_y) && input.mouse_down) {
                    block.destroy();
                }
            }
        }
    };
    World.prototype.draw = function (ctx, input) {
        this.background(ctx);
        this.player.draw(ctx);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block_row = _a[_i];
            for (var _b = 0, block_row_2 = block_row; _b < block_row_2.length; _b++) {
                var block = block_row_2[_b];
                block.draw(ctx);
                if (block.hitbox.is_selected(input.mouse_x, input.mouse_y)) {
                    block.hitbox.draw(ctx);
                    if (input.mouse_down) {
                        block.hitbox.draw(ctx, "red");
                    }
                }
            }
        }
    };
    World.prototype.background = function (ctx) {
        ctx.beginPath();
        ctx.rect(0, 0, this.canvas_width, this.canvas_height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    };
    return World;
}());
export { World };
//# sourceMappingURL=world.js.map