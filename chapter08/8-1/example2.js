// 예시: 다른 클래스로 옮기기
//  이번엔 함수 옮기기 리팩터링의 다채롬움을 보여주기 위한 예를 준비했다.

{
  class Account {
    
    get bankCharge() {
      let result = 4.5;
      if(this._dayOverdrawn > 0) result += this.overdraftCharge;
      return result;
    }

    get overdraftCharge() {
      if(this.type.isPremium) {
        const baseCharge = 10;
        if(this.daysOverdrawn <= 7) 
          return baseCharge;
        else return baseCharge + (this.daysOverdrawn - 7) * 0.85;
      }
      else  
        return this.daysOverdrawn * 1.75;
    }
  }
}

/**
 * 이제부터 계좌 종류에 따라 이자 책정 알고리즘이 달라지도록 고쳐보자.
 * 그러려면 
 */