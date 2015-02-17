'use strict';

function setup() {
    Core.gameLoop(update);
}

function update(dt) {

}

window.onload = function() {
    Core.setup(640, 480, 'canvas');
    // Core.stage.setBackgroundColor(0x66FF66);

    var assets = ['../images/cat.png'];
    var loader = new PIXI.AssetLoader(assets);
    loader.onComplete = setup;
    loader.load();
 };
