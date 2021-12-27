function printOwing(invoice) {
  printBanner();
  let outstanding = calculateOutstanding();

  // 세부사항 출력
  console.log(`고객명: ${invoice.customer}`);
  console.log(`채무액: ${outstanding}`);
}

