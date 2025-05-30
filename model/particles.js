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
            case 2:
                switch (true) {
                    case this.speed > INITIALSPEED * 2.0:
                        this.color = Math.random() > 0.5 ? "rgba(120, 255, 120, 0.9)" : "rgba(100, 255, 150, 0.9)"; // Verde-claro vibrante
                        break;
                    case this.speed > INITIALSPEED * 1.9:
                        this.color = Math.random() > 0.5 ? "rgba(110, 240, 110, 0.85)" : "rgba(90, 250, 130, 0.85)"; // Verde etéreo suave
                        break;
                    case this.speed > INITIALSPEED * 1.8:
                        this.color = Math.random() > 0.5 ? "rgba(100, 230, 100, 0.8)" : "rgba(80, 240, 120, 0.8)"; // Verde fogo delicado
                        break;
                    case this.speed > INITIALSPEED * 1.7:
                        this.color = Math.random() > 0.5 ? "rgba(90, 220, 90, 0.75)" : "rgba(70, 230, 110, 0.75)"; // Verde brilhante
                        break;
                    case this.speed > INITIALSPEED * 1.6:
                        this.color = Math.random() > 0.5 ? "rgba(80, 210, 80, 0.7)" : "rgba(60, 220, 100, 0.7)"; // Verde suave
                        break;
                    case this.speed > INITIALSPEED * 1.5:
                        this.color = Math.random() > 0.5 ? "rgba(70, 200, 70, 0.65)" : "rgba(50, 210, 90, 0.65)"; // Verde folha
                        break;
                    case this.speed > INITIALSPEED * 1.4:
                        this.color = Math.random() > 0.5 ? "rgba(60, 190, 60, 0.6)" : "rgba(40, 200, 80, 0.6)"; // Verde calmo
                        break;
                    case this.speed > INITIALSPEED * 1.3:
                        this.color = Math.random() > 0.5 ? "rgba(50, 180, 50, 0.55)" : "rgba(30, 190, 70, 0.55)"; // Verde musgo
                        break;
                    case this.speed > INITIALSPEED * 1.2:
                        this.color = Math.random() > 0.5 ? "rgba(40, 170, 40, 0.5)" : "rgba(20, 180, 60, 0.5)"; // Verde esmeralda
                        break;
                    case this.speed > INITIALSPEED * 1.1:
                        this.color = Math.random() > 0.5 ? "rgba(30, 160, 30, 0.45)" : "rgba(10, 170, 50, 0.45)"; // Verde escuro
                        break;
                    default:
                        this.color = Math.random() > 0.5 ? "rgba(20, 150, 20, 0.4)" : "rgba(0, 160, 40, 0.4)"; // Verde profundo
                        break;
                }
                break;
            case 3:
                switch (true) {
                    case this.speed > INITIALSPEED * 2.0:
                        this.color = Math.random() > 0.5 ? "rgba(255, 223, 0, 0.9)" : "rgba(255, 182, 193, 0.9)"; // Gold or Pastel Pink
                        break;
                    case this.speed > INITIALSPEED * 1.9:
                        this.color = Math.random() > 0.5 ? "rgba(186, 85, 211, 0.85)" : "rgba(255, 223, 0, 0.85)"; // Medium Orchid or Gold
                        break;
                    case this.speed > INITIALSPEED * 1.8:
                        this.color = Math.random() > 0.5 ? "rgba(152, 251, 152, 0.8)" : "rgba(255, 240, 245, 0.8)"; // Pale Green or Lavender Blush
                        break;
                    case this.speed > INITIALSPEED * 1.7:
                        this.color = Math.random() > 0.5 ? "rgba(173, 216, 230, 0.75)" : "rgba(255, 182, 193, 0.75)"; // Light Blue or Pastel Pink
                        break;
                    case this.speed > INITIALSPEED * 1.6:
                        this.color = Math.random() > 0.5 ? "rgba(255, 255, 224, 0.7)" : "rgba(152, 251, 152, 0.7)"; // Light Yellow or Pale Green
                        break;
                    case this.speed > INITIALSPEED * 1.5:
                        this.color = Math.random() > 0.5 ? "rgba(255, 182, 193, 0.65)" : "rgba(223, 164, 164, 0.65)"; // Pastel Pink or White
                        break;
                    case this.speed > INITIALSPEED * 1.4:
                        this.color = Math.random() > 0.5 ? "rgba(120, 245, 120, 0.6)" : "rgba(209, 209, 248, 0.6)"; // Pale Green or Lavender
                        break;
                    case this.speed > INITIALSPEED * 1.3:
                        this.color = Math.random() > 0.5 ? "rgba(135, 205, 228, 0.55)" : "rgba(218, 208, 144, 0.55)"; // Light Blue or Gold
                        break;
                    case this.speed > INITIALSPEED * 1.2:
                        this.color = Math.random() > 0.5 ? "rgba(243, 243, 131, 0.5)" : "rgba(248, 209, 209, 0.5)"; // Light Yellow or White
                        break;
                    case this.speed > INITIALSPEED * 1.1:
                        this.color = Math.random() > 0.5 ? "rgba(245, 142, 158, 0.45)" : "rgba(202, 202, 249, 0.45)"; // Pastel Pink or Lavender
                        break;
                    default:
                        this.color = Math.random() > 0.5 ? "rgba(136, 123, 127, 0.4)" : "rgba(189, 189, 247, 0.4)"; // Lavender Blush or Lavender
                        break;
                }
                break;
            default:
                break;
        }

        /*

                this.color = Math.random() > 0.5 ? "rgba(255, 69, 0, 0.4)" : "rgba(255, 140, 0, 0.4)"; // Fire-like colors
    
    
                */
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
