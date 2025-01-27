class Track {
   constructor(left, top, num, shortSide, longSide, minLong, maxLong, minShort, maxShort, roundness) {
      this.left = left;
      this.top = top;
      this.shortSide = shortSide;
      this.minShort = minShort;
      this.maxShort = maxShort;
      this.longSide = longSide;
      this.minLong = minLong;
      this.maxLong = maxLong;
      this.rectangles = [];
      this.index = 0;
      this.num = num;
      this.shortSideRandom = shortSide;
      this.longSideRandom = longSide;
      this.shadowDirection = "down";
      this.color = "rgba(255, 255, 255)";
      this.hasShadow = true;
      this.roundness = roundness;
      this.lastShortSide = this.shortSideRandom;
      this.lastLongSide = this.longSideRandom;

      while(this.index < num) {
         this.enqueueRectangle();
      }
   }
   
   enqueueRectangle() {
      // adjust to shortside
      const adjustDown = (this.lastShortSide - this.shortSideRandom);
      if (this.index % 2 == 0) {
         const [width, height] = [this.longSideRandom, this.shortSideRandom];
         this.rectangles.push(new Rectangle(this.left + adjustDown, this.top, width, height, 'right', this.hasShadow, this.shadowDirection, this.color, this.roundness));
         this.left += (width - this.shortSideRandom);
      } else { // down
         const [width, height] = [this.shortSideRandom, this.longSideRandom];
         this.rectangles.push(new Rectangle(this.left + adjustDown, this.top, width, height, 'down', this.hasShadow, this.shadowDirection, this.color, this.roundness));
         this.top += (height - this.shortSideRandom);
      }

      // reset index and modify track longside
      if (this.index == (this.num)) {
         this.index = 0;
         this.lastLongSide = this.longSideRandom;
         this.lastShortSide = this.shortSideRandom;
         this.shortSideRandom = Math.floor(Math.random() * (this.maxShort - this.minShort + 1)) + this.minShort;
         this.longSideRandom = Math.floor(Math.random() * (this.maxLong - this.minLong + 1)) + this.minLong;
         this.shadowDirection = this.shadowDirection == "down" ? "up" : "down";

         // incress level
         background.level++;
         background.updateColors();
      }
      this.index ++; 
   }
   
   dequeueRectangle() {
      this.rectangles.shift();
   }
   
   adjustFor(player) {
      for (let i = 0; i < this.rectangles.length; i++) {
         const rect = this.rectangles[i];
         if (rect.contains(player)) {
            if (i > this.rectangles.length / 2) {
               this.dequeueRectangle();
               this.enqueueRectangle();
               return;
            }
         }
      }
   }
   
   contains(player) {
      let isOnTrack = false;
      let index=0;
      for (const rect of this.rectangles) {
         if (rect.contains(player)) {
            isOnTrack = true;
            return isOnTrack;
         }
         index++;
      }
      return isOnTrack;
   }
   
   rotate(ctx) {
      ctx.translate(myCanvas.width / 2, myCanvas.height / 2);
               ctx.rotate(-3 * Math.PI / 4);
               ctx.translate(-player.x, -player.y);
   }

   draw(ctx) {
      for (const rect of this.rectangles) {
         rect.draw(ctx);
      }
   }
}