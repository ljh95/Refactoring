# 6.9 여러 함수를 클래스로 묶기
## Combine Function into Class

<!-- Before -->
function base(aReading) { ... }
function texableCharge(aReading) { ... }
function calculateBaseCharge(aReading) { ... }

<!-- After -->
class Reading {
  base() { ... }
  texableCharge() { ... }
  calculateBaseCharge() { ... }
}

## 배경
클래스는 대다수의 최신 프로그래임언어가 제공하는 기본적인 빌딩 블록이다.
클래스는 데이터와 함수를 하나의 공유환경으로 묶은 후, 다른 프로그램 요소와 어우러질수 있도록 그중 일부를 외부에 제공한다.
클래스는 객체 지향 언어의 기본인 동시에 다른 패러다임 언어에도 유용한다.

나는 (흔히 함수 호출 시 인수로 전달되는) 공통 데이터를 중심으로 긴밀하게 엮여 작동하는 함수 무리르 발견하면 클래스 하나로 묶고 싶어진다.
클래스로 묶으면 이 함수들이 공유하는 공통환경을 더 명확하게 표현할 수 있고, 
각 함수에 전달되는 인수를 줄여서 객체 안에서의 함수 호출을 간결하게 만들 수 있다.
또한 이런 객체를 시스템의 다른 부분에 전달하기 위한 참도를 제공할 수 있다.

이 리팩터링은 이미 만들어진 함수들을 재구성할 떄는 물론, 새로 만든 클래스와 관련하여 놓친 연산을 찾아서 새 클래스의 메서드로 뽑아내는 데도 좋다.

함수를 한데 묶는 또 다른 방법으로 여러 함수를 변환함수로 묶기도 있다.
어떤 방식으로 진행할지는 프로그램의 문맥을 넓게 살펴보고 정해야 한다.
클래스로 묶을 떄의 두드러진 장점은
클라이언트가 객체의 핵심데이터를 변경할 수 있고, 파생 객체들을 일관되게 관리할 수 있다는 것이다.
-> 변환함수는 클라이언트가 객체의 핵심 데이터를 변경할 수 없고,
-> 파생 객체들을 일관되게 관리할 수 없다는 것

이런 함수들을 중첩함수형태로 묶어도 된다.
나는 중첩함수보다 클래스를 선호하는 편인데, 
중첩함수는 테스트하기가 까다로울 수 잇기 때문이다.
또한 한 울타리로 묶을 함수들 중 외부애 곻ㅇ개할 함수가 열거ㅐ일 떄는 클래스를 사용할 수밖에 없다.

클래스를 지원하지 않는 언어를 사용할 떄는 같은 기능을 '함수를 객체처럼'패턴을 이용해 구현하기도 한다.

## 절차
1. 함수들이 공유하는 공통 데이터 레코드를 캡슐화한다.
  -> 공통 데이터가 레코드 구조로 묶여 있지 않다면 먼저 매개변수 객체 만들기로 데이터를 하나로 묶는 레코드를 만든다.
2. 공통 레코드를 사용하는 함수 각각을 새 클래스로 옮긴다.(함수 옮기기)
  -> 공통 레코드의 멤버는 함수 호출문의 인수 목록에서 제거한다.
3. 데이터를 조작하는 로직들은 함수로 추출해서 새 클래스로 옮긴다.

## 예시
나는 차를 사랑하기로 소문난 영국에서 자랐다.(개인적으로 영구에서 파틑 차는 대부분 좋아하지 않지만 중국이나 일본 차는 좋아한다.)
그래서 작가다운 상상력을 발휘하여 정부에서 차를 수돗물처럼 제공하는 예를 떠올려봤다.

<!-- 사람들은 매달 차 계량기를 읽어서 측정값을 다음과 같이 기록한다고 하자. -->
reading = {customer: "ivan", quantity: 10, month:5, year: 2017};

이런 레코드를 처리하는 코드를 훑어보니 이 데이터로 비슷한 연산을 수행하는 부분이 상당히 만항ㅆ다.
<!-- 그래서 기본 요금을 계산하는 코드를 찾아봤다. -->

<!-- 클라이언트 1 -->
const aReading = acqureReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;

