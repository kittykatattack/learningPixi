Pixi 사용법
===========

- [Pixi rendering engine]으로 게임과 대화형 미디어를 만드는 단계별 안내.(https://github.com/Bae-hong-seob/learningPixi/blob/develop/korean_ver.md).
- **[Updated for Pixi v4.5.5]. 
(https://github.com/pixijs/pixi.js/releases/tag/v4.5.5)**.
- [Chinese version here: Pixi官方教程中文版.](https://github.com/Zainking/learningPixi).
- [이 튜토리얼이 괜찮았다면, 더 많은 내용을 담고 있는 이 책을 추천합니다!] (http://www.springer.com/us/book/9781484210956)


### 목차

1. [소개](#introduction)

2. [설정방법](#settingup)
	
	i. [픽시 설치](#installingpixi)
3. [Stage 및 renderer 생성](#application)
4. [Pixi 속성](#sprites)
5. [텍스처 캐시에 이미지 올리기](#loading)
6. [sprites](#displaying)
	
	i. [Aliases 사용](#usingaliases)

	ii. [자세한 로딩 방법](#alittlemoreaboutloadingthings)

           - (1). 일반적인 JavaScript Image 객체 또는 Canvas에서 속성 만들기
           - (2). load 된 파일에 이름 지정
           - (3). load 진행과정 모니터링
           - (4). Pixi의 로더에 대한 추가 정보
7. [속성의 위치 지정](#postioning)
8. [크기와 규모](#size-n-scale)
9. [회전](#rotation)
10. [부가 이미지 모음으로부터 sprite 만들기](#tileset)
11. [텍스처 atlas 사용하기](#texture-atlas)
12. [텍스처 atlas 올리기](#loading-atlas)
13. [올려진 텍스처 atlas 로부터 sprites 만들기](#creating-sprites-from-a-loaded-texture-atlas)
14. [sprites 움직이기](#moving-sprites)
15. [속도의 속성 사용하기](#velocity)
16. [게임 상태](#game-states)
17. [키보드 움직임](#keyboard)
18. [Sprites 그룹화하기](#grouping)
		
		  i. 지역적 및 종합적 위치
          ii. ParticleContainer 를 사용하여 sprite 그룹화하기
19. [Pixi의 그래픽 기초](#graphic)

           i. 직사각형
          ii. 원
         iii. 타원
         iv. 둥근 사각형
          v. 선
         vi. 다각형
20. [텍스트 표시](#text)
21. [충돌 감지](#collision)

          i. hitTestRectangle 함수
22. [사례 연구 : Treasure Hunter ](#casestudy)
   
          i. setup 기능에서 게임 초기화
 		  - (1). [게임 장면 만들기](#game-scene)
 		  - (2). [지하 감옥, 문, 탐험가 및 보물 만들기](#making-dungon)
 		  - (3). [얼룩덜룩 한 괴물 만들기](#making-blob) 
 		  - (4). [HP표시 바 만들기](#healthbar)
 		  - (5). [메시지 텍스트 만들기](#message)
 		  
         ii. 게임하기

        iii. 캐릭터 이동

 			  - (1). [움직임 포함](#containing-movement)
        iv. 괴물 이동하기
         v. 충돌 확인
        vi. 출구 문에 도달하여 게임을 종료한다.
23. [sprites에 대한 추가 정보](#sprite-properties)
24. [추가 정보](#taking-it-further)</br>

         i. Hexi
        ii. BabylonJS
25. [프로젝트 지원]()

<a id='introduction'></a>
소개
-----------
Pixi는 매우 빠른 2D sprite rendering 엔진입니다. 이것은 당신이 JavaScript와 다른 HTML5 기술을 사용하여 게임과 응용프로그램을 쉽게 만들 수 있도록 대화형 그래픽을 표시하고, 애니메이션을 제작 및 관리할 수 있도록 도와줄 수 있습니다.  Pixi는 분명 하고, 깔끔한 API를 가지고 있으며 텍스처 atlas를 지원하고 sprite(인터랙티브 이미지)를 나타내기 위한 능률화된 시스템을 제공하는 것과 같은 많은 유용한 기능들을 포함하고 있습니다. 또한 완전한 장면 그래프를 통해 중첩된 sprite(sprite 내부의 sprite)의 계층 구조를 만들 수 있을 뿐 아니라 마우스와 터치를 스프라이트에 직접 연결할 수 있습니다. 그리고 가장 중요한 것은 Pixi는 당신이 원하는 만큼 혹은 더 적게 사용할 수 있도록다, 그리고 그것을 당신의 개인적인 코딩 스타일에 적응시키고, 다른 유용한 틀들과 완벽하게 통합할 수 있도록, 당신의 길을 열어준다는 것입니다.

Pixi의 API는 실제로 Macromedia/Adobe Flash가 개척한 잘 적용되고 전투 테스트 된 정교한 API입니다. Old-skool Flash 개발자들은 이에 대해 편안함을 느낄 것 입니다. 다른 현재 sprite rendering framework는 CreateJS, Starling, Sparrow 및 Apple의 SpriteKit과 같은 API를 사용합니다. Pixi의 API의 강점은 그것이 범용 목적이라는 것입니다: 이것은 게임 엔진이 아닙니다. 이러한 사실은 여러분이 좋아하는 것을 만들 수 있는 완전한 표현의 자유를 제공하고, 여러분 자신의 맞춤형 게임 엔진을 포장하기 때문에 좋습니다. 이 튜토리얼 에서는 Pixi의 강력한 image rendering 기능과 scene graph를 결합하여 게임을 만드는 방법을 알아 봅니다. 그러나 Pixi는 단지 게임만을 위한 것이 아닙니다. 당신은 이와 같은 기술을 사용하여 모든 대화 형 미디어 응용 프로그램을 만들 수 있습니다. 즉, 휴대 전화 용 앱을 의미합니다!

너가 이 튜토리얼을 시작하기 전에 무엇을 알아야 할까요?

HTML과 JavaScript에 대해 충분히 이해하고 있어야 합니다. 당신은 전문가가 아니며, 열심히 배워야하는 야심 찬 초심자입니다. HTML과 JavaScript에 대해 잘 모르는 경우 이 책을 통해 학습을 시작하세요. 

[Foundation Game Design with HTML5 and JavaScript](http://www.apress.com/9781430247166)

내가 이 책을 썼기에 이 책이 최고라고 자부합니다!

또한 시작할 때 도움이 되는 좋은 인터넷 자원이 있습니다.

[Khan Academy: Computer Programming](http://www.khanacademy.org/computing/cs)

[Code Academy: JavaScript](http://www.codecademy.com/tracks/javascript)

무엇이든 간에 당신의 학습 방식에 가장 적합한 책을 고르세요.
이해하셨나요? JavaScript 변수, 함수, 배열 및 객체가 무엇이며 어떻게 사용하는지 알고 있으신가요?  [JSON data files](http://www.copterlabs.com/blog/json-what-it-is-how-it-works-how-to-use-it/)가 무엇인지 알고 계신가요?  [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_graphics_with_canvas)를 사용해 보셨나요?

Pixi를 사용하려면, 당신의 루트 프로젝트 디렉토리에서 웹 서버를 실행해야 합니다. 웹 서버가 무엇이며 프로젝트 폴더에서 웹 서버를 시작하는 방법을 아시나요? 가장 좋은 방법은  [node.js](http://nodejs.org)를 사용한 다음 사용하기 쉬운 [http-server](https://github.com/nodeapps/http-server)를 설치하는 것입니다. 그러나 그렇게 하고 싶다면 Unix 명령 행 작업에 익숙해 져야합니다. 당신은 [이 비디오](https://www.youtube.com/watch?feature=player_embedded&v=cX9ASUE3YAQ)에서 유닉스를 사용하는 법을 배울 수 있습니다. 이 비디오가 끝이 나면 [이 비디오](https://www.youtube.com/watch?v=INk0ATBbclc)를 따라 해보세요. 당신은 Unix 사용 방법을 배워야 합니다. 배우기까지 2 시간 밖에 걸리지 않으며 컴퓨터와 상호 작용할 수있는 정말 재미 있고 쉬운 방법입니다.

그러나 명령 행을 사용하여 혼란스럽기를 원치 않는다면 몽구스 웹 서버를 사용해보세요:

[Mongoose](http://cesanta.com/mongoose.shtml)

또는 훌륭한 [Brackets text editor](http://brackets.io)를 사용하여 모든 코드를 작성하십시오. Brackets는 기본 작업 공간에서 번개 모양 버튼을 클릭하면 자동으로 웹 서버와 브라우저를 실행합니다. 이제 준비가 되었다고 생각한다면 계속 읽어보세요! 

(독자에게 요청합니다: 이것은 살아있는 문서입니다. 구체적인 세부사항에 대해 질문이 있거나 내용이 명확하게 설명되어야 하는 경우 이 GitHub 저장소에 **문제**를 생성하세요. 자세한 내용은 텍스트를 업데이트하세요.)

설정 방법
---------

코드 작성을 시작하기 전에 프로젝트 폴더를 만들고 프로젝트의 root directory에서 웹 서버를 시작하세요. 웹 서버를 사용하지 않는다면 Pixi는 작동하지 않습니다.


다음으로 Pixi를 설치해야합니다.

### 픽시 설치

이 소개에 사용 된 버전은 **v4.5.5**이며 이 저장소의 `pixi` 폴더 또는 [Pixi's release page for v4.5.5](https://github.com/pixijs/pixi.js/releases/tag/v4.5.5).에서 `pixi.min.js` 파일을 찾을 수 있습니다. 또는 [Pixi's main release page](https://github.com/pixijs/pixi.js/releases).에서 최신 버전을 다운로드 할 수 있습니다.

Pixi를 사용하려면 이 파일 하나만 있으면 됩니다. 저장소의 다른 모든 파일을 무시할 수 있습니다: **당신은 그것들이 필요 없을 것입니다.**

다음으로 기본 HTML 페이지를 만들고 `<script>` 태그를 사용하여 방금 다운로드 한 `pixi.min.js` 파일을 연결하세요. `<script>` 태그의 `src`는 웹 서버가 실행중인 루트 디렉토리에 대해 상대적이어야 합니다.`<script>` 태그는 다음과 같이 보일 수 있습니다:

```
<script src="pixi.min.js "></script>
```

다음은 Pixi를 연결하고 작동하는지 테스트 할 수 있는 기본 HTML 페이지입니다.(이것은 `pixi.min.js`가 `pixi`라고 불리는 하위 폴더에 있다고 가정합니다.):

```
<!doctype html>
<html>
<head>
  <meta charset="utf-8 ">
  <title>Hello World</title>
</head>
  <script src="pixi/pixi.min.js "></script>
<body>
  <script type="text/javascript ">
    let type ="WebGL "
    if (!PIXI .utils .isWebGLSupported()){
      type ="canvas "
    }

    PIXI .utils .sayHello (type)
  </script>
</body>
</html>
```

Pixi가 제대로 연결되면 다음과 같은 내용이 기본적으로 웹 브라우저의 JavaScript 콘솔에 표시됩니다: 

```
PixiJS 4.4.5 - * canvas * http://www.pixijs.com/  ♥♥♥ 
```


<a id='application'></a>
`Stage` 와 Pixi Application 생성
------------

이제 Pixi를 사용할 수 있습니다! 

그러나 어떻게 해야 할까요?

첫 번째 단계는 이미지를 표시 할 수 있는 직사각형의 디스플레이 영역을 만드는 것입니다. Pixi에는 이것을 생성하는 `Application` 개체가 있습니다. 이는 자동으로 HTML `<canvas>` 요소를 생성해 캔버스에 이미지를 표시하는 방법을 알아냅니다. 그런 다음 `stage`라는 특수 Pixi `Container` 객체를 만들어야 합니다. 앞에서도 볼 수 있듯이 이 `stage` 객체는 Pixi가 표시하는 모든 것을 담을 수 있는 root container로 사용될 것입니다. 

`app` Pixi 응용 프로그램 및 `stage` 응용 프로그램을 작성하기 위해 작성해야하는 코드는 다음과 같습니다. `<script>` 태그 사이에 있는 HTML 문서에 이 코드를 추가하세요.

```js

//Create a Pixi Application
let app =new PIXI.Application({width :256, height :256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
```

이것은 Pixi를 사용하기 시작하기 위해 작성해야하는 가장 기본적인 코드입니다. 이것은 블랙 256 픽셀 x 256 픽셀 캔버스 요소를 만들어 HTML 문서에 추가합니다. 이 코드를 실행하면 브라우저에서 다음과 같이 표시됩니다.

![Basic display](/examples/images/screenshots/01.png)

[black square](http://rampantgames.com/blog/?p=7745)이 나옵니다!

`PIXI.응용프로그램`은 당신이 사용하고 있는 웹브라우저에서 어떤 것을 이용할 수 있는지에 따라 그래픽을 rendering 하기 위해 캔버스 드로잉 API를 사용할지 WebGL을 사용할지를 파악합니다. 이것은 `option` 객체 라고 불리는 단일 객체입니다. 이 예제에서 `width` 및 `height` 속성은 캔버스의 너비와 높이를 픽셀 단위로 결정하도록 설정됩니다. 당신은 이 옵션 객체 내에 더 많은 `options` 속성을 설정할 수 있습니다. anti-aliasing, transparency 및 resolution을 설정하는 방법은 다음과 같습니다.

```js

let app =new PIXI.Application({ 

    width :256,         // default: 800
    height :256,        // default: 600
    antialias :true,    // default: false
    transparent :false, // default: false
    resolution :1       // default: 1
  }
);

```

Pixi의 기본 설정에 만족하는 경우 이러한 옵션을 설정할 필요가 없습니다. 그러나 필요한 경우 [PIXI.Application](http://pixijs.download/release/docs/PIXI.Application.html)에 대한 Pixi의 설명서를 참조하십시오. 

그 선택사항들은 무엇을 할까요? `antialias`은 글꼴 및 그래픽 프리미티브의 가장자리를 부드럽게 합니다. (WebGL anti-aliasing는 일부 플랫폼에서 사용할 수 없으므로, 게임의 타깃 플랫폼에서 이 기능을 테스트해야 합니다.) `transparency`는 캔버스 배경을 투명하게 만들어줍니다. `resolution`은 다양한 해상도와 픽셀 밀도의 디스플레이로 작업하는 것을 더 쉽게 만들어줍니다. 해상도를 설정하는 것은 이 튜토리얼의 범위를 벗어나는 부분이지만 `resolution`를 사용하는 방법에 대한 모든 세부 사항에 해상도를 사용하는 방법에 대한 모든 세부 사항은 [Mat Grove's explanation](http://www.goodboydigital.com/pixi-js-v2-fastest-2d-webgl-renderer/)을 확인하세요. 하지만 대개 대부분의 프로젝트에서 `resolution`를 1로 유지하면 문제가 없습니다. 

Pixi의 `renderer` 개체는 WebGL로 기본 설정되며, WebGL은 믿을 수 없을 정도로 빠르며, 여러분이 앞으로 알게 될 멋진 시각 효과를 사용할 수 있기 때문에 좋습니다. 그러나 WebGL을 통해 Canvas Drawing API 렌더링을 강제 실행해야하는 경우 `forceCanvas` 옵션을 다음과 같이 true로 설정할 수 있습니다:
```js
forceCanvas:true,
```


캔버스를 만든 후에 캔버스의 배경색을 변경해야하는 경우 `app.renderer` 객체의 `backgroundColor` 속성을 16 진수 색상 값으로 설정합니다:

```js

app.renderer.backgroundColor =0x061639;
```

`renderer`의 너비 또는 높이를 찾으려면 `app.renderer.view.width` 및 `app.renderer.view.height` 를 사용하세요.

캔버스의 크기를 변경하려면 `renderer`의 `resize` 메서드를 사용하고 새로운 `width` 및 `height` 값을 제공하세요. 그러나 해상도와 일치하도록 캔버스의 크기를 조정하려면 `autoResize`를 `true`로 설정하세요.

```js

app.renderer.autoResize =true;
app.renderer.resize(512, 512);

```

캔버스가 전체 창을 채우게 하려면 이 CSS 스타일을 적용하고 renderer의 크기를 브라우저 창의 크기에 맞게 조정할 수 있습니다.

```

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

```

그러나 그렇게 한다면 CSS 코드를 사용하여 모든 HTML 요소에서 기본 여백과 여백을 0으로 설정해야 합니다. 

```html
<style>* {padding : 0 ; margin : 0 }</style>
```

(위의 코드에서 별표 (*)는 "HTML 문서의 모든 태그"를 의미하는 CSS "범용 선택기"입니다.)

캔버스를 브라우저 창 크기에 비례하여 크기를 조정하려면 [this custom scaleToWindow function](https://github.com/kittykatattack/scaleToWindow).를 사용할 수 있습니다.

<a id='sprites'></a>
Pixi 속성
------------

이제 renderer가 생겼으니 거기에 이미지를 추가 할 수 있습니다. renderer에서 볼 수 있게 하려면 `stage` 라는 특수 Pixi 개체에 추가해야 합니다. 당신은 다음과 같은 특수 `stage` 객체에 액세스할 수 있습니다. 

```js

app.stage

```

`stage`는 Pixi `Container` 객체입니다. 당신은 Container 를 그룹화하고 그 내부에 넣은 것을 저장하는 일종의 빈 상자라고 생각할 수 있습니다. `stage` 객체는 모든 보이는 장면들의 root container입니다. `stage` 안에 무엇을 넣든 캔버스에 rendering 될 것 입니다. 지금은 `stage`가 비어 있지만 곧 무언가를 넣을 것 입니다. [[여기서](http://pixijs.download/release/docs/PIXI.Container.html)] Pixi `Container` 객체에 대해 더 자세히 읽을 수 있습니다.

(중요 : `stage` 는 Pixi `Container` 이므로 다른 `Container` 객체와 동일한 속성 및 메서드를 가집니다. 그러나 `stage` 의 `width` 와 `height` 의 특성이 있지만 rendering 창의 크기를 참조하지는 않습니다. stage의 `width` 와 `height` 의 특성은 단지 그 안에 넣은 물건이 차지하는 영역을 알려줍니다 - 앞으로 더 많이!)

그렇다면 stage 위에 무엇을 넣어야 할까요? **Sprites** 라고 불리는 특수 이미지 개체입니다. Sprites는 기본적으로 코드로 제어할 수 있는 이미지 입니다. 당신은 그들의 위치, 크기, 그리고 쌍방향 그래픽과 애니메이션 그래픽을 만드는데 유용한 다른 속성들을 제어할 수 있습니다. Sprites 를 만들고 조절하는 법을 배우는 것은 Pixi를 사용하는 법을 배우는데 있어 정말로 가장 중요한 것 입니다. 당신이 sprites를 만들어 stage에 추가하는 방법을 알고 있다면, 당신은 게임을 만들기 시작한 순간부터 한발짝 나아간 것 입니다. 

Pixi 는 게임 `sprites`를 만들 수 있는 다용도적 인 sprites 클래스를 가지고 있습니다. 이를 만드는 데에 세 가지 주요한 방법이 있습니다. 

- 단일 이미지 파일.
- **Tileset**의 sub-image. Tile-set는 게임에 필요한 모든 이미지를 포함하는 하나의 큰 이미지 입니다.
- **texture atlas**(tile-set의 이미지의 크기와 위치를 정의하는 JSON 파일).
 
당신은 세 가지 방법 모두를 배우 겠지만, 하기 전에 Pixi로 이미지를 표시하기 전에 이미지에 대해 알아야 할 것이 무엇인지 알아 보겠습니다. 

<a id='loading'></a>
텍스처 캐시에 이미지 올리기
-------------------------------

Pixi가 WebGL을 사용하여 GPU에서 이미지를 rendering하므로 이미지는 GPU가 처리 할 수 있는 형식이어야 합니다. WebGL에 준비된 이미지를 **texture**라고 합니다. Sprite에 이미지를 표시하려면 일반 이미지 파일을 WebGL 텍스처로 변환해야 합니다. 빠르고 효율적으로 모든 작업을 수행하기 위해 Pixi는 **texture cache**를 사용하여 sprite에 필요한 모든 텍스처를 저장하고 참조합니다. 텍스처의 이름은 참조하는 이미지의 파일 위치와 일치하는 문자열입니다. 즉, `"images/cat.png"`에서 로드 된 텍스처가 있으면 다음과 같이 텍스처 캐시에서 찾을 수 있습니다:

```js

PIXI.utils.TextureCache["images/cat.png"];

```

텍스처는 WebGL 호환 형식으로 저장되므로 Pixi의 renderer와 함께 사용할 수 있습니다. 그런 다음 Pixi의 `Sprite` 클래스를 사용하여 텍스처를 사용하여 새로운 sprite를 만들 수 있습니다.

```js

let texture = PIXI.utils.TextureCache["images/anySpriteImage.png"];
let sprite = new PIXI.Sprite(texture);

```

하지만 어떻게 이미지 파일을 로드하고 텍스처로 변환할까요? Pixi에 내장 된 `loader` 객체를 사용하세요. 

Pixi의 강력한 `loader` 객체만 있으면 어떤 종류의 이미지든 로드 할 수 있습니다. 이미지를 로드하고 이미지로드가 완료되면 `setup` 이라는 함수를 호출하는 방법은 다음과 같습니다: 

```js

PIXI.loader
  .add("images/anyImage.png")
  .load(setup);

function setup() {
  //This code will run when the loader has finished loading the image
}

```

[Pixi’s development team loader](http://www.html5gamedevs.com/topic/16019-preload-all-textures/?p=90907)를 사용하는 경우 다음과 같이 `loader`의 `resources` 객체에서 텍스처를 참조하여 sprite를 만들어야 한다고 권장합니다:
 
```js

let sprite = new PIXI.Sprite(
  PIXI.loader.resources["images/anyImage.png"].texture
);

```

다음은 이미지를 로드하고 `setup` 함수를 호출하고 로드 된 이미지에서 sprite를 생성하기 위해 작성 할 수 있는 완전한 코드 예제입니다: 

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

이 튜토리얼에서는 이미지를 로드하고 sprite를 생성하는데 사용할 일반 형식입니다.

다음과 같이 연결 가능한 `add` 메소드를 사용하여 여러 이미지를 동시에 로드 할 수 있습니다.

```js

PIXI.loader
  .add("images/imageOne.png")
  .add("images/imageTwo.png")
  .add("images/imageThree.png")
  .load(setup);

```

다음과 같이 단일 add  method 내의 배열에 로드하려는 모든 파일을 나열하면 됩니다:

```js

PIXI.loader
  .add([
    "images/imageOne.png",
    "images/imageTwo.png",
    "images/imageThree.png"
  ])
  .load(setup);

```

또한 `loader`를 사용하여 JSON 파일을 로드 할 수 있습니다.

<a id='displaying'></a>
sprites 표시
-----------------------------

이미지를 로드하고 sprite를 만드는데 사용한 후에는 다음과 같이 Pixi의 `stage`에 `stage.addChild` 메소드와 함께 sprite를 추가해야 합니다:

```js

app.stage.addChild(cat);

```

`stage` 가 모든 sprite를 보관하는 주 저장소 라는 것을 기억하세요.

**중요: 스프라이트를 `stage` 에 추가하지 않으면 스프라이트를 볼 수 없습니다!**

계속하기 전에 방금 배운 것을 사용하여 단일 이미지를 표시하는 방법에 대한 실용적인 예를 살펴 보겠습니다. `examples / images` 폴더에는 고양이의 64 x 64 픽셀 PNG 이미지가 있습니다.

![Basic display](/examples/images/cat.png)

이미지를 로드하고, sprite를 만들고, Pixi의 stage에 표시하는데 필요한 모든 JavaScript 코드는 다음과 같습니다.

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

이 코드가 실행되면 다음과 같이 표시됩니다:

![Cat on the stage](/examples/images/screenshots/02.png)

이제 우리는 나아가고 있습니다!

stage에서 sprite를 제거해야하는 경우 `removeChild` 메소드를 사용하세요:

```js

app.stage.removeChild(anySprite)

```

그러나 보통 sprite의 `visible` 속성을 `false`으로 설정하는 것이 sprite를 사라지게 하는 더 간단하고 효율적인 방법이 될 것 입니다.

```js

anySprite.visible = false;

```

### aliases 사용

자주 사용하는 Pixi 객체와 메소드에 대해 짧은 형식의 aliases를 생성하여 타이핑을 약간 줄이고 코드를 보다 읽기 쉽게 만들 수 있다. 예를 들어, Pixi 의 모든 객체에 `PIXI` 접두사를 붙이면 어려워지지 않을까요? 그렇게 생각한다면 더 짧은 aliases를 작성하세요. 예를 들어 `TextureCache` 객체에 대한 aliases를 생성하는 방법은 다음과 같습니다.

```js

let TextureCache = PIXI.utils.TextureCache

```

그런 다음 다음과 같이 원본 대신 해당 aliases를 사용하세요:

```js

let texture = TextureCache["images/cat.png"];

```

aliases를 사용하면 코드를 좀 더 간결하게 작성할 수 있을 뿐 아니라 추가적인 이점이 있습니다. 이것은 자주 바뀌는 Pixi의 API로부터 당신을 보호하도록 도움을 줍니다. Pixi의 API가 향후 버전에서 변경되는 경우 – 그렇게 될 것 입니다! – 이 aliases를 Pixi 객체와 메소드로 업데이트하는 것은 코드 전체에서 사용되는 모든 인스턴스 대신 프로그램의 시작 부분에서 한 곳으로 업데이트 하면 됩니다. 그래서 Pixi의 개발팀이 가구를 재정비하기로 결정하게 된다면, 당신은 그들보다 한발 앞서 나가게 될 것 입니다! 

이를 수행하는 방법을 알아 보려면 모든 Pixi 객체 및 메서드에 aliases를 사용하여 이미지를 로드하고 표시하기 위해 작성한 코드를 다시 작성하십시오. 

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

이 튜토리얼의 대부분의 예제는 동일한 모델을 따르는 Pixi 객체의 aliases를 사용합니다. **달리 명시하지 않는 한, 모든 코드 예제에서 이와 같은 aliases를 사용한다고 가정 할 수 있습니다.**

이미지를 로드하고 스프라이트를 생성하기 위해 알아야 할 것은 이것뿐 입니다. 

<a id='alittlemoreaboutloadingthings'></a>
### 자세한 로딩 방법

위에 표시된 형식은 이미지를 로드하고 sprite를 표시하기 위한 표준 템플릿으로 사용할 것을 제안합니다. 따라서 다음 몇 단락을 무시하고 다음 단원인 “sprite 배치”로 바로 넘어 갈 수 있습니다. 그러나 Pixi의 `loader`객체는 매우 정교하며 정기적으로 사용하지 않아도 알고 있어야하는 몇 가지 기능이 포함되어 있습니다. 가장 유용한 몇 가지를 살펴 봅시다.

<a id='makeaspritefromanordinaryjavascriptimageobject'></a>
#### 일반적인 JavaScript Image 객체 또는 Canvas에서 속성 만들기

최적화와 효율성을 위해 Pixi의 텍스처 캐시에 미리 로드 된 텍스처로 sprite를 만드는 것이 가장 좋습니다. 그러나 다른 이유로 정규 JavaScript `Image` 객체에서 텍스처를 만들어야 하는 경우 Pixi의 `BaseTexture` 및 `Texture` 클래스를 사용하여 이를 수행 할 수 있습니다.

```js

let base = new PIXI.BaseTexture(anyImageObject),
    texture = new PIXI.Texture(base),
    sprite = new PIXI.Sprite(texture);

```

기존 캔버스 요소에서 텍스처를 만들려면 `BaseTexture.fromCanvas` 를 사용할 수 있습니다.

```js

let base = new PIXI.BaseTexture.fromCanvas(anyCanvasElement),

```

스프라이트가 표시하는 texture 를 변경하려면 `texture` 속성을 사용하십시오. 이것을 다음과 같이 임의의 `texture` 객체로 설정 하십시오:

```js

anySprite.texture = PIXI.utils.TextureCache["anyTexture.png"];

```

이 기술을 사용하여 게임에서 중요한 일이 발생하면 sprite의 모양을 대화식으로 변경할 수 있습니다. 

<a id='assigninganametoaloadingfile'></a>
#### load 된 파일에 이름 지정

load하려는 각 리소스에 고유한 이름을 지정할 수 있습니다. `add` 메소드의 최초의 인수로서 이름(문자열)을 제공하세요. 예를 들어 고양이의 이미지 이름을 `catImage`로 지정하는 방법은 다음과 같습니다. 

```js

PIXI.loader
  .add("catImage", "images/cat.png")
  .load(setup);

```

이것은 `catImage`라고 불리는 객체를 `loader.resources`에 생성한다.
따라서 `catImage`객체를 참조하여 sprite를 만들 수 있는데, 방법은 다음과 같다.

```js

let cat = new PIXI.Sprite(PIXI.loader.resources.catImage.texture);

```

그러나 이 기능을 사용하지 않는 것이 좋습니다! load된 각 파일에 부여한 모든 이름을 기억하고 우연히 동일한 이름을 두 번 이상 사용하지 않아야 하기 떄문입니다. 앞의 예제에서 와 같이 파일 경로 이름을 사용하면 더 간단하고 오류가 덜 발생합니다. 

<a id='monitoringloadprogress'></a>
#### load 진행과정 모니터링

Pixi의 loader에는 파일이 load 될 때마다 실행될 사용자 지정 기능을 호출하는 특별한 `progress` 이벤트가 있습니다. `Progress` 이벤트는 다음과 같이 `loader`의 `on` 메서드에 의해 호출됩니다.

```js

PIXI.loader.on("progress", loadProgressHandler);

```

Loading chain에 `on` 메소드를 포함하고 파일이 로드 될 때마다 `loadProgressHandler`라는 사용자 정의 함수를 호출하는 방법은 다음과 같습니다.

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

파일 중 하나가 load될 때마다 progress 이벤트가 `loadProgressHandler`를 호출하여 “loading”을 콘솔에 표시합니다. 세 파일 모두가 load되면 `setup` 기능이 실행됩니다. 콘솔에 위의 코드가 출력되었습니다.

```js

loading
loading
loading
setup

```

그것은 깔끔하지만, 나아질 것 입니다. 또한 load된 파일과 현재 load된 전체 파일의 비율을 정확히 알 수 있습니다. `loadProgressHandler`에서 선택적 `loader` 및 `resource` 매개 변수를 추가하여 다음과 같이 할 수 있습니다. 

```js

function loadProgressHandler(loader, resource) { /*...*/ }

```

그런 다음 `resource.url` 을 사용하여 reload된 파일을 찾을 수 있습니다. (Add 메소드의 첫 번째 인수로 파일에 할당한 선택적 이름을 찾으려면 `resource.name`을 찾으세요.) `loader.progress`를 사용하여 현재 load된 총 리소스의 비율을 확인 할 수 있습니다. 바로 여기에 몇 가지 코드가 있습니다.

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

다음은 이 코드가 실행될 때 콘솔에 표시되는 내용입니다.

```js

loading: images/one.png
progress: 33.333333333333336%
loading: images/two.png
progress: 66.66666666666667%
loading: images/three.png
progress: 100%
All files loaded

```

Load 진행률 표시 줄을 만들 때 기본으로 사용할 수 있으므로 정말 멋집니다.

(참고: `resource` 객체에 엑세스 할 수 있는 추가 속성이 있습니다. `resource.error` 는 파일을 load하려고 할 때 일어날 수 있는 오류를 알려줍니다. `resource.data` 를 사용하면 파일의 원시 이진 데이터에 액세스 할 수 있습니다.)

<a id='moreaboutpixisloader'></a>
#### Pixi의 로더에 대한 추가 정보

Pixi의 로더는 엄청나게 기능이 풍부하고 구성 가능합니다. 시작하기 위해 사용법을 빠르게 조망 해봅시다. 

Loader 의 chainable `add` 메소드는 4가지 기본 인수를 취합니다. 

```js

add(name, url, optionObject, callbackFunction)

```

다음은 loader의 소스 코드 문서에서 이러한 매개 변수에 대해 설명하는 내용입니다.

`name` (string): 로드 할 리소스의 이름. 통과되지 않으면 `url`이 사용됩니다.

`url` (string): loader의 `baseUrl`을 기준으로 한 리소스의 URL입니다.

`options` (object literal): load에 대한 옵션

`options.crossOrigin` (Boolean): 요청이 cross-origin입니까? 기본값은 자동으로 결정 하는 것 입니다.

`options.loadType`: 리소스를 어떻게 로드해야 합니까? 기본값은 Resource.LOAD_TYPE.XHR 입니다.

`options.xhrType`: XHR사용시 load 할 데이터를 어떻게 해석해야 합니까? 기본값은 `Resource.XHR_RESPONSE_TYPE.DEFAULT`입니다.

`callbackFunction` : 이 특정 리소스가 load를 완료할 때 호출할 함수입니다.

이러한 인수 중 필요한 것은 `url` (로드하려는 파일)뿐 입니다.
 
다음은 `add` 메소드를 사용하여 파일을 로드하는 몇 가지 방법의 예입니다. 이러한 첫 번째 것들은 문서가 loader의 “object syntax”라고 부르는 것 입니다. 

```js

.add('key', 'http://...', function () {})
.add('http://...', function () {})
.add('http://...')

```

그리고 이것들은 loader의 “object syntax”의 예입니다:

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

또한 `add` 메소드에 객체 배열 또는 urls 또는 둘 모두를 전달할 수 있습니다. 

```js

.add([
  {name: 'key4', url: 'http://...', onComplete: function () {} },
  {url: 'http://...', onComplete: function () {} },
  'http://...'
]);

```

(참고 : 새로운 파일 배치를 load하기 위해 loader를 재설정해야하는 경우 loader의 `reset` 메소드 인 `PIXI.loader.reset ();`을 호출하십시오.) Pixi의 loader에는 모든 유형의 binary 파일을 load하고 파싱 할 수 있는 옵션을 포함하여 더 많은 고급 기능이 있습니다. 이것은 일반적인일이 아니며 이 튜토리얼의 범위를 벗어나는 방법이므로 [loader의 GitHub저장소에서 자세한 내용을 확인하세요.](https://github.com/englercj/resource-loader).

<a id='positioning'></a>
Sprite의 위치 지정
----------------

이제 sprite를 만들고 표시하는 방법을 알았으므로 sprite를 배치하고 크기를 조정하는 방법을 알아 보겠습니다. 

이전 예제에서는 cat sprite가 왼쪽 상단의 stage에 추가되었습니다. 고양이는 0의 `x` 위치와 0의 `y` 위치를 가집니다.  `x`와 `y` 속성의 값을 변경하여 고양이의 위치를 변경할 수 있습니다. `x`와 `y` 속성 값을 96으로 설정하여 고양이를 stage에 집중시키는 방법은 다음과 같습니다. 

```js

cat.x = 96;
cat.y = 96;

```

sprite를 생성 한 후에는 `setup` 함수 내부 어디에서나 이 두 줄의 코드를 추가하십시오.

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

(참고 :이 예에서 `Sprite`는 `PIXI.Sprite`의 aliases이고 `TextureCache`는 `PIXI.utils.TextureCache`의 aliases이며 `resources`는 앞서 설명한 `PIXI.loader.resources`의 aliases입니다. 지금부터 예제 코드의 모든 Pixi 객체와 메소드에 대해이 동일한 형식을 따르는 aliases를 사용하게 될 것입니다.)

이 새로운 두 줄의 코드는 고양이를 오른쪽으로 96 픽셀 이동하고 아래로 96 픽셀 이동합니다. 결과는 다음과 같습니다.

![Cat centered on the stage](/examples/images/screenshots/03.png)

고양이의 왼쪽 상단 (왼쪽 귀)은 `x` 및 `y`  anchor point를 나타냅니다. 고양이를 오른쪽으로 이동하려면 `x` 속성 값을 늘리세요. 고양이가 아래로 움직이게 하려면 `y` 속성 값을 늘리세요. 고양이의 `x` 값이 0이면 stage 왼쪽에 있습니다. `y` 값이 0이면 맨 위에 표시됩니다.

![Cat centered on the stage - diagram](/examples/images/screenshots/04.png)

sprite의 `x` 및 `y` 속성을 독립적으로 설정하는 대신 다음과 같이 한 줄의 코드로 함께 설정할 수 있습니다.

```js

sprite.position.set(x, y)

```

<a id='sizenscale'></a>
크기와 규모
----------------------

`width`와 `height` 속성을 설정하여 sprite의 크기를 변경할 수 있습니다. 고양이에게 80 픽셀 `width`와 `height` 120 픽셀을 주는 방법은 다음과 같습니다. 

```js

cat.width = 80;
cat.height = 120;

```

다음 두 줄의 코드를 `setup` 함수에 추가합니다.

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

결과는 다음과 같습니다.

![Cat's height and width changed](/examples/images/screenshots/05.png)

고양이의 위치 (왼쪽 위 모서리)가 변하지 않았으며  width와 height 만 변함을 알 수 있습니다.

![Cat's height and width changed - diagram](/examples/images/screenshots/06.png)

또한 sprite에는 `scale.x`와 `scale.y` 속성이있어 스프라이트의 width와 height 가 그에 비례하여 변경됩니다. 고양이의 눈금을 반으로 설정하는 방법은 다음과 같습니다.

```js

cat.scale.x = 0.5;
cat.scale.y = 0.5;

```

Scale 값은 sprite 크기의 백분율을 나타내는 0에서 1 사이의 숫자입니다. 1은 100 % (전체 크기)를 의미하고 0.5는 50 % (절반 크기)를 의미합니다. sprite의 크기를 2로 설정하여 sprite의 크기를 두 배로 늘릴 수 있습니다. 

```js

cat.scale.x = 2;
cat.scale.y = 2;

```

Pixi는 `scale.set` 메서드를 사용하여 한 줄의 코드에서 스프라이트의 크기를 설정할 수있는 대체적이고 간결한 방법을 제공합니다. 

```js

cat.scale.set(0.5, 0.5);

```

그게 마음에 든다면 쓰세요!

<a id='rotation'></a>
회전 
---------------

`rotation` 속성을 [라디안 ](http://www.mathsisfun.com/geometry/radians.html) 단위의 값으로 설정하여 sprite를 회전시킬 수 있습니다.

```js

cat.rotation = 0.5;

```

그러나 어느 지점에서 회전이 발생합니까? 

sprite의 왼쪽 위 모서리는 `x`와 `y` 위치를 나타냅니다. 이 지점을  **anchor point**이라고합니다. sprite의 `rotation` 속성을 `0.5`와 같이 설정하면 회전은 sprite의 anchor point *주위에서 발생합니다*.

이 다이어그램은 이것이 고양이 sprite에 어떤 영향을 미치는지 보여줍니다. 

![Rotation around anchor point - diagram](/examples/images/screenshots/07.png)

Anchor point인 고양이의 왼쪽 귀는 고양이가 회전하고있는 가상 원의 중심이라는 것을 알 수 있습니다. sprite를 중심에서 회전 시키려면 어떻게 해야할까요? sprite의 중심점이 다음과 같이 중앙에 오도록 sprite의 `anchor` point를 변경합니다. 

```js

cat.anchor.x = 0.5;
cat.anchor.y = 0.5;

```

`anchor.x` 및 `anchor.y` 값은 texture 크기의 백분율을 0에서 1 (0 %에서 100 %)까지 나타냅니다. 0.5로 설정하면 점 위에 texture가 집중됩니다. 점 자체의 위치는 texture가 그 위에 위치하는 방식으로 바뀌지 않습니다.

이 다음 다이어그램은 anchor point를 중앙에 놓으면 회전 된 sprite에 어떤 일이 발생하는지 보여줍니다. 

![Rotation around centered anchor point - diagram](/examples/images/screenshots/08.png)

sprite의 texture가 왼쪽 위로 이동한다는 것을 알 수 있습니다. 이것은 기억해야 할 중요한 부작용입니다!

`position` 및 `scale`과 마찬가지로 anchor의 x 및 y 값을 다음과 같은 한 줄의 코드로 설정할 수 있습니다.

```js

cat.anchor.set(x, y)

```

Sprite에는 `anchor`와 비슷한 방식으로 작동하는 `pivot` 속성도 있습니다. `pivot`은 sprite의 x / y 원점
위치를 설정합니다. Pivot point을 변경 한 다음 sprite를 회전하면 원점을 기준으로 회전합니다. 예를 들어 다음 코드는 스프라이트의 `pivot.x` 지점을 32로 설정하고 `pivot.y`는 32를 가리 킵니다.

```js

cat.pivot.set(32, 32)

```

sprite가 64x64 픽셀이라고 가정하면 이제 sprite는 중심점을 중심으로 회전합니다. 하지만 기억하십시오. 스프라이트의 pivot point를 변경하면 x / y 원점도 변경됩니다. 

`anchor`와 `pivot`의 차이점은 무엇일까요? 그들은 정말 비슷합니다! `anchor`는 0에서 1 표준화 된 값을 사용하여 sprite의 이미지 texture의 원점을 이동합니다. `privot`은 픽셀 값을 사용하여 sprite의 x 및 y 점의 원점을 이동합니다. 어느 것을 사용해야할까요? 그것은 당신에게 달려 있습니다. 두 가지 모두를 다뤄보고 자신이 선호하는 것을 고르세요.

<a id='tileset'></a>
부가 이미지 모음으로부터 sprite 만들기
----------------------------------------

단일 이미지 파일에서 sprite를 만드는 방법을 알았습니다. 하지만 게임 디자이너는 일반적으로 **tilesets** (**spritesheets**라고도 함)를 사용하여 sprite를 만듭니다. Pixi는 이를 돕는 편리한 방법을 제공합니다. tileset은 하위 이미지가 포함된 단일 이미지 파일입니다. 하위 이미지는 게임에서 사용하려는 모든 그래픽을 나타냅니다. 다음은 게임 캐릭터와 게임 를 하위 이미지로 포함하는 tilesets 이미지의 예입니다.

![An example tileset](/examples/images/screenshots/09.png)
 
전체 tileset은 192 x 192 픽셀입니다. 각 이미지는 자체 32 x 32 픽셀 격자 셀에 있습니다. 타일셋에 모든 게임 그래픽을 저장하고 액세스하는 것은 그래픽 작업에 매우 효율적인 프로세서와 메모리를 제공하며 Pixi는 이를 위해 최적화되어 있습니다.

추출하려는 하위 이미지와 크기 및 위치가 동일한 직사각형 영역을 정의하여 tileset 에서 하위 이미지를 캡처 할 수 있습니다. 다음은 tileset에서 추출한 로켓 하위 이미지의 예입니다.

![Rocket extracted from tileset](/examples/images/screenshots/10.png)
 
이 작업을 수행하는 코드를 살펴보겠습니다. 먼저, 이전 예제에서 했던 것처럼, Pixi의 `loader`로 `tileset.png` 이미지를 로드하십시오. 

```js

loader
  .add("images/tileset.png")
  .load(setup);

```

그런 다음, 이미지가 로드되면 tileset의 직사각형 하위 섹션을 사용하여 sprite의 이미지를 만듭니다. 다음은 하위 이미지를 추출하고 로켓 sprite를 작성한 다음 캔버스에 위치를 표시하는 코드입니다.

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
  app.renderer.render(app.stage);
}

```

이건 어떻게 작동할까요?
Pixi에는 사각형 모양을 정의하기 위한 범용 객체인 내장 `Rectangle` 객체 (`PIXI.Rectangle`)가 있습니다. 네 가지 인수가 필요합니다. 처음 두 인수는 사각형의 `x` 및 `y` 위치를 정의합니다. 마지막 두 가지는 `width`와 `height`를 정의합니다. 다음은 새로운 `Rectangle` 객체를 정의하는 형식입니다.

```js

let rectangle = new PIXI.Rectangle(x, y, width, height);

```
사각형 객체는 *데이터 객체*일 뿐입니다. 어떻게 사용할지 결정하는 것은 당신에게 달려 있습니다. 이 예제에서는 우리가 추출하고자 하는 tileset상의 서브 이미지의 위치와 영역을 정의하기 위해 이를 사용하고 있습니다. Pixi 텍스처에는 `frame`이라는 유용한 속성이 있으며 모든 `Rectangle` 객체에 설정할 수 있습니다. `frame`은 텍스처를 `rectangle`의 크기에 맞추어 자릅니다. 다음은 `frame`을 사용하여 텍스처를 로켓의 크기와 위치에 맞춰 자르는 방법입니다.

```js

let rectangle = new Rectangle(192, 128, 64, 64);
texture.frame = rectangle;

```

그런 다음 잘린 텍스처를 사용하여 sprites를 만들 수 있습니다.

```js

let rocket = new Sprite(texture);

```

그리고 그것이 작동하는 방법입니다!

tileset에서 sprite 텍스처를 만드는 것은 매우 빈번한 작업이기 때문에, Pixi는 이를 수행하는데 도움이 되는 보다 편리한 방법을 제공합니다 - 이 방법에 무엇이 있는지 알아보겠습니다.

<a id='textureatlas'></a>
텍스터 atlas 사용하기
---------------

만약 여러분이 크고 복잡한 게임을 작업하는 경우, 당신은 tileset에서 sprite를 빠르고 효율적으로 만드는 방법을 원할 것 입니다. 여기선 **texture atlas**가 정말 유용하게 쓰입니다. 텍스처 atlas는 일치하는 tileset의 PNG 이미지에 하위 이미지의 위치와 크기가 포함된 JSON 데이터 파일입니다. 텍스처 atlas를 사용하는 경우 표시하려는 하위 이미지의 이름만 알면 됩니다. 임의의 순서로 tileset 이미지를 정렬할 수 있으며 JSON 파일은 크기와 위치를 추적합니다. 이는 tileset 이미지의 크기와 위치가 게임 프로그램에 hard-coding 되지 않았다는 것을 의미하기 때문에 매우 편리합니다. 이미지 추가, 크기 조정 또는 제거와 같이 tileset를 변경하고 JSON 파일을 다시 게시하기만 하면 게임에서 해당 데이터를 사용하여 올바른 이미지를 표시합니다. 게임 코드를 변경할 필요가 없습니다.

Pixi는 Texture Packer라는 유명한 소프트웨어 도구에서 출력하는 표준 JSON 텍스처 atlas 형식과 호환됩니다. [Texture Packer](https://www.codeandweb.com/texturepacker)의 "Essential" 라이센스는 무료입니다. 텍스쳐 atlas 제작에 사용되는 방법을 알아보고, Pixi에 atlas를 로드하십시오. ([Shoebox](http://renderhjs.net/shoebox/) 또는 [spritesheet.js](https://github.com/krzysztof-o/spritesheet.js/)와 같은 유사한 도구는 Pixi와 호환되는 표준 형식으로 PNG 및 JSON 파일을 출력합니다. Texture Packer를 사용할 필요가 없습니다.)

먼저, 게임에서 사용할 개별 이미지 파일의 모음으로 시작하십시오.

![Image files](/examples/images/screenshots/11.png)

(이 섹션의 모든 이미지는 Lanea Zimmerman에 의해 작성되었습니다. [여기](http://opengameart.org/users/sharm)에서 그녀의 작품을 더 많이 찾을 수 있습니다. 감사합니다, Lanea!)

그런 다음 Texture Packer를 열고 프레임 워크 유형으로 **JSON Hash**를 선택하십시오. 이미지를 Texture Packer의 작업 공간으로 드래그 하십시오. (Texture Packer가 이미지가 있는 폴더를 가리킬수도 있습니다.) 이미지는 자동으로 단일 tileset 이미지에 정렬되고 원래 이미지 이름과 일치하는 이름을 지정합니다.

![Image files](/examples/images/screenshots/12.png)

(무료 버전의 Texture Packer를 사용하는 경우, **Algorithm**을 `basix`으로 설정하고 **Trim mode**를 `None`으로 설정하고 **Extrude**를 `0`으로 설정하고 **Size constraints**을 `Any size`로 설정한 다음 **PNG Opt Level**을 왼쪽에서 `0`까지 끝까지 슬라이드 합니다. 이것은 무료 버전의 Texture Packer가 경고 혹은 오류없이 파일을 생성할 수 있게 해주는 기본 설정입니다.)

완료되면 **Publish** 버튼을 클릭하십시오. 파일 이름과 위치를 선택하고 게시된 파일을 저장하십시오. PNG 파일과 JSON 파일의 두 파일로 끝납니다. 이 예제에서 내 파일 이름은 `treasureHunter.json` 및 `treasureHunter.png`입니다. 좀 더 편하게 하려면, 두 파일을 모두 프로젝트의 `image` 폴더에 보관하십시오. (JSON 파일은 이미지 파일의 추가적인 metadata로 생각할 수 있으므로 두 파일을 같은 폴더에 보관하는 것이 좋습니다.) JSON 파일은 tileset 각각의 하위 이미지의 이름, 크기 및 위치를 설명합니다. 여기 blob monster의 하위 이미지를 설명하는 발췌 부분이 있습니다.

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

`treasureHunter.json` 파일에는 각각 유사한 데이터를 가진 "dungeon.png", "door.png", "exit.png" 및 "explorer.png" 속성도 포함되어 있습니다. 이러한 각 하위 이미지를 **frames**라고 합니다. 이 데이터를 가지고 있으면 tilset에 있는 각 하위 이미지의 크기와 위치를 알 필요가 없기 때문에 매우 유용합니다. 알아야 할 것은 sprite의 **frame id** 뿐입니다. Frame id는 "blob.png"또는 "explorer.png"와 같은 원본 이미지 파일의 이름일 뿐입니다.

텍스쳐 atlas를 사용하는 많은 장점 중 하나는 각 이미지 주위에 2 픽셀의 padding을 쉽게 추가 할 수 있다는 것입니다(Texturn Packer는 기본적으로 이 작업을 수행합니다.). 이것은 texture bleed의 가능성을 방지하기 위해 중요합니다. **Texture bleed**는 tileset의 인접한 이미지의 가장자리가 sprite옆에 나타날 때 발생하는 효과입니다. 이것은 컴퓨터의 GPU (Graphics Processing Unit)가 분수 픽셀 값을 반올림하는 방법을 결정하는 방식 때문에 발생합니다. 그것들을 반올림 해야할까요? 이것은 각 GPU 마다 다를 것입니다. tileset의 이미지 주위에 1 또는 2 픽셀의 간격을 두면 모든 이미지가 일관되게 표시됩니다.

(참고 : 그래픽 주위에 두 개의 픽셀 padding이 있고 Pixi가 표시하는 방식으로 이상한 "off by one pixel" 결함이 계속 표시되는 경우, 텍스처의 scale mode 알고리즘을 변경해보십시오. 방법은 다음과 같습니다 : `texture.baseTexture. scaleMode = PIXI.SCALE_MODES.NEAREST;` 이러한 결함은 GPU 부동 소수점 올림 오류로 인해 때때로 발생할 수 있습니다.)

이제 텍스처 atlas를 만드는 방법을 알았으므로, 게임 코드에 텍스처를 로드하는 방법을 알아보겠습니다.

<a id='loading-atlas'>
텍스처 atlas 올리기
-----------------
텍스처 atlas를 Pixi로 가져 오려면 Pixi의 `loader`를 사용하여 로드하십시오. JSON 파일이 Texture Packer로 만들어진 경우, `loader`는 데이터를 해석하고 tileset의 각 프레임에서 텍스처를 자동으로 생성합니다. 다음은 `loader`를 사용하여 `treasureHunter.json` 파일을 로드하는 방법입니다. 로드가 완료되면 `setup` 기능이 실행됩니다.

```js

loader
  .add("images/treasureHunter.json")
.load(setup);

```

tileset의 각 이미지는 현재 Pixi의 비밀공간에 있는 개별 텍스처입니다. Texture Packer ( "blob.png", "dungeon.png", "explorer.png"등)와 동일한 이름으로 비밀 공간의 각 텍스처에 액세스 할 수 있습니다.

<a id='creating-sprites-from-a-loaded-texture-atlas'>
올려진 텍스처 atlas 로부터 sprites 만들기
-------------------------------------
Pixi는 텍스처 atlas에서 sprites를 만드는 세 가지 일반적인 방법을 제공합니다.
1. `TextureCache` 사용 :
```js
let texture = TextureCache["frameId.png"],
    sprite = new Sprite(texture);
```
2. Pixi `loader`를 사용하여 텍스처 atlas를 로드 한 경우 loader의 `resources`를 사용하십시오 :
```js
let sprite = new Sprite(
  resources["images/treasureHunter.json"].textures["frameId.png"]
);
```

3. 그렇게하면 sprites를 만들기에는 너무 많은 타이핑이 필요합니다! 그래서 저는 다음과 같이 텍스쳐의 altas의 textures 객체를 가리키는 id라는 별칭을 만들 것을 제안합니다 :
```js
let id = PIXI.loader.resources["images/treasureHunter.json"].textures;
```
그러면 다음과 같이 각각의 새로운 sprites를 만들 수 있습니다.
```js
let sprite = new Sprite(id["frameId.png"]);
```

훨씬 !

`dungeon`, `explorer` 및 `treasure` sprites를 만들고 표시하기 위해 setup 기능에서 이 세 가지 다른 sprites 생성 기술을 사용하는 방법은 다음과 같습니다.
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

  //2. Access the texture using through the loader's `resources`:
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

이 코드는 다음과 같습니다.

![Explorer, dungeon and treasure](/examples/images/screenshots/13.png)
 
stage 크기는 512 x 512 픽셀이며 위 코드에서 `app.stage.height` 및 `app.stage.width` 속성을 사용하여 sprites를 정렬하는 방법을 볼 수 있습니다. `explorer`의 `y` 위치가 세로로 가운데에 배치되는 방법은 다음과 같습니다.

```js
explorer.y = app.stage.height / 2 - explorer.height / 2;
```

텍스처 atlas를 사용하여 sprites를 생성하고 표시하는 것은 중요한 벤치 마크입니다. 따라서 계속하기 전에 남아있는 sprites를 추가하기 위해 작성할 수 있는 코드 인 `blob`과 `exit` 문을 살펴보고 다음과 같은 장면을 생성 할 수 있습니다.

![All the texture atlas sprites](/examples/images/screenshots/14.png)
 
이 모든 것을 수행하는 전체 코드가 있습니다. 저는 또한 모든 코드를 적절한 맥락에서 볼 수 있도록 HTML 코드를 포함시켰습니다. (이 작업 코드는 이 저장소의 `examples/ spriteFromTextureAtlas.html` 파일에서 찾을 수 있습니다.) `blob` sprites가 생성되어 루프로 스테이지에 추가되고 임의의 위치가 지정된다는 점에 유의하세요.
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

위의 코드에서 볼 수 있듯이 모든 blob은 `for` 루프를 사용하여 만듭니다. 각 `blob`은 다음과 같이 `x` 축을 따라 균등하게 배치됩니다 :

```js
let x = spacing * i + xOffset;
blob.x = x;
```

`spacing` 값은 48이고 `xOffset` 값은 150입니다. 첫 번째 `blob`의 `x` 위치는 150입니다. 이 값은 stage의 왼쪽에서 150 픽셀만큼 간격을 띄워줍니다. 각 후속 `blob`은 루프의 이전의 반복에서 생성 된 `blob`보다 48 픽셀 큰 `x` 값을 가집니다. 이것은 지하 감옥 바닥을 따라 왼쪽에서 오른쪽으로 똑같이 간격을 둔 blob 몬스터 라인을 만듭니다.

각 `blob`에는 임의의 `y` 위치가 주어집니다. 이 작업을 수행하는 코드는 다음과 같습니다:

```js
let y = randomInt(0, stage.height - blob.height);
blob.y = y;
```

`blob`의 `y` 위치에는 0과 512 사이의 임의의 난수를 할당 할 수 있습니다. 이 난수는 `stage.height`의 값입니다. 이 함수는 `randomInt`라는 사용자 정의 함수를 사용하여 작동합니다. `randomInt`는 임의의 두 숫자 사이의 범위에 있는 임의의 숫자를 반환합니다.

```js
randomInt(lowestNumber, highestNumber)
```

즉, 1과 10 사이의 임의의 숫자를 원하면 다음과 같은 값을 얻을 수 있습니다:

```js
let randomNumber = randomInt(1, 10);
```

다음은 이 모든 작업을 수행하는 `randomInt` 함수 정의입니다.

```js
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
```

`randomInt`는 게임을 만들기 위한 뒷 주머니에 보관할 수 있는 아주 작은 기능입니다. 저는 이것을 항상 사용합니다.

<a id='moving-sprites'>
sprites 움직이기
---------------

이제 sprites를 표시하는 방법을 알았지만 sprites를 어떻게 움직이게 할까요? 간단합니다 : Pixi 's `ticker`를 사용하여 looping 기능 만들기. 이것은 **game loop**라고 합니다. 게임 루프 안에 넣은 코드는 초당 60 회 업데이트됩니다. 다음은 'cat' sprites가 프레임 당 1 픽셀의 비율로 오른쪽으로 이동하도록 작성하는 코드입니다.

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

이 코드를 실행하면 sprites가 점차 stage의 오른쪽으로 이동하는 것을 볼 수 있습니다.

![Moving sprites](/examples/images/screenshots/15.png)
 
그것은 gameLoop이 실행될 때마다 고양이의 x 위치에 1을 더하기 때문입니다.

```
cat.x += 1;
```

Pixi의 `ticker`에 추가하는 함수는 초당 60 회 호출됩니다. 함수에 `delta` 인수가 있음을 알 수 있습니다 - 그게 뭘까요?

`delta` 값은 프레임 간에 부분적으로 지연되는 양을 나타냅니다. 고양이의 애니메이션을 프레임 속도와 독립적으로 만들기 위해 고양이의 위치에 선택적으로 추가 할 수 있습니다. 방법은 다음과 같습니다 :

```js
cat.x += 1 + delta;
```

이 `delta` 값을 추가할지 여부는 주로 미학적인 선택입니다. 그리고 이 효과는 애니메이션이 초당 60 프레임의 일관된 디스플레이 속도 (예 : 느린 장치에서 실행되는 경우)를 따라잡으려고 고군분투 하고 있을 경우에만 눈에 띄게 됩니다. 이 튜토리얼의 나머지 예제는 이 `delta` 값을 사용하지 않지만 원하는 경우 자유롭게 사용할 수 있습니다.

Pixi의 ticker를 사용하여 게임 루프를 만들 필요가 없습니다. 원하는 경우 `requestAnimationFrame`을 다음과 같이 사용하십시오 :

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

당신이 선호하는 스타일은 전적으로 당신에게 달려 있습니다.

그리고 그게 전부입니다! 루프 내에서 작은 sprites 속성을 조금씩 변경하면 시간이 지남에 따라 애니메이션이 적용됩니다. sprites를 반대 방향 (왼쪽)으로 애니메이트하려면 `-1`과 같이 음수 값을 지정하십시오.

이 코드는 `movingSprites.html` 파일에서 찾을 수 있습니다. 여기에 전체 코드가 있습니다 :

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

(`cat` 변수는 `setup` 및 `gameLoop` 함수 외부에서 정의 되어야만 양쪽 모두에서 액세스 할 수 있습니다.)

sprites의 크기, 회전 또는 크기를 애니메이션화 할 수 있습니다. 무엇이든간에 sprites를 미리 애니메이션화 하는 방법에 대한 더 많은 예제를 찾아 볼 수 있습니다.

<a id='velocity'></a>
속도의 속성 사용하기
-----------------

유연성을 높이려면 `vx`와 `vy`라는 두 가지 **velocity properties**을 사용하여 sprites의 이동 속도를 제어하는 것이 좋습니다: `vx`는 sprites의 속도와 방향을 x 축 (수평 방향)으로 설정하는데 사용됩니다. `vy`는 sprites의 속도와 방향을 y 축 (수직)으로 설정하는 데 사용됩니다. sprites의 `x`와 `y` 값을 직접 변경하는 대신 먼저 속도 변수를 업데이트 한 다음 해당 속도 값을 sprites에 할당하십시오. 이것은 인터랙티브 게임 애니메이션에 필요한 모듈성의 추가 비트입니다.

첫 번째 단계는 sprites에 `vx` 및 `vy` 속성을 만들고 초기 값을 지정하는 것입니다.

```js
cat.vx = 0;
cat.vy = 0;
```

`vx`와 `vy`를 0으로 설정하면 sprites가 움직이지 않는다는 의미입니다.

그런 다음 게임 루프에서 `vx`와 `vy`를 sprites가 이동할 속도로 업데이트하십시오. 그런 다음 해당 값을 sprites의 `x` 및 `y` 속성에 할당합니다. 다음은 이 기술을 사용하여 각 프레임마다 한 픽셀 씩 고양이 sprites를 오른쪽 아래로 움직이는 방법입니다:

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

이 코드를 실행하면 고양이가 프레임 당 한 픽셀씩 오른쪽 아래로 이동합니다:

![Moving sprites](/examples/images/screenshots/16.png)

고양이를 다른 방향으로 움직이게 하려면 어떨까요? 고양이를 왼쪽으로 이동하려면 `vx` 값을 `-1`로 지정하십시오. 그것을 위로 움직이려면 고양이에게 `-1`의 값을 부여하십시오. 고양이가 더 빠르게 움직이게 하려면 `3`, `5`, `-2` 또는 `-4`와 같이 더 큰 `vx` 및 `vy` 값을 지정하십시오.

`vx` 및 `vy` 속도 속성을 사용하여 sprites의 속도를 모듈화하는 방법을 통해 게임의 키보드 및 마우스 포인터 제어 시스템을 비롯하여 물리를 보다 쉽게 구현할 수 있습니다.

<a id='game-states'></a>
게임 상태
--------

스타일에 따라, 그리고 당신의 코드를 모듈화하는 데 도움이 되도록 다음과 같이 게임 루프를 구조화하는 것이 좋습니다 :

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

`gameLoop`이 `state`라는 함수를 초당 60 회 호출하고 있음을 알 수 있습니다. `state`함수란 무엇입니까? 이것은 `play`에 배치 되어있습니다. 즉, `play`함수의 모든 코드도 초당 60 회 실행됩니다.

다음은 이전 예제의 코드를 이 새 모델에 다시 적용하는 방법입니다 :

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

그래, 저도 알아요, 이것은 약간 [head-swirler](http://www.amazon.com/Electric-Psychedelic-Sitar-Headswirlers-1-5/dp/B004HZ14VS)이다! 그러나 두려워하지 말고 그 기능들이 어떻게 연결되어 있는지 1, 2 분간 마음 속으로 생각해보세요. 앞서 살펴 보았듯이 게임 루프를 이렇게 구성하면 게임 장면과 레벨을 전환하는 것과 같은 일을 훨씬 더 쉽게 수행 할 수 있습니다.

<a id='keyboard'></a>
키보드 움직임
-----------

조금 더 작업을 하면 키보드를 사용하여 sprite를 제어하는 간단한 시스템을 구축할 수 있습니다. 코드를 단순화하기 위해 키보드 타이핑을 청취하고 캡처하는 `keyboard`라는 사용자 지정 함수를 사용하는 것이 좋습니다.

```js
function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
      event.preventDefault();
    }
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
      event.preventDefault();
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);
  
  window.addEventListener(
    "keydown", downListener, false
  );
  window.addEventListener(
    "keyup", upListener, false
  );
  
  // Detach event listeners
  key.unsubscribe = () => {
    window.removeEventListener("keydown", downListener);
    window.removeEventListener("keyup", upListener);
  };
  
  return key;
}
```

keyboard 기능은 사용하기 쉽습니다. 다음과 같이 새 키보드 객체를 만듭니다.

```js
let keyObject = keyboard(keyValue);
```

하나의 인수는 당신이 필요해 하는 핵심적인 가치입니다. 다음은 [key 목록입니다.](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values).

그런 다음 키보드 객체에 다음과 같이 `press` 및 `release` 메서드를 할당합니다.

```js
keyObject.press = () => {
  //key object pressed
};
keyObject.release = () => {
  //key object released
};
```

키보드 객체에는 각 키의 상태를 확인하는 데 사용할 수 있는 `isDown` 및 `isUp` Boolean 속성도 있습니다.

`unsubscribe` 메서드를 사용하여 event listener를 제거하는 것을 잊지 마세요.

```js
keyObject.unsubscribe();
```

키보드의 화살표 키를 사용하여 어떻게 이 `keyboard` 기능을 사용하는지에 대한 sprite 제어 방법을 보려면 `examples` 폴더의 `keyboardMovement.html` 파일을 살펴보십시오. 그것을 실행하고 왼쪽, 위, 아래 및 오른쪽 화살표 키를 사용하여 무대 주변 고양이를 이동하십시오.

![Keyboard movement](/examples/images/screenshots/17.png)

다음은 이 모든 작업을 수행하는 코드입니다.

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
  let left = keyboard("ArrowLeft"),
      up = keyboard("ArrowUp"),
      right = keyboard("ArrowRight"),
      down = keyboard("ArrowDown");

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
Sprites 그룹화하기
-----------------

그룹화를 하면 게임 장면을 생성하고 유사한 Sprites를 단일 단위로 관리할 수 있습니다. Pixi는 이것을 할 수 있게 해주는 `Container` 라는 객체를 가지고 있습니다. 이것이 어떻게 작동하는지 알아봅시다.

고양이, 고슴도치, 호랑이의 세 가지 Sprites를 보여주고 싶다고 상상해 보세요. 그것들을 만들고, 그들의 위치를 정하세요 - *그러나 그것들을 Stage에 추가하지 마세요*.

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

다음으로, 동물 Container를 만들어 그들을 모두 다음과 같이 묶으세요:

```js

let animals = new PIXI.Container();

```

그런 다음 'addChild'를 사용하여 *그룹에 Sprites를 추가하세요*.

```js

animals.addChild(cat);
animals.addChild(hedgehog);
animals.addChild(tiger);

```

마지막으로 그룹을 stage에 추가하세요.

```js

app.stage.addChild(animals);

```

(아시는 바와 같이 `stage` 객체도 `container`입니다. 모든 픽시 Sprites의 root Container 입니다.)

이 코드로 인해 얻을 수 있는 것은 다음과 같습니다. 

![Grouping sprites](/examples/images/screenshots/18.png)
 
그 그림에서 볼 수 없는 것은 sprites를 포함하고 있는 보이지 않는 `animals` 그룹입니다.

![Grouping sprites](/examples/images/screenshots/19.png)
 
당신은 이제 `animals` 그룹을 단일 단위로 취급할 수 있습니다. `Container`는 텍스쳐가 없는 특별한 종류의 sprites로 생각할 수 있습니다.

`animals`가 포함하고 있는 모든 child Sprites 목록이 필요한 경우, `children` 배열을 사용하여 확인하세요.

```
console.log(animals.children)
//Displays: Array [Object, Object, Object]
```

이것은 `animals`가 children배열에서 3개의 sprites를 가지고 있다는 것을 말해줍니다.

animals 그룹은 다른 sprites와 똑같기 때문에 `x`와 `y` 값, `alpha`, `scale` 및 다른 모든 sprites 특성을 변경할 수 있습니다. 상위 Container에서 변경하는 속성 값은 상대적인 방식으로 하위 sprites에 영향을 미칩니다. 따라서 그룹의 `x`와 `y` 위치를 설정하면 모든 하위 sprites가 그룹의 왼쪽 상단 모서리에 비례하여 재배치됩니다. 동물의 `x`와 `y` 위치를 64로 설정하면 어떻게 될까요?

```
animals.position.set(64, 64);
```

전체 sprites 그룹은 오른쪽으로 64픽셀, 아래로 64픽셀 이동합니다.
 
![Grouping sprites](/examples/images/screenshots/20.png)

`animals` 그룹도 나름대로의 크기를 가지고 있는데, 이 크기는 포함된 sprites가 점유하는 면적에 기초하고 있습니다. `width`와 `height` 값은 다음과 같습니다.

```js
console.log(animals.width);
//Displays: 112

console.log(animals.height);
//Displays: 112
```

![Group width and height](/examples/images/screenshots/21.png)
 
그룹의 너비나 높이를 변경하면 어떻게 될까요?
```js
animals.width = 200;
animals.height = 200;
```

모든 child sprites는 그 변화에 맞춰 확장될 것입니다.

![Group width and height](/examples/images/screenshots/22.png)
 
필요한 경우 다른 `Container`에 원하는 만큼의 `Container`를 배치하여 깊은 계층 구조를 만들 수 있습니다. 그러나 `Display Object`(예: `Sprite` 또는 다른 `Container`)는 한 번에 한 상위에만 속할 수 있습니다. sprites를 다른 객체의 자식으로 만들기 위해 `addChild`를 사용하면 픽시는 현재 부모에서 sprites를 자동으로 제거합니다. 그것은 당신이 걱정할 필요가 없는 유용한 관리사항입니다.

### 지역적 및 전반적 위치

`Container`에 sprites를 추가할 때, `Container`의 `x`와 `y`위치는 *그룹의 왼쪽 상단 모서리에 상대적입니다*. 그게 sprites의 **local position**인데 예를 들면 이 이미지에서는 cat의 위치가 뭐라고 보십니까?

![Grouping sprites](/examples/images/screenshots/20.png)

알아봅시다:

```
console.log(cat.x);
//Displays: 16
```

16? 맞아요! Cat이 그룹의 왼쪽 상단 모서리에서 16개 픽셀만 상쇄되기 때문입니다. 16은 cat의 local position입니다.

Sprites는 **global positon**도 가지고 있습니다. Global position은 stage 상단 왼쪽 코너에서 sprites의 anchor point(일반적으로 sprite의 상단 왼쪽 코너)까지의 거리입니다. 당신은 `toGlobal` 메서드를 통해 sprites 의 global positon을 찾을 수 있습니다. 그 방법은 다음과 같습니다:

```
parentSprite.toGlobal(childSprite.position)
```

이것은 여러분이 다음과 같은 `animals` 그룹 안에서 cat의 global position을 찾을 수 있다는 것을 의미합니다.

```
console.log(animals.toGlobal(cat.position));
//Displays: Object {x: 80, y: 80...};
```

그것은 당신에게 80의 `x`와 `y`의 위치를 줍니다. 그것이 바로 stage 왼쪽 상단 모서리에 상대적인 cat의 global position입니다.

sprites의 global position을 찾으려고 하지만 sprites의 부모 Container가 무엇인지 모른다면? 모든 sprites는 sprites의 부모가 무엇인지 말해줄 `parent`라는 속성을 가지고 있습니다. sprites를 `stage`에 직접 추가하면 `stage`가 sprites의 부모가 됩니다. 위의 예에서 `cat`의 부모는 `animals`입니다. 즉, 다음과 같은 코드를 작성함으로써 cat의 global position을 얻을 수 있다는 것입니다:

```
cat.parent.toGlobal(cat.position);
```

그리고 현재 cat의 부모 container가 무엇인지 모르더라도 효과가 있을 것입니다.

global position을 계산할 수 있는 방법이 하나 더 있습니다! 그리고, 사실 이것이 가장 좋은 방법입니다, 그러니 잘 들으세요! 캔버스의 왼쪽 상단 모서리에서 sprites까지의 거리를 알고 sprites의 부모 Container가 무엇인지 모르거나 상관하지 않으려면 `getGlobalPosition` 방법을 사용하세요. tiger의 global position을 찾기 위해 이것을 사용하는 방법은 다음과 같습니다.

```js
tiger.getGlobalPosition().x
tiger.getGlobalPosition().y
```

이것은 우리가 사용한 예에서 128의 `x`와 `y` 값을 당신에게 줄 것입니다. `getGlobalPosition`의 특별한 점은 매우 정밀하다는 것입니다: 그것은 sprites의 local position이 바뀌는 즉시 당신에게 정확한 global position을 줄 것입니다. 나는 게임의 정확한 충돌 탐지를 위해 특별히 이 기능을 추가해 달라고 픽시 개발 팀에 요청했습니다. (매트를 비롯한 나머지 팀원들 모두 고마워!)

global position을 local position으로 전환하려면 어떻게 하시겠습니까? `toLocal` 방법을 사용할 수 있습니다. 유사한 방식으로 작동하지만 다음과 같은 일반적인 형식을 사용합니다.

```js
sprite.toLocal(sprite.position, anyOtherSprite)
```

sprites와 다른 sprites의 거리를 찾으려면 `toLocal`을 사용하세요. hedgehog에 비례하여 tiger의 local position을 알 수 있는 방법은 다음과 같습니다.

```js
tiger.toLocal(tiger.position, hedgehog).x1
tiger.toLocal(tiger.position, hedgehog).y
```

이것은 당신에게 32의 `x`값과 32의 `y` 값을 줍니다. tiger 왼쪽 위 모서리가 32픽셀 아래로 내려가 hedgehog 왼쪽 위 모서리에 있다는 것을 예시 이미지를 통해 알 수 있습니다.


### ParticleContainer 를 사용하여 sprite 그룹화하기

Pixi는 `ParticleContainer`(`PIXI.particles.particleContainer`)라고 불리는 sprites를 그룹화하는 대안적인, 고성능 방법을 가지고 있습니다. `ParticleContainer` 내부의 sprites는 일반 `Container`에 있을 때보다 2배에서 5배 더 빠르게 만들 것입니다. 그것은 게임을 위한 훌륭한 기능 향상입니다.

다음과 같이 `ParticleContainer` 생성하기:

```js
let superFastSprites = new PIXI.particles.ParticleContainer();
```

그런 다음 일반 `Container`에서와 마찬가지로 `AddChild`를 사용하여 sprites를 추가하세요.

`ParticleContainer`를 사용하기로 결정했다면 타협을 해야 합니다. `ParticleContainer` 내부의 sprites는 `x`, `y`, `width`, `height`, `scale`, `pivot`, `alpha`, `visible` 등 몇 가지 기본 특성만 가지고 있으며, 이 정도밖에 되지 않습니다. 또한, 그 sprites가 가지고 있는 sprites는 그들만의 중첩된 children을 가질 수 없습니다. `ParticleContainer`는 또한 필터와 혼합 모드와 같은 Pixi의 고급 시각 효과를 사용할 수 없습니다. 각 `ParticleContainer`는 하나의 텍스쳐만 사용할 수 있습니다(따라서 다른 모양의 sprites를 원한다면 spritesheet를 사용해야 합니다). 하지만 당신이 얻는 엄청난 성능 향상을 위해, 그러한 타협은 대개 그만한 가치가 있습니다. 그리고 같은 프로젝트에서 `Container`와 `ParticleContainers`를 동시에 사용할 수 있어 최적화를 미세 조정할 수 있습니다.

`Particle Container`내의 sprites는 왜 이렇게 빠를까요? 왜냐하면 sprites의 위치가 GPU에서 직접 계산되고 있기 때문입니다. 픽시 개발팀은 GPU에서 가능한 한 sprites 처리를 오프로드하는 작업을 하고 있기 때문에, 지금 사용하고 있는 픽시의 최신 버전은 제가 여기서 설명한 것보다 훨씬 기능이 풍부한 `ParticleContainer`를 가지고 있을 가능성이 높습니다. 자세한 내용은 현재 ['ParticleContainer 설명서'](http://pixijs.download/release/docs/PIXI.particles.ParticleContainer.html)를 참조하세요.

`ParticleContainer`를 생성하는 경우, `size`, `properties`, `batchSize` 및 `autoResize`의 네 가지 선택적 인수를 제공할 수 있습니다.

```js
let superFastSprites = new ParticleContainer(maxSize, properties, batchSize, autoResize);
```

`maxSize`의 기본값은 1500입니다. 따라서 sprites를 더 포함해야 할 경우 더 높은 숫자로 설정하세요. `properties` 인수는 `scale`, `position`, `rotation`, `uvs` 및 `alphaAndTint` 등 5개의 부울 값을 설정할 수 있는 객체입니다. `position`의 기본값은 `true`이지만 다른 것들은 모두 `false`으로 설정되어 있습니다. 즉, `ParticleContainer`에서 sprites의 rotation, scale, tint 또는 uvs를 변경하려면 다음과 같이 해당 속성을 `true`로 설정해야 합니다:

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

만약 당신이 이러한 속성을 사용하지 않아도 된다고 생각한다면, 그것들의 성능의 최댓값을 좀 더 짜 내기 위해 `false`로 설정해야 합니다.

`uvs`의 속성은 무엇일까요? 텍스처가 움직이는 동안 텍스처를 변경하는 입자가 있는 경우에만 `true`로 설정하십시오. (모든 sprites의 텍스처도 같은 tileset에 있어야 합니다. 이 작업을 위한 tileset 이미지.) 

(참고 : **UV mapping**은 3D 표면에 매핑되는 텍스처 (이미지)의 `x` 및 `y` 좌표를 나타내는 3D 그래픽 디스플레이 용어입니다 .`U`는 `x` 축이고 `V`는 `y` 축입니다 .WebGL은 이미 3D 공간 위치 지정을위한 `x`, `y` 및 `z`이므로 2D 이미지 텍스처의 경우 `x`와 `y`를 나타내기 위해 U와 V를 선택했습니다.

(저는 그 마지막 두 선택적 인자인 `batchSize`와 `autoResize`가 정확히 무엇인지 모르겠습니다. 그래서 누군가가 알고 있다면, 이 이슈에서 우리에게 알려주시기를 바랍니다!)

<a id='graphic'></a>
Pixi의 그래픽 기초
----------------

이미지 텍스처를 사용하는 것은 sprites를 만드는 가장 유용한 방법 중 하나이지만 Pixi는 자체 저수준 드로잉 도구도 가지고 있습니다. 그것들을 사용하여 직사각형, 도형, 선, 복잡한 다각형 및 텍스트를 만들 수 있습니다. 다행스럽게도  [Canvas Drawing API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_graphics_with_canvas)와 거의 동일한 API를 사용하므로 이미 캔버스에 익숙하다면 배워야할 새로운 것은 없습니다. 그러나 큰 장점은 Canvas Drawing API와 달리 Pixi로 그리는 모양이 GPGL에서 WebGL에 의해 렌더링된다는 것입니다. Pixi는 당신이 그 미개발 된 모든 성능 파워에 접근 할 수 있게 합니다. 기본적인 모양을 만드는 방법을 간단히 살펴 보겠습니다. 다음은 앞으로 코드로 만들 모든 모양입니다.

![Graphic primitives](/examples/images/screenshots/23.png)
 
<a id='rectangles'></a>
### 직사각형

모든 모양은 먼저 Pixi의 `Graphics` 클래스(`PIXI.Graphics`)의 새로운 인스턴스를 생성함으로써 만.

```js
let rectangle = new Graphics();
```

`beginFill`을 16 진수 색상 코드 값과 함께 사용하여 사각형의 채우기 색상을 설정합니다. 다음은 '밝은 파란색'으로 설정하는 방법입니다.

```js
rectangle.beginFill(0x66CCFF);
```

도형에 윤곽선을 지정하려면 `lineStyle` 메서드를 사용합니다. 사각형에 4 픽셀 너비의 빨간색 윤곽선을 지정하고 `alpha` 값을 1로 지정하는 방법은 다음과 같습니다.

```js
rectangle.lineStyle(4, 0xFF3300, 1);
```

`drawRect` 메서드를 사용하여 사각형을 그립니다. 네 가지 인수는 `x`, `y`, `width` 및 `height` 입니다.

```js
rectangle.drawRect(x, y, width, height);
```

완료되면 `endFill` 을 사용하십시오.

```js
rectangle.endFill();
```

그것은 Canvas Drawing API와 같습니다! 사각형을 그리고 위치를 변경하고 stage에 추가하는 데 필요한 모든 코드가 있습니다.

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

이 코드는 x와 y 위치가 170 인 빨간색 테두리가 있는 64 x 64 파란색 직사각형을 만듭니다.

<a id='circles'></a>
### 원

drawCircle 메서드로 원을 만듭니다. 세 가지 인수는 `x`, `y` 및 `radius` 입니다.

```js
drawCircle(x, y, radius)
```

직사각형 및 sprites와 달리 원의 x 및 y 위치는 중심점입니다. 반경이 32 픽셀 인 보라색 원을 만드는 방법은 다음과 같습니다.

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
### 타원

캔버스 위의 그리기 API 인 Pixi를 사용하면 `DrawEllipse` 메서드로 타원을 그릴 수 있습니다.

```js
drawEllipse(x, y, width, height);
```

x / y 위치는 타원의 왼쪽 위 모서리를 정의합니다 (타원은 보이지 않는 사각형 경계 상자로 둘러싸여 있습니다. 상자의 왼쪽 위 모서리는 타원의 x / y 앵커 위치를 나타냅니다). 다음은 폭이 50 픽셀이고 높이가 20 픽셀 인 노란색 타원입니다.

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
### 둥근 사각형
Pixi를 사용하면 `drawRoundedRect` 메서드로 둥근 사각형을 만들 수 있습니다. 마지막 인수 인 `cornerRadius`는 픽셀 단위로 모서리를 반올림해야 하는 정도에 따라 결정된다.

```js
drawRoundedRect(x, y, width, height, cornerRadius)
```

다음은 코너 반경이 10 픽셀 인 둥근 직사각형을 만드는 방법입니다.

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
###선

위에서 `lineStyle` 메소드를 사용한 예제를 보았으니 선을 정의하십시오. 캔버스 드로잉 API를 사용하는 것과 같은 방법으로 `moveTo` 및 `lineTo` 메서드를 사용하여 선의 시작점과 끝점을 그릴 수 있습니다. 다음은 4 픽셀 너비의 흰색 대각선을 그리는 방법입니다.

```js
let line = new Graphics();
line.lineStyle(4, 0xFFFFFF, 1);
line.moveTo(0, 0);
line.lineTo(80, 50);
line.x = 32;
line.y = 32;
app.stage.addChild(line);
```

선과 같은 `PIXI.Graphics` 객체는 sprites와 마찬가지로 `x` 및 `y` 값을 가지므로 stage를 그리면 stage의 아무 곳에나 배치 할 수 있습니다.

<a id='polygons'></a>
### 다각형

다각형 메서드를 사용하여 선을 결합하고 색상으로 채워 복잡한 모양을 만들 수 있습니다. `drawPolygon`의 인수는 도형의 각 점의 위치를 정의하는 x / y 점의 경로 배열입니다.

```js
let path = [
  point1X, point1Y,
  point2X, point2Y,
  point3X, point3Y
];

graphicsObject.drawPolygon(path);
```

`drawPolygon`은이 세 점을 결합하여 도형을 만듭니다. `drawPolygon`을 사용하여 선을 파란색 테두리로 연결하는 방법은 다음과 같습니다. 삼각형은 위치 0.0에서 그려지고 `x` 및 `y` 속성을 사용하여 stage에서 해당 위치로 이동합니다.

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
텍스트 표시
-------------

`Text` 개체 (PIXI.Text)를 사용하여 스테이지에 텍스트를 표시합니다. 가장 간단한 형태로 다음과 같이 할 수 있습니다.

```js
let message = new Text("Hello Pixi!");
app.stage.addChild(message);
```

그러면 캔버스에 "Hello, Pixi"라는 단어가 표시됩니다. Pixi의 Text 객체는 `Sprite` 클래스에서 상속되므로 `x`, `y`, `width`, `height`, `alpha` 및 `rotation` 과 같은 모든 속성을 포함합니다. 다른 Sprite처럼 스테이지의 텍스트를 배치하고 크기를 조정하십시오. 예를 들어 `position.set`을 사용하여 다음과 같이 메시지의 `x` 및 `y` 위치를 설정할 수 있습니다.

```js
message.position.set(54, 96);
```

![Displaying text](/examples/images/screenshots/24.png)

이건 당신에게 기본적이고, 스타일이 따로 없는 텍스트를 줄 것입니다. 그러나 더 좋아지기를 원하면 Pixi의 `TextStyle` 함수를 사용하여 사용자 정의 텍스트 스타일을 정의하십시오. 방법은 다음과 같습니다.

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

이렇게 하면 사용하려는 모든 텍스트 스타일을 포함하는 새로운 `style` 객체가 생성됩니다. 사용할 수 있는 모든 스타일 속성의 전체 목록은 [여기](http://pixijs.download/release/docs/PIXI.TextStyle.html)를 참조하십시오.

텍스트에 스타일을 적용하려면 다음과 같이 `style` 객체를 `Text` 함수의 두 번째 인자로 추가하십시오.

```js
let message = new Text("Hello Pixi!", style);
```

![Displaying text](/examples/images/screenshots/24.5.png)

텍스트 객체를 만든 후에 내용을 변경하려면 `text` 속성을 사용합니다.

```js
message.text = "Text changed!";
```

스타일 속성을 다시 정의하려면 `style` 속성을 사용하십시오.

```js
message.style = {fill: "black", font: "16px PetMe64"};
```

Pixi는 Canvas Drawing API를 사용하여 보이지 않는 임시 캔버스 요소에 텍스트를 렌더링하여 텍스트 개체를 만듭니다. 그런 다음 캔버스를 WebGL 텍스처로 변환하여 sprite에 매핑 할 수 있습니다. 그래서 텍스트의 색상을 문자열로 묶어야 합니다. 다음은 Canvas Drawing API 색상 값입니다. 캔버스 색상 값과 마찬가지로 "빨강"또는 "녹색"과 같은 일반적인 색상의 단어를 사용하거나 rgba, hsla 또는 16 진수 값을 사용할 수 있습니다.

Pixi는 또한 긴 줄의 텍스트를 래핑 할 수 있습니다. 텍스트의 `wordWrap` 스타일 속성을 `true`로 설정한 다음 `wordWrapWidth`를 픽셀의 최대 길이 (텍스트 줄이어야 함)로 설정합니다. `align` 속성을 사용하여 여러 줄 텍스트의 맞춤을 설정합니다.

```js
message.style = {wordWrap: true, wordWrapWidth: 100, align: center};
```

(참고 : `align`은 한 줄 텍스트에 영향을 주지 않습니다.)

사용자 정의 글꼴 파일을 사용하려면 CSS `@font-face` 규칙을 사용하여 글꼴 파일을 Pixi 응용 프로그램이 실행되는 HTML 페이지에 연결하십시오.

```js
@font-face {
  font-family: "fontFamilyName";
  src: url("fonts/fontFile.ttf");
}
```

이 `@font-face` 규칙을 HTML 페이지의 CSS 스타일 시트에 추가하십시오.

[Pixi는 또한 비트 맵 글꼴을 지원합니다.](http://pixijs.download/release/docs/PIXI.extras.BitmapText.html) Pixi의 로더를 사용하여 JSON 또는 이미지 파일을 로드하는 것과 같은 방법으로 Bitmap 글꼴 XML 파일을 로드 할 수 있습니다.

<a id='collision'></a>
### 충돌감지

수 많은 다양성의 그래픽 객체를 만드는 방법을 알았지만, 어떻게 사용할 수 있습니까? 재미있는 일은 간단한 **collision detection** 시스템을 구축하는 것입니다. `hitTestRectangle`이라는 사용자 정의 함수를 사용하여 두 개의 직사각형 Pixi sprite가 접촉하는지 여부를 검사할 수 있습니다.

```js
hitTestRectangle(spriteOne, spriteTwo)
```

중복되면 `hitTestRectangle`이 `true`를 반환합니다. `if`문과 함께 `hitTestRectangle`을 사용하여 다음과 같이 두 가지 sprite 간의 충돌을 확인할 수 있습니다.

```js
if (hitTestRectangle(cat, box)) {
  //There's a collision
} else {
  //There's no collision
}
```

보시다시피, `hitTestRectangle`은 방대한 게임 디자인 세계의 시작입니다.

`hitTestRectangle`을 사용하는 방법에 대한 예제를 보려면 `examples` 폴더에서 `collisionDetection.html` 파일을 실행하십시오. 화살표 키를 사용하여 고양이를 이동하십시오. 고양이가 박스를 친다면, 상자가 빨간색이 되고 "Hit!" 텍스트 개체에 의해 표시됩니다.

![Displaying text](/examples/images/screenshots/25.png)

이미 모든 요소를 만드는 모든 코드와 고양이를 움직이는 키보드 컨트롤 시스템을 보았습니다. 유일하게 새로운 점은 `hitTestRectangle`이 충돌을 확인하기 위해 `play` 함수 내에서 사용되는 방법입니다.

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

`play` 함수는 초당 60회 게임 루프에 의해 호출되기 때문에 이 if문은 고양이와 상자 사이의 충돌을 지속적으로 확인합니다. `hitTestRectangle`이 `true`이면 텍스트 `message` 객체는 `text`를 사용하여 "Hit"를 표시합니다.

```js
message.text = "Hit!";
```

상자의 `tint` 속성을 16 진수 빨간색 값으로 설정하여 상자의 색이 녹색에서 빨간색으로 변경됩니다.

```js
box.tint = 0xff3300;
```

충돌이 없으면 메시지와 상자는 원래 상태로 유지됩니다.

```js
message.text = "No collision...";
box.tint = 0xccff99;
```

이 코드는 매우 간단하지만 갑작스럽게 완전히 살아있는 대화식 세계를 만들었습니다. 이것은 거의 마술과 같습니다! 그리고 놀랍게도 Pixi로 게임을 시작하는 데 필요한 모든 기술을 갖추었습니다.

<a id='hittest'></a>
### hitTestRectangle 함수

그러나 `hitTestRectangle` 함수는 어떻습니까? 그것은 무엇을 하고 어떻게 작동합니까? 이 작업과 같은 충돌 감지 알고리즘의 세부 사항은 이 자습서의 범위를 벗어납니다. (정말로 알고 싶다면, [이 책](https://www.apress.com/us/book/9781430258001)의 내용을 찾아보십시오.) 가장 중요한 점은 사용 방법을 알고 있다는 것입니다. 그러나 참조 용으로, 그리고 궁금한 점이 있는 경우, 여기에 완전한 `hitTestRectangle` 함수 정의가 있습니다. 코멘트에서 무엇을 하고 있는지 알아낼 수 있?

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

    //A collision might be occurring. Check for a collision on the y axis
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

사례 연구 : Treasure Hunter
---------------

지금까지 당신이 지금 게임을 만들기 시작할 때 필요한 모든 기술을 가지고 있다고 말했습니다. 날 못 믿겠다면, 증명해 보이겠습니다! **Treasure Hunter**라는 간단한 객체 모음과 피하기 게임을 만드는 방법을 자세히 살펴보겠습니다. (`examples` 폴더에서 찾을 수 있습니다.)

![Treasure Hunter](/examples/images/screenshots/26.png)

Treasure Hunter는 지금까지 배운 도구를 사용하여 만들 수 있는 가장 간단한 완벽한 게임 중 하나의 좋은 예입니다. 탐색기가 보물을 찾아 출구로 나갈 수 있도록 키보드 화살표 키를 사용하세요. 6 개의 얼룩 몬스터가 지하 감옥 벽 사이를 오르락 내리락하며, 탐험가를 친다면 반투명 상태가 되고 오른쪽 상단의 체력이 줄어든다. 모든 체력이 모두 소모되면 "You Lost!"가 화면에 표시됩니다. 탐색기가 보물이 있는 출구에 도달하면 "You Won!"이 표시됩니다. Treasure Hunter는 기본 프로토 타입이지만 텍스처 맵 그래픽, 상호 작용, 충돌 및 여러 게임 장면과 같은 훨씬 더 큰 게임에서 찾을 수 있는 대부분의 요소를 포함합니다. 게임을 어떻게 조립했는지를 둘러보고 자신의 게임 중 하나의 출발점으로 사용할 수 있도록 알아보겠습니다.


### 코드 구조

`treasureHunter.html` 파일을 열면 모든 게임 코드가 하나의 큰 파일에 있음을 알 수 있습니다. 다음은 모든 코드가 어떻게 구성되어 있는지에 대한 전반적인 내용입니다.

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

게임의 세계지도를 사용하여 각 섹션의 작동 방식을 살펴보십시오.

<a id='initialize'></a>
### setup 기능에서 게임 초기화

텍스처 아트 레이 이미지가 로드되면 `setup` 기능이 실행됩니다. 한 번만 실행되며 게임에 대한 일회성 설정 작업을 수행할 수 있습니다. 객체, 스프라이트, 게임 장면을 만들고 초기화하고, 데이터 배열을 채우거나, 로드된 JSON 게임 데이터를 해석할 수 있는 좋은 장소입니다.

Treasure Hunter의 `setup` 기능과 수행하는 작업을 간략하게 살펴보았습니다.

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

코드의 마지막 두 줄인 `state = play;` 아마도 `gameLoop()` 이 가장 중요할 것입니다. `gameLoop`을 Pixi의 ticker switch에 추가하면 게임 엔진에서 전환되고 `play` 함수가 연속 루프에서 호출되도록 합니다. 그러나 이것이 작동하는 방법을 살펴보기 전에 `setup` 함수 내부의 특정 코드가 무엇인지 살펴보겠습니다.

<a id='gamescene'></a>
#### 게임 장면 만들기

`setup` 함수는 `gameScene` 및 `gameOverScene`이라는 두 개의 `Container` 그룹을 만듭니다. 이들 각각은 stage에 추가됩니다.

```js
gameScene = new Container();
app.stage.addChild(gameScene);

gameOverScene = new Container();
app.stage.addChild(gameOverScene);
```

메인 게임의 일부인 모든 sprites가 `gameScene` 그룹에 추가됩니다. 게임이 끝날 때 표시해야 하는 텍스트 위에 있는 게임은 `gameOverScene` 그룹에 추가됩니다.

![Displaying text](/examples/images/screenshots/27.png)

`setup` 함수에서 생성되었지만 게임이 처음 시작될 때 `gameOverScene`이 보이지 않아야 하므로 `visible` 속성이 `false`로 초기화됩니다.

```js
gameOverScene.visible = false;
```

게임이 끝나면 `gameOverScene`의 `visible` 속성이 `true`로 설정되어 게임이 끝날 때 나타나는 텍스트를 표시합니다.

<a id='makingdungon'></a>
#### 지하 감옥, 문, 탐험가 및 보물 만들기

플레이어, 출구 문, 보물 상자 및 지하 감옥 배경 이미지는 모두 텍스처 아트 프레임으로 만들어진 sprites입니다. 매우 중요하게, 그들은 모두 `gameScene`의 자식으로 추가됩니다.

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

`gameScene` 그룹에 함께 모아두면 게임이 끝났을 때 `gameScene`을 숨기고 `gameOverScene`을 쉽게 표시할 수 있습니다.

<a id='makingblob'></a>
#### 얼룩덜룩한 괴물 만들기

6 개의 얼룩 몬스터가 반복적으로 만들어집니다. 각 얼룩에는 임의의 초기 위치와 속도가 부여됩니다. 수직 속도는 각 얼룩에 대해 `1` 또는 `-1`로 교대로 곱해지며, 그 결과 각 괴물은 그 반대 방향으로 움직입니다. 생성된 각 얼룩 몬스터는 `blobs` 라는 배열로 푸시됩니다.

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
####HP표시 바 만들기

Treasure Hunter를 사용하면 탐색기가 적들 중 하나에 닿았을 때, 화면 오른쪽 상단에 있는 HP 바가 줄어 듭니다. 이 HP 바는 어떻게 만들어질까요? 정확히 같은 위치에 겹치는 두 개의 직사각형입니다. 뒤에 검은 색 사각형이 있고 앞쪽에 빨간색 직사각형이 있습니다. 그것들은 하나의 healthBar 그룹으로 함께 그룹화됩니다. `healthBar`가 `gameScene`에 추가되고 무대에 배치됩니다.

```js
//Create the health bar
healthBar = new PIXI.Container();
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

`outer`라는 속성이 `healthBar`에 추가된 것을 볼 수 있습니다. `outerBar` (빨간색 직사각형)를 참조하기만 하면 나중에 액세스하는 것이 편리합니다.

```js
healthBar.outer = outerBar;
```

당신은 이것을 할 필요는 없지만, 못할 건 없습니다! 즉 빨간색 `outerBar`의 너비를 제어하려면 다음과 같은 코드를 어려움 없이 작성할 수 있습니다.

```js
healthBar.outer.width = 30;
```

꽤 깔끔하고 읽기 쉽기 때문에 우리는 이대로 할 겁니다!

<a id='message'></a>
#### 메시지 텍스트 만들기

게임이 끝나면 게임의 결과에 따라 "You won!" 또는 "You lost!" 라는 텍스트가 표시됩니다. 텍스트 sprite를 사용하여 이를 `gameOverScene`에 추가합니다. 게임이 시작될 때 `gameOverScene`의 `visible` 속성이 `false`로 설정되기 때문에 이 텍스트를 볼 수 없습니다. 다음은 메시지 텍스트를 생성하고 `gameOverScene`에 추가하는 `setup` 함수의 코드입니다.

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
### 게임하기

sprites 이동을 만드는 모든 게임 논리와 코드는 연속 루프에서 실행되는 `play` 함수 내에서 발생합니다. 다음은 `play` 기능의 개요입니다.

```js
function play(delta) {
  //Move the explorer and contain it inside the dungeon
  //Move the blob monsters
  //Check for a collision between the blobs and the explorer
  //Check for a collision between the explorer and the treasure
  //Check for a collision between the treasure and the door
  //Decide whether the game has been won or lost
  //Change the game `state` to `end` when the game is finished
}
```

이 모든 기능이 어떻게 작동하는지 알아보겠습니다.

<a id='movingexplorer'></a>
### 캐릭터 이동

캐틱터는 키보드를 사용하여 제어되며 이를 수행하는 코드는 이전에 학습한 키보드 제어 코드와 매우 유사합니다. `keyboard` 개체는 탐색기의 속도를 수정하며 해당 속도는 `play` 기능 내의 탐색기 위치에 추가됩니다.

```js
explorer.x += explorer.vx;
explorer.y += explorer.vy;
```

<a id='containingmovement'></a>
#### 움직임 포함

그러나 새로운 점은 캐릭터의 움직임이 지하 감옥의 벽 안에 포함되어 있다는 것입니다. 녹색 윤곽선은  동작의 한계를 보여줍니다.

![Displaying text](/examples/images/screenshots/28.png)

그것은 `contain`이라는 커스텀 함수의 도움으로 끝납니다.

```js
contain(explorer, {x: 28, y: 10, width: 488, height: 480});
```

`contain`은 두 개의 인수를 취합니다. 첫 번째는 유지하고자 하는 sprite입니다. 두 번째는 사각형 영역을 정의하는 `x`, `y`, `width` 및 `height` 속성이 있는 객체입니다. 이 예제에서, 포함하는 객체는 스테이지에서 약간 오프셋 되어 있고 스테이지보다 작은 영역을 정의합니다. 던전 벽의 크기와 일치합니다.

다음은 이 모든 작업을 수행하는 `contain` 함수입니다. 이 함수는 sprite가 포함된 객체의 경계를 넘었는지 확인합니다. 코드가 있으면 sprite가 해당 경계로 다시 이동합니다. `contain` 함수는 sprite가 경계선의 어느 쪽에 닿았는지에 따라 "top", "right", "bottom"또는 "left"값을 가진 `collision` 변수를 반환합니다. (sprite가 경계선에 닿지 않으면 `collision`은 `undefined` 됩니다.)

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

`collision` 반환 값이 코드에서 어떻게 사용되어 위쪽 및 아래쪽 던전 벽 사이에서 얼룩덜룩 한 몬스터가 앞뒤로 튀어 오르게 하는지 볼 수 있습니다.

<a id='movingmonsters'></a>
### 괴물 이동하기

`play` 기능은 또한 얼룩 괴물을 움직이고, 던전 벽 안에 포함시키고, 플레이어와의 충돌을 확인합니다. 괴물이 던전의 상단 또는 하단 벽에 충돌하면 방향이 바뀝니다. 이 모든 작업은 `forEach` 루프를 사용하여 수행됩니다. 각 루프의 `blob` 배열에 있는 각 `blobs` sprites를 반복합니다.

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

위의 코드에서 `contain` 함수의 반환 값을 사용하여 괴물이 벽에서 튀어나오게 하는 방법을 볼 수 있습니다. `blobHitsWall`이라는 변수는 반환 값을 캡처하는 데 사용됩니다.

```js
let blobHitsWall = contain(blob, {x: 28, y: 10, width: 488, height: 480});
```

`blobHitsWall`은 일반적으로 `undefined` 됩니다. 그러나 괴물이 꼭대기 벽에 닿으면, `blobHitsWall`의 값은 "top"이 됩니다. 괴물이 바닥 벽에 닿으면 `blobHitsWall`의 값은 "bottom"이 됩니다. 이러한 경우 중 하나라도 `true`이면, 속도를 반대로 하여 방향을 바꿀 수 있습니다. 이 작업을 수행하는 코드는 다음과 같습니다

```js
if (blobHitsWall === "top" || blobHitsWall === "bottom") {
  blob.vy *= -1;
}
```

blob의 `vy` (수직 속도) 값에 `-1`을 곱하면 이동 방향이 바뀝니다.

<a id='checkingcollisions'></a>
### 충돌 확인

위 루프의 코드는 `hitTestRectangle`을 사용하여 적군이 탐색기를 건드렸는지 파악합니다.

```js
if(hitTestRectangle(explorer, blob)) {
  explorerHit = true;
}
```

`hitTestRectangle`이 `true`를 반환하면, 충돌이 있었고 `explorerHit`라는 변수가 `true`로 설정되었음을 의미합니다. `explorerHit`이 `true` 인 경우 `play` 기능은 탐색기를 반투명 상태로 만들고 `health` 바의 너비를 1 픽셀씩 줄입니다.

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

`explorerHit`가 `false`의 경우, 탐색기의 `alpha` property는 1로 유지되어 완전하게 불투명하게 됩니다.

`play` 기능은 또한 보물 상자와 탐색기 사이의 충돌을 검사합니다. 상대한테 맞았다면,  `treasure`은 약간의 offset과 함께 탐색기의 위치로 설정됩니다. 캐릭터가 보물을 운반하는 것처럼 보입니다.

![Displaying text](/examples/images/screenshots/29.png)

이 작업을 수행하는 코드는 다음과 같습니다.

```js
if (hitTestRectangle(explorer, treasure)) {
  treasure.x = explorer.x + 8;
  treasure.y = explorer.y + 8;
}
```

### 출구 문에 도달하면 게임을 종료하기.

게임을 끝낼 수 있는 두 가지 방법이 있습니다 : 보물을 출구로 나르면 이길 수 있고, HP가 떨어지면 지게 됩니다.

게임에서 이기려면 보물 상자가 출구 문에 닿아야 합니다. 이 경우 게임 `state`가 `end`가 되면, `message` 텍스트에 "You won"이 표시됩니다.

```js
if (hitTestRectangle(treasure, door)) {
  state = end;
  message.text = "You won!";
}
```

HP 상태가 떨어지면 게임을 지게 됩니다. 게임 `state`도 `end` 되고, `message` 텍스트에 "You Lost!"라고 표시됩니다.

```js
if (healthBar.outer.width < 0) {
  state = end;
  message.text = "You lost!";
}
```

그러나 이것은 무엇을 의미할까요?

```js
state = end;
```

이전 예제에서 `gameLoop`는 초당 60 회 `state`라는 함수를 지속적으로 업데이트한다는 것을 기억할 것입니다. `gameLoop`가 수행하는 게임은 다음과 같습니다.

```js
function gameLoop(delta){

  //Update the current game state:
  state(delta);
}
```

또한 우리는 처음에 `state`의 값을 `play`로 설정한다는 것을 기억할 것입니다. 이것이 바로 `play` 함수가 루프에서 실행되는 이유입니다. `state`를 `end`로 설정함으로써 우리는 코드가 루프로 실행되는 `end`라는 다른 함수를 원한다고 말하고 있습니다. 더 큰 게임에서는 `tileScene` 상태를 가질 수 있으며, `leveOne`, `levelTwo` 및 `levelThree`와 같은 각 게임 레벨의 상태를 나타낼 수 있습니다.

그렇다면 그 end 기능은 무엇입니까? 바로 여기 있습니다!

```js
function end() {
  gameScene.visible = false;
  gameOverScene.visible = true;
}
```

게임 장면의 가시성을 뒤집을 뿐입니다. 이것은 `gameScene`을 숨기고 게임이 끝나면, `gameOverScene`을 표시합니다.
이것은 게임의 상태를 전환하는 방법에 대한 아주 간단한 예이지만 게임에서 원하는만큼의 게임 상태를 유지하고 필요한만큼의 코드로 채울 수 있습니다. 그냥 루프에서 실행하려는 함수의 `state` 값을 변경하십시오.
그리고 그것은 Treasure Hunter의 모든 것입니다! 조금 더 많은 작업을 하면 이 간단한 프로토 타입을 완전한 게임으로 바꿀 수 있습니다. 시도해보십시오!

<a id='spriteproperties'></a>
Sprites에 대한 추가 정보
---------------

지금까지 sprite의 위치와 모양을 많이 제어할 수 있는 `x`, `y`, `visible`, `rotation`과 같은 sprites 속성을 사용하는 방법을 배웠습니다. 그러나 Pixi Sprites에는 재미있는 많은 유용한 속성이 있습니다. [다음은 전체 목록입니다.](http://pixijs.download/release/docs/PIXI.Sprite.html)

Pixi의 클래스 상속 시스템은 어떻게 작동합니까? (**클래스**란 무엇이며 **상속**은 무엇입니까? [알아보려면 이 링크를 클릭하십시오.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript)) Pixi의 sprites는 이 체인을 따르는 상속 모델을 기반으로 작성됩니다.

```
DisplayObject > Container > Sprite
```

상속은 단지 체인에 속한 클래스가 체인의 이전 클래스에서 속성과 메서드를 사용한다는 것을 의미합니다. 즉, `Sprite`가 체인의 마지막 클래스인 경우에도 고유한 속성 외에도 `DisplayObject` 및 `Container`와 동일한 모든 속성을 갖습니다. 가장 기본적인 클래스는 `DisplayObject`입니다. `DisplayObject`인 것을 스테이지에서 렌더링 할 수 있습니다. `Container`는 상속 체인의 다음 클래스입니다. `DisplayObject`는 다른 `DisplayObjects`의 컨테이너 역할을 할 수 있습니다. 세 번째 체인은 `Sprite` 클래스입니다. Sprite는 무대에 표시될 수 있으며 다른 Sprites에 대한 containers가 될 수 있습니다.

<a id='takingitfurther'></a>
추가 정보
---------------

Pixi는 많은 일을 할 수 있지만 모든 것을 할 수는 없습니다! Pixi로 게임이나 복잡한 대화형 응용 프로그램을 만들기 시작하려면 다음과 같은 도우미 라이브러리를 사용해야 합니다.

-[Bump](https://github.com/kittykatattack/bump) : 게임용 2D collision 전 기능의 완벽한 세트.
-[Tink](https://github.com/kittykatattack/tink) : 드래그 앤 드롭, 버튼, 범용 포인터 및 기타 유용한 대화형 도구.
-[Charm](https://github.com/kittykatattack/charm) : Pixi sprites에 사용하기 쉬운 tweening 애니메이션 효과.
-[Dust](https://github.com/kittykatattack/dust) : 폭발, 불, 마술 같은 것을 만들기 위한 입자 효과.
-[Sprite Utilities](https://github.com/kittykatattack/spriteUtilities) : Pixi sprites를 만들고 사용하는 더 쉽고 직관적인 방법은 물론 state 기계와 애니메이션 플레이어를 추가할 수 있습니다. Pixi와 훨씬 더 재미있는 작업을 할 수 있습니다.
-[Sound.js](https://github.com/kittykatattack/sound.js) : 사운드 및 음악 효과를 로드, 제어 및 생성하기 위한 마이크로 라이브러리입니다. 게임에 사운드를 추가하는데 필요한 모든 것.
-[Smoothie](https://github.com/kittykatattack/smoothie) : 진정한 델타 시간 보간법을 사용한 매우 부드러운 sprite 애니메이션. 또한 게임이나 응용 프로그램이 실행되는 fps (초당 프레임 수)를 지정하고 sprite 렌더링 루프와 응용 프로그램 논리 루프를 완전히 분리할 수 있습니다.
Pixi와 함께이 모든 라이브러리를 사용하는 방법은 [Learn PixiJS](http://www.springer.com/us/book/9781484210956)에서 찾을 수 있습니다.

<a id='hexi'></a>
### Hexi

해당 라이브러리의 모든 기능을 사용하고 싶지만 직접 통합하게에는 번거롭지 않나요?**Hexi** 사용 : 게임 및 대화형 응용 프로그램 구축을 위한 완벽한 개발 환경 :

https://github.com/kittykatattack/hexi

Pixi의 가장 최신 버전 (최신 **stable** 버전) 을이 모든 라이브러리(그리고 더!) 와 함께 번들로 제공하여 게임을 만드는 간단하고 재미있는 방법을 제공합니다. Hexi를 사용하면 전역 `PIXI` 객체에 직접 액세스 할 수 있으므로 Hexi 애플리케이션에서 직접 저수준 Pixi 코드를 작성하고 필요에 따라 Hexi의 추가 편의 기능을 최대한 많이 또는 적게 사용하도록 선택할 수 있습니다.


<a id='babylonjs'></a>
### BabylonJS

Pixi는 2D에 적합하지만 3D를 할 수 없습니다. 3차원으로 발을 들여 놓을 준비가 되면, 가장 기능이 풍부하고 사용하기 쉬운 웹용 3D 게임 개발 플랫폼은 [BabylonJS](https://www.babylonjs.com) 입니다. 기술을 더 발전시키기 위한 다음 단계입니다.

<a id='supportingthisproject'></a>
이 프로젝트를 도와주세요!
--------------

책을 구입해주세요! 놀랍게도, 누군가는 튜토리얼을 끝내고 책으로 바꿔달라고 실제로 돈을 지불한 사례가 있습니다!

[Learn PixiJS](http://www.springer.com/us/book/9781484210956)

(그리고 이것은 단순한 "e-book" 이 아니라 세계 최대의 출판사 Springer가 출간한 실제의 두꺼운 종이 책입니다. 이 책으로 친구를 초대하고 불을 놓으며 마시멜로우를 구울 수 있습니다!) 이 튜토리얼의 내용보다 80% 많은 콘텐츠가 있으며 모든 종류의 대화형 응용 프로그램과 게임을 만들기 위해 Pixi를 사용하기 위해 알아야 할 모든 필수 기술로 가득합니다.

방법 알아보기 :

• 애니메이션 게임 캐릭터를 만듭니다.
• 모든 기능을 갖춘 애니메이션 상태 플레이어를 만듭니다.
• 선 및 모양을 동적으로 애니메이션화 합니다.
• 무한 시차 스크롤에는 타일링 sprites를 사용하십시오.
• 혼합 모드, 필터, 색조, 마스크, 비디오 및 텍스처 렌더링을 사용하십시오.
• 여러 해상도를 위한 컨텐츠 제작.
• 대화형 단추를 만듭니다.
• Pixi용 유연한 드래그 앤 드롭 인터페이스를 만듭니다.
• 입자 효과를 만듭니다.
• 규모에 관계없이 안정적인 소프트웨어 아키텍처 모델을 구축하십시오.
• 완벽한 게임을 만드십시오.

보너스로, 모든 코드는 최신 버전의 JavaScript : ES6 / 2015로 작성되었습니다. 그리고 이 책의 코드는 Pixi v3.x를 기반으로 하고 있지만, 최신 버전의 Pixi 4.x에서는 모두 잘 작동합니다!

이 프로젝트를 지원하려는 의향이 있다면, 이 책의 사본을 구입해주시고 다른사람을 위한 또 다른 사본을 구입해주세요!

또는 많은 지원을 이곳으로 : http://www.msf.org 부탁드립니다.
