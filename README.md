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
use them? Do you know what [JSON data files](http://www.copterlabs.com/blog/json-what-it-is-how-it-works-how-to-use-it/) are?

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

Setting up
----------

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

Creating the stage and renderer
-------------------------------

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

Pixi sprites
------------

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

Loading images into the texture cache
-------------------------------------

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
If you want to change the texture the sprite is displaying, use the
`setTexture` method. Supply it with any `Texture` object, like this:
```
anySprite.setTexture(PIXI.TextureCache["anyTexture.png"]);
```  
You can use this technique to interactively change the sprite’s appearance if something significant happens to it in the game.

Displaying sprites
------------------

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

Positioning sprites
-------------------

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

![Cat centered on the stage](/examples/images/screenshots/03.png)

The cat's top left corner (its left ear) represents its `x` and `y`
anchor point. To make the cat move to the right, increase the
value of its `x` property. To make the cat move down, increase the
value of its `y` property. If the cat has an `x` of 0, it will be at
the very left side of the stage. If it has a y property of 0, it will
be at the very top of the stage.

![Cat centered on the stage - diagram](/examples/images/screenshots/04.png)

Instead of setting the sprite's `x` and `y` properties independently,
you can set them together in a single like of code, like this:
```
sprite.position.set(x, y)
```

Size and scale
--------------

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

![Cat's height and width changed](/examples/images/screenshots/05.png)

You can see that the cat's position (its top left corner) didn't
change, only its height and width.

![Cat's height and width changed - diagram](/examples/images/screenshots/06.png)

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

Rotation
--------

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

![Rotation around anchor point - diagram](/examples/images/screenshots/07.png)

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

![Rotation around centered anchor point - diagram](/examples/images/screenshots/08.png)

You can see that the sprite’s texture shifts up and to the left. This
is an important side-effect to remember!

Just like with `position` and `scale`, you can set the anchor’s x and
y values with one line of code like this: 
```
sprite.anchor.set(x, y) 
```

Make a sprite from a tileset sub-image
--------------------------------------

You now know how to make a sprite from a single image file. But, as a
game designer, you’ll usually be making your sprites using
**tilesets** (also known as **spritesheets**.) Pixi has some convenient built-in ways to help you do this.
A tileset is a single image file that contains sub-images. The sub-images
represent all the graphics you want to use in your game. Here's an
example of a tileset image that contains game characters and game
objects as sub-images.

![An example tileset](/examples/images/screenshots/09.png)

The entire tileset is 192 by 192 pixels. Each image s in a its own 32 by 32
pixel grid cell. Storing and accessing all your game graphics on a
tileset is a very
processor and memory efficient way to work with graphics, and Pixi is
optimized for them.

You can capture a sub-image from a tileset by defining a rectangular
area
that's the same size and position as the sub-image you want to
extract. Here's an example of the rocket sub-image that’s been extracted from
the tileset.

![Rocket extracted from tileset](/examples/images/screenshots/10.png)

Let's look at the code that does this. First, load the `tileset.png` image
with Pixi’s `AssetLoader`, just as you did in the first example.
```
var loader = new PIXI.AssetLoader(["images/tileset.png"]);
loader.onComplete = setup;
loader.load();
```
Next, when the image has loaded, use a rectangular sub-section of the tileset to create the
sprite’s image. Here's the code that extracts the sub image, creates
the rocket sprite, and positions and displays it on the canvas.
```
function setup() {

  //Create the `tileset` sprite from the texture
  var texture = PIXI.TextureCache["images/tileset.png"];

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  var rectangle = new PIXI.Rectangle(192, 128, 64, 64);

  //Tell the texture to use that rectangular section
  texture.setFrame(rectangle);

  //Create the sprite from the texture
  var rocket = new PIXI.Sprite(texture);

  //Position the rocket sprite on the canvas
  rocket.x = 32;
  rocket.y = 32;

  //Add the rocket to the stage
  stage.addChild(rocket);
  
  //Render the stage   
  renderer.render(stage);
}

```
How does this work?

Pixi has a built-in `Rectangle` object that is a general-purpose
object for defining rectangular shapes. It takes four arguments. The
first two arguments define the rectangle's `x` and `y` position. The
last two define its size in `width` and `height`. Here's the format
for defining a new `Rectangle` object.
```
var rectangle = new PIXI.Rectangle(x, y, width, height);
```
The rectangle object just a data object; it's up to you to decide how you want to use it. In
our example we're using it to define the position and area of the
sub-image on the tileset that we want to extract. Pixi textures have a useful
method called `setFrame` that takes `Rectangle` objects as arguments
and uses them
to crop the texture to those dimensions. Here's how to use `setFrame`
to crop the texture to the size and position of the rocket.
```
var rectangle = new PIXI.Rectangle(192, 128, 64, 64);
texture.setFrame(rectangle);
```
You can then use that cropped texture create the sprite:
```
var rocket = new PIXI.Sprite(texture);
```
And that's how it works! 

Because making sprite textures from a tileset
is something you’ll do with great frequency, Pixi has a more convenient way
to help you do this - let's find out what that is next.

Using a texture atlas
---------------------

If you’re working on a big, complex game, you’ll want a fast and
efficient way to create sprites from tilesets. This is where a
**texture atlas** becomes really useful. A texture atlas is a JSON
data file that contains the positions and sizes of sub-images on a
matching tileset PNG image. If you use a texture atlas, all you need to know about the sub-image you want to display is its name. You can arrange your tileset images in any order and the JSON file will keep track of their sizes and positions for you. This is really convenient because it means the sizes and positions of tileset images aren’t hard-coded into your game program. If you make changes to the tileset, like adding images, resizing them, or removing them, just re-publish the JSON file and your game will use that data to display the correct images. You won’t have to make any changes to your game code.

Pixi is compatible with a standard JSON texture atlas format that is
output by a popular software tool called [Texture
Packer](https://www.codeandweb.com/texturepacker). Texture Packer’s
“Essential” license is free. Let’s find out how to use it to make a
texture atlas, and load the atlas into Pixi. (You don’t have to use
Texture Packer. Similar tools, like [Shoebox](http://renderhjs.net/shoebox/), output PNG and JSON files
in a standard format that is compatible with Pixi.)

First, start with a collection of individual image files that you'd
like to use in your game.

![Image files](/examples/images/screenshots/11.png)

(All the images in this section were created by Lanea Zimmerman. You
can find more of her artwork
[here](http://opengameart.org/users/sharm).
Thanks, Lanea!)

Next, open Texture Packer and choose **JSON Hash** as the framework
type. Drag your images into Texture Packer's workspace. (You can
also point Texture Packer to any folder that contains your images.)
It will automatically arrange the images on a single tileset image, and give them names that match their original image names. 

![Image files](/examples/images/screenshots/12.png)

(If you're using the free version of
Texture Packer, set **Algorithm** to `Basic`, set **Trim mode** to
`None`, set **Size constraints** to `Any size` and slide the **PNG Opt
Level** all the way to the left to `0`. These the basic
settings that will allow the free version of Texture Packer to create
your files without any warnings or errors.) 

When you’re done, click the **Publish** button. Choose file the name and
location, and save the published files. You’ll end up with 2 files: a
PNG file and a JSON file. In this example my file names are
`treasureHunter.json` and `treasureHunter.png`. To make your life easier,
just keep both files in your project’s `images` folder. (You can think of the JSON file as extra metadata for the image file.)
The JSON file describes the name, size and position of each of the
sub-images
in the tileset. Here’s an excerpt that describes the blob monster
sub-image.
```
"blob.png":
{
	"frame": {"x":55,"y":2,"w":32,"h":24},
	"rotated": false,
	"trimmed": false,
	"spriteSourceSize": {"x":0,"y":0,"w":32,"h":24},
	"sourceSize": {"w":32,"h":24},
	"pivot": {"x":0.5,"y":0.5}
},
```
The `treasureHunter.json` file also contains “dungeon.png”,
“door.png”, "exit.png", and "explorer.png" properties each with
similar data. Each of these sub-images are called **frames**. Having
this data is really helpful because now you don’t need to know the
size and position of each sub-image in the tileset. All you need to
know is the sprite’s **frame id**. The frame id is just the name
of the original image file, like "blob.png" or "explorer.png". 

Among the many advantages to using a texture atlas is that you can
easily add 2 pixels of padding around each image (Texture Packer does
this by default.) This is important to prevent the possibility of
**texture bleed**. Texture bleed is an effect that happens when the
edge of an adjacent image on the tileset appears next to a sprite.
This happens because of the way your computer's GPU (Graphics
Processing Unit) decides how to round fractional pixels values. Should it round them up or down? This will be different for each GPU. Leaving 1 or 2 pixels spacing around images on a tilseset makes all images display consistently.

Now that you know how to create a texture atlas, let's find out how to
load it into you game code.

Loading the texture atlas
-------------------------

To get the texture atlas into Pixi, load it using Pixi’s
`AssetLoader`. If the JSON file was made with Texture Packer, the
`AssetLoader` will interpret the data and create a texture from each
frame on the tileset automatically.  Here’s how to use `AssetLoader` to load the `treasureHunter.json`
file. When it has loaded, the `setup` function will run.
```
var loader = new PIXI.AssetLoader(["images/treasureHunter.json"]);
loader.onComplete = setup;
loader.load();
```
Each image on the tileset is now an individual texture in Pixi’s
cache. You can access each texture in the cache with the same name it
had in Texture Packer (“blob.png”, “dungeon.png”, “explorer.png”,
etc.). 

Creating sprites from a loaded texture atlas
--------------------------------------------

Pixi gives you three alternative ways you can create a sprite from texture
atlas.

-1. Using `PIXI.TextureCache`:
```
var texture = PIXI.TextureCache["frameId.png"],
    sprite = new PIXI.Sprite(texture);
```
-2. Using `PIXI.Texture.fromFrame`:
```
var texture = PIXI.Texture.fromFrame("frameId.png"),
    sprite = new PIXI.Sprite(texture);
```
-3. Using `new PIXI.Sprite.fromFrame`:
```
var sprite = new PIXI.Sprite.fromFrame("frameId.png");
```
Which of these three different ways should you use? They have exactly
the same result, so you might as well just
use the last one - it's less work!

Here's how you could use these three different sprite creation
techniques in the `setup` function to create and display the
`dungeon`, `exlplorer` and `treasure` sprites.
```
//Define any variables that might be used in more 
//than one function
var dungeon, explorer, treasure;

function setup() {

  //There are three ways to make sprites from textures atlas frames

  //1. Access the `TextureCache` directly
  var dungeonTexture = PIXI.TextureCache["dungeon.png"];
  dungeon = new PIXI.Sprite(dungeonTexture);
  stage.addChild(dungeon);

  //2. Access the texture using `Texture.fromFrame`
  var explorerTexture = PIXI.Texture.fromFrame("explorer.png");
  explorer = new PIXI.Sprite(explorerTexture);
  explorer.x = 68;
  //Center the explorer vertically
  explorer.y = stage.height / 2 - explorer.height / 2;
  stage.addChild(explorer);
  
  //3. Make the texture and sprite in 
  //one step using `Sprite.fromFrame`
  treasure = new PIXI.Sprite.fromFrame("treasure.png");
  //Position the treasure next to the right edge of the canvas
  treasure.x = stage.width - treasure.width - 48;
  treasure.y = stage.height / 2 - treasure.height / 2;
  stage.addChild(treasure);

  //Render the stage   
  renderer.render(stage);
}
```
Here's what this code displays:

![Explorer, dungeon and treasure](/examples/images/screenshots/13.png)

The stage dimensions are 512 by 512 pixels, and you can see in the
code above that the `stage.height` and `stage.width` properties are used
to align the sprites. Here's how the `explorer`'s `y` position is
vertically centered:
```
explorer.y = stage.height / 2 - explorer.height / 2;
```
Learning to create and display sprites using a texture atlas is an
important benchmark. So before we continue, let's take a look at the
code you
could write to add the remaining
sprites: the `blob`s and `exit` door, so that you can produce a scene
that looks like this:

![All the texture atlas sprites](/examples/images/screenshots/14.png)

Here's the entire code that does all this. I've also included the HTML
code so you can see everything in its proper context.
(You'll find this working code in the
`examples/spriteFromTextureAtlas.html` file in this repository.)
Notice that the `blob` sprites are created and added to the stage in
loop, and assigned random positions. 
```
<!doctype html>
<meta charset="utf-8">
<title>Make a sprite from a texture atlas</title>
<body>
<script src="../pixi.js/bin/pixi.js"></script>
<script>

//Create a Pixi stage and renderer and add the 
//`renderer.view` to the DOM
var stage = new PIXI.Stage(0x000000)
var renderer = PIXI.autoDetectRenderer(
  512, 512,
  {antialiasing: false, transparent: false, resolution: 1}  
);
document.body.appendChild(renderer.view);

//Load the texture atlas
var loader = new PIXI.AssetLoader(["images/treasureHunter.json"]);
loader.onComplete = setup;
loader.load();

//Define variables that might be used in more 
//than one function
var dungeon, explorer, treasure, door;

function setup() {

  //There are three ways to make sprites from textures atlas frames

  //1. Access the `TextureCache` directly
  var dungeonTexture = PIXI.TextureCache["dungeon.png"];
  dungeon = new PIXI.Sprite(dungeonTexture);
  stage.addChild(dungeon);

  //2. Access the texture using `Texture.fromFrame`
  var explorerTexture = PIXI.Texture.fromFrame("explorer.png");
  explorer = new PIXI.Sprite(explorerTexture);
  explorer.x = 68;
  //Center the explorer vertically
  explorer.y = stage.height / 2 - explorer.height / 2;
  stage.addChild(explorer);
  
  //3. Make the texture and sprite in 
  //one step using `Sprite.fromFrame`
  treasure = new PIXI.Sprite.fromFrame("treasure.png");
  //Position the treasure next to the right edge of the canvas
  treasure.x = stage.width - treasure.width - 48;
  treasure.y = stage.height / 2 - treasure.height / 2;
  stage.addChild(treasure);

  //Make the exit door
  door = new PIXI.Sprite.fromFrame("door.png"); 
  door.position.set(32, 0);
  stage.addChild(door);

  //Make the blobs
  var numberOfBlobs = 6,
      spacing = 48,
      xOffset = 150;

  //Make as many enemies as there are `numberOfBlobs`
  for (var i = 0; i < numberOfBlobs; i++) {

    //Make a blob
    var blob = new PIXI.Sprite.fromFrame("blob.png");

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first enemy should be added.
    var x = spacing * i + xOffset;

    //Give the blob a random y position
    var y = randomInt(0, stage.height - blob.height);

    //Set the blob's position
    blob.x = x;
    blob.y = y;

    //Add the blob sprite to the stage
    stage.addChild(blob);
  }

  //Render the stage   
  renderer.render(stage);
}

//The `randomInt` helper function
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

</script>
</body>

```
You can see in the code above that all the blobs are created using a
`for` loop. Each `blob` is spaced evenly along the `x` axis like this:
```   
var x = spacing * i + xOffset;
blob.x = x;
```
`spacing` has a value 48, and `xOffset` has a value of 150. What this
means that that the first `blob` will have an `x` position of 150.
This offsets it from the left side of the stage by 150 pixel. Each
subsequent `blob` will have an `x` value that's 48 pixels greater than
the `blob` created in the previous iteration of the loop. This creates
an evenly spaced line of blob monsters, from left to right, along the dungeon floor.

Each `blob` is also given a random `y` position. Here's the code that
does this:
```
var y = randomInt(0, stage.height - blob.height);
blob.y = y;
```
The `blob`'s `y` position could be assigned any random number between 0 and
512, which is the value of `stage.height`. This works with the help of
a custom function called `randomInt`. `randomInt` returns a random number
that's within a range between any two numbers you supply.
```
randomInt(lowestNumber, highestNumber)
```
That means if you want a random number between 1 and 10, you can get
one like this:
```
var randomNumber = randomInt(1, 10);
```
Here's the `randomInt` function definition that does all this work:
```
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
`randomInt` is a great little function to keep in your back pocket for
making games - I use it all the time.

Moving Sprites
--------------

Keyboard Movement
-----------------

Simple collision detection
--------------------------

Grouping Sprites
----------------

Displaying text
---------------

Pixi's Graphic Primitives
-------------------------

Treasure Hunter
---------------

Now you know how to load images into the texture cache, create and use
a texture atlas, and make sprites from textures. You even know how to
use a `Rectangle` object to select sections of textures to make a new
texture. All these skills give you a great deal of flexibility and
control over the appearance of sprites, and you’ll ahead how we’ll use all these techniques in some creative ways.
But before we do, let’s take closer look at Pixi’s `Sprite` class. 

Sprite properties and methods
-----------------------------

You've learnt how to use quite a few useful sprites properties so far, like `x`, `y`,
`visible`, and `rotation` that give you a lot of control over a
sprite's position and appearance. But Pixi Sprites also have many more useful properties that are fun to play with.
Before we look at all those properties and methods let’s find
out how Pixi’s class inheritance system works. ([What is a **class**
and what is **inheritence**? Click this link to find out.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)) Pixi’s sprites are
built on an **inheritance*** model that follows this chain:
```
DisplayObject > DisplayObjectContainer > Sprite
```
Inheritance just means that the classes later in the chain use
properties and methods from classes earlier in the chain. 
The most basic class is `DisplayObject`. Anything that’s a
`DisplayObject` can be rendered on the stage. `DisplayObjectContainer`
is the next class in the inheritance chain. It allows `DisplayObject`s
to act as containers for other `DisplayObject`s. Third up the chain is
the `Sprite` class. That’s the class you’ll be using to make most of
your game objects. However, later you’ll learn how to use
`DisplayObjectContainer`s to group sprites together.

Here's a big list all of Pixi’s sprite properties. Most of these have been
inherited from `DisplayObject` and `DisplayObjectContainer`. Some of
these properties, like `x` and `y`, will be very familiar. Others,
like `interactive` and `filters` you’ll learn how to use a little
later in this chapter. This information is adapted directly from
Pixi’s documentation, and you can find the most current list of
properties and methods at here:
www.goodboydigital.com/pixijs/docs/classes/Sprite.html.

- **alpha**: A number between 0 and 1 that determines how transparent
  or opaque the sprite is. 0 is full transparency. 1 makes the sprite
  completely opaque (solid). 0.5 will set the sprite to 50%
  transparency. 
- **anchor**: The origin point of the texture. The default is 0,0
  this means the texture's origin is the sprite’s top left corner.
  Setting the anchor to 0.5,0.5 centers the texture’s registration
  point. Setting the anchor to 1,1 sets the texture’s registration
  point to the bottom right corner. Use `anchor.x` and `anchor.y` to set these
  values, or alternatively, use the `anchor.set` method.
- **blendMode**: Determines how semi-transparent sprites blend with
  sprites that they’re overlapping. You can supply it with any
  `Pixi.blendModes` value. The default value is
  `PIXI.blendModes.NORMAL`.
- **buttonMode**: A Boolean (`true`/`false` value) that determines whether a hand icon should be displayed if the
  pointer is over the sprite. 
- **children**: a read-only array that tells you all the child sprites that this sprite
  contains.
- **defaultCursor**: Sets the cursor that will be used when the mouse is
  over this object. To enable this the sprite must have both its
  `interactive` and `buttonMode` properties set to `true`. It's value
  should be a string that matches any of [the standard CSS cursor
  properties](per.mozilla.org/en-US/docs/Web/CSS/cursor), like `auto`
  or `crosshair`.
- **filters**: An array that lets you manage the visual effect filters on a sprite.
- **width**: The sprite’s width in pixels. (The `width` property
  actually modifies the sprite’s scale to achieve the correct pixel
  width.)
- **height**: The sprite’s height in pixels. (Like `width`, the
  `height` property modifies the sprite’s scale.)
- **hitArea**: Determines the area of a sprite that is sensitive to
  mouse or touch events. Supply it with a `PIXI.Rectangle` object.
  This is just 4 numbers that define a rectangular area in pixels: x,
  y, width and height.
- **interactive**: A Boolean (`true`/`false` value) that determines whether or not the
  sprite responds to mouse or touch events.
- **mask**: Sets a mask for the sprite. A mask is an object that limits
  the visibility of a sprite to the shape of the mask applied to it. . Supply the `mask` property with a A PIXI.Graphics
  object. To remove a mask, set this property to `null`.
- **parent**: A read-only property that tells you the sprite’s parent. This
  could be another sprite, or it could be a `DisplayObjectContainer`
  (which you’ll learn about ahead.)
- **pivot**: A `PIXI.Point` object with `x` and `y` properties that lets you set
  the axis of rotation on the sprite. (There is currently [a
  long-running
  colourful debate going
  on](https://github.com/GoodBoyDigital/pixi.js/issues/997) about how
  `pivot` actually works and how to use
  it - so you might want to avoid using it until the specification stabilizes.)
- **position**: Lets you access and change the sprite’s position like
  this: `position.x`, `position.y`. Or, use the `position.set` method.
- **renderable**: A Boolean value that determines whether or not the sprite should be
  rendered.
- **rotation**: A number, in radians, that sets the sprite's rotation.
- **scale**: The sprite’s scale factor. Setting `scale.x` and
  `scale.y` to
  2 makes the sprite double in size. Setting these values to 0.5 makes
  it half the size. 1 sets the sprite to its actual size. You can also
  set the sprite's scale with the `scale.set` method.
- **texture**: A PIXI.Texture object that defines the sprite’s texture. (Don’t use
  this to change the sprite’s texture, use the `setTexture()` method
  instead.)
- **tint**: The tint (color) that should be applied to the sprite.
  This is a [hexadecimal color
  value](http://www.w3schools.com/tags/ref_colorpicker.asp).
- **visible**: A Boolean value that determines whether or not the sprite is visible.
  Setting `visible` to `false` is often the best way to remove sprites
  from a game.
- **worldAlpha**: Tells you the sprite’s `alpha` (transparency) value relative to its
  parent’s `alpha`. This is a read-only value.
- **worldVisible**: A read-only Boolean that tells you whether or not the sprite is
  globally visible. For example, if the sprite has a parent that isn’t
  visible, the sprite’s `worldVisible` property will be `false`.
- **x**: Sets the sprite’s horizontal position, in pixels. This is a getter/setter for
  `position.x`.
- **y**: Sets the sprite’s vertical position, in pixels. This is a getter/setter for
  `position.y`.
- **cacheAsBitmap**: If `true`, `cacheAsBitmap` will turn the sprite or
  `DisplayObject` into a bitmap image, so that it renders faster. If the
  sprite contains any child sprites, they’ll stop animating. Set
  `cacheAsBitmap` to `false` to restore the sprite and make child sprites
  animate again.

Pixi Sprites also have some useful methods. Here’s a complete list,
and you’ll learn how to use these methods ahead.

- **addChild**: Adds a display object as the child of another display
  object. *arguments*: (`child`). The `child` argument can be any
  `DisplayObject` (A
  `DisplayObject`, a `DisplayObjectContainer` or a `Sprite`).
- **removeChild**: Removes the object as a child of the sprite.
  *arguments*: (`child`). The `child` argument can be any
  `DisplayObject`.
- **addChildAt**: Adds a `DisplayObject` to the sprite’s `children` array
  at a specified array index position. *arguments*: (`child`,
  `arrayIndexValue`). The first argument should be `DisplayObject` and
  the second should be an array
  index position number.
- **getChildAt**: Returns the `DisplayObject` at the specified array
  index position in the sprite’s children array. *arguments*:
  (`child`, `index`). The first argument should be `DisplayObject` and
  the second should be an array index position number.
- **getBounds**: Gives you a `Rectangle` object with `x`, `y`, `width` and
  `height` properties that match the sprite. The `x` and `y` properties are
  relative to the sprite’s parent position. It has no arguments, but
  returns a `PIXI.Rectangle` object.
- **getLocalBounds**: Gives you a `Rectangle` object with `x`, `y`,
  `width`
  and `height` properties that match the sprite. The `x` and `y` properties
  are relative to the sprite’s own local anchor position, which is
  usually 0,0. It has no arguments, but returns a `PIXI.Rectangle` object.
- **setTexture**: Sets the texture that the sprite should display.
  *arguments*: (`texture`). Supply a `PIXI.Texture` object.
- **fromImage**: A convenient function that lets you make a sprite
  directly from an image file. If the image isn’t in Pixi’s texture
  cache, Pixi will load it for you before it attempts to render the
  sprite. *arguments*: (`imageFilePath`). Supply a file image path
  string.
- **fromFrame**: Used to make a sprite from an image in a tileset that
  has been loaded with a texture atlas. *arguments*: (`frameId`). A
  frame id (name) of a texture in the cache.
- **setStageReference**: Lets you set the stage that this sprite or
  `DisplayObject` is connected to. *arguments*: (stage). Supply a
  `Pixi.Stage` object.
- **removeStageReference**: Removes the reference to the sprite’s
  stage. It doesn't take any arguments and doesn't return anything.
- **generateTexture**: Takes a snapshot of the sprite and lets you use
  it as a texture for another sprite. It doesn't take any arguments,
  but it returns a texture.

In addition to these, sprites have a bunch of callback methods that
are used with mouse and touch events. Later you’ll
learn how to use them to make interactive buttons. 








