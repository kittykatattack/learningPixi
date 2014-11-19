Learning Pixi
=============

A step-by-step introduction to making games and interactive media with
the Pixi rendering engine.

Introduction
------------

Pixi’s is an extrmely fast 2D sprite rendering engine. What does that
mean? It means that it helps you to display, animate and manage
interactive graphics so that it's easy for you to make games using
JavaScript and other HTML5 technologies. It has a sensible,
uncluttered API and includes many useful features, like supporting
texture atlases and providing a streamlined system for animating
sprites. It also gives you a complete scene graph so that you can
create hierarchies of nested sprites (sprites inside sprites), as well
as letting you attach mouse and touch events directly to sprites. And,
most
importantly, Pixi gets out or your way so that you can use as much or
as little of it as you want to, adapt it to your personal coding
style, and integrate it seamlessly with other useful frameworks.

Pixi’s API is actually a refinement of a well-worn and battle-tested API pioneered by Macromedia/Adobe Flash. Old-skool Flash developers will feel right at home. Other current sprite rendering frameworks use a similar API: CreateJS, Starling, Sparrow and Apple’s SpriteKit. The strength of Pixi’s API is that it’s general-purpose: it’s not a game framework. That’s good because it gives you total expressive freedom to make anything you like, and wrap your own custom game engine around it.

In this tutorial you’re going to find out how to combine Pixi’s
powerful image rendering features and scene graph with to start making
games. You’re also going to learn how to prepare your game graphics
with a texture atlas, how to make particle effects using the Proton
particle engine, and how to integrate Pixi into your own custom game
engine.

What do you need to know before you get started with this tutorial? 

You should have a reasonable understanding of HTML and
JavaScript. You don't have to be an expert, just an ambitious beginner
with an eagerness to learn. If you don't know HTML and JavaScript, the
best place to start learning it is this book:

