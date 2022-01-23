{
  const organization = {name: "name", country: 'GB'};
  
  result += `<h1>${organization.name}</h1>`
  organization.name = "newName"
}

{
  // 1. 캡슐화하기
  function getRawDataOfOrganization() { return organization }
  // 그러면 읽고 쓰는 코드는 다음처럼 바뀐다.
  result += `<h1>${getRawDataOfOrganization().name}</h1>`
  getRawDataOfOrganization().name = "newName";

}

{
  /**
   * 그런데 방금 변수 캡슐화하기 를 정식으로 따르지 않과, 게터를 찾기 쉽도록 의도적으로 이상한 이름을 붙였다. 이 게터는 임시로만 사용할 것이기 ㅒㄸ문이다.
   * 레코드를 캡슐화하는 목적은 변수 자체는 물로 그내용을 조작하는 방시곧 통제하기 위해서다.
   * 이렇게하려면 레코드를 클래스로 바꾸고 새 클래스의 인스턴스로 반환하는 함ㄱ수를 개로 마늗ㄴ다.
   * 
   */
  
  class Organization {
    constructor(data){
      this._data = data;
    }
  }

  const organization = new Organization({name: "name", country: 'GB'});
  function getRawDataOfOrganization() { return organization.data }
  function getOrganization() {return organization }
}
//  객체로 만다는 작업이 끝났으니 레코드를 ㅏㅅ용하던 코드를 사ㄹ펴보자 레코드를 갱신하던 코드는 ㅗㅁ두 세터를 사용하도록 고친다.


