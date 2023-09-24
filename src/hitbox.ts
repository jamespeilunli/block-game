import { Display } from "./display.js";

export class Hitbox {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public collidable: boolean;

    constructor(x: number, y: number, width: number, height: number, collidable: boolean) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collidable = collidable;
    }

    public draw(display: Display, color = "green", width = 2): void {
        display.rect(this.x, this.y, this.width, this.height, color, true, width);
    }

    public is_selected(display: Display, mouse_x: number, mouse_y: number): boolean {
        let dx = mouse_x - display.to_canvas_x(this.x);
        let dy = mouse_y - display.to_canvas_y(this.y);
        return 0 <= dx && dx < 12 && 0 <= dy && dy < 12;
    }
}

export class MovableHitbox extends Hitbox {
    public xv: number; // x velocity
    public yv: number; // y velocity
    public f: number; // x friction
    public g: number; // y gravity

    constructor(x: number, y: number, width: number, height: number, collidable: boolean, xv = 0, yv = 1, f = 0.95, g = 0.083) {
        super(x, y, width, height, collidable);
        this.xv = xv;
        this.yv = yv;
        this.f = f;
        this.g = g;
    }

    public tick(hitboxes: Hitbox[]): void {
        this.set_xv(this.xv * this.f, hitboxes);
        this.set_yv(this.yv + this.g, hitboxes);
        this.x += this.xv;
        this.y += this.yv;
    }

    public set_xv(new_xv: number, hitboxes: Hitbox[]): void {
        // change the x on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some((hitbox) => this.collides_with(hitbox, this.x + new_xv, this.y))) {
            this.xv = new_xv;
        } else {
            this.xv = 0;
        }
    }

    public set_yv(new_yv: number, hitboxes: Hitbox[]): void {
        // change the y on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some((hitbox) => this.collides_with(hitbox, this.x, this.y + new_yv))) {
            this.yv = new_yv;
        } else {
            this.yv = 0;
        }
    }

    public collides_with(hitbox: Hitbox, new_x: number, new_y: number): boolean {
        return hitbox.collidable &&
               new_y + this.height > hitbox.y &&
               new_y < hitbox.y + hitbox.height &&
               new_x + this.width > hitbox.x &&
               new_x < hitbox.x + hitbox.width;
    }
}
