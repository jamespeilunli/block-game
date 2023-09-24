import { Player } from "./player.js";
import { Block } from "./block.js";
import { Hitbox } from "./hitbox.js";

class Game {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public width: number;
    public height: number;
    public block_size: number;
    public keys: Map<string, boolean>;
    public mouse_x: number;
    public mouse_y: number;
    public mouse_down: boolean;
    public player: Player;
    public blocks: Block[][];
    public block_hitboxes: Hitbox[];

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
        this.ctx = this.canvas.getContext("2d")!;

        this.width = 80;
        this.height = 45;
        this.block_size = 12;
        this.canvas.width = this.width * this.block_size;
        this.canvas.height = this.height * this.block_size;

        this.keys = new Map<string, boolean>();
        this.mouse_x = -this.block_size;
        this.mouse_y = -this.block_size;
        this.mouse_down = false;

        this.player = new Player(120, 12, 24, 24, "green");

        this.blocks = [];
        this.block_hitboxes = [];
        for (let i = 0; i < this.height; i++) {
            let new_row: Block[] = [];
            for (let j = 0; j < this.width; j++) {
                let collidable = i > 10;
                let block = new Block(j * this.block_size, i * this.block_size, collidable, this.block_size, "white");
                new_row.push(block);
                this.block_hitboxes.push(block.hitbox);
            }
            this.blocks.push(new_row);
        }

        this.tick();
    }

    public tick(): void {
        this.handle_input();

        this.player.tick(this.block_hitboxes);

        this.draw();

        window.requestAnimationFrame(() => this.tick());
    }

    public draw(): void {
        this.background();
        
        this.player.draw(this.ctx);

        for (let block_row of this.blocks) {
            for (let block of block_row) {
                block.draw(this.ctx);

                if (block.hitbox.is_selected(this.mouse_x, this.mouse_y)) {
                    block.hitbox.draw(this.ctx);
                    if (this.mouse_down) {
                        //block.hitbox.draw(this.ctx, "red");
                        block.destroy();
                    }
                }
            }
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
        if (this.keys.get("w") && this.player.hitbox.yv === 0) 
            this.player.hitbox.set_yv(this.block_hitboxes, -3);
        if (this.keys.get("a")) 
            this.player.hitbox.set_xv(this.block_hitboxes, -2.2);
        if (this.keys.get("d")) 
            this.player.hitbox.set_xv(this.block_hitboxes, 2.2);
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

game.canvas.addEventListener("mousemove", (event) => {
    game.mouse_x = event.offsetX;
    game.mouse_y = event.offsetY;
});

game.canvas.addEventListener("mousedown", (event) => {
    game.mouse_down = true;
});

game.canvas.addEventListener("mouseup", (event) => {
    game.mouse_down = false;
});
