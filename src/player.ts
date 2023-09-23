import { MovableHitbox, Hitbox } from "./hitbox.js";
import { Block } from "./block.js";

export class Player {
    public hitbox: MovableHitbox;
    public color: string;

    constructor(x: number, y: number, width: number, height: number, color: string) {
        this.hitbox = new MovableHitbox(x, y, width, height);
        this.color = color;
    }

    public tick(blocks: Block[]): void {
        this.hitbox.tick(blocks.map((block) => block.hitbox));
    }

    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.beginPath();
        ctx.rect(this.hitbox.x, this.hitbox.y, this.hitbox.width, this.hitbox.height);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    public jumpable(hitboxes: Hitbox[]): boolean {
        //return this.hitbox.is_blocked_down(hitboxes, this.hitbox.x, this.hitbox.y);
        return this.hitbox.yv === 0;
    }
}