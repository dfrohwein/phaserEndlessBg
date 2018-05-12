var brColor = net.brehaut.Color;
if (typeof codeArtStage === 'undefined') {
    var codeArtStage = {};
    codeArtStage.count = 0;
    codeArtStage.farBack = null; //groups
    codeArtStage.back = null;
    codeArtStage.front = null;
    codeArtStage.scaleAll = 0.5; //general scale
    codeArtStage.baseSprite = null; //sprite
    codeArtStage.width = 800; //canvas dimensions
    codeArtStage.height = 600;
    //groups and bgs
    codeArtStage.backgroundBase = null; //bmd
    codeArtStage.backgroundSprite = null; //sprite from backgroupbase bmd
    codeArtStage.backgroundBase2 = null; //bmd
    codeArtStage.backgroundSprite2 = null; //sprite from backgroupbase bmd
    codeArtStage.cloudSpriteToDraw = null; //sprite of cloud
    codeArtStage.shineToDraw = null; //sprite of shine
    codeArtStage.wrapperGroupA = null;
    //cloudsprites
    codeArtStage.sRe = null;
    codeArtStage.sBl = null;
    codeArtStage.sGr = null;
    codeArtStage.sGe = null;
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
            codeArtStage.game.load.image('cloud', 'images/greencld.png');
            codeArtStage.game.load.image('shine', 'images/shine1.png');
            codeArtStage.game.load.image('tria', 'images/goldenTria200x129.png');
            codeArtStage.game.load.image('re', 'images/strokeRed.png');
            codeArtStage.game.load.image('ge', 'images/strokeYellow.png');
            codeArtStage.game.load.image('bl', 'images/strokeBlue.png');
            codeArtStage.game.load.image('gr', 'images/strokeGreen.png');
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
            codeArtStage.game.load.audio('riff', 'sounds/causeyouwill-interAcc.mp3');
            codeArtStage.game.load.audio('piano5', 'sounds/causeyouwill-pianao5er.mp3');
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
            //codeArtStage.game.stage.disableVisibilityChange = true;
        },
        create: function () {
            codeArtStageInitSoundProgressions();
            //sounds
            codeArtStage.tickTock = codeArtStage.game.add.audio('tickTock');
            codeArtStage.tickTock.allowMultiple = true;
            codeArtStage.tickTock.volume = 1;
            codeArtStage.harmony = codeArtStage.game.add.audio('harmony');
            codeArtStage.harmony2 = codeArtStage.game.add.audio('harmony2');
            codeArtStage.harmony.allowMultiple = true;
            codeArtStage.harmony2.allowMultiple = true;
            codeArtStage.melodyStart = codeArtStage.game.add.audio('melodyStart');
            codeArtStage.melodyStart2 = codeArtStage.game.add.audio('melodyStart2');
            codeArtStage.melodyStart.allowMultiple = true;
            codeArtStage.melodyStart2.allowMultiple = true;
            codeArtStage.melodyBridge = codeArtStage.game.add.audio('melodyBridge');
            codeArtStage.melodyBridge.allowMultiple = true;
            codeArtStage.harmonyBridge = codeArtStage.game.add.audio('harmonyBridge');
            codeArtStage.harmonyBridge.allowMultiple = true;
            codeArtStage.harmonyVariant = codeArtStage.game.add.audio('harmonyVariant');
            codeArtStage.harmonyVariant.allowMultiple = false;
            codeArtStage.melodyBridgeLower = codeArtStage.game.add.audio('melodyBridgeLower');
            codeArtStage.melodyBridgeLower.allowMultiple = true;
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



            codeArtStage.sRe = codeArtStage.game.add.sprite(0, 0, 're');
            codeArtStage.sRe.anchor.set(0.5, 0.5);
            codeArtStage.sBl = codeArtStage.game.add.sprite(0, 0, 'bl');
            codeArtStage.sBl.anchor.set(0.5, 0.5);
            codeArtStage.sGr = codeArtStage.game.add.sprite(0, 0, 'gr');
            codeArtStage.sGr.anchor.set(0.5, 0.5);
            codeArtStage.sGe = codeArtStage.game.add.sprite(0, 0, 'ge');
            codeArtStage.sGe.anchor.set(0.5, 0.5);

            //layers
            codeArtStage.wrapperGroupA = codeArtStage.game.add.group();
            codeArtStage.farBack = codeArtStage.game.add.group();
            codeArtStage.clds = codeArtStage.game.add.group();
            codeArtStage.back = codeArtStage.game.add.group();
            codeArtStage.front = codeArtStage.game.add.group();
            codeArtStage.wrapperGroupA.add(codeArtStage.farBack);
            codeArtStage.wrapperGroupA.add(codeArtStage.clds);
            codeArtStage.wrapperGroupA.add(codeArtStage.back);
            codeArtStage.wrapperGroupA.add(codeArtStage.front);

            codeArtStage.clds.add(codeArtStage.sRe);
            codeArtStage.clds.add(codeArtStage.sBl);
            codeArtStage.clds.add(codeArtStage.sGr);
            codeArtStage.clds.add(codeArtStage.sGe);
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
            //bmd.addToWorld(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, 0.5, 0.5);
            //codeArtStage.baseSprite = codeArtStage.game.add.sprite(codeArtStage.game.world.centerX, codeArtStage.game.world.centerY, bmd);
            //shine sprite for drawing
            codeArtStage.shineToDraw = codeArtStage.game.make.sprite(0, 0, 'shine');
            codeArtStage.shineToDraw.anchor.set(0.5, 0.5);

            //subDivsionTriangleInit();
            codeArtStage.startBeats();

            initWhirl(codeArtStage.game);
            whirl.onCreate();

            ctEmitter.start(codeArtStage.game,'shine',codeArtStage.back);

            /*this.enterKey = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
             this.enterKey.onDown.add(function () {
             soundEb.enterRythmPress();
             }, this);*/

            codeArtStage.game.onPause.add(
                    function () {
                        console.log("pause");
                        soundEb.taktTimer.pause();
                        codeArtStage.game.sound.pauseAll();
                    }
            );

            codeArtStage.game.onResume.add(
                    function () {
                        console.log("pause");
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
        codeArtStage.game = new Phaser.Game(codeArtStage.width, codeArtStage.height, Phaser.CANVAS, '', codeArtStage.phaserGameFunctions);
    };

    codeArtStage.startBeats = function () {

        codeArtStage.soundProgressions.randomProgression();

        soundEb.newBeatObject([0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], [codeArtStage.baseSprite2], codeArtStage.ping);

        var a = function () {
            soundEb.newBeatObject([0, 2], [codeArtStage.baseSprite1], codeArtStage.ping);
        };
        soundEb.addEventAtTakt(4 * 2, a, this);
        var a = function () {
            soundEb.newBeatObject([0, 7], [codeArtStage.baseSprite], codeArtStage.ping);
        };
        soundEb.addEventAtTakt(4 * 8, a, this);
    };

    codeArtStage.ping = function (sprite) {
        codeArtStage.count++;
        var wander = codeArtStage.game.add.tween(sprite);
        wander.to({
            angle: sprite.angle + 360 * 0.62 * 0.62 * 0.62 * 0.62 * 0.62
        },
                100,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
        if (codeArtStage.count == 32) {
            //soundEb.removeAllBeatObjects();
        }
    };

    codeArtStage.soundTickTock = function () {
        var curr = codeArtStage.tickTock.currentTime / 1000;
        var all = codeArtStage.tickTock.totalDuration;
        codeArtStage.tickTock.volume = 0.7 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.tickTock.play();
        } else if (percent > 0.1) {
            codeArtStage.tickTock.play();
        }
    };

    codeArtStage.soundHarmony = function (num) {
        var toPlay;
        switch (num) {
            case 0:
                toPlay = codeArtStage.harmony;
                break;
            case 1:
                toPlay = codeArtStage.harmony2;
                break;
            default:
                toPlay = codeArtStage.harmony;
        }

        console.log("harmony");
        var curr = toPlay.currentTime / 1000;
        var all = toPlay.totalDuration;
        toPlay.volume = 0.5 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            toPlay.play();
        } else if (percent > 0.1) {
            toPlay.play();
        }
    };

    codeArtStage.soundMelodyStart = function (num) {
        var toPlay;
        switch (num) {
            case 0:
                toPlay = codeArtStage.melodyStart;
                break;
            case 1:
                toPlay = codeArtStage.melodyStart2;
                break;
            default:
                toPlay = codeArtStage.melodyStart;
        }
        console.log("melody");
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

    codeArtStage.soundMelodyBridge = function () {
        console.log("BridgeMelody");
        var curr = codeArtStage.melodyBridge.currentTime / 1000;
        var all = codeArtStage.melodyBridge.totalDuration;
        codeArtStage.melodyBridge.volume = 0.7 * codeArtStage.volumeMulipl * codeArtStage.volumeMelodyMultipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.melodyBridge.play();
        } else if (percent > 0.1) {
            codeArtStage.melodyBridge.play();
        }
    };

    codeArtStage.soundPiano5 = function () {
        console.log("Piano5");
        var curr = codeArtStage.piano5.currentTime / 1000;
        var all = codeArtStage.piano5.totalDuration;
        codeArtStage.piano5.volume = 0.7 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.piano5.play();
        } else if (percent > 0.1) {
            codeArtStage.piano5.play();
        }
    };

    codeArtStage.soundMelodyBridgeLower = function () {
        console.log("BridgeMelodyLow");
        var curr = codeArtStage.melodyBridgeLower.currentTime / 1000;
        var all = codeArtStage.melodyBridgeLower.totalDuration;
        codeArtStage.melodyBridgeLower.volume = 0.7 * codeArtStage.volumeMulipl * codeArtStage.volumeMelodyMultipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.melodyBridgeLower.play();
        } else if (percent > 0.1) {
            codeArtStage.melodyBridgeLower.play();
        }
    };

    codeArtStage.soundRiff = function () {
        console.log("riff");
        var curr = codeArtStage.riff.currentTime / 1000;
        var all = codeArtStage.riff.totalDuration;
        codeArtStage.riff.volume = 0.9 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.riff.play();
        } else if (percent > 0.1) {
            codeArtStage.riff.play();
        }
    };

    codeArtStage.soundHarmonyBridge = function () {
        console.log("BridgeHarmony");
        var curr = codeArtStage.harmonyBridge.currentTime / 1000;
        var all = codeArtStage.harmonyBridge.totalDuration;
        codeArtStage.harmonyBridge.volume = 0.7 * codeArtStage.volumeMulipl;
        var percent = curr / all;
        if (!percent || percent == 0) {
            codeArtStage.harmonyBridge.play();
        } else if (percent > 0.1) {
            codeArtStage.harmonyBridge.play();
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

    codeArtStage.soundRefrain = function (num) {
        var toPlay;
        var vol;
        switch (num) {
            case 0:
                vol = 0.2;
                toPlay = codeArtStage.refrain;
                break;
            case 1:
                vol = 1;
                toPlay = codeArtStage.refrain2;
                break;
            default:
                vol = 0.2;
                toPlay = codeArtStage.refrain;
        }

        console.log("harmony");
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
        console.log("draw1");
        var drawSprite = drawSprite = codeArtStage.sGe;
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



