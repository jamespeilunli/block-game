import { World } from "./world.js";

export class Input {
    public keys: Map<string, boolean>;
    public mouse_x: number;
    public mouse_y: number;
    public mouse_down: boolean;

    constructor(canvas: HTMLCanvasElement) {
        this.keys = new Map<string, boolean>();
        this.mouse_x = -100;
        this.mouse_y = -100;
        this.mouse_down = false;

        window.addEventListener("keydown", (event) => {
            this.keys.set(event.key, true);
            // prevent scroll on pressing space
            if (event.key === " " && event.target == document.body) event.preventDefault(); 
        });

        window.addEventListener("keyup", (event) => {
            this.keys.set(event.key, false);
        });

        canvas.addEventListener("mousemove", (event) => {
            this.mouse_x = event.offsetX;
            this.mouse_y = event.offsetY;
        });

        canvas.addEventListener("mousedown", (event) => {
            this.mouse_down = true;
        });

        canvas.addEventListener("mouseup", (event) => {
            this.mouse_down = false;
        });
    }

    public tick(world: World): void {
        if (this.keys.get("w") && world.player.hitbox.yv === 0)
            world.player.hitbox.set_yv(world.block_hitboxes, -3);
        if (this.keys.get("a"))
            world.player.hitbox.set_xv(world.block_hitboxes, -2.2);
        if (this.keys.get("d"))
            world.player.hitbox.set_xv(world.block_hitboxes, 2.2);
    }
}