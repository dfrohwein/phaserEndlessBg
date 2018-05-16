if (paralaxxer == null) {
    var paralaxxer = function (game) {
        this.game = game;
        this.bgs = [];
        var game = game;
        var speed = 10000;
        var bgs = this.bgs;
        var that = this;

        this.newPanorama = function (keys, ys, speedMulti) {
            for (var i = 0; i < keys.length; i++) {

                var backgroundBase = game.make.bitmapData(game.world.width * 2, game.world.height);
                var xWalk = 0;
                var repeats = 0;
                var tempSprite = game.add.sprite(0, 0, keys[i]);
                while (xWalk < game.world.width * 2) {
                    backgroundBase.draw(tempSprite, xWalk, ys[i] * game.world.height);
                    xWalk += tempSprite.width;
                    repeats++;
                }

                var bgNew = {
                    bmdSprite: game.add.sprite(i * 100, 0, backgroundBase)
                };

                speed *= speedMulti;
                bgNew.bmdSprite.pSpeed = speed;
                bgNew.bmdSprite.pTween = {};
                bgNew.bmdSprite.pRepeats = Math.ceil(repeats / 2);
                bgNew.bmdSprite.pTileWidth = tempSprite.width;

                that.bgs.push(bgNew);

                tempSprite.destroy();
            }

            for (var i = 0; i < bgs.length; i++) {
                var toTween1 = bgs[i].bmdSprite;

                var tweenIt = function (toTween) {
                    toTween.pTween = game.add.tween(toTween);
                    toTween.pTween.to({
                        x: -toTween.pTileWidth * toTween.pRepeats
                    },
                            toTween.pSpeed);
                    toTween.pTween.start();
                    var repeatParall = function (a) {
                        a.x = 0;
                        tweenIt(a);
                    };
                    toTween.pTween.onComplete.add(repeatParall, this);
                };

                tweenIt(toTween1);
            }
        };


        this.pause = function () {
            for (var i = 0; i < that.bgs.length; i++) {
                that.bgs[i].bmdSprite.pTween.pause();
            }
        };

        this.resume = function () {
            for (var i = 0; i < that.bgs.length; i++) {
                that.bgs[i].bmdSprite.pTween.resume();
            }
        };

        this.remove = function () {
            for (var i = 0; i < that.bgs.length; i++) {
                that.bgs[i].bmdSprite.pTween.stop();
                that.bgs[i].bmdSprite.pTween = null;
                that.bgs[i].bmdSprite.pSpeed = null;
                that.bgs[i].bmdSprite.pRepeats = null;
                that.bgs[i].pTileWidth = null;
                that.bgs[i].bmdSprite.destroy();
            }
            that.game = null;
            that.bgs = null;
        };

        this.newSpriteLine = function (key, yPercent, speed, group) {
            var sp = this
            if (group == null) {
                sp.group = game.add.group();
            } else {
                sp.group = group;
            }

            var xWalk = 0;
            var y = game.world.height * yPercent;
            while (xWalk <= game.world.width + 500) {
                sp.sprite = game.add.sprite(game.world.width + xWalk, y, key);
                sp.group.add(sp.sprite);
                xWalk += sp.sprite.width;

                var toTween1 = sp.sprite;

                var tweenIt = function (toTween) {

                    toTween.pTween = game.add.tween(toTween);
                    toTween.pTween.to({
                        x: toTween.x - toTween.width
                    },
                            4000 / speed);
                    toTween.pTween.start();
                    var repeatParall = function (a) {
                        if (a.x <= -a.width) {
                            a.x = game.world.width;
                        }
                        tweenIt(a);
                    };
                    toTween.pTween.onComplete.add(repeatParall, this);

                };

                tweenIt(toTween1);

            }
            return group;
        };

        this.newPaintable = function (speed, widthMulti) {

            if (widthMulti == null) {
                widthMulti = 1.5;
            }

            var backgroundBase = game.make.bitmapData(game.world.width * widthMulti, game.world.height);
            //backgroundBase.draw('re', 100, 100);

            var sprite1 = game.add.sprite(0, 0, backgroundBase);
            var sprite2 = game.add.sprite(game.world.width * widthMulti, 0, backgroundBase);

            var tweenIt = function (toTween) {
                toTween.pTween = game.add.tween(toTween);
                toTween.pTween.to({
                    x: -game.world.width * widthMulti
                },
                        4000 / speed);
                toTween.pTween.start();
                var repeatParall = function (a) {
                    a.x = 0;
                    tweenIt(a);
                };
                toTween.pTween.onComplete.add(repeatParall, this);
            };
            tweenIt(sprite1);

            var tweenIt2 = function (toTween) {

                toTween.pTween = game.add.tween(toTween);
                toTween.pTween.to({
                    x: 0
                },
                        4000 / speed);
                toTween.pTween.start();
                var repeatParall2 = function (a) {
                    a.x = game.world.width * widthMulti;
                    tweenIt2(a);
                };
                toTween.pTween.onComplete.add(repeatParall2, this);
            };
            tweenIt2(sprite2);

            return obj = {sprite: sprite1, bg: backgroundBase};
        };

        this.paintSeamlessWidthAtXY = function (paint, x, y, bg) {
            bg.draw(paint, x, y);
            bg.draw(paint, x - bg.width, y);
        };

        this.paintSeamlessSpriteChildrenAutoMoved = function (paint, bg, sprite) {

            for (var i = 0; i < paint.children.length; i++) {
                bg.draw(paint.children[i], paint.children[i].world.x-sprite.x, sprite.y+paint.children[i].world.y);
                bg.draw(paint.children[i], paint.children[i].world.x-sprite.x - bg.width, sprite.y+paint.children[i].world.y);
            }

        };

        return this;
    };
}


