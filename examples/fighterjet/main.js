"use strict";

var movie;

function setup() {
    var frames = [];

    for(var i = 0; i < 30; i++) {
        var val = i < 10 ? '0' + i : i;
        frames.push(PIXI.Texture.fromFrame('rollSequence00' + val + '.png'));
    }

    movie = new PIXI.MovieClip(frames);
    movie.position.set(300, 300);
    movie.anchor.set(0.5, 0.5);
    movie.play();
    movie.animationSpeed = 0.5;
    Core.stage.addChild(movie);

    Core.gameLoop(update);
}

function update(dt) {
    movie.rotation += 0.01;
}

window.onload = function() {
    Core.setup(800, 600, 'canvas');
    Core.stage.setBackgroundColor(0xffffff);

    var loader = new PIXI.AssetLoader(['fighter.json']);
    loader.onComplete = setup;
    loader.load();
};
