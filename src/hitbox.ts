export class Hitbox {
    public x: number;
    public y: number;
    public width: number;
    public height: number;
    public xv: number; // x velocity
    public yv: number; // y velocity
    public f: number; // x friction
    public g: number; // y gravity

    constructor(x: number, y: number, width: number, height: number, xv = 0, yv = 1, f = 0.95, g = 0.15) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.xv = xv;
        this.yv = yv;
        this.f = f;
        this.g = g;
    }

    public tick(canvas: HTMLCanvasElement): void {
        this.xv *= this.f;
        this.x += this.xv;

        if (this.is_blocked_down(canvas)) {
            this.yv = Math.min(0, this.yv);
            this.y = canvas.height - this.height;
        } else {
            this.yv += this.g;
        }
        this.y += this.yv;
    }

    // is there something blocking hitbox from moving down?
    public is_blocked_down(canvas: HTMLCanvasElement): boolean {
        return this.y + this.height > canvas.height;
    }
}