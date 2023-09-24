import { Hitbox } from "./hitbox.js";

export class Block {
    public hitbox: Hitbox;
    public color: string;

    constructor(x: number, y: number, collidable: boolean, size: number, color: string) {
        this.hitbox = new Hitbox(x, y, size, size, collidable);
        this.color = color;
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    public destroy(): void {
        this.hitbox.collidable = false;
    }

    public create(): void {
        this.hitbox.collidable = true;
    }
}
