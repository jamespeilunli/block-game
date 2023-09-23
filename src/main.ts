import { Player } from "./player.js";

class Game {
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;
    public player: Player;
    public keys: Map<string, boolean>;

    constructor() {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas")!;
        this.ctx = this.canvas.getContext("2d")!;

        this.keys = new Map<string, boolean>();

        this.canvas.width = 960;
        this.canvas.height = 540;

        this.player = new Player(100, 100, 24, 30, "green");

        this.tick();
    }

    public tick(): void {
        this.background();

        this.move();

        this.player.tick(this.canvas, this.ctx);

        window.requestAnimationFrame(() => this.tick());
    }

    public background(): void {
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
    }

    public move(): void {
        if (this.keys.get("w")) {
            if (game.player.hitbox.is_blocked_down(game.canvas)) {
                game.player.hitbox.yv = -3;
            }
        } if (this.keys.get("a")) {
            game.player.hitbox.xv = -2.2;
        } if (this.keys.get("d")) {
            game.player.hitbox.xv = 2.2;
        }
    }
}

const game = new Game();
game.tick();

window.addEventListener("keydown", (event) => {
    game.keys.set(event.key, true);
});
window.addEventListener("keyup", (event) => {
    game.keys.set(event.key, false);
});
