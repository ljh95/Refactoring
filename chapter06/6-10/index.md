# 6.10 여러 함수를 변환함수로 묶기

<!-- Before -->
function base(aReading) {...}
function texableCharge(aReading) {...}


<!-- After -->
function enrichReading(argReading) {
  const aReading = _.cloneDeep(argReading);
  aReading.baseCharge = base(aReading);
  aReading.taxableCharge = taxableCharge(aReading);
  return aReading;
}

## 배경
소프트웨어는 데이터를 입력받아서 여러가지 정보를 도출하곤 한다.
이렇게 도출된 정보는 여러곳에서 사용될 수 있는데, 그러다보면 이 정보가 사영되근 녻마다 같은 도출 로직이 반복되기도한다.
나는 이런 도출작업들을 한데로 모아두길 좋아한다.
모아두면 검색과 갱신을 일관된 장소에서 처리할 수 있고 로직 중복도 막을 수 있다.

이렇게 하기 위한 방법으로 변환함수(transform)를 사용할 수 있다.
변환 함수는 원본 데이터를 입력받아서 필요한 정보를 모두 도출한 뒤 각각을 출력 데이터의 필드에 넣어 반환한다.
이렇게 해두면 도출과정을 검토할 일이 생겼을 때 변환함수만 살펴보면 된다.

이 리팩터링 대신 여러함수를 클래스로 묶기로 처리해도 된다.
둘 중 어느것을 적용해도 좋으며, 다는 대체로 소프트웨어에 이미 반영된 프로그래밍 스타일을 따르는 편이다.

그런데 둘 사이에는 중요한 차이가 하나 있다.
원본 데이터가 코드 안에서 갱신될 ㅒㄸ는 클래스로 묶는 편이 훨씬 낫다.

변환함수로 묶으면 가공한 데이터를 새로운 레코드에 저장하므로, 원본 데이터가 수정되면 일관성이 깨질 수 있기 때문이다.
#### 원본 데이터가 코드 안에서 갱신될 때란 언제인가?

여러 함수를 한데 묶는 이유 하나는 도출 로직이 중복되는 것을 피하기 위해서다. 
이로직을 함수로 추출하는 것만으로도 가은 효과를 볼 수 있지만, 
데이터 구조와 이를 사용하는 함수가 근처에 잇지 않음녀 함수를 발견하기 어려울 때가 많다.
변환함수(또는 클래스)로 묶으면 이런 함수들을 쉽게 찾아 쓸 수 있다.

## 절차
1. 변환할 레코드를 입력받아서 값을 그대로 반환하는 변환 함수를 만든다.
 -> 이 작업은 대ㅔ로 깊은 복사로 ㅓ리해야한다. 변환 함수가 원본 레코드를 바꾸지 ㅇ낳는지 검사하는 테스트를 마련해두면 두움될 떄가 많다.
2. 묶을 함수 중 함수 하나를 골라서 본문 코드를 변환함수로 옮기고, 처리 결과를 레코드에 새 필드로 기록한다. 그런다음 클라이언트 코드가 이 필드를 사용하도록 수정한다.
 -> 로직이 복잡하면 함수 추출하기 부터 한다.
3. 테스트 한다.
4. 나머지 관련함수도 위 과정을 따라한다.

## 예시
서민에게 차를 수돗물처럼 제공하는 서비스가 있다.
이 서비스는 매달 사용자가 마신 차의 양을 측정(reading)해야한다.

reading = {customer: "ivan", quantity: 10, month:5, year: 2017};

코드 곳곳에서 다양한 방식으로 차 소비량을 계산한다고 해보자.
그중 사용자에게 요금을 부과하기 위해 기본 요금을 계산하는 코드도 있다.

<!-- 클라이언트 1 -->
const aReading = acquireReading();
const baseCharge = baseRate(aReading.month, aReading.year) * aReading.quantity;


세금을 부과할 소비량을 계산하는 코드도 필요하다. 모든 시민이 차 세금을 일부 면제받을 수 있도록 정부가 사려깊게 설계하여 이 값을 기본 소비량보다 적다.
<!-- 클라이언트 2 -->
const aReading = acquireReading();
const base = (baseRate(aReadint.month, aReading.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));


이 코드에는 이와 같은 계산 로직들이 여러 곳에ㅓ 반본된다고 해보자.
중복 코드는 나중에 로직을 수정할 때 ㄱㄹ치를 썩인다(장담하건대 반드시 수정할 일이 생긴다.).
중복코드라면 함수 추출하기로 처리할 수 도 있지만, 추출한 함수들이 프로그램 곳곳에 픝어져서 나중에 프로그래머가 그런함수가 있는지조차 모르게 될 가능성이 있다.
실제로도 다른곳에서 함수로 만들어둔 것을 발견했다.
<!-- 클라이언트 3 -->
const aReading = acquireReading();
const basicChargeAmount = calculateCharge(aReading);

function calculateCharge(aReading) {
  return baseRate(aReadint.month, aReading.year) * aReading.quantity;
}

이를 해결하는 방법으로 다양한 파생 정보 계산 로직을 모두 하나의 변환 단계로 모을 수 있다.
변환단계에서 미가공 측정값을 입력받아서 다양한 가공 저보를 덧붙여 반환하는 것이다.
1. 우선 입력 객체를 그대로 복사해 반환하는 변환함수를 만든다.
function enrichReading(original) {
  const result = _.cloneDepp(original);
  return result;
}

