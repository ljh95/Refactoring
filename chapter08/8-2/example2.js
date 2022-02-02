// 예시 공유 객체로 이동하기
//  다른 사례를 보자. 다음 코드는 이자율을 계좌별ㄹ 설정하고 잇다.

{
  class Account{
    constructor(number, type, interestRate){
      this._number = number;
      this._type = type;
      this._interestRate = interestRate;
    }

    get interestRate() {return this._interestRate}
  }

  class AccountType{
    constructor(nameString) {
      this._name= nameString;
    }
  }
}
/**
 * 아 코드를 수정하여 이자율이 계좌 종류에 따라 정해지도록 하려고 한다.
 * 
 * 1. 이자율 필드는 이미 잘 캡슐화되어 있으니
 * 3. 가볍게 타깃인 AccountType에 이자울 필드와 필요한 접근자 메서드를 생성해보자.
 */

{
  class AccountType{
    constructor(nameString, interestRate) {
      this._name= nameString;
      this._interestRate = interestRate;
    }

    get interestRate() {return this._interestRate}
  }
}

/**
 * 4. 그런데 Account가 AccountType의 이자우ㅠㄹ을가ㅣ져오도록 수정하면 문제가 생길 수 있다.
 * 
 * 이 리팩터링 전에는 각 계좌가 자신만의 이자율을 갖고 있었고, 
 * 지금은 종류가 같은 모드 계좌가 이자율을 공유하기를 원한다.
 * 
 * 만약 수정 전에도 이자율이 계좌 종류별로 같게 설정되어 있었다면 겉보기 동작이 달라지지 않으니 그대로 리팩터링하면 된다.
 * 
 * 하지만, 이자유ㅜㄹ이 다른 계좌가 하나라도 있었다면, 이건 더이상 리팩터링이 아니다.
 * 
 * 수정 전과 후의 겉보기 동작이 달라지기 때문이다.
 * 따라서 계좌 데이터를 데이터 베이스에 보관하다면 먼저 데이터베이스를 확인해서 모든 계좌의 이자율이 계좌 종류에 부합하게 설정되어 있느닞 확인해야한다.
 * 계좌 클래스에 어서션을 추가하는것도 도ㅓ움이된다.
 */

{
  class Account{
    constructor(number, type, interestRate){
      this._number = number;
      this._type = type;
      assert(interestRate === this._type.interestRate)
      this._interestRate = interestRate;
    }

    get interestRate() {return this._interestRate}
  }
}
/**
 * 이와 같이 어서션을 적용하 채 시스,템을 잠시 운영해보며 오루가 생기는지 지켜보는 것이다.
 * 어서션을 추가하는 대신 문제 살생 시 로깅하는 방법도 있다.
 * 6. 시스템 겉보기 동작이 달라지지 않는다는 확신이 서면 이사중리 가져오는 부분을 변경하고
 * 8. Account에서 이자율을 직접 수정하더 코드를 완전히 제거한다.
 */
{
  class Account {
    constructor(number, type){
      this._number = number;
      this._type = type;
    }

    get interestRate() {return this._type.interestRate;}
  }
}