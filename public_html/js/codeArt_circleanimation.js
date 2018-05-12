
if (typeof codeArtStage === 'undefined') {
    var codeArtStage = {};

    codeArtStage.baseSprite = {};
    codeArtStage.width = 500;
    codeArtStage.height = 500;

    codeArtStage.invert3 = function (pixel) {

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

    }

    codeArtStage.init = function () {

        var game = new Phaser.Game(codeArtStage.width, codeArtStage.height, Phaser.AUTO, '', {preload: preload, create: create, update: update});

        function preload() {
            game.load.image('circ', 'images/circ.gif');
            game.stage.backgroundColor = 0x121055;
        }

        function create() {
            var bmd = game.make.bitmapData();
            bmd.load('circ');
            bmd.processPixelRGB(codeArtStage.invert3, this);
//            bmd.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5);
            //codeArtStage.baseSprite = game.add.sprite(game.world.centerX, game.world.centerY, bmd);

            var newCirclerSprite = function (xer, yer, dist, alphaFinal, scale) {
                let spriteCr = game.add.sprite(game.world.centerX, game.world.centerY, bmd);
                spriteCr.anchor.set(0.51, 0.49);
                spriteCr.scale.set(0.38*scale, 0.38*scale);
                spriteCr.blendMode = PIXI.blendModes.OVERLAY;
                spriteCr.alpha = 0;
                let animateBaseSprite = function (sprite, xer, yer, dist) {

                    let appear = game.add.tween(sprite);
                    appear.to({alpha: alphaFinal}, 1503, null, null, 500);
                    appear.start();

                    let turnRepeat = function (turnSprite) {
                        var wander = game.add.tween(turnSprite);
                        wander.to({rotation: turnSprite.rotation + 2}, 8000, Phaser.Easing.Sinusoidal.InOut);
                        wander.onComplete.add(turnRepeat, this);
                        wander.start();
                    };

                    turnRepeat(sprite);

                    let circlePointRepeat = function (turnSprite1, xM, yM, dst) {
                        let xMid = xM;
                        let yMid = yM;
                        let dist = dst;
                        let repeat = function () {
                            var wander = game.add.tween(turnSprite1);
                            var time = game.time.totalElapsedSeconds();
                            wander.to({x: xMid + Math.sin(time) * dist, y: yMid + Math.cos(time) * dist}, 153);
                            wander.onComplete.add(repeat, this);
                            wander.start();
                        }
                        repeat();
                    };
                    circlePointRepeat(sprite, xer, yer, dist);
                }
                animateBaseSprite(spriteCr, xer, yer, dist);
            }

            let count = 0;

            var jbs = function () {
                count++;
                rightRound(50*count,7,count);
            };

            var rightRound = function (dist,symet,count) {
                
                for (var i = 0, max = symet; i < max; i++) {
                    
                    let an = ((Math.PI*2) / max) * i;
                    
                    let x = game.world.centerX + Math.sin(an) * dist;
                    let y = game.world.centerY + Math.cos(an) * dist;
                    
                    newCirclerSprite(x, y, 3*count, Math.pow(0.62, count), Math.pow(0.62, count));
                    
                }
                
            };

            //newCirclerSprite(game.world.centerX, game.world.centerY, 0, 0.9, 1);

            game.time.events.loop(Phaser.Timer.SECOND * 5, jbs, this);

        }

        function update() {
        }

    };
}
;

$('document').ready(function () {
    codeArtStage.init();
});
