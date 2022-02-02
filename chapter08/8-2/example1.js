//  다음은 고객 클래슨 Customer와 계약 클래슨 CustomerContract에서 시작하자.

{
  class Customer{
    constructor(name, discountRate) {
      this._name = name;
      this._discountRate = discountRate;
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() { return this._discountRate };
    becomePreferred() {
      this._discountRate += 0.03;
      //  다른 멋진 일들
    }
    applyDiscount(amount) {
      return amount.subtract
      (amount.multiply(this._discountRate));
    }
  }

  class CustomerContract{
    constructor(startDate) {
      this._startDate = startDate;
    }
  }
}
/**
 * 여기서 할인율을 뜻하는 discountRate 필들르 Custtomer에서 CustomerContract로 옮기고 싶다고 해보자.
 * 1. 가장 먼저 할일은 이 필드를 캡슐화하는 것이다.(6.6 변수 캡슐화하기)
 */

{
  class Customer{
    constructor(name, discountRate) {
      this._name = name;
      // this._discountRate = discountRate;
      this._setDiscountRate(discountRate);
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() { return this._discountRate };
    _setDiscountRate(aNumber) { this._discountRate = aNumber;}
    becomePreferred() {
      // this._discountRate += 0.03;
      this._setDiscountRate(this.discountRate + 0.03);
      //  다른 멋진 일들
    }
    applyDiscount(amount) {
      return amount.subtract
      (amount.multiply(this.discountRate));
    }
  }
}

/**
 * 할인율을 수정하는 public 세터를 만들고 싶지는 않아서 세터 속성이 아니라 메서드를 이용했다.
 * 
 * 3. 이제 CustomerContract 클래스에 필드 하나와 접근자들을 추가한다.
 */

{
  class Customer{
    constructor(name, discountRate) {
      this._name = name;
      // this._discountRate = discountRate;
      this._setDiscountRate(discountRate);
      this._contract = new CustomerContract(dateToday());
    }

    get discountRate() { return this._discountRate };
    _setDiscountRate(aNumber) { this._discountRate = aNumber;}
    becomePreferred() {
      // this._discountRate += 0.03;
      this._setDiscountRate(this.discountRate + 0.03);
      //  다른 멋진 일들
    }
    applyDiscount(amount) {
      return amount.subtract
      (amount.multiply(this.discountRate));
    }
  }

  class CustomerContract{
    constructor(startDate, discountRate) {
      this._startDate = startDate;
      this._discountRate = discountRate;
    }

    get discountRate() {return this._discountRate;}
    set discountRate(arg) {this._discountRate = arg;}
  }
}

/**
 * 6. 그런 다음 Customer의 접근자들이 새로운 필드를 사용하도록 수정한다. 
 * 다 수정하고 나면 "Cannot set property 'discountRate' of undefined"라는 오류가 날것이다.
 * ("discountRate" 속성을 정의도지 않았으므로 설정할 수 없습니다. 라는 뜻이다.)
 * 생성자에서 Contractyt객체를 생성하기도 전에 _setDiscountRate()를 호출하기 때문이다.
 * 이 오류를 고치려면 먼저 기존상태로 되돌린 다음, 문장 슬라이드라기를 적용해 
 * _setDiscountRate() 호풀을 계약 생성 뒤로 옮겨야한다.
 */


{
  class Customer{
    constructor(name, discountRate) {
      this._name = name;
      this._contract = new CustomerContract(dateToday());
      this._setDiscountRate(discountRate);
    }
  }
}

// 테스트에 성공하면 접근자들을 다시 수정하여 개로운 계약 인스턴스를 사용하도록 한다.

{
  class Customer{
    constructor(name, discountRate) {
      this._name = name;
      this._contract = new CustomerContract(dateToday());
      this._setDiscountRate(discountRate);
    }

    get discountRate() { return this._contract.discountRate;}
    _setDiscountRate(aNumber) { this._contract.discountRate = aNumber;}
  }
}
// 8. 자바스크립트를 사용하고 있으므로 소스 필드를 미리 선언할 필요는 없었다.ㄴ 그래서 제거해야할 것도 없다.

