import { Hitbox } from "./hit_box.js";
var Display = /** @class */ (function () {
    function Display() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 960;
        this.canvas.height = 540;
        /*

       // Set display size (css pixels).
        const width= 960;
        const height = 540;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;

        // Set actual size in memory (scaled to account for extra pixel density).
        const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
        this.canvas.width = Math.floor(width* scale);
        this.canvas.height = Math.floor(height* scale);

        // Normalize coordinate system to use CSS pixels.
        this.ctx.scale(scale, scale);
        */
        this.ctx.imageSmoothingEnabled = false;
        this.player_hitbox = new Hitbox(0, 0, 0, 0, false);
    }
    Display.prototype.set_player_hitbox = function (player_hitbox) {
        this.player_hitbox = player_hitbox;
    };
    Display.prototype.image = function (x, y, width, height, id) {
        this.ctx.drawImage(document.getElementById(id), this.to_canvas_x(x), this.to_canvas_y(y), width, height);
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