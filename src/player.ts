import { MovableHitbox, Hitbox } from "./hitbox.js";
import { Display } from "./display.js";

export class Player {
    public hitbox: MovableHitbox;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.hitbox = new MovableHitbox(x, y, width, height, true);
        this.color = color;
    }

    public tick(block_hitboxes: Hitbox[]): void {
        this.hitbox.tick(block_hitboxes);
    }

    public draw(display: Display): void {
        display.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height, this.color);
    }
}