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
                x: Math.random() * backgroundCanvas.width,
                y: Math.random() * backgroundCanvas.height,
                width: Math.random() * 90 + 20,
                height: Math.random() * 90 + 20,
                speed: Math.random() * 2 + 1
            });
        }
    }

    updateColors() {
        const backgroundRandomColor = getRandomColor(false);
        let rectangleRandomColor = getRandomColor(true);
        // prevent colors to be equal
        while (true) {
            if (!isEqualRGBColor(rectangleRandomColor, backgroundRandomColor))
                break;
            else
                rectangleRandomColor = getRandomColor(true);
        }

        if (this.level % 2 === 0) {
            this.backgroundColor = backgroundRandomColor;
            this.rectangleColor = 'darkblue';
        } else {
            this.backgroundColor = 'darkgray';
            this.rectangleColor = rectangleRandomColor;
        }
    }

    drawBackground(bckCtx) {
        bckCtx.fillStyle = this.backgroundColor;
        bckCtx.fillRect(0, 0, bckCtx.canvas.width, bckCtx.canvas.height);

        this.items.forEach(item => {
            bckCtx.save();
            bckCtx.fillStyle = this.rectangleColor;
            bckCtx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            bckCtx.shadowBlur = 10;
            bckCtx.fillRect(item.x, item.y, item.width, item.height);
            bckCtx.stroke();
            bckCtx.restore();
        });
    }

    updatePattern(bckCtx) {
        // Clear the canvas
        bckCtx.clearRect(0, 0, bckCtx.canvas.width, bckCtx.canvas.height);

        // Draw the background
        this.drawBackground(bckCtx);

        // Update the position of the rectangles
        this.items.forEach(item => {
            item.y += ((player.speed / 10) * item.speed);
            if (item.y > bckCtx.canvas.height) {
                item.y = -item.height;
                item.x = Math.random() * bckCtx.canvas.width;
            }
        });
    }
}