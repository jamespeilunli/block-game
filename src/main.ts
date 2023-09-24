import { Input } from "./input.js";
import { World } from "./world.js";

class Game {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public input: Input;
    public world: World;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
        this.ctx = this.canvas.getContext("2d")!;

        this.canvas.width = 960;
        this.canvas.height = 540;

        this.input = new Input(this.canvas);
        this.world = new World(this.canvas.width, this.canvas.height, 12);

        this.tick();
    }

    public tick(): void {
        this.input.tick(this.world);
        this.world.tick(this.input);

        this.world.draw(this.ctx, this.input);

        window.requestAnimationFrame(() => this.tick());
    }
}

const game = new Game();
game.tick();
(<any>window).game = game; // for debugging
