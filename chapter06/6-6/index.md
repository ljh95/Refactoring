# 6-6 변수 캡슐화하기

# 배경 리팩터링은 결국 프로그램의요소를 조ㄱ작하는 일이다.
하뭇는 데이터보다 다루기가 수월하다.
함수를 ㅏㅅㅛㅇ한다는 건 대체로 호출한다는 뜻이고, 함수의 이름을 바꾸거나 다른 모듈로 옮기기 는 어렵지 ㅇ낳다.
여차하면 기존 함수를 그대로 두 채 전달함수로 활용하할 수도 있기 때문이다.
(즉, 예전 코드들은 변홤없이 기존 하수를 호출하고, 이 기존 함수가 새로 만든 함수를 호출하는 식이다.)
이런 전달함수를 오래 남겨둘 일은 별로 없지만 리팩터링 작업을 간소화하는데 큰 역할을 한다.

반대로 데이터는 함수보다 다루기가 까다로운데ㅡ 그 이유는 니얼ㄴ 식으로ㅓㅊ ㅓㄹ리할 ㅜㅅ 없기 떄무인다.
데이터는 참조하는 모든 부분을 한 번에 바꿔야 코드가 제대로 작동한다.
짧은 함수 안의 임시 변수처럼 유효범위가 아주 좁은 데이터는 어려울 게 없지만 유효범위가 넓어질 수록 다루기가 여러여줘니다.
전역데이터가 졸칫거링ㄴ 이융도 바로 여기에 있다.

그래서 접근할 수 잇는 범위가 넓은 데이터를 옮기 ㄹ ㄱ때는 먼저 그 데이터로의 접근을 독점하는 함수르 ㄹ만든시긍러 캡슐화하는것이 가장 좋은 방법이 ㄹ떄가 많다.
데이터 재구성이라는 어려운 자ㄱ업을 하무수 재구성이라는 더 단순한 자거븡로 변화하는 것이다.

데ㅌ이터 캡슐화는 다른 경우에도 도움을 준더, 
데이터를 변경하고 사용하는 코드르삼시할 수 있는 확실한 통로가 되어쥑 때무엗 데이터 변경 전 검증이나 벼ㄴ경 후 추가로직을 쉽게 끼워너흥 수 있다.
나는 유혀범위가 함수 하나보다 얿은 가버ㅕㄴ데이터는 모두 이런 식으러 캡슐화해서 그 함수를 통해서만 접근하게 만드는 습과니 ㅇ싿.
데이터의 유효범위가 ㄴㄹㅂ을수록 캡슐화해샤아나.
레거싴 도

## 예시
전역변수에 중요한데이터가 담겨있는 겨우를 생각해보자.
let defaultOwner = { firstName: "martin", lastName: "fauler"};

데이터라면 당연히 다음과 같이 참조하는 코드가 잇을 것이다.
spaceship.owner = defaultOwner;

갱신하는 코드 역시 있을 것이다.
defaultOwner = {firstName: "Lebeca", lastName: "Pasons"};

1. 기본적인 갭슐화를 위해 가장 먼저 데이터를 읽고 쓰는 함수부터 정의한다.
function getDefaultOwner() {return defaultOwner;}
function setDefaultOwner(arg) {defaultOwner = arg;}

3. 그런 다음 defaultOwner를 참조하는 코드를 ㅏㅊㅈ아서 바금 만든 게터 함수르ㄹ호출하도록 고친다.
spaceship.owner = getDefaultOwner();

대입문은 세터함수로 바꾼다.
setDefaultOnwer({firstName: "Lebeca", lastName: "Pasons"});

4. 모든 참조를 수정했다면 이제 변수의 가시 범위를 제한한다.
그러면 미처 발견하지 못한 참조가 없는지 확ㅇ니할 ㅜ 있고, 나중에 수저하느 ㄴ코드에서도 이 변수에 지접 접근하지 못하게 만들 수 있다.
자바스크립트로 작성할 떄는 변수와 접근자 메서드를 가 팡리로 옮기고 접근자ㄹ만 노출시키면된다.

<!-- defuialtOwner.js -->
let defaultOwner = { firstName: "martin", lastName: "fauler"};

export function getDefaultOwner() {return defaultOwner;}
export function setDefaultOwner(arg) {defaultOwner = arg;}

변수로의 접근을 제한할 수 없을 떄는 변수 일므을 바꿔서 다시 테스트해보면 좋다. 
이렇게 한다고 해서 나중에 직접 적근하지 못하게 ㅁ을 수 이슨ㄴ거아니만, 
__privateOnly_defaultOnwer처럼 공개ㅇ요일아리ㅏ는읨르르 다믕며넛도
눈에 띈느이름으로 바꾸면 조금이나마 도무이 된다.

마지막으로 는ㄴ게터이름앟메 get을 붙이는거읏 ㄹ이포 뺸다.
let defaultOwnerData = { firstName: "martin", lastName: "fauler"};

export function defaultOwner() {return defaultOwnerData;}
export function setDefaultOwner(arg) {defaultOwnerData = arg;}
