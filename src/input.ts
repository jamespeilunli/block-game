import { World } from "./world.js";
import { Display } from "./display.js";
import { Block } from "./block.js";

export class Input {
    public readonly display: Display;
    public keys: Map<string, boolean>;
    public mouse_x: number;
    public mouse_y: number;
    public mouse_down: boolean;
    public selected_block_texture: string;

    constructor(display: Display) {
        this.display = display;
        this.keys = new Map<string, boolean>();
        this.mouse_x = -100;
        this.mouse_y = -100;
        this.mouse_down = false;
        this.selected_block_texture = "stone-texture";

        window.addEventListener("keydown", (event) => {
            this.keys.set(event.key, true);
            // prevent scroll on pressing space
            if (event.key === " " && event.target == document.body) event.preventDefault(); 
        });

        window.addEventListener("keyup", (event) => {
            this.keys.set(event.key, false);
        });

        display.canvas.addEventListener("mousemove", (event) => {
            this.mouse_x = event.offsetX;
            this.mouse_y = event.offsetY;
        });

        display.canvas.addEventListener("mousedown", (event) => {
            this.mouse_down = true;
        });

        display.canvas.addEventListener("mouseup", (event) => {
            this.mouse_down = false;
        });
    }

    public tick(world: World): void {
        if (this.keys.get("w") && world.player.hitbox.yv === 0)
            world.player.hitbox.set_yv(-3, world.block_hitboxes);
        if (this.keys.get("a"))
            world.player.hitbox.set_xv(-2.2, world.block_hitboxes);
        if (this.keys.get("d"))
            world.player.hitbox.set_xv(2.2, world.block_hitboxes);
        if (this.keys.get(" "))
            world.new_block(this.selected_area_x(world.block_size), this.selected_area_y(world.block_size), true, world.block_size+1, this.selected_block_texture);
        if (this.keys.get("1"))
            this.selected_block_texture = "stone-texture";
        if (this.keys.get("2"))
            this.selected_block_texture = "grass-texture";
        if (this.keys.get("3"))
            this.selected_block_texture = "dirt-texture";
    }

    public draw(block_size: number): void {
        this.display.rect(
            this.selected_area_x(block_size),
            this.selected_area_y(block_size),
            block_size, block_size, 
            this.mouse_down ? "red" : "green", 
            true, 2
        );
    }

    public selected_area_x(block_size: number): number {
        return block_size * Math.floor(this.display.to_world_x(this.mouse_x) / block_size);
    }

    public selected_area_y(block_size: number): number {
        return block_size * Math.floor(this.display.to_world_y(this.mouse_y) / block_size);
    }
}