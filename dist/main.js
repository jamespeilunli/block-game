import { Input } from "./input.js";
import { World } from "./world.js";
var Game = /** @class */ (function () {
    function Game() {
        this.canvas = document.getElementById("canvas");
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.input = new Input(this.canvas);
        this.world = new World(this.canvas.width, this.canvas.height, 12);
        this.tick();
    }
    Game.prototype.tick = function () {
        var _this = this;
        this.input.tick(this.world);
        this.world.tick(this.input);
        this.world.draw(this.ctx, this.input);
        window.requestAnimationFrame(function () { return _this.tick(); });
    };
    return Game;
}());
var game = new Game();
game.tick();
window.game = game; // for debugging
//# sourceMappingURL=main.js.map