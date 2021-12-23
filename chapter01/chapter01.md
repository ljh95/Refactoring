프로그램이 잘 작동하는 상황에서 그저 코드가 '지저분하다'는 이유로
불평하는 것은 프로글매의 구조를 너무 미적이니 기준으로만 판단하는 건 아닐까?

컴파일러는 코드가 깔끔하든 지저분하든 개의치 않으니말이다.
하지마느 그 코드를 수저하려면 사람이 개입되고, 사람은 코드의 미적상태에 민감하다.

설계가 나쁜 시스템은 수정하기 어렵다.
원하는동작을 수행하도록 하기 위해 수정해야햘 부분을 찾고, 기존 코드와 잘 맞물려 작동하게 할 방법을 강구하기가 어렵기 때문이다.
무엇을 수정할지 찾기 어렵다면 실수를 저질러서 버극가 생길 가능성도 높아진다.

그래서 나는 수백줄짜리 코드를 수정할 때면 먼저 프로그램의 작동 방식을 더 쉽게 파악할 수 있도록 ㅋ
코드를 여러 함수와 프로글매 요소로 재구성한다.
프로그램의 구조가 빈약하다면 대체로 구조부터 바로잡은 뒤에 
기능을 수정하는 펴ㄴ이 작업하기가 훨씬 수월하다.

프로그램이 새로운 기능을 추가하기에 편한 구조가 아니라면, 먼저 기능을 추가하기 위운 형채로 리팩터링하고나서 우너하는 기능을 추가한다.

수정할 부분을 발견
청구 내역을 HTML로 출력하는 기능이 피료하다.

이 변경이 어느 부분에 영향을 줄지 생각해보자.
우선 HTML 태그를 삽입해야하니
청구 결과에 문자열을 추가하는 문장 각각을 조건문으로 감싸야한다.
그러면 statement함수의 복잡도가 크게 증가하다.
이런 상황이라면
대부분 이 함수의 복사본을 만들고 본사본에서 HTML출력하는 식으로 처리할 것이다.

이때 복사하는 일 자체는 그리 부담되지 ㅇ낳지만, 나중에 수많은 문제를 일으킬 여지가 있다.
청구서 작성 로직을 변경할 떄마다 기존 함수와 HTML qjwjs gkatn ahen tnwjdgkrh, gkdtl dlfrhksehlrp tnwhdgoTsmswleh ghkrdlsgodigksek.
로직을 변경할 일이 절대 없다면 이렇게 복사해서 붙이는 방식도 상관없지만,
오래 사용할프로그램이라면, 중복 코드는 골칫거리가 된다.

이는 주 번째 변경 사항과도 관련이 있다.
배우들은 사극 전원극, 전원 희극, 역사 전웍극, 역사 비극, 희비 역사 전원극, 장면 변화가 없는 고전극
길이와 시잔과 장소에 제약없는 자유극 등 
더 많은 장르를 연기하고 싶어한다.
언제 어떤 연극ㄱ을 할지 아직 결정하지 못했지잠,ㄴ 이 변경은 공연료와 적립 포인트 계산법에 영향을 줄것이다.

경험 많은 개발자로서 내가 장담하건대, 어떤 방식으로ㄷ 정하든 반드시 6개월 안에 다시 변경하게 될 것이다.
새로운 요구사항은 수색 대원처럼 한두명씩이 아니라, 한 부대씩 몰려오기 마련이다.

이처럼 연극 장르롸 공연료 정책이 달라질 때마다 statement함수를 수정해야한다.
만약 statement를 복사해서 별도읜 htmlStatement를 만든다면 모든 수정이 두 함수에 일관되게 방영되도록 보장해야한다.
게다가 정책이 복잡해질 수록 수정할 부분을 찾기 어려워지고 수정과정에서 실수할 가능성도 커진다.

리팩터링이 필ㅇ여ㅛ한 이유는 바로 이러한 변경 때문이다.
잘 작동하고 나중에 변경할 일이 절대 없다면,코드를 나둬도 문제가 없다.

## 1.3 리팩터링의 첫 단계

