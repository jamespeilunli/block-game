import { Display } from "./display.js"
import { Input } from "./input.js";
import { World } from "./world.js";

class Game {
    public readonly display: Display;
    public input: Input;
    public world: World;

    constructor() {
        this.display = new Display();

        this.input = new Input(this.display.canvas);
        this.world = new World(this.display.canvas.width, this.display.canvas.height, 12);

        this.display.set_player_hitbox(this.world.player.hitbox);

        this.tick();
    }

    public tick(): void {
        this.input.tick(this.world);
        this.world.tick(this.display, this.input);

        this.world.draw(this.display, this.input);

        window.requestAnimationFrame(() => this.tick());
    }
}

const game = new Game();
game.tick();
(<any>window).game = game; // for debugging
