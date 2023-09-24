import { Hitbox, MovableHitbox } from "./hit_box.js";
import { Display } from "./display.js";

export class Block {
    public hitbox: Hitbox;
    public color: string;

    constructor(x: number, y: number, collidable: boolean, size: number, color: string) {
        this.hitbox = new Hitbox(x, y, size, size, collidable);
        this.color = color;
    }

    public draw(display: Display): void {
        display.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, this.color);
    }

    public destroy(): void {
        this.hitbox.collidable = false;
    }
}
