class Particle {
    constructor(x, y, size, particleLife, direction, speed, level) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.particleLife = particleLife;
        this.speed = speed;
        this.level = level;
        this.velocityX = (Math.random() - 0.5) * 1; // Reduced horizontal velocity for closer particles
        this.velocityY = (Math.random() - 0.5) * 1; // Reduced vertical velocity for closer particles

        // Set the angle based on the player's direction
        if (direction === "left") {
            this.angle = Math.PI;
        } else {
            this.angle = -Math.PI / 2;
        }

        // Set the color of the particles based on the speed and level
        switch (this.level) {
            case 1:
                switch (true) {
                    case this.speed > INITIALSPEED * 2.0:
                        this.color = Math.random() > 0.5 ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 250, 220, 0.9)"; // White-hot and near-white yellow
                        break;
                    case this.speed > INITIALSPEED * 1.9:
                        this.color = Math.random() > 0.5 ? "rgba(255, 240, 160, 0.8)" : "rgba(255, 180, 40, 0.8)"; // Bright yellow and intense orange
                        break;
                    case this.speed > INITIALSPEED * 1.8:
                        this.color = Math.random() > 0.5 ? "rgba(255, 220, 100, 0.7)" : "rgba(255, 160, 30, 0.7)"; // Bright yellow and intense orange
                        break;
                    case this.speed > INITIALSPEED * 1.7:
                        this.color = Math.random() > 0.5 ? "rgba(255, 200, 50, 0.7)" : "rgba(255, 100, 20, 0.7)"; // Bright orange and red-orange
                        break;
                    case this.speed > INITIALSPEED * 1.6:
                        this.color = Math.random() > 0.5 ? "rgba(255, 210, 100, 0.6)" : "rgba(255, 140, 40, 0.6)"; // Bright yellow-orange and orange
                        break;
                    case this.speed > INITIALSPEED * 1.5:
                        this.color = Math.random() > 0.5 ? "rgba(255, 180, 80, 0.6)" : "rgba(255, 120, 30, 0.6)"; // Bright orange-yellow and orange-red
                        break;
                    case this.speed > INITIALSPEED * 1.4:
                        this.color = Math.random() > 0.5 ? "rgba(255, 160, 50, 0.5)" : "rgba(255, 70, 10, 0.5)"; // Bright orange and intense red-orange
                        break;
                    case this.speed > INITIALSPEED * 1.3:
                        this.color = Math.random() > 0.5 ? "rgba(255, 140, 30, 0.5)" : "rgba(220, 60, 10, 0.5)"; // Orange and red-orange
                        break;
                    case this.speed > INITIALSPEED * 1.2:
                        this.color = Math.random() > 0.5 ? "rgba(240, 120, 60, 0.4)" : "rgba(220, 60, 30, 0.4)"; // Warm orange-red and medium red
                        break;
                    case this.speed > INITIALSPEED * 1.1:
                        this.color = Math.random() > 0.5 ? "rgba(225, 70, 50, 0.4)" : "rgba(200, 40, 30, 0.4)"; // Slightly warmer core and medium red
                        break;
                    default:
                        this.color = Math.random() > 0.5 ? "rgba(210, 50, 40, 0.3)" : "rgba(180, 30, 20, 0.3)"; // Red core and medium red
                        break;
                }
                break;
            default:
                break;
        }
    }

    draw(ctx) {
        if (this.size > 0) {
            ctx.save();
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    update() {
        this.particleLife--;
        this.size *= 0.95; // Shrink over time
        this.x += this.velocityX; // Update position based on velocity
        this.y += this.velocityY; // Update position based on velocity
    }

    isAlive() {
        return this.particleLife > 0.1;
    }
}
