class Particle {
    constructor(x, y, size, life, direction) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.life = life;
        this.velocityX = (Math.random() - 0.5) * 1; // Reduced horizontal velocity for closer particles
        this.velocityY = (Math.random() - 0.5) * 1; // Reduced vertical velocity for closer particles

        // Set the angle based on the player's direction
        if (direction === "right") {
            this.angle = Math.PI; // Left direction (opposite to right)
        } else {
            this.angle = -Math.PI / 2; // Up direction (opposite to down)
        }

        // Randomly assign one of two colors
        this.color = Math.random() > 0.5 ? "rgba(255, 69, 0, 0.4)" : "rgba(255, 140, 0, 0.4)"; // Fire-like colors
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    update() {
        this.life--;
        this.size *= 0.95; // Shrink over time
        this.x += this.velocityX; // Update position based on velocity
        this.y += this.velocityY; // Update position based on velocity
    }

    isAlive() {
        return this.life > 0.1;
    }
}