필수품이라면 되대 세금을 매기는 영국을 배경으로 하는 만큼 차에도 세금을 부과한다.
하지만 기본적인 차 소비량만큼은 면세가 되도록 했다.
<!-- 클라이언트 2 -->
const aReading = acquireReading();
const base = (baseRate(aReading.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

여기서도 기본요금 계산 공식이 똑같이 등장하는 것을 발견했다.
나ㅑ와 성향이 같다면 곧바로 함수로 추출하려 시도할것이다.
그런데 마침 이미 이렇게 처리해둔 코드를 발견했다.

<!-- 클라리언트 3 -->
const aReading = acquireReading();
const basicChargeAmount = calculateBaseCharge(aReading);

function calculateBaseCharge(aReading) {
  return baseRate(aREading.month, aReading.year);
}


이런 코드를 보면 나는 본능적으로 앞의 두 클라이언트클라이언트(1, 2)도 이 함수를 사용하도록 코치려고 한다.
하지만 이렇게 최상위 함수로 두면 못 보고 지나치기 쉽다는 문제가 있다.
나라면 이런 함수를 데이터 처리 코드 가까이에 둔다.
그러기 위한 좋은 방버으로, 데이터를 클래스로 만들 수 있다.

<!-- 1. 먼저 레코드를 클래스로 변환하기 위해 레코드를 캡슐화한다. -->
class Reading {
  constructor(data) {
    this._customer = data.customer;
    this._quantity = data.quantity;
    this._month = data.month;
    this._year = data.year;
  }
  get customer() {return this._customer;}
  get quantity() {return this._quantity;}
  get month() {return this._month;}
  get year() {return this._year;}
}

<!-- 2. 이미 만들어져 있는 calculateBaseCharge()부터 옮기자.
새 클래스를 사용하려면 데이터를 엊다마자 객체로 만들어야 한다. -->

<!-- 클라이언트 3 -->
const rawReading = acquireReading();
const aReading = new Readint(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);


<!-- 그런 다음 calculateBaseCharge()를 새로 만든 클래스로 옮긴다. -->
<!-- Reading 클래스.. -->
get calculateBaseCharge() {
  return baseRate(this.month, this.year) * this.quantity;
}

<!-- 클라이언트 3 -->
const rawReading = acquireReading();
const aReading = new Readint(rawReading);
const basicChargeAmount = aReading.calculateBaseCharge;


<!-- 이 과정에서 메서드 이름을 원하는대로 바꾼다. -->
<!-- Reading 클래스.. -->
get baseCharge() {
  return baseRate(this.month, this.year) * this.quantity;
}

<!-- 클라이언트 3 -->
const rawReading = acquireReading();
const aReading = new Readint(rawReading);
const basicChargeAmount = aReading.baseCharge;


이렇게 이름을 바꾸고 나면 Reading클래스의 클라이언트는 baseCharge가 필드인지, 계산된 값인지 구분할 수 없다.
이는 단일 접근 원칙(Uniform Access Priciple)을 따르므로 권장하는 방식이다.

이제 첫 번째 클라이언트에서 중복된 계산 코드를 고쳐 앞의 메서들 ㄹ 호출한다.
<!-- 클라이언트 1 -->
const rawReading = acqureReading();
const aReading = new Reading(rawReading);
const baseCharge = aReading.baseCharge;


나는 이런 코드를 보면 baseCharge 변수를 인라인 하고 싶어진다.
하지만 이보다는 세금을 계산하는 클라이언트부터 인라인하는 일이 절실하다.
그래서 우선 새로 만든 기본 요금 메서드를 사용하도록 수정한다.
<!-- 클라이언트 2 -->
const rawRaeding = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

3. 이어서 세금을 부과할 소비량을 계산하는 코드를 함수로 추출한다.
function taxableChargeFn(aReading) {
  return Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));
}
<!-- 클라이언트 3 -->
const rawRaeding = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = taxableChargeFn(aReading);

그런 다음 방금 추출한 함수를 Reading클래스로 옮긴다.
<!-- Reading 클래스.. -->
get taxableCharge() {
  return Math.max(0, this.baseCharge - taxThreshold(this.year));
}
<!-- 클라이언트 3 -->
const rawRaeding = acquireReading();
const aReading = new Reading(rawReading);
const taxableCharge = aReading.taxableCharge;

파생 데이터 모드를 필요한 시점에 계산괴게 만들었으니 저장된 데이터를 갱신하더라도 문제가 생길 일이 없다.
나는 대체로 불변데이터를 선호하지만 어쩔 수 없기 가변 데이터를 사용해야할 떄가 많다.
(가령 다바스크립트처럼 불변성을 염두해 두지 ㅇ낳고 설계된 언어라면 더욱 그렇다.)
프로그램의 다름 부분에서 데이터를 갱신할 가능성이 꽤 있을 떄는 클래스로 묶어두면 크 도움이 된다.
