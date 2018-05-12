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
    codeArtStage.height = 600;
    //options
    codeArtStage.mouseOn = true;
    codeArtStage.mouseDistToMid = 0;
    codeArtStage.mouseAdjustTween = null;
    //tria sprites
    codeArtStage.baseSpriteX = null;
    codeArtStage.baseTriaA = null;
    codeArtStage.baseTriaB = null;
    codeArtStage.baseTriaC = null;
    //planet sprites
    codeArtStage.planetWrapper = null;
    codeArtStage.planetBack = null;
    codeArtStage.planetShade = null;
    codeArtStage.planetClock = null;
    codeArtStage.planetClockZeiger = null;
    codeArtStage.planetTrain = null;
    codeArtStage.planetTrainWagon = null;
    codeArtStage.planetTrainWrapper = null;
    codeArtStage.planetTrainCloud = null;
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
    //sounds
    codeArtStage.soundProgressions = {};
    codeArtStage.tickTock = null;
    codeArtStage.melodyStart = null;
    codeArtStage.melodyStart2 = null;
    codeArtStage.harmony = null;
    codeArtStage.harmony2 = null;
    codeArtStage.melodyBridge = null;
    codeArtStage.harmonyBridge = null;
    codeArtStage.harmonyVariant = null;
    codeArtStage.melodyBridgeLower = null;
    codeArtStage.refrain = null;
    codeArtStage.refrain2 = null;
    codeArtStage.riff = null;
    codeArtStage.piano5 = null;
    codeArtStage.volumeMulipl = 1;
    codeArtStage.volumeMelodyMultipl = 0.7;
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
            codeArtStage.game.load.image('planetBack', 'images/planetBack.png');
            codeArtStage.game.load.image('planetShade', 'images/planetShade.png');
            codeArtStage.game.load.image('planetClock', 'images/planetClock.png');
            codeArtStage.game.load.image('planetClockZeiger', 'images/planetClockZeiger.png');
            codeArtStage.game.load.image('planetTrain', 'images/planetTrain.png');
            codeArtStage.game.load.image('planetTrainWagon', 'images/planetTrainWagon.png');
            codeArtStage.game.load.image('miniCloud', 'images/miniCloud.png');
            codeArtStage.game.load.image('contrast', 'images/phaserBgContrast.png');
            codeArtStage.game.load.image('birdB', 'images/bird1.png');
            codeArtStage.game.load.image('birdW', 'images/bird2.png');
            codeArtStage.game.load.image('birdC', 'images/bird3.png');
            codeArtStage.game.load.image('rain', 'images/rain.png');
            codeArtStage.game.load.image('lowerShine', 'images/lowershineColor.png');
            codeArtStage.game.load.image('paper', 'images/paper.png');

            /*
             codeArtStage.game.load.audio('tickTock', 'sounds/causeyouwill-ticktock.mp3');
             codeArtStage.game.load.audio('harmony', 'sounds/causeyouwill-startHarmonySmooth.mp3');
             codeArtStage.game.load.audio('harmony2', 'sounds/causeyouwill-harmonyPianoSmooth.mp3');
             codeArtStage.game.load.audio('melodyStart2', 'sounds/causeyouwill-melodyStartSmoother2.mp3');
             codeArtStage.game.load.audio('melodyStart', 'sounds/causeyouwill-melodystart.mp3');
             codeArtStage.game.load.audio('melodyBridge', 'sounds/causeyouwill-melodyBridgeSmoother2.mp3');
             codeArtStage.game.load.audio('melodyBridgeLower', 'sounds/causeyouwill-melodyBridgeLow.mp3');
             codeArtStage.game.load.audio('harmonyVariant', 'sounds/causeyouwill-alternativeHarmonySmooth.mp3');
             codeArtStage.game.load.audio('harmonyBridge', 'sounds/causeyouwill-bridgeHarmonySmooth.mp3');
             codeArtStage.game.load.audio('refrain', 'sounds/causeyouwill-refrainWideSmooth.mp3');
             codeArtStage.game.load.audio('refrain2', 'sounds/causeyouwill-refrainSmoother2.mp3');
             */

            codeArtStage.game.load.audio('riff', 'sounds/causeyouwill-interAcc.mp3');
            codeArtStage.game.load.audio('piano5', 'sounds/causeyouwill-pianao5er.mp3');
            codeArtStage.game.load.audio('refrain', 'sounds/startoutAlltogethertrainmumbleRefrain.mp3');
            codeArtStage.game.load.audio('start', 'sounds/startoutAlltogethertrainmumble.mp3');
            codeArtStage.game.load.audio('bridge', 'sounds/startoutAlltogethertrainmumbleBridge.mp3');
            codeArtStage.game.load.audio('harmonyVariant', 'sounds/startoutAlltogethertrainmumbleAlternativeHarmony.mp3');
            codeArtStage.game.load.audio('harmonyVariant2', 'sounds/startoutAlltogethertrainmumbleAlternativeHarmonyAMelo.mp3');

            //variant
            /*
             codeArtStage.game.load.audio('tickTock', 'sounds/causeyouwill-ticktock.mp3');
             codeArtStage.game.load.audio('harmony', 'sounds/causeyouwill-accords-01.mp3');
             codeArtStage.game.load.audio('melodyStart', 'sounds/causeyouwill-melodyAnfang.mp3');
             codeArtStage.game.load.audio('melodyBridge', 'sounds/causeyouwill-melodyBridge.mp3');
             codeArtStage.game.load.audio('melodyBridgeLower', 'sounds/causeyouwill-melodyBridgeLow.mp3');
             codeArtStage.game.load.audio('harmonyVariant', 'sounds/causeyouwill-harmonyVariant.mp3');
             codeArtStage.game.load.audio('harmonyBridge', 'sounds/causeyouwill-harmonyBridge.mp3');
             codeArtStage.game.load.audio('refrain', 'sounds/causeyouwill-refrainPaced.mp3');
             codeArtStage.game.load.audio('riff', 'sounds/causeyouwill-riff.mp3');
             */
            codeArtStage.game.stage.backgroundColor = codeArtStage.bgColor.color;

            //keep playing
            //codeArtStage.game.stage.disableVisibilityChange = true;
        },
        create: function () {
            codeArtStageInitSoundProgressions();
            //sounds
            codeArtStage.melodyStart = codeArtStage.game.add.audio('start');
            codeArtStage.melodyStart.allowMultiple = true;
            codeArtStage.bridge = codeArtStage.game.add.audio('bridge');
            codeArtStage.bridge.allowMultiple = true;
            codeArtStage.harmonyVariant = codeArtStage.game.add.audio('harmonyVariant');
            codeArtStage.harmonyVariant.allowMultiple = false;
            codeArtStage.harmonyVariant2 = codeArtStage.game.add.audio('harmonyVariant2');
            codeArtStage.harmonyVariant2.allowMultiple = false;
            codeArtStage.refrain = codeArtStage.game.add.audio('refrain');
            codeArtStage.refrain2 = codeArtStage.game.add.audio('refrain2');
            codeArtStage.refrain.allowMultiple = true;
            codeArtStage.refrain2.allowMultiple = true;
            codeArtStage.riff = codeArtStage.game.add.audio('riff');
            codeArtStage.riff.allowMultiple = true;
            codeArtStage.piano5 = codeArtStage.game.add.audio('piano5');
            codeArtStage.piano5.allowMultiple = true;

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
            codeArtStage.cloudBg.alpha = 0.5;
            codeArtStage.cloudBg.blendMode = 2;
            codeArtStage.cloudBgLight = codeArtStage.game.add.sprite(0, 0, 'cloudBgLight');
            codeArtStage.cloudBgLight.anchor.set(0, 0);
            codeArtStage.cloudBgLight.alpha = 1;
            codeArtStage.cloudBgContast = codeArtStage.game.add.sprite(0, 0, 'contrast');
            codeArtStage.cloudBgContast.anchor.set(0, 0);
            codeArtStage.cloudBgContast.alpha = 0.5;
            codeArtStage.cloudBgLowerShine = codeArtStage.game.add.sprite(0, 0, 'lowerShine');
            codeArtStage.cloudBgLowerShine.anchor.set(0, 0);
            codeArtStage.cloudBgLowerShine.alpha = 0.7;
            codeArtStage.paperA = codeArtStage.game.add.sprite(0, 0, 'paper');
            codeArtStage.paperA.blendMode = 4;
            codeArtStage.paperA.anchor.set(0, 0);
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


            //planet
            codeArtStage.initPlanet();

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
            codeArtStage.positionTrias(120);

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
            //base in white
            /**
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
             //base sprite3
             codeArtStage.baseSprite2 = codeArtStage.game.add.sprite(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, bmdblc);
             var baseSprite = codeArtStage.baseSprite2;
             baseSprite.anchor.set(0.5, 0.5);
             baseSprite.scale.set(codeArtStage.scaleAll * 1.62, codeArtStage.scaleAll * 1.62);
             codeArtStage.front.add(baseSprite);
             //base sprite2
             codeArtStage.baseSprite1 = codeArtStage.game.add.sprite(codeArtStage.baseSprite2.width * 0.48, codeArtStage.baseSprite2.height * 0.287, bmdblc);
             var baseSprite = codeArtStage.baseSprite1;
             baseSprite.anchor.set(0.5, 0.5);
             baseSprite.scale.set(codeArtStage.scaleAll * 1.38, codeArtStage.scaleAll * 1.38);
             codeArtStage.baseSprite2.addChild(baseSprite);
             //add base sprite
             codeArtStage.baseSprite = codeArtStage.game.add.sprite(codeArtStage.game.width, codeArtStage.game.world.height, bmdblc);
             var baseSprite = codeArtStage.baseSprite;
             baseSprite.anchor.set(0.5, 0.5);
             baseSprite.scale.set(codeArtStage.scaleAll, codeArtStage.scaleAll);
             codeArtStage.front.add(baseSprite);
             **/
            //bmd.addToWorld(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, 0.5, 0.5);
            //codeArtStage.baseSprite = codeArtStage.game.add.sprite(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, bmd);
            //shine sprite for drawing
            codeArtStage.shineToDraw = codeArtStage.game.make.sprite(0, 0, 'shine');
            codeArtStage.shineToDraw.anchor.set(0.5, 0.5);

            //subDivsionTriangleInit();
            codeArtStage.startBeats();

            initWhirl(codeArtStage.game);
            whirl.onCreate();

            codeArtStage.initBirds();

            //ctEmitter.start(codeArtStage.game, 'shine', codeArtStage.back);

            codeArtStage.soundProgressions.lowerShineColorsStart();

            codeArtStage.blinkCloudLight();
            codeArtStage.soundProgressions.startTrain();

            if (codeArtStage.mouseOn) {
                codeArtStage.game.input.addMoveCallback(function (pointer, x, y) {
                    var distX = Math.abs(x - (codeArtStage.width / 2));
                    var distY = Math.abs(y - (codeArtStage.height / 2));
                    codeArtStage.mouseDistToMid = distX + distY;
                    codeArtStage.planetBack.tint = codeArtStage.colors[(Math.floor(codeArtStage.mouseDistToMid / 3) % 359)].color;
                    if (codeArtStage.mouseAdjustTween != null) {
                        codeArtStage.mouseAdjustTween.stop();
                    }
                    codeArtStage.mouseAdjustTween = codeArtStage.game.add.tween(codeArtStage.planetBack);
                    codeArtStage.mouseAdjustTween.to({
                    },
                            100,
                            Phaser.Easing.Sinusoidal.InOut);
                    codeArtStage.mouseAdjustTween.start();
                });
            }


            /*this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
             this.enterKey.onDown.add(function () {
             soundEb.enterRythmPress();
             }, this);*/

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
    }; //game object

    /**
     * init the game 
     * @returns {undefined}
     */
    codeArtStage.init = function () {
        codeArtStage.game = new Phaser.Game(codeArtStage.width, codeArtStage.height, Phaser.CANVAS, 'content', codeArtStage.phaserGameFunctions);
    };

    codeArtStage.startBeats = function () {
        codeArtStage.soundProgressions.startOut.start();
        //codeArtStage.soundProgressions.randomProgression();
    };

    codeArtStage.ticker = function () {
        var wander = codeArtStage.game.add.tween(codeArtStage.planetClock);
        wander.to({
            angle: codeArtStage.planetClock.angle + 360 / 60
        },
                100,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
        //codeArtStage.soundProgressions.newTrainCloud();
    };

    codeArtStage.pingTriaWrap = function (sprite) {
        codeArtStage.count++;
        var wander = codeArtStage.game.add.tween(sprite);
        wander.to({
            angle: sprite.angle - 7
        },
                soundEb.takt / 4,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();

        var blendMode = 'normal';
        var drawSprite = codeArtStage.trias;
        codeArtStage.backgroundBase.drawGroup(drawSprite, blendMode, true);
        if (codeArtStage.back_emitter != null && codeArtStage.mid_emitter != null) {
            codeArtStage.backgroundBase.drawGroup(codeArtStage.back_emitter, blendMode, true);
            codeArtStage.backgroundBase.drawGroup(codeArtStage.mid_emitter, blendMode, true);
        }
        var blendMode = 'overlay';
        var drawSprite = codeArtStage.miniClouds;
        codeArtStage.backgroundBase.drawGroup(drawSprite, blendMode, true);
        codeArtStage.colorsCount += 2;
        codeArtStage.colorsCount = codeArtStage.colorsCount % 360;
        var color = codeArtStage.colors[codeArtStage.colorsCount].color;
        codeArtStage.baseTriaA.tint = color;
        codeArtStage.baseTriaB.tint = color;
        codeArtStage.baseTriaC.tint = color;
    };

    codeArtStage.pingA = function (sprite) {
        var wander = codeArtStage.game.add.tween(sprite);
        var distX = sprite.x * 0.05;
        var distY = sprite.y * 0.05;
        wander.to({
            x: sprite.x + distX,
            y: sprite.y + distY,
            angle: sprite.angle + 360 * 0.62 * 0.62 * 0.62 * 0.62 * 0.62
        },
                soundEb.takt,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
    };

    codeArtStage.pingB = function (sprite) {
        var wander = codeArtStage.game.add.tween(sprite);
        var distX = sprite.x * 0.05;
        var distY = sprite.y * 0.05;
        wander.to({
            x: sprite.x - distX,
            y: sprite.y - distY,
            angle: sprite.angle - 360 * 0.62 * 0.62 * 0.62 * 0.62 * 0.62
        },
                soundEb.takt,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
    };

    codeArtStage.pingC = function (sprite) {
        var wander = codeArtStage.game.add.tween(sprite.anchor);
        var xa = Math.cos(codeArtStage.game.time.totalElapsedSeconds() / 4) / 7;
        var ya = Math.sin(codeArtStage.game.time.totalElapsedSeconds() / 4) / 7;
        wander.to({
            x: xa,
            y: ya
        },
                soundEb.takt,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
    };

    codeArtStage.soundStart = function (num) {
        var toPlay;
        switch (num) {
            default:
                toPlay = codeArtStage.melodyStart;
        }
        console.log("melodyStart");
        var curr = toPlay.currentTime / 1000;
        var all = toPlay.totalDuration;
        toPlay.volume = 1 * codeArtStage.volumeMulipl * codeArtStage.volumeMelodyMultipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            toPlay.play();
        } else if (percent > 0.1) {
            toPlay.play();
        }
    };

    codeArtStage.soundBridge = function () {
        console.log("Bridge");
        var curr = codeArtStage.bridge.currentTime / 1000;
        var all = codeArtStage.bridge.totalDuration;
        codeArtStage.bridge.volume = 0.7 * codeArtStage.volumeMulipl * codeArtStage.volumeMelodyMultipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.bridge.play();
        } else if (percent > 0.1) {
            codeArtStage.bridge.play();
        }
    };

    codeArtStage.soundPiano5 = function () {
        console.log("Piano5");
        var curr = codeArtStage.piano5.currentTime / 1000;
        var all = codeArtStage.piano5.totalDuration;
        codeArtStage.piano5.volume = 0.4 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.piano5.play();
        } else if (percent > 0.1) {
            codeArtStage.piano5.play();
        }
    };

    codeArtStage.soundRiff = function () {
        console.log("riff");
        var curr = codeArtStage.riff.currentTime / 1000;
        var all = codeArtStage.riff.totalDuration;
        codeArtStage.riff.volume = 0.4 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.riff.play();
        } else if (percent > 0.1) {
            codeArtStage.riff.play();
        }
    };

    codeArtStage.soundHarmonyVariant = function () {
        console.log("VariantHarmony");
        var curr = codeArtStage.harmonyVariant.currentTime / 1000;
        var all = codeArtStage.harmonyVariant.totalDuration;
        codeArtStage.harmonyVariant.volume = 1 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.harmonyVariant.play();
        } else if (percent > 0.1) {
            codeArtStage.harmonyVariant.play();
        }
    };

    codeArtStage.soundHarmonyVariant2 = function () {
        console.log("VariantHarmony");
        var curr = codeArtStage.harmonyVariant2.currentTime / 1000;
        var all = codeArtStage.harmonyVariant2.totalDuration;
        codeArtStage.harmonyVariant2.volume = 1 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.harmonyVariant2.play();
        } else if (percent > 0.1) {
            codeArtStage.harmonyVariant2.play();
        }
    };

    codeArtStage.soundRefrain = function (num) {
        var toPlay;
        var vol;
        switch (num) {
            default:
                vol = 1;
                toPlay = codeArtStage.refrain;
        }

        console.log("refrain");
        var curr = toPlay.currentTime / 1000;
        var all = toPlay.totalDuration;
        toPlay.volume = 0.7 * codeArtStage.volumeMulipl * vol;
        var percent = curr / all;
        if (!percent || percent == 0) {
            toPlay.play();
        } else if (percent > 0.1) {
            toPlay.play();
        }
    };

    codeArtStage.draw1 = function () {
        var drawSprite = codeArtStage.sGe;
        var rand = Math.floor(Math.random() * 3.9999) + 1;
        switch (rand) {
            case 1:
                drawSprite = codeArtStage.sGe;
                break;
            case 2:
                drawSprite = codeArtStage.sGr;
                break;
            case 3:
                drawSprite = codeArtStage.sBl;
                break;
            case 4:
                if (Math.random() < 0.5) {
                    drawSprite = codeArtStage.sRe;
                }
                break;
        }

        if (Math.random() > 0.62) {
            drawSprite.scale.set(0.62, 0.62);
        } else {
            drawSprite.scale.set(1, 1);
        }

        var blendUp = function () {
            var tw2 = codeArtStage.game.add.tween(drawSprite).to({alpha: alphaV}, 200);
            tw2.start();
            tw2.onComplete.add(function () {
                codeArtStage.backgroundBase.draw(drawSprite, drawSprite.x, drawSprite.y, null, null, blendMode);
                drawSprite.alpha = 0;
            }, this);
        };
        var xV = Math.random() * (codeArtStage.game.width + 40) - 20;
        var yV = Math.random() * (codeArtStage.game.height + 40) - 20;
        var distFromMiddle01 = distanceSq(xV, yV, codeArtStage.game.width / 2, codeArtStage.game.height / 2) / 250000;
        var alphaV = distFromMiddle01 + 0.1;
        var blendMode = 'normal';
        var rand = Math.random();
        if (distFromMiddle01 < 0.13) {
            if (Math.random() * 1 > 0.5) {
                blendMode = 'overlay';
            }
        } else if (distFromMiddle01 > 0.3) {
            if (Math.random() * 1 > 0.5) {
                blendMode = 'multiply';
            }
        }
        drawSprite.alpha = 0;
        drawSprite.x = xV;
        drawSprite.y = yV;
        blendUp();
    };

    codeArtStage.ping2 = function () {
        var sprite = codeArtStage.baseSprite2;
        var wander = codeArtStage.game.add.tween(sprite);
        wander.to({
            angle: codeArtStage.baseSprite2.angle + 360 * 0.62 * 0.62 * 0.62 * 0.62 * 0.62
        },
                100,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
    };

    codeArtStage.positionTrias = function (dist) {
        var distMid = dist;
        codeArtStage.baseSpriteX.x = codeArtStage.width / 2;
        codeArtStage.baseSpriteX.y = codeArtStage.height / 2;
        codeArtStage.baseTriaA.x = 0;
        codeArtStage.baseTriaA.y = distMid * -1;
        var pointNext = rotateXY(0, 0, codeArtStage.baseTriaA.x, codeArtStage.baseTriaA.y, (Math.PI * 2) / 3);
        codeArtStage.baseTriaB.x = pointNext[0];
        codeArtStage.baseTriaB.y = pointNext[1];
        var pointNext = rotateXY(0, 0, codeArtStage.baseTriaA.x, codeArtStage.baseTriaA.y, ((Math.PI * 2) / 3) * 2);
        codeArtStage.baseTriaC.x = pointNext[0];
        codeArtStage.baseTriaC.y = pointNext[1];
        var color = codeArtStage.colors[codeArtStage.colorsCount].color;
        codeArtStage.baseTriaA.tint = color;
        codeArtStage.baseTriaB.tint = color;
        codeArtStage.baseTriaC.tint = color;

        codeArtStage.baseTriaA.anchor.set(0.5, 0.6);

        codeArtStage.baseTriaB.anchor.set(0.5, 0.6);

        codeArtStage.baseTriaC.anchor.set(0.5, 0.6);

        codeArtStage.baseSpriteX.anchor.set(0.5, 0.6);
    };

    codeArtStage.movements = {};
    codeArtStage.movements.startSp = function () {
        soundEb.newBeatObject([0, 1, 1, 1], [codeArtStage.baseSpriteX], codeArtStage.pingTriaWrap);
        /* var a = function () {
         soundEb.newBeatObject([0, 2], [codeArtStage.trias], codeArtStage.ping);
         };
         soundEb.addEventAtTakt(4 * 2, a, this);*/
        var a = function () {
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaA], codeArtStage.pingA);
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaB], codeArtStage.pingA);
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaC], codeArtStage.pingA);
        };
        soundEb.addEventAtTakt(0, a, this);
    };
    codeArtStage.movements.startSp2 = function () {
        soundEb.newBeatObject([0, 1, 1, 1], [codeArtStage.baseSpriteX], codeArtStage.pingTriaWrap);
        /* var a = function () {
         soundEb.newBeatObject([0, 2], [codeArtStage.trias], codeArtStage.ping);
         };
         soundEb.addEventAtTakt(4 * 2, a, this);*/
        var a = function () {
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaA], codeArtStage.pingB);
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaB], codeArtStage.pingB);
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaC], codeArtStage.pingB);
        };
        soundEb.addEventAtTakt(0, a, this);
    };
    codeArtStage.movements.startSp3 = function () {
        soundEb.newBeatObject([0, 1, 1, 1], [codeArtStage.baseSpriteX], codeArtStage.pingTriaWrap);
        /* var a = function () {
         soundEb.newBeatObject([0, 2], [codeArtStage.trias], codeArtStage.ping);
         };
         soundEb.addEventAtTakt(4 * 2, a, this);*/
        var a = function () {
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaA], codeArtStage.pingC);
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaB], codeArtStage.pingC);
            soundEb.newBeatObject([0, 2], [codeArtStage.baseTriaC], codeArtStage.pingC);
        };
        soundEb.addEventAtTakt(0, a, this);
    };
    codeArtStage.movements.randomMovement = function () {
        codeArtStage.positionTrias(Math.random() * 100 + 100);
        var rand = Math.floor(Math.random() * 2.8);

        switch (rand) {
            case 0:
                codeArtStage.movements.startSp();
                break;
            case 1:
                codeArtStage.movements.startSp2();
                break;
            case 2:
                codeArtStage.movements.startSp3();
                break;
        }
    };
    codeArtStage.blinkCloudLight = function (sprite) {
        var wander = codeArtStage.game.add.tween(codeArtStage.cloudBgLight);
        wander.to({
            alpha: 0.1
        },
                soundEb.takt * 4 + Math.random() * 500,
                Phaser.Easing.Sinusoidal.InOut);
        wander.delay(soundEb.takt * 4);
        wander.start();
        wander.onComplete.add(function () {

            var wanderb = codeArtStage.game.add.tween(codeArtStage.cloudBgLight);
            wanderb.to({
                alpha: 1
            },
                    soundEb.takt * 4,
                    Phaser.Easing.Sinusoidal.InOut);
            wanderb.delay(soundEb.takt * 4 + Math.random() * 500);
            wanderb.start();
            wanderb.onComplete.add(codeArtStage.blinkCloudLight);

        }, this);
    };

    codeArtStage.initPlanet = function () {
        codeArtStage.planetWrapper = codeArtStage.game.add.sprite(0, 0);
        codeArtStage.planetWrapper.anchor.set(0.5, 0.5);
        codeArtStage.planetTrainWrapper = codeArtStage.game.add.sprite(0, 0);
        codeArtStage.planetTrainWrapper.anchor.set(0.5, 0.5);
        codeArtStage.planetBack = codeArtStage.game.add.sprite(0, 0, 'planetBack');
        codeArtStage.planetBack.anchor.set(0.5, 0.5);
        codeArtStage.planetShade = codeArtStage.game.add.sprite(0, 0, 'planetShade');
        codeArtStage.planetShade.anchor.set(0.5, 0.5);
        codeArtStage.planetClock = codeArtStage.game.add.sprite(0, 0, 'planetClock');
        codeArtStage.planetClock.anchor.set(0.5, 0.5);
        codeArtStage.planetClockZeiger = codeArtStage.game.add.sprite(0, 0, 'planetClockZeiger');
        codeArtStage.planetClockZeiger.anchor.set(0.5, 0.5);
        codeArtStage.planetTrain = codeArtStage.game.add.sprite(0, 0, 'planetTrain');
        codeArtStage.planetTrain.anchor.set(0.5, 0.5);
        codeArtStage.planetTrainWagon = codeArtStage.game.add.sprite(0, 0, 'planetTrainWagon');
        codeArtStage.planetTrainWagon.anchor.set(0.5, 0.5);
        codeArtStage.planetTrainCloud = codeArtStage.game.add.sprite(-100, -100, 'miniCloud');
        codeArtStage.planetTrainCloud.anchor.set(0.5, 0.5);

        codeArtStage.miniClouds.createMultiple(70, 'miniCloud');
        var randomPosition = function (i) {
            i.x = Math.random() * 500;
            i.y = Math.random() * 500;
        };
        codeArtStage.miniClouds.forEach(
                randomPosition
                );

        codeArtStage.planetWrapper.addChild(codeArtStage.planetBack);
        codeArtStage.planetWrapper.addChild(codeArtStage.planetClock);
        codeArtStage.planetWrapper.addChild(codeArtStage.planetClockZeiger);
        codeArtStage.planetWrapper.addChild(codeArtStage.planetShade);
        codeArtStage.planetTrainWrapper.addChild(codeArtStage.planetTrain);
        codeArtStage.planetTrainWrapper.addChild(codeArtStage.planetTrainWagon);
        codeArtStage.planetWrapper.addChild(codeArtStage.planetTrainWrapper);

        codeArtStage.front.add(codeArtStage.planetWrapper);
        codeArtStage.planetWrapper.x = codeArtStage.width / 2;
        codeArtStage.planetWrapper.y = codeArtStage.height / 2;


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