[Foundation Game Design with HTML5 and JavaScript](http://www.apress.com/9781430247166)

I know for a fact that it's the best book, because I wrote it :)

There are also some good internet resources to help get you started:

[Khan Academy: Computer
Programming](http://www.khanacademy.org/computing/cs)

[Code Academy:
JavaScript](http://www.codecademy.com/tracks/javascript)

Ok, got it?
Do you know what JavaScript variables, functions, arrays and objects are and how to
use them? 

Pixi also requires a webserver to run. Do you know what a webserver is and
how to launch one in your project folder? The best way is to use
[node.js](http://nodejs.org) and then to install the extremely easy to use
[http-server](https://github.com/nodeapps/http-server). However, you need to be comfortable working with the Unix
command line if you want to do that. You can learn how to use
Unix [in this
video](https://www.youtube.com/watch?feature=player_embedded&v=cX9ASUE3YAQ)
and, when you're finished, follow it with [this
video](https://www.youtube.com/watch?v=INk0ATBbclc). You should learn
how to use Unix
- it only takes a couple of hours and is way fun and easy than working
  with a windows-based operating system.

But if you don't want to mess with the command line, try the Mongoose
webserver:

[Mongoose](http://cesanta.com/mongoose.shtml)

Or, just use write your all your code using the [Brackets text
editor](http://brackets.io). Brackets automatically launches a webserver
and browser for you when you click the lightening bolt button.

Now if you think you're ready, read on!

### Setting up

Before you start writing any code, Create a folder for your project, and launch a
webserver in the project's root directory.

Download the latest version of Pixi at the GitHub
repository:

[Pixi's GitHub Repo](https://github.com/GoodBoyDigital/pixi.js/)

And copy it into a folder called `pixi.js` relative to your root
project directory. 

If you're using [git](http://git-scm.com) and the command line, `cd`
into your root directory and type:
```
git clone git@github.com:GoodBoyDigital/pixi.js.git
```
This automatically creates
a folder called `pixi.js` and loads the latest version of Pixi into it.
What is **git**? If you don't know [you can find out
here](http://www.kittykatattack.com/#gettingstartedwithgit).

After Pixi is installed, create a basic HTML page, and use a
`<script>` tag to include the
`pixi.js` file from Pixi's `bin` folder. The `<script>` tag's `src`
should be relative to your root directory where you webserver is
running. 
```
<script src="pixi.js/bin/pixi.js"></script>
```
In this **Learning Pixi** repository (what you're reading now!) you'll find a folder called
`examples`. Open it and you'll a file called `helloWorld.html`.
Assuming that the wesberver is running in this repository's root directory, this is
how the `helloWorld.html` file correctly links to Pixi and checks that it's
working:
```
<!doctype html>
<meta charset="utf-8">
<title>Hello World</title>
<body>
<script src="../pixi.js/bin/pixi.js"></script>
<script>

//Test that Pixi is working
console.log(PIXI);

</script>
</body>
```
This is the [minimal amount of HTML](http://stackoverflow.com/questions/9797046/whats-a-valid-html5-document) you need to start creating projects
with Pixi. If Pixi is linking correctly, `console.log(PIXI)` will
display something like this in your web browser's JavaScript console:
```
Object {WEBGL_RENDERER: 0, CANVAS_RENDERER: 1...
```
If you see that (or something similar), you know everything is working properly.

Now you can start using Pixi!

### Creating the stage and renderer

Pixi uses a special object called the `Stage` as a container for
displaying graphics and sprites. It also has a `renderer` that
automatically generates an HTML `<canvas>` element for you, and figures out how
to display your images on the canvas. 

Here’s how to create a black 265 pixel by 256 pixel canvas, and add it to your
HTML document. Add this code between the `<script>` tags.
```
var stage = new PIXI.Stage(0x000000);
var renderer = PIXI.autoDetectRenderer(
  256, 256,
  {antialiasing: false, transparent: false, resolution: 1}  
);
document.body.appendChild(renderer.view);
```
Here's what this looks like in a browser when you run this code.

![Basic display](/examples/images/screenshots/01.png);

Yay, a [black square](http://rampantgames.com/blog/?p=7745)!

The `renderer.view` object is just a plain old ordinary `<canvas>`
object, so you can control it the same way you would control any other
canvas object. Here's how to give the canvas an optional dashed
border.
```
renderer.view.style.border = "1px dashed black";
```
If you need to change the background color of the canvas after you’ve
created it, use the `Stage` object’s `setBackgroundColor` method:
```
stage.setBackgroundColor(anyHexColorValue);
```
To change the size of the canvas, use the `renderer`’s `resize`
method, and supply any new `width` and `height` values:
```
renderer.resize(512, 512);
```
If you want make the canvas fill the entire window, you can apply this
CSS styling:
```
renderer.view.style.position = "absolute"
renderer.view.style.width = window.innerWidth + "px";
renderer.view.style.height = window.innerHeight + "px";
renderer.view.style.display = "block";
```
Pixi’s `autoDetectRenderer` method figures out whether to use the
Canvas Drawing API or WebGL to render graphics, depending on which is
available. The first two arguments are the width and height of the
canvas, the third is an object with some optional values you can set
```
renderer = PIXI.autoDetectRenderer(
  256, 256,
  {antialiasing: false, transparent: false, resolution: 1}  
);
```
That third argument is optional - if you're happy with Pixi's default
settings you can leave it out, and there's usually no need to change
them. (But, if you need to, see Pixi's documentation on the [canvas
render](http://www.goodboydigital.com/pixijs/docs/classes/CanvasRenderer.html)
and [WebGLRenderer](http://www.goodboydigital.com/pixijs/docs/classes/WebGLRenderer.html) for more information about what those
options do.)

What do those options do? 
```
{antialiasing: false, transparent: false, resolution: 1}  
```
`antialiasing` smooths the edges of fonts and graphic primitives. (WebGL
Anti-aliasing isn’t available on all platforms, so you’ll need to test
this on your game’s target platform.) `transparent` makes the canvas
background transparent. `resolution` makes it easier to work with
displays of varying resolutions and pixel densities. This is a little
outside the scope of this tutorial, but check out [Mat Grove's
explanation](http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/)
about how to use `resolution` for all the details. But usually, just keep `resolution`
at 1 for most projects and you'll be fine.

The renderer will default to WebGL, which is good, because WebGL is
incredibly fast, and lets you use some spectacular visual effects that
you’ll learn all about ahead. But if you need to force Canvas Drawing
API rendering over WebGL, you can do it like this:
```
renderer = new PIXI.CanvasRenderer(256, 256);
```
Only the first two arguments are required: width and height. 

You can force WebGL rendering like this:
```
renderer = new PIXI.WebGLRenderer(256, 256);
```




