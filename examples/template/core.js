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

    Q.keyboard = {
        init: function() {
            this.pressedKeys = {};
            this.specialKeys = {
                9 : 'ENTER',
                15: 'COMMAND',
                16: 'SHIFT',
                17: 'CONTROL',
                27: 'ESC',
                32: 'SPACE',
                33: 'PAGEUP',
                34: 'PAGEDOWN',
                35: 'END',
                36: 'HOME',
                37: 'LEFT',
                38: 'UP',
                39: 'RIGHT',
                40: 'DOWN',
                45: 'INSERT',
                65: 'A',
                68: 'D',
                83: 'S',
                87: 'W'
            };
            var me = this;
            document.addEventListener('keydown', function(e) {
                me.setKey.call(me, e, true);
                e.preventDefault()
            });

            document.addEventListener('keyup', function(e) {
                me.setKey.call(me, e, false);
                e.preventDefault()
            });
        },
        setKey: function(event, status) {
            var code = event.keyCode;
            if(code in this.specialKeys) {
                this.pressedKeys[this.specialKeys[code]] = status;
            }
            else {
                this.pressedKeys[String.fromCharCode(code)] = status;
            }
        },
        isKeyDown: function(key) {
            return this.pressedKeys[key.toUpperCase()];
        }
    };

    root.Core = Q;
}).call(this);
