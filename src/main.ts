import { Player } from "./player.js";
import { Block } from "./block.js";
import { Hitbox, Direction } from "./hitbox.js";

class Game {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public keys: Map<string, boolean>;
    public player: Player;
    public blocks: Block[];
    public block_hitboxes: Hitbox[];

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
        this.ctx = this.canvas.getContext("2d")!;

        this.canvas.width = 960;
        this.canvas.height = 540;

        this.keys = new Map<string, boolean>();

        this.player = new Player(120, 12, 24, 24, "green");

        this.blocks = [];
        for (let i = 0; i < 30; i++) {
            this.blocks.push(new Block(120 + i * 12, 216, 12, "white"));
        }
        for (let i = 0; i < 5; i++) {
            this.blocks.push(new Block(120, 144 + i * 12, 12, "white"));
        }
        for (let i = 0; i < 5; i++) {
            this.blocks.push(new Block(120 + 30*12, 144 + i * 12, 12, "white"));
        }
        for (let i = 5; i < 15; i++) {
            this.blocks.push(new Block(144 + i * 12, 180-12, 12, "white"));
        }
        this.block_hitboxes = this.blocks.map((block) => block.hitbox);

        this.tick();
    }

    public tick(): void {
        this.handle_input();

        this.player.tick(this.blocks);

        this.draw();

        window.requestAnimationFrame(() => this.tick());
    }

    public draw(): void {
        this.background();
        
        this.player.draw(this.ctx);

        for (let block of this.blocks) {
            block.draw(this.ctx);
        }
    }

    public background(): void {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

    public handle_input(): void {

        if (this.keys.get("w") && this.player.jumpable(this.block_hitboxes)) 
            this.player.hitbox.move(this.block_hitboxes, Direction.UpDown, -3);
        if (this.keys.get("a")) 
            this.player.hitbox.move(this.block_hitboxes, Direction.LeftRight, -2.2);
        if (this.keys.get("d")) 
            this.player.hitbox.move(this.block_hitboxes, Direction.LeftRight, 2.2);
    }
}

const game = new Game();
game.tick();
(<any>window).game = game; // for debugging

window.addEventListener("keydown", (event) => {
    game.keys.set(event.key, true);
});
window.addEventListener("keyup", (event) => {
    game.keys.set(event.key, false);
});
