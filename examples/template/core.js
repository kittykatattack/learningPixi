(function() {
    'use strict';

    var root = this,
        Q = Q || {};

    Q.version = "v0.0.1";
    Q.stage = null;
    Q.renderer = null;
    Q.canvas = null;
    Q.context = null;
    Q.width = null;
    Q.height = null;

    Q.setup = function(width, height, canvasId) {
        Q.width = width || 640;
        Q.height = height || 480;

        Q.stage = new PIXI.Stage();

        if(!canvasId) {
            Q.renderer = PIXI.autoDetectRenderer(Q.width, Q.height, {antialiasing: false, transparent: false, resolution: 1});
            document.body.appendChild(Q.renderer.view);
        }
        else {
            var canvas = document.getElementById(canvasId);
            Q.renderer = PIXI.autoDetectRenderer(Q.width, Q.height, {view: canvas, antialiasing: false, transparent: false, resolution: 1});
        }

        Q.canvas = Q.renderer.view;
        Q.context = Q.renderer.context;
    };

    Q.gameLoop = function(callback) {
        var then = null,
            maxStep = 1 / 30,
            loopId = null;

        function update(now) { // now is milli seconds
            loopId = window.requestAnimationFrame(update, Q.canvas);

            // Calculate the time since last update (in seconds)
            var dt = (now - (then || now)) / 1000.0;

            if(dt > maxStep) { dt = maxStep; }

            // use dt to express all movements in pixels/second units.
            // Movement then becomes x += 50 * dt, or "50 pixels per second".
            callback(dt);

            // render the stage
            Q.renderer.render(Q.stage);

            then = now;
        }

        Q.resume = function() {
            if(!loopId) {
                then = null;
                loopId = window.requestAnimationFrame(update, Q.canvas);
            }
        };

        Q.pause = function() {
            if(loopId) {
                window.cancelAnimationFrame(loopId);
            }
            loopId = null;
        };

        loopId = window.requestAnimationFrame(update, Q.canvas);
    };

    Q.Keyboard = function(keyCode) {
        this.keyCode = keyCode;
        this.isDown = false;
        this.isUp = true;
        this.press = null;
        this.release = null;

        this.enable();
    };

    Q.Keboard.Keys = {
        ENTER: 9,
        COMMAND: 15,
        SHIFT: 16,
        CONTROL: 17,
        ESC: 27,
        SPACE: 32,
        PAGEUP: 33,
        PAGEDOWN: 34,
        END: 35,
        HOME: 36,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        INSERT: 45,
        A: 65,
        D: 68,
        S: 83,
        W: 87
    };

    Q.Keyboard.prototype.downHandler = function(event) {
        if(event.keyCode === this.keyCode) {
            if(this.isUp && this.press) this.press();
            this.isDown = true;
            this.isUp = false;
        }
        event.preventDefault();
    };

    Q.Keyboard.prototype.upHandler = function(event) {
        if(event.keyCode === this.keyCode) {
            if(this.isDown && this.release) this.release();
            this.isDown = false;
            this.isUp = true;
        }
        event.preventDefault();
    };

    Q.Keyboard.prototype.enable = function() {
        window.addEventListener('keydown', this.downHandler.bind(this), false);
        window.addEventListener('keyup', this.upHandler.bind(this), false);
    };

    Q.Keyboard.prototype.disable = function() {
        window.removeEventListener('keydown', this.downHandler.bind(this), false);
        window.removeEventListener('keyup', this.upHandler.bind(this), false);
    };

    // Returns a random number between min and max
    Q.random = function(min, max) {
        if(max === undefined) {
            max = min;
            min = 0;
        }
        return Math.random() * (max - min) + min;
    };

    // Returns a random integer between min and max
    // Using Math.round() will give you a non-uniform distribution!
    Q.randomInt = function(min, max) {
        if(max === undefined) {
            max = min;
            min = 0;
        }
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    root.Core = Q;
}).call(this);
