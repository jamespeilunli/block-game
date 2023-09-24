var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Hitbox = /** @class */ (function () {
    function Hitbox(x, y, width, height, collidable) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collidable = collidable;
    }
    Hitbox.prototype.is_selected = function (display, mouse_x, mouse_y) {
        var dx = mouse_x - display.to_canvas_x(this.x);
        var dy = mouse_y - display.to_canvas_y(this.y);
        return 0 <= dx && dx < 12 && 0 <= dy && dy < 12;
    };
    return Hitbox;
}());
export { Hitbox };
var MovableHitbox = /** @class */ (function (_super) {
    __extends(MovableHitbox, _super);
    function MovableHitbox(x, y, width, height, collidable, xv, yv, f, g) {
        if (xv === void 0) { xv = 0; }
        if (yv === void 0) { yv = 1; }
        if (f === void 0) { f = 0.95; }
        if (g === void 0) { g = 0.083; }
        var _this = _super.call(this, x, y, width, height, collidable) || this;
        _this.xv = xv;
        _this.yv = yv;
        _this.f = f;
        _this.g = g;
        return _this;
    }
    MovableHitbox.prototype.tick = function (hitboxes) {
        this.set_xv(this.xv * this.f, hitboxes);
        this.set_yv(this.yv + this.g, hitboxes);
        this.x += this.xv;
        this.y += this.yv;
    };
    MovableHitbox.prototype.set_xv = function (new_xv, hitboxes) {
        var _this = this;
        // change the x on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some(function (hitbox) { return _this.collides_with(hitbox, _this.x + new_xv, _this.y); })) {
            this.xv = new_xv;
        }
        else {
            this.xv = 0;
        }
    };
    MovableHitbox.prototype.set_yv = function (new_yv, hitboxes) {
        var _this = this;
        // change the y on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some(function (hitbox) { return _this.collides_with(hitbox, _this.x, _this.y + new_yv); })) {
            this.yv = new_yv;
        }
        else {
            this.yv = 0;
        }
    };
    MovableHitbox.prototype.collides_with = function (hitbox, new_x, new_y) {
        return hitbox.collidable &&
            new_y + this.height > hitbox.y &&
            new_y < hitbox.y + hitbox.height &&
            new_x + this.width > hitbox.x &&
            new_x < hitbox.x + hitbox.width;
    };
    return MovableHitbox;
}(Hitbox));
export { MovableHitbox };
//# sourceMappingURL=hit_box.js.map