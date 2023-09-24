import { Display } from "./display.js";
import { Input } from "./input.js";
import { World } from "./world.js";
var Game = /** @class */ (function () {
    function Game() {
        this.display = new Display();
        this.input = new Input(this.display);
        this.world = new World(this.display.canvas.width, this.display.canvas.height, 12);
        this.display.set_player_hitbox(this.world.player.hitbox);
        this.tick();
    }
    Game.prototype.tick = function () {
        var _this = this;
        this.input.tick(this.world);
        this.world.tick(this.display, this.input);
        this.world.draw(this.display, this.input);
        this.input.draw();
        window.requestAnimationFrame(function () { return _this.tick(); });
    };
    return Game;
}());
var game = new Game();
game.tick();
window.game = game; // for debugging
//# sourceMappingURL=main.js.map