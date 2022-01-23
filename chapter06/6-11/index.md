# 6.11 단계쪼개기

<!-- Before -->
const orderData = orderString.split(/\s+/);
const productPrice = priceList[orderData[0].split("-")[1]];
const orderPrice = parseInt(orderData[1]) * productPrice;

<!-- After -->
const orderRecord = parseOrder(order);
const orderPrice = price(orderRecord, priceList);

function parseOrder(aString) {
  const values = aString.split(/\s+/);
  return ({
    productID: values[0].split("-")[1],
    quantityL parseInt(values[1]),
  });
}
function price(order, priceList) {
  return order.quantity * prieList[order.productID];
}

## 배경
나는 서로 다른 두 대상을 한꺼번에 다루는 코드를 발견하면 각각을 별개모듈로 나눈는 방법을 모색한다.
코드를 수정해야할 때 두 대상을 동시에 생각할 필요 없이 하나에만 집중하기 위해서다.
모듈이 달 분리되어 있다면 다른 모듈의 상세 내용은 정혀 기억하지 못해도 원하는 대로 수정을 끝마칠 수도 있다.

이렇게 분리하는 가장 간편한 방법은 하나는 동작을 연이은 두 단계로 쪼개는 것이다.
일벽이 처리 로직에 적합하지 않은 형태로 들어오는 경우를 예로 생각해보자.
이럴 때는 본 작업에 들어가기 전에 입력값을 다루기 편한형태로 가공한다.
아니면 로직을 순차적인 단계들로 분리해도 된다.
이때 각 단곈,ㅡㄴ 서로 확연히 다른 일을 수행해야 한다.

가장 대표적인 예는 컴파일러다ㅣ.
컴파일러는 기본적으로 어떤 텍스특(프로그래밍언어로 작성된 코드)를 입력받아서 실행 가능한 형태(예컨대 특정 하드웨어에 맞는 목적 코드 object code)로 변환한다.
컴파일러의 역사가 오래되다 보니 사람들은 커파일 작업을 여러 단계가 순차적으로 연결된 형태로 분리함녀 돟다는 사실을 꺠달았다ㅣ.
즉, 텍스트를 토큰화하고, 토큰을 파싱해서 구문트리를 만들고, (최적화 등) 구문 트리를 변환하는 다양한 단계를 건친 다음, 
마지막으로 목적 코드르 ㅅ애성하는 식이다.
각 단계는 자신만의 문제에 집중하기 떄문에 나머지 단계에 관해서는 자세히 몰라도 이해할 수 있다.
이렇게 단계를 쪼개는 기법은 주로 던치 큰 소프트웨어에 적여ㅛ오딘다.
가령 컴파일러의 매 단계는 다수의 함수와 클래스로 구성된다. 하지만 나는 규모에 관걔없이 뎌러 단계로 분리하면 좋을만한 코드를 발견할 떄 마다 기본적인 단꼐 쪼갸ㅐ끼 리팩터리을 한다.
다른 단계ㅒ로 볼 수 잇는 코드 영역들이 마침 서로 다른 데이터와 함수를 ㅏ용한다면 단계 쪼개기에 적합하다는 뜻이다.
이 코드 영역들로 별도 모듈로 분리하면 그 차이를 코드에서 훨씬 분명하게 드러낼 수 잇다.

## 절차
1. 두 번째 단계에 해당하는 코드를 도기랍함수로 추출한다.
2. 테스트한다.
3. 중단 데이터 구조를 만들어서 앞에서 추출한 함수의 인수로 추가한다.
4. 테스트한다.
5. 추출한 두 번째 단계 함싀 매개변수 하나씩 검토한다. 그중 첫 번째 단계에서 사여ㅛㅇ되는 것은 중단 데이터 구조로 옮긴다. 하나씩 옮길 때 마다 테스트한다.
-> 간혼 두 번째 단계에서 사용하면 안 되는 매개변수가 있다. 이럴 떄는 각 매개변수를 사용한 결과를 중간 데이터 구조의 필드로 추출하고, 이 필드의 값을 설정하는 무장을 호출한 곳으로 옮긴다.
6. 첫 번쨰 단계 코드를 함수로 추출하면서 중간 데이터 구조를 밪ㄴ화하도록 만든다.
-> 이때 첫 번째 단계를 변환기 객ㄱ체로 추출해도 좋다.

## 예시
<!-- 상품의 결제 금액을 계산하는 코드로 시작해보자. -->
function priceOrder(pruduct, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRat;
  const shippingPerCase = (basePrice > shippingMethod.discountThreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  cosnt shippingCose = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCose;
  return price;
}

간단한 예지만 가만 보면 계산이 두 단계로 이뤄짐을 알 수 있다 
앞의 몇 줄은 상품 정보를 이용해서 결제 금액 중 상품 가격을 계산한다
반면 뒤의 코드는 배성 정보를 이용하여 결제 금액중 배송비를 계산한다.
나중에 상품 가격과 배송비 계산을 더 복잡하게 만드는 변경이 생기나면 (기뵤적 서로 돍립적으로 처리할 숭 ㅣㅆ으므로)
이 코드는 두 단계로 나누는 것이 좋ㄴ다.

<!-- 1. 먼저 배송시 계산 부분을 함수로 추출한다. -->

function priceOrder(product, quantity, shippingMethod) {
  const basePrice - product.basePrice * quantity;
  const discount - Math.max(quantity - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  const price = applyShipping(basePrice, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase = (basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}

<!-- 두 번쨰 단계에 필요한 데이터를 모두 개별 매개변수로 전다ㄹ했다.
실전에서는 이런 데이터가 상당히 만을 수 있는데, 어찰피 ㄷ나중에 설러내기 때문에 걱정할 필요 없다.

3. 다음으로 첫 번째 단계와 두 번째 단계가 주고받은 중간 데이터 구종를 만든다. -->
function priceOrder(product, quatity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Matjh.max(quanttiy - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  cosnt priceData = {};
  const price = applyShipping(priceData, basePrice, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(priceData, basePrice, shippingMethod, quantity, discount) {
  const shippingPerCase = (basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = basePrice - discount + shippingCost;
  return price;
}

<!-- 5. 이데 applyShipping()에 전달되는 다양한 매개변수를 살펴보자. 이중 basePrice는 첫 번째 단계를 수행하는 코드에서 생성된다.
따라서 중간 데이터 구조로 옮기고 매개변수 목록에서 제거한다. -->
function priceOrder(product, quatity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Matjh.max(quanttiy - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  cosnt priceData = {basePrice: basePrice};
  const price = applyShipping(priceData, shippingMethod, quantity, discount);
  return price;
}

function applyShipping(priceData, shippingMethod, quantity, discount) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = quantity * shippingPerCase;
  const price = priceData.basePrice - discount + shippingCost;
  return price;
}

<!-- 다음으로 shippingMethod를 보자. 이 매개변수는 첫 번째 단계에서는 사용하지 않으니 그대로 둔다.

그 다음 나오는 quantity는 첫 번째 단계에서 사용하지만 거기서 생성된 것은 아니다. 그래서 그냥 매개변수로 놔둬도 된다.
하지만 나는 최대한 중간 데이터 구조에 담는 걸 선호하기 때뭉네 이 매개변수로 도 옮긴다. -->
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Matjh.max(quanttiy - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  cosnt priceData = {basePrice: basePrice, quantity: quantity};
  const price = applyShipping(priceData, shippingMethod, discount);
  return price;
}

function applyShipping(priceData, shippingMethod, discount) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - discount + shippingCost;
  return price;
}

<!-- discount도 같은 방법으로 처리한다. -->
function priceOrder(product, quantity, shippingMethod) {
  const basePrice = product.basePrice * quantity;
  const discount = Matjh.max(quanttiy - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  cosnt priceData = {basePrice: basePrice, quantity: quantity, discount: discount};
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}

<!-- 매개변수들을 모두 처리하면 중간 데이터 구조가 완성된다.
6 이제 첫 번째 단계 코드를 함수로 추출하고 이 데이터 구조를 반환하게 한다. -->
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  const price = applyShipping(priceData, shippingMethod);
  return price;
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount = Matjh.max(quanttiy - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  return {basePrice: basePrice, quantity: quantity, discount: discount};
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  const price = priceData.basePrice - priceData.discount + shippingCost;
  return price;
}

<!-- 나는 최종 결과를 담은 상수를 price도 깔끔하게 정리해야 속이 시원하다. -->
function priceOrder(product, quantity, shippingMethod) {
  const priceData = calculatePricingData(product, quantity);
  return applyShipping(priceData, shippingMethod);
}

function calculatePricingData(product, quantity) {
  const basePrice = product.basePrice * quantity;
  const discount = Matjh.max(quanttiy - product.discountThreshold, 0) * product.basePrice * product.discountRate;
  return {basePrice: basePrice, quantity: quantity, discount: discount};
}

function applyShipping(priceData, shippingMethod) {
  const shippingPerCase = (priceData.basePrice > shippingMethod.discountTHreshold) ? shippingMethod.discountedFee : shippingMethod.feePerCase;
  const shippingCost = priceData.quantity * shippingPerCase;
  return priceData.basePrice - priceData.discount + shippingCost;
}