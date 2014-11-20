Learning Pixi
=============

A step-by-step introduction to making games and interactive media with
the Pixi rendering engine.

Introduction
------------

Pixi’s is an extremely fast 2D sprite rendering engine. What does that
mean? It means that it helps you to display, animate and manage
interactive graphics so that it's easy for you to make games and
applications using
JavaScript and other HTML5 technologies. It has a sensible,
uncluttered API and includes many useful features, like supporting
texture atlases and providing a streamlined system for animating
sprites (interactive images). It also gives you a complete scene graph so that you can
create hierarchies of nested sprites (sprites inside sprites), as well
as letting you attach mouse and touch events directly to sprites. And,
most
importantly, Pixi gets out or your way so that you can use as much or
as little of it as you want to, adapt it to your personal coding
style, and integrate it seamlessly with other useful frameworks.

Pixi’s API is actually a refinement of a well-worn and battle-tested
API pioneered by Macromedia/Adobe Flash. Old-skool Flash developers
will feel right at home. Other current sprite rendering frameworks use
a similar API: CreateJS, Starling, Sparrow and Apple’s SpriteKit. The
strength of Pixi’s API is that it’s general-purpose: it’s not a game
engine. That’s good because it gives you total expressive freedom to make anything you like, and wrap your own custom game engine around it.

In this tutorial you’re going to find out how to combine Pixi’s
powerful image rendering features and scene graph to start making
games. You’re also going to learn how to prepare your game graphics
with a texture atlas, how to make particle effects using the Proton
particle engine, and how to integrate Pixi into your own custom game
engine. But Pixi isn't just for games - you can use these same
techniques to create any interactive media applications.

What do you need to know before you get started with this tutorial? 

You should have a reasonable understanding of HTML and
JavaScript. You don't have to be an expert, just an ambitious beginner
with an eagerness to learn. If you don't know HTML and JavaScript, the
best place to start learning it is this book:

