var Input = /** @class */ (function () {
    function Input(display) {
        var _this = this;
        this.display = display;
        this.keys = new Map();
        this.mouse_x = -100;
        this.mouse_y = -100;
        this.mouse_down = false;
        this.selected_block_texture = "stone-texture";
        window.addEventListener("keydown", function (event) {
            _this.keys.set(event.key, true);
            // prevent scroll on pressing space
            if (event.key === " " && event.target == document.body)
                event.preventDefault();
        });
        window.addEventListener("keyup", function (event) {
            _this.keys.set(event.key, false);
        });
        display.canvas.addEventListener("mousemove", function (event) {
            _this.mouse_x = event.offsetX;
            _this.mouse_y = event.offsetY;
        });
        display.canvas.addEventListener("mousedown", function (event) {
            _this.mouse_down = true;
        });
        display.canvas.addEventListener("mouseup", function (event) {
            _this.mouse_down = false;
        });
    }
    Input.prototype.tick = function (world) {
        if (this.keys.get("w") && world.player.hitbox.yv === 0)
            world.player.hitbox.set_yv(-3, world.block_hitboxes);
        if (this.keys.get("a"))
            world.player.hitbox.set_xv(-2.2, world.block_hitboxes);
        if (this.keys.get("d"))
            world.player.hitbox.set_xv(2.2, world.block_hitboxes);
        if (this.keys.get(" "))
            world.new_block(this.selected_area_x(world.block_size), this.selected_area_y(world.block_size), true, world.block_size + 1, this.selected_block_texture);
        if (this.keys.get("1"))
            this.selected_block_texture = "stone-texture";
        if (this.keys.get("2"))
            this.selected_block_texture = "grass-texture";
        if (this.keys.get("3"))
            this.selected_block_texture = "dirt-texture";
    };
    Input.prototype.draw = function (block_size) {
        this.display.rect(this.selected_area_x(block_size), this.selected_area_y(block_size), block_size, block_size, this.mouse_down ? "red" : "green", true, 2);
    };
    Input.prototype.selected_area_x = function (block_size) {
        return block_size * Math.floor(this.display.to_world_x(this.mouse_x) / block_size);
    };
    Input.prototype.selected_area_y = function (block_size) {
        return block_size * Math.floor(this.display.to_world_y(this.mouse_y) / block_size);
    };
    return Input;
}());
export { Input };
//# sourceMappingURL=input.js.map