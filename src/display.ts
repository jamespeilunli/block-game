import { Hitbox } from "./hit_box.js";

export class Display {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public player_hitbox: Hitbox;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
        this.ctx = this.canvas.getContext("2d")!;

        this.canvas.width = 960;
        this.canvas.height = 540;
        this.ctx.imageSmoothingEnabled = false; // make images clear

        this.player_hitbox = new Hitbox(0, 0, 0, 0, false);
    }

    public set_player_hitbox(player_hitbox: Hitbox): void {
        this.player_hitbox = player_hitbox;
    }

    public image(x: number, y: number, width: number, height: number, id: string): void {
        this.ctx.drawImage(<CanvasImageSource>document.getElementById(id), this.to_canvas_x(x), this.to_canvas_y(y), width, height);
    }


    public rect(x: number, y: number, width: number, height: number, color: string, outline = false, stroke_width = 2): void {
        this.absolute_rect(this.to_canvas_x(x), this.to_canvas_y(y), width, height, color, outline, stroke_width);
    }

    public absolute_rect(canvas_x: number, canvas_y: number, width: number, height: number, color: string, outline = false, stroke_width = 2): void {
        if (outline) {
            this.ctx.lineWidth = stroke_width;
            this.ctx.strokeStyle = color;
            this.ctx.strokeRect(canvas_x, canvas_y, width, height);
        } else {
            this.ctx.fillStyle = color;
            this.ctx.fillRect(canvas_x, canvas_y, width, height);
        }
    }

    // convert from x in game to x in the canvas (canvas x is relative to player x, and player is in the center)
    public to_canvas_x(x: number): number {
        return x - this.player_hitbox.x + this.canvas.width / 2;
    }

    public to_world_x(canvas_x: number): number {
        return canvas_x - this.canvas.width / 2 + this.player_hitbox.x;
    }

    // convert from y in game to y in the canvas (canvas y is relative to player y, and player is in the center)
    public to_canvas_y(y: number): number {
        return y - this.player_hitbox.y + this.canvas.height / 2;
    }

    public to_world_y(canvas_y: number): number {
        return canvas_y - this.canvas.height / 2 + this.player_hitbox.y;
    }
}
