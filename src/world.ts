import { Player } from "./player.js";
import { Block } from "./block.js";
import { Hitbox } from "./hit_box.js";
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

        this.player = new Player(0, 0, 32, 32, "green");

        this.blocks = [];
        this.block_hitboxes = [];
        for (let i = 10; i < this.canvas_height / this.block_size; i++) {
            for (let j = 0; j < this.canvas_width / this.block_size; j++) {
                this.new_block(j * this.block_size, i * this.block_size, true, this.block_size+1, "stone-texture");
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

    public draw(display: Display): void {
        this.background(display);

        for (let block of this.blocks) {
            if (block.hitbox.collidable) block.draw(display);
        }

        this.player.draw(display);
    }

    public background(display: Display): void {
        display.absolute_image(0, 0, display.canvas.width, display.canvas.height, "sky-texture");
    }

    public new_block(x: number, y: number, collidable: boolean, size: number, texture: string) {
        let block = new Block(x, y, collidable, size, texture);
        this.blocks.push(block);
        this.block_hitboxes.push(block.hitbox);
    }
}