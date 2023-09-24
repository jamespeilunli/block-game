var Input = /** @class */ (function () {
    function Input(display) {
        var _this = this;
        this.display = display;
        this.keys = new Map();
        this.mouse_x = -100;
        this.mouse_y = -100;
        this.mouse_down = false;
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
            world.new_block(this.selected_area_x(), this.selected_area_y(), true, 13, "black");
    };
    Input.prototype.draw = function () {
        this.display.rect(this.selected_area_x(), this.selected_area_y(), 12, 12, this.mouse_down ? "red" : "green", true, 2);
    };
    Input.prototype.selected_area_x = function () {
        return 12 * Math.floor(this.display.to_world_x(this.mouse_x) / 12);
    };
    Input.prototype.selected_area_y = function () {
        return 12 * Math.floor(this.display.to_world_y(this.mouse_y) / 12);
    };
    return Input;
}());
export { Input };
//# sourceMappingURL=input.js.map