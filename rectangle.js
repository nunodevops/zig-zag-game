class Rectangle {
   constructor(x, y, width, height, direction, hasShadow, shadowDirection, color, roundness) {
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.direction = direction; // needed for calculate bonus coordinates.
      this.color = color;
      this.hasShadow = hasShadow;
      this.shadowDirection = shadowDirection;
      this.roundness = roundness;
   }

   contains(player) {
      const left = this.x + player.radius;
      const right = this.x + this.width - player.radius;
      const top = this.y + player.radius;
      const bottom = this.y + this.height - player.radius;
      return (
         player.x >= left &&
         player.x <= right &&
         player.y >= top &&
         player.y <= bottom
      );
   }

   draw(ctx) {
      const offSet = this.width * 0.02;
      ctx.save();
         ctx.fillStyle = this.color;

         if (this.hasShadow) {
            ctx.shadowColor = "rgba(0, 0, 0, 0.3)";
            if (this.shadowDirection === "down")
               ctx.shadowOffsetX = -offSet;
            else
               ctx.shadowOffsetY = -offSet;   
         }

         ctx.roundRect(this.x, this.y, this.width, this.height, this.roundness);
         
         ctx.fill();
      ctx.restore();
   }
}