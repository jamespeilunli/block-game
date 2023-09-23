export enum Direction {
    UpDown,
    LeftRight,
}

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
        /*
        if (!this.is_blocked_left(hitboxes, this.x + this.xv, this.y)) {
            this.xv *= this.f;
            this.x += this.xv;
        }

        if (!this.is_blocked_down(hitboxes, this.x, this.y + this.yv)) {
            this.yv += this.g;
            this.y += this.yv;
        }
        */
        this.move(hitboxes, Direction.LeftRight, this.xv * this.f);
        this.move(hitboxes, Direction.UpDown, this.yv + this.g);
    }

    public move(hitboxes: Hitbox[], direction: Direction, magnitude: number): void {
        switch (direction) {
            case Direction.UpDown:
                if (!this.is_blocked_down(hitboxes, this.x, this.y + magnitude)) {
                    this.yv = magnitude;
                    this.y += this.yv;
                } else {
                    this.yv = 0;
                }
                break;
            case Direction.LeftRight:
                this.xv = magnitude;
                if (!this.is_blocked_left_right(hitboxes, this.x + this.xv, this.y)) {
                    this.x += this.xv;
                }
                break;
            default:
        }
    }

    // is there something blocking hitbox from moving down?
    public is_blocked_down(hitboxes: Hitbox[], new_x: number, new_y: number): boolean {
        for (let hitbox of hitboxes) {
            if (new_y + this.height > hitbox.y && 
                new_y < hitbox.y + hitbox.height &&
                new_x + this.width > hitbox.x &&
                new_x < hitbox.x + hitbox.width) {
                //this.y = hitbox.y - this.height; // sets y so that hitbox is right on top of the hitbox below it
                return true;
            }
        }
        return false;
    }

    public is_blocked_left_right(hitboxes: Hitbox[], new_x: number, new_y: number): boolean {
        for (let hitbox of hitboxes) {
            if (new_x + this.width > hitbox.x &&
                new_x < hitbox.x + hitbox.width &&
                new_y + this.height > hitbox.y &&
                new_y < hitbox.y + hitbox.height) {
                return true;
            }
        }
        return false;
    }
    

}
