class Track {
    constructor(left, top, num, shortSide, longSide, minLong, maxLong, minShort, maxShort, roundness, color, trackType, trackPattern, levelNum) {
        this.left = left;
        this.top = top;
        this.num = num;
        this.shortSide = shortSide;
        this.longSide = longSide;
        this.minLong = minLong;
        this.maxLong = maxLong;
        this.minShort = minShort;
        this.maxShort = maxShort;
        this.roundness = roundness;
        this.color = color;
        this.trackType = trackType;
        this.trackPattern = trackPattern;
        this.levelNum = levelNum;

        //
        this.rectangles = [];
        this.index = 0;
        this.shortSideRandom = shortSide;
        this.longSideRandom = longSide;
        this.shadowDirection = "down";
        this.hasShadow = true;
        this.lastShortSide = this.shortSideRandom;
        this.lastLongSide = this.longSideRandom;
        this.stepsTrack = false;
        this.rectangleCount = 0;
        this.lastTrackType = 0;

        while (this.index < this.num) {
            this.enqueueRectangle();
        }

        createPattern(this.trackType, this.trackPattern, this.levelNum);
    }

    enqueueRectangle() {
        // track end
        if (this.trackEnd) {
            this.lastTrackPattern = this.trackPattern;
            this.lastTrackType = this.trackType;
            this.trackType = END_TRACK_TYPE;
            createPattern(this.trackType, this.trackPattern, this.levelNum);
        }

        if (this.index % 2 == 0) {
            const [width, height] = [this.longSideRandom, this.shortSideRandom];
            this.rectangles.push(new Rectangle(this.left, this.top, width, height, "left", this.hasShadow, this.shadowDirection, this.color, this.roundness, this.trackType));

            if (this.stepsTrack) this.left += width + 2; //(width - this.shortSideRandom);
            else this.left += width - 1;
        } else {
            // down
            const [width, height] = [this.shortSideRandom, this.longSideRandom];
            this.rectangles.push(new Rectangle(this.left, this.top, width, height, "right", this.hasShadow, this.shadowDirection, this.color, this.roundness, this.trackType));

            if (this.stepsTrack) this.top += height + 2;
            else this.top += height - 1;
        }

        // reset index and modify track longside
        if (this.index === this.num) {
            this.index = 0;
            this.lastLongSide = this.longSideRandom;
            this.lastShortSide = this.shortSideRandom;
            this.shortSideRandom = Math.floor(Math.random() * (this.maxShort - this.minShort + 1)) + this.minShort;
            this.longSideRandom = Math.floor(Math.random() * (this.maxLong - this.minLong + 1)) + this.minLong;
            this.shadowDirection = this.shadowDirection == "down" ? "up" : "down";
        }

        // track after end
        if (this.trackEnd) {
            this.trackType = this.lastTrackType;
            createPattern(this.trackType, this.trackPattern, this.levelNum);
            this.trackEnd = false;
        }

        this.index++;
        this.rectangleCount++;
    }

    dequeueRectangle() {
        this.rectangles.shift();
    }

    adjust(playerObj) {
        for (let i = 0; i < this.rectangles.length; i++) {
            const rect = this.rectangles[i];
            if (rect.contains(playerObj)) {
                if (i > this.rectangles.length / 2) {
                    this.dequeueRectangle();
                    this.enqueueRectangle();
                    return;
                }
            }
        }
    }

    contains(playerObj) {
        let isOnTrack = false;
        let idx = 0;
        for (const rect of this.rectangles) {
            if (this.isPlayerInRectangle(playerObj, rect)) {
                isOnTrack = true;
                if (playerObj.rectIndex < idx) {
                    playerObj.diminishScore(); // player passed rectangle diminish score.
                }
                playerObj.rectIndex = idx;
                playerObj.rectDirection = rect.direction;
                break;
            }
            idx++;
        }

        // if is in transiction step-up player to next rectangle
        if (isOnTrack && this.stepsTrack) {
            if (this.#isPlayerTransitioning(player)) {
                playerObj.radius = Math.min(playerObj.radius + 1, playerObj.maxRadius); // Increase radius
            } else {
                playerObj.radius = Math.max(playerObj.radius - 1, playerObj.minRadius); // Decrease radius
            }
        }
        return isOnTrack;
    }

    isPlayerInRectangle(playerObj, rectObj) {
        // Find the closest point on the rectangle to the playerObj
        const closestX = Math.max(rectObj.x, Math.min(playerObj.x, rectObj.x + rectObj.width));
        const closestY = Math.max(rectObj.y, Math.min(playerObj.y, rectObj.y + rectObj.height));
        // Calculate distance between playerObj center and this closest point
        const distX = playerObj.x - closestX;
        const distY = playerObj.y - closestY;
        const distanceSquared = distX * distX + distY * distY;
        // Check if this distance is less than or equal to the playerObj's radius squared / 10
        return distanceSquared <= ((playerObj.radius / 10) * playerObj.radius) / 10;
    }

    rotate(ctx, playerObj) {
        ctx.translate(foregroundCanvas.width / 2, foregroundCanvas.height / 2);
        ctx.rotate((-3 * Math.PI) / 4);
        ctx.translate(-playerObj.x, -playerObj.y);
    }

    draw(ctx) {
        for (const [index, rect] of this.rectangles.entries()) {
            rect.draw(ctx, rect.x, rect.y, rect.pattern, rect.color, rect.shadowDirection, rect.width, rect.height, rect.roundness, index);
        }
    }

    changeColor() {
        this.color = getRandomColor(true, 1, 0.9);
    }

    #isPlayerTransitioning(playerObj) {
        if (playerObj.rectIndex === undefined || playerObj.rectIndex < 0 || playerObj.rectIndex >= this.rectangles.length - 1) {
            return false;
        }
        const currentRect = this.rectangles[playerObj.rectIndex];
        const nextRect = this.rectangles[playerObj.rectIndex + 1];
        const playerX = playerObj.x;
        const playerY = playerObj.y;
        const isNearCurrentRectEdge =
            playerX > currentRect.x + currentRect.width - 10 || playerX < currentRect.x + 10 || playerY > currentRect.y + currentRect.height - 10 || playerY < currentRect.y + 10;
        const isNearNextRect = playerX > nextRect.x - 10 && playerX < nextRect.x + nextRect.width + 10 && playerY > nextRect.y - 10 && playerY < nextRect.y + nextRect.height + 10;

        return isNearCurrentRectEdge && isNearNextRect;
    }

    //#drawTrackPattern(type) {
    ///    //this.patternType = type;
    //    createPattern(type);
    //}

    //changeTypeOfTrack(type) {
    //  this.patternType = type;
    //  this.#drawTrackPattern();
    //this.stepsTrack = Math.random() > 0.5 ? true : false;
    //}
}
