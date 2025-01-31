class Rectangle {
   constructor(x, y, width, height, direction, hasShadow, shadowDirection, color, roundness, pattern) {
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

   draw(ctx, patternType) {
      // pattern
      this.drawPattern(patternType);

      // rect
      const offSet = this.width * 0.02;
      ctx.save();
         const pattern = ctx.createPattern(patternCanvas, "repeat");
         if (patternType == 0)
            ctx.fillStyle = this.color;
         else
            ctx.fillStyle = pattern;
         
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

   drawPattern (type) {
      // size
      patternCanvas.width = 20;  // Size of the pattern tile
      patternCanvas.height = 20;
      // type
      switch (type) {
         case 0:
            break;
         case 1:
            patternContext.strokeStyle = "white";
            patternContext.lineWidth = 15;
            patternContext.beginPath();
            patternContext.moveTo(0, 20);
            patternContext.lineTo(20, 0);
            patternContext.stroke();
            break;
         case 2:
            patternContext.fillStyle = "#FFF";
            patternContext.fillRect(0, 0, 20, 20);
            patternContext.fillStyle = "#000";
            patternContext.beginPath();
            patternContext.arc(10, 10, 5, 0, Math.PI * 2);
            patternContext.fill();
            break;
         case 2:

            break;
         case 3:
            
            break;
         default:
            break;
      }
   }
}