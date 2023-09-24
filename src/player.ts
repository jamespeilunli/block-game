import { MovableHitbox, Hitbox } from "./hitbox.js";

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

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}