리팩터링의 첫 단계는 항상 똑같다. 
리팩터링할 코드 영역을 꼼꼼하게 검사해줄 테스트 코드들부터 마련해야한다.
리팩터링에서 테스트의 역할은 괸장히 중요하다.
리팩터링 기법들이 버그발생 여지를 최소화하도록 구성됐다고는 하나 실제 작업은 사람이 수행하기 때문에 언제든 실수할 수 있다.
프로그램이 커질 수록 수정과정에서 예상치 못한 문제가 발생할 가능성이 크다.
"디지털 시대의 연약한 자여, 그대 이름은 소프트웨어'

statement함수의 테스트는 어떻게 구성하면 될까? 
이 함수가 문자열을 반환하므로, 다양한 장르의 공연들로 구성된 공연료 청구서 몇 개를 미리 작성하여 문자열 형태로 준비해둔다.
그런 다음 statement가 반환한 문자열과 준비해둔 정ㅈ땁 문자열을 비교한다.
그리고 테스트 프레임워크를 ㅣ용하여 모든 테스트를 단추키 하나로 실행할 수 있도록 설정해둔다.
이 테스트는 몇 초면 끝날 것이며, 나중에 보겠지만, 나는 테스트를 수시로한다.

여기서 중요한 부분은 테스트 결과를 보고하는 방식이다.
출력된 문자열이 정답 문자열과 똑같다면, 테스트를 통과했다는의의 초록불을 켜고,
조금이라도 다름녀 실패를 뜻하는 빨간불을 켠다.
즉, 성공/실패를 스스로 판단하는 자가진단 테ㅅ트로 만든다.
자가진단 여부는 매우 중요하다.
그렇지 않으면 테스트 결곽를 노트에 적어둔 값과 일일이 누능로 비교해야하는데
속도가 상당히 떨어지게 된다.
최신 테스트 프레임워크는 자가진단 테스트를 작성하고 실행하는데 필요한 모든 기능을 제공한다.

"리팩터링하기 전에 제대로된 테스트부터 마련한다. 테스틑는 반드시 자가진단하도록 만든다."

나는 리팩터링 시 ㅍ테스트에 상당히 의지한다.
내가 저지른 실수로부터 보호ㄹ해주는 버그 검추기역할을 해주기 ㄷ때무니다.
원하는 ㅐ용을 소스코드와 테스트 코드 양쪽에 적어줌ㄴ, 두번 다다 똑같이 씰수하지 않는 한 버그 검추기에 반드시 걸린다.
이와같이 중복 검사롤 실ㅅ 가능성을 크게 줄일 숭 ㅣㅆ다.
테스트를 작성하는데 시간이 좀 걸맂만, 신경써서 만들어두면 디버깅 시간이 줄어들어 전체 가업 시간은 오히려 단추된다.
리팩터리에서 테스트의 역할이 굉장히 중요하기 때문에 4장 전체를 테스트레 할애했다.

## 1.4 statemet() 함수 쪼개기

statement처럼 긴 함수를 리팩터링 할 때는 먼저 저체 동작을 각각의 부분으로 나눌 수 있는 지점을 찾는다.
그러면 중간 즈음의 ㄴ쟛초 문이 가장 먼저 눈에 띌 것이다.


## 1.8 다형성을 활요ㅇ해 셰산 코드 재구성하기
이버넹는 여극 장르를 추가하고 싶다.
장르마다 공ㅇ연료와ㅏ 적립 포아니트 계산법을 다르게 지정하도록 기능을 수정해보자,.
현재 상태에서 코드를 변겯ㅇ하려면 이 계산을 수행하는 함수에서 조건문을 수정해야한다.
amountFor함수를 보면 연극 장르에 다라 계산 방식이 달라진다는 사실을 알 수 있는데,
이런 형태의 조건부 로직은 코드 수정횟수가 늘어날 수록 골칫거리로 전락하기 수빈다.

이를 방지하려면 프로그램언어가 제공하는 구조겆인 요솔 적절히 보완해야한다.

조건부 로직은 명화학ㄴ 주고로 본환하는 방법은 다얀하지만, 여기서는 객체지향의 핵심특성인 다형성을 활용하는 것이 자연스럽다.
자바스크릡트 커뮤니티에서 전ㄷ통적인 객ㅊ레지향지원은 오랫동안 논란거리였다
그러다가 es6부터 객체지향을 사용할 수 있는 문법과 구조가 제대로 지원되기 시작해땃.
따라서 딱 맞는 상황이라면 이런 시능을 적극 활용하는 것이 좋다.
바로 지금

