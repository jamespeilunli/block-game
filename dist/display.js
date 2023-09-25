import { Hitbox } from "./hit_box.js";
var Display = /** @class */ (function () {
    function Display() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.ctx.imageSmoothingEnabled = false; // make images clear
        this.player_hitbox = new Hitbox(0, 0, 0, 0, false);
    }
    Display.prototype.set_player_hitbox = function (player_hitbox) {
        this.player_hitbox = player_hitbox;
    };
    Display.prototype.image = function (x, y, width, height, texture) {
        this.absolute_image(this.to_canvas_x(x), this.to_canvas_y(y), width, height, texture);
    };
    Display.prototype.absolute_image = function (canvas_x, canvas_y, width, height, texture) {
        this.ctx.drawImage(document.getElementById(texture), canvas_x, canvas_y, width, height);
    };
    Display.prototype.rect = function (x, y, width, height, color, outline, stroke_width) {
        if (outline === void 0) { outline = false; }
        if (stroke_width === void 0) { stroke_width = 2; }
        this.absolute_rect(this.to_canvas_x(x), this.to_canvas_y(y), width, height, color, outline, stroke_width);
    };
    Display.prototype.absolute_rect = function (canvas_x, canvas_y, width, height, color, outline, stroke_width) {
        if (outline === void 0) { outline = false; }
        if (stroke_width === void 0) { stroke_width = 2; }
        if (outline) {
            this.ctx.lineWidth = stroke_width;
            this.ctx.strokeStyle = color;
            this.ctx.strokeRect(canvas_x, canvas_y, width, height);
        }
        else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(canvas_x, canvas_y, width, height);
        }
    };
    // convert from x in game to x in the canvas (canvas x is relative to player x, and player is in the center)
    Display.prototype.to_canvas_x = function (x) {
        return x - this.player_hitbox.x + this.canvas.width / 2;
    };
    Display.prototype.to_world_x = function (canvas_x) {
        return canvas_x - this.canvas.width / 2 + this.player_hitbox.x;
    };
    // convert from y in game to y in the canvas (canvas y is relative to player y, and player is in the center)
    Display.prototype.to_canvas_y = function (y) {
        return y - this.player_hitbox.y + this.canvas.height / 2;
    };
    Display.prototype.to_world_y = function (canvas_y) {
        return canvas_y - this.canvas.height / 2 + this.player_hitbox.y;
    };
    return Display;
}());
export { Display };
//# sourceMappingURL=display.js.map