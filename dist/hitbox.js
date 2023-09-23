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
export var Direction;
(function (Direction) {
    Direction[Direction["UpDown"] = 0] = "UpDown";
    Direction[Direction["LeftRight"] = 1] = "LeftRight";
})(Direction || (Direction = {}));
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
        /*
        if (!this.is_blocked_left(hitboxes, this.x + this.xv, this.y)) {
            this.xv *= this.f;
            this.x += this.xv;
        }

        if (!this.is_blocked_down(hitboxes, this.x, this.y + this.yv)) {
            this.yv += this.g;
            this.y += this.yv;
        }
        */
        this.move(hitboxes, Direction.LeftRight, this.xv * this.f);
        this.move(hitboxes, Direction.UpDown, this.yv + this.g);
    };
    MovableHitbox.prototype.move = function (hitboxes, direction, magnitude) {
        switch (direction) {
            case Direction.UpDown:
                if (!this.is_blocked_down(hitboxes, this.x, this.y + magnitude)) {
                    this.yv = magnitude;
                    this.y += this.yv;
                }
                else {
                    this.yv = 0;
                }
                break;
            case Direction.LeftRight:
                this.xv = magnitude;
                if (!this.is_blocked_left_right(hitboxes, this.x + this.xv, this.y)) {
                    this.x += this.xv;
                }
                break;
            default:
        }
    };
    // is there something blocking hitbox from moving down?
    MovableHitbox.prototype.is_blocked_down = function (hitboxes, new_x, new_y) {
        for (var _i = 0, hitboxes_1 = hitboxes; _i < hitboxes_1.length; _i++) {
            var hitbox = hitboxes_1[_i];
            if (new_y + this.height > hitbox.y &&
                new_y < hitbox.y + hitbox.height &&
                new_x + this.width > hitbox.x &&
                new_x < hitbox.x + hitbox.width) {
                //this.y = hitbox.y - this.height; // sets y so that hitbox is right on top of the hitbox below it
                return true;
            }
        }
        return false;
    };
    MovableHitbox.prototype.is_blocked_left_right = function (hitboxes, new_x, new_y) {
        for (var _i = 0, hitboxes_2 = hitboxes; _i < hitboxes_2.length; _i++) {
            var hitbox = hitboxes_2[_i];
            if (new_x + this.width > hitbox.x &&
                new_x < hitbox.x + hitbox.width &&
                new_y + this.height > hitbox.y &&
                new_y < hitbox.y + hitbox.height) {
                return true;
            }
        }
        return false;
    };
    return MovableHitbox;
}(Hitbox));
export { MovableHitbox };
//# sourceMappingURL=hitbox.js.map