이번 자겅ㅂ의 모표는 상속 계층을 구성해서 희극 서브클래스와 비극 서브 클래스가 각자의 궃[적인 계산 로직을 정의하는 것이다.]
호출하는 쪽에서는 다형성 버전읜 공연료 꼐산 함수를 호ㅜㄹ하기만 하면되고, 희극이냐 비극이냐에 따라 정확한 계산 로직을 견련하는 작업은 언어 차원에서처리해준다.

적립 포인트 계산도 비슷한 구조로 만들 것이다.
이 관정에서 몇 가지 리팩터링 기법을 적용하는데, 그중 핵심은 조건부 로직은 다형성으로 바꾸기이다.

이 리팩터링은 고전부 ㅗ드 한 덩어리를 다형성으로 활용하는 방식으로 바ㄷ꿔준다.
그런데 이 리팩터링을 적용하려면 상속 계층부터 정의해야하낟.
즉 공열ㄴ료와 적립 포인트 계산 함수를 담을 클래스가 필여ㅛ한다.

먼저 계산을수ㅐㅎㅇ하는 코들르 살펴보자.

|| 앞에서 수행한 리팩리ㅏㅇ 벋분에 출력 데이터 구졸르 수정하지 않는 한 출력 포맷 관련 코드에ㅅ는 신경쓸이일이 없다.
 더 확실하게 하려면 중간 데이터 구조를 검사흔ㄴ 테스트를 추가한다.

 
공연료 계산기 만들기
여기서 핵심은 각 공연의 정보를 중간 데이터 구조에 채워주는 enrichPerformance()함수다.
현재 이 함수는 조건부 로직을 포함한 함수링ㄴ amountFor,volumeCreditsFor를 호출하여 공연료와 적립포인트를 계산한다.

이번에 할 일은 이 두함술르 전용 클래스로 옮기는 갖ㄱ어빈다.
이 클래스는 공연 관ㄹ녀 데이터를 곘나하나한ㅁ 하수들러ㅗ 그성더ㅚ므로 고ㅇ연료 계산기
PrformanceCalculatorfk qnfmrlfhgkwk.
ㅇㅇ

컴파일 테스트 커밋이란말을 자꾸 하면 지극지긋해할것 같아서 이제부터는 되도록 생략하게?ㅆ다.
말만 생ㅇ략할 뿐 여전히 기회가 될 떄마다 실행해야함을 잊지 말자
사실 나도 컴파일 테스트커밋 하기가 귀찮아서 소롤해질 때가 있다.
그러자 실수하면 정신이 번쩍 들면서 다시 꼬박ㅅ뀨ㅗ박 수행하게 된다.

클래스에 로직을 담았으니 이제 다형성을 지원하게 만드렁보자.
가장 먼저 할 일은 타입 코드 대신 서브클래스를 사용하도록 변경하는 것이다.
타임코드를 서브클래스로 바꾸기
이렇게하려면 PerformanceCAlculator의 서브클래스들을 준비하고 
createStatementData에ㅐ서 그중 적합한 서브클래스를 사용하게 만들어야한다.
그리고 딱 맞는 서브클랫스를 사용하려면 생성자 대신 함수를 호출하도록 바꿔야한다.
자바스크립트에서는 생성자가 서브클래스의 인스턴스를 반환할 수 없기 때문이다.
그래서 생성자를 패터리함수로 바꾸기 를 적용한다.

함수를 이용하면 다음과 같이 PerformanceCalculator의 서브 클래스중에서 어는 ㅓㄱㅅ을 생략해서 반환할 수 있는 선택할 수 잇다.

다음으로 계산한 조건부로직은 적립포인트를 ㄱ5ㅖ산하는 붑ㄴ이다.
향후 졔공한 가능성이 있는연극 장르들을 검토한 결과, 일부 장르에서만 약산씩 다ㄹㄹ 뿐 대다수의 연극은 관객수가 30을 넘는지 검사해야한다.
이럴 떄는 일반적인 겨유ㅜ를 기본으로 삼아 슈퍼클래스에 남겨두고, 장르마다 달라지는 부분을 피료할 떄 오버라이드하게 만드는 것이 좋다.
그래서 포인트 계산 방식이 조금 다른 희극 처리 로직을 해당 서븟클래스로 레리ㅏㄴ다.

## 1.9 상태 점검: 다형성을 활용하여 데이터 생성하기
다형성을 추가할 결과로 무엇이 달라졌는지 살펴볼 시간이다.

