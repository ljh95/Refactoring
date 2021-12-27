/**
 * 
 * 여기서 Clock,today는 내가 Clock Wrapper라고 부르는 것으로 시스템 시계를 감싸는 객체다.
 * 나는 Date.now()처럼 시스템 시간을 알려주는 함수는 직접 호출하지 않는다.
 * 직접 호출하면 테스트할 때마다 결과가 달라져서 오류 상황을 재현하기가 어렵기 때문이다.
 * 배너를 출력하는 코드는 다음과 같이 간단히 추출할 수 이ㅏㅆ다.
 */
function printOwing(invoice) {
  let outstanding = 0;

  printBanner();

  // 미해결 채무(outstanding)을 계산한다.
  for(const o of invoice.orders) {
    outstanding += o.amount;
  }

  // 마감일(dueDate)을 기록한다.
  const today = Clock.today;
  invoice.dueDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 30);

  // 세부사항을 출력한다.
  printDetails();

  function printDetails() {
    console.log(`고객명: ${invoice.customer}`);
    console.log(`채무액: ${outstanding}`);
    console.log(`마감일: ${invoice.dueDate.toLocaleDateString()}`);
  }
}

function printBanner() {
  console.log("*********************");
  console.log("****** 고객 채무 ******");
  console.log("*********************");
}
/**
 * 여기까지만 보면 함수 추출 리팩터링이 너무 간단하다고 여길 수 있다.
 * 하지만 더 까다로울 떄가 많다.
 * 여기서 printDetails가 printOwing에 중첩되도록 정의했다.
 * 이렇게 하면 추출한 함수에서 printOwing에 정의된 모든 변수에 접근할 수 있다.
 * 하지만 중첩함수를 지원하지 않는 언어에서는 불가능한 방법
 * 그럴 떄는 함수를 최상위 수준으로 추출하는 문제로 볼 수 있다.
 * 따라서 우너본 함수에서만 접근할 수 잇는 변수들에 특별히 더 신경써야 한다.
 * 원본 함수으ㅟ ㅇ니수나 그 함수 안에서 정의된 임시 변수가 여기 해당한다.
 */