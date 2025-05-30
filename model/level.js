class Level {
    constructor(level) {
        this.level = level;
        // time object
        this.timeObject = null;
        this.timeObjectSvg = null;
        this.timeObjectScale = 0;
        this.timeObjectSize = 0;
        //
        this.numBackgroundObjects = 0;
        this.levelScore = 0;
        this.subLevels = {};
        this.subLevel = 0;
        this.subLevelNum = 0;
        this.trackType = 0;
        this.trackPattern = 0;
        this.playerSpeedIncrement = 0;
        this.playerTimeIncrement = 0;
        // grow object
        this.growObject = null;
        this.growObjectSvg = null;
        this.growObjectScale = 0;
        this.growObjectSize = 0;
        // bonus
        this.generateBonusItemTimer = 0;
        this.generateBonusLifeTimer = 0;
        this.generateGrowTimer = 0;
        // life object
        this.lifeObjectSize = 0;
        this.lifeObjectSvg = null;
        this.lifeObjectScale = 0;
        // titles
        this.levelTitleFont = "";
        this.levelFontSize = "";
    }

    createLevel(level) {
        switch (level) {
            case 1:
                // time object
                this.timeObject = "gascan.svg";
                this.timeObjectSvg = getSvg("gasCan");
                this.timeObjectScale = 0.5;
                this.timeObjectSize = 45;
                this.lifeObjectSize = 15;
                this.lifeObjectSvg = getSvg("red_life_ball");
                this.lifeObjectScale = 1;
                this.numBackgroundObjects = 1;
                this.levelScore = 100;
                this.subLevels = { 100: 0, 95: 1, 85: 2, 75: 3, 65: 4, 55: 5, 45: 6, 35: 7, 25: 8, 15: 9 };
                this.trackType = 1;
                this.trackPattern = 0;
                this.playerSpeedIncrement = 0.5;
                this.playerTimeIncrement = 10;
                this.growObject = "gasPump.svg";
                this.growObjectSvg = getSvg("gasPump");
                this.growObjectScale = 0.1;
                this.growObjectSize = 55;
                this.generateBonusItemTimer = 11000;
                this.generateBonusLifeTimer = 50000;
                this.generateGrowTimer = 30000;
                this.levelTitleFont = "FasterOne Regular";
                this.levelFontSize = "36px";
                break;
            case 2:
                // time object
                this.timeObject = "powerCell.svg";
                this.timeObjectSvg = getSvg("powerCell");
                this.timeObjectScale = 0.1;
                this.timeObjectSize = 45;
                this.lifeObjectSize = 15;
                this.lifeObjectSvg = getSvg("red_life_ball");
                this.lifeObjectScale = 1;
                this.numBackgroundObjects = 2;
                this.levelScore = 200;
                this.subLevels = { 200: 0, 180: 1, 160: 2, 140: 3, 120: 4, 100: 5, 80: 6, 60: 7, 40: 8, 20: 9 };
                this.trackType = 1;
                this.trackPattern = 0;
                this.playerSpeedIncrement = 0.4;
                this.playerTimeIncrement = 10;
                this.growObject = "eletricCharger.svg";
                this.growObjectSvg = getSvg("eletricCharger");
                this.growObjectScale = 0.125;
                this.growObjectSize = 55;
                this.generateBonusItemTimer = 12000;
                this.generateBonusLifeTimer = 55000;
                this.generateGrowTimer = 33000;
                this.levelTitleFont = "Orbitron Regular";
                this.levelFontSize = "32px";
                break;
            case 3:
                // time object
                this.timeObject = "easterEgg.svg";
                this.timeObjectSvg = getSvg("easterEgg");
                this.timeObjectScale = 0.075;
                this.timeObjectSize = 45;
                this.lifeObjectSize = 15;
                this.lifeObjectSvg = getSvg("red_life_ball");
                this.lifeObjectScale = 1;
                this.numBackgroundObjects = 2;
                this.levelScore = 200;
                this.subLevels = { 200: 0, 180: 1, 160: 2, 140: 3, 120: 4, 100: 5, 80: 6, 60: 7, 40: 8, 20: 9 };
                this.trackType = 1;
                this.trackPattern = 0;
                this.playerSpeedIncrement = 0.4;
                this.playerTimeIncrement = 10;
                this.growObject = "easterBunny.svg";
                this.growObjectSvg = getSvg("easterBunny");
                this.growObjectScale = 0.135;
                this.growObjectSize = 55;
                this.generateBonusItemTimer = 12000;
                this.generateBonusLifeTimer = 40000;
                this.generateGrowTimer = 33000;
                this.levelTitleFont = "Bungee Regular";
                this.levelFontSize = "32px";
                break;
            default:
                // time object
                this.timeObject = "gascan.svg";
                this.timeObjectSvg = getSvg("gasCan");
                this.timeObjectScale = 0.5;
                this.timeObjectSize = 45;
                this.lifeObjectSize = 15;
                this.lifeObjectSvg = getSvg("red_life_ball");
                this.lifeObjectScale = 1;
                this.numBackgroundObjects = 1;
                this.levelScore = 100;
                this.subLevels = { 100: 0, 95: 1, 85: 2, 75: 3, 65: 4, 55: 5, 45: 6, 35: 7, 25: 8, 15: 9 };
                this.trackType = 1;
                this.trackPattern = 0;
                this.playerSpeedIncrement = 0.5;
                this.playerTimeIncrement = 10;
                this.growObject = "gasPump.svg";
                this.growObjectSvg = getSvg("gasPump");
                this.growObjectScale = 0.1;
                this.growObjectSize = 55;
                this.generateBonusItemTimer = 11000;
                this.generateBonusLifeTimer = 50000;
                this.generateGrowTimer = 30000;
                this.levelTitleFont = "FasterOne Regular";
                this.levelFontSize = "36px";
                break;
        }
    }
}
