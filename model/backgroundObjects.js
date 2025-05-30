class BackgroundObject {
    constructor(x, y, size, level, subLevelNum, type, speed) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.level = level;
        this.subLevelNum = subLevelNum;
        this.type = type;
        this.speed = speed;

        this.backgroundObjectImage = new Image();
        this.#updateType(this.type);
    }

    #updateType(type) {
        this.type = type;
        switch (this.level) {
            case 1:
                switch (this.subLevelNum) {
                    case 0:
                        switch (this.type) {
                            default:
                            case 0: // type 1
                                this.backgroundObjectImage.src = getSvg("raceCar");
                                break;
                            //case 1: // type 2
                            //    this.backgroundObjectImage.src = getSvg("flags");
                            //    break;
                            //case 2: // type 3
                            //    this.backgroundObjectImage.src = getSvg("raceTrack", getRandomColor(false));
                            //    break;
                            //case 3: // type 4
                            //    this.backgroundObjectImage.src = getSvg("trophy");
                            //    break;
                            case 4: // type 5
                                this.backgroundObjectImage.src = getSvg("wolfCar");
                                break;
                        }
                        break;
                    case 1:
                        switch (this.type) {
                            default:
                            //case 0: // type 1
                            //    this.backgroundObjectImage.src = getSvg("raceCar");
                            //    break;
                            case 1: // type 2
                                this.backgroundObjectImage.src = getSvg("flags");
                                break;
                                //case 2: // type 3
                                //    this.backgroundObjectImage.src = getSvg("raceTrack", getRandomColor(false));
                                //    break;
                                //case 3: // type 4
                                //    this.backgroundObjectImage.src = getSvg("trophy");
                                //    break;
                                ////case 4: // type 5
                                this.backgroundObjectImage.src = getSvg("wolfCar");
                            //    break;
                        }
                        break;
                    case 2:
                        switch (this.type) {
                            default:
                            //case 0: // type 1
                            //    this.backgroundObjectImage.src = getSvg("raceCar");
                            //    break;
                            //case 1: // type 2
                            //    this.backgroundObjectImage.src = getSvg("flags");
                            //    break;
                            case 2: // type 3
                            //this.backgroundObjectImage.src = getSvg("raceTrack", getRandomColor(false));
                            //break;
                            case 3: // type 4
                                this.backgroundObjectImage.src = getSvg("trophy");
                                break;
                            //case 4: // type 5
                            //    this.backgroundObjectImage.src = getSvg("wolfCar");
                            //    break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                switch (this.subLevelNum) {
                    case 0:
                        switch (this.type) {
                            default:
                            case 0: // type 1
                                this.backgroundObjectImage.src = getSvg("glasses", getRandomColor(false));
                                break;
                            //case 1: // type 2
                            //    this.backgroundObjectImage.src = getSvg("flags");
                            //    break;
                            case 2: // type 3
                                this.backgroundObjectImage.src = getSvg("bullet", getRandomColor(false));
                                break;
                            //case 3: // type 4
                            //    this.backgroundObjectImage.src = getSvg("trophy");
                            //    break;
                            //case 4: // type 5
                            //    this.backgroundObjectImage.src = getSvg("wolfCar");
                            //    break;
                        }
                        break;
                    case 1:
                        switch (this.type) {
                            default:
                            //case 0: // type 1
                            //    this.backgroundObjectImage.src = getSvg("raceCar");
                            //    break;
                            //case 1: // type 2
                            //    this.backgroundObjectImage.src = getSvg("flags");
                            //    break;
                            //case 2: // type 3
                            //    this.backgroundObjectImage.src = getSvg("raceTrack", getRandomColor(false));
                            //    break;
                            //case 3: // type 4
                            //    this.backgroundObjectImage.src = getSvg("trophy");
                            //    break;
                            case 4: // type 5
                                this.backgroundObjectImage.src = getSvg("blue_pill");
                                break;
                        }
                        break;
                    case 2:
                        switch (this.type) {
                            default:
                            //case 0: // type 1
                            //    this.backgroundObjectImage.src = getSvg("raceCar");
                            //    break;
                            //case 1: // type 2
                            //    this.backgroundObjectImage.src = getSvg("flags");
                            //    break;
                            case 2: // type 3
                            //this.backgroundObjectImage.src = getSvg("raceTrack", getRandomColor(false));
                            //break;
                            case 3: // type 4
                                this.backgroundObjectImage.src = getSvg("red_pill");
                                break;
                            //case 4: // type 5
                            //    this.backgroundObjectImage.src = getSvg("wolfCar");
                            //    break;
                        }
                        break;
                    case 3:
                        switch (this.type) {
                            default:
                            case 1: // type 1
                                this.backgroundObjectImage.src = getSvg("pill", getRandomColor(false));
                                break;
                        }
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }

    draw(ctx) {
        if (this.backgroundObjectImage.complete) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.scale(this.size / 2.5, this.size / 2.5); // Adjust scaling as needed
            ctx.drawImage(this.backgroundObjectImage, -256, -256); // Center the image
            ctx.restore();
        }
    }

    update(speed) {
        // Move the object down
        this.y += this.speed + speed / 2;

        // Reset the object when it goes off screen
        if (this.y > backgroundCanvas.height * 1.2 + this.size * 4) {
            this.y = -(this.size * 2 + (Math.random() * backgroundCanvas.height) / 4);
            this.x = Math.random() * backgroundCanvas.width;
            const randomBackgroundObjectType = Math.floor(Math.random() * 5);
            this.type = randomBackgroundObjectType;
            this.#updateType(this.type);
        }
    }
}
