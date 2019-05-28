Learning Pixi
===========

- Pixi rendering engine으로 게임과 대화형 미디어를 만드는 단계별 안내.  
- Updated for Pixi v4.5.5 . 
(https://github.com/pixijs/pixi.js/releases/tag/v4.5.5)**. Chinese version here: Pixi官方教程中文版.
(https://github.com/Zainking/learningPixi).
- you'll love the book, which contains 80% more content!.



목차

1. 소개
2. 설정방법

         i. 픽시 설치
3. Stage 및 renderer 생성
4. Pixi 속성
5. 텍스처 캐시에 이미지 올리기
6. sprites 표시

         i. Aliases 사용
        ii. 자세한 로딩 방법
           - (1). 일반적인 JavaScript Image 객체 또는 Canvas에서 속성 만들기
           - (2). load 된 파일에 이름 지정
           - (3). load 진행과정 모니터링
           - (4). Pixi의 로더에 대한 추가 정보
7. 속성의 위치 지정
8. 크기와 규모
9. 회전
10. 부가 이미지 모음으로부터 sprite 만들기
11. 텍스처 atlas 사용하기
12. 텍스처 atlas 올리기
13. 올려진 텍스처 atlas 로부터 sprites 만들기
14. sprites 움직이기
15. 속도의 속성 사용하기
16. 게임 상태
17. 키보드 움직임
18. Sprites 그룹화하기

           i. 지역적 및 종합적 위치
          ii. ParticleContainer 를 사용하여 sprite 그룹화하기
19. Pixi의 그래픽 기초

           i. 직사각형
          ii. 원
         iii. 타원
         iv. 둥근 사각형
          v. 선
         vi. 다각형
20. 텍스트 표시
21. 충돌 감지

          i. hitTestRectangle 함수
22. 사례 연구 : Treasure Hunter     
   
          i. setup 기능에서 게임 초기화
 		  - (1). 게임 장면 만들기
 		  - (2). 지하 감옥, 문, 탐험가 및 보물 만들기
 		  - (3). 얼룩덜룩 한 괴물 만들기 
 		  - (4). HP표시 바 만들기
 		  - (5). 메시지 텍스트 만들기
 		  
         ii. 게임하기

        iii. 탐색기 이동

 			  - (1). 움직임 포함
        iv. 괴물 이동하기
         v. 충돌 확인
        vi. 출구 문에 도달하여 게임을 종료한다.
23. sprites에 대한 추가 정보
24. 추가 정보

         i. Hexi
        ii. BabylonJS
25. 프로젝트 지원


소개

Pixi는 매우 빠른 2D sprite rendering 엔진입니다. 이것은 당신이 JavaScript와 다른 HTML5 기술을 사용하여 게임과 응용프로그램을 쉽게 만들 수 있도록 대화형 그래픽을 표시하고, 애니메이션을 제작 및 관리할 수 있도록 도와준다는 것을 의미합니다. Pixi는 분명 하고, 깔끔한 API를 가지고 있으며 텍스처 atlas를 지원하고 sprite(인터랙티브 이미지)를 나타내기 위한 능률화된 시스템을 제공하는 것과 같은 많은 유용한 기능들을 포함하고 있습니다. 또한 완전한 장면 그래프를 통해 중첩된 sprite(sprite 내부의 sprite)의 계층 구조를 만들 수 있을 뿐 아니라 마우스와 터치를 스프라이트에 직접 연결할 수 있습니다. 그리고 가장 중요한 것은 Pixi는 당신이 원하는 만큼 혹은 더 적게 사용할 수 있도록, 그리고 그것을 당신의 개인적인 코딩 스타일에 적응시키고, 다른 유용한 틀들과 완벽하게 통합할 수 있도록, 당신의 길을 열어준다는 것입니다.

Pixi의 API는 실제로 Macromedia/Adobe Flash가 개척한 잘 적용되고 전투 테스트 된 정교한 API입니다. Old-skool Flash 개발자들은 이에 대해 편안함을 느낄 것 입니다. 다른 현재 sprite rendering framework는 CreateJS, Starling, Sparrow 및 Apple의 SpriteKit과 같은 API를 사용합니다. Pixi의 API의 강점은 그것이 범용 목적이라는 것입니다: 이것은 게임 엔진이 아닙니다. 이러한 사실은 여러분이 좋아하는 것을 만들 수 있는 완전한 표현의 자유를 제공하고, 여러분 자신의 맞춤형 게임 엔진을 포장하기 때문에 좋습니다. 이 튜토리얼 에서는 Pixi의 강력한 image rendering 기능과 scene graph를 결합하여 게임을 만드는 방법을 알아 봅니다. 그러나 Pixi는 단지 게임만을 위한 것이 아닙니다. 당신은 이와 같은 기술을 사용하여 모든 대화 형 미디어 응용 프로그램을 만들 수 있습니다. 즉, 휴대 전화 용 앱을 의미합니다!

너가 이 튜토리얼을 시작하기 전에 무엇을 알아야 할까요?

HTML과 JavaScript에 대해 충분히 이해하고 있어야 합니다. 당신은 전문가가 아니며, 열심히 배워야하는 야심 찬 초심자입니다. HTML과 JavaScript에 대해 잘 모르는 경우 이 책을 통해 학습을 시작하세요. 

Foundation Game Design with HTML5 and JavaScript

내가 이 책을 썼기에 이 책이 최고라고 자부합니다!

또한 시작할 때 도움이 되는 좋은 인터넷 자원이 있습니다.

Khan Academy: Computer Programming

Code Academy: JavaScript

무엇이든 간에 당신의 학습 방식에 가장 적합한 책을 고르세요.
이해하셨나요? JavaScript 변수, 함수, 배열 및 객체가 무엇이며 어떻게 사용하는지 알고 있으신가요?  JSON data files가 무엇인지 알고 계신가요?  Canvas Drawing API를 사용해 보셨나요?

Pixi를 사용하려면, 당신의 루트 프로젝트 디렉토리에서 웹 서버를 실행해야 합니다. 웹 서버가 무엇이며 프로젝트 폴더에서 웹 서버를 시작하는 방법을 아시나요? 가장 좋은 방법은  node.js를 사용한 다음 사용하기 쉬운 http-server를 설치하는 것입니다. 그러나 그렇게 하고 싶다면 Unix 명령 행 작업에 익숙해 져야합니다. 당신은 이 비디오에서 유닉스를 사용하는 법을 배울 수 있습니다. 이 비디오가 끝이 나면 이 비디오를 따라 해보세요. 당신은 Unix 사용 방법을 배워야 합니다. 배우기까지 2 시간 밖에 걸리지 않으며 컴퓨터와 상호 작용할 수있는 정말 재미 있고 쉬운 방법입니다.

그러나 명령 행을 사용하여 혼란스럽기를 원치 않는다면 몽구스 웹 서버를 사용해보세요:

Mongoose

또는 훌륭한 Brackets text editor를 사용하여 모든 코드를 작성하십시오. Brackets는 기본 작업 공간에서 번개 모양 버튼을 클릭하면 자동으로 웹 서버와 브라우저를 실행합니다. 이제 준비가 되었다고 생각한다면 계속 읽어보세요! (독자에게 요청합니다: 이것은 살아있는 문서입니다. 구체적인 세부사항에 대해 질문이 있거나 내용이 명확하게 설명되어야 하는 경우 이 GitHub 저장소에 문제를 생성하세요. 자세한 내용은 텍스트를 업데이트하세요.)

설정 방법

코드 작성을 시작하기 전에 프로젝트 폴더를 만들고 프로젝트의 root directory에서 웹 서버를 시작하세요. 웹 서버를 사용하지 않는다면 Pixi는 작동하지 않습니다.


다음으로 Pixi를 설치해야합니다.

픽시 설치

이 소개에 사용 된 버전은 v4.5.5이며 이 저장소의 pixi 폴더 또는 Pixi's release page for v4.5.5에서 pixi.min.js 파일을 찾을 수 있습니다. 또는 Pixi's main release page에서 최신 버전을 다운로드 할 수 있습니다.

Pixi를 사용하려면 이 파일 하나만 있으면 됩니다. 저장소의 다른 모든 파일을 무시할 수 있습니다: 당신은 그것들이 필요 없을 것입니다.

다음으로 기본 HTML 페이지를 만들고 <script> 태그를 사용하여 방금 다운로드 한 pixi.min.js 파일을 연결하세요. <script> 태그의 src는 웹 서버가 실행중인 루트 디렉토리에 대해 상대적이어야 합니다.

<script> 태그는 다음과 같이 보일 수 있습니다:

<script src="pixi.min.js "></script>


다음은 Pixi를 연결하고 작동하는지 테스트 할 수 있는 기본 HTML 페이지입니다.(이것은 pixi.min.js가 pixi라고 불리는 하위 폴더에 있다고 가정합니다.)

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

Pixi가 제대로 연결되면 다음과 같은 내용이 기본적으로 웹 브라우저의 JavaScript 콘솔에 표시됩니다: 

PixiJS 4.4.5 - * canvas * http://www.pixijs.com/  ♥♥♥ 


Stage 및 renderer 생성

이제 Pixi를 사용할 수 있습니다! 

그러나 어떻게 해야 할까요?

첫 번째 단계는 이미지를 표시 할 수 있는 직사각형의 디스플레이 영역을 만드는 것입니다. Pixi에는 이것을 생성하는 Application 개체가 있습니다. 이는 자동으로 HTML <캔버스> 요소를 생성해 캔버스에 이미지를 표시하는 방법을 알아냅니다. 그런 다음 stage라는 특수 Pixi 컨테이너 객체를 만들어야 합니다.

앞에서도 볼 수 있듯이 이 stage 객체는 Pixi가 표시하는 모든 것을 담을 수 있는 root container로 사용될 것입니다. Pixi 응용 프로그램 및 stage 응용 프로그램을 작성하기 위해 작성해야하는 코드는 다음과 같습니다. [script] 태그 사이에 있는 HTML 문서에 이 코드를 추가하세요.

//Create a Pixi Application
let app =new PIXI.Application({width :256, height :256});

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);

이것은 Pixi를 사용하기 시작하기 위해 작성해야하는 가장 기본적인 코드입니다. 이것은 블랙 256 픽셀 x 256 픽셀 캔버스 요소를 만들어 HTML 문서에 추가합니다. 이 코드를 실행하면 브라우저에서 다음과 같이 표시됩니다.


black square이 나옵니다.

PIXI.응용프로그램은 당신이 사용하고 있는 웹브라우저에서 어떤 것을 이용할 수 있는지에 따라 그래픽을 rendering 하기 위해 캔버스 드로잉 API를 사용할지 WebGL을 사용할지를 파악합니다. 이것은 option 객체 라고 불리는 단일 객체입니다. 이 예제에서 width 및 height 속성은 캔버스의 너비와 높이를 픽셀 단위로 결정하도록 설정됩니다. 당신은 이 옵션 객체 내에 더 많은 선택적 속성을 설정할 수 있습니다. anti-aliasing, transparency 및 resolution을 설정하는 방법은 다음과 같습니다.

let app =new PIXI.Application({ 
    width :256,         // default: 800
    height :256,        // default: 600
    antialias :true,    // default: false
    transparent :false, // default: false
    resolution :1       // default: 1
  }
);

Pixi의 기본 설정에 만족하는 경우 이러한 옵션을 설정할 필요가 없습니다. 그러나 필요한 경우 PIXI.Application에 대한 Pixi의 설명서를 참조하십시오. 

그 선택사항들은 무엇을 할까요? antialias은 글꼴 및 그래픽 프리미티브의 가장자리를 부드럽게 합니다. (WebGL anti-aliasing는 일부 플랫폼에서 사용할 수 없으므로, 게임의 타깃 플랫폼에서 이 기능을 테스트해야 합니다.) transparency는 캔버스 배경을 투명하게 만들어줍니다. resolution은 다양한 해상도와 픽셀 밀도의 디스플레이로 작업하는 것을 더 쉽게 만들어줍니다. 해상도를 설정하는 것은 이 튜토리얼의 범위를 벗어나는 부분이지만 모든 세부 사항에 해상도를 사용하는 방법에 대한  Mat Grove's explanation을 확인하세요. 하지만 대개 대부분의 프로젝트에서 해상도를 1로 유지하면 문제가 없습니다. Pixi의 renderer 개체는 WebGL로 기본 설정되며, WebGL은 믿을 수 없을 정도로 빠르며, 여러분이 앞으로 알게 될 멋진 시각 효과를 사용할 수 있기 때문에 좋습니다. 그러나 WebGL을 통해 Canvas Drawing API 렌더링을 강제 실행해야하는 경우 forceCanvas 옵션을 다음과 같이 true로 설정할 수 있습니다:

forceCanvas:true,

캔버스를 만든 후에 캔버스의 배경색을 변경해야하는 경우 app.renderer 객체의 backgroundColor 속성을 16 진수 색상 값으로 설정합니다:

app.renderer.backgroundColor =0x061639;

renderer의 너비 또는 높이를 찾으려면 app.renderer.view.width 및 app.renderer.view.height 를 사용하세요.

캔버스의 크기를 변경하려면 renderer의 resize 메서드를 사용하고 새로운 너비 및 높이 값을 제공하세요. 그러나 해상도와 일치하도록 캔버스의 크기를 조정하려면 autoResize를 true로 설정하세요.

app.renderer.autoResize =true;
app.renderer.resize(512, 512);


캔버스가 전체 창을 채우게 하려면 이 CSS 스타일을 적용하고 renderer의 크기를 브라우저 창의 크기에 맞게 조정할 수 있습니다.

app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(window.innerWidth, window.innerHeight);

그러나 그렇게 한다면 CSS 코드를 사용하여 모든 HTML 요소에서 기본 여백과 여백을 0으로 설정해야 합니다. 

<style>* {padding : 0 ; margin : 0 }</style>

(위의 코드에서 별표 (*)는 "HTML 문서의 모든 태그"를 의미하는 CSS "범용 선택기"입니다.)

캔버스를 브라우저 창 크기에 비례하여 크기를 조정하려면 this custom scaleToWindow  function를 사용할 수 있습니다.


