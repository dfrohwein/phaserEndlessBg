if (paralaxxer == null) {
    var paralaxxer = function (game, keys, speedMulti) {
        console.log(keys);
        paralaxxer.game = game;
        paralaxxer.bgs = [];
        var game = game;

        for (var i = 0; i < keys.length; i++) {

            var backgroundBase = game.make.bitmapData(game.world.width * 2, game.world.height);
            var xWalk = 0;
            var tempSprite = game.add.sprite(0, 0, keys[i]);
            while (xWalk < game.world.width + tempSprite.width) {
                backgroundBase.draw(tempSprite, xWalk, 0);
                xWalk += tempSprite.width;
            }

            var bgNew = {
                group: game.add.group(),
                bmdSprite: game.add.sprite(i * 100, 0, backgroundBase)
            };

            bgNew.bmdSprite.pSpeed = (i + 1) * speedMulti;
            bgNew.bmdSprite.pTween = {};
            bgNew.bmdSprite.pTileWidth = tempSprite.width;

            paralaxxer.bgs.push(bgNew);

            tempSprite.destroy();
        }

        var bgs = paralaxxer.bgs;
        paralaxxer.run = function () {
            for (var i = 0; i < bgs.length; i++) {
                var toTween1 = bgs[i].bmdSprite;

                var tweenIt = function (toTween) {
                    toTween.pTween = game.add.tween(toTween);
                    toTween.pTween.to({
                        x: -toTween.pTileWidth
                    },
                            toTween.pSpeed * 1000);
                    toTween.pTween.start();
                    var repeatParall = function (a) {
                        if (a.x <= -a.pTileWidth) {
                            a.x = 0;
                        }
                        tweenIt(a);
                    };
                    toTween.pTween.onComplete.add(repeatParall, this);
                };

                tweenIt(toTween1);
            }
        };
        paralaxxer.run();

        paralaxxer.pause = function () {
            for (var i = 0; i < paralaxxer.bgs.length; i++) {
                paralaxxer.bgs[i].bmdSprite.pTween.pause();
            }
        };

        paralaxxer.resume = function () {
            for (var i = 0; i < paralaxxer.bgs.length; i++) {
                paralaxxer.bgs[i].bmdSprite.pTween.resume();
            }
        };

        paralaxxer.remove = function () {
            for (var i = 0; i < paralaxxer.bgs.length; i++) {
                paralaxxer.bgs[i].bmdSprite.pTween.stop();
                paralaxxer.bgs[i].bmdSprite.pTween = null;
                paralaxxer.bgs[i].bmdSprite.pseed = null;
                paralaxxer.bgs[i].pTileWidth = null;
                paralaxxer.bgs[i].bmdSprite.destroy();
                paralaxxer.bgs[i].group.destroy();
            }
            paralaxxer.game = null;
            paralaxxer.bgs = null;
        };
    };
}


