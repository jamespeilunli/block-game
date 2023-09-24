var Input = /** @class */ (function () {
    function Input(canvas) {
        var _this = this;
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
        canvas.addEventListener("mousemove", function (event) {
            _this.mouse_x = event.offsetX;
            _this.mouse_y = event.offsetY;
        });
        canvas.addEventListener("mousedown", function (event) {
            _this.mouse_down = true;
        });
        canvas.addEventListener("mouseup", function (event) {
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
    };
    return Input;
}());
export { Input };
//# sourceMappingURL=input.js.map