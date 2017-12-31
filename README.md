Pixi教程
=============

基于官方教程翻译；水平有限，如有错误欢迎提issue，转载请注明出处。

这个教程将要一步步介绍怎么用[Pixi](https://github.com/pixijs/pixi.js)做游戏或者交互式媒体。这个教程已经升级到 **[Pixi v4.5.5](https://github.com/pixijs/pixi.js/releases/tag/v4.5.5)**。如果你喜欢这个教程，[你一定也喜欢这本书，它包含了这个教程80%的内容](http://www.springer.com/us/book/9781484210956)。

### 目录：
1. [介绍](#introduction)
2. [安装](#settingup)
  1. [安装 Pixi](#installingpixi)
3. [创建舞台（stage）和画布（renderer）](#application)
4. [Pixi 精灵](#sprites)
5. [把图像加载进纹理缓存](#loading)
6. [显示精灵（sprite）](#displaying)
  1. [使用别名](#usingaliases)
  2. [一些关于加载的其他知识](#alittlemoreaboutloadingthings)
    1. [使用普通的javaScript Img对象或canvas创建一个精灵](#makeaspritefromanordinaryjavascriptimageobject)
    2. [给已经加载的文件设定一个名字](#assigninganametoaloadingfile)
    3. [监视加载进程](#monitoringloadprogress)
    4. [一些关于Pixi的加载器的其他知识](#moreaboutpixisloader)
7. [定位精灵](#positioning)
8. [大小和比例](#sizenscale)
9. [角度](#rotation)
10. [从精灵图（雪碧图）中获取精灵](#tileset)
11. [使用一个纹理贴图集](#textureatlas)
12. [加载纹理贴图集](#loadingatlas)
13. [从一个纹理贴图集创建精灵](#creating-sprites-from-a-loaded-texture-atlas)
14. [移动精灵](#movingsprites)
15. [使用速度属性](#velocity)
16. [游戏状态](#gamestates)
17. [键盘响应](#keyboard)
18. [将精灵分组](#grouping)
  1. [绝对位置和相对位置](#localnglobal)
  2. [使用 ParticleContainer 分组精灵](#spritebatch)
19. [用 Pixi 绘制几何图形](#graphic)
  1. [矩形](#rectangles)
  2. [圆形](#circles)
  3. [椭圆](#ellipses)
  4. [圆角矩形](#rounded-rectangles)
  5. [线](#lines)
  6. [多边形](#polygons)
20. [显示文本](#text)
21. [碰撞检测](#collision)
  1. [一个 hitTestRectangle 函数](#the-hittestrectangle-function)
22. [实例学习: 宝物猎人](#casestudy)
  1. [用 setup 函数初始化游戏](#initialize)
    1. [创建游戏场景](#gamescene)
    2. [创建地牢，门，猎人和宝箱](#makingdungon)
    3. [创建泡泡怪(这个怪物好萌)](#makingblob)
    4. [创建血条](#healthbar)
    5. [创建提示文本](#message)
  2. [开始游戏](#playing)
  3. [移动猎人](#movingexplorer)
    1. [限制移动范围](#containingmovement)
  4. [移动泡泡怪们](#movingmonsters)
  5. [碰撞检测](#checkingcollisions)
  6. [处理到达出口和结束游戏](#reachingexit)
23. [一些关于精灵的其他知识](#spriteproperties)
24. [展望未来](#takingitfurther)</br>
  i.[Hexi](#hexi)</br>
  ii.[BabylonJS](#babylonjs)</br>
25. [支持这个工程](#supportingthisproject)

<a id='introduction'></a>
介绍
------------
Pixi是一个超快的2D渲染引擎。这意味着什么呢？这意味着它会帮助你用JavaScript或者其他HTML5技术来显示媒体，创建动画或管理交互式图像，从而制作一个游戏或应用。它拥有语义化的，简洁的API接口并且加入了一些非常有用的特性。比如支持纹理贴图集和为精灵（交互式图像）提供了一个简单的动画系统。它也提供了一个完备的场景图，你可以在精灵图层里面创建另一个精灵，当然也可以让精灵响应你的鼠标或触摸事件。最重要的的是，Pixi没有妨碍你的编程方式，你可以自己选择使用多少它的功能，你可以遵循你自己的编码风格，或让Pixi与其他有用的框架无缝集成。

Pixi的API事实上比起久经沙场又老旧的Macromedia/Adobe Flash API要精致。如果你是一个Flash开发者，将会对这样的API感觉更好。其他的同类渲染框架（比如CreateJS,Starling, Sparrow 和 Apple’s SpriteKit.）也在使用类似的API。Pixi API的优势在于它是通用的：它不是一个游戏引擎。这是一个优势，因为它给了你所有的自由去做任何你想做的事，甚至用它可以写成你自己的游戏引擎。（译者：作者这点说的很对，译者有一个朋友就使用它制作自己的Galgame引擎AVG.js）。

在这个教程里，你将会明白怎样用Pixi的强大的图片渲染能力和场景图技术来和做一个游戏联系起来。但是Pixi不仅仅能做游戏 —— 你能用这个技术去创建任何交互式媒体应用。这甚至意味着手机应用。

你在开始这个教程之前需要知道什么呢？

你需要一个对于HTML和JavaScript大致的了解。你没必要成为这方面的专家才能开始，即使一个野心勃勃的初学者也可以开始学习。这本书就是一个学习的好地方：

[Foundation Game Design with HTML5 and JavaScript](http://www.apress.com/9781430247166)

我知道这本书是最好的，因为这本书是我写的！

这里有一些好的代码来帮助你开始：

[Khan Academy: Computer
Programming](http://www.khanacademy.org/computing/cs)

[Code Academy:
JavaScript](http://www.codecademy.com/tracks/javascript)

选择一个属于你的最好的学习方式吧！

所以，明白了么？

你知道JavaScript的变量，函数，数组和对象怎么使用么？你知道[JSON 数据文件](http://www.copterlabs.com/blog/json-what-it-is-how-it-works-how-to-use-it/)是什么么? 你用过 [Canvas 绘图 API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_graphics_with_canvas)么?

为了使用Pixi，你也需要在你项目的根目录运行一个web服务器，你知道什么是web服务器，怎么在你的项目文件夹里面运行它么？最好的方式是使用[node.js](http://nodejs.org) 并且去用命令行安装[http-server](https://github.com/nodeapps/http-server). 无论如何，你需要习惯和Unix命令行一起工作。你可以[在这个视频中](https://www.youtube.com/watch?feature=player_embedded&v=cX9ASUE3YAQ)去学习怎样使用 Unix当你完成时，继续去学习 [这个视频](https://www.youtube.com/watch?v=INk0ATBbclc).你应该学会怎样用Unix，这是一个很有趣和简单的和电脑交互的方式，并且仅仅需要两个小时。

如果你真的不想用命令行的方式，就尝试下 Mongoose webserver:

[Mongoose](http://cesanta.com/mongoose.shtml)

或者来使用[Brackets text editor](http://brackets.io)这个令人惊艳的代码编辑器。他会在你点击那个“闪电按钮”的时候自动启动web服务器和浏览器。

现在，如果你觉得你准备好了了，开始吧！

（给读者的小提示：这是一个 *交互式的文档*.如果你有关于特殊细节的任何问题或需要任何澄清都可以创建一个GitHub工程 **issue** ，我会对这个文档更新更多信息。）

<a id='settingup'></a>
安装
----------
在你开始写任何代码之前，给你的工程创建一个目录，并且在根目录下运行一个web服务器。如果你不这么做，Pixi不会工作的。

现在，你需要去安装Pixi。

<a id='installingpixi'></a>
### 安装 Pixi

这个教程使用的版本是 **v4.5.5**
你可以选择使用 [Pixi v4.5.5的发布页面](https://github.com/pixijs/pixi.js/releases/tag/v4.5.5)`pixi`文件夹下的`pixi.min.js`文件，或者从[Pixi的主要发布页面](https://github.com/pixijs/pixi.js/releases)中获取最新版本。

这个文件就是你使用Pixi唯一需要的文件，你可以忽视所有这个工程的其他文件，**你不需要他们**。

现在，创建一个基础的HTML页面，用一个`<script>`标签去加载你刚刚下载的`pixi.min.js`文件。`<script>`标签的`src`属性应该是你根目录文件的相对路径————当然请确保你的web服务器在运行。你的`<script>`标签应该看起来像是这样：

```html
<script src="pixi.min.js"></script>
```
这是你用来链接Pixi和测试它是否工作的基础页面。（这里假设 `pixi.min.js`在一个叫做`pixi`的子文件夹中）：

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>Hello World</title>
</head>
  <script src="pixi/pixi.min.js"></script>
<body>
  <script type="text/javascript">
    let type = "WebGL"
    if(!PIXI.utils.isWebGLSupported()){
      type = "canvas"
    }

    PIXI.utils.sayHello(type)
  </script>
</body>
</html>
```

如果Pixi连接成功，一些这样的东西会在你的浏览器控制台里显示：
```
      PixiJS 4.4.5 - * canvas * http://www.pixijs.com/  ♥♥♥
```


<a id='application'></a>
创建Pixi应用和 `舞台`
-------------------------------

现在你可以开始使用Pixi！

但是怎么用？

第一步就是去创建一个可以显示图片的矩形显示区。Pixi拥有一个`Pixi应用`对象来帮助你创建它。它会自动创建一个`<canvas>`HTML标签并且计算出怎么去让你的图片在这个标签中显示。你现在需要创建一个特殊的Pixi`容器`对象，他被称作`舞台`。正如你所见，这个`舞台`对象将会被当作根容器而使用，它将包裹所有你想用Pixi显示的东西。

这里是你需要创建一个名叫`app`的Pixi应用对象和一个`舞台`的必要的代码。这些代码需要在你的HTML文档中以`<script>`标签包裹。

```js
//Create a Pixi Application
let app = new PIXI.Application({width: 256, height: 256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
```
这是你想要开始使用Pixi的最基本的代码。它在你的文档中创建了一个256像素宽高的黑色canvas标签。当你运行这个代码的时候浏览器应该显示成这样：

![Basic display](/examples/images/screenshots/01.png)

啊哈, 一个 [black square](http://rampantgames.com/blog/?p=7745)!

`PIXI.Application`算出了应该使用Canvas还是WebGL去渲染图象，它取决于你正在使用的浏览器支持哪一个。它的参数是一个被称作`options`的对象。在这儿例子中，它的`width` 和 `height`属性已经被设置了，它们决定了canvas的宽和高（单位是像素）。你能够在`options`对象中使用更多的属性设置，这里展示了你如何使用它来圆滑边界，设置透明度和分辨率：
```js
let app = new PIXI.Application({
    width: 256,         // default: 800
    height: 256,        // default: 600
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1       // default: 1
  }
);
```
如果你觉得Pixi的默认设置也不错，你就不需要作任何的设置，但是如果你需要，就在这里看一下Pixi的文档吧：
 [PIXI.Application](http://pixijs.download/release/docs/PIXI.Application.html).

这些设置做了些什么呢？
`antialias`使得字体的边界和几何图形更加圆滑（WebGL的anti-aliasing在所有平台都不可用，所以你需要在你的游戏的标签平台上测试他们）。`transparent`将整个Canvs标签的透明度进行了设置。`resolution`让Pixi在不同的分辨率和像素密度的平台上运行变得简单。设置分辨率对于这个教程而言有些超纲了，到那时你可以看[Mat Grove'sexplanation](http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/)之中是如何使用`resolution`的所有细节的。但是平常，只要保持`resolution`是1，就可以应付大多数工程了。

Pixi的`画布`对象将会默认选择WebGL引擎渲染模式，它更快并且可以让你使用一些壮观的视觉特效————如果你把他们都学了。但是如果你需要强制使用Canvas引擎绘制而抛弃WebGL，你可以设置`forceCanvas`选项为`true`，像这样：
```js
forceCanvas: true,
```

如果你需要在你创建canvs标签之后改变它的背景色，设置 `app.renderer`对象的`backgroundColor`属性为一个任何的十六进制颜色：

```js
app.renderer.backgroundColor = 0x061639;
```
如果你想要去找到`画布`的宽高，使用`app.renderer.view.width` 和`app.renderer.view.height`。

使用`画布`的`resize`方法可以改变canvas的大小，提供任何新的`width` 和 `height`变量给他都行。但是为了确认宽高的格式正确，将`autoResize`设置为`true`。
```js
app.renderer.autoResize = true;
app.renderer.resize(512, 512);
```
如果你想让canvas占据整个窗口，你可以将这些CSS代码放在文档中，并且刷新你浏览器窗口的大小。
```
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);
```
但是，如果你这么做了，要记得把padding和margin都设置成0：
```html
<style>* {padding: 0; margin: 0}</style>
```
(\*这个通配符, 是CSS选择所有HTML元素的意思。)

如果你想要canvs在任何浏览器中统一尺寸，你可以使用[`scaleToWindow` 成员函数](https://github.com/kittykatattack/scaleToWindow).

<a id='sprites'></a>
Pixi 精灵
------------
现在你就有了一个画布，可以开始往上面放图像了。所有你想在画布上显示的东西必须被加进一个被称作 `舞台`的Pixi对象中。你能够像这样使用舞台对象：
```js
app.stage
```
这个`舞台`是一个Pixi `容器`对象。你能把它理解成一种将放进去的东西分组并存储的空箱子。 `舞台`对象是在你的场景中所有可见对象的根容器。所有你放进去的东西都会被渲染到canvas中。现在`舞台`是空的，但是很快我们就会放进去一点东西。 (你可以从这了解关于Pixi`容器`对象的更多信息[here](http://pixijs.download/release/docs/PIXI.Container.html)).

（重要信息：因为`舞台`是一个Pixi`容器`对象，所以他有很多其他`容器`对象都有的属性和方法。但是，尽管舞台拥有`width` 和 `height`属性， *他们都不能查看画布窗口的大小* 。舞台的`width` 和 `height`属性仅仅告诉了你你放进去的东西占用的大小 - 更多的信息在前面！）

所以你可以放些什么到舞台上呢？那就是被称作 **精灵** 的特殊图像对象。精灵是你能用代码控制图像的基础。你能够控制他们的位置，大小，和许多其他有用的属性来产生交互和动画。学习怎样创建和控制精灵是学习Pixi最重要的部分。如果你知道怎么创建精灵和把他们添加进舞台，离做出一个游戏就仅仅剩下一步之遥！

Pixi拥有一个`精灵`类来创建游戏精灵。有三种主要的方法来创建它：
- 用一个单图像文件创建。
- 用一个 **雪碧图** 来创建。雪碧图是一个放入了你游戏所需的所有图像的大图。
- 从一个纹理贴图集中创建。（纹理贴图集就是用JSON定义了图像大小和位置的雪碧图）

你将要学习这三种方式，但是在开始之前，你得弄明白图片怎么用Pixi显示。

<a id='loading'></a>
将图片加载到纹理缓存中
-------------------------------------

因为Pixi用WebGL和GPU去渲染图像，所以图像需要转化成GPU可以处理的版本。可以被GPU处理的图像被称作 **纹理** 。在你让精灵显示图片之前，需要将普通的图片转化成WebGL纹理。为了让所有工作执行的快速有效率，Pixi使用 **纹理缓存** 来存储和引用所有你的精灵需要的纹理。纹理的名称字符串就是图像的地址。这意味着如果你有从`"images/cat.png"`加载的图像，你可以在纹理缓存中这样找到他：

```js
PIXI.utils.TextureCache["images/cat.png"];
```
纹理被以WEBGL兼容的格式存储起来，它可以使Pixi的渲染有效率的进行。你现在可以使用Pixi的`精灵`类来创建一个新的精灵，让它使用纹理。
```js
let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];
let sprite = new PIXI.Sprite(texture);
```
但是你该怎么加载图像并将它转化成纹理？答案是用Pixi已经构建好的`loader`对象。

Pixi强大的`loader`对象可以加载任何你需要种类的图像资源。这里展示了怎么加载一个图像并在加载完成时用一个叫做`setup`的方法来使用它。
```js
PIXI.loader
  .add("images/anyImage.png")
  .load(setup);

function setup() {
  //This code will run when the loader has finished loading the image
}
```
[Pixi的最佳实践](http://www.html5gamedevs.com/topic/16019-preload-all-textures/?p=90907)
如果你使用了Loader，你就应该创建一个精灵来连接`loader`的`resources`对象，像下面这样：
```js
let sprite = new PIXI.Sprite(
  PIXI.loader.resources["images/anyImage.png"].texture
);
```
这里是一个完整的加载图像的代码。调用`setup`方法，并未加载的图像创建一个精灵。
```js
PIXI.loader
  .add("images/anyImage.png")
  .load(setup);

function setup() {
  let sprite = new PIXI.Sprite(
    PIXI.loader.resources["images/anyImage.png"].texture
  );
}
```
这是这个教程之中用来家在图像和创建精灵的通用方法。

你可以链式调用`add`方法来加载一系列图像，像下面这样：
```js
PIXI.loader
  .add("images/imageOne.png")
  .add("images/imageTwo.png")
  .add("images/imageThree.png")
  .load(setup);
```
更好的方式则是用数组给一个`add`方法传参，像这样：
```js
PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png",
    "images/imageThree.png"
  ])
  .load(setup);
```
这个`loader`也允许你使用JSON文件，关于JSON文件你应该已经在前面学过了。

<a id='displaying'></a>
显示精灵
------------------

在你加载一个图像之后，可以用它来创建一个精灵，你需要用`stage.addChild`方法把它放到Pixi的`舞台`上面去，像这样：
```js
app.stage.addChild(cat);
```
记住，`舞台`是用来包裹你所有精灵的主要容器。

**重点：你不应该看见任何没被加入`舞台`的精灵**

在我们继续之前，让我们看一个怎样使用显示一个单图像的例子。在`examples/images`文件夹中，你将找到一个64*64像素大小的猫的PNG图像文件。

![基础显示图像文件](/examples/images/cat.png)

这里是所有的显示一个图像，创建一个精灵，显示在Pixi的舞台上所需要的代码。
```js
//Create a Pixi Application
let app = new PIXI.Application({
    width: 256,
    height: 256,                       
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
PIXI.loader
  .add("images/cat.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let cat = new PIXI.Sprite(PIXI.loader.resources["images/cat.png"].texture);

  //Add the cat to the stage
  app.stage.addChild(cat);
}
```
程序跑起来，你会看到:

![在舞台上的小猫咪](/examples/images/screenshots/02.png)


现在我们已经取得了一些进展!

如果你想把一个精灵从舞台上挪走，就可以使用`removeChild`方法：
```js
app.stage.removeChild(anySprite)
```
但是通常，我们都把精灵的`visible`属性设置成`false`来让精灵简单的隐藏。
```js
anySprite.visible = false;
```
<a id='usingaliases'></a>
### 使用别名
你可以对你使用频繁的Pixi对象和方法设置一些简略的可读性更强的别名。举个例子，你想给所有的Pixi对象增加`PIXI`前缀么？如果你这样想，那就创建一个简短的别名给他吧。下面是一个给`TextureCache`对象创建别名的例子：

```js
let TextureCache = PIXI.utils.TextureCache
```
现在就可以像这样使用别名了：
```js
let texture = TextureCache["images/cat.png"];
```
使用别名给写出简洁的代码提供了额外的好处：他帮助你缓存了Pixi的常用API。如果Pixi的API在将来的版本里改变了 - 没准他真的会变！ - 你将会需要在一个地方更新这些对象和方法，你只用在工程的开头而不是所有的实例那里！所以Pixi的开发团队想要改变它的时候，你只用一步即可完成这个操作！

来看看怎么将所有的Pixi对象和方法改成别名之后，来重写加载和显示图像的代码。
```js
//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

//Create a Pixi Application
let app = new Application({
    width: 256,
    height: 256,                       
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load an image and run the `setup` function when it's done
loader
  .add("images/cat.png")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {

  //Create the cat sprite
  let cat = new Sprite(resources["images/cat.png"].texture);

  //Add the cat to the stage
  app.stage.addChild(cat);
}

```
大多数教程中的例子将会使用Pixi的别名来处理。**除非另有说明，否则你可以假定下面所有的代码都使用了这些别名。**

这就是你需要的所有的关于加载图像和创建精灵的知识。

<a id='alittlemoreaboutloadingthings'></a>
### 一些关于加载的其他知识

我们的例子中的格式是加载图像和显示精灵的最佳实践。所以你可以安全的忽视这些章节直接看"定位精灵"。但是Pixi的加载器有一些你不常用的复杂功能。

<a id='makeaspritefromanordinaryjavascriptimageobject'></a>
#### 使用普通的javaScript Img对象或canvas创建一个精灵

为了优化和效率我们常常选择从预加载的纹理缓存的纹理之中创建精灵。但是如果因为某些原因你需要从JavaScript的`Image`对象之中创建，你可以使用Pixi的`BaseTexture`和`Texture`类：
```js
let base = new PIXI.BaseTexture(anyImageObject),
    texture = new PIXI.Texture(base),
    sprite = new PIXI.Sprite(texture);
```
你可以使用`BaseTexture.fromCanvas`从任何已经存在canvas标签中创建纹理：
```js
let base = new PIXI.BaseTexture.fromCanvas(anyCanvasElement),
```
如果你想改变已经显示的精灵的纹理，使用`texture`属性，可以设置任何`Texture`对象，像下面这样：
```js
anySprite.texture = PIXI.utils.TextureCache["anyTexture.png"];
```
你可以使用这个技巧在游戏发生一些重大变化时交互式的改变精灵的纹理。

<a id='assigninganametoaloadingfile'></a>
#### 给加载的文件设置别名

你可以给任何你加载的源文件分配一个独一无二的别名。你只需要在`add`方法中第一个参数位置传进去这个别名就行了，举例来说，下面实现了怎么给这个猫的图片重命名为`catImage`。
```js
PIXI.loader
  .add("catImage", "images/cat.png")
  .load(setup);
```
这种操作在`loader.resources`中创建了一个叫做`catImage`的对象。
这意味着你可以创建一个引用了`catImage`对象的精灵，像这样：
```js
let cat = new PIXI.Sprite(PIXI.loader.resources.catImage.texture);
```
然而，我建议你永远别用这个操作！因为你将不得不记住你所有加载文件的别名，而且必须确信你只用了它们一次，使用路径命名，我们将将这些事情处理的更简单和更少错误。

<a id='monitoringloadprogress'></a>
#### 监视加载进程

Pixi的加载器有一个特殊的`progress`事件，它将会调用一个可以定制的函数，这个函数将在每次文件加载时调用。`progress`事件将会被`loader`的`on`方法调用，像是这样：
```js
PIXI.loader.on("progress", loadProgressHandler);
```
这里展示了怎么将`on`方法注入加载链中，并且每当文件加载时调用一个用户定义的名叫`loadProgressHandler`的函数。
```js
PIXI.loader
  .add([
    "images/one.png",
    "images/two.png",
    "images/three.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler() {
  console.log("loading");
}

function setup() {
  console.log("setup");
}
```
每一个文件加载，progress事件调用`loadProgressHandler`函数在控制台输出 "loading"。当三个文件都加载完毕，`setup`方法将会运行，下面是控制台的输出：
```js
loading
loading
loading
setup
```
这就不错了，不过还能变的更好。你可以知道哪个文件被加载了以及有百分之多少的文件被加载了。你可以在`loadProgressHandler`增加`loader`参数和`resource`参数实现这个功能，像下面这样：
```js
function loadProgressHandler(loader, resource) { /*...*/ }
```
你现在可以使用 `resource.url`变量来找到现在已经被加载的文件。（如果你想找到你定义的别名，使用resource.name参数。）你可以使用`loader.progress`来找到现在有百分之多少的文件被加载了，这里有一些关于上面描述的代码：
```js
PIXI.loader
  .add([
    "images/one.png",
    "images/two.png",
    "images/three.png"
  ])
  .on("progress", loadProgressHandler)
  .load(setup);

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

function setup() {
  console.log("All files loaded");
}
```
这里是程序运行后的控制台显示：
```js
loading: images/one.png
progress: 33.333333333333336%
loading: images/two.png
progress: 66.66666666666667%
loading: images/three.png
progress: 100%
All files loaded
```
这实在太酷了！因为你能用这个玩意做个进度条出来。
（注意：还有一些额外的`resource`对象属性， `resource.error`会告诉你有哪些加载时候的错误，`resource.data`将会给你文件的原始二进制数据。）

<a id='moreaboutpixisloader'></a>
#### 一些关于Pixi的加载器的其他知识

Pixi的加载器有很多可以设置的功能，让我速览一下：

`add` 方法有四个基础参数:
```js
add(name, url, optionObject, callbackFunction)
```
这里有文档里面对这些参数的描述：

`name` (string): 加载源文件的别名,如果没设置，`url`就会被放在这.  
`url` (string): 源文件的地址，是加载器 `baseUrl`的相对地址.  
`options` (object literal): 加载设置.  
`options.crossOrigin` (Boolean): 源文件请求跨域不？默认是自动设定的。  
`options.loadType`: 源文件是怎么加载进来的？默认是`Resource.LOAD_TYPE.XHR`。
`options.xhrType`: 用XHR的时候该怎么处理数据？ 默认是`Resource.XHR_RESPONSE_TYPE.DEFAULT`。  
`callbackFunction`: 当这个特定的函数加载完，这个特定的函数将会被执行。

只有`url`必填（你总得加载个文件吧。）

这里有点用了`add`方法加载文件的例子。第一个就是文档里所谓的“正常语法”：
```js
.add('key', 'http://...', function () {})
.add('http://...', function () {})
.add('http://...')
```
这些就是所谓“对象语法”啦：
```js
.add({
  name: 'key2',
  url: 'http://...'
}, function () {})

.add({
  url: 'http://...'
}, function () {})

.add({
  name: 'key3',
  url: 'http://...'
  onComplete: function () {}
})

.add({
  url: 'https://...',
  onComplete: function () {},
  crossOrigin: true
})
```
你也可以给`add`方法传一个对象的数组，或者既使用对象数组，又使用链式加载：
```js
.add([
  {name: 'key4', url: 'http://...', onComplete: function () {} },
  {url: 'http://...', onComplete: function () {} },
  'http://...'
]);
```
（注意：如果你需要重新加载一批文件，调用加载器的`reset`方法：`PIXI.loader.reset();`）

Pixi的加载器还有许多其他的高级特性，包括可以让你加载和解析所有类型二进制文件的选项。这些并非你每天都要做的，也超出了这个教程的范围，所以[从GitHub项目中获取更多信息](https://github.com/englercj/resource-loader)吧！

<a id='positioning'></a>
精灵位置
-------------------

现在你知道了怎么创建和显示一个精灵，让我们学习如何定位他们的位置和改变他们的大小
在最早的示例里那个猫的精灵被放在了舞台的左上角。它的`x`和`y`坐标都是0。你可以通过改变它的`x`和`y`坐标的值来改变他们的位置。下面的例子就是你通过设置`x`和`y`为96坐标让它在舞台上居中。

```js
cat.x = 96;
cat.y = 96;
```
在你创建这个精灵之后，把这两行代码放进`setup`方法。
```js
function setup() {

  //Create the `cat` sprite
  let cat = new Sprite(resources["images/cat.png"].texture);

  //Change the sprite's position
  cat.x = 96;
  cat.y = 96;

  //Add the cat to the stage so you can see it
  app.stage.addChild(cat);
}
```
（注意：在这个例子里，`Sprite`是 `PIXI.Sprite`的别名，`TextureCache`是`PIXI.utils.TextureCache`的别名，`resources`是`PIXI.loader.resources`的别名，我从现在开始在代码中使用这些别名。）

这两行代码将把猫往右移动96像素，往下移动96像素。

![Cat centered on the stage](/examples/images/screenshots/03.png)

这只猫的左上角（它的左耳朵）（译者注：从猫的角度看其实是它的右耳朵。。。）表示了它的`x` 和 `y` 坐标点。为了让他向右移动，增加`x`这个属性的值，为了让他向下移动，就增加`y`属性的值。如果这只猫的`x`属性为0，他就呆在舞台的最左边，如果他的`y`属性为0，他就呆在舞台的最上边。

![Cat centered on the stage - diagram](/examples/images/screenshots/04.png)

你可以一句话设置精灵的`x`和`y`:
```js
sprite.position.set(x, y)
```
<a id='sizenscale'></a>
Size and scale
--------------

You can change a sprite's size by setting its `width` and `height`
properties. Here's how to give the cat a `width` of 80 pixels and a `height` of
120 pixels.
```js
cat.width = 80;
cat.height = 120;
```
Add those two lines of code to the `setup` function, like this:
```js
function setup() {

  //Create the `cat` sprite
  let cat = new Sprite(resources["images/cat.png"].texture);

  //Change the sprite's position
  cat.x = 96;
  cat.y = 96;

  //Change the sprite's size
  cat.width = 80;
  cat.height = 120;

  //Add the cat to the stage so you can see it
  app.stage.addChild(cat);
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
```js
cat.scale.x = 0.5;
cat.scale.y = 0.5;
```
Scale values are numbers between 0 and 1 that represent a
percentage of the sprite's size. 1 means 100% (full size), while
0.5 means 50% (half size). You can double the sprite's size by setting
its scale values to 2, like this:
```js
cat.scale.x = 2;
cat.scale.y = 2;
```
Pixi has an alternative, concise way for you set sprite's scale in one
line of code using the `scale.set` method.
```js
cat.scale.set(0.5, 0.5);
```
If that appeals to you, use it!

<a id='rotation'></a>
Rotation
--------

You can make a sprite rotate by setting its `rotation` property to a
value in [radians](http://www.mathsisfun.com/geometry/radians.html).
```js
cat.rotation = 0.5;
```
But around which point does that rotation happen?

You've seen that a sprite's top left corner represents its `x` and `y` position. That point is
called the **anchor point**. If you set the sprite’s `rotation`
property to something like `0.5`, the rotation will happen *around the
sprite’s anchor point*.
This diagram shows what effect this will have on our cat sprite.

![Rotation around anchor point - diagram](/examples/images/screenshots/07.png)

You can see that the anchor point, the cat’s left ear, is the center of the imaginary circle around which the cat is rotating.
What if you want the sprite to rotate around its center? Change the
sprite’s `anchor` point so that it’s centered inside the sprite, like
this:
```js
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
```js
cat.anchor.set(x, y)
```
Sprites also have a `pivot` property which works in a similar way to
`anchor`. `pivot` sets the position
of the sprite's x/y origin point. If you change the pivot point and
then rotate the sprite, it will
rotate around that origin point. For example, the following code will
set the sprite's `pivot.x` point to 32, and its `pivot.y` point to 32
```js
cat.pivot.set(32, 32)
```
Assuming that the sprite is 64x64 pixels, the sprite will now rotate
around its center point. But remember: if you change a sprite's pivot
point, you've also changed its x/y origin point.

So, what's the difference between `anchor` and `pivot`? They're really
similar! `anchor` shifts the origin point of the sprite's image texture, using a 0 to 1 normalized value.
`pivot` shifts the origin of the sprite's x and y point, using pixel
values. Which should you use? It's up to you. Just play around
with both of them and see which you prefer.

<a id='tileset'></a>
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

The entire tileset is 192 by 192 pixels. Each image is in its own 32 by 32
pixel grid cell. Storing and accessing all your game graphics on a
tileset is a very
processor and memory efficient way to work with graphics, and Pixi is
optimized for this.

You can capture a sub-image from a tileset by defining a rectangular
area
that's the same size and position as the sub-image you want to
extract. Here's an example of the rocket sub-image that’s been extracted from
the tileset.

![Rocket extracted from tileset](/examples/images/screenshots/10.png)

Let's look at the code that does this. First, load the `tileset.png` image
with Pixi’s `loader`, just as you've done in earlier examples.
```js
loader
  .add("images/tileset.png")
  .load(setup);
```
Next, when the image has loaded, use a rectangular sub-section of the tileset to create the
sprite’s image. Here's the code that extracts the sub image, creates
the rocket sprite, and positions and displays it on the canvas.
```js
function setup() {

  //Create the `tileset` sprite from the texture
  let texture = TextureCache["images/tileset.png"];

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  //(`Rectangle` is an alias for `PIXI.Rectangle`)
  let rectangle = new Rectangle(192, 128, 64, 64);

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  //Create the sprite from the texture
  let rocket = new Sprite(texture);

  //Position the rocket sprite on the canvas
  rocket.x = 32;
  rocket.y = 32;

  //Add the rocket to the stage
  app.stage.addChild(rocket);

  //Render the stage   
  renderer.render(stage);
}
```
How does this work?

Pixi has a built-in `Rectangle` object (`PIXI.Rectangle`) that is a general-purpose
object for defining rectangular shapes. It takes four arguments. The
first two arguments define the rectangle's `x` and `y` position. The
last two define its `width` and `height`. Here's the format
for defining a new `Rectangle` object.
```js
let rectangle = new PIXI.Rectangle(x, y, width, height);
```
The rectangle object is just a *data object*; it's up to you to decide how you want to use it. In
our example we're using it to define the position and area of the
sub-image on the tileset that we want to extract. Pixi textures have a useful
property called `frame` that can be set to any `Rectangle` objects.
The `frame` crops the texture to the dimensions of the `Rectangle`.
Here's how to use `frame`
to crop the texture to the size and position of the rocket.
```js
let rectangle = new Rectangle(192, 128, 64, 64);
texture.frame = rectangle;
```
You can then use that cropped texture to create the sprite:
```js
let rocket = new Sprite(texture);
```
And that's how it works!

Because making sprite textures from a tileset
is something you’ll do with great frequency, Pixi has a more convenient way
to help you do this - let's find out what that is next.

<a id='textureatlas'></a>
Using a texture atlas
---------------------

If you’re working on a big, complex game, you’ll want a fast and
efficient way to create sprites from tilesets. This is where a
**texture atlas** becomes really useful. A texture atlas is a JSON
data file that contains the positions and sizes of sub-images on a
matching tileset PNG image. If you use a texture atlas, all you need
to know about the sub-image you want to display is its name. You
can arrange your tileset images in any order and the JSON file
will keep track of their sizes and positions for you. This is
really convenient because it means the sizes and positions of
tileset images aren’t hard-coded into your game program. If you
make changes to the tileset, like adding images, resizing them,
or removing them, just re-publish the JSON file and your game will
use that data to display the correct images. You won’t have to
make any changes to your game code.

Pixi is compatible with a standard JSON texture atlas format that is
output by a popular software tool called [Texture
Packer](https://www.codeandweb.com/texturepacker). Texture Packer’s
“Essential” license is free. Let’s find out how to use it to make a
texture atlas, and load the atlas into Pixi. (You don’t have to use
Texture Packer. Similar tools, like [Shoebox](http://renderhjs.net/shoebox/) or [spritesheet.js](https://github.com/krzysztof-o/spritesheet.js/), output PNG and JSON files
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
`None`, set **Extrude** to `0`, set **Size constraints** to `Any size` and slide the **PNG Opt
Level** all the way to the left to `0`. These are the basic
settings that will allow the free version of Texture Packer to create
your files without any warnings or errors.)

When you’re done, click the **Publish** button. Choose the file name and
location, and save the published files. You’ll end up with 2 files: a
PNG file and a JSON file. In this example my file names are
`treasureHunter.json` and `treasureHunter.png`. To make your life easier,
just keep both files in your project’s `images` folder. (You can think
of the JSON file as extra metadata for the image file, so it makes
sense to keep both files in the same folder.)
The JSON file describes the name, size and position of each of the
sub-images
in the tileset. Here’s an excerpt that describes the blob monster
sub-image.
```js
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
Processing Unit) decides how to round fractional pixels values. Should
it round them up or down? This will be different for each GPU.
Leaving 1 or 2 pixels spacing around images on a tilseset makes all
images display consistently.

(Note: If you have two pixels of padding around a graphic, and you still notice a strange "off by one pixel" glitch in the
way Pixi is displaying it, try changing the texture's scale mode
algorithm. Here's how: `texture.baseTexture.scaleMode =
PIXI.SCALE_MODES.NEAREST;`. These glitches can sometimes happen
because of GPU floating point rounding errors.)

Now that you know how to create a texture atlas, let's find out how to
load it into your game code.

<a id='loadingatlas'></a>
Loading the texture atlas
-------------------------

To get the texture atlas into Pixi, load it using Pixi’s
`loader`. If the JSON file was made with Texture Packer, the
`loader` will interpret the data and create a texture from each
frame on the tileset automatically.  Here’s how to use the `loader` to load the `treasureHunter.json`
file. When it has loaded, the `setup` function will run.
```js
loader
  .add("images/treasureHunter.json")
  .load(setup);
```
Each image on the tileset is now an individual texture in Pixi’s
cache. You can access each texture in the cache with the same name it
had in Texture Packer (“blob.png”, “dungeon.png”, “explorer.png”,
etc.).

<a id='creatingsprites'></a>
Creating sprites from a loaded texture atlas
--------------------------------------------

Pixi gives you three general ways to create a sprite from a texture atlas:

1.	Using `TextureCache`:
```js
let texture = TextureCache["frameId.png"],
    sprite = new Sprite(texture);
```
2.	If you’ve used Pixi’s `loader` to load the texture atlas, use the
loader’s `resources`:
```js
let sprite = new Sprite(
  resources["images/treasureHunter.json"].textures["frameId.png"]
);
```
3. That’s way too much typing to do just to create a sprite!
So I suggest you create an alias called `id` that points to texture’s
altas’s `textures` object, like this:
```js
let id = PIXI.loader.resources["images/treasureHunter.json"].textures;
```
Then you can just create each new sprite like this:
```js
let sprite = new Sprite(id["frameId.png"]);
```
Much better!

Here's how you could use these three different sprite creation
techniques in the `setup` function to create and display the
`dungeon`, `explorer`, and `treasure` sprites.
```js

//Define variables that might be used in more
//than one function
let dungeon, explorer, treasure, id;

function setup() {

  //There are 3 ways to make sprites from textures atlas frames

  //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  //2. Access the texture using throuhg the loader's `resources`:
  explorer = new Sprite(
    resources["images/treasureHunter.json"].textures["explorer.png"]
  );
  explorer.x = 68;

  //Center the explorer vertically
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  //3. Create an optional alias called `id` for all the texture atlas
  //frame id textures.
  id = PIXI.loader.resources["images/treasureHunter.json"].textures;

  //Make the treasure box using the alias
  treasure = new Sprite(id["treasure.png"]);
  app.stage.addChild(treasure);

  //Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);
}
```
Here's what this code displays:

![Explorer, dungeon and treasure](/examples/images/screenshots/13.png)

The stage dimensions are 512 by 512 pixels, and you can see in the
code above that the `app.stage.height` and `app.stage.width` properties are used
to align the sprites. Here's how the `explorer`'s `y` position is
vertically centered:
```js
explorer.y = app.stage.height / 2 - explorer.height / 2;
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
Notice that the `blob` sprites are created and added to the stage in a
loop, and assigned random positions.
```js
<!doctype html>
<meta charset="utf-8">
<title>Make a sprite from a texture atlas</title>
<body>
<script src="../pixi/pixi.min.js"></script>
<script>

//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({
    width: 512,
    height: 512,                       
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

//load a JSON file and run the `setup` function when it's done
loader
  .add("images/treasureHunter.json")
  .load(setup);

//Define variables that might be used in more
//than one function
let dungeon, explorer, treasure, door, id;

function setup() {

  //There are 3 ways to make sprites from textures atlas frames

  //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  app.stage.addChild(dungeon);

  //2. Access the texture using throuhg the loader's `resources`:
  explorer = new Sprite(
    resources["images/treasureHunter.json"].textures["explorer.png"]
  );
  explorer.x = 68;

  //Center the explorer vertically
  explorer.y = app.stage.height / 2 - explorer.height / 2;
  app.stage.addChild(explorer);

  //3. Create an optional alias called `id` for all the texture atlas
  //frame id textures.
  id = PIXI.loader.resources["images/treasureHunter.json"].textures;

  //Make the treasure box using the alias
  treasure = new Sprite(id["treasure.png"]);
  app.stage.addChild(treasure);

  //Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  app.stage.addChild(treasure);

  //Make the exit door
  door = new Sprite(id["door.png"]);
  door.position.set(32, 0);
  app.stage.addChild(door);

  //Make the blobs
  let numberOfBlobs = 6,
      spacing = 48,
      xOffset = 150;

  //Make as many blobs as there are `numberOfBlobs`
  for (let i = 0; i < numberOfBlobs; i++) {

    //Make a blob
    let blob = new Sprite(id["blob.png"]);

    //Space each blob horizontally according to the `spacing` value.
    //`xOffset` determines the point from the left of the screen
    //at which the first blob should be added.
    let x = spacing * i + xOffset;

    //Give the blob a random y position
    //(`randomInt` is a custom function - see below)
    let y = randomInt(0, app.stage.height - blob.height);

    //Set the blob's position
    blob.x = x;
    blob.y = y;

    //Add the blob sprite to the stage
    app.stage.addChild(blob);
  }
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
```js
let x = spacing * i + xOffset;
blob.x = x;
```
`spacing` has a value 48, and `xOffset` has a value of 150. What this
means is the first `blob` will have an `x` position of 150.
This offsets it from the left side of the stage by 150 pixels. Each
subsequent `blob` will have an `x` value that's 48 pixels greater than
the `blob` created in the previous iteration of the loop. This creates
an evenly spaced line of blob monsters, from left to right, along the dungeon floor.

Each `blob` is also given a random `y` position. Here's the code that
does this:
```js
let y = randomInt(0, stage.height - blob.height);
blob.y = y;
```
The `blob`'s `y` position could be assigned any random number between 0 and
512, which is the value of `stage.height`. This works with the help of
a custom function called `randomInt`. `randomInt` returns a random number
that's within a range between any two numbers you supply.
```js
randomInt(lowestNumber, highestNumber)
```
That means if you want a random number between 1 and 10, you can get
one like this:
```js
let randomNumber = randomInt(1, 10);
```
Here's the `randomInt` function definition that does all this work:
```js
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```
`randomInt` is a great little function to keep in your back pocket for
making games - I use it all the time.

<a id='movingsprites'></a>
Moving Sprites
--------------

You now know how to display sprites, but how do you make them move?
That's easy: create a looping function using Pixi's `ticker`
This is called a **game loop**.
Any code you put inside the game loop will update 60 times per
second. Here's some code you could write to make the `cat` sprite move
to the right at a rate of 1 pixel per frame.
```js

function setup() {

  //Start the game loop by adding the `gameLoop` function to
  //Pixi's `ticker` and providing it with a `delta` argument.
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Move the cat 1 pixel
  cat.x += 1;
}
```
If you run this bit of code, you'll see the sprite gradually move to
the right side of the stage.

![Moving sprites](/examples/images/screenshots/15.png)

That's because each time the `gameLoop` runs, it adds 1 to the cat's x position.
```
cat.x += 1;
```

Any function you add to Pixi's `ticker` will be called 60 times per second. You can see that the function is provided a `delta` argument - what's that?

The `delta` value represents the amount of fractional lag between frames. You can optionally add it to the cat's position, to make the cat's animation independent of the frame rate. Here's how:
```js
cat.x += 1 + delta;
```
Whether or not you choose to add this `delta` value is largely an aestheic choice. And the effect will only really be noticable if your animation is struggling to keep up with a consistent 60 frames per second display rate (which might happen, for example, if it's running on a slow device). The rest of the examples in this tutorial won't use this `delta` value, but feel free to use it in your own work if you wish.

You don't have to use Pixi's ticker to create a game loop. If you prefer, just use `requestAnimationFrame`, like this:

```js
function gameLoop() {

  //Call this `gameLoop` function on the next screen refresh
  //(which happens 60 times per second)
  requestAnimationFrame(gameLoop);

  //Move the cat
  cat.x += 1;
}

//Start the loop
gameLoop();

```

It entirely up to you which style you prefer.

And that's really all there is to it! Just change any sprite property by small
increments inside the loop, and they'll animate over time. If you want
the sprite to animate in the opposite direction (to the left), just give it a
negative value, like `-1`.

You'll find this code in the `movingSprites.html` file - here's the
complete code:
```js
//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle;

//Create a Pixi Application
let app = new Application({
    width: 256,
    height: 256,                       
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

loader
  .add("images/cat.png")
  .load(setup);

//Define any variables that are used in more than one function
let cat;

function setup() {

  //Create the `cat` sprite
  cat = new Sprite(resources["images/cat.png"].texture);
  cat.y = 96;
  app.stage.addChild(cat);

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Move the cat 1 pixel
  cat.x += 1;

  //Optionally use the `delta` value
  //cat.x += 1 + delta;
}
```
(Notice that the `cat` variable needs to be defined outside the
`setup` and
`gameLoop` functions so that you can access it inside both of them.)

You can animate a sprite's scale, rotation, or size - whatever! You'll see
many more examples of how to animate sprites ahead.

<a id='velocity'></a>
Using velocity properties
-------------------------

To give you more flexibility, its a good idea to control a sprite's
movement speed using two **velocity properties**: `vx` and `vy`. `vx`
is used to set the sprite's speed and direction on the x axis
(horizontally). `vy` is
used to set the sprite's speed and direction on the y axis (vertically). Instead of
changing a sprite's `x` and `y` values directly, first update the velocity
variables, and then assign those velocity values to the sprite. This is an
extra bit of modularity that you'll need for interactive game animation.

The first step is to create `vx` and `vy` properties on your sprite,
and give them an initial value.
```js
cat.vx = 0;
cat.vy = 0;
```
Setting `vx` and `vy` to 0 means that the sprite isn't moving.

Next, in the game loop, update `vx` and `vy` with the velocity at which you
want the sprite to move. Then assign those values to the
sprite's `x` and `y` properties. Here's how you could use this
technique to make the cat sprite move down and to right at one pixel each
frame:
```js
function setup() {

  //Create the `cat` sprite
  cat = new Sprite(resources["images/cat.png"].texture);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Update the cat's velocity
  cat.vx = 1;
  cat.vy = 1;

  //Apply the velocity values to the cat's
  //position to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;
}


```
When you run this code, the cat will move down and to the right at one
pixel per frame:

![Moving sprites](/examples/images/screenshots/16.png)

What if you want to make the cat move in a different direction? To
make the cat move to the left, give it a `vx` value of `-1`. To make
it move up, give the cat a `vy` value of `-1`. To make the cat move
faster, give it larger `vx` and `vy` values, like `3`, `5`, `-2`, or
`-4`.

You'll see ahead how modularizing a sprite's velocity with `vx` and
`vy` velocity properties helps with keyboard and mouse pointer
control systems for games, as well as making it easier to implement physics.

<a id='gamestates'></a>
Game states
-----------

As a matter of style, and to help modularize your code, I
recommend structuring your game loop like this:
```js
//Set the game state
state = play;

//Start the game loop
app.ticker.add(delta => gameLoop(delta));

function gameLoop(delta){

  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Move the cat 1 pixel to the right each frame
  cat.vx = 1
  cat.x += cat.vx;
}
```
You can see that the `gameLoop` is calling a function called `state` 60 times
per second. What is the `state` function? It's been assigned to
`play`. That means all the code in the `play` function will also run at 60
times per second.

Here's how the code from the previous example can be re-factored to
this new model:
```js
//Define any variables that are used in more than one function
let cat, state;

function setup() {

  //Create the `cat` sprite
  cat = new Sprite(resources["images/cat.png"].texture);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);

  //Set the game state
  state = play;

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Move the cat 1 pixel to the right each frame
  cat.vx = 1
  cat.x += cat.vx;
}
```
Yes, I know, this is a bit of [head-swirler](http://www.amazon.com/Electric-Psychedelic-Sitar-Headswirlers-1-5/dp/B004HZ14VS)! But, don't let it scare
you and spend a minute or two walking through in your mind how those
functions are connected. As you'll see ahead, structuring your game
loop like this will make it much, much easier to do things like switching
game scenes and levels.

<a id='keyboard'></a>
Keyboard Movement
-----------------

With just a little more work you can build a simple system to control
a sprite using the keyboard. To simplify your code, I suggest you use
this custom function called `keyboard` that listens for and captures
keyboard events.
```js
function keyboard(keyCode) {
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
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
```js
let keyObject = keyboard(asciiKeyCodeNumber);
```
Its one argument is the ASCII key code number of the keyboard key that you
want to listen for.
[Here's a list of ASCII keyboard code
numbers](http://help.adobe.com/en_US/AS2LCR/Flash_10.0/help.html?content=00000520.html).

Then assign `press` and `release` methods to the keyboard object like this:
```js
keyObject.press = () => {
  //key object pressed
};
keyObject.release = () => {
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
```js
//Define any variables that are used in more than one function
let cat, state;

function setup() {

  //Create the `cat` sprite
  cat = new Sprite(resources["images/cat.png"].texture);
  cat.y = 96;
  cat.vx = 0;
  cat.vy = 0;
  app.stage.addChild(cat);

  //Capture the keyboard arrow keys
  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    cat.vx = -5;
    cat.vy = 0;
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Up
  up.press = () => {
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Right
  right.press = () => {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = () => {
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Down
  down.press = () => {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Set the game state
  state = play;

  //Start the game loop
  app.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){

  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy
}
```

<a id='grouping'></a>
Grouping Sprites
----------------

Groups let you create game scenes, and manage similar sprites together
as single units. Pixi has an object called a `Container`
that lets you do this. Let's find out how it works.

Imagine that you want to display three sprites: a cat, hedgehog and
tiger. Create them, and set their positions - *but don't add them to the
stage*.
```js
//The cat
let cat = new Sprite(id["cat.png"]);
cat.position.set(16, 16);

//The hedgehog
let hedgehog = new Sprite(id["hedgehog.png"]);
hedgehog.position.set(32, 32);

//The tiger
let tiger = new Sprite(id["tiger.png"]);
tiger.position.set(64, 64);
```

Next, create an `animals` container to group them all together like
this:
```js
let animals = new Container();
```
Then use `addChild` to *add the sprites to the group*.
```js
animals.addChild(cat);
animals.addChild(hedgehog);
animals.addChild(tiger);
```
Finally add the group to the stage.
```js
app.stage.addChild(animals);
```
(As you know, the `stage` object is also a `Container`. It’s the root
container for all Pixi sprites.)

Here's what this code produces:

![Grouping sprites](/examples/images/screenshots/18.png)

What you can't see in that image is the invisible `animals` group
that's containing the sprites.

![Grouping sprites](/examples/images/screenshots/19.png)

You can now treat the `animals` group as a single unit. You can think
of a `Container` as a special kind of sprite that doesn’t
have a texture.

If you need a list of all the child sprites that `animals` contains,
use its `children` array to find out.
```
console.log(animals.children)
//Displays: Array [Object, Object, Object]
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
```js
console.log(animals.width);
//Displays: 112

console.log(animals.height);
//Displays: 112

```
![Group width and height](/examples/images/screenshots/21.png)

What happens if you change a group's width or height?
```js
animals.width = 200;
animals.height = 200;
```
All the child sprites will scale to match that change.

![Group width and height](/examples/images/screenshots/22.png)

You can nest as many `Container`s inside other
`Container`s as you like, to create deep hierarchies if
you need to. However, a `DisplayObject` (like a `Sprite` or another
`Container`) can only belong to one parent at a time. If
you use `addChild` to make a sprite the child of another object, Pixi
will automatically remove it from its current parent. That’s a useful
bit of management that you don’t have to worry about.

<a id='localnglobal'></a>
### Local and global positions

When you add a sprite to a `Container`, its `x` and `y`
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

Sprites also have a **global position**. The global position is the
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
//Displays: Object {x: 80, y: 80...};
```
That gives you an `x` and `y` position of 80. That's exactly the cat's
global position relative to the top left corner of the stage.

What if you want to find the global position of a sprite, but don't
know what the sprite's parent container
is? Every sprite has a property called `parent` that will tell you what the
sprite's parent is. If you add a sprite directly to the `stage`, then
`stage` will be the sprite's parent. In the example above, the `cat`'s
parent is `animals`. That means you can alternatively get the cat's global position
by writing code like this:
```
cat.parent.toGlobal(cat.position);
```
And it will work even if you don't know what the cat's parent
container currently is.

There's one more way to calculate the global position! And, it's
actually the best way, so listen up! If you want to know the distance
from the top left corner of the canvas to the sprite, and don't know
or care what the sprite's parent containers are, use the
`getGlobalPosition` method. Here's how to use it to find the tiger's global position:
```js
tiger.getGlobalPosition().x
tiger.getGlobalPosition().y
```
This will give you `x` and `y` values of 128 in the example that we've
been using.
The special thing about `getGlobalPosition` is that it's highly
precise: it will give you the sprite's accurate global position as
soon as its local position changes. I asked the Pixi development team
to add this feature specifically for accurate collision detection for
games. (Thanks, Matt and the rest of the team for adding it!)

What if you want to convert a global position to a local position? you
can use the `toLocal` method. It works in a similar way, but uses this
general format:
```js
sprite.toLocal(sprite.position, anyOtherSprite)
```
Use `toLocal` to find the distance between a sprite and any other
sprite. Here's how you could find out the tiger's local
position, relative to the hedgehog.
```js
tiger.toLocal(tiger.position, hedgehog).x
tiger.toLocal(tiger.position, hedgehog).y
```
This gives you an `x` value of 32 and a `y` value of 32. You can see
in the example images that the tiger's top left corner is 32 pixels
down and to the left of the hedgehog's top left corner.

<a id='spritebatch'></a>
### Using a ParticleContainer to group sprites

Pixi has an alternative, high-performance way to group sprites called
a `ParticleContainer` (`PIXI.particles.ParticleContainer`). Any sprites inside a `ParticleContainer` will render 2 to 5
times faster than they would if they were in a regular
`Container`. It’s a great performance boost for games.

Create a `ParticleContainer` like this:
```js
let superFastSprites = new PIXI.particles.ParticleContainer();
```
Then use `addChild` to add sprites to it, just like you would with any
ordinary `Container`.

You have to make some compromises if you decide to use a
`ParticleContainer`. Sprites inside a `ParticleContainer` only have a few  basic properties:
`x`, `y`, `width`, `height`, `scale`, `pivot`, `alpha`, `visible` – and that’s
about it. Also, the sprites that it contains can’t have nested
children of their own. A `ParticleContainer` also can’t use Pixi’s advanced
visual effects like filters and blend modes. Each `ParticleContainer` can use only one texture (so you'll have to use a spritesheet if you want Sprites with different appearances). But for the huge performance boost that you get, those
compromises are usually worth it. And you can use
`Container`s and `ParticleContainer`s simultaneously in the same project, so you can fine-tune your optimization.

Why are sprites in a `Particle Container` so fast? Because the positions of
the sprites are being calculated directly on the GPU. The Pixi
development team is working to offload as much sprite processing as
possible on the GPU, so it’s likely that the latest version of Pixi
that you’re using will have much more feature-rich `ParticleContainer` than
what I've described here. Check the current [`ParticleContainer`
documentation](http://pixijs.download/release/docs/PIXI.particles.ParticleContainer.html) for details.

Where you create a `ParticleContainer`, there are four optional
arguments you can provide: `size`, `properties`, `batchSize` and `autoResize`.
```js
let superFastSprites = new ParticleContainer(maxSize, properties, batchSize, autoResize);
```
The default value for `maxSize` is 15,000. So, if you need to contain more
sprites, set it to a higher number. The `properties` argument is an object
with 5 Boolean values you can set: `scale`, `position`, `rotation`, `uvs` and
`alphaAndTint`. The default value of `position` is `true`, but all the others
are set to `false`. That means that if you want change the `rotation`,
`scale`, `tine`, or `uvs` of sprite in the `ParticleContainer`, you
have to set those properties to `true`, like this:
```js
let superFastSprites = new ParticleContainer(
  size,
  {
    rotation: true,
    alphaAndtint: true,
    scale: true,
    uvs: true
  }
);
```
But, if you don't think you'll need to use these properties, keep them
set to `false` to squeeze out the maximum amount of performance.

What's the `uvs` property? Only set it to `true` if you have particles
which change their textures while they're being animated. (All the
sprite's textures will also need to be on the same tileset image for
this to work.)

(Note: **UV mapping** is a 3D graphics display term that refers to
the `x` and `y` coordinates of the texture (the image) that is being
mapped onto a 3D surface. `U` is the `x` axis and `V` is the `y` axis.
WebGL already uses `x`, `y` and `z` for 3D spatial positioning, so `U`
and `V` were chosen to represent `x` and `y` for 2D image textures.)

(I'm not sure what exactly what those last two optional arguments, `batchSize` and `autoResize`, so if anyone knows, please us know in the Issues!)

<a id='graphic'></a>
Pixi's Graphic Primitives
-------------------------

Using image textures is one of the most useful ways of making sprites,
but Pixi also has its own low-level drawing tools. You can use them to
make rectangles, shapes, lines, complex polygons and text. And,
fortunately, it uses almost the same API as the [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_graphics_with_canvas) so,
if you're already familiar with canvas, there’s nothing really new to
  learn. But the big advantage is that, unlike the Canvas Drawing API,
  the shapes you draw with Pixi are rendered by WebGL on the GPU. Pixi
  lets you access all that untapped performance power.
Let’s take a quick tour of how to make some basic shapes. Here are all
the shapes we'll make in the code ahead.

![Graphic primitives](/examples/images/screenshots/23.png)

<a id='rectangles'></a>
### Rectangles

All shapes are made by first creating a new instance of Pixi's
`Graphics` class (`PIXI.Graphics`).
```js
let rectangle = new Graphics();
```
Use `beginFill` with a hexadecimal color code value to set the
rectangle’ s fill color. Here’ how to set to it to light blue.
```js
rectangle.beginFill(0x66CCFF);
```
If you want to give the shape an outline, use the `lineStyle` method. Here's
how to give the rectangle a 4 pixel wide red outline, with an `alpha`
value of 1.
```js
rectangle.lineStyle(4, 0xFF3300, 1);
```
Use the `drawRect` method to draw the rectangle. Its four arguments
are `x`, `y`, `width` and `height`.
```js
rectangle.drawRect(x, y, width, height);
```
Use `endFill` when you’re done.
```js
rectangle.endFill();
```
It’s just like the Canvas Drawing API! Here’s all the code you need to
draw a rectangle, change its position, and add it to the stage.
```js
let rectangle = new Graphics();
rectangle.lineStyle(4, 0xFF3300, 1);
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);

```
This code makes a 64 by 64 blue rectangle with a red border at an x and y position of 170.

<a id='circles'></a>
### Circles

Make a circle with the `drawCircle` method. Its three arguments are
`x`, `y` and `radius`
```js
drawCircle(x, y, radius)
```
Unlike rectangles and sprites, a circle’s x and y position is also its
center point. Here’s how to make a violet colored circle with a radius of 32 pixels.
```js
let circle = new Graphics();
circle.beginFill(0x9966FF);
circle.drawCircle(0, 0, 32);
circle.endFill();
circle.x = 64;
circle.y = 130;
app.stage.addChild(circle);
```
<a id='ellipses'></a>
### Ellipses
As a one-up on the Canvas Drawing API, Pixi lets you draw an ellipse
with the `drawEllipse` method.
```js
drawEllipse(x, y, width, height);
```
The x/y position defines the ellipse’s top left corner (imagine that
the ellipse is surrounded by an invisible rectangular bounding box -
the top left corner of that box will represent the ellipse's x/y
anchor position). Here’s a yellow ellipse that’s 50 pixels wide and 20 pixels high.
```js
let ellipse = new Graphics();
ellipse.beginFill(0xFFFF00);
ellipse.drawEllipse(0, 0, 50, 20);
ellipse.endFill();
ellipse.x = 180;
ellipse.y = 130;
app.stage.addChild(ellipse);
```
<a id='roundedrect'></a>
### Rounded rectangles

Pixi also lets you make rounded rectangles with the `drawRoundedRect`
method. The last argument, `cornerRadius` is a number in pixels that
determines by how much the corners should be rounded.
```js
drawRoundedRect(x, y, width, height, cornerRadius)
```
Here's how to make a rounded rectangle with a corner radius of 10
pixels.
```js
let roundBox = new Graphics();
roundBox.lineStyle(4, 0x99CCFF, 1);
roundBox.beginFill(0xFF9933);
roundBox.drawRoundedRect(0, 0, 84, 36, 10)
roundBox.endFill();
roundBox.x = 48;
roundBox.y = 190;
app.stage.addChild(roundBox);
```
<a id='lines'></a>
### Lines

You've seen in the examples above that the `lineStyle` method lets you
define a line.  You can use the `moveTo` and `lineTo` methods to draw the
start and end points of the line, in just the same way you can with the Canvas
Drawing API. Here’s how to draw a 4 pixel wide, white diagonal line.
```js
let line = new Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);
line.x = 32;
line.y = 32;
app.stage.addChild(line);
```
`PIXI.Graphics` objects, like lines, have `x` and `y` values, just
like sprites, so you can position them anywhere on the stage after
you've drawn them.

<a id='polygons'></a>
### Polygons

You can join lines together and fill them with colors to make complex
shapes using the `drawPolygon` method. `drawPolygon`'s argument is a
path array of x/y points that define the positions of each point on the
shape.
```js
let path = [
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
```js
let triangle = new Graphics();
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

app.stage.addChild(triangle);
```
<a id='text'></a>

Displaying text
---------------

Use a `Text` object (`PIXI.Text`) to display text on the stage. In its simplest form, you can do it like this:
```js
let message = new Text("Hello Pixi!");
app.stage.addChild(message);
```

This will display the words, "Hello, Pixi" on the canvas. Pixi’s Text objects inherit from the `Sprite` class, so they
contain all the same properties like `x`, `y`, `width`, `height`,
`alpha`, and `rotation`. Position and resize text on the stage just like you would any other sprite. For example, you could use `position.set` to set the `message`'s `x` and `y` position like this:
```js
message.position.set(54, 96);
```

![Displaying text](/examples/images/screenshots/24.png)

That will give you basic, unstyled text. But if you want to get fancier, use Pixi's `TextStyle` function to define custom text styling. Here's how:

```js
let style = new TextStyle({
  fontFamily: "Arial",
  fontSize: 36,
  fill: "white",
  stroke: '#ff3300',
  strokeThickness: 4,
  dropShadow: true,
  dropShadowColor: "#000000",
  dropShadowBlur: 4,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 6,
});
```
That creates a new `style` object containg all the text styling that you'd like to use. For a complete list of all the style properties you can use, [see here](http://pixijs.download/release/docs/PIXI.TextStyle.html).

To apply the style to the text, add the `style` object as the `Text` function's second argument, like this:
```js
let message = new Text("Hello Pixi!", style);
```
![Displaying text](/examples/images/screenshots/24.5.png)

If you want to change the content of a text object after you've
created it, use the `text` property.
```js
message.text = "Text changed!";
```
Use the `style` property if you want to redefine the style properties.
```js
message.style = {fill: "black", font: "16px PetMe64"};
```

Pixi makes text objects by using the Canvas Drawing API to
render the text to an invisible and temporary canvas
element. It then turns the canvas into a WebGL texture so that it
can be mapped onto a sprite. That’s why the text’s color needs to be
wrapped in a string: it’s a Canvas Drawing API color value. As with
any canvas color values, you can use words for common colors like
“red” or “green”, or use rgba, hsla or hex values.

Pixi can also wrap long lines of text. Set the text’s `wordWrap` style
property to `true`, and then set `wordWrapWidth` to the maximum length
in pixels, that the line of text should be. Use the `align` property
to set the alignment for multi-line text.
```js
message.style = {wordWrap: true, wordWrapWidth: 100, align: center};
```
(Note: `align` doesn't affect single line text.)

If you want to use a custom font file, use the CSS `@font-face` rule
to link the font file to the HTML page where your Pixi application is
running.
```js
@font-face {
  font-family: "fontFamilyName";
  src: url("fonts/fontFile.ttf");
}
```
Add this `@font-face` rule to your HTML page's CSS style sheet.

[Pixi also has support for bitmap
fonts](http://pixijs.download/release/docs/PIXI.extras.BitmapText.html). You
can use Pixi's loader to load Bitmap font XML files, the same way you
load JSON or image files.

<a id='collision'></a>
Collision detection
--------------------------

You now know how to make a huge variety of graphics objects, but what
can you do with them? A fun thing to do is to build a simple **collision
detection** system. You can use a custom function called
`hitTestRectangle` that checks whether any two rectangular Pixi sprites are
touching.
```js
hitTestRectangle(spriteOne, spriteTwo)
```
if they overlap, `hitTestRectangle` will return `true`. You can use `hitTestRectangle` with an `if` statement to check for a collision between two sprites like this:
```js
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
```js
function play(delta) {

  //use the cat's velocity to make it move
  cat.x += cat.vx;
  cat.y += cat.vy;

  //check for a collision between the cat and the box
  if (hitTestRectangle(cat, box)) {

    //if there's a collision, change the message text
    //and tint the box red
    message.text = "hit!";
    box.tint = 0xff3300;

  } else {

    //if there's no collision, reset the message
    //text and the box's color
    message.text = "No collision...";
    box.tint = 0xccff99;
  }
}
```
Because the `play` function is being called by the game loop 60 times
per second, this `if` statement is constantly checking for a collision
between the cat and the box. If `hitTestRectangle` is `true`, the
text `message` object uses `text` to display "Hit":
```js
message.text = "Hit!";
```
The color of the box is then changed from green to red by setting the
box's `tint` property to the hexadecimal red value.
```js
box.tint = 0xff3300;
```
If there's no collision, the message and box are maintained in their
original states:
```js
message.text = "No collision...";
box.tint = 0xccff99;
```
This code is pretty simple, but suddenly you've created an interactive
world that seems to be completely alive. It's almost like magic! And, perhaps
surprisingly, you now have all the skills you need to start making
games with Pixi!

<a id='hittest'></a>
### The hitTestRectangle function

But what about the `hitTestRectangle` function? What does it do, and
how does it work? The details of how collision detection algorithms
like this work is a little bit outside the scope of this tutorial. (If you really want to know, you can find out how [this book](https://www.apress.com/us/book/9781430258001).)
The most important thing is that you know how to use it. But, just for
your reference, and in case you're curious, here's the complete
`hitTestRectangle` function definition. Can you figure out from the
comments what it's doing?
```js
function hitTestRectangle(r1, r2) {

  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;

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
<a id='casestudy'></a>
Case study: Treasure Hunter
---------------

I've told you that you now have all the skills you need to start
making games. What? You don't believe me? Let me prove it to you! Let’s take a
close at how to make a simple object collection and enemy
avoidance game called **Treasure Hunter**. (You'll find it in the `examples`
folder.)

![Treasure Hunter](/examples/images/screenshots/26.png)

Treasure Hunter is a good example of one of the simplest complete
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
collision, and multiple game scenes. Let’s go on a tour of how the
game was put together so that you can use it as a starting point for one of your own games.

### The code structure

Open the `treasureHunter.html` file and you'll see that all the game
code is in one big file. Here's a birds-eye view of how all the code is
organized.

```js
//Setup Pixi and load the texture atlas files - call the `setup`
//function when they've loaded

function setup() {
  //Initialize the game sprites, set the game `state` to `play`
  //and start the 'gameLoop'
}

function gameLoop(delta) {
  //Runs the current game `state` in a loop and renders the sprites
}

function play(delta) {
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

<a id='initialize'></a>
### Initialize the game in the setup function

As soon as the texture atlas images have loaded, the `setup` function
runs. It only runs once, and lets you perform
one-time setup tasks for your game. It's a great place to create and initialize
objects, sprites, game scenes, populate data arrays or parse
loaded JSON game data.

Here's an abridged view of the `setup` function in Treasure Hunter,
and the tasks that it performs.

```js
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
  app.ticker.add(delta => gameLoop(delta));
}

```
The last two lines of code, `state = play;` and `gameLoop()` are perhaps
the most important. Adding the `gameLoop` to Pixi's ticker switches on the game's engine,
and causes the `play` function to be called in a continuous loop. But before we look at how that works, let's see what the
specific code inside the `setup` function does.

<a id='gamescene'></a>
#### Creating the game scenes

The `setup` function creates two `Container` groups called
`gameScene` and `gameOverScene`. Each of these are added to the stage.
```js
gameScene = new Container();
app.stage.addChild(gameScene);

gameOverScene = new Container();
app.stage.addChild(gameOverScene);

```
All of the sprites that are part of the main game are added to the
`gameScene` group. The game over text that should be displayed at the
end of the game is added to the `gameOverScene` group.

![Displaying text](/examples/images/screenshots/27.png)

Although it's created in the `setup` function, the `gameOverScene`
shouldn't be visible when the game first starts, so its `visible`
property is initialized to `false`.
```js
gameOverScene.visible = false;
```
You'll see ahead that, when the game ends, the `gameOverScene`'s `visible`
property will be set to `true` to display the text that appears at the
end of the game.

<a id='makingdungon'></a>
#### Making the dungeon, door, explorer and treasure

The player, exit door, treasure chest and the dungeon background image
are all sprites made from texture atlas frames. Very importantly,
they're all added as children of the `gameScene`.
```js
//Create an alias for the texture atlas frame ids
id = resources["images/treasureHunter.json"].textures;

//Dungeon
dungeon = new Sprite(id["dungeon.png"]);
gameScene.addChild(dungeon);

//Door
door = new Sprite(id["door.png"]);
door.position.set(32, 0);
gameScene.addChild(door);

//Explorer
explorer = new Sprite(id["explorer.png"]);
explorer.x = 68;
explorer.y = gameScene.height / 2 - explorer.height / 2;
explorer.vx = 0;
explorer.vy = 0;
gameScene.addChild(explorer);

//Treasure
treasure = new Sprite(id["treasure.png"]);
treasure.x = gameScene.width - treasure.width - 48;
treasure.y = gameScene.height / 2 - treasure.height / 2;
gameScene.addChild(treasure);
```
Keeping them together in the `gameScene` group will make it easy for
us to hide the `gameScene` and display the `gameOverScene` when the game is finished.

<a id='makingblob'></a>
#### Making the blob monsters

The six blob monsters are created in a loop. Each blob is given a
random initial position and velocity. The vertical velocity is
alternately multiplied by `1` or `-1` for each blob, and that’s what
causes each blob to move in the opposite direction to the one next to
it. Each blob monster that's created is pushed into an array called
`blobs`.
```js
let numberOfBlobs = 6,
    spacing = 48,
    xOffset = 150,
    speed = 2,
    direction = 1;

//An array to store all the blob monsters
blobs = [];

//Make as many blobs as there are `numberOfBlobs`
for (let i = 0; i < numberOfBlobs; i++) {

  //Make a blob
  let blob = new Sprite(id["blob.png"]);

  //Space each blob horizontally according to the `spacing` value.
  //`xOffset` determines the point from the left of the screen
  //at which the first blob should be added
  let x = spacing * i + xOffset;

  //Give the blob a random `y` position
  let y = randomInt(0, stage.height - blob.height);

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
<a id='healthbar'></a>
#### Making the health bar

When you play Treasure Hunter you'll notice that when the explorer touches
one of the enemies, the width of the health bar at the top right
corner of the screen decreases. How was this health bar made? It's
just two overlapping rectangles at exactly the same position: a black rectangle behind, and
a red rectangle in front. They're grouped together into a single `healthBar`
group. The `healthBar` is then added to the `gameScene` and positioned
on the stage.
```js
//Create the health bar
healthBar = new PIXI.DisplayObjectContainer();
healthBar.position.set(stage.width - 170, 4)
gameScene.addChild(healthBar);

//Create the black background rectangle
let innerBar = new PIXI.Graphics();
innerBar.beginFill(0x000000);
innerBar.drawRect(0, 0, 128, 8);
innerBar.endFill();
healthBar.addChild(innerBar);

//Create the front red rectangle
let outerBar = new PIXI.Graphics();
outerBar.beginFill(0xFF3300);
outerBar.drawRect(0, 0, 128, 8);
outerBar.endFill();
healthBar.addChild(outerBar);

healthBar.outer = outerBar;
```
You can see that a property called `outer` has been added to the
`healthBar`. It just references the `outerBar` (the red rectangle) so that it will be convenient to access later.
```js
healthBar.outer = outerBar;
```
You don't have to do this; but, hey why not! It means that if you want
to control the width of the red `outerBar`, you can write some smooth code that looks like this:
```js
healthBar.outer.width = 30;
```
That's pretty neat and readable, so we'll keep it!

<a id='message'></a>
#### Making the message text

When the game is finished, some text displays “You won!” or “You
lost!”, depending on the outcome of the game. This is made using a
text sprite and adding it to the `gameOverScene`. Because the
`gameOverScene`‘s `visible` property is set to `false` when the game
starts, you can’t see this text. Here’s the code from the `setup`
function that creates the message text and adds it to the
`gameOverScene`.
```js
let style = new TextStyle({
    fontFamily: "Futura",
    fontSize: 64,
    fill: "white"
  });
message = new Text("The End!", style);
message.x = 120;
message.y = app.stage.height / 2 - 32;
gameOverScene.addChild(message);
```
<a id='playing'></a>
### Playing the game

All the game logic and the code that makes the sprites move happens
inside the `play` function, which runs in a continuous loop. Here's an
overview of what the `play` function does
```js
function play(delta) {
  //Move the explorer and contain it inside the dungeon
  //Move the blob monsters
  //Check for a collision between the blobs and the explorer
  //Check for a collision between the explorer and the treasure
  //Check for a collision between the treasure and the door
  //Decide whether the game has been won or lost
  //Change the game `state` to `end` when the game is finsihed
}
```
Let's find out how all these features work.

<a id='movingexplorer'></a>
### Moving the explorer

The explorer is controlled using the keyboard, and the code that does
that is very similar to the keyboard control code you learnt earlier.
The `keyboard` objects modify the explorer’s velocity, and that
velocity is added to the explorer’s position inside the `play`
function.
```js
explorer.x += explorer.vx;
explorer.y += explorer.vy;
```
<a id='containingmovement'></a>
#### Containing movement

But what's new is that the explorer's movement is contained inside the walls of the
dungeon. The green outline shows the limits of the explorer's
movement.

![Displaying text](/examples/images/screenshots/28.png)

That's done with the help of a custom function called
`contain`.
```js
contain(explorer, {x: 28, y: 10, width: 488, height: 480});
```
`contain` takes two arguments. The first is the sprite you want to keep
contained. The second is any object with `x`, `y`, `width` and
`height` properties that define a rectangular area. In this example,
the containing object defines an area that's just slightly offset
from, and smaller than, the stage. It matches the dimensions of the dungeon
walls.

Here's the `contain` function that does all this work. The function checks
to see if the sprite has crossed the boundaries of the containing
object. If it has, the code moves the sprite back into that boundary.
The `contain` function also returns a `collision` variable with the
value "top", "right", "bottom" or "left", depending on which side of
the boundary the sprite hit. (`collision` will be `undefined` if the
sprite didn't hit any of the boundaries.)
```js
function contain(sprite, container) {

  let collision = undefined;

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
You'll see how the `collision` return value will be used in the code
ahead to make the blob monsters bounce back and forth between the top
and bottom dungeon walls.

<a id='movingmonsters'></a>
### Moving the monsters

The `play` function also moves the blob monsters, keeps them contained
inside the dungeon walls, and checks each one for a collision with the
player. If a blob bumps into the dungeon’s top or bottom walls, its
direction is reversed. All this is done with the help of a `forEach` loop
which iterates through each of `blob` sprites in the `blobs` array on
every frame.
```js
blobs.forEach(function(blob) {

  //Move the blob
  blob.y += blob.vy;

  //Check the blob's screen boundaries
  let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});

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
```js
let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
```
`blobHitsWall` will usually be `undefined`. But if the blob hits the
top wall, `blobHitsWall` will have the value "top". If the blob hits
the bottom wall, `blobHitsWall` will have the value "bottom". If
either of these cases are `true`, you can reverse the blob's direction
by reversing its velocity. Here's the code that does this:
```js
if (blobHitsWall === "top" || blobHitsWall === "bottom") {
  blob.vy *= -1;
}
```
Multiplying the blob's `vy` (vertical velocity) value by `-1` will flip
the direction of its movement.

<a id='checkingcollisions'></a>
### Checking for collisions

The code in the loop above uses `hitTestRectangle` to figure
out if any of the enemies have touched the explorer.
```js
if(hitTestRectangle(explorer, blob)) {
  explorerHit = true;
}
```
If `hitTestRectangle` returns `true`, it means there’s been a collision
and a variable called `explorerHit` is set to `true`. If `explorerHit`
is `true`, the `play` function makes the explorer semi-transparent
and reduces the width of the `health` bar by 1 pixel.
```js
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

```js
if (hitTestRectangle(explorer, treasure)) {
  treasure.x = explorer.x + 8;
  treasure.y = explorer.y + 8;
}
```
<a id='reachingexit'></a>
### Reaching the exit door and ending the game

There are two ways the game can end: You can win if you carry the
treasure to the exit, or you can lose if you run out of health.

To win the game, the treasure chest just needs to touch the exit door. If
that happens, the game `state` is set to `end`, and the `message` text
displays "You won".
```js
if (hitTestRectangle(treasure, door)) {
  state = end;
  message.text = "You won!";
}
```
If you run out of health, you lose the game. The game `state` is also
set to `end` and the `message` text displays "You Lost!"
```js
if (healthBar.outer.width < 0) {
  state = end;
  message.text = "You lost!";
}
```
But what does this mean?
```js
state = end;
```
You'll remember from earlier examples that the `gameLoop` is constantly updating a function called
`state` at 60 times per second. Here's the `gameLoop`that does this:
```js
function gameLoop(delta){

  //Update the current game state:
  state(delta);
}
```
You'll also remember that we initially set the value of
`state` to `play`, which is why the `play` function runs in a loop.
By setting `state` to `end` we're telling the code that we want
another function, called `end` to run in a loop. In a bigger game you
could have a `tileScene` state, and states for each game level, like
`leveOne`, `levelTwo` and `levelThree`.

So what is that `end` function? Here it is!
```js
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

<a id='spriteproperties'></a>
More about sprites
-----------------------------

You've learnt how to use quite a few useful sprite properties so far, like `x`, `y`,
`visible`, and `rotation` that give you a lot of control over a
sprite's position and appearance. But Pixi Sprites also have many more
useful properties that are fun to play with. [Here's the full list.](http://pixijs.download/release/docs/PIXI.Sprite.html)

How does Pixi’s class inheritance system work? ([What is a **class**
and what is **inheritence**? Click this link to find out.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)) Pixi’s sprites are
built on an inheritance model that follows this chain:
```
DisplayObject > Container > Sprite
```
Inheritance just means that the classes later in the chain use
properties and methods from classes earlier in the chain. That means that even though `Sprite` is the last class in the chain, has all the same properties as `DisplayObject` and `Container`, in addition to its own unique properties.
The most basic class is `DisplayObject`. Anything that’s a
`DisplayObject` can be rendered on the stage. `Container`
is the next class in the inheritance chain. It allows `DisplayObject`s
to act as containers for other `DisplayObject`s. Third up the chain is
the `Sprite` class. Sprites can both be displayed on the stage and be containers for other sprites.

<a id='takingitfurther'></a>
Taking it further
-----------------

Pixi can do a lot, but it can't do everything! If you want to start
making games or complex interactive applications with Pixi, you'll need
to use some helper libraries:

- [Bump](https://github.com/kittykatattack/bump): A complete suite of 2D collision functions for games.
- [Tink](https://github.com/kittykatattack/tink): Drag-and-drop, buttons, a universal pointer and other
  helpful interactivity tools.
- [Charm](https://github.com/kittykatattack/charm): Easy-to-use tweening animation effects for Pixi sprites.
- [Dust](https://github.com/kittykatattack/dust): Particle effects for creating things like explosions, fire
  and magic.
- [Sprite Utilities](https://github.com/kittykatattack/spriteUtilities): Easier and more intuitive ways to
  create and use Pixi sprites, as well adding a state machine and
  animation player. Makes working with Pixi a lot more fun.
- [Sound.js](https://github.com/kittykatattack/sound.js): A micro-library for loading, controlling and generating
  sound and music effects. Everything you need to add sound to games.
- [Smoothie](https://github.com/kittykatattack/smoothie): Ultra-smooth sprite animation using true delta-time interpolation. It also lets you specify the fps (frames-per-second) at which your game or application runs, and completely separates your sprite rendering loop from your application logic loop.

You can find out how to use all these libraries with Pixi in the book
[Learn PixiJS](http://www.springer.com/us/book/9781484210956).

<a id='hexi'></a>
### Hexi

Do you want to use all the functionality of those libraries, but don't
want the hassle of integrating them yourself? Use **Hexi**: a complete
development environment for building games and interactive
applications:

https://github.com/kittykatattack/hexi

It bundles the best version of Pixi (the latest **stable** one) with all these
libraries (and more!) for a simple and fun way to make games. Hexi also
lets you access the global `PIXI` object directly, so you can write
low-level Pixi code directly in a Hexi application, and optionally choose to use as many or
as few of Hexi's extra conveniences as you need.

<a id='babylonjs'></a>
### BabylonJS

Pixi is great for 2D, but it can't do 3D. When you're ready to step into the thrid dimension, the most feature rich, easy-to-use 3D game development platform for the web is [BabylonJS](https://www.babylonjs.com). It's a great next step for taking your skills further.

<a id='supportingthisproject'></a>
Please help to support this project!
-------------------

Buy the book! Incredibly, someone actually paid me to finish writing this tutorial
and turn it into a book!

[Learn PixiJS](http://www.springer.com/us/book/9781484210956)

(And it's not just some junky "e-book", but a real, heavy, paper book, published by Springer,
the world's largest publisher! That means you can invite your friends
over, set it on fire, and roast marshmallows!!) There's 80% more
content than what's in this tutorial, and it's
packed full of all the essential techniques you need to know to use
Pixi to make all kinds of interactive applications and games.

Find out how to:

- Make animated game characters.
- Create a full-featured animation state player.
- Dynamically animate lines and shapes.
- Use tiling sprites for infinite parallax scrolling.
- Use blend modes, filters, tinting, masks, video, and render textures.
- Produce content for multiple resolutions.
- Create interactive buttons.
- Create a flexible drag and drop interface for Pixi.
- Create particle effects.
- Build a stable software architectural model that will scale to any size.
- Make complete games.

And, as a bonus, all the code is written entirely in the latest version of
JavaScript: ES6/2015. And, although the book's code is based on Pixi v3.x, it all works just fine with the lastest version of Pixi 4.x!

If you want to support this project, please buy a copy of this book,
and buy another copy for your mom!

Or, make a generous donation to: http://www.msf.org
