var brColor = net.brehaut.Color;
if (typeof codeArtStage === 'undefined') {
    var codeArtStage = {};
    codeArtStage.colors = Phaser.Color.HSVColorWheel(0.2);
    codeArtStage.colorsFull = Phaser.Color.HSVColorWheel(0.7);
    codeArtStage.colorsCount = 0;
    codeArtStage.colorPositionTheme = 0;
    codeArtStage.count = 0;
    codeArtStage.farBack = null; //groups
    codeArtStage.back = null;
    codeArtStage.front = null;
    codeArtStage.scaleAll = 0.5; //general scale
    codeArtStage.baseSprite = null; //sprite
    codeArtStage.width = 800; //canvas dimensions
    codeArtStage.height = 300;

    //options
    codeArtStage.mouseOn = true;
    codeArtStage.mouseDistToMid = 0;
    codeArtStage.mouseAdjustTween = null;
    
    codeArtStage.paralaxxer = null;

    //tria sprites
    codeArtStage.baseSpriteX = null;
    codeArtStage.baseTriaA = null;
    codeArtStage.baseTriaB = null;
    codeArtStage.baseTriaC = null;

    //rain emitters 
    codeArtStage.mid_emitter = null;
    codeArtStage.back_emitter = null;
    //odd even count
    codeArtStage.pingCCount = 0;
    //groups and bgs
    codeArtStage.backgroundBase = null; //bmd
    codeArtStage.backgroundSprite = null; //sprite from backgroupbase bmd
    codeArtStage.backgroundBase2 = null; //bmd
    codeArtStage.backgroundSprite2 = null; //sprite from backgroupbase bmd
    codeArtStage.cloudSpriteToDraw = null; //sprite of cloud
    codeArtStage.shineToDraw = null; //sprite of shine
    codeArtStage.wrapperGroupA = null;
    codeArtStage.trias = null;
    codeArtStage.miniClouds = null;
    codeArtStage.cloudBgLowerShine = null;
    codeArtStage.paperA = null;
    codeArtStage.birdsGroup = null;
    //cloudsprites
    codeArtStage.sRe = null;
    codeArtStage.sBl = null;
    codeArtStage.sGr = null;
    codeArtStage.sGe = null;
    //cloudbg
    codeArtStage.cloudBg = null;
    codeArtStage.cloudBgLight = null;
    codeArtStage.cloudBgContast = null;
    //colors
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
        };
        repeat();
    };

    codeArtStage.game = {}; //later game obejct, needs to be initialized here for phaserGameFunctions
    codeArtStage.phaserGameFunctions = {
        preload: function () {

            codeArtStage.game.load.image('circ', 'images/circ.jpg');
            codeArtStage.game.load.image('triaV', 'images/trian.png');
            codeArtStage.game.load.image('cloud', 'images/greencld.png');
            codeArtStage.game.load.image('shine', 'images/shine1.png');
            codeArtStage.game.load.image('tria', 'images/goldenTria200x129.png');
            codeArtStage.game.load.image('re', 'images/strokeRed.png');
            codeArtStage.game.load.image('ge', 'images/strokeYellow.png');
            codeArtStage.game.load.image('bl', 'images/strokeBlue.png');
            codeArtStage.game.load.image('gr', 'images/strokeGreen.png');
            codeArtStage.game.load.image('cloudBg', 'images/soundPhase2.png');
            codeArtStage.game.load.image('cloudBgLight', 'images/light.png');
            codeArtStage.game.load.image('contrast', 'images/phaserBgContrast.png');
            codeArtStage.game.load.image('birdB', 'images/bird1.png');
            codeArtStage.game.load.image('birdW', 'images/bird2.png');
            codeArtStage.game.load.image('birdC', 'images/bird3.png');
            codeArtStage.game.load.image('rain', 'images/rain.png');
            codeArtStage.game.load.image('lowerShine', 'images/lowershineColor.png');
            codeArtStage.game.load.image('paper', 'images/paper.png');

            codeArtStage.game.load.audio('start', 'sounds/startoutAlltogethertrainmumble.mp3');

            codeArtStage.game.stage.backgroundColor = codeArtStage.bgColor.color;

        },
        create: function () {
            //pixelfilters
            pixelFiltersInit();
            //takt
            startOutSoundEb(codeArtStage.game);
            soundEb.addAndStartTaktTimer();

            //tria
            codeArtStage.baseTriaA = codeArtStage.game.add.sprite(0, 0, 'triaV');
            codeArtStage.baseTriaA.anchor.set(0.5, 0.6);
            codeArtStage.baseTriaB = codeArtStage.game.add.sprite(0, 0, 'triaV');
            codeArtStage.baseTriaB.anchor.set(0.5, 0.6);
            codeArtStage.baseTriaC = codeArtStage.game.add.sprite(0, 0, 'triaV');
            codeArtStage.baseTriaC.anchor.set(0.5, 0.6);
            codeArtStage.baseSpriteX = codeArtStage.game.add.sprite(0, 0);
            codeArtStage.baseSpriteX.anchor.set(0.5, 0.6);

            //paint clouds
            codeArtStage.sRe = codeArtStage.game.add.sprite(0, 0, 're');
            codeArtStage.sRe.anchor.set(0.5, 0.5);
            codeArtStage.sBl = codeArtStage.game.add.sprite(0, 0, 'bl');
            codeArtStage.sBl.anchor.set(0.5, 0.5);
            codeArtStage.sGr = codeArtStage.game.add.sprite(0, 0, 'gr');
            codeArtStage.sGr.anchor.set(0.5, 0.5);
            codeArtStage.sGe = codeArtStage.game.add.sprite(0, 0, 'ge');
            codeArtStage.sGe.anchor.set(0.5, 0.5);

            //cloud bg
            codeArtStage.cloudBg = codeArtStage.game.add.sprite(0, 0, 'cloudBg');
            codeArtStage.cloudBg.anchor.set(0, 0);
            codeArtStage.cloudBg.width = codeArtStage.width;
            codeArtStage.cloudBg.height = codeArtStage.height;
            codeArtStage.cloudBg.alpha = 0.5;
            codeArtStage.cloudBg.blendMode = 2;
            codeArtStage.cloudBgLight = codeArtStage.game.add.sprite(0, 0, 'cloudBgLight');
            codeArtStage.cloudBgLight.anchor.set(0, 0);
            codeArtStage.cloudBgLight.width = codeArtStage.width;
            codeArtStage.cloudBgLight.height = codeArtStage.height;
            codeArtStage.cloudBgLight.alpha = 1;
            codeArtStage.cloudBgContast = codeArtStage.game.add.sprite(0, 0, 'contrast');
            codeArtStage.cloudBgContast.anchor.set(0, 0);
            codeArtStage.cloudBgContast.width = codeArtStage.width;
            codeArtStage.cloudBgContast.height = codeArtStage.height;
            codeArtStage.cloudBgContast.alpha = 0.5;
            codeArtStage.cloudBgLowerShine = codeArtStage.game.add.sprite(0, 0, 'lowerShine');
            codeArtStage.cloudBgLowerShine.anchor.set(0, 0);
            codeArtStage.cloudBgLowerShine.alpha = 0.7;
            codeArtStage.cloudBgLowerShine.width = codeArtStage.width;
            codeArtStage.cloudBgLowerShine.height = codeArtStage.height;
            codeArtStage.paperA = codeArtStage.game.add.sprite(0, 0, 'paper');
            codeArtStage.paperA.blendMode = 4;
            codeArtStage.paperA.anchor.set(0, 0);
            codeArtStage.paperA.width = codeArtStage.width;
            codeArtStage.paperA.height = codeArtStage.height;
            codeArtStage.paperA.alpha = 0;

            //layers
            codeArtStage.wrapperGroupA = codeArtStage.game.add.group();
            codeArtStage.farBack = codeArtStage.game.add.group();
            codeArtStage.clds = codeArtStage.game.add.group();
            codeArtStage.back = codeArtStage.game.add.group();
            codeArtStage.trias = codeArtStage.game.add.group();
            codeArtStage.front = codeArtStage.game.add.group();
            codeArtStage.birdsGroup = codeArtStage.game.add.group();
            codeArtStage.miniClouds = codeArtStage.game.add.group();
            codeArtStage.wrapperGroupA.add(codeArtStage.farBack);
            codeArtStage.wrapperGroupA.add(codeArtStage.clds);
            codeArtStage.wrapperGroupA.add(codeArtStage.trias);
            codeArtStage.wrapperGroupA.add(codeArtStage.back);
            codeArtStage.wrapperGroupA.add(codeArtStage.front);
            codeArtStage.wrapperGroupA.add(codeArtStage.miniClouds);
            codeArtStage.wrapperGroupA.add(codeArtStage.cloudBgLowerShine);
            codeArtStage.wrapperGroupA.add(codeArtStage.birdsGroup);
            codeArtStage.wrapperGroupA.add(codeArtStage.paperA);

            //add clouds to layers
            codeArtStage.clds.add(codeArtStage.sRe);
            codeArtStage.clds.add(codeArtStage.sBl);
            codeArtStage.clds.add(codeArtStage.sGr);
            codeArtStage.clds.add(codeArtStage.sGe);
            //add bg
            codeArtStage.back.add(codeArtStage.cloudBg);
            codeArtStage.back.add(codeArtStage.cloudBgLight);
            codeArtStage.back.add(codeArtStage.cloudBgContast);
            //add trias
            codeArtStage.trias.add(codeArtStage.baseSpriteX);
            codeArtStage.baseSpriteX.addChild(codeArtStage.baseTriaA);
            codeArtStage.baseSpriteX.addChild(codeArtStage.baseTriaB);
            codeArtStage.baseSpriteX.addChild(codeArtStage.baseTriaC);

            //bitmaps
            codeArtStage.backgroundBase = codeArtStage.game.make.bitmapData(codeArtStage.width, codeArtStage.height);
            codeArtStage.backgroundBase.rect(0, 0, codeArtStage.width, codeArtStage.height, "#c2e3f0");
            codeArtStage.backgroundSprite = codeArtStage.game.add.sprite(0, 0, codeArtStage.backgroundBase);
            codeArtStage.farBack.add(codeArtStage.backgroundSprite);
            //bitmaps
            codeArtStage.backgroundBase2 = codeArtStage.game.make.bitmapData(codeArtStage.width, codeArtStage.height);
            codeArtStage.backgroundBase2.rect(0, 0, codeArtStage.width, codeArtStage.height, '#00000000');
            codeArtStage.backgroundSprite2 = codeArtStage.game.add.sprite(codeArtStage.width / 2, codeArtStage.height / 2, codeArtStage.backgroundBase2);
            codeArtStage.back.add(codeArtStage.backgroundSprite2);
            codeArtStage.backgroundSprite2.anchor.set(0.5, 0.5);

            codeArtStage.shineToDraw = codeArtStage.game.make.sprite(0, 0, 'shine');
            codeArtStage.shineToDraw.anchor.set(0.5, 0.5);

            codeArtStage.startBeats();

            initWhirl(codeArtStage.game);
            whirl.onCreate();

            codeArtStage.initBirds();
            
            codeArtStage.paralaxxer = new paralaxxer(codeArtStage.game,['re','bl','gr'],1.2);

            if (codeArtStage.mouseOn) {
                codeArtStage.game.input.addMoveCallback(function (pointer, x, y) {
                    var distX = Math.abs(x - (codeArtStage.width / 2));
                    var distY = Math.abs(y - (codeArtStage.height / 2));
                });
            }

            codeArtStage.game.onPause.add(
                    function () {
                        soundEb.taktTimer.pause();
                        codeArtStage.game.sound.pauseAll();
                    }
            );

            codeArtStage.game.onResume.add(
                    function () {
                        soundEb.taktTimer.resume();
                        codeArtStage.game.sound.resumeAll();
                    }
            );

        },
        update: function () {

            if (whirl != null) {
                whirl.onUpdate();
            }
        }
    };

    /**
     * init the game 
     * @returns {undefined}
     */
    codeArtStage.init = function () {
        codeArtStage.game = new Phaser.Game(codeArtStage.width, codeArtStage.height, Phaser.CANVAS, 'content', codeArtStage.phaserGameFunctions);
    };

    codeArtStage.startBeats = function () {
    };

    codeArtStage.ticker = function () {
        var wander = codeArtStage.game.add.tween(codeArtStage.planetClock);
        wander.to({
            angle: codeArtStage.planetClock.angle + 360 / 60
        },
                100,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
    };

    codeArtStage.initBirds = function () {

        codeArtStage.birds = codeArtStage.game.add.sprite(codeArtStage.game.width * 0.62, codeArtStage.game.height * 0.22);
        codeArtStage.birds.anchor.set(0.5, 0.5);
        codeArtStage.birdWhite = codeArtStage.game.add.sprite(-20, -20, 'birdW');
        codeArtStage.birdWhite.anchor.set(0.5, 0.5);
        codeArtStage.birdBlack = codeArtStage.game.add.sprite(20, -22, 'birdB');
        codeArtStage.birdBlack.anchor.set(0.5, 0.5);
        codeArtStage.birdCol = codeArtStage.game.add.sprite(2, -2, 'birdC');
        codeArtStage.birdCol.anchor.set(0.5, 0.5);

        codeArtStage.birds.addChild(codeArtStage.birdWhite);
        codeArtStage.birds.addChild(codeArtStage.birdBlack);
        codeArtStage.birds.addChild(codeArtStage.birdCol);
        codeArtStage.birdsGroup.add(codeArtStage.birds);

        var addFloating = function (sprite, wobble, timer) {
            var wander = codeArtStage.game.add.tween(sprite.anchor);
            var wobblePower = wobble;
            wander.to({
                y: [1.7 + (Math.random() * wobblePower - wobblePower / 2), 1.7 + (Math.random() * wobblePower - wobblePower / 2), 0.5 + (Math.random() * wobblePower - wobblePower / 2), 1 + (Math.random() * wobblePower - wobblePower / 2), 0.5],
                x: [0 + +(Math.random() * wobblePower - wobblePower / 2), 0.5 + (Math.random() * wobblePower - wobblePower / 2), 1 + (Math.random() * wobblePower - wobblePower / 2), 0.5 + (Math.random() * wobblePower - wobblePower / 2), 0.5],
            },
                    soundEb.takt * 4,
                    Phaser.Easing.Sinusoidal.InOut,
                    true,
                    0,
                    0,
                    ).loop(true);
            wander.interpolation(Phaser.Math.bezierInterpolation);
            var wander = codeArtStage.game.add.tween(sprite);
            var wobblePower = 2;
            wander.to({
                angle: [0, 15 + Math.random() * 10, 0, -15 + Math.random() * -10, 0]
            },
                    soundEb.takt * timer,
                    Phaser.Easing.Sinusoidal.InOut,
                    true,
                    0,
                    0,
                    ).loop(true);
        };
        addFloating(codeArtStage.birdWhite, 2, 4);
        addFloating(codeArtStage.birdBlack, 1.7, 8);
        addFloating(codeArtStage.birdCol, 3, 6);

        var hoverBird = function (sp) {
            if (sp.jump == null) {
                sp.jump = {};
                sp.jump = codeArtStage.game.add.tween(sp);
                sp.jump.to({
                    x: Math.random() * 120 - 60,
                    y: Math.random() * 120 - 60
                },
                        soundEb.takt,
                        "Sine.easeOut"
                        );
                sp.jump.start();
                var ri = function () {
                    sp.jump = null;
                };
                sp.jump.yoyo(true);
                sp.jump.onComplete.add(ri);
            }
            if (sp.parent.jump == null) {
                sp.parent.jump = {};
                sp.parent.jump = codeArtStage.game.add.tween(sp.parent);
                sp.parent.jump.to({
                    x: sp.parent.x + Math.random() * 120 - 60,
                    y: sp.parent.y + Math.random() * 120 - 60
                },
                        soundEb.takt,
                        "Sine.easeOut"
                        );
                sp.parent.jump.start();
                var ri = function () {
                    sp.parent.jump = null;
                };
                sp.parent.jump.onComplete.add(ri);
                var blendMode = 'normal';
                codeArtStage.backgroundBase.drawGroup(codeArtStage.birdsGroup, blendMode, true);
            }
        };
        codeArtStage.birdWhite.inputEnabled = true;
        codeArtStage.birdWhite.events.onInputOver.add(hoverBird, this);
        codeArtStage.birdBlack.inputEnabled = true;
        codeArtStage.birdBlack.events.onInputOver.add(hoverBird, this);
        codeArtStage.birdCol.inputEnabled = true;
        codeArtStage.birdCol.events.onInputOver.add(hoverBird, this);
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

function randomBlendModeDraw() {
    var rand = Math.floor(Math.random() * 2.99);
    var blend = 'normal'
    switch (rand) {
        case 0:
            blend = 'normal';
            break;
        case 1:
            blend = 'overlay';
            break;
        case 2:
            blend = 'multiply';
            break;
    }
    return blend;
}

function distanceSq(ox, oy, tx, ty) {
    var xDif = ox - tx;
    var yDif = oy - ty;
    return (xDif * xDif) + (yDif * yDif);
}
;

function negOrPos(num) {
    if (num >= 0) {
        return 1;
    } else {
        return -1;
    }
}
;



