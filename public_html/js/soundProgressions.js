//sound
function codeArtStageInitSoundProgressions() {
    codeArtStage.soundProgressions = {};

    codeArtStage.soundProgressions.randomProgression = function () {

        //soundEb.newBeatObject([0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], null, codeArtStage.draw1);
        //soundEb.newBeatObject([0, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], null, codeArtStage.draw1);
        soundEb.newBeatObject([0, 1, 1, 1], null, codeArtStage.draw1);

        var rand = Math.floor(Math.random() * 6.8);
        switch (3) {
            case 0:
                codeArtStage.soundProgressions.bridge.start();
                break;
            case 1:
                codeArtStage.soundProgressions.startOut.start();
                break;
            case 2:
                codeArtStage.soundProgressions.harmonyVariant.start();
                break;
            case 3:
                codeArtStage.soundProgressions.refrain.start();
                break;
            case 4:
                codeArtStage.soundProgressions.riff.start();
                break;
            case 5:
                codeArtStage.soundProgressions.piano5.start();
                break;
            case 6:
                codeArtStage.soundProgressions.harmonyVariant2.start();
                break;
        }
    };

    codeArtStage.soundProgressions.startOut = {};
    codeArtStage.soundProgressions.startOut.stop = function () {
        console.log("stop");
        console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
        codeArtStage.soundProgressions.birdTintOff();
    };
    codeArtStage.soundProgressions.startOut.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute44"], [Math.floor(Math.random() * 2)], codeArtStage.soundStart);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([43.9], [], codeArtStage.soundProgressions.startOut.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.refrain.stop();
            codeArtStage.bridge.stop();
            codeArtStage.harmonyVariant.stop();
            codeArtStage.harmonyVariant2.stop();
            codeArtStage.riff.stop();
            codeArtStage.piano5.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([1.25, 1, 1, 0.33, 0.33, 0.6], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(4, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);

    };

    codeArtStage.soundProgressions.bridge = {};

    codeArtStage.soundProgressions.bridge.stop = function () {
        console.log("stop");
        console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
        codeArtStage.soundProgressions.birdTintOff();
    };

    codeArtStage.soundProgressions.bridge.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute32"], [Math.floor(Math.random() * 2)], codeArtStage.soundBridge);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([31.9], [], codeArtStage.soundProgressions.bridge.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.refrain.stop();
            codeArtStage.melodyStart.stop();
            codeArtStage.harmonyVariant.stop();
            codeArtStage.harmonyVariant2.stop();
            codeArtStage.riff.stop();
            codeArtStage.piano5.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0.75, 0.25, 0.25, 0.25, 0.5, 0.75, 0.25, 0.37, 0.37, 0.25, 4.75,
                0.25, 0.37, 0.37, 0.25, 0.75, 0.25, 0.37, 0.37, 0.5, 0.75, 3.75,
                0.25, 0.37, 0.37, 0.5, 0.5, 0.25, 0.37, 0.37, 0.75, 4.25,
                0.25, 0.37, 0.37, 0.5, 0.5, 0.25, 0.37, 0.37, 0.5, 0.5, 0.5, 0.5, 0.5
            ], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 1, 1, 1], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.birdTint);
        };
        soundEb.addEventAtTakt(0, a, this);
    };

    codeArtStage.soundProgressions.harmonyVariant = {};
    codeArtStage.soundProgressions.harmonyVariant.stop = function () {
        console.log("stop");
        console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
    };

    codeArtStage.soundProgressions.harmonyVariant.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute32"], [Math.floor(Math.random() * 2)], codeArtStage.soundHarmonyVariant);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([1.25, 1, 1, 0.33, 0.33, 0.6], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([31.9], [], codeArtStage.soundProgressions.harmonyVariant.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.refrain.stop();
            codeArtStage.melodyStart.stop();
            codeArtStage.bridge.stop();
            codeArtStage.harmonyVariant2.stop();
            codeArtStage.riff.stop();
            codeArtStage.piano5.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);
        var a = function () {
            soundEb.newBeatObject([0, 1, 1, 1], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.birdsMove);
        };
        soundEb.addEventAtTakt(0, a, this);
    };

    codeArtStage.soundProgressions.harmonyVariant2 = {};
    codeArtStage.soundProgressions.harmonyVariant2.stop = function () {
        console.log("stop");
        console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
    };

    codeArtStage.soundProgressions.harmonyVariant2.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute32"], [Math.floor(Math.random() * 2)], codeArtStage.soundHarmonyVariant2);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([31.9], [], codeArtStage.soundProgressions.harmonyVariant2.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.refrain.stop();
            codeArtStage.melodyStart.stop();
            codeArtStage.bridge.stop();
            codeArtStage.harmonyVariant.stop();
            codeArtStage.riff.stop();
            codeArtStage.piano5.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([1.4, 1, 1, 0.33, 0.33, 0.6], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(0, a, this);

        codeArtStage.colorPositionTheme = 250;
        codeArtStage.soundProgressions.blendInPaper();

        var a = function () {
            soundEb.newBeatObject([30], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.blendOutPaper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);

    };

    codeArtStage.soundProgressions.refrain = {};
    codeArtStage.soundProgressions.refrain.stop = function () {
        console.log("stop");
        //console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
    };

    codeArtStage.soundProgressions.refrain.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute32"], [Math.floor(Math.random() * 2)], codeArtStage.soundRefrain);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([31.9], [], codeArtStage.soundProgressions.refrain.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.melodyStart.stop();
            codeArtStage.bridge.stop();
            codeArtStage.harmonyVariant.stop();
            codeArtStage.harmonyVariant2.stop();
            codeArtStage.riff.stop();
            codeArtStage.piano5.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 0.75, 0.5, 0.25, 2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.25], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(0, a, this);
        
        var a = function () {
            soundEb.newBeatObject([0, 0.75, 0.5, 0.25, 2, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.25, 0.25, 0.25], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.birdsMove);
        };
        soundEb.addEventAtTakt(0, a, this);

        codeArtStage.colorPositionTheme = 58;
        codeArtStage.soundProgressions.blendInPaper();

        var a = function () {
            soundEb.newBeatObject([16], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.blendOutPaper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);
    };

    codeArtStage.soundProgressions.riff = {};
    codeArtStage.soundProgressions.riff.stop = function () {
        console.log("stop");
        console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
        codeArtStage.soundProgressions.birdTintOff();
    };

    codeArtStage.soundProgressions.riff.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute35.7"], [], codeArtStage.soundRiff);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([35.7], [], codeArtStage.soundProgressions.riff.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.melodyStart.stop();
            codeArtStage.bridge.stop();
            codeArtStage.harmonyVariant.stop();
            codeArtStage.harmonyVariant2.stop();
            codeArtStage.piano5.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 1], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([16, "mute16"], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.rainEmitterStart);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([33], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.rainEmitterStop);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.birdsMove);
        };
        soundEb.addEventAtTakt(0, a, this);
    };

    codeArtStage.soundProgressions.piano5 = {};
    codeArtStage.soundProgressions.piano5.stop = function () {
        console.log("stop");
        console.log(soundEb.taktTimer.events);
        soundEb.removeAllBeatObjects();
        console.log(soundEb.beatObjects);
        codeArtStage.soundProgressions.randomProgression();
        codeArtStage.soundProgressions.birdTintOff();
    };

    codeArtStage.soundProgressions.piano5.start = function () {
        codeArtStage.soundProgressions.onNext();
        var a = function () {
            soundEb.newBeatObject([0, "mute35.7"], [], codeArtStage.soundPiano5);
        };
        soundEb.addEventAtTakt(0, a, this);
        var a = function () {
            soundEb.newBeatObject([31.7], [], codeArtStage.soundProgressions.piano5.stop);
        };
        soundEb.addEventAtTakt(0, a, this);
        var stopper = function () {
            codeArtStage.melodyStart.stop();
            codeArtStage.bridge.stop();
            codeArtStage.harmonyVariant.stop();
            codeArtStage.harmonyVariant2.stop();
            codeArtStage.riff.stop();
        };
        var a = function () {
            soundEb.newBeatObject([4], [], stopper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 0.5, 0.75, 0.75, 0.75, 0.75], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.newTrainCloud);
        };
        soundEb.addEventAtTakt(0, a, this);

        codeArtStage.colorPositionTheme = 180;
        codeArtStage.soundProgressions.blendInPaper();

        var a = function () {
            soundEb.newBeatObject([30], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.blendOutPaper);
        };
        soundEb.addEventAtTakt(0, a, this);

        var a = function () {
            soundEb.newBeatObject([0, 2, 2, 2], [Math.floor(Math.random() * 2)], codeArtStage.soundProgressions.reTint);
        };
        soundEb.addEventAtTakt(2, a, this);
    };

    codeArtStage.soundProgressions.onNext = function () {
        soundEb.newBeatObject([0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], null, codeArtStage.ticker);
        codeArtStage.colorsCount += 180;
        codeArtStage.colorsCount = codeArtStage.colorsCount % 360;
        codeArtStage.movements.randomMovement();

    };

    codeArtStage.soundProgressions.startTrain = function () {
        var rollMe = function () {
            var sprite = codeArtStage.planetBack;
            var roll = codeArtStage.game.add.tween(sprite);
            roll.to({
                angle: sprite.angle + 350
            },
                    soundEb.takt * 4);
            roll.start();
        };
        rollMe();

        var stumbleMeToo = function () {
            var sprite = codeArtStage.planetTrainWagon;
            var jump = codeArtStage.game.add.tween(sprite);
            jump.to({
                x: 1,
                y: -3
            },
                    soundEb.takt / 8);
            jump.yoyo(true);
            jump.start();
        };

        var stumbleMe = function () {
            var sprite = codeArtStage.planetTrain;
            var jump = codeArtStage.game.add.tween(sprite);
            jump.to({
                x: 1,
                y: -3
            },
                    soundEb.takt / 8);
            jump.yoyo(true);
            jump.onComplete.add(stumbleMeToo);
            jump.start();
        };
        stumbleMe();

        var sprite = codeArtStage.planetTrainWrapper;
        var wander = codeArtStage.game.add.tween(sprite);
        wander.to({
            angle: 15 + Math.random() * 25
        },
                soundEb.takt * 2,
                Phaser.Easing.Sinusoidal.InOut);
        wander.start();
        wander.onComplete.add(function () {

            var wanderb = codeArtStage.game.add.tween(sprite);
            wanderb.to({
                angle: -5 - Math.random() * 25
            },
                    soundEb.takt * 2,
                    Phaser.Easing.Sinusoidal.InOut);
            wanderb.start();
            wanderb.onComplete.add(codeArtStage.soundProgressions.startTrain);

        }, this);
    };

    codeArtStage.soundProgressions.newTrainCloud = function () {
        var xTemp = codeArtStage.planetTrainWrapper.world.x - 15;
        var yTemp = codeArtStage.planetTrainWrapper.world.y - 110;
        var sprite = codeArtStage.miniClouds.getFirstExists(false);
        sprite.revive();
        sprite.inputEnabled = true;
        var hoverCloud = function (sp, p) {
            var xdist = p.x - sp.x;
            var ydist = p.y - sp.x;
            /*if(ydist>0) {
             sp.anchor.y+=0.1;
             }
             if(ydist<0) {
             sp.anchor.y-=0.1;
             }
             if(xdist>0) {
             sp.anchor.x+=0.1;
             }
             if(xdist<0) {
             sp.anchor.x-=0.1;
             }*/
            if (sp.jump == null) {
                sp.jump = {};
                sp.jump = codeArtStage.game.add.tween(sp.anchor);
                sp.jump.to({
                    x: Math.random() * 4 - 2,
                    y: Math.random() * 4 - 2,
                },
                        soundEb.takt / 2,
                        "Sine.easeOut"
                        );
                sp.jump.start();
                var ri = function () {
                    sp.jump = null;
                };
                sp.jump.yoyo(true);
                sp.jump.onComplete.add(ri);
            }
        };
        sprite.events.onInputOver.add(hoverCloud, this);
        var p = rotateXY(
                codeArtStage.planetTrainWrapper.world.x,
                codeArtStage.planetTrainWrapper.world.y,
                xTemp,
                yTemp,
                codeArtStage.planetTrainWrapper.rotation * -1
                );
        sprite.x = p[0];
        sprite.y = p[1];
        s = {};
        s.x = codeArtStage.width / 2;
        s.y = codeArtStage.height / 2 - 150;
        sprite.scale.setTo(0.2, 0.2);
        var timeMod = 1 + Math.cos(codeArtStage.game.time.totalElapsedSeconds() / 20) / 5;
        var wander = codeArtStage.game.add.tween(sprite).to(
                {
                    x: [sprite.x + 100, sprite.x + 400, sprite.x + 500 * timeMod, s.x - 700 * timeMod, s.x - 700 * timeMod, s.x + -50, s.x + 500],
                    y: [sprite.y + 0, sprite.y + -400, sprite.y + 900 * timeMod, s.y + 900, s.y - 700 * timeMod, s.y + 100 * timeMod, s.y - 200]
                },
                soundEb.takt * 16,
                "Sine.easeOut"
                );
        wander.interpolation(Phaser.Math.bezierInterpolation);
        var resetCloud = function () {
            sprite.events.onInputOver.removeAll();
            sprite.kill();
        };
        wander.onComplete.add(resetCloud);
        wander.start();

        var scale = codeArtStage.game.add.tween(sprite.scale);
        scale.to({
            x: 1,
            y: 1
        },
                soundEb.takt * 4);
        scale.start();
    };

    codeArtStage.soundProgressions.lowerShineColorsStart = function () {
        var sprite = codeArtStage.cloudBgLowerShine;
        var wander = codeArtStage.game.add.tween(sprite);
        wander.to({
            y: 10 + Math.random() * 40
        },
                soundEb.takt * 4,
                Phaser.Easing.Sinusoidal.InOut);
        wander.delay(Math.random() * 700 + 5000);
        wander.start();
        wander.onComplete.add(function () {
            var wanderb = codeArtStage.game.add.tween(sprite);
            wanderb.to({
                y: 0
            },
                    soundEb.takt * 4,
                    Phaser.Easing.Sinusoidal.InOut);
            wanderb.start();
            wander.delay(Math.random() * 3000);
            wanderb.onComplete.add(codeArtStage.soundProgressions.lowerShineColorsStart);
        }, this);
    };

    codeArtStage.soundProgressions.reTint = function () {
        var colorGo = [];
        colorGo.push(codeArtStage.colors[codeArtStage.colorPositionTheme]);
        colorGo.push(codeArtStage.colors[(codeArtStage.colorPositionTheme + 15) % 359]);
        colorGo.push(codeArtStage.colors[(codeArtStage.colorPositionTheme + 30) % 359]);
        colorGo.push(codeArtStage.colors[(codeArtStage.colorPositionTheme + 45) % 359]);
        colorGo.push(codeArtStage.colors[(codeArtStage.colorPositionTheme + 60) % 359]);
        codeArtStage.cloudBgLowerShine.tint = colorGo[Math.floor(Math.random() * 3.9)].color;
    };

    codeArtStage.soundProgressions.blendInPaper = function () {
        codeArtStage.paperA.tint = codeArtStage.colors[codeArtStage.colorPositionTheme].color;
        var sprite = codeArtStage.paperA;
        var jump = codeArtStage.game.add.tween(sprite);
        jump.to({
            alpha: 1
        },
                soundEb.takt);
        jump.start();
    };
    codeArtStage.soundProgressions.blendOutPaper = function () {
        var sprite = codeArtStage.paperA;
        var jump = codeArtStage.game.add.tween(sprite);
        jump.to({
            alpha: 0
        },
                soundEb.takt);
        jump.start();
    };

    codeArtStage.soundProgressions.rainEmitterStart = function () {

        codeArtStage.mid_emitter = null;
        codeArtStage.back_emitter = null;

        var game = codeArtStage.game;


        codeArtStage.back_emitter = game.add.emitter(game.world.width * 0.5, -32, 145);
        codeArtStage.back_emitter.makeParticles('rain');
        codeArtStage.back_emitter.maxParticleScale = 0.6;
        codeArtStage.back_emitter.minParticleScale = 0.2;
        codeArtStage.back_emitter.setYSpeed(20, 100);
        codeArtStage.back_emitter.setXSpeed(0, 0);
        codeArtStage.back_emitter.gravity = 0;
        codeArtStage.back_emitter.width = game.world.width * 1;
        codeArtStage.back_emitter.setRotation(0, 0);

        codeArtStage.mid_emitter = game.add.emitter(game.world.width * 0.5, -32, 145);
        codeArtStage.mid_emitter.makeParticles('rain');
        codeArtStage.mid_emitter.maxParticleScale = 1.2;
        codeArtStage.mid_emitter.minParticleScale = 0.8;
        codeArtStage.mid_emitter.setYSpeed(50, 150);
        codeArtStage.mid_emitter.setXSpeed(0, 0);
        codeArtStage.mid_emitter.gravity = 0;
        codeArtStage.mid_emitter.width = game.world.width * 1;
        codeArtStage.mid_emitter.setRotation(0, 0);


        codeArtStage.back_emitter.start(false, 14000, 150);
        codeArtStage.mid_emitter.start(false, 12000, 150);

    };

    codeArtStage.soundProgressions.rainEmitterStop = function () {
        whirl.whiteFlash(1);
        codeArtStage.back_emitter.destroy();
        codeArtStage.mid_emitter.destroy();
        codeArtStage.back_emitter = null;
        codeArtStage.mid_emitter = null;

    };

    codeArtStage.soundProgressions.birdsMove = function () {
        var blendMode = 'normal';
        codeArtStage.backgroundBase.drawGroup(codeArtStage.birdsGroup, blendMode, true);
        sp = codeArtStage.birds;
        sp.jump = codeArtStage.game.add.tween(sp);
        sp.jump.to({
            x: codeArtStage.game.width * 0.45 + codeArtStage.game.width * 0.38 * Math.random(),
            y: codeArtStage.game.height * 0.1 + codeArtStage.game.width * 0.22 * Math.random()
        },
                soundEb.takt,
                "Sine.easeOut"
                );
        sp.jump.start();
    };

    codeArtStage.soundProgressions.birdTint = function () {

        codeArtStage.birdWhite.tint = codeArtStage.colorsFull[Math.floor(Math.random() * 359)].color;
        codeArtStage.birdBlack.tint = codeArtStage.colorsFull[Math.floor(Math.random() * 359)].color;
        codeArtStage.birdCol.tint = codeArtStage.colorsFull[Math.floor(Math.random() * 359)].color;
    };

    codeArtStage.soundProgressions.birdTintOff = function () {
        codeArtStage.birdWhite.tint = 0xFFFFFF;
        codeArtStage.birdBlack.tint = 0xFFFFFF;
        codeArtStage.birdCol.tint = 0xFFFFFF;
    };
}