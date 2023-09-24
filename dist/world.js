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
            for (var j = 0; j < this.canvas_width / this.block_size; j++) {
                var collidable = i > 10;
                var block = new Block(j * this.block_size, i * this.block_size, collidable, this.block_size, "white");
                this.blocks.push(block);
                this.block_hitboxes.push(block.hitbox);
            }
        }
    }
    World.prototype.tick = function (display, input) {
        this.player.tick(this.block_hitboxes);
        if (input.mouse_down) {
            var i = this.blocks.length;
            while (i--) {
                if (this.blocks[i].hitbox.is_selected(display, input.mouse_x, input.mouse_y)) {
                    this.blocks.splice(i, 1);
                    this.block_hitboxes.splice(i, 1);
                }
            }
        }
    };
    World.prototype.draw = function (display, input) {
        this.background(display);
        for (var _i = 0, _a = this.blocks; _i < _a.length; _i++) {
            var block = _a[_i];
            if (block.hitbox.collidable)
                block.draw(display);
        }
        this.player.draw(display);
    };
    World.prototype.background = function (display) {
        display.absolute_rect(0, 0, display.canvas.width, display.canvas.height, "black");
    };
    World.prototype.new_block = function (x, y, collidable, size, color) {
        var block = new Block(x, y, collidable, size, color);
        this.blocks.push(block);
        this.block_hitboxes.push(block.hitbox);
    };
    return World;
}());
export { World };
//# sourceMappingURL=world.js.map