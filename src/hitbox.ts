export class Hitbox {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

export class MovableHitbox extends Hitbox {
    public xv: number; // x velocity
    public yv: number; // y velocity
    public f: number; // x friction
    public g: number; // y gravity

    constructor(x: number, y: number, width: number, height: number, xv = 0, yv = 1, f = 0.95, g = 0.083) {
        super(x, y, width, height);
        this.xv = xv;
        this.yv = yv;
        this.f = f;
        this.g = g;
    }

    public tick(hitboxes: Hitbox[]): void {
        this.set_xv(hitboxes, this.xv * this.f);
        this.set_yv(hitboxes, this.yv + this.g);
        this.x += this.xv;
        this.y += this.yv;
    }
    
    public set_xv(hitboxes: Hitbox[], new_xv: number): void {
        // change the x on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some((hitbox) => this.overlaps_with(hitbox, this.x + new_xv, this.y))) {
            this.xv = new_xv;
        } else {
            this.xv = 0;
        }
    }

    public set_yv(hitboxes: Hitbox[], new_yv: number): void {
        // change the y on the condition that if we change it, it won't be colliding with another hitbox
        if (!hitboxes.some((hitbox) => this.overlaps_with(hitbox, this.x, this.y + new_yv))) {
            this.yv = new_yv;
        } else {
            this.yv = 0;
        }
    }

    public overlaps_with(hitbox: Hitbox, new_x: number, new_y: number): boolean {
        return new_y + this.height > hitbox.y && 
               new_y < hitbox.y + hitbox.height &&
               new_x + this.width > hitbox.x &&
               new_x < hitbox.x + hitbox.width;
    }
}