깊은 복사는 lodash라이브러리가 제공하는 cloneDeep()으로 처리했다ㅣ.
** 참고로 나는 본질은 같고 부가 정보만 덧붙이는 변환함수의 이름을 "enrich"라 하고, 형태가 변할 때만 "transform"이라는 이름을 붙인다.

2. 이제 변경하려는 계산로직 중 하나를 고른다. 먼저 이 계산 로직에 측정값을 전달하기 전에 부가 정보를 덧붙이도록 수정한다.
<!-- 클라이언트 3 -->
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = calculateBaseCharge(aReading);

<!-- calculateBaseCharge()를 부가 정보를 덧붙이는 코드 근처로 옮긴다. -->
function enrichReading(original) {
  const result = _.cloneDepp(original);
  result.basicCharge = calculateBaseCharge(result);
  return result;
}

변환 삼후 안에서는 결과 객체를 매번 복제할 필요 없이 마음껏 변경해도 된다.
나느 불변 데이터를 선호하지만 널리 사용되는 언어는 대부분 불변 데이터를 다루기 어렵게 돼있다.
데이터가 모듈 경계를 넘다든다면 어려움을 기꺼이 감내하며 불변으로 만들어 사용하겠지만,
데이터의 유효범위가 좁을 떄는 마음껏 변경한다.
또한 나는 변환 함수로 옮기긱 위운 이름을 분ㅌ인다.(여기서는 보강된 값을 담은 변수의 이름을 aReading이라고 지었다.)

이어서 이 함수를 사용하는 클라이언트가 부가정보를 담은 필드를 사용하도록 수정한다.
<!-- 클라이언트 3 -->
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const basicChargeAmount = aReading.basicCharge;

calculateBaseCharge()를 호출하는 코드를 모두 수정했다면, 이 함수를 enrichReading()안에 중첩시킬수 있다.
그러면 '기본요금을 이용하는 클라이언트는  변환된 레코드를 사용해야 한다'는 의도를 명확히 표현할 숭 ㅣㅆ다.

여기서 주의할 점이 있다.
enrichReading()처럼 정보를 추가해 반환할 때 원본 측정값 레코드는 변경하지 않아야 한다는 것이다.
따라서 이를 확인하는 테스트를 작성해두는 것이 좋다.

<!-- 테스트 코드 -->
it('check readint unchanged', function() {
  const baseReading = {customer: "ivan", quantity: "15", month: 5, year: 2017};
  const oracle = _.cloneDeep(baseReading);
  enrichReading(baseReading);
  assert.deeEqual(baseReading, oracle);
});


그런 다음 클라이언트 1도 이 필드를 사요하도록 수정한다.
<!-- 클라이언트 1 -->
cosnt rawReading= acquireReadint();
const aReading = enrichReading(rawReading);
const baseCharge = aReading.baseCharge;

이때 baseCharge변수도 인라인 하면 좋다.

4. 이제 세금을 부과할 소비량 계산으로 넘어가자. 가장 먼저 변홤 함수부터 끼워 넣는다.
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const base = (baseRate(aREading.month, aReadint.year) * aReading.quantity);
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

여기서 기본 요금을 계산하는 부분을 앞에서 새로 만든 필드로 겨체할 수 있다. 계산이 복잡하다면 함수 추출하기부터 하겠으나 여기서는 복잡하지 않으니 한 번에 처리하겠다.
const rawReading = acquireReading();
const aReading = enrichReading(rawReading);
const base = aReading.baseCharge;
const taxableCharge = Math.max(0, base - taxThreshold(aReading.year));

테스트해서 문제가 없다면 base변수를 인라인한다.
const rawReadint = acquireReading();
const aReading = enrichReading(rawRaeding);
const taxableCharge = Math.max(0, aReading.baseCharge - taxThreshold(aReading.year));

그런 다음 계싼 코드를 변환함수로 옮긴다.
function enrichReading(original) {
  const result = _.cloneDepp(original);
  result.basicCharge = calculateBaseCharge(result);
  result.taxableCharge = Math.max(0, result.baseCharge - taxThreshold(result.year));
  return result;
}

이제 새로 만든 필드를 사용하도록 원콘 코드를 수정한다.
const rawReadint = acquireReading();
const aReading = enrichReading(rawRaeding);
const taxableCharge = aReading.taxableCharge;

**
측정값에 부가 정보를 추가하는 지금 방식에서 클라이언트가 데이터를 변경하면 심각한 문제가 생길수 잇다.
예컨대 사용량 필드를 변경하면 데이터의 일관성이 깨진다.

내 생각에 자바스크립트에서 이 문제를 방지하기 가장 좋은 ㅏㅂㅇ법은 여러 함수를 클래스로 묶기다.
불변 데이터 구조를 지원하는 언어라면 이런 문제가 생길 일이 없다.
따라서 이런 언어로 프로그래밍할 떄는 여러 함수를 변환함수로 묶기를 사용하는 비중이 높아진다.
하지만 불변성을 제공하지 않는 언어라도, 웹 페이지에 출력할 부가 데이터를 도출할 떄처럼
데이터가 읽기전용 문맥에서 사용될 ㅒㄸ는 변환방식을 활용할 수 있다.
==> 만약 basicCharge를 계산하는 로직이 바뀐다면, taxableCharge도 예기치 않게 변경될 수 있다는 의미인 것 같다.
