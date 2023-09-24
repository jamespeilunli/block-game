import { Player } from "./player.js";
import { Block } from "./block.js";
var World = /** @class */ (function () {
    function World(canvas_width, canvas_height, block_size) {
        this.block_size = block_size;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;
        this.player = new Player(0, 0, 24, 24, "green");
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
    World.prototype.tick = function (display, input) {
        this.player.tick(this.block_hitboxes);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block_row = _a[_i];
            for (var _b = 0, block_row_1 = block_row; _b < block_row_1.length; _b++) {
                var block = block_row_1[_b];
                if (block.hitbox.is_selected(display, input.mouse_x, input.mouse_y)) {
                    if (input.mouse_down)
                        block.destroy();
                    if (input.keys.get(" "))
                        block.create();
                }
            }
        }
    };
    World.prototype.draw = function (display, input) {
        this.background(display);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block_row = _a[_i];
            for (var _b = 0, block_row_2 = block_row; _b < block_row_2.length; _b++) {
                var block = block_row_2[_b];
                if (block.hitbox.collidable)
                    block.draw(display);
                if (block.hitbox.is_selected(display, input.mouse_x, input.mouse_y)) {
                    if (input.mouse_down)
                        block.hitbox.draw(display, "red");
                    else
                        block.hitbox.draw(display);
                }
            }
        }
        this.player.draw(display);
    };
    World.prototype.background = function (display) {
        display.absolute_rect(0, 0, display.canvas.width, display.canvas.height, "black");
    };
    return World;
}());
export { World };
//# sourceMappingURL=world.js.map