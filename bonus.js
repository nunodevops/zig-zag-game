class Bonus {
    constructor (x, y, size, type = 0, color = 'red') {
        this.x = x;
        this.y = y;
        this.size = size;
        this.type = type; // 0 - time  // 1 - live 
        this.color = color;
        this.bonusItems = [];
    }

    draw(ctx) {
        this.bonusItems.forEach((bonusItem, index) => {
            if (bonusItem) {
                if (distanceFrom(bonusItem, player) < bonusItem.size * 1.40) { // player "grab" obj
                    this.bonusItems[index] = undefined;
                    if (bonusItem.type == 0) {
                        player.updateTime();
                        player.updateSpeed();
                    }
                    else if (bonusItem.type == 1 && player.lives < INITIAL_LIFES)
                        player.addLive();
                } else if (bonusItem.y < player.y) { // bonus undefine
                    this.bonusItems[index] = undefined;
                } else {
                    ctx.save();
                        ctx.translate(bonusItem.x, bonusItem.y);
                        ctx.rotate(135 * Math.PI / 180);
                        ctx.shadowColor = "rgba(10, 0, 0, 0.9)";
                        ctx.shadowBlur = 10;
                        ctx.fillStyle = bonusItem.color;
                        ctx.font = `${this.size}px Arial`;

                        // bonus type
                        if (bonusItem.type == 0) {
                            ctx.font = `bold ${this.size}px Arial`;
                            ctx.scale(0.9, 0.9);
                            ctx.fillText("⏱", -50, 50);
                        }
                        else if (bonusItem.type == 1) {
                            ctx.font = `${this.size / 2}px Arial`;
                            ctx.scale(0.9, 0.9);
                            ctx.fillText("🔴", -50, 50);
                        }

                        //ctx.stroke;
                    ctx.restore();
                }
            }
        });
    }

    generateItem(bonus, type) {
        let bonusX = 0;
        let bonusY = 0;
        const randomNumber = Math.floor(Math.random() * 3) + 7;
        // center bonus
        if(track.rectangles[randomNumber].direction == 'right') {
            bonusX = track.rectangles[randomNumber].x + track.rectangles[randomNumber].width / 2;
            bonusY = track.rectangles[randomNumber].y + track.rectangles[randomNumber].height;
        }
        else {
            bonusX = track.rectangles[randomNumber].x + track.rectangles[randomNumber].width / 2;
            bonusY = track.rectangles[randomNumber].y + track.rectangles[randomNumber].height / 2;
        }
        // if no bonus in the rectangle, add
        if (bonus.bonusItems[randomNumber] === undefined ) {
            const bonusColor = getRandomColor(false);
            bonus.bonusItems[randomNumber] = new Bonus(bonusX, bonusY, 50, type, bonusColor);
        }
    }
}