[Foundation Game Design with HTML5 and JavaScript](http://www.apress.com/9781430247166)

I know for a fact that it's the best book, because I wrote it!

There are also some good internet resources to help get you started:

[Khan Academy: Computer
Programming](http://www.khanacademy.org/computing/cs)

[Code Academy:
JavaScript](http://www.codecademy.com/tracks/javascript)

Choose whichever best suits your learning style.

Ok, got it?
Do you know what JavaScript variables, functions, arrays and objects are and how to
use them? 

To use Pixi, you'll also need to run a webserver in your root project
directory. Do you know what a webserver is and
how to launch one in your project folder? The best way is to use
[node.js](http://nodejs.org) and then to install the extremely easy to use
[http-server](https://github.com/nodeapps/http-server). However, you need to be comfortable working with the Unix
command line if you want to do that. You can learn how to use
Unix [in this
video](https://www.youtube.com/watch?feature=player_embedded&v=cX9ASUE3YAQ)
and, when you're finished, follow it with [this
video](https://www.youtube.com/watch?v=INk0ATBbclc). You should learn
how to use Unix - it only takes a couple of hours to learn and is a
really fun and easy way to interact with your computer.

But if you don't want to mess around with the command line just yet, try the Mongoose
webserver:

[Mongoose](http://cesanta.com/mongoose.shtml)

Or, just use write your all your code using the excellent [Brackets text
editor](http://brackets.io). Brackets automatically launches a webserver
and browser for you when you click the lightening bolt button in its
main workspace.

Now if you think you're ready, read on!

###Setting up

Before you start writing any code, Create a folder for your project, and launch a
webserver in the project's root directory.

Download the latest version of Pixi at Pixi's GitHub
repository:

[Pixi's GitHub Repo](https://github.com/GoodBoyDigital/pixi.js/)

... and copy it into a folder called `pixi.js` relative to your root
project directory. 

If you're using [git](http://git-scm.com) and the command line, then `cd`
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
running. Your `<script>` tag might look something like this: 
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
HTML document. Add this code in your HTML document between the `<script>` tags.
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
That third argument (the options object) is optional - if you're happy with Pixi's default
settings you can leave it out, and there's usually no need to change
them. (But, if you need to, see Pixi's documentation on the [canvas
render](http://www.goodboydigital.com/pixijs/docs/classes/CanvasRenderer.html)
and
[WebGLRenderer](http://www.goodboydigital.com/pixijs/docs/classes/WebGLRenderer.html)
for more information.)

What do those options do? 
```
{antialiasing: false, transparent: false, resolution: 1}  
```
`antialiasing` smoothes the edges of fonts and graphic primitives. (WebGL
Anti-aliasing isn’t available on all platforms, so you’ll need to test
this on your game’s target platform.) `transparent` makes the canvas
background transparent. `resolution` makes it easier to work with
displays of varying resolutions and pixel densities. Setting
resolutions is a little
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
Only the first two arguments are required: `width` and `height`. 

You can force WebGL rendering like this:
```
renderer = new PIXI.WebGLRenderer(256, 256);
```

###Pixi sprites

In the previous section you learned how to create a `Stage` object.
You can think of the stage as the main container for all the visible
things in your game. Whatever you put inside the stage will be
rendered on the canvas.

So what do you put on the stage? Special image objects called
**sprites**. Sprites are basically just images that you can control
with code. You can control their position, size, and a host of other
properties that are useful for making interactive graphics. Learning to make and control sprites is really the most
important thing about learning to use Pixi. If you know how to make
sprites and add them to the stage, you're just a small step away from
starting to makes games.

Pixi has a `Sprite` class that is a versatile way to make game
sprites. There are three main ways to create them:

•	From a single image file.
•	From a sub-image on a **tileset**. A tileset is a single, big image that
includes all images you'll need in your game.
•	From a **texture atlas** (A JSON file that defines the size and position of an image on a tileset.)

You’re going to learn all three ways, but, before you do, let’s find
out what you need to know about images before you can display them
with Pixi.

#### Loading images into the texture cache

Because Pixi renders the image on the GPU with WebGL, the image needs
to be in a format that the GPU can process. A WebGL-ready image is
called a **texture**. Before you can make a sprite display an image,
you need to convert an ordinary image file into a WebGL texture. To
keep everything working fast and efficiently under the hood, Pixi uses
a **texture cache** to store and reference all the textures your
sprites will need. The names of the textures are strings that match
the file locations of the images they refer to. That means if you have
a texture that was loaded from `“images/cat.png”`, you could find it in the texture cache like this:
```
PIXI.TextureCache["images/cat.png"];
```
The textures are stored in a WebGL compatible format that’s efficient
for Pixi’s renderer to work with. You can then use Pixi’s `Sprite` class to make a new sprite using the texture.
```
var texture = PIXI.TextureCache["images/anySpriteImage.png"];  
var sprite = new PIXI.Sprite(texture);
```
But how do you load the image file and convert it into a texture? You
can use Pixi’s built-in `AssetLoader`. Here’s how to use it to load an
image and call a function called `setup` when it’s ready to create the sprite:
```
var loader = new PIXI.AssetLoader(["images/cat.png"]);
loader.onComplete = setup;
loader.load();

function setup() {

  //Create the `cat` sprite from the texture
  var texture = PIXI.TextureCache["images/cat.png"],
      cat = new PIXI.Sprite(texture);
}
```
You can load multiple images at single time by listing them in the `AssetLoader`'s argument array,
like this:
```
var loader = new PIXI.AssetLoader(
  ["images/imageOne.png"],
  ["images/imageTwo.png"],
  ["images/imageThree.png"]
);
```
(The `AssetLoader` also lets you load JSON files, which you'll learn
about ahead.)

Alternatively, you can use Pixi’s `Texture.fromImage` method to load
and create the texture in a single step.
`fromImage` will load the image for you automatically from its file location if it’s not already in the cache.
```
var texture = PIXI.Texture.fromImage(“images/cat.png”);
```
That means if you want to be lazy, you don’t need to pre-load the
image. However,
loading and creating a texture using `fromImage` like this doesn't allow you to make sure all you images have
loaded before the game or application starts. If you try and access
or use a sprite in your game code before the image has fully loaded, things won't work and you're going to get errors. So
my advice is: don't use `fromImage`, just pre-load all the images
you'll need with the `AssetLoader`.

For optimization and efficiency it’s always best to make a sprite from
a texture that’s been pre-loaded into Pixi’s texture cache. But if for
some reason you need to make a texture from a regular JavaScript Image
object, you can do that using Pixi’s `BaseTexture` class:
```
var base = new PIXI.BaseTexture(anyImageObject),
    texture = new PIXI.Texture(base),
    sprite = new PIXI.Sprite(texture);
```
####Displaying sprites

After you've loaded an image, and converted it into a sprite, there
are two more things you have to do before you can actually see it on
the canvas:

1. You need to add the sprite to Pixi's stage with the `stage.addChild` method, like this:
```
stage.addChild(cat);
```
The stage is the main container that holds all of your sprites.

2. You need to tell Pixi's `renderer` to render the stage.
```
renderer.render(stage);
```
None of your sprites will be visible before you do these two things.

Before we continue, let's look at a practical example of how to use what
you've just learnt to display a single image. In the `examples/images`
folder you'll find a 64 by 64 pixel PNG image of a cat.

![Basic display](/examples/images/cat.png)

Here's the All the JavaScript code you to load the image, create a
sprite, and display it on Pixi's stage:
```
//Create the Pixi `Stage` and `renderer`
var stage = new PIXI.Stage(0x000000)
var renderer = PIXI.autoDetectRenderer(
  256, 256,
  {antialiasing: false, transparent: false, resolution: 1}  
);
document.body.appendChild(renderer.view);

//Use Pixi's built-in `AssetLoader` to load an image and call
//the `setup` function when its ready
var loader = new PIXI.AssetLoader(["images/cat.png"]);
loader.onComplete = setup;
loader.load();

function setup() {

  //Create the `cat` sprite from the texture
  var texture = PIXI.TextureCache["images/cat.png"],
      cat = new PIXI.Sprite(texture);

  //Add the cat to the stage
  stage.addChild(cat);

  //Render the stage 
  renderer.render(stage);
}
```
When this code runs, here's what you'll see:

![Cat on the stage](/examples/images/screenshots/02.png)

Now we're getting somewhere!

If you ever need to remove a sprite from the stage, use the `removeChild` method: 
```
stage.removeChild(anySprite) 
```
But usually setting a sprite’s `visible` property to `false` will be a simpler and more efficient way of making sprites disappear.
```
anySprite.visible = false;
```

####Positioning sprites

You can see in the previous example that has been cat was added to stage at
the top left corner. The cat at a `x` position of
0 and a `y` position of 0. You can change the position of the cat by
changing the values of is `x` and `y` properties. Here's how you can center the cat in the stage by
setting its `x` and `y` property values to 96. 
```
cat.x = 96;
cat.y = 96;
```
Add these two lines of code anywhere inside the `setup`
function, after you've created the sprite.
```
function setup() {

  //Create the `cat` sprite from the texture
  var texture = PIXI.TextureCache["images/cat.png"],
      cat = new PIXI.Sprite(texture);

  //Change the sprite's position
  cat.x = 96;
  cat.y = 96;

  //Add the cat to the stage so you can see it
  stage.addChild(cat);

  //Render the stage 
  renderer.render(stage);
}
```
These two new lines of code will move the cat 96 pixels to the right,
and 96 pixels down. Here's the result:

![Cat centered on the stage](/examples/images/screenshots/03.png);

The cat's top left corner (its left ear) represents its `x` and `y`
anchor point. To make the cat move to the right, increase the
value of its `x` property. To make the cat move down, increase the
value of its `y` property. If the cat has an `x` of 0, it will be at
the very left side of the stage. If it has a y property of 0, it will
be at the very top of the stage.

![Cat centered on the stage - diagram](/examples/images/screenshots/04.png);

Instead of setting the sprite's `x` and `y` properties independently,
you can set them together in a single like of code, like this:
```
sprite.position.set(x, y)
```

####Size and scale

You can change a sprite's size by setting its `width` and `height`
properties. Here's how to give the cat a `width` of 80 pixels and a `height` of
120 pixels.
```
cat.width = 80;
cat.height = 120;
```
Add those two lines of code to the `setup` function, like this:
```
function setup() {

  //Create the `cat` sprite from the texture
  var texture = PIXI.TextureCache["images/cat.png"],
      cat = new PIXI.Sprite(texture);

  //Change the sprite's position
  cat.x = 96;
  cat.y = 96;
  
  //Change the sprite's size
  cat.width = 80;
  cat.height = 120;

  //Add the cat to the stage so you can see it
  stage.addChild(cat);
}
```
Here's the result:

![Cat's height and width changed](/examples/images/screenshots/05.png);

You can see that the cat's position (its top left corner) didn't
change, only its height and width.

![Cat's height and width changed - diagram](/examples/images/screenshots/06.png);

Sprites also have `scale.x` and `scale.y` properties that change the
sprite's width and height proportionately. Here's how to set the cat's
scale to half size:
```
cat.scale.x = 0.5;
cat.scale.y = 0.5;
```
Scale values are numbers between 0 and 1 that represent a
percentage of the sprite's size. 1 means 100% (full size), while
0.5 means 50% (half size). You can double the sprite's size by setting
its scale values to 2, like this:
```
cat.scale.x = 2;
cat.scale.y = 2;
```
Pixi has a alternative, concise way for you set sprite's scale in one
line of code using the `scale.set` method.
```
cat.scale.set(0.5, 0.5); 
```
If that appeals to you, use it!

####Rotation

You can make a sprite rotate by setting it `rotation` property to a
value in [in
radians](http://www.mathsisfun.com/geometry/radians.html)).
```
cat.rotation = 0.5;
```
But around which point does that rotation happen?

You've seen that a sprite's top left corner represents its `x` and `y` position. That point is
called the **anchor point**. If you set the sprite’s `rotation`
property to something like 0.5, the rotation will happen *around the
sprite’s anchor point*. 
This diagram shows what effect this will have on our cat sprite. 

![Rotation around anchor point - diagram](/examples/images/screenshots/07.png);

You can see that the anchor point, the cat’s left ear, is the center of the imaginary circle around which the cat is rotating. 
What if you want the sprite to rotate around its center? Change the
sprite’s `anchor` point so that it’s centered inside the sprite, like
this:
```
cat.anchor.x = 0.5;
cat.anchor.y = 0.5;
```
The `anchor.x` and `anchor.y` values represent a percentage of the texture’s dimensions, from 0 to 1 (0%
to 100%). Setting it to 0.5 centers the texture over the point. The location of the point
itself won’t change, just the way the texture is positioned over it.

This next diagram shows what happens to the rotated sprite if you center its anchor point. 

![Rotation around centered anchor point - diagram](/examples/images/screenshots/08.png);

You can see that the sprite’s texture shifts up and to the left. This
is an important side-effect to remember!

Just like with `position` and `scale`, you can set the anchor’s x and
y values with one line of code like this: 
```
sprite.anchor.set(x, y) 
```




