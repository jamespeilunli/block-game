import { Player } from "./player.js";
import { Block } from "./block.js";
import { Hitbox } from "./hitbox.js";
import { Input } from "./input.js";

export class World {
    public canvas_width: number;
    public canvas_height: number;
    public block_size: number;
    public player: Player;
    public blocks: Block[][];
    public block_hitboxes: Hitbox[];

    constructor(canvas_width: number, canvas_height: number, block_size: number) {
        this.block_size = block_size;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;

        this.player = new Player(120, 12, 24, 24, "green");

        this.blocks = [];
        this.block_hitboxes = [];
        for (let i = 0; i < this.canvas_height / this.block_size; i++) {
            let new_row: Block[] = [];
            for (let j = 0; j < this.canvas_width / this.block_size; j++) {
                let collidable = i > 10;
                let block = new Block(j * this.block_size, i * this.block_size, collidable, this.block_size, "white");
                new_row.push(block);
                this.block_hitboxes.push(block.hitbox);
            }
            this.blocks.push(new_row);
        }
    }

    public tick(input: Input): void {
        this.player.tick(this.block_hitboxes);

        for (let block_row of this.blocks) {
            for (let block of block_row) {
                if (block.hitbox.is_selected(input.mouse_x, input.mouse_y)) {
                    if (input.mouse_down) block.destroy();
                    if (input.keys.get(" ")) block.create();
                }
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D, input: Input): void {
        this.background(ctx);

        this.player.draw(ctx);

        for (let block_row of this.blocks) {
            for (let block of block_row) {
                if (block.hitbox.collidable) block.draw(ctx);

                if (block.hitbox.is_selected(input.mouse_x, input.mouse_y)) {
                    if (input.mouse_down) block.hitbox.draw(ctx, "red");
                    else block.hitbox.draw(ctx);
                }
            }
        }
    }

    public background(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(0, 0, this.canvas_width, this.canvas_height);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();
    }
}