var Hitbox = /** @class */ (function () {
    function Hitbox(x, y, width, height, xv, yv, f, g) {
        if (xv === void 0) { xv = 0; }
        if (yv === void 0) { yv = 1; }
        if (f === void 0) { f = 0.95; }
        if (g === void 0) { g = 0.15; }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xv = xv;
        this.yv = yv;
        this.f = f;
        this.g = g;
    }
    Hitbox.prototype.tick = function (canvas) {
        this.xv *= this.f;
        this.x += this.xv;
        if (this.is_blocked_down(canvas)) {
            this.yv = Math.min(0, this.yv);
            this.y = canvas.height - this.height;
        }
        else {
            this.yv += this.g;
        }
        this.y += this.yv;
    };
    // is there something blocking hitbox from moving down?
    Hitbox.prototype.is_blocked_down = function (canvas) {
        return this.y + this.height > canvas.height;
    };
    return Hitbox;
}());
export { Hitbox };
//# sourceMappingURL=hitbox.js.map