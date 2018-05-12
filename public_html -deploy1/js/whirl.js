
var whirl = {};

var initWhirl = function (game) {
    
    var game = game;
    var wb = game.stage.width;
    var hb = game.stage.height;
    whirl.count = 0;
    whirl.count1 = 0;
    //how much movements
    whirl.whirlStrength = 0.5;
    //how long do after images stay
    whirl.trailStrength = 0.1;
    //shift in a direction
    whirl.directionShift = {x: -10*whirl.whirlStrength, y: 5*whirl.whirlStrength};
    whirl.globalCountSpeed = 1;
    whirl.stormOnOff = true;
    whirl.trailOnOff = true;
    whirl.onOff = true;

    whirl.changeLooper = null;

    whirl.viewSpriteBaseScale = 1.5;
    whirl.viewSprite = {};
    whirl.square = {};
    whirl.squareDesat = {};
//put in phaser update
    whirl.onUpdate = function () {
        if (whirl.onOff) {
            if (whirl.stormOnOff) {
                whirl.count1 += 0.02 * whirl.globalCountSpeed;
                whirl.count2 += 0.034 * whirl.globalCountSpeed;
                //create afterimage through moving the viewsprite
                whirl.viewSprite.x = whirl.directionShift.x + whirl.viewSprite.width / 2 + (Math.cos(whirl.count1) * 5 + Math.sin(whirl.count2 + 1) * 5) * whirl.whirlStrength;
                whirl.viewSprite.y = whirl.directionShift.y + whirl.viewSprite.height / 2 + (Math.sin(whirl.count2) * 5 + Math.cos(whirl.count2 + 1) * 5) * whirl.whirlStrength;
                
            }
            if (whirl.trailOnOff) {
                whirl.viewSprite.alpha = whirl.trailStrength;
                whirl.swapBuffers();
                whirl.backgroundSnapshot.renderXY(codeArtStage.wrapperGroupA , 0, 0, true);
            }
        }
    };

    whirl.swapBuffers = function () {
        var temp = whirl.activeSnapshot;
        whirl.activeSnapshot = whirl.backgroundSnapshot;
        whirl.backgroundSnapshot = temp;
        whirl.viewSprite.setTexture(whirl.activeSnapshot);

    };

//put in on create
    whirl.onCreate = function () {
        whirl.activeSnapshot = game.add.renderTexture(wb * whirl.viewSpriteBaseScale, hb * whirl.viewSpriteBaseScale, "activeSnapshot");
        whirl.backgroundSnapshot = game.add.renderTexture(wb * whirl.viewSpriteBaseScale, hb * whirl.viewSpriteBaseScale, "backgroundSnapshot");
        whirl.currentTexture = whirl.activeSnapshot;
        whirl.count1 = 0;
        whirl.count2 = 0;
        whirl.viewSprite = game.add.sprite(wb / 2, hb / 2, whirl.currentTexture);
        whirl.viewSprite.anchor.set(0.5, 0.5);

        //desat
        var graphics = game.add.graphics(wb, hb);
        graphics.beginFill(0xEEEEEE);
        graphics.drawRect(0, 0, wb, hb);
        graphics.endFill(0xEEEEEE);
        var temp1 = game.add.renderTexture(wb, hb, "temp1");
        temp1.renderXY(graphics, 0, 0, true);
        whirl.squareDesat = game.add.sprite(wb / 2, hb / 2, temp1);
        whirl.squareDesat.anchor.set(0.5, 0.5);
        whirl.squareDesat.alpha = 0.5;
        whirl.squareDesat.blendMode = 15;
        
        //white flash
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, wb, hb);
        graphics.endFill(0xFFFFFF);
        var temp = game.add.renderTexture(wb, hb, "temp");
        temp.renderXY(graphics, 0, 0, true);
        whirl.square = game.add.sprite(wb / 2, hb / 2, temp);
        whirl.square.anchor.set(0.5, 0.5);
        whirl.square.alpha = 0;
        //whirl.square.blendMode = 3;
    };

    whirl.crecendo = function (hits) {
        if (soundEb != null) {
            var times = 0;
            whirl.count = 0;
            whirl.count1 = 0;
            var oldWs = whirl.whirlStrength;
            var oldTs = whirl.trailStrength;
            var oldGcs = whirl.globalCountSpeed;
            whirl.stormOnOff = true;
            whirl.trailOnOff = true;
            whirl.onOff = true;
            var takt = soundEb.takt;
            var hit = function () {
                whirl.whirlStrength += 0.1;
                whirl.trailStrength += ((1 - whirl.trailStrength) / (hits - (times + 1.01)));
                whirl.globalCountSpeed += (0.2 * times);
                //whirl.whiteFlash(whirl.trailStrength*0.01);
                times++;
                console.log("cres " + whirl.trailStrength);
                if (times == hits) {
                    fin();
                }
            }
            var fin = function () {
                whirl.whiteFlash(1);
                whirl.whirlStrength = oldWs;
                whirl.trailStrength = oldTs;
                whirl.globalCountSpeed = oldGcs;
                whirl.stormOnOff = true;
                whirl.trailOnOff = true;
                whirl.onOff = true;
                soundEb.taktTimer.remove(whirl.changeLooper);
            };
            whirl.changeLooper = soundEb.taktTimer.loop(takt, hit, this);
        }
    };

    //soundEb.callFunctNextTakt(whirl.crecendo, [8]);

    whirl.whiteFlash = function (al) {
        var tempTween = game.add.tween(whirl.square).to({alpha: al}, 100);
        tempTween.yoyo(true);
        tempTween.start();
    };
};

//daniel@frohwein.de