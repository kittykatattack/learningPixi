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
use them? Do you know what [JSON data
files](http://www.copterlabs.com/blog/json-what-it-is-how-it-works-how-to-use-it/)
are? Have you used the [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_graphics_with_canvas)?

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

(Request to readers: this is a *living document*. If you have any
questions about specific details or need any of the content clarified, please
create a **issue** in this GitHub repository and I'll update the text
with more information.)

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
should be relative to your root directory where your webserver is
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

![Basic display](/examples/images/screenshots/01.png)

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
canvas, the third is an object with some optional values you can set.
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

- From a single image file.
- From a sub-image on a **tileset**. A tileset is a single, big image that
includes all images you'll need in your game.
- From a **texture atlas** (A JSON file that defines the size and position of an image on a tileset.)

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
my advice is: don't use `fromImage`; just pre-load all the images
you'll need with the `AssetLoader`.

For optimization and efficiency it’s always best to make a sprite from
a texture that’s been pre-loaded into Pixi’s texture cache. But if for
some reason you need to make a texture from a regular JavaScript
`Image`
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

-1. You need to add the sprite to Pixi's stage with the `stage.addChild` method, like this:
```
stage.addChild(cat);
```
The stage is the main container that holds all of your sprites.

-2. You need to tell Pixi's `renderer` to render the stage.
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
var stage = new PIXI.Stage(0x000000);
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
the top left corner. The cat has an `x` position of
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
value of its `y` property. If the cat has an `x` value of 0, it will be at
the very left side of the stage. If it has a `y` value of 0, it will
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
change, only its width and height.

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
Pixi has an alternative, concise way for you set sprite's scale in one
line of code using the `scale.set` method.
```
cat.scale.set(0.5, 0.5); 
```
If that appeals to you, use it!

Rotation
--------

You can make a sprite rotate by setting its `rotation` property to a
value in [in
radians](http://www.mathsisfun.com/geometry/radians.html).
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

The entire tileset is 192 by 192 pixels. Each image is in a its own 32 by 32
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
last two define its `width` and `height`. Here's the format
for defining a new `Rectangle` object.
```
var rectangle = new PIXI.Rectangle(x, y, width, height);
```
The rectangle object is just a *data object*; it's up to you to decide how you want to use it. In
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
Level** all the way to the left to `0`. These are the basic
settings that will allow the free version of Texture Packer to create
your files without any warnings or errors.) 

When you’re done, click the **Publish** button. Choose the file name and
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
frame on the tileset automatically.  Here’s how to use the `AssetLoader` to load the `treasureHunter.json`
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

Pixi gives you three alternative ways to create a sprite from texture
atlas:

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
var stage = new PIXI.Stage(0x000000);
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

  //Make as many blobs as there are `numberOfBlobs`
  for (var i = 0; i < numberOfBlobs; i++) {

    //Make a blob
    var blob = new PIXI.Sprite.fromFrame("blob.png");

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added.
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

You now know how to display sprites, but how do you make them move?
That's easy: create a looping function using `requestAnimationFrame`.
This is called a **game loop**.
Any code you put inside the game loop will update 60 times per
second. Here's some code you could write to make the `cat` sprite move
at a rate  of 1 pixel per frame.
```
function gameLoop() {

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  //Move the cat 1 pixel to the right each frame
  cat.x += 1;

  //Render the stage to see the animation
  renderer.render(stage);
}

//Start the game loop
gameLoop();

```
If you run this bit of code, you'll see the sprite gradually move to
the right side of the stage.

![Moving sprites](/examples/images/screenshots/15.png)

And that's really all there is to it! Just change any sprite property by small
increments inside the loop, and they'll animate over time. If you want
the sprite to animate in the opposite direction (to the left), just give it a
negative value, like -1.
You'll find this code in the `movingSprites.html` file - here's the
complete code:
```
//Create a Pixi stage and renderer
var stage = new PIXI.Stage(0x000000);
var renderer = PIXI.autoDetectRenderer(
  256, 256,
  {antialiasing: false, transparent: false, resolution: 1}  
);
document.body.appendChild(renderer.view);

//Load an image
var loader = new PIXI.AssetLoader(["images/cat.png"]);
loader.onComplete = setup;
loader.load();

//Define any variables that are used in more than one function
var cat;

function setup() {

  //Create the `cat` sprite 
  var texture = PIXI.TextureCache["images/cat.png"];
  cat = new PIXI.Sprite(texture);
  cat.y = 96; 
  stage.addChild(cat);
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Move the cat 1 pixel per frame
  cat.x += 1;

  //Render the stage
  renderer.render(stage);
}
```
(Notice that the `cat` variable needs to be defined outside the
`setup` and
`gameLoop` functions so that you can access it inside both of them.)

You can animate a sprite's scale, rotation, or size - whatever! You'll see
many more examples of how to animate sprites ahead.

Using velocity properties
-------------------------

To give you more flexibility, its a good idea control a sprite's
movement speed using two **velocity properties**: `vx` and `vy`. `vx`
is used to set the sprite's speed and direction on the x axis
(horizontally). `vy` is
used to set the sprite's speed and direction on the y axis (vertically). Instead of
changing a sprite's `x` and `y` values directly, first update the velocity
variables, and then assign those velocity values to the sprite. This is an
extra bit of modularity that you'll need for interactive game animation.

The first step is to create `vx` and `vy` properties on your sprite,
and give them an initial value.
```
cat.vx = 0;
cat.vy = 0;
```
Setting `vx` and `vy` to 0 means that the sprite isn't moving.

Next, in the game loop, update `vx` and `vy` with the velocity
that you want the sprite to move at. Then assign those values to the
sprite's `x` and `y` properties. Here's how you could use this
technique to make the cat sprite move down and to right at one pixel each
frame:
```
function setup() {

  //Create the `cat` sprite 
  var texture = PIXI.TextureCache["images/cat.png"];
  cat = new PIXI.Sprite(texture);
  stage.addChild(cat);

  //Initialize the cat's velocity variables
  cat.vx = 0;
  cat.vy = 0;
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the cat's velocity
  cat.vx = 1;
  cat.vy = 1;

  //Apply the velocity values to the cat's 
  //position to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;

  //Render the stage
  renderer.render(stage);
}

```
When you run this code, the cat will move down and to the right at one
pixel per frame:

![Moving sprites](/examples/images/screenshots/16.png)

To make the cat move to the right, give it a `vx` value of -1. To make
it move up, give the cat a `vy` value of -1.

You'll see ahead how modularizing a sprite's velocity with `vx` and
`vy` velocity properties helps with keyboard and mouse pointer
control systems for games, as well as making it easier to implement physics.

Game states
-----------

As a matter of style, and to help modularize your code, I
recommend structuring your game loop like this:
```
//Set the game's current state to *play*:
var state = play;

function gameLoop() {

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  state();

  //Render the stage to see the animation
  renderer.render(stage);
}

function play() {

  //Move the cat 1 pixel to the right each frame
  cat.x += 1;
}
```
You can see that the `gameLoop` is calling a function called `state` 60 times
per second. What is the `state` function? It's been assigned to
`play`. That means all the code in the `play` function will run at 60
times per second. 

Here's how the code from the previous example can be re-factored to
this new model:
```
//Define any variables that are used in more than one function
var cat, state;

function setup() {

  //Create the `cat` sprite 
  var texture = PIXI.TextureCache["images/cat.png"];
  cat = new PIXI.Sprite(texture);
  cat.y = 96; 
  cat.vx = 0;
  cat.vy = 0;
  stage.addChild(cat);

  //Set the game state
  state = play;
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state:
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {

  //Move the cat 1 pixel to the right each frame
  cat.vx = 1
  cat.x += cat.vx;
}
```
Yes, I know, this is a bit of [head-swirler](http://www.amazon.com/Electric-Psychedelic-Sitar-Headswirlers-1-5/dp/B004HZ14VS)! But, don't let it scare
and you and spend a minute or two walking through in your mind how those
functions are connected. As you'll see ahead, structuring your game
loop like this will make it much, much easier to do things like switching
game scenes and levels.

Keyboard Movement
-----------------

With just a little more work you can build a simple system to control
a sprite using the keyboard. To simplify your code, I suggest you use
this custom function called `keyboard` that listens for and captures
keyboard events.
```
function keyboard(keyCode) {
  var key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = function(event) {
    if (event.keyCode === key.code) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}
```
The `keyboard` function is easy to use. Create a new keyboard object like this:
```
var keyObject = keyboard(asciiKeyCodeNumber);
```
[Here's a list of ascii keyboard code
numbers](http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html).

Then assign `press` and `release` methods to the keyboard object like this:
```
keyObject.press = function() {
  //key object pressed
};
keyObject.release = function() {
  //key object released
};
```
Keyboard objects also have `isDown` and `isUp` Boolean properties that
you can use to check the state of each key. 

Take a look at the
`keyboardMovement.html` file in the `examples` folder to see how you
can use this `keyboard` function to control a sprite using your
keyboard's arrow keys. Run it and use the left, up, down, and right
arrow keys to move the cat around the stage.

![Keyboard movement](/examples/images/screenshots/17.png)

Here's the code that does all this:
```
function setup() {

  //Create the `cat` sprite 
  var texture = PIXI.TextureCache["images/cat.png"];
  cat = new PIXI.Sprite(texture);
  cat.y = 96; 
  cat.vx = 0;
  cat.vy = 0;
  stage.addChild(cat);

  //Capture the keyboard arrow keys
  var left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = function() {
    //Change the cat's velocity when the key is pressed
    cat.vx = -5;
    cat.vy = 0;
  };

  //Left arrow key `release` method
  left.release = function() {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Up
  up.press = function() {
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = function() {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Right
  right.press = function() {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = function() {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Down
  down.press = function() {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = function() {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Set the game state
  state = play;
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){
  requestAnimationFrame(gameLoop);
  state();
  renderer.render(stage);
}

function play() {

  //Use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy
}
```
Grouping Sprites
----------------

Groups let you create game scenes, and manage similar sprites together
as single units. Pixi has an object called a `DisplayObjectContainer`
that lets you do this. Let's find out how it works.

Imagine that you want to display three sprites: a cat, hedgehog and
tiger. Create them, and set their positions - *but don't add them to the
stage*.
```
//The cat
var cat = new PIXI.Sprite.fromFrame("cat.png");
cat.position.set(16, 16);

//The hedgehog
var hedgehog = new PIXI.Sprite.fromFrame("hedgehog.png");
hedgehog.position.set(32, 32);

//The tiger
var tiger = new PIXI.Sprite.fromFrame("tiger.png");
tiger.position.set(64, 64);
```

Next, create an `animals` container to group them all together like
this:
```
var animals = new PIXI.DisplayObjectContainer();
```
Then use `addChild` to *add the sprites to the group*.
```
animals.addChild(cat);
animals.addChild(hedgehog);
animals.addChild(tiger);
```
Finally add the group to the stage.
```
stage.addChild(animals);
renderer.render(stage);
```
(The stage object, by the way, is also a `DisplayObjectContainer`. It’s the root container for all Pixi sprites.)

Here's what this code produces:

![Grouping sprites](/examples/images/screenshots/18.png)

What you can't see in that image is the invisible `animals` group
that's containing the sprites.

![Grouping sprites](/examples/images/screenshots/19.png)

You can now treat the `animals` group as a single unit. You can think
of a `DisplayObjectContainer` as a special kind of sprite that doesn’t
have a texture. 

If you need a list of all the child sprites that `animals` contains,
use its `children` array to find out. 
```
console.log(animals.chidren}
//Displays: [b.Sprite, b.Sprite, b.Sprite]
```
This tells you that `animals` has three sprites as children.

Because the `animals` group is just like any other sprite, you can
change its `x` and `y` values, `alpha`, `scale` and
all the other sprite properties. Any property value you change on the
parent container will affect the child sprites in a relative way. So if you
set the group's `x` and `y` position, all the child sprites will
be repositioned relative to the group's top left corner. What would
happen if you set the `animals`'s `x` and `y` position to 64?
```
animals.position.set(64, 64);
```
The whole group of sprites will move 64 pixels right and 64 pixels to
the down.

![Grouping sprites](/examples/images/screenshots/20.png)

The `animals` group also has its own dimensions, which is based on the area
occupied by the containing sprites. You can find its `width` and
`height` values like this:
```
console.log(animals.width);
//Displays: 112

console.log(animals.height);
//Displays: 112 

```
![Group width and height](/examples/images/screenshots/21.png)

What happens if you change a group's width or height? 
```  
animals.width = 200;
animals.height = 200;
```
All the child
sprites will scale to match that change.

![Group width and height](/examples/images/screenshots/22.png)

You can nest as many `DisplayObjectContainer`s inside other
`DisplayObjectContainer`s as you like, to create deep hierarchies if
you need to. However, a `DisplayObject` (like a `Sprite` or another
`DisplayObjectContainer`) can only belong to one parent at a time. If
you use `addChild` to make a sprite the child of another object, Pixi
will automatically remove it from its current parent. That’s a useful
bit of management that you don’t have to worry about.

###Local and global positions

When you add a sprite to a `DisplayObjectContainer`, its `x` and `y`
position is *relative to the group’s top left corner*. That's the
sprite's **local position** For example, what do you think the cat's
position is in this image?

![Grouping sprites](/examples/images/screenshots/20.png)

Let's find out:
```
console.log(cat.x);
//Displays: 16
```
16? Yes! That's because the cat is offset by only 16 pixel's from the
group's top left corner. 16 is the cat's local position.

Sprites also have a ***global position**. The global position is the
distance from the top left corner of the stage, to the sprite's anchor
point (usually the sprite's top left corner.) You can find a sprite's global
position with the help of the `toGlobal` method.  Here's how:
```
parentSprite.toGlobal(childSprite.position)
```
That means you can find the cat's global position inside the `animals`
group like this:
```
console.log(animals.toGlobal(cat.position));
//Displays: b.Point{x: 80, y: 80...};
```
That gives you an `x` and `y` position of 80. That's exactly the cat's
global position relative to the top left corner of the stage. (If you
ever need to convert a global position to a local position, you can
use the `toLocal` method - it works in the same way.)

###Using a SpriteBatch to group sprites

Pixi has an alternative, high-performance way to group sprites called
a `SpriteBatch`. Any sprites inside a `SpriteBatch` will render 2 to 5
times faster than they would if they were in a regular
`DisplayObjectContainer`. It’s a great performance boost for games. 

Create a `SpriteBatch` like this:
```
var superFastSprites = new PIXI.SpriteBatch();
```
Then use `addChild` to add sprites to it, just like you would with any
ordinary `DisplayObjectContainer`.

You have to make some compromises if you decide to use a
`SpriteBatch`. The `SpriteBatch` only has a few  basic properties:
`x`, `y`, `width`, `height`, `scale`, `alpha`, `visible` – and that’s
about it. Also, the sprites that it contains can’t have nested
children of their own. A `SpriteBatche` also can’t use Pixi’s advanced
visual effects like filters and blend modes (you’ll learn about those
ahead). But for the huge performance boost that you get, those
compromises are usually worth it. And you can use
`DisplayObjectContainer`s and `SpriteBatch`s simultaneously in the same project, so you can fine-tune your optimization. 

Why are sprites in a `SpriteBatch` so fast? Because the positions of
the sprites are being calculated directly on the GPU. The Pixi
development team is working to offload as much sprite processing as
possible on the GPU, so it’s likely that the latest version of Pixi
that you’re using will have much more feature-rich `SpriteBatch` than
what I've described here. Check the current [SpriteBatch
documentation](http://www.goodboydigital.com/pixijs/docs/classes/SpriteBatch.html) for details.


Pixi's Graphic Primitives
-------------------------

Using image textures is one of the most useful ways of making sprites,
but Pixi also has its own low-level drawing tools. You can use them to
make rectangles, shapes, lines, complex polygons and text. And,
fortunately, it uses almost the same API as the [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_graphics_with_canvas) so,
if you're already familiar with canvas, here’s nothing really new to learn. But the big advantage is that, unlike the Canvas Drawing API, the shapes you draw with Pixi are rendered by WebGL on the GPU. Pixi lets you access all that untapped performance power.
Let’s take a quick tour of how to make some basic shapes. Here are all
the shapes we'll make in the code ahead.

![Graphic primitives](/examples/images/screenshots/23.png)

###Rectangles

All shapes are made by first creating a new instance of
`PIXI.Graphics()`.
```
var rectangle = new PIXI.Graphics();
```
Use `beginFill` with a hexadecimal color code value to set the
rectangle’ s fill color. Here’ how to set to it to light blue.
```
rectangle.beginFill(0x66CCFF);
```
If you want to give the shape an outline, use the `lineStyle` method. Here's
how to give the rectangle a 4 pixel wide red outline, with an `alpha`
value of 1.
```
rectangle.lineStyle(4, 0xFF3300, 1);
```
Use the `drawRect` method to draw the rectangle. Its four arguments
are `x`, `y`, `width` and `height`.
```
rectangle.drawRect(x, y, width, height);
```
Use `endFill` when you’re done.
```
rectangle.endFill();
```
It’s just like the Canvas Drawing API! Here’s all the code you need to
draw a rectangle, change its position, and add it to the stage.
```
var rectangle = new PIXI.Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
stage.addChild(rectangle);

```
This code makes a 64 by 64 blue rectangle with a red border at an x and y position of 170.

###Circles

Make a circle with the `drawCircle` method. Its three arguments are
`x`, `y` and `radius`
```
drawCircle(x, y, radius)
```
Unlike rectangles and sprites, a circle’s x and y position is also its
center point. Here’s how to make a violet colored circle with a radius of 32 pixels.
```
var circle = new PIXI.Graphics();
circle.beginFill(0x9966FF);
circle.drawCircle(0, 0, 32);
circle.endFill();
circle.x = 64;
circle.y = 130;
stage.addChild(circle);
```
###Ellipses
As a one-up on the Canvas Drawing API, Pixi lets you draw an ellipse
with the `drawEllipse` method.
```
drawEllipse(x, y, width, height);
```
The x/y position defines the ellipse’s top left corner (imagine that
the ellipse is surrounded by an invisible rectangular bounding box -
the top left corner of that box will represent the ellipse's x/y
anchor position). Here’s a yellow ellipse that’s 50 pixels wide and 20 pixels high.
```
var ellipse = new PIXI.Graphics();
ellipse.beginFill(0xFFFF00);
ellipse.drawEllipse(0, 0, 50, 20);
ellipse.endFill();
ellipse.x = 180;
ellipse.y = 130;
stage.addChild(ellipse);
```
###Rounded rectangles

Pixi also lets you make rounded rectangles with the `drawRoundedRect`
method. The last argument, `cornerRadius` is a number in pixels that
determines by how much the corners should be rounded.
```
drawRoundedRect(x, y, width, height, cornerRadius)
```
Here's how to make a rounded rectangle with a corner radius of 10
pixels.
```
var roundBox = new PIXI.Graphics();
roundBox.lineStyle(4, 0x99CCFF, 1);
roundBox.beginFill(0xFF9933);
roundBox.drawRoundedRect(0, 0, 84, 36, 10)
roundBox.endFill();
roundBox.x = 48;
roundBox.y = 190;
stage.addChild(roundBox);
```
###Lines

You've seen in the examples above that the `lineStyle` method lets you
define a line.  You can use the `moveTo` and `lineTo` methods to draw the
start and end points of the line, in just the same way you can with the Canvas
Drawing API. Here’s how to draw a 4 pixel wide, white diagonal line.
```
var line = new PIXI.Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);
line.x = 32;
line.y = 32;
stage.addChild(line);
```
`PIXI.Graphics` objects, like lines, have `x` and `y` values, just
like sprites, so you can position them anywhere on the stage after
you've drawn them.

###Polygons

You can join lines together and fill them with colors to make complex
shapes using the `drawPolygon` method. `drawPolygon`'s argument is an
path array of x/y points that define the positions of each point on the
shape.
```
var path = [
  point1X, point1Y,
  point2X, point2Y,
  point3X, point3Y
];

graphicsObject.drawPolygon(path);
```
`drawPolygon` will join those three points together to make the shape.
Here’s how to use `drawPolygon` to connect three lines together to
make a red triangle with a blue border. The triangle is drawn at
position 0,0 and then moved to its position on the stage using its
`x` and `y` properties.
```
var triangle = new PIXI.Graphics();
triangle.beginFill(0x66FF33);

//Use `drawPolygon` to define the triangle as
//a path array of x/y positions

triangle.drawPolygon([
    -32, 64,             //First point
    32, 64,              //Second point
    0, 0                 //Third point 
]);

//Fill shape's color
triangle.endFill();

//Position the triangle after you've drawn it.
//The triangle's x/y position is anchored to its first point in the path
triangle.x = 180;
triangle.y = 22;

stage.addChild(triangle);
```

Displaying text
---------------

Use a `PIXI.Text` object to display text on the stage. The constructor
takes two arguments: the text you want to display and a style object
that defines the font’s properties. Here's how to display the words
"Hello Pixi", in white, 32 pixel high sans-serif font. 
```
var message = new PIXI.Text(
  "Hello Pixi!", 
  {font: "32px sans-serif", fill: "white"}
);

message.position.set(54, 96);
stage.addChild(message);
```
![Displaying text](/examples/images/screenshots/24.png)

Pixi’s Text objects inherit from the `Sprite` class, so they
contain all the same properties like `x`, `y`, `width`, `height`,
`alpha`, and `rotation`. Position and resize text on the stage just like you would any other sprite.

If you want to change the content of a text object after you've
created it, use the `setText` method.
```
message.setText("Text changed!");
```
Use `setStyle` if you want to redefine the font properties.
```
message.setStyle({fill: "black", font: "16px PetMe64"});
```
Pixi makes text objects by using the Canvas Drawing API to render the text to an invisible and temporary canvas element. It then turns the canvas into a WebGL texture so that it can be mapped onto a sprite. That’s why the text’s color needs to be wrapped in a string: it’s a Canvas Drawing API color value. As with any canvas color values, you can use words for common colors like “red” or “green”, or use rgba, hsla or hex values. 

Other style properties that you can include are `stroke` for the font
outline color and `strokeThickness` for the outline thickness. Set the
text's `dropShadow` property to `true` to make the text display a
shadow. Use `dropShadowColor` to set the shadow's hexadecimal color
value, use `dropShadowAngle` to set the shadow's angle in radians, and
use `dropShadowDistance` to set the pixel height of a shadow.

Pixi can also wrap long lines of text. Set the text’s `wordWrap` style
property to `true`, and then set `wordWrapWidth` to the maximum length
in pixels, that the line of text should be. Use the `align` property
to set the alignment for multi-line text.
```
message.setStyle({wordWrap: true, wordWrapWidth: 100, align: center});
```
(Note: `align` doesn't affect single line text.)

If you want to use a custom font file, use the CSS `@font-face` rule
to link the font file to the HTML page where you Pixi application is
running.
```
@font-face {
  font-family: “fontFamilyName"; 
  src: url("fonts/fontFile.ttf");
}
```
Add this `@font-face` rule to your HTML page's CSS style sheet.

[Pixi also has support for bitmap
fonts](http://www.goodboydigital.com/text-updates/).

Collision detection
--------------------------

You now know how to make a huge variety of graphics objects, but what
can you do with them? A fun thing to do is to build a simple **collision
detection** system. You can use a custom function called
`hitTestRectangle` that checks whether any two rectangular Pixi sprites are
touching.
```
hitTestRectangle(spriteOne, spriteTwo)
```
if they overlap, `hitTestRectangle` will return `true`. You can use `hitTestRectangle` with an `if` statement to check for a collision between two sprites like this:
```
if (hitTestRectangle(cat, box)) {
  //There's a collision
} else {
  //There's no collision
}
```
As you'll see, `hitTestRectangle` is the front door into the vast universe of game design. 

Run the `collisionDetection.html` file in the `examples` folder for a
working example of how to use `hitTestRectangle`. Use the arrow keys
to move the cat. If the cat hits the box, the box becomes red
and "Hit!" is displayed by the text object.

![Displaying text](/examples/images/screenshots/25.png)

You've already seen all the code that creates all these elements, as
well as the
keyboard control system that makes the cat move. The only new thing is the
way `hitTestRectangle` is used inside the `play` function to check for a
collision.
```
function play() {

  //use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;

  //check for a collision between the cat and the box
  if (hitTestRectangle(cat, box)) {

    //if there's a collision, change the message text
    //and tint the box red
    message.setText("hit!");
    box.tint = 0xff3300;

  } else {

    //if there's no collision, reset the message
    //text and the box's color
    message.setText("No collision...");
    box.tint = 0xccff99;

  }
}
```

Because the `play` function is being called by the game loop 60 times
per second, this `if` statement is constantly checking for a collision
between the cat and the box. If `hitTestRectangle` is `true`, the
text `message` object uses `setText` to display "Hit":
```
message.setText("hit!");
```
The color of the box is then changed from green to red by setting the
box's `tint` property to the hexadecimal red value.
```
box.tint = 0xff3300;
```
If there's no collision, the message and box are maintained in their
original states:
```
message.setText("no collision...");
box.tint = 0xccff99;
```
This code is pretty simple, but suddenly you've created an interactive
world that seems to be completely alive. It's almost like magic! And, perhaps
surprisingly, you now have all the skills you need to start making
games with Pixi!

###The hitTestRectangle function

But what about the `hitTestRectangle` function? What does it do, and
how does it work? The details of how collision detection algorithms
like this work is a little bit outside the scope of this document.
The most important thing is that you know how to use it. But, just for
your reference, and in case you're curious, here's the complete
`hitTestRectangle` function definition. Can you figure out from the
comments what it's doing?
```
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  var hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

  //hit will determine whether there's a collision
  hit = false;

  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2; 
  r1.centerY = r1.y + r1.height / 2; 
  r2.centerX = r2.x + r2.width / 2; 
  r2.centerY = r2.y + r2.height / 2; 

  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;

  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;

  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;

  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {

    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {

      //There's definitely a collision happening
      hit = true;
    } else {

      //There's no collision on the y axis
      hit = false;
    }
  } else {

    //There's no collision on the x axis
    hit = false;
  }

  //`hit` will be either `true` or `false`
  return hit;
};

```

Case study: Treasure Hunter
---------------

So I told you that you now have all the skills you need to start
making games. What? You don't believe me? Let me prove it to you! Let’s take a
close at how to make a simple object collection and enemy
avoidance game called **Treasure Hunter**. (You'll find it the `examples`
folder.)

![Displaying text](/examples/images/screenshots/26.png)

Treasure Hunter is a good example of one of simplest complete
games you can make using the tools you've learnt so far. Use the
keyboard arrow
keys to help the explorer find the treasure and carry it to the exit.
Six blob monsters move up and down between the dungeon walls, and if
they hit the explorer he becomes semi-transparent and the health meter
at the top right corner shrinks. If all the health is used up, “You
Lost!” is displayed on the stage; if the explorer reaches the exit with
the treasure, “You Won!” is displayed. Although it’s a basic
prototype, Treasure Hunter contains most of the elements you’ll find
in much bigger games: texture atlas graphics, interactivity,
collision, and multiple game scenes. Let’s go on a tour at how the
game was put together so that you can use it as a starting point for one of your own games.

### The code structure

Open the `treasureHunter.html` file and you'll see that all the game
code is in one big file. Here's a birds-eye view of how all the code is
organized.

```
//Setup Pixi and load the texture atlas files - call the `setup`
//function when they've loaded

function setup() {
  //Initialize the game sprites, set the game `state` to `play`
  //and start the 'gameLoop'
}

function gameLoop() {
  //Runs the current game `state` in a loop and renders the sprites  
}

function play() {
  //All the game logic goes here
}

function end() {
  //All the code that should run at the end of the game  
}

//The game's helper functions: 
//`keyboard`, `hitTestRectangle`, `contain` and `randomInt`
```
Use this as your world map to the game as we look at how each
section works.

### Initialize the game in the setup function

As soon as the texture atlas images have loaded, the `setup` function
runs. It only runs once, and lets you perform
one-time setup tasks for your game. It's a great place to create and initialize
objects, sprites, game scenes, populate data arrays or parse
loaded JSON game data. 

Here's an abridged view of the `setup` function in Treasure Hunter,
and the tasks that it performs

```
function setup() {
  //Create the `gameScene` group
  //Create the `door` sprite
  //Create the `player` sprite
  //Create the `treasure` sprite
  //Make the enemies
  //Create the health bar
  //Add some text for the game over message
  //Create a `gameOverScene` group 
  //Assign the player's keyboard controllers

  //set the game state to `play`
  state = play;

  //Start the game loop
  gameLoop();
}

```
The last two lines of code, `state = play;` and `gameLoop()` are perhaps
the most important. Running `gameLoop` switches on the game's engine,
and causes the `play` function to be called in a continuous loop. But before we look at how that works, let's see what the
specific code inside the `setup` function does.

####Creating the game scenes

The `setup` function creates two `DisplayObjectContainer` groups called
`gameScene` and `gameOverScene`. Each of these are added to the stage.
```
gameScene = new PIXI.DisplayObjectContainer();
stage.addChild(gameScene);

gameOverScene = new PIXI.DisplayObjectContainer();
stage.addChild(gameOverScene);

```
All of the sprites that are part of the main game are added to the
`gameScene` group. The game over text that should be displayed at the
end of the game is added to the `gameOverScene` group.

![Displaying text](/examples/images/screenshots/27.png)

Although it's created in the `setup` function, the `gameOverScene`
shouldn't be visible when the game first starts, so its `visible`
property is initialized to `false`.
```
gameOverScene.visible = false;
```
You'll see ahead that, when the game ends, the `gameOverScene`'s `visible`
property will be set to `true` to display the text that appears at the
end of the game.

####Making the dungeon, door, explorer and treasure

The player, exit door, treasure chest and the dungeon background image
are all sprites made from texture atlas frames. Very importantly,
they're all added as children of the `gameScene`.
```
//Dungeon
dungeon = new PIXI.Sprite.fromFrame("dungeon.png");
gameScene.addChild(dungeon);

//Door
door = new PIXI.Sprite.fromFrame("door.png"); 
door.position.set(32, 0);
gameScene.addChild(door);

//Explorer
explorer = new PIXI.Sprite.fromFrame("explorer.png");
explorer.x = 68;
explorer.y = gameScene.height / 2 - explorer.height / 2;
explorer.vx = 0;
explorer.vy = 0;
gameScene.addChild(explorer);

//Treasure
treasure = new PIXI.Sprite.fromFrame("treasure.png");
treasure.x = gameScene.width - treasure.width - 48;
treasure.y = gameScene.height / 2 - treasure.height / 2;
gameScene.addChild(treasure);
```
Keeping them together in the `gameScene` group will make it easy for
us to hide the `gameScene` and display the `gameOverScene` when the game is finished.

####Making the blob monsters

The six blob monsters are created in a loop. Each blob is given a
random initial position and velocity. The vertical velocity is
alternately multiplied by 1 or -1 for each blob, and that’s what
causes each blob to move in the opposite direction to the one next to
it. Each blob monster that's created is pushed into an array called
`blobs`.
```
var numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2,
    direction = 1;

//An array to store all the blob monsters
blobs = [];

//Make as many blobs as there are `numberOfBlobs`
for (var i = 0; i < numberOfBlobs; i++) {

  //Make a blob
  var blob = new PIXI.Sprite.fromFrame("blob.png");

  //Space each blob horizontally according to the `spacing` value.
  //`xOffset` determines the point from the left of the screen
  //at which the first blob should be added
  var x = spacing * i + xOffset;

  //Give the blob a random `y` position
  var y = randomInt(0, stage.height - blob.height);

  //Set the blob's position
  blob.x = x;
  blob.y = y;

  //Set the blob's vertical velocity. `direction` will be either `1` or
  //`-1`. `1` means the enemy will move down and `-1` means the blob will
  //move up. Multiplying `direction` by `speed` determines the blob's
  //vertical direction
  blob.vy = speed * direction;

  //Reverse the direction for the next blob
  direction *= -1;

  //Push the blob into the `blobs` array
  blobs.push(blob);

  //Add the blob to the `gameScene`
  gameScene.addChild(blob);
}

```

####Making the health bar

When you play Treasure Hunter you'll notice that when the explorer touches
one of the enemies, the width of the health bar at the top right
corner of the screen decreases. How was this health bar made? It's
just two overlapping rectangles at exactly the same position: a black rectangle behind, and
a red rectangle in front. They're grouped into a single `healthBar`
group. The `healthBar` is then added to the `gameScene` and positioned
on the stage.
```
//Create the health bar
healthBar = new PIXI.DisplayObjectContainer();
healthBar.position.set(stage.width - 170, 6)
gameScene.addChild(healthBar);

//Create the black background rectangle
var innerBar = new PIXI.Graphics();
innerBar.beginFill(0x000000);
innerBar.drawRect(0, 0, 128, 8);
innerBar.endFill();
healthBar.addChild(innerBar);

//Create the front red rectangle
var outerBar = new PIXI.Graphics();
outerBar.beginFill(0xFF3300);
outerBar.drawRect(0, 0, 128, 8);
outerBar.endFill();
healthBar.addChild(outerBar);

healthBar.outer = outerBar;
```
You can see that a property called `outer` has been added to the
`healthBar`. It just references the `outerBar` (the red rectangle) so that it will be convenient to access later.
```
healthBar.outer = outerBar;
```
You don't have to do this; but, hey why not! It means that if you want
to control the width of the red `outerBar`, you can write some smooth code that looks like this:
```
healthBar.outer.width = 30;
```
That's pretty neat and readable, so we'll keep it!

####Making the message text

When the game is finished, some text displays “You won!” or “You
lost!”, depending on the outcome of the game. This is made using a
text sprite and adding it to the `gameOverScene`. Because the
`gameOverScene`‘s `visible` property is set to `false` when the game
starts, you can’t see this text. Here’s the code from the `setup`
function that creates the message text and adds it to the
`gameOverScene`.
```
message = new PIXI.Text(
  "The End!", 
  {font: "64px Futura", fill: "white"}
);

message.x = 120;
message.y = stage.height / 2 - 32;

gameOverScene.addChild(message);
```

###Playing the game

All the game logic and the code that makes the sprites move happens
inside the `play` function, which runs in a continuous loop. Here's an
overview of what the `play` function does
```
function play() {
  //Move the explorer and contain it inside the dungeon
  //Move the blob monsters
  //Check for a collision between the blobs and the explorer
  //Check for a collision between the explorer and the treasure
  //Check for a collsion between the treasure and the door
  //Decide whether the game has been won or lost
  //Change the game `state` to `end` when the game is finsihed
}
```
Let's find out how all these features work.

###Moving the explorer

The explorer is controlled using the keyboard, and the code that does
that is very similar to the keyboard control code you learnt earlier.
The `keyboard` objects modify the explorer’s velocity, and that
velocity is added to the explorer’s position inside the `play`
function. 
```
explorer.x += explorer.vx;
explorer.y += explorer.vy;
```

####Containing movement

But what's new is that the explorer's movement is contained inside the walls of the
dungeon. The green outline shows the limits of the explorer's
movement.

![Displaying text](/examples/images/screenshots/28.png)

That's done with the help of a custom function called
`contain`. 
```
contain(explorer, {x: 28, y: 10, width: 488, height: 480});
```
`contain` takes two arguments. The first is the sprite you want to keep
contained. The second is any object with `x`, `y`, `width` and
`height` properties that define a rectangular area. In this example,
the containing object defines an area that's just slightly offset
from, and smaller than, the stage. It matches dimensions of the dungeon
walls.

Here's the `contain` function that does all this work. The function checks
to see if the sprite has crossed the boundaries of the containing
object. If it has, the code moves the sprite back into that boundary.
The `contain` function also returns a `collision` variable with the
value "top", "right", "bottom" or "left", depending on which side of
the boundary the sprite hit. (`collision` will be `undefined` if the
sprite didn't hit any of the boundaries.)
```
function contain(sprite, container) {

  var collision = undefined;

  //Left
  if (sprite.x < container.x) {
    sprite.x = container.x;
    collision = "left";
  }

  //Top
  if (sprite.y < container.y) {
    sprite.y = container.y;
    collision = "top";
  }

  //Right
  if (sprite.x + sprite.width > container.width) {
    sprite.x = container.width - sprite.width;
    collision = "right";
  }

  //Bottom
  if (sprite.y + sprite.height > container.height) {
    sprite.y = container.height - sprite.height;
    collision = "bottom";
  }

  //Return the `collision` value
  return collision;
}
```
You'll see how the `collision` return value will be use in the code
ahead to make the blob monsters bounce back and forth between the top
and bottom dungeon walls.

###Moving the monsters

The `play` function also moves the blob monsters, keeps them contained
inside the dungeon walls, and checks each one for a collision with the
player. If a blob bumps into the dungeon’s top or bottom walls, its
direction is reversed. All this is done with the help of a `forEach` loop
which iterates through each of `blob` sprites in the `blobs` array on
every frame.
```
blobs.forEach(function(blob) {

  //Move the blob
  blob.y += blob.vy;

  //Check the blob's screen boundaries
  var blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});

  //If the blob hits the top or bottom of the stage, reverse
  //its direction
  if (blobHitsWall === "top" || blobHitsWall === "bottom") {
    blob.vy *= -1;
  }

  //Test for a collision. If any of the enemies are touching
  //the explorer, set `explorerHit` to `true`
  if(hitTestRectangle(explorer, blob)) {
    explorerHit = true;
  }
});

```
You can see in this code above how the return value of the `contain`
function is used to make the blobs bounce off the walls. A variable
called `blobHitsWall` is used to capture the return value: 
```
var blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
```
`blobHitsWall` will usually be `undefined`. But if the blob hits the
top wall, `blobHitsWall` will have the value "top". If the blob hits
the bottom wall, `blobHitsWall` will have the value "bottom". If
either of these cases are `true`, you can reverse the blob's direction
by reversing its velocity. Here's the code that does this:
```
if (blobHitsWall === "top" || blobHitsWall === "bottom") {
  blob.vy *= -1;
}
```
Multiplying the blob's `vy` (vertical velocity) value by -1 will flip
the direction of its movement.

###Checking for collisions

The code in the loop above uses `hitTestRectangle` to figure
out if any of the enemies have touched the explorer. 
```
if(hitTestRectangle(explorer, blob)) {
  explorerHit = true;
}
```
If `hitTestRectangle` returns `true`, it means there’s been a collision
and a variable called `explorerHit` is set to `true`. If `explorerHit`
is `true`, the `play` function makes the explorer semi-transparent
and reduces the width of the `health` bar by 1 pixel.
```
if(explorerHit) {

  //Make the explorer semi-transparent
  explorer.alpha = 0.5;

  //Reduce the width of the health bar's inner rectangle by 1 pixel
  healthBar.outer.width -= 1;

} else {

  //Make the explorer fully opaque (non-transparent) if it hasn't been hit
  explorer.alpha = 1;
}

```
If  `explorerHit` is `false`, the explorer's `alpha` property is
maintained at 1, which makes it fully opaque. 

The `play` function also checks for a collision between the treasure
chest and the explorer. If there’s a hit, the `treasure` is set to the
explorer’s position, with a slight offset. This makes it look like the
explorer is carrying the treasure.

![Displaying text](/examples/images/screenshots/29.png)

Here's the code that does this:

```
if (hitTestRectangle(explorer, treasure)) {
  treasure.x = explorer.x + 8;
  treasure.y = explorer.y + 8;
}
```

###Reaching the exit door and ending the game

There are two ways the game can end: You can win if you carry the
treasure to the exit, or you can loose if you run out of health. 

To win the game, the treasure chest just needs to touch the exit door. If
that happens, the game `state` is set to `end`, and the `message` text
displays "You won".
```
if (hitTestRectangle(treasure, door)) {
  state = end;
  message.setText("You won!");
} 
```
If you run out of health, you loose the game. The game `state` is also
set to `end` and the `message` text displays "You Lost!"
```
if (healthBar.outer.width < 0) {
  state = end;
  message.setText("You lost!");
}
```
But what does this mean?
```
state = end;
```
You'll remember from earlier examples that the `gameLoop` is constantly updating a function called
`state` at 60 times per second. Here's the `gameLoop`that does this:
```
function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state
  state();

  //Render the stage
  renderer.render(stage);
}
```
You'll also remember that we initially set the value of
`state` to `play`, which is why the `play` function runs in a loop.
By setting `state` to `end` we're telling the code that we want
another function, called `end` to run in a loop. In a bigger game you
could have a `tileScene` state, and states for each game level, like
`leveOne`, `levelTwo` and `levelThree`.

So what is that `end` function? Here it is!
```
function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}
```
It just flips the visibility of the game scenes. This is what hides
the `gameScene` and displays the `gameOverScene` when the game ends.

This is a really simple example of how to switch a game's state, but
you can have as many game states as you like in your games, and fill them
with as much code as you need. Just change the value of `state` to
whatever function you want to run in a loop.

And that’s really all there is to Treasure Hunter! With a little more work you could turn this simple prototype into a full game – try it!

We're not done yet!
-------------------

I need to take a short break, but there's much more content coming
soon: Tiling sprites, filters, shaders, tinting, masking, blend modes,
particle effects, mouse and touch events, drag and drop, interactive
buttons and lots, lots more!

But until then, enjoy this handy reference guide to all Pixi's `Sprite`
properties and methods.

Sprite properties and methods
-----------------------------

You've learnt how to use quite a few useful sprite properties so far, like `x`, `y`,
`visible`, and `rotation` that give you a lot of control over a
sprite's position and appearance. But Pixi Sprites also have many more useful properties that are fun to play with.
Before we look at all those properties and methods let’s find
out how Pixi’s class inheritance system works. ([What is a **class**
and what is **inheritence**? Click this link to find out.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)) Pixi’s sprites are
built on an inheritance model that follows this chain:
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
later. This information is adapted directly from
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
- **filterArea**: A `Rectangle` object that defines the area on a
  sprite's texture that a filter is applied to.
- **width**: The sprite’s width in pixels. (The `width` property
  actually modifies the sprite’s scale to achieve the correct pixel
  width.)
- **height**: The sprite’s height in pixels. (Like `width`, the
  `height` property modifies the sprite’s scale.)
- **hitArea**: Determines the area of a sprite :wthat is sensitive to
  mouse or touch events. Supply it with a `PIXI.Rectangle` object.
  This is just 4 numbers that define a rectangular area in pixels: x,
  y, width and height.
- **interactive**: A Boolean (`true`/`false` value) that determines whether or not the
  sprite responds to mouse or touch events.
- **mask**: Sets a mask for the sprite. A mask is an object that limits
  the visibility of a sprite to the shape of the mask applied to it. .
  Supply the `mask` property with a A `PIXI.Graphics`
  object. To remove a mask, set this property to `null`.
- **parent**: A read-only property that tells you the sprite’s parent. This
  could be another sprite, or it could be a `DisplayObjectContainer`
  (which you’ll learn about ahead.)
- **pivot**: A `PIXI.Point` object with `x` and `y` properties that lets you set
  the axis of rotation on the sprite. (There is currently [a
  long-running and
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
- **texture**: A `PIXI.Texture` object that defines the sprite’s texture. (Don’t use
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

- **addChild**: Adds a `DisplayObject` as the child of another
  `DisplayoObject`. *arguments*: (`child`). The `child` argument can be any
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
  index position in the sprite’s `children` array. *arguments*:
  (`child`, `index`). The first argument should be `DisplayObject` and
  the second should be an array index position number.
- **getBounds**: Gives you a `Rectangle` object with `x`, `y`, `width` and
  `height` properties that match the sprite. The `x` and `y` properties are
  relative to the sprite’s parent position. It has no arguments, but
  returns a `PIXI.Rectangle` object.
- **getLocalBounds**: Gives you a `Rectangle` object with `x`, `y`,
  `width`
  and `height` properties that match the sprite's size and position. The `x` and `y` properties
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
- **toGlobal**: Calculates the global position of a `DisplayObject`.
  *arguments*: (`position`). The `position` argument is a `PIXI.Point`
  object which should be the local `position` object that you want to
  find the global `x` and `y` coordinates for. `toGlobal` returns a `PIXI.Point`
  object that contains `x` and `y` properties that tell you the global
  position.
- **toLocal**: Calculates the local position of a `DisplayObject`.
  *arguments*: (`position`). The `position` argument is a `PIXI.Point`
  object which should be the global `position` object that you want to
  find the local `x` and `y` coordinates for. `toGlobal` returns a `PIXI.Point`
  object that contains `x` and `y` properties that tell you the global
  position.
- **swapChildren**: Swaps the array index positions of two child
  sprites inside their parent container. *arguments*: (`child1`,
  `child2`). Both arguments should be `DisplayObject`s that are
  children of the same parent container.
- **updateCache**: Generates and updates the cached sprite for this
  object. No arguments and doesn't return anything.
- **getChildIndex**: Returns the index position of a child sprite in
  the parent's `children` array. *arguments* (child). Supply any
  `DisplayObject`.
- **setChildIndex**: Sets the index position of a child sprite in
  the parent's `children` array. *arguments* (child). Supply any
  `DisplayObject`.

In addition to these, sprites have a bunch of callback methods that
are used with mouse and touch events. Later you’ll
learn how to use them to make interactive buttons. 








