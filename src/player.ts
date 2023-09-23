import { Hitbox } from "./hitbox.js";

export class Player {
    public hitbox: Hitbox;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.hitbox = new Hitbox(x, y, width, height);
        this.color = color;
    }

    public tick(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        this.hitbox.tick(canvas);

        this.draw(ctx);
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }
}