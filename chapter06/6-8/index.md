# 6.8 매개변수 객체 만들기

<!-- Before -->
function amountInvoiced(startDate, endDate) { ... }
function amountReceived(startDate, endDate) { ... }
function amountOverdue(startDate, endDate) { ... }

<!-- After -->
function amountInvoiced(aDateRange) { ... }
function amountReceived(aDateRange) { ... }
function amountOverdue(aDateRange) { ... }

## 배경
데이터 항목 여러개가 이 함수에서 저 함수로 함께 몰려다니는 경우를 자주 본다.
나는 이ㅓㄹㄴ 데이터 무리를 발견하면 데이터 구조 하나로 모아주곤한다.

데이터 뭉치를 데이터 구조로 묶으면 데이터 사이의관계가 명확해진다는 이점을 얻는다.
게다가 함수가 이 데이터 구조를 받게 하면 매개변쑤가 줄어든다.
같은 데이터구조를 사용하는 모든 함수가 원소를 참조할 떄 항상 똑같은 이름을 사용하기 떄문에 일관성도 높여준다.

하지만 이 리팩터링의 지정한 힘은 코드를 더 ㄱ,ㄴ본적으로 바꿔준다는데 있다.
나는 이런 데이터 구조를 발견하면 이 데이터 구조를 활용하는 형태로 프로그램 동작을 대구성한다.
데이터 구조를 담기ㄹ 데이터에 공통으로 걱용되는 동작을 추출해서 함수로 만드는것이다.
(공용 함수를 나열하는 식으로 작성할 수도 있고, 이 함수들과 데이터를 합쳐 클래스로 만들 수도 있다.)
이 과정에서 새로 만든 데이터 구조가 문제 영역을 훨씬 간결하게 현한는 새로운 추상 개념으로 격상되면서 코드의 개념적인 그림을 다시 그릴 수동 있다. 
그러면 놀라웅ㄹ 정도로 강력한 효과를 낸다.
하지만 이 모든 것의 시작은 매개변수 개게 만들기 부터다.

## 절차
1. 적당한 데이터 구조가 아직 마령되어 잇지 않다면 새로 만든다.
 -> 개인적으로 클래스로 만드는 걸 선호한다. 나중에 동작까지 함께 묶기를 좋기 때문이다. 나는 주로 데이터 구조를 값 객체로 만든다.
2. 테스트한다.
3. 함수 선언 바꾸기로 새 데이터 구조를 매개변수로 추가한다.
4. 테스트 한다.
5. 함수 호출 시 새로운 데이터 구조 인스턴스를 넘기도록 수정한다. 하나씩 수정할 떄마다 테스트한다.
6. 기존 매개변수를 사용하던 코드를 새 데이터 구조의 원소를 사용하도록 바꾼다.
7. 다 바꿨다면 기존 매개변수를 제거하고 테스트한다.

## 예시
온도 특정값 배열에서 정상 작동 범위를 벗어난 것이 있느닞검사하는코드를 살펴보자.
오도 특정값을 표현하는 데이터는 다음과 같다.

const station = {
  name: "ZB1",
  readings: [
    { temp: 47, time: "2016-11-10 09:10"},
    { temp: 53, time: "2016-11-10 09:20"},
    { temp: 58, time: "2016-11-10 09:30"},
    { temp: 53, time: "2016-11-10 09:40"},
    { temp: 51, time: "2016-11-10 09:50"},
  ]
};

다음은 정상 범위를 벗어나 측정값을 찾는 함수다.
function readingsOutsideRange(station, min, max) {
  return station.readings.filter(r => r.temp < min || r.temp > max);
}

이 함수는 다음과 같이 호출될 수 있다.
<!-- 호출문 -->
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);

호출 코드를 보면 operationgPlan의 데이터 항목 두개를 쌍으로 가져와서 readingsOutsideRange()로 전달한다.
그리고 operatingPlan은 범위의 시작과 끝 이름을 readingsOutsideRange와 다르게 표현한다.
이와 같은 범위 라는 개념은 객체 하나로 묶어 표현하는게 나은 대표적인 예다
1. 먼저 묶은 데이터를 표현하는 클래스부터 선언하자.

class NumberRange {
  constructor(min, max) {
    this._data = {min: min, max: max};
  }
  get min() {return this._data.min;}
  get max() {return this._data.max;}
}

여기서는 기본 자바스킯트 개게가 아닌 클래스로 선언했는데,
이 리팩터링은 새로 생성한 개게로 동작까지 옮기는 더 큰 작업의 첫 단계로 수행될 떄가 많기 때문이다.
이 시나리오에는 클래스가 적합하므로 곧바로 클래스를 사용했다.
한편 갑 객체로 만들 가능성이 높기 ㅒㄸ문에 세터는 만들지 않는다.
내가 이 리팩터링을 할 떄는 대부분 값 객체를 만들게ㅐ 된다.

3. 그런다음 새로 만든 객체를 readingsOutsideRange()의 매개변수로 추가하도록 함수 선언을 바꾼다.
function readingsOutsideRange(station, min, max, range) {
  return station.readings.filter(r => r.temp < min || r.temp > max);
}

자바스크립트라면 호출문을 예전 상태로 둬도 되지만, 다른 언어를 사용할 떄는 다음고ㅓㅏ 같이 새 매개변수 자리에 널을 적어둔더ㅏ,.
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, null);

4. 아직까지 동작은 하나도 바꾸지 않았으니 테스트는 문제없이 통과할 것이다.
5. 이제 온도 범위를 객체형채로 전달하도록 호출문을 하나씩 바꾼다.
const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling, range);


6. 이제 기존 매배변수를 사용하는 부분을 변경한다. 최댓값부터 바꾸자.
function readingsOutsideRange(station, min, range) {
  return station.readings.filter(r => r.temp < min || r.temp > range.max);
}

const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
alerts = readingsOutsideRange(station, operatingPlan.temperatureFloor, range);

테스트 후 최솟값도 변경한다.
function readingsOutsideRange(station, range) {
  return station.readings.filter(r => r.temp < range.min || r.temp > range.max);
}

const range = new NumberRange(operatingPlan.temperatureFloor, operatingPlan.temperatureCeiling);
alerts = readingsOutsideRange(station, range);

## 진정한 값 객체로 거듭나기
앞서 운을 띄웠듯이 매개변수 그룹을 객체로 교체하는 일은 진짜 값진 작업의 준비단계일 분이다.
앞에서ㅓ럼 클래스로 만들어두면 관련 동작들을 이 클래스로 옮길 숭 있다는 이점이 생긴다.
이 예에서는 온도가 허용범위 안에 있는지 검사하는 메서드를 클래스에 추가할 수 있다.
function readingsOutsideRange(station, range) {
  return station.readings.filter(r => !range.contains(r.temp));
}

<!-- NumberRange 클래스 -->
contains(arg) { return (arg >= this.min && arg <= this.max);}

지금까지 한 작업은 여러가지 유용한 동작을 갖춘 범위(Range)클래스를 생성하기 위한 첫 단계다.
코드에 범위 개념이 필요함을 깨달았다면 최댓값과 쇠솟값 상을 사용하는 코드를 발견하 때마다 범위 객체로 바꾸자.
당장 opoeratingPlan의 tempperatureFloor, temperatureCeiling을 temperatureRage로 변경할수 있다.
이러한 값 쌍이 어떻게 사용ㅇ되는지 상펴보면 다른 유용한 동작도 범위 클래스로 옴ㄹ겨선 코드 베이스전반에서 값을 활용하는 방식을 간소화할수 있다.
자라면 지겆ㅇ한 값객체로 만들기 우해서값에 기반한 동치성 검사 메ㅓ드추터 추가할 것이다.
