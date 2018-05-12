var brColor = net.brehaut.Color;
if (typeof codeArtStage === 'undefined') {
    var codeArtStage = {};
    codeArtStage.farBack = null; //groups
    codeArtStage.back = null;
    codeArtStage.front = null;
    codeArtStage.scaleAll = 0.5; //general scale
    codeArtStage.baseSprite = null; //sprite
    codeArtStage.width = 800; //canvas dimensions
    codeArtStage.height = 600;
    codeArtStage.backgroundBase = null; //bmd
    codeArtStage.backgroundSprite = null; //sprite from backgroupbase bmd
    codeArtStage.cloudSpriteToDraw = null; //sprite of cloud
    codeArtStage.shineToDraw = null; //sprite of shine
    codeArtStage.triaSprite = null; //triangle sprite for iterating subdiv
    codeArtStage.bmdTria = null; //bitmapdata for triangle
    codeArtStage.triaHeight = 193; //triangle height, has to match the pngs dimensions
    codeArtStage.triaWidth = 300; //triangle width
    codeArtStage.triadColor = brColor("#6387AD"); //triands color "#6387AD" #D4AF37
    codeArtStage.currentColor = Phaser.Color.hexToColor("#6387AD");
    codeArtStage.bgColor = Phaser.Color.createColor(12, 11, 10);
    codeArtStage.aColor = Phaser.Color.hexToColor("#6387AD");
    codeArtStage.bColor = function () { //complementary color with phaser
        var tempCol = Phaser.Color.RGBtoHSL(codeArtStage.aColor.r, codeArtStage.aColor.g, codeArtStage.aColor.b);
        tempCol.h += 0.5;
        if (tempCol.h > 1) {
            tempCol.h -= 1;
        }
        tempCol = Phaser.Color.HSLtoRGB(tempCol.h, tempCol.s, tempCol.l);
        return tempCol;
    }();

    codeArtStage.animationLoops = {}; //group of animation looper functions, not an array of the functions
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

    codeArtStage.game = {}; //later game obejct, needs to be initialized here for phaserGameFunctions
    codeArtStage.phaserGameFunctions = {
        preload: function () {
            codeArtStage.game.load.image('circ', 'images/circ.jpg');
            codeArtStage.game.load.image('cloud', 'images/greencld.png');
            codeArtStage.game.load.image('shine', 'images/shine1.png');
            codeArtStage.game.load.image('tria', 'images/goldenTriaSmall.png');
            codeArtStage.game.stage.backgroundColor = codeArtStage.bgColor.color;
        },
        create: function () {
            //layers
            codeArtStage.farBack = codeArtStage.game.add.group();
            codeArtStage.back = codeArtStage.game.add.group();
            codeArtStage.front = codeArtStage.game.add.group();
            //bitmaps
            codeArtStage.backgroundBase = codeArtStage.game.make.bitmapData(codeArtStage.width, codeArtStage.height);
            codeArtStage.backgroundBase.rect(0, 0, codeArtStage.width, codeArtStage.height, "#c2e3f0");
            codeArtStage.backgroundSprite = codeArtStage.game.add.sprite(0, 0, codeArtStage.backgroundBase);
            codeArtStage.farBack.add(codeArtStage.backgroundSprite);
            //base in white
            var bmd = codeArtStage.game.make.bitmapData();
            bmd.load('circ');
            bmd.processPixelRGB(codeArtStage.pixelFilters.invert3, this);
            //base in black
            var bmdblc = codeArtStage.game.make.bitmapData();
            bmdblc.load('circ');
            bmdblc.processPixelRGB(codeArtStage.pixelFilters.toBgColorInvert3, this);
            //colorize cloud
            var bmdCloud = codeArtStage.game.make.bitmapData();
            bmdCloud.load('cloud');
            bmdCloud.processPixelRGB(codeArtStage.pixelFilters.toAColor, this);
            //cloud Sprite for drawing
            codeArtStage.cloudSpriteToDraw = codeArtStage.game.make.sprite(0, 0, bmdCloud);
            codeArtStage.cloudSpriteToDraw.anchor.set(0.5, 0.5);
            //inverted
            var bmdCloudInvert = codeArtStage.game.make.bitmapData();
            bmdCloudInvert.load('cloud');
            bmdCloudInvert.processPixelRGB(codeArtStage.pixelFilters.toBColor, this);
            //add base sprite
            codeArtStage.baseSprite = codeArtStage.game.add.sprite(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, bmdblc);
            var baseSprite = codeArtStage.baseSprite;
            baseSprite.anchor.set(0.5, 0.5);
            baseSprite.scale.set(codeArtStage.scaleAll, codeArtStage.scaleAll);
            codeArtStage.front.add(baseSprite);
            //bmd.addToWorld(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, 0.5, 0.5);
            //codeArtStage.baseSprite = codeArtStage.game.add.sprite(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, bmd);
            //shine sprite for drawing
            codeArtStage.shineToDraw = codeArtStage.game.make.sprite(0, 0, 'shine');
            codeArtStage.shineToDraw.anchor.set(0.5, 0.5);
            codeArtStage.wallpaperSubdivisionTriangle(codeArtStage.backgroundBase, 0, 0, false, false, ['multiply','soft-light']);
        },
        update: function () {
        }
    }; //game object

    /**
     * init the game 
     * @returns {undefined}
     */
    codeArtStage.init = function () {
        codeArtStage.game = new Phaser.Game(codeArtStage.width, codeArtStage.height, Phaser.CANVAS, '', codeArtStage.phaserGameFunctions);
    };

    codeArtStage.wallpaperSubdivisionTriangle = function (toDrawOn, hueJump, hueShift, sparks, acc, blendModes) {
        let xinit = -codeArtStage.triaWidth * 0.38;
        let yinit = 0;
        let xposi = xinit;
        let yposi = yinit;
        let flip = false;
        let a = function () {
            //codeArtStage.triadColor = codeArtStage.triadColor.shiftHue(hueJump);
            console.log("_-");
            flip = !flip;
            if (flip) {
                xposi += codeArtStage.triaWidth * 0.38;
            } else {
                xposi += codeArtStage.triaWidth * 0.62;
            }
            if (xposi > codeArtStage.width) {
                flip = false;
                xposi = xinit;
                yposi += codeArtStage.triaHeight;
            }
            if (yposi < codeArtStage.height) {
                codeArtStage.newSubdivisionTriangle(codeArtStage.game, xposi, yposi, flip, 1, 4, a, hueShift, sparks, acc, blendModes, toDrawOn);
            }
        };
        codeArtStage.newSubdivisionTriangle(codeArtStage.game, xposi, yposi, false, 1, 4, a, hueShift, sparks, acc, blendModes, toDrawOn);
    };

    /**
     * create subdivisons triangle
     * @param {type} game
     * @returns {undefined}
     */
    codeArtStage.newSubdivisionTriangle = function (game, xA, yA, flipped, scaleA, iterations, callback, hueShift, sparks, acc, blendModes, drawOn) {

        //triangle
        if (codeArtStage.bmdTria === null) {
            codeArtStage.bmdTria = game.make.bitmapData(codeArtStage.triaWidth, codeArtStage.triaHeight);
            codeArtStage.bmdTria.draw('tria', 0, 0);
        }

        //if basesprite should be included
        //codeArtStage.bmdTria.draw(baseSprite, 600*0.38, 386*0.62);
        //codeArtStage.bmdTria.draw('tria', 0, 0, null, null, 'destination-atop');
        if (codeArtStage.triaSprite === null) {
            codeArtStage.triaSprite = game.make.sprite(0, 0, codeArtStage.bmdTria);
        }

        let slowLoop;
        let count = 0;
        let addPostionsForTria = function (stX, stY, rota, scaleA, pos, basicWidth, basicHeight) {
            //middle left
            let position = {};
            position.scale = scaleA * 0.62;
            position.x = stX + 0.38 * basicWidth * scaleA;
            position.y = stY + basicHeight * scaleA - basicHeight * scaleA * 0.62;
            let rotatedXY = rotateXY(stX, stY, position.x, position.y, rota);
            position.x = rotatedXY[0];
            position.y = rotatedXY[1];
            position.rotation = rota;
            pos.push(position);
            //lower right triang
            position = {};
            position.scale = scaleA * 0.38;
            position.x = stX;
            position.y = stY + basicHeight * scaleA - scaleA * basicHeight * 0.38;
            rotatedXY = rotateXY(stX, stY, position.x, position.y, rota);
            position.x = rotatedXY[0];
            position.y = rotatedXY[1];
            position.rotation = rota;
            pos.push(position);
            //middle small high
            position = {};
            position.scale = scaleA * 0.38;
            position.x = stX + basicWidth * scaleA * 0.38 * 0.38;
            position.y = stY + basicHeight * scaleA - (scaleA * basicHeight * 0.38) * 2;
            rotatedXY = rotateXY(stX, stY, position.x, position.y, rota);
            position.x = rotatedXY[0];
            position.y = rotatedXY[1];
            position.rotation = rota;
            pos.push(position);
            //middle middle left rotated
            position = {};
            position.scale = scaleA * 0.38;
            position.x = stX + (basicWidth * scaleA * 0.38 * 0.38) + basicWidth * position.scale;
            position.y = stY + (basicHeight * scaleA - scaleA * basicHeight * 0.38) + basicHeight * position.scale;
            rotatedXY = rotateXY(stX, stY, position.x, position.y, rota);
            position.x = rotatedXY[0];
            position.y = rotatedXY[1];
            position.rotation = rota + Math.PI;
            pos.push(position);
        };
        let iteratingSubdivison = function (count, pos) {
            let iX = pos.length;
            for (var i = postionInDivArray, max = iX; i < max; i++) {
                //paint
                codeArtStage.triaSprite.scale.set(pos[i].scale, pos[i].scale);
                codeArtStage.triaSprite.rotation = pos[i].rotation;

                let blend;
                if (Math.random() > 0.8) {
                    blend = blendModes[0];
                } else {
                    blend = blendModes[1];
                }

                let col;
                if (!acc) {
                    codeArtStage.triadColor = codeArtStage.triadColor.shiftHue(i * hueShift);
                    col = codeArtStage.triadColor;
                } else {
                    col = codeArtStage.triadColor;
                    let cas = i % 3;
                    switch (cas) {
                        case 0:
                            break;
                        case 1:
                            col = col.shiftHue((360/12)*4);
                            break;
                        case 2:
                            col = col.shiftHue((360/12)*7);
                            break;
                    }
                }
                
                if (sparks) {
                    if (Math.random() > 0.98) {
                        col = brColor('#FFDF00');
                        blend = 'multiply';
                    }
                }
                codeArtStage.triaSprite.tint = Phaser.Color.hexToColor(col.toCSS()).color;
                if (Math.cos(pos[i].rotation) > 0) {
                    codeArtStage.triaSprite.tint = Phaser.Color.hexToColor(col.lightenByRatio(0.5).toCSS()).color;
                }
                drawOn.draw(codeArtStage.triaSprite, pos[i].x, pos[i].y, null, null, blend);
                //reset
                codeArtStage.triaSprite.scale.set(1, 1);
                codeArtStage.triaSprite.rotation = 0;
                //add new position
                addPostionsForTria(pos[i].x, pos[i].y, pos[i].rotation, pos[i].scale, pos, codeArtStage.triaWidth, codeArtStage.triaHeight);
                postionInDivArray++;
            }
        };
        let triangleTick = function () {
            if (count < iterations) {
                iteratingSubdivison(count, positionsSubDiv);
            } else {
                game.time.events.remove(slowLoop);
                if (callback instanceof Function) {
                    callback();
                }
            }
            count++;
        };
        let postionInDivArray = 0;
        if (flipped) {
            rotationA = Math.PI;
            xA += codeArtStage.triaWidth;
            yA += codeArtStage.triaHeight;
        } else {
            rotationA = 0;
        }
        let positionsSubDiv = [{x: xA, y: yA, rotation: rotationA, scale: scaleA}];
        slowLoop = game.time.events.loop(Phaser.Timer.SECOND * 0.1, triangleTick, this);
    };
}
;
$('document').ready(function () {
    codeArtStage.init();
});

/**
 * Rotate a point around a point, used by subdivisons triangle
 * @param {type} cx
 * @param {type} cy
 * @param {type} x
 * @param {type} y
 * @param {type} radiansA
 * @returns {Array}
 */
function rotateXY(cx, cy, x, y, radiansA) {
    var radians = radiansA,
            cos = Math.cos(radians),
            sin = Math.sin(radians),
            nx = (cos * (x - cx)) + (sin * (y - cy)) + cx,
            ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;
    return [nx, ny];
}

