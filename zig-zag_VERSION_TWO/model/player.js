class Player {
    constructor(x, y, radius, speed, direction = "right", timeLeft, score, lifes, level) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.direction = direction;
        this.speed = speed;
        this.timeLeft = timeLeft;
        this.score = score;
        this.particles = [];
        this.velocityX = this.speed;
        this.velocityY = 0;
        this.targetVelocityX = this.speed;
        this.targetVelocityY = 0;
        this.lifes = lifes;
        this.level = level;
        this.rectIndex = 0;
        this.rectDirection = direction;
        this.isGrowing = false;
        this.isDecreasing = false;
        this.isPlayerBig = false;
        this.maxGrow = this.radius * 1.5;
        this.minGrow = PLAYER_INITIAL_RADIUS;
        this.maxRadius = this.radius * 1.2; // Maximum radius during transition
        this.minRadius = this.radius * 0.9;
        this.isDying = false;
    }

    move() {
        // Gradually adjust the current velocity towards the target velocity
        this.velocityX += (this.targetVelocityX - this.velocityX) * 0.1;
        this.velocityY += (this.targetVelocityY - this.velocityY) * 0.1;

        this.x += this.velocityX;
        this.y += this.velocityY;

        // Generate multiple particles for a more dispersed trail
        for (let i = 0; i < 10; i++) {
            // Increase the number of particles
            this.particles.push(new Particle(this.x, this.y, this.radius / 4, 60, this.direction, this.speed, this.level)); // Pass direction
        }
    }

    changeDirection() {
        if (this.direction == "left") {
            this.direction = "right";
            this.targetVelocityX = 0;
            this.targetVelocityY = this.speed;
        } else {
            this.direction = "left";
            this.targetVelocityX = this.speed;
            this.targetVelocityY = 0;
        }
    }

    reset() {
        if (this.direction == "left") {
            this.targetVelocityX = INITIALSPEED;
            this.targetVelocityY = 0;
        } else {
            this.targetVelocityX = 0;
            this.targetVelocityY = INITIALSPEED;
        }
    }

    draw(ctx, level) {
        if (this.radius > 0) {
            // isGrowing
            if (this.isGrowing && this.radius < this.maxGrow) {
                this.radius = Math.min(this.radius + 2, this.maxGrow); // Increase radius
            } else if (this.isGrowing && this.radius >= this.maxGrow) {
                this.isGrowing = false;
                this.isPlayerBig = true;
            }
            // isDecreasing
            if (this.isDecreasing && this.radius > this.minGrow) {
                this.radius = Math.max(this.radius - 2, this.minGrow); // Decrease radius
            } else if (this.isDecreasing && this.radius <= this.minGrow) {
                this.isDecreasing = false;
                this.isPlayerBig = false;
            }

            // Draw particles
            this.particles.forEach((particle, index) => {
                if (particle.isAlive()) {
                    particle.update();
                    particle.draw(ctx);
                } else {
                    this.particles.splice(index, 1);
                }
            });

            // Add gradient for the ball based on speed (exponential fire growth with integrated glow effects)
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);

            // Define the glow radius based on Level 4
            const glowRadius = this.radius * 2.1;

            // Add glow effects based on speed and level
            ctx.save();
            switch (level) {
                case 1:
                    switch (true) {
                        case this.speed > INITIALSPEED * 2.0:
                            gradient.addColorStop(0, "rgb(255, 255, 255)");
                            gradient.addColorStop(0.4, "rgb(255, 250, 220)");
                            gradient.addColorStop(0.6, "rgb(255, 220, 100)");
                            gradient.addColorStop(0.8, "rgb(255, 160, 20)");
                            gradient.addColorStop(0.9, "rgb(255, 60, 0)");
                            gradient.addColorStop(1, "rgb(120, 0, 0)");

                            ctx.shadowColor = "rgba(255, 200, 100, 1)";
                            ctx.shadowBlur = this.radius * 2.5;

                            ctx.strokeStyle = "rgba(255, 240, 180, 1)";
                            ctx.lineWidth = this.radius * 0.25;

                            // Extreme glow, same size as Level 4, increased intensity
                            const glowGradient10 = ctx.createRadialGradient(this.x, this.y, this.radius * 0.8, this.x, this.y, glowRadius);
                            glowGradient10.addColorStop(0, "rgba(255, 200, 100, 0.9)"); //Max intensity glow
                            glowGradient10.addColorStop(1, "rgba(255, 200, 100, 0)");
                            ctx.fillStyle = glowGradient10;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.9:
                            gradient.addColorStop(0, "rgb(255, 255, 240)");
                            gradient.addColorStop(0.2, "rgb(255, 240, 160)");
                            gradient.addColorStop(0.6, "rgb(255, 180, 40)");
                            gradient.addColorStop(0.8, "rgb(255, 80, 10)");
                            gradient.addColorStop(1, "rgb(180, 0, 0)");

                            ctx.shadowColor = "rgba(255, 180, 80, 0.95)";
                            ctx.shadowBlur = this.radius * 2.3;

                            ctx.strokeStyle = "rgba(255, 220, 120, 0.95)";
                            ctx.lineWidth = this.radius * 0.22;

                            // Very intense glow, same size as Level 4, increased intensity
                            const glowGradient9 = ctx.createRadialGradient(this.x, this.y, this.radius * 0.7, this.x, this.y, glowRadius);
                            glowGradient9.addColorStop(0, "rgba(255, 180, 80, 0.8)"); //High intensity glow
                            glowGradient9.addColorStop(1, "rgba(255, 180, 80, 0)");
                            ctx.fillStyle = glowGradient9;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.8:
                            gradient.addColorStop(0, "rgb(255, 250, 220)");
                            gradient.addColorStop(0.2, "rgb(255, 220, 100)");
                            gradient.addColorStop(0.4, "rgb(255, 160, 30)");
                            gradient.addColorStop(0.7, "rgb(255, 80, 10)");
                            gradient.addColorStop(1, "rgb(200, 0, 0)");

                            ctx.shadowColor = "rgba(255, 160, 60, 0.9)";
                            ctx.shadowBlur = this.radius * 2.1;

                            ctx.strokeStyle = "rgba(255, 200, 80, 0.9)";
                            ctx.lineWidth = this.radius * 0.2;

                            // Intense glow, same size as Level 4
                            const glowGradient8 = ctx.createRadialGradient(this.x, this.y, this.radius * 0.6, this.x, this.y, glowRadius);
                            glowGradient8.addColorStop(0, "rgba(255, 160, 60, 0.7)"); //Middle intensity glow
                            glowGradient8.addColorStop(1, "rgba(255, 160, 60, 0)");
                            ctx.fillStyle = glowGradient8;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.7:
                            gradient.addColorStop(0, "rgb(255, 255, 255)");
                            gradient.addColorStop(0.1, "rgb(255, 240, 180)");
                            gradient.addColorStop(0.3, "rgb(255, 200, 50)");
                            gradient.addColorStop(0.6, "rgb(255, 100, 20)");
                            gradient.addColorStop(0.9, "rgb(180, 30, 10)");
                            gradient.addColorStop(1, "rgb(100, 10, 0)");

                            ctx.shadowColor = "rgba(255, 180, 50, 1)";
                            ctx.shadowBlur = this.radius * 1.9;

                            ctx.strokeStyle = "rgba(255, 220, 70, 1)";
                            ctx.lineWidth = this.radius * 0.18;

                            // Very strong glow, same size as Level 4
                            const glowGradient7 = ctx.createRadialGradient(this.x, this.y, this.radius * 0.5, this.x, this.y, glowRadius);
                            glowGradient7.addColorStop(0, "rgba(255, 120, 20, 0.7)"); //Strong intensity glow
                            glowGradient7.addColorStop(1, "rgba(255, 120, 20, 0)");
                            ctx.fillStyle = glowGradient7;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.6:
                            gradient.addColorStop(0, "rgb(255, 250, 200)");
                            gradient.addColorStop(0.2, "rgb(255, 210, 100)");
                            gradient.addColorStop(0.5, "rgb(255, 140, 40)");
                            gradient.addColorStop(0.8, "rgb(230, 60, 20)");
                            gradient.addColorStop(1, "rgb(150, 20, 5)");

                            ctx.shadowColor = "rgba(255, 160, 40, 0.9)";
                            ctx.shadowBlur = this.radius * 2.5;

                            ctx.strokeStyle = "rgba(255, 200, 60, 0.9)";
                            ctx.lineWidth = this.radius * 0.15;

                            // Strong outer glow, same size as Level 4
                            const glowGradient6 = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius);
                            glowGradient6.addColorStop(0, "rgba(255, 100, 20, 0.6)"); //Good intensity glow
                            glowGradient6.addColorStop(1, "rgba(255, 100, 20, 0)");
                            ctx.fillStyle = glowGradient6;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.5:
                            gradient.addColorStop(0, "rgb(255, 240, 160)");
                            gradient.addColorStop(0.3, "rgb(255, 180, 80)");
                            gradient.addColorStop(0.6, "rgb(255, 120, 30)");
                            gradient.addColorStop(1, "rgb(200, 50, 10)");

                            ctx.shadowColor = "rgba(255, 140, 30, 0.8)";
                            ctx.shadowBlur = this.radius * 2;

                            ctx.strokeStyle = "rgba(255, 180, 50, 0.8)";
                            ctx.lineWidth = this.radius * 0.12;

                            // Noticeable outer glow, same size as Level 4
                            const glowGradient5 = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius);
                            glowGradient5.addColorStop(0, "rgba(255, 80, 20, 0.5)"); //Normal intensity glow
                            glowGradient5.addColorStop(1, "rgba(255, 80, 20, 0)");
                            ctx.fillStyle = glowGradient5;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.4:
                            gradient.addColorStop(0, "rgb(255, 230, 140)");
                            gradient.addColorStop(0.4, "rgb(255, 160, 50)");
                            gradient.addColorStop(0.7, "rgb(255, 70, 10)");
                            gradient.addColorStop(1, "rgb(180, 20, 0)");

                            ctx.shadowColor = "rgba(255, 120, 30, 0.7)";
                            ctx.shadowBlur = this.radius * 1.8;

                            ctx.strokeStyle = "rgba(255, 160, 50, 0.7)";
                            ctx.lineWidth = this.radius * 0.1;

                            // Moderate outer glow
                            const glowGradient4 = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius);
                            glowGradient4.addColorStop(0, "rgba(255, 60, 20, 0.4)"); //Low intensity glow
                            glowGradient4.addColorStop(1, "rgba(255, 60, 20, 0)");
                            ctx.fillStyle = glowGradient4;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.3:
                            gradient.addColorStop(0, "rgb(255, 220, 100)");
                            gradient.addColorStop(0.35, "rgb(255, 140, 30)");
                            gradient.addColorStop(0.7, "rgb(220, 60, 10)");
                            gradient.addColorStop(1, "rgb(150, 20, 0)");

                            ctx.shadowColor = "rgba(255, 100, 0, 0.65)";
                            ctx.shadowBlur = this.radius * 1.4;

                            ctx.strokeStyle = "rgba(230, 90, 20, 0.7)";
                            ctx.lineWidth = this.radius * 0.08;

                            // Subtle outer glow
                            const glowGradient3 = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius);
                            glowGradient3.addColorStop(0, "rgba(255, 40, 20, 0.3)");
                            glowGradient3.addColorStop(1, "rgba(255, 40, 20, 0)");
                            ctx.fillStyle = glowGradient3;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.2:
                            gradient.addColorStop(0, "rgb(240, 120, 60)");
                            gradient.addColorStop(0.5, "rgb(220, 60, 30)");
                            gradient.addColorStop(1, "rgb(160, 20, 10)");

                            ctx.shadowColor = "rgba(230, 60, 0, 0.4)";
                            ctx.shadowBlur = this.radius * 0.8;

                            ctx.strokeStyle = "rgba(180, 40, 10, 0.5)";
                            ctx.lineWidth = this.radius * 0.05;

                            // Very subtle outer glow
                            const glowGradient2 = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius);
                            glowGradient2.addColorStop(0, "rgba(255, 20, 20, 0.2)");
                            glowGradient2.addColorStop(1, "rgba(255, 20, 20, 0)");
                            ctx.fillStyle = glowGradient2;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        case this.speed > INITIALSPEED * 1.1:
                            gradient.addColorStop(0, "rgb(225, 70, 50)");
                            gradient.addColorStop(0.6, "rgb(200, 40, 30)");
                            gradient.addColorStop(1, "rgb(140, 15, 10)");

                            ctx.shadowColor = "rgba(210, 50, 20, 0.35)";
                            ctx.shadowBlur = this.radius * 0.5;

                            ctx.strokeStyle = "rgba(150, 30, 15, 0.35)";
                            ctx.lineWidth = this.radius * 0.04;

                            // Barely visible outer glow
                            const glowGradient1 = ctx.createRadialGradient(this.x, this.y, this.radius, this.x, this.y, glowRadius);
                            glowGradient1.addColorStop(0, "rgba(255, 0, 0, 0.1)");
                            glowGradient1.addColorStop(1, "rgba(255, 0, 0, 0)");
                            ctx.fillStyle = glowGradient1;
                            ctx.beginPath();
                            ctx.arc(this.x, this.y, glowRadius, 0, 2 * Math.PI);
                            ctx.fill();
                            break;

                        default:
                            gradient.addColorStop(0, "rgb(210, 50, 40)");
                            gradient.addColorStop(0.7, "rgb(180, 30, 20)");
                            gradient.addColorStop(1, "rgb(130, 10, 5)");

                            ctx.shadowColor = "rgba(190, 30, 20, 0.25)";
                            ctx.shadowBlur = this.radius * 0.3;

                            ctx.strokeStyle = "rgba(140, 20, 10, 0.2)";
                            ctx.lineWidth = this.radius * 0.02;
                            break;
                    }
                    break;
                default:
                    break;
            }

            ctx.fillStyle = gradient;

            // Draw the ball
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    updateSpeed(playerSpeedIncrement) {
        this.speed += playerSpeedIncrement;
    }

    updateTime(playerTimeIncrement) {
        this.timeLeft += playerTimeIncrement;
    }

    isValidtimeLeft() {
        if (this.timeLeft <= 0) {
            return false;
        } else {
            if (this.timeLeft > 30) {
                timeLeftDisplay.style.backgroundColor = "darkgreen";
            } else if (this.timeLeft < 30 && this.timeLeft > 10) {
                timeLeftDisplay.style.backgroundColor = "orange";
            } else if (this.timeLeft < 10) {
                timeLeftDisplay.style.backgroundColor = "darkred";
            }
        }
        return true;
    }

    removeLife() {
        this.lifes--;
    }

    addLife() {
        this.lifes++;
    }

    die(trackRectangles) {
        if (this.radius > 0) {
            this.radius--;
            this.particles.forEach((particle) => (particle.size *= 0.1));
        } else {
            isGameStarted = false;
            isGameOver = true;
            this.isDying = false;
            this.particles = [];

            if (this.lifes > 0) {
                const lastRect = trackRectangles[this.rectIndex];
                this.x = lastRect.x + lastRect.width / 2;
                this.y = lastRect.y + lastRect.height / 2;
                this.direction = lastRect.direction;
                this.reset();
            }
        }
    }

    // Diminish score
    diminishScore() {
        this.score--;
    }
}
