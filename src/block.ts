import { Hitbox, MovableHitbox } from "./hit_box.js";
import { Display } from "./display.js";

export class Block {
    public hitbox: Hitbox;
    public texture: string;

    constructor(x: number, y: number, collidable: boolean, size: number, texture: string) {
        this.hitbox = new Hitbox(x, y, size, size, collidable);
        this.texture = texture;
    }

    public draw(display: Display): void {
        display.image(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, this.texture);
    }
}
