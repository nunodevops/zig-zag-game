class Player {
   constructor(x, y, radius, speed, direction = "right", timeLeft, score) {
      this.x = x;
      this.y = y;
      this.radius = radius;
      this.direction = direction;
      this.speed = speed;
      this.timeLeft = timeLeft;
      this.score = score;
      this.particles = [];
      this.velocityX = speed;
      this.velocityY = 0;
      this.targetVelocityX = speed;
      this.targetVelocityY = 0;
   }

   move() {
      // Gradually adjust the current velocity towards the target velocity
      this.velocityX += (this.targetVelocityX - this.velocityX) * 0.1;
      this.velocityY += (this.targetVelocityY - this.velocityY) * 0.1;

      this.x += this.velocityX;
      this.y += this.velocityY;

      // Generate multiple particles for a more dispersed trail
      for (let i = 0; i < 10; i++) { // Increase the number of particles
          this.particles.push(new Particle(this.x, this.y, this.radius / 4, 60, this.direction)); // Pass direction
      }
   }

   changeDirection() {
      if (this.direction == "right") {
         this.direction = "down";
         this.targetVelocityX = 0;
         this.targetVelocityY = this.speed;
      } else {
            this.direction = "right";
            this.targetVelocityX = this.speed;
            this.targetVelocityY = 0;
      }
   }

   draw(ctx) {
      // Draw particles
      this.particles.forEach((particle, index) => {
         if (particle.isAlive()) {
             particle.update();
             particle.draw(ctx);
         } else {
             this.particles.splice(index, 1);
         }
      });

      // add gradient
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x , this.y, this.radius);
      gradient.addColorStop(0, 'red');
      gradient.addColorStop(1, 'darkred');

      // add shadow
      ctx.shadowColor = "rgba(0, 0, 0, 0.4)";
      ctx.shadowBlur = this.radius;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();
      
   }

   addtimeLeft() {
      this.timeLeft += 30;
      this.speed += .5;
   }

   isValidtimeLeft(player) {
      if (player.timeLeft <= 0) {
         return false;
      }
      else
      {
         if (player.timeLeft > 10) {
            timeLeftDisplay.style.backgroundColor = 'darkgreen';
         } else if (player.timeLeft < 10 && player.timeLeft > 5) {
            timeLeftDisplay.style.backgroundColor = 'orange';
         } else if (player.timeLeft < 5) {
            timeLeftDisplay.style.backgroundColor = 'darkred';
         }
      }
      return true;
   }

   die(player) {
      if (player.radius > 0)
      {
         player.radius--;
      }
      else
      {
         isGameStarted = false;
         isGameOver = true;
         isPlayerDying = false;
      }
   }

   addScore(player) {
      player.score = background.level + 1;
   }
}