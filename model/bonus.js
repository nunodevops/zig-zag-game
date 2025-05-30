class Bonus {
    constructor(x, y, size, type = 0, color = "red", direction) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type; // 0 - time  // 1 - life
        this.color = color;
        this.direction = direction;
        this.bonusItems = [];
        this.bonusImage = new Image();
        this.lifeImage = new Image();
        this.penaltyImage = new Image();
    }

    draw(ctx, playerObj, playerSpeedIncrement, playerTimeIncrement) {
        this.bonusItems.forEach((bonusItem, index) => {
            if (bonusItem) {
                // draw
                ctx.save();
                ctx.translate(bonusItem.x, bonusItem.y);
                ctx.rotate((135 * Math.PI) / 180);
                ctx.shadowColor = "rgba(10, 0, 0, 0.9)";
                ctx.shadowBlur = 10;
                // bonus type
                switch (bonusItem.type) {
                    case 0: // time
                        this.bonusImage.src = level.timeObjectSvg;
                        ctx.scale(level.timeObjectScale, level.timeObjectScale);
                        ctx.drawImage(this.bonusImage, 0, 0);
                        break;
                    case 1: // life
                        //this.lifeImage.src = level.lifeObjectSvg;
                        //ctx.scale(level.lifeObjectScale, level.lifeObjectScale);
                        //ctx.drawImage(this.lifeImage, 0, 0);

                        //ctx.font = `${this.size}px Arial`;
                        //ctx.scale(0.9, 0.9);
                        //ctx.fillText("🔴", -50, 50);

                        ctx.fillStyle = "red";
                        ctx.beginPath();
                        ctx.arc(0, 0, playerObj.radius / 2, 0, 2 * Math.PI);
                        ctx.fill();
                        break;
                    case 2: // grow
                        this.penaltyImage.src = level.growObjectSvg;
                        ctx.scale(level.growObjectScale, level.growObjectScale);
                        ctx.drawImage(this.penaltyImage, 0, 0);
                        break;
                    default:
                        break;
                }
                ctx.restore();

                // update player according to bonus collected
                if (distanceFrom(bonusItem, playerObj) < bonusItem.size + playerObj.radius) {
                    // bonus collected
                    this.bonusItems[index] = undefined;
                    if (bonusItem.type === 0) {
                        if (playerObj.isPlayerBig) {
                            playerObj.isGrowing = false;
                            playerObj.isDecreasing = true;
                        }
                        playerObj.updateTime(playerTimeIncrement);
                        playerObj.updateSpeed(playerSpeedIncrement);
                    } else if (bonusItem.type === 1) {
                        if (playerObj.isPlayerBig) {
                            playerObj.isGrowing = false;
                            playerObj.isDecreasing = true;
                        }
                        if (playerObj.lifes < INITIAL_LIFES) playerObj.addLife();
                    } else if (bonusItem.type === 2) {
                        playerObj.isGrowing = true;
                        playerObj.isDecreasing = false;
                        playerObj.updateTime(playerTimeIncrement * (1 + level.level / 10));
                        playerObj.updateSpeed(playerSpeedIncrement * (1 + level.level / 10));
                    }
                } else if (bonusItem.y < playerObj.y - LONGSIDE) {
                    // bonus out of screen, undefine
                    this.bonusItems[index] = undefined;
                }
            }
        });
    }

    generateItem(bonus, trackRectangles, type) {
        const randomNumber = Math.floor(Math.random() * 3) + 7;
        const dir = trackRectangles[randomNumber].direction;

        let bonusX = 0;
        let bonusY = 0;

        // center bonus
        switch (type) {
            case 0: // time
                bonus.size = level.timeObjectSize;
                if (dir === "right") {
                    bonusX = trackRectangles[randomNumber].x + trackRectangles[randomNumber].width / 1.2;
                    bonusY = trackRectangles[randomNumber].y + trackRectangles[randomNumber].height / 1.5;
                } else if (dir === "left") {
                    bonusX = trackRectangles[randomNumber].x + trackRectangles[randomNumber].width / 1.5;
                    bonusY = trackRectangles[randomNumber].y + trackRectangles[randomNumber].height / 1.8;
                }
                break;
            case 1: // life
                bonus.size = level.lifeObjectSize;
                if (dir === "left") {
                    bonusX = trackRectangles[randomNumber].x + trackRectangles[randomNumber].width / 2; // / 1.5;
                    bonusY = trackRectangles[randomNumber].y + trackRectangles[randomNumber].height / 2; // / 2;
                } else if (dir === "right") {
                    bonusX = trackRectangles[randomNumber].x + trackRectangles[randomNumber].width / 2; //1.5;
                    bonusY = trackRectangles[randomNumber].y + trackRectangles[randomNumber].height / 2; // / 1.8;
                }
                break;
            case 2: // grow
                bonus.size = level.growObjectSize;
                if (dir === "left") {
                    bonusX = trackRectangles[randomNumber].x + trackRectangles[randomNumber].width / 1.5;
                    bonusY = trackRectangles[randomNumber].y + trackRectangles[randomNumber].height / 2;
                } else if (dir === "right") {
                    bonusX = trackRectangles[randomNumber].x + trackRectangles[randomNumber].width / 1.1;
                    bonusY = trackRectangles[randomNumber].y + trackRectangles[randomNumber].height / 2;
                }
                break;
            default:
                break;
        }

        // if no bonus in the rectangle, add
        if (bonus.bonusItems[randomNumber] === undefined) {
            const bonusColor = getRandomColor(false, 0, 0);
            bonus.bonusItems[randomNumber] = new Bonus(bonusX, bonusY, bonus.size, type, bonusColor, dir);
        }
    }
}
