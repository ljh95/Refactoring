export default function createStatementData(invoice, plays) {
  const result = {};
  result.customer = invoice.customer;
  result.performances = invoice.performances.map(p => enrichPerformance(p));
  result.totalVolumeCredits = totalVolumeCredits(result);
  result.totalAmount = totalAmount(result);
  return result;

  function enrichPerformance(aPerformance) {
    const result = Object.assign({}, aPerformance);
    result.play = playFor(result);
    result.volumeCredits = volumeCreditsFor(result)
    result.amount = getThisAmount(result);
    return result;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }
}


function totalAmount (data) {
  return data.performances.reduce((total, p) => total + p.amount, 0);
}

function totalVolumeCredits(data) {
  return data.performances.reduce((total, p)=> total + p.volumeCredits, 0);
}

function volumeCreditsFor(aPerformance) {
  let volumeCredits = 0;

  volumeCredits += Math.max(aPerformance.audience - 30, 0);
  // 희극 관객 5명마다 추가 포인트를 제공한다.
  if("comedy" === aPerformance.play.type) volumeCredits += Math.floor(aPerformance.audience / 5);

  return volumeCredits;
}

function getThisAmount(aPerformance) {
  let thisAmount = 0;

  switch (aPerformance.play.type) {
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
      throw new Error(`알 수 없는 장르: ${aPerformance.play.type}`);
  }

  return thisAmount;
} 