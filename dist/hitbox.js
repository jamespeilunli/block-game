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
    function Hitbox(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    return Hitbox;
}());
export { Hitbox };
var MovableHitbox = /** @class */ (function (_super) {
    __extends(MovableHitbox, _super);
    function MovableHitbox(x, y, width, height, xv, yv, f, g) {
        if (xv === void 0) { xv = 0; }
        if (yv === void 0) { yv = 1; }
        if (f === void 0) { f = 0.95; }
        if (g === void 0) { g = 0.083; }
        var _this = _super.call(this, x, y, width, height) || this;
        _this.xv = xv;
        _this.yv = yv;
        _this.f = f;
        _this.g = g;
        return _this;
    }
    MovableHitbox.prototype.tick = function (hitboxes) {
        this.set_xv(hitboxes, this.xv * this.f);
        this.set_yv(hitboxes, this.yv + this.g);
        this.x += this.xv;
        this.y += this.yv;
    };
    MovableHitbox.prototype.set_xv = function (hitboxes, new_xv) {
        var _this = this;
        // change the x on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some(function (hitbox) { return _this.overlaps_with(hitbox, _this.x + new_xv, _this.y); })) {
            this.xv = new_xv;
        }
        else {
            this.xv = 0;
        }
    };
    MovableHitbox.prototype.set_yv = function (hitboxes, new_yv) {
        var _this = this;
        // change the y on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some(function (hitbox) { return _this.overlaps_with(hitbox, _this.x, _this.y + new_yv); })) {
            this.yv = new_yv;
        }
        else {
            this.yv = 0;
        }
    };
    MovableHitbox.prototype.overlaps_with = function (hitbox, new_x, new_y) {
        return new_y + this.height > hitbox.y &&
            new_y < hitbox.y + hitbox.height &&
            new_x + this.width > hitbox.x &&
            new_x < hitbox.x + hitbox.width;
    };
    return MovableHitbox;
}(Hitbox));
export { MovableHitbox };
//# sourceMappingURL=hitbox.js.map