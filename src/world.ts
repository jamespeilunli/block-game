import { Player } from "./player.js";
import { Block } from "./block.js";
import { Hitbox } from "./hitbox.js";
import { Input } from "./input.js";
import { Display } from "./display.js";

export class World {
    public canvas_width: number;
    public canvas_height: number;
    public block_size: number;
    public player: Player;
    public blocks: Block[];
    public block_hitboxes: Hitbox[];

    constructor(canvas_width: number, canvas_height: number, block_size: number) {
        this.block_size = block_size;
        this.canvas_width = canvas_width;
        this.canvas_height = canvas_height;

        this.player = new Player(0, 0, 24, 24, "green");

        this.blocks = [];
        this.block_hitboxes = [];
        for (let i = 0; i < this.canvas_height / this.block_size; i++) {
            for (let j = 0; j < this.canvas_width / this.block_size; j++) {
                let collidable = i > 10;
                let block = new Block(j * this.block_size, i * this.block_size, collidable, this.block_size, "white");
                this.blocks.push(block);
                this.block_hitboxes.push(block.hitbox);
            }
        }
    }

    public tick(display: Display, input: Input): void {
        this.player.tick(this.block_hitboxes);

        if (input.mouse_down) {
            let i = this.blocks.length;
            while (i--) {
                if (this.blocks[i].hitbox.is_selected(display, input.mouse_x, input.mouse_y)) {
                    this.blocks.splice(i, 1);
                    this.block_hitboxes.splice(i, 1);
                }
            }
        }
    }

    public draw(display: Display, input: Input): void {
        this.background(display);

        for (let block of this.blocks) {
            if (block.hitbox.collidable) block.draw(display);
        }

        this.player.draw(display);
    }

    public background(display: Display): void {
        display.absolute_rect(0, 0, display.canvas.width, display.canvas.height, "black");
    }

    public new_block(x: number, y: number, collidable: boolean, size: number, color: string) {
        let block = new Block(x, y, collidable, size, color);
        this.blocks.push(block);
        this.block_hitboxes.push(block.hitbox);
    }
}