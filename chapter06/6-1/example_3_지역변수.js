function printOwing(invoice) {
  
  printBanner();
  
  // 미해결 채무(outstanding)을 계산한다.
  let outstanding = calculateOutstanding(invoice);

  recordDueDate(invoice);
  printDetails(invoice, outstanding);
}

function calculateOutstanding(invoice) {
  let result = 0;
  for (const o of invoice.orders) {
    result += o.amount;
  }
  return result;
}

function recordDueDate(invoice) {
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);
}

function printDetails(invoice, outstanding) {
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
  console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
}

function printBanner() {
  console.log("*********************");
  console.log("****** 고객 채무 ******");
  console.log("*********************");
}
/**
 * 예시 지역변수의 값을 변경할 때
 * 지역변수에 값을 대입하게 되면 문제가 복잡해진다.
 * 지금은 임시 변수만을 취급하겟다.
 * 만약 매개변수에 ㄱ밧을 대입하는 코드를 발견하면 곧바로 그 변수를 또개서 임시 변수를 새로 하나 만들어 그 변수에 대입하게 한다.
 * 
 * 대이;ㅁ 대상이 된는 임시 변수는 크게 두 가지로 나눌 수 있다.
 * 먼저 간단한 경우 변수가 추출된 코드 안에서만 사용될 때다.
 * 즉 이 변수는 추출된 코드 안에서만 존재한다.
 * 만ㄴ약 변수가 초기화되는 지점과 실제로 사용되는 지점이 떨어져 있다면 문자 슬아이드 하기 를 활용하여 변수 저작을 모두 한 곳에
 * 처리하도록 모아두면 편하다.
 * 
 * 이보다 특이한 경우는 변수가 추ㅜㄹ한 함수 밖에서 사용될 ㅒㄸ다.
 * 이럴 때는 변수에 대입된 새 값을 반환해야 한다.
 * 
 */

/**
 * 값을 반환할 변수가 여러개라면?
 * 
 * 방법이 몇가지 존재
 * 나는 주로 추출할 코드를 다르게 재구성하는 방향으로 처리
 * 개인적으로 함수가 값 하나만 반환하는 방식을 선호
 * 
 * 굳이 한 함수에서 여러 값을 반환해야한다면 값들을 레코드로 묶어서 반환해도 되지마느,
 * 임시 변수 추출 작업을 다른 방식으로 처리하는 것이 나을 떄가 많다.
 * 
 * 임시 변수를 질의 함수로 바꾸거나, 변수를 쪼개는 식으로 처리하면 좋다.
 * 
 * 추출한 함수를ㄹ 최상위 수준 같은 다른 문맥으로 이동하려면 어떻게 해야할까?
 * 나는 단계를 작게 쪼개는걸 좋아하기 떄문에 내 본능은 먼저 중첩함수로 추출하고 나서 ㄱ새로운 문맥으로 옮기라고 말한다.
 * 하지만 이렇게 하면 변수를 처리하기 까다로울 수 있는데
 * 실제로 문맥을 옮겨보기 전에는 알지 못한다.
 * 따라서 정첩함수로 추출할 수 있더라도 최소한 원본 함수와 같은 수준의 문맥으로 먼저 추출해보자.
 * 그러면 코드를 제대로 추출했는지 즉ㅈㄱ 판별할 수 있다.
 */