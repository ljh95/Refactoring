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
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;
  
  for(let perf of invoice.performances) {
    result += `  ${playFor(perf).name}: ${usd(getThisAmount(perf))} (${perf.audience}석)\n`;
  }

  result += `총액: ${usd(totalAmount(invoice))}\n`;
  result += `적립 포인트: ${totalVolumeCredits(invoice)}점\n`;
  return result;


  function usd(aNumber) {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", minimumFractionDigits: 2}).format(aNumber / 100);
  }

  function getThisAmount(aPerformance) {
    let thisAmount = 0;

    switch (playFor(aPerformance).type) {
      case "tragedy": // 비극
        thisAmount = 40000;
        if(aPerformance.audience > 30) {
          thisAmount += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        thisAmount = 30000;
        if(aPerformance.audience > 20) {
          thisAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        thisAmount += 300 * aPerformance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }

    return thisAmount;
  } 

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;

    volumeCredits += Math.max(aPerformance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if("comedy" === playFor(aPerformance).type) volumeCredits += Math.floor(aPerformance.audience / 5);

    return volumeCredits;
  }

  function totalVolumeCredits(invoice) {
    return invoice.performances.reduce((total, p)=> total + volumeCreditsFor(p), 0);
  }

  function totalAmount (invoice) {
    return invoice.performances.reduce((total, p) => total + getThisAmount(p), 0);
  }
}


console.log(statement(invoices, plays));