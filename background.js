class Background {
    constructor(level) {
        this.level = level;
        this.items = [];
        this.active = true;
        this.initRectangles();
        this.updateColors();
    }

    initRectangles() {
        for (let i = 0; i < 50; i++) {
            this.items.push({
                x: Math.random() * bckCanvas.width,
                y: Math.random() * bckCanvas.height,
                width: Math.random() * 90 + 20,
                height: Math.random() * 90 + 20,
                speed: Math.random() * 2 + 1
            });
        }
    }

    updateColors() {
        if (this.level % 2 === 0) {
            this.backgroundColor = getRandomColor();
            this.rectangleColor = 'darkblue';
        } else {
            this.backgroundColor = 'darkgray';
            this.rectangleColor = getRandomColor();
        }
    }

    drawBackground(ctx) {
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.items.forEach(item => {
            ctx.save();
            ctx.fillStyle = this.rectangleColor;
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;
            ctx.fillRect(item.x, item.y, item.width, item.height);
            ctx.stroke();
            ctx.restore();
        });
    }

    updatePattern(ctx, playerSpeed) {
        // Clear the canvas
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        // Draw the background
        this.drawBackground(ctx);

        // Update the position of the rectangles
        this.items.forEach(item => {
            item.y += ((playerSpeed / 10) * item.speed);
            if (item.y > ctx.canvas.height) {
                item.y = -item.height;
                item.x = Math.random() * ctx.canvas.width;
            }
        });
    }
}