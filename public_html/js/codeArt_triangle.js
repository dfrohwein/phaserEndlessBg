
if (typeof codeArtStage === 'undefined') {
    var codeArtStage = {};
    codeArtStage.scaleAll = 0.5;
    codeArtStage.baseSprite = {};
    codeArtStage.width = 800;
    codeArtStage.height = 600;
    codeArtStage.backgroundBase = {};
    codeArtStage.backgroundSprite = {};
    codeArtStage.animationLoops = {};
    codeArtStage.cloudSpriteToDraw = {};
    codeArtStage.shineToDraw = {};
    codeArtStage.tria = {};
    codeArtStage.currentColor = Phaser.Color.hexToColor("#6387AD");
    codeArtStage.bgColor = Phaser.Color.createColor(12, 11, 10);
    codeArtStage.aColor = Phaser.Color.hexToColor("#6387AD");
    codeArtStage.bColor = function () {
        var tempCol = Phaser.Color.RGBtoHSL(codeArtStage.aColor.r, codeArtStage.aColor.g, codeArtStage.aColor.b);
        tempCol.h += 0.5;
        if (tempCol.h > 1) {
            tempCol.h -= 1;
        }
        tempCol = Phaser.Color.HSLtoRGB(tempCol.h, tempCol.s, tempCol.l);
        return tempCol;
    }();

    codeArtStage.animationLoops.turnRepeat = function (turnSprite, offset) {
        var wander = codeArtStage.game.add.tween(turnSprite);
        wander.to({rotation: turnSprite.rotation + 2}, 8000, Phaser.Easing.Sinusoidal.InOut, null, offset * 5000);
        wander.onComplete.add(codeArtStage.animationLoops.turnRepeat, this);
        wander.start();
    };
    codeArtStage.animationLoops.circlePointRepeat = function (turnSprite1, xM, yM, dst, offset) {
        let xMid = xM;
        let yMid = yM;
        let dist = dst;
        let repeat = function () {
            var wander = codeArtStage.game.add.tween(turnSprite1);
            var time = codeArtStage.game.time.totalElapsedSeconds() + offset;
            wander.to({x: xMid + Math.sin(time) * dist, y: yMid + Math.cos(time) * dist}, 153);
            wander.onComplete.add(repeat, this);
            wander.start();
        }
        repeat();
    };
    codeArtStage.pixelFilters = {};
    codeArtStage.pixelFilters.invert3 = function (pixel) {

        //  The incoming pixel values
        var r = pixel.r;
        var g = pixel.g;
        var b = pixel.b;
        var a = pixel.a;
        //  And let's mix them up a bit
        pixel.r = 255;
        pixel.g = 255;
        pixel.b = 255;
        pixel.a = 255 - (r + g + b) / 3;
        return pixel;
    };
    codeArtStage.pixelFilters.toBgColorInvert3 = function (pixel) {
        //  The incoming pixel values
        var r = pixel.r;
        var g = pixel.g;
        var b = pixel.b;
        var a = pixel.a;
        //  And let's mix them up a bit
        pixel.r = codeArtStage.bgColor.r;
        pixel.g = codeArtStage.bgColor.g;
        pixel.b = codeArtStage.bgColor.b;
        pixel.a = 255 - (r + g + b) / 3;
        return pixel;
    };
    codeArtStage.pixelFilters.toAColor = function (pixel) {
        //  The incoming pixel values
        var r = pixel.r;
        var g = pixel.g;
        var b = pixel.b;
        var a = pixel.a;
        //  And let's mix them up a bit
        pixel.r = codeArtStage.aColor.r;
        pixel.g = codeArtStage.aColor.g;
        pixel.b = codeArtStage.aColor.b;
        return pixel;
    };
    codeArtStage.pixelFilters.toBColor = function (pixel) {
        //  The incoming pixel values
        var r = pixel.r;
        var g = pixel.g;
        var b = pixel.b;
        var a = pixel.a;
        //  And let's mix them up a bit
        pixel.r = codeArtStage.bColor.r;
        pixel.g = codeArtStage.bColor.g;
        pixel.b = codeArtStage.bColor.b;
        //pixel.a = (r + g + b) / 3;
        return pixel;
    };
    codeArtStage.pixelFilters.toCurrentColor = function (pixel) {
        //  The incoming pixel values
        var r = pixel.r;
        var g = pixel.g;
        var b = pixel.b;
        var a = pixel.a;
        //  And let's mix them up a bit
        pixel.r = codeArtStage.currentColor.r;
        pixel.g = codeArtStage.currentColor.g;
        pixel.b = codeArtStage.currentColor.b;
        //pixel.a = (r + g + b) / 3;
        return pixel;
    };

    codeArtStage.init = function () {

        codeArtStage.game = new Phaser.Game(codeArtStage.width, codeArtStage.height, Phaser.CANVAS, '', {preload: preload, create: create, update: update});
        let game = codeArtStage.game;
        function preload() {
            game.load.image('circ', 'images/circ.jpg');
            game.load.image('cloud', 'images/greencld.png');
            game.load.image('shine', 'images/shine1.png');
            game.load.image('tria', 'images/goldenTria.png');
            game.stage.backgroundColor = codeArtStage.bgColor.color;
        }

        function create() {
            //layers
            var farBack = game.add.group();
            var back = game.add.group();
            var front = game.add.group();
            //bitmaps
            codeArtStage.backgroundBase = game.make.bitmapData(codeArtStage.width, codeArtStage.height);
            codeArtStage.backgroundBase.rect(0, 0, codeArtStage.width, codeArtStage.height, "#c2e3f0");
            codeArtStage.backgroundSprite = game.add.sprite(0, 0, codeArtStage.backgroundBase);
            farBack.add(codeArtStage.backgroundSprite);
            //base in white
            var bmd = game.make.bitmapData();
            bmd.load('circ');
            bmd.processPixelRGB(codeArtStage.pixelFilters.invert3, this);
            //base in black
            var bmdblc = game.make.bitmapData();
            bmdblc.load('circ');
            bmdblc.processPixelRGB(codeArtStage.pixelFilters.toBgColorInvert3, this);
            //colorize cloud
            var bmdCloud = game.make.bitmapData();
            bmdCloud.load('cloud');
            bmdCloud.processPixelRGB(codeArtStage.pixelFilters.toAColor, this);
            //cloud Sprite for drawing
            codeArtStage.cloudSpriteToDraw = game.make.sprite(0, 0, bmdCloud);
            codeArtStage.cloudSpriteToDraw.anchor.set(0.5, 0.5);
            //inverted
            var bmdCloudInvert = game.make.bitmapData();
            bmdCloudInvert.load('cloud');
            bmdCloudInvert.processPixelRGB(codeArtStage.pixelFilters.toBColor, this);
            //add base sprite
            codeArtStage.baseSprite = game.add.sprite(game.world.centerX, game.world.centerY, bmdblc);
            var baseSprite = codeArtStage.baseSprite;
            baseSprite.anchor.set(0.5, 0.5);
            baseSprite.scale.set(codeArtStage.scaleAll, codeArtStage.scaleAll);
            front.add(baseSprite);
            //bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
            //codeArtStage.baseSprite = game.add.sprite(game.world.centerX, game.world.centerY, bmd);
            //shine sprite for drawing
            codeArtStage.shineToDraw = game.make.sprite(0, 0, 'shine');
            codeArtStage.shineToDraw.anchor.set(0.5, 0.5);
            //triangle
            codeArtStage.tria = game.make.sprite(0, 0, 'tria');


            var newCirclerSprite = function (delay, key, xer, yer, dist, alphaFinal, scale, turn, circle, offset, blendMode) {

                let spriteCr = game.add.sprite(game.world.centerX, game.world.centerY, key);
                back.add(spriteCr);
                spriteCr.anchor.set(0.51, 0.49);
                spriteCr.scale.set(0.38 * scale * codeArtStage.scaleAll, 0.38 * scale * codeArtStage.scaleAll);
                spriteCr.blendMode = blendMode;
                spriteCr.alpha = 0;
                let animateSprite = function (sprite, xer, yer, distance, turn, circle, offset) {
                    let appear = game.add.tween(sprite);
                    appear.to({alpha: alphaFinal}, 1503, null, null, delay);
                    appear.start();
                    if (turn) {
                        codeArtStage.animationLoops.turnRepeat(sprite, offset);
                    }
                    if (circle) {
                        codeArtStage.animationLoops.circlePointRepeat(sprite, xer, yer, distance, offset);
                    }
                }
                animateSprite(spriteCr, xer, yer, dist, turn, circle, offset);
            }

            var count = 0;

            let rightRound = function (dist, symet, count) {

                for (var i = 0, max = symet; i < max; i++) {

                    let an = ((Math.PI * 2) / max) * i;
                    let x = game.world.centerX + Math.sin(an) * dist * codeArtStage.scaleAll;
                    let y = game.world.centerY + Math.cos(an) * dist * codeArtStage.scaleAll;
                    let tempBmp;
                    if (Math.random() > 0.88) {
                        tempBmp = bmdCloud;
                    } else {
                        tempBmp = bmdCloudInvert;
                    }
                    newCirclerSprite(500, tempBmp, x, y, count * 2, Math.pow(0.62, count) * codeArtStage.scaleAll, Math.pow(1.62, count) * 1.62, false, true, i / 7, 0);
                }

            };
            //newCirclerSprite(game.world.centerX, game.world.centerY, 0, 0.9, 1);

            var slowLoop;
            let jbs = function () {
                console.log(count);

                //animated
                /**rightRound(50 * count, 7, count);
                 if (count == 3) {
                 game.time.events.remove(slowLoop);
                 newCirclerSprite(1000,'shine', game.world.centerX, game.world.centerY, 10, 0.7, 4, true, false, 1, 4);
                 newCirclerSprite(2000,'shine', game.world.centerX, game.world.centerY, 10, 0.5, 4, true, false, 1, 0);
                 }**/


                if (count < 5) {
                    var addPostionsForTria = function (stX, stY, rota, scaleA, pos, basicWidth, basicHeight) {
                        //middle left
                        let position1 = {};
                        position1.scale = scaleA * 0.62;
                        position1.x = stX + 0.38 * basicWidth * scaleA;
                        position1.y = stY + basicHeight * scaleA - basicHeight * scaleA * 0.62;
                        position1.rotation = rota;
                        pos.push(position1);

                        //lower right triang
                        let position = {};
                        position.scale = scaleA * 0.38;
                        position.x = stX;
                        position.y = stY + basicHeight * scaleA - scaleA * basicHeight * 0.38;
                        position.rotation = rota;
                        pos.push(position);

                        //middle small high
                        let position2 = {};
                        position2.scale = scaleA * 0.38;
                        position2.x = stX + basicWidth * scaleA * 0.38 * 0.38;
                        position2.y = stY + basicHeight * scaleA - (scaleA * basicHeight * 0.38) * 2;
                        position2.rotation = rota;
                        pos.push(position2);
                    };

                    var iteratingSubdivison = function (count, pos) {
                        var iX = pos.length;
                        for (var i = postionInDivArray, max = iX; i < max; i++) {
                            //paint
                            codeArtStage.tria.scale.set(pos[i].scale, pos[i].scale);
                            codeArtStage.tria.rotation = pos[i].rotation;
                            codeArtStage.backgroundBase.draw(codeArtStage.tria, pos[i].x, pos[i].y);
                            //reset
                            codeArtStage.tria.scale.set(1, 1);
                            codeArtStage.tria.rotation = 0;
                            //add new position
                            addPostionsForTria(pos[i].x, pos[i].y, pos[i].rotation, pos[i].scale, pos, 600, 386);
                            postionInDivArray++;
                        }
                    };

                    iteratingSubdivison(count, positionsSubDiv);
                }

                count++;

                //codeArtStage.backgroundBase.draw(codeArtStage.tria, 0, 0);
            };

            var postionInDivArray = 0;
            var positionsSubDiv = [{x: 0, y: 0, rotation: 0, scale: 1}];

            slowLoop = game.time.events.loop(Phaser.Timer.SECOND * 1, jbs, this);

        }

        function update() {
        }

    };
}
;
$('document').ready(function () {
    codeArtStage.init();
});
