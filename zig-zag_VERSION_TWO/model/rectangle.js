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
        this.pattern = pattern;
    }

    contains(playerObj) {
        const left = this.x + playerObj.radius;
        const right = this.x + this.width - playerObj.radius;
        const top = this.y + playerObj.radius;
        const bottom = this.y + this.height - playerObj.radius;
        return playerObj.x >= left && playerObj.x <= right && playerObj.y >= top && playerObj.y <= bottom;
    }

    draw(ctx, rectX, rectY, rectPatternType, rectColor, rectShadowDirection, rectWidth, rectHeight, rectRoundness, rectIndex) {
        // pattern
        let rectPattern = null;
        switch (rectPatternType) {
            case 0:
                ctx.fillStyle = rectColor;
                break;
            case 1: // normal pattern
                rectPattern = ctx.createPattern(patternCanvas, "repeat");
                ctx.fillStyle = rectPattern;
                break;
            case 99: // track end pattern
                rectPattern = ctx.createPattern(trackEndCanvas, "repeat");
                ctx.fillStyle = rectPattern;
                break;
            default:
                ctx.fillStyle = rectColor;
                break;
        }

        ctx.save();

        this.drawRoundedRectangle(ctx, rectX, rectY, rectWidth, rectHeight, rectRoundness, rectColor);
        ctx.fill();
        ctx.restore();
    }

    drawRoundedRectangle(ctx, x, y, width, height, radius, color) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y); // Start at top-left corner
        ctx.lineTo(x + width - radius, y); // Top edge
        ctx.arcTo(x + width, y, x + width, y + radius, radius); // Top-right corner
        ctx.lineTo(x + width, y + height - radius); // Right edge
        ctx.arcTo(x + width, y + height, x + width - radius, y + height, radius); // Bottom-right corner
        ctx.lineTo(x + radius, y + height); // Bottom edge
        ctx.arcTo(x, y + height, x, y + height - radius, radius); // Bottom-left corner
        ctx.lineTo(x, y + radius); // Left edge
        ctx.arcTo(x, y, x + radius, y, radius); // Top-left corner
        ctx.closePath();
    }
}
