//needs global var takt mille seconds

startOutSoundEb = function (game) {

    soundEb = {};
    soundEb.game = game;
    soundEb.takt = 125 * 8; //622 chained to the rythm (1/4 = takt? so actually takt * 4 = takt)
    soundEb.chord1 = {};
    soundEb.bgm = {};
    soundEb.knockClick = {};
    soundEb.click = {};
    soundEb.chord2 = {};
    //rythmic calls tythm 1 = 1/4 note, the numbers are the delay after the last note (time between the last note and them(not theyre own length, but the length of the note before)
    //if u ignore the 0 at the first spot this is the notes length with no pauses
    //soundEb.rythm = [0, 2, 1, 1, 2]; type ["mute8"] for a pause of the duration (play nothing at the 8 point, but still wait this long)
    soundEb.rythm = [0, 1.5, 1.5];
    //if the rythm is still running (needed if its longer than one takt
    soundEb.rythmStillRunning = false;
    //sounds to play on takt array
    soundEb.toPlay = [];
    //functions being called one after another on takt
    soundEb.toC = [];
    //functions being called all at once next takt
    soundEb.toCNextTakt = [];
    //functions being called one after another on a delay from takt start
    soundEb.toCRythmic = [];
    //volume
    soundEb.volBase = 5;
    //rythm loop event
    soundEb.looper = null;
    //rythm timer
    soundEb.taktTimer = null;
    //odd even
    soundEb.oddEven = false;
    //countQuart
    soundEb.quarts = 1;
    //count to 32
    soundEb.to32 = 1;
    soundEb.randomShift = Math.floor(Math.random() * 100);
    soundEb.beatObjects = [];
    //gimmick textbox
    soundEb.textBox = null;
    soundEb.textBoxTween1 = null;
    soundEb.textBoxTween2 = null;
    soundEb.textPrio = 0;
//press a takt
    soundEb.pressTimes = [];
    soundEb.pressDist = 0;
    soundEb.pressTimesRythm = [];
    soundEb.rythmTimes = [];
    soundEb.newTaktFromPressEvent = null;

    /**
     * Creates a new beat object and adds it to the beat object array
     * @param {type} rythm [0,1,1] would be 1,1,1,pause, [0,1.5,1.5] would be pointed 1/4, pointed 1/4, 1/4 
     * (its first beat at 0, then distance to next beat
     * @param {type} args argument chain given to the function [] needs to be array
     * @param {type} funct the function to call
     * @returns {soundEb.beatObject}
     */
    soundEb.newBeatObject = function (rythm, args, funct) {
        var nb = new soundEb.beatObject(rythm, args, funct);
        soundEb.beatObjects.push(nb);
        return nb;
    };
    /**
     * Beat object, factory "newBeatObject" should be used to create it
     * @param {type} rythm
     * @param {type} args
     * @param {type} funct
     * @returns {soundEb.beatObject}
     */
    soundEb.beatObject = function (rythm, args, funct) {
        this.rythm = rythm;
        this.args = args;
        this.funct = funct;
    };
    soundEb.removeAllBeatObjects = function () {
        soundEb.beatObjects.splice(0, soundEb.beatObjects.length);
        for (var i = 0, max = soundEb.taktTimer.events.length; i < max; i++) {
            if(soundEb.taktTimer.events[i].ident == "fromObj") {
                soundEb.taktTimer.remove(soundEb.taktTimer.events[i]);
            }
        }
        console.log("bla " + soundEb.beatObjects);
    };
    /**
     * init
     * @returns {undefined}
     */
    soundEb.addAndStartTaktTimer = function () {
        //extra timer to keep rythm
        soundEb.taktTimer = soundEb.game.time.create(false);
        soundEb.taktTimer.start();
        soundEb.startTaktLoop();
    };
    soundEb.addSounds = function () {
        soundEb.chord1 = soundEb.game.add.audio('chord1');
        soundEb.chord2 = soundEb.game.add.audio('chord2');
        soundEb.knockClick = soundEb.game.add.audio('knockClick');
        soundEb.click = soundEb.game.add.audio('click');
        soundEb.bgm = soundEb.game.add.audio('bgm');
        var startBg = function () {
            soundEb.bgm.play(null, 0, soundEb.volBase, true);
            soundEb.addTaktTimer();
        };
        soundEb.game.sound.setDecodedCallback([soundEb.chord1, soundEb.bgm], startBg, this);
    };
    soundEb.startTaktLoop = function () {
        //avoid double
        if (soundEb.looper != null) {
            soundEb.taktTimer.events.remove(soundEb.looper);
        }
        if (true) {
            soundEb.looper = soundEb.taktTimer.loop(soundEb.takt, soundEb.playSoundOrFunctAtTakt, this);
        }

        //hot to slow and speed up
        //soundEb.looper.delay+=1000;
    };
    /**
     * Starts delayed events on every new takt that follow a rythm
     * @returns {undefined}
     */
    soundEb.rythmicCalls = function () {
        if (!soundEb.rythmStillRunning) {
            let countTrough = 0;
            for (var i = 0; i < soundEb.rythm.length; i++) {
                countTrough += soundEb.rythm[i];
                soundEb.taktTimer.add(countTrough * soundEb.takt, soundEb.rythmicFunctionCallsFromLoop, this);
            }
            soundEb.rythmStillRunning = true;
            var a = function () {
                soundEb.rythmStillRunning = false;
            };
            soundEb.taktTimer.add(countTrough * soundEb.takt * 1.01, a, this);
        }
    };
    /**
     * Calll function at takt x
     * @param {type} takt
     * @param {type} funct
     * @returns {undefined}
     */
    soundEb.addEventAtTakt = function (takt, funct) {
        soundEb.taktTimer.add(soundEb.takt * takt, funct, this);
    };

    /**
     * Starts delayed events on every new takt that follow a rythm
     * @returns {undefined}
     */
    soundEb.rythmicCallsFromBeatObjects = function (beatObj) {
        var args = beatObj.args;
        var rythm = beatObj.rythm;
        var funct = beatObj.funct;
        //to be able to give over arguments workaround
        var functParam = function () {
            funct.apply(this, args);
        }
        //if the beat isnt still active, repeat it
        if (!beatObj.stillRunning) {
            //counts the all together duration of the beat to avoid multiples
            let countTrough = 0;
            //add all the beat repetions within the take at start
            for (var i = 0; i < rythm.length; i++) {
                //if beat is a number, treat is a delay until u add the next event
                if (typeof rythm[i] == "number") {
                    //add to all over duration
                    countTrough += rythm[i];
                    //add event at time point -> milisekonds of a 1/4 note * beat array number
                    var eventTemp = soundEb.taktTimer.add(countTrough * soundEb.takt, functParam, this);
                    eventTemp.ident = "fromObj";
                } else {
                    //if its not a number treat it as a pause
                    var numb = rythm[i].match(/\d/g);
                    numb = numb.join("");
                    //just add it to over all duration without adding an event
                    countTrough += numb;
                }
            }
            //wait till beat is done
            beatObj.stillRunning = true;
            var a = function () {
                beatObj.stillRunning = false;
            };
            //wait till beat is done before enabling repeat
            var eventTemp = soundEb.taktTimer.add(countTrough * soundEb.takt * 0.95, a, this);
            eventTemp.ident = "fromObj";
        }
    };
    /**
     * Stars the rythmic functions and maintains their array
     * @returns {undefined}
     */
    soundEb.rythmicFunctionCallsFromLoop = function () {
        if (soundEb.toCRythmic.length > 0) {
            var args = soundEb.toCRythmic[0].args;
            if (args != null) {
                soundEb.toCRythmic[0].fCall(args[0], args[1], args[2], args[3], args[4], args[5]);
            } else {
                soundEb.toCRythmic[0].fCall();
            }
            soundEb.toCRythmic.shift();
        }
    };
    soundEb.playSoundRythm = function (sndName) {
        if (soundEb.toC.length < 4) {
            soundEb.toPlay.shift();
        }
        soundEb.toPlay.push(sndName);
    };
    /**
     * Call functions onea after another to a rythmic beat
     * @param {type} funct
     * @param {type} args1
     * @returns {undefined}
     */
    soundEb.callFunctRythmic = function (funct, args1) {
        var tempObj = {};
        tempObj.fCall = funct;
        tempObj.args = args1;
        if (soundEb.toCRythmic.length > 32) {
            soundEb.toCRythmic.shift();
        }
        soundEb.toCRythmic.push(tempObj);
    };
    /**
     * Functions are called one after another on takt
     * @param {type} funct
     * @param {type} waitForQuart
     * @param {type} args1
     * @returns {undefined}
     */
    soundEb.callFunctBeat = function (funct, waitForQuart, args1) {
        var tempObj = {};
        tempObj.fCall = funct;
        tempObj.args = args1;
        tempObj.waitForQuart = waitForQuart;
        if (soundEb.toC.length > 32) {
            soundEb.toC.shift();
        }
        soundEb.toC.push(tempObj);
    };
    /**
     * All functions are called on the next takt
     * @param {type} funct
     * @param {type} args1
     * @returns {undefined}
     */
    soundEb.callFunctNextTakt = function (funct, args1) {
        var tempObj = {};
        tempObj.fCall = funct;
        tempObj.args = args1;
        if (soundEb.toCNextTakt.length > 32) {
            soundEb.toCNextTakt.shift();
        }
        soundEb.toCNextTakt.push(tempObj);
    };
    /**
     * Looping function called
     * @returns {undefined}
     */
    soundEb.playSoundOrFunctAtTakt = function () {

        if (soundEb.quarts == 1) {
            for (var i = 0, max = soundEb.beatObjects.length; i < max; i++) {
                soundEb.rythmicCallsFromBeatObjects(soundEb.beatObjects[i]);
            }
            soundEb.rythmicCalls();
        }

        //sounds
        if (soundEb.toPlay.length > 0) {
            switch (soundEb.toPlay[0]) {
                case "chord1":
                    soundEb.chord1.play(null, 0, soundEb.volBase * 5);
                    break;
                case "chord2":
                    soundEb.chord2.play(null, 0, soundEb.volBase * 5);
                    break;
                case "knock":
                    break;
                case "knockClick":
                    soundEb.knockClick.play(null, 0, 2);
                    break;
                case "rifl1":
                    soundEb.rifl1.play(null, 0, 2);
                    break;
                case "rifl2":
                    break;
            }
            soundEb.toPlay.shift();
        }

        //functions on takt
        soundEb.oddEven = !soundEb.oddEven;
        if (soundEb.toC.length > 0) {
            var args = soundEb.toC[0].args;
            if (soundEb.toC[0].waitForQuart == soundEb.quarts || !soundEb.toC[0].waitForQuart) {
                if (args != null) {
                    soundEb.toC[0].fCall(args[0], args[1], args[2], args[3], args[4], args[5]);
                } else {
                    soundEb.toC[0].fCall();
                }
                soundEb.toC.shift();
            }
        }

        //functions next takt
        if (soundEb.toCNextTakt.length > 0) {
            for (var iz = 0; iz < soundEb.toCNextTakt.length; iz++) {
                var args = soundEb.toCNextTakt[iz].args;
                if (args != null) {
                    soundEb.toCNextTakt[iz].fCall(args[0], args[1], args[2], args[3], args[4], args[5]);
                } else {
                    soundEb.toCNextTakt[iz].fCall();
                }
            }
            soundEb.toCNextTakt = [];
        }

        //count 4 takts
        soundEb.quarts++;
        if (soundEb.quarts == 5) {
            soundEb.quarts = 1;
        }
        soundEb.to32++;
        if (soundEb.to32 == 33) {
            soundEb.to32 = 1;
        }
    };
    soundEb.pushRandomSnd = function () {
        var retn;
        switch (Math.floor(Math.random() * 2.99)) {
            case 0:
                retn = "chord1";
                break;
            case 1:
                retn = "chord2";
                break;
        }
        soundEb.playSoundRythm(retn);
    };
    soundEb.playRandomChord = function () {
        switch (Math.floor(Math.random() * 1.99)) {
            case 0:
                soundEb.chord1.play(null, 0, soundEb.volBase * 5);
                break;
            case 1:
                soundEb.chord2.play(null, 0, soundEb.volBase * 5);
                break;
        }
    };
    soundEb.playRandomRandom = function () {
        if (Math.random() > 0.3) {
            var randVol = 0.7 + Math.random() * 2;
            switch (Math.floor(Math.random() * 2.99)) {
                case 0:
                    soundEb.chord1.play(null, 0, randVol);
                    break;
                case 1:
                    soundEb.chord2.play(null, 0, randVol);
                    break;
                case 2:
                    soundEb.knockClick.play(null, 0, randVol);
                    break;
            }
        }
    };
    soundEb.clearTaktArrays = function () {
        soundEb.toPlay.splice(0, soundEb.toPlay.length);
        soundEb.toC.splice(0, soundEb.toC.length);
    };
    soundEb.getTimeToNextTick = function () {
        return soundEb.taktTimer.duration;
    };
    soundEb.getTimeToNextTickDir = function () {
        return soundEb.taktTimer.duration + (soundEb.quarts - 1) * soundEb.takt;
    };
    soundEb.enterTaktPress = function () {
        if (soundEb.pressTimes.length < 12) {
            soundEb.pressTimes.push(soundEb.taktTimer.seconds);
            var temp = [];
            var average = 0;
            for (var i = 0; i < soundEb.pressTimes.length - 1; i++) {
                temp.push(soundEb.pressTimes[i + 1] - soundEb.pressTimes[i]);
            }

            for (var i = 0; i < temp.length; i++) {
                average += temp[i];
            }

            if (soundEb.pressTimes.length < 5) {
                soundEb.textDisplay("-" + soundEb.pressTimes.length + "-", 0.1, 1);
            }

            soundEb.average = average / temp.length * 1000;
            if (!soundEb.newTaktFromPressEvent) {
                soundEb.newTaktFromPressEvent = soundEb.taktTimer.add(3000, soundEb.setTakt);
            } else {
                soundEb.newTaktFromPressEvent.delay += 700;
            }
        }
    };
    soundEb.setTakt = function () {
        var ms = soundEb.average;
        if (soundEb.average) {
            while (ms < 400) {
                ms *= 2;
            }
            while (ms > 1200) {
                ms /= 2;
            }
            //console.log("new Takt " + ms);
            soundEb.textDisplay("New beat", 1, 3);
            soundEb.takt = ms;
            soundEb.looper.delay = ms;
            console.log(ms);
        } else {
            console.log("newtaktfailed");
        }
        soundEb.newTaktFromPressEvent = null;
        soundEb.pressTimes = [];
    };

    soundEb.textInit = function () {
        var startText = "";
        var style = {align: "center", font: "3vmin monospace", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: soundEb.game.width * 0.62};
        soundEb.textBox = soundEb.game.add.text(soundEb.game.width / 2, soundEb.game.height * 0.13, startText, style);
        soundEb.textBox.setShadow(7, 7, 'rgba(0,0,0,0.5)', 1);
        soundEb.textBox.anchor.setTo(0.5, 0.5);
        soundEb.textBox.alpha = 0;
    };
    soundEb.textDisplay = function (text, speed, prio) {
        if (soundEb.textPrio > prio) {
            return;
        }
        if (soundEb.textBoxTween1 != null) {
            soundEb.textBoxTween1.stop();
        }
        if (soundEb.textBoxTween2 != null) {
            soundEb.textBoxTween2.stop();
        }
        var tweenfunct = function () {
            soundEb.textBoxTween2 = soundEb.game.add.tween(soundEb.textBox).to(
                    {alpha: 0},
                    soundEb.takt * 3 * speed,
                    Phaser.Easing.Sinusoidal.InOut, true,
                    soundEb.getTimeToNextTick() + soundEb.takt * speed);
            var ret = function () {
                soundEb.textPrio = 0;
            };
            soundEb.textBoxTween2.onComplete.add(ret, this);
        };
        soundEb.textPrio = prio;
        soundEb.textBoxTween1 = soundEb.game.add.tween(soundEb.textBox).to(
                {alpha: 1},
                soundEb.takt * flyers.speed1 * 0.25 * speed,
                Phaser.Easing.Sinusoidal.InOut, true);
        soundEb.textBoxTween1.onComplete.add(tweenfunct, this);
        soundEb.textBox.text = text;
    };


    soundEb.enterRythmPress = function () {
        if (soundEb.pressTimesRythm.length < 8) {
            /*soundEb.pressTimes.push(soundEb.taktTimer.seconds);
             var temp = [];
             var average = 0;
             console.log((soundEb.taktTimer.seconds*1000)%(soundEb.takt*4));*/
            soundEb.pressTimesRythm.push(soundEb.taktTimer.seconds);
            soundEb.rythmTimes = [];
            var average = 0;
            for (var i = 0; i < soundEb.pressTimesRythm.length - 1; i++) {
                soundEb.rythmTimes.push(soundEb.pressTimesRythm[i + 1] - soundEb.pressTimesRythm[i]);
            }
        } else {
            for (var i = 0; i < soundEb.rythmTimes.length; i++) {
                var b = ((soundEb.rythmTimes[i] * 1000) / 600);
                console.log(b);
            }
        }
    };

};

function roundToMultipleOfNum(x, num) {
    return Math.round(x / num) * num;
}

//daniel@frohwein.de