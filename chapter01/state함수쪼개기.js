const invoices = {
  "customer": "BigCo",
  "performances": [
    {
      "playID": "hamlet",
      "audience": 55
    },
    {
      "playID": "as-like",
      "audience": 35
    },
    {
      "playID": "othello",
      "audience": 40
    }
  ]
};

const plays = {
  "hamlet": {
    "name": "Hamlet", 
    "type": "tragedy"
  },
  "as-like": {
    "name": "As You Like It",
    "type": "comedy"
  },
  "othello": {
    "name": "Othello", 
    "type": "tragedy"
  }
};

function statement(invoice, plays){
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);

  return renderPlainText(statementData, plays)
  
  function renderPlainText(data, plays) {
    let result = `청구 내역 (고객명: ${data.customer})\n`;
    
    for(let perf of data.performances) {
      result += `  ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`;
    }
  
    result += `총액: ${usd(totalAmount())}\n`;
    result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    return result;


    function totalAmount() {
      let result = 0;
      for(let perf of invoice.performances) {
        result += amountFor(perf, playFor(perf));
      }
      return result;
    }
  }

  function volumeCreditsFor(aPerformance) {
    let result = 0;
    result += Math.max(aPerformance.audience - 30, 0);

    if("comedy" === playFor(aPerformance).type) result += Math.floor(aPerformance.audience / 5);
    return result;
  }

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance); // 얕은 복사
    result.play = playFor(result); // 중간 데이터에 연극정보를 저장
    result.amount = amountFor(result);
    return result;
  }

  
  function amountFor(aPerformance) { // 값이 바뀌지 않는 변수는 매개변수로 전달
    let result = 0; // 함수의 반환값에는 항상 resultfk gksek.
  
    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
        result = 40000;
        if(aPerformance.audience > 30) {
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if(aPerformance.audience > 20) {
          result += 10000 + 500 * (aPerformance.audience - 20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
  
    return result; // 함수 안에서 값이 바뀌는 변수 반환
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", { 
      style: "currency", 
      currency: "USD", 
      minimumFractionDigits: 2
    }).format(aNumber / 100);
  }

  function totalVolumeCredits() {
    let result = 0;
    for(let perf of invoice.performances) {
      result += volumeCreditsFor(perf);
    }
    return result;
  }
}



console.log(statement(invoices, plays));