if (!ctEmitter) {
    var ctEmitter = {};
    ctEmitter.start = function (g, graphicsName, layer) {
        game = g;
        emitter = game.add.emitter(codeArtStage.game.width+100, -50, 150);
        //	This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        emitter.width = 15;
        emitter.height = 15;
        emitter.makeParticles(graphicsName);
        layer.add(emitter);
        // emitter.minParticleSpeed.set(0, 300);
        // emitter.maxParticleSpeed.set(0, 600);
        var speedX = 1.5;
        var speedY = 2.5;
        emitter.blendMode = 10;
        emitter.setRotation(0, 0);
        emitter.setAlpha(0.1, 1, 3000);
        var scale = 1;
        emitter.setScale(1.5*scale, 0.2*scale, 1.5*scale, 0.2*scale, 2800, null/*Phaser.Easing.Sinusoidal.Out*/, true);
        emitter.gravity = -30;
        emitter.setXSpeed(-200 * speedX, -200 * speedX);
        emitter.setYSpeed(100 * speedY, 90 * speedY);
        emitter.start(false, 5000, 120);

        var tweensE = function () {
            var time = 500+Math.random()*2000;
            var time1 = 2500+Math.random()*10;
            var tw = game.add.tween(emitter).to({emitX: codeArtStage.game.width + 200}, time, Phaser.Easing.Linear.None, true);
            tw.yoyo(true);
            var tw1 = game.add.tween(emitter).to({emitY: -100}, time1, Phaser.Easing.Linear.None, true);
            tw1.yoyo(true);
            tw1.onComplete.add(function () {
                tweensE();
            });
        };
        tweensE();

    };
}