앞에서 함수를 추출했을 때 처럼, 이번에도 구조를 보강하면서 코드가 늘어났다.
이번 수정으로 나아진 점은 연극 장를별 계산 코드들을 함계 묶어뒀다는 것이다.
앞으로의 수정 대부분이 이 커드에서 이뤄질 것 같다면ㅇ 이렇게 명확하게 분리해두면 돟다.
이제 새로운 장르를 구가하려ㅑ면, 해당 장르의 서브 클래스를 작성하고 생성 함수는 creatPerformanceCalculator에 추가하기만 하면 된다.

이번 예를 보면 서브클래스를 언제 사용하면 좋은지 감이 잡힐것이다.
여기서는 두 개의 함숴 amountFor와 volumeCreditsFor의 조건부 로직을 생성함수 하나로 옴ㄹ겼다.
같은 타입의 다형성을 기반으로 샐행되는 함수가 많아질 수록 이렇게 구성하는 족이 유리하다.

계산기가 중간 데이터 구조를 채우게 한 지금의 코드롸 달리createStatementData가 계산기 자체를 반환하게 구현해도 된다.
이 때 자바스크립트 클래스 시스템의 멋진 점 하나가효과를 발휘하는데ㅏ 
바로 게터 메서드를 호출하는 코드와 일반적인 데이터 접근 코드의 모양이 똑같다는 점이다.
앞의 예에서 calculotor.amount 코드는 계산기 클래스의 게터인 amount(*)
를 호출한 것이다.ㄴ
한편 계산기 인스턴스를 반환하는 방식과 각각의 출력값으로 직접ㅈ 게산하는 방식중 하나를 선ㅇ택할 뗴ㄴ 나는 결과로 나온 데이터 구조를 누가 사용하는가를ㄹ 기준으로 갸ㅕㄹ정한다.
이번 예에서ㅏ는 다옇ㅇ성 계산기를 사용한다는 사실을 숨기기보다는 중간 데이터 구조를 이용하는 방버을 보여주는 편이 낫다고 생각해서 이렇게 작성했다.

## 1.10 마치며
간단한 예였지만, 리팩터링이 무엇인지 감을 잡았길 바란다.
함수 추출하기 변수 인라인 하기 함수 옮기기, 조건부 로직은 다셩성으로 바꾸기 를 비롯안 다양한 리팩터링 기법을 서보였다.

이번 장에서 리팩터링을 크게 세 단계로 진행했다. 
먼저 원본 함수를 중첩하수 여러개로 나웠다.
당므으로 단계 쪼개기를 적용해서 계산 코드와 출력 코드를 분리했다.
마지막으로 게싸ㅣㄴ 로직을 다형성으로 표현쌨다. 각 단계레서 코드 구조를 보강했고 
그럴 떄 마다 코드가 수쟇하는 일이 더욱 분명하게 드러났다.

리팩터링은 대부분 코드가 하는 일을 파악하는데서 시작한다.
그래서 코드를 읽고 개선점을 찾고, 리팩터링 자겅ㅂ을 통해 개선점을 코등0ㅔ 방영하는 시긍로 진핸한다.
그 격롹 코드가 명확해지고 이해하ㅣ기 더 쉬워진다.
그러면 또다른 개선점이 떠오르며 선순환이 형성된다.
지금까지 수정하 코드에서 개선할 게 며 가ㅣㅈ 더 있지만, 이정도면 우너본코드를 크게 개선한다는 뫂쵸는 충분히 달성했다고 생각한다.

"" 좋은 코드를 가늠하는 확실한 방법은 얼마나 수정하기 쉬원가다.""

이 책은 코드를 개선하는 방법을 다룬다.
그런데 프로글매워 사이에서 어떤 코드가 좋은 코드인지에 대한 의견은 분분하다.
내가 선혼하는 적절한 이름의 작은 함수글로 만드는 방식에 반대하는 사람도 분ㅁ여잇을 거싱다.
미적인관점으로 접근하면 좋고 나쁨이 명확하지 않아서 개인취향 말고는 어떤 한 지침도 세울 수 없게 된다.
하지만 나는 취향을 넘어슨 ㄴ관점이 분명히 조내하며, 코드를 수정하기 쉬우ㄴㅈ 정도야 말로 좋은 코드를 가늠하는 확실하 ㄴ방법이라모 깆즌다.