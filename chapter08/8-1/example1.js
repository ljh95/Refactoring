// 예시: 중첩 함수를 최상위로 옮기기
//  GPS 추적 기록의 총 거리를 계산하는 함수로 시작해보자.
{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
  
    return {
      titme: totalTime,
      distance: totalDistance,
      pace: pace
    }
  
    function calculateDistance() {
      let result = 0;
      for (let i = 0; i < points.length; i++) {
        result += distance(points[i-1], points[i]);
      }
      return result;
    }
  
    function distance(p1, p2){ } // 두 지점의 거리 계산
    function radiance(degrees) {} // 라디안 값으로 변경
    function calculateTime() {} // 총 시간 계산
  }
}

/**
 * 이 함수에서 중첩 함수인 calculateDistance를 최ㅏㅇ위로 옴ㄹ겨서 추적거를 다른 정보와는 돌립적으로 계산하고 싶다.
 * 3. 가장 먼저 할일은 이 함수를 최상위로 복사하는것
 */

{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
  
    return {
      titme: totalTime,
      distance: totalDistance,
      pace: pace
    }
  
    function calculateDistance() {
      let result = 0;
      for (let i = 0; i < points.length; i++) {
        result += distance(points[i-1], points[i]);
      }
      return result;
    }
  
    function distance(p1, p2){ } // 두 지점의 거리 계산
    function radiance(degrees) {} // 라디안 값으로 변경
    function calculateTime() {} // 총 시간 계산
  }

  function top_calculateDistance() { // 최상위로 복사!
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      result += distance(points[i-1], points[i]);
    }
    return result;
  }
}

/**
 * 이처럼 함수를 복사할 떄 이름을 달리해주면 코드에서나 머릿속에서나 소스함수로ㅓ 타깃함수가 쉽게 구별된다.
 * 지금은 가장 적합한 이름을 고림ㄴ할 단계가 아니므로 임시로 지어ㅂ주면 된다.
 * 
 * 이 프로그래음은 ㅣㅈ금 상ㅇ태로도 동작은 하지만 내 정적 분석기는 불만을 토로한다.
 * 새 함수가 정의되지 ㅇ낳은 심벌(distance, points)를 사용하기 떄문이다.
 * points는 배개변수로 넘기면 자연스러울 것이다.
 *  */


{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
  
    return {
      titme: totalTime,
      distance: totalDistance,
      pace: pace
    }
  
    function calculateDistance() {
      let result = 0;
      for (let i = 0; i < points.length; i++) {
        result += distance(points[i-1], points[i]);
      }
      return result;
    }
  
    function distance(p1, p2){ } // 두 지점의 거리 계산
    function radiance(degrees) {} // 라디안 값으로 변경
    function calculateTime() {} // 총 시간 계산
  }

  function top_calculateDistance(points) { // 최상위로 복사!
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      result += distance(points[i-1], points[i]);
    }
    return result;
  }
}

/**
 * 1. distance()함수로 똑같이 처리할 수 있지만, calculateDistance()와 함계 옮기는게 합리적으로 보인다.
 * 다음은 distance() 자신과 distance()가 의존하는 코드 다.
 * 
 */

{
  function distance(p1, p2) {
    // 하버사인 공식 (harversine, formula)은 다음 사이트를 참고하자.
    // http://www.moveable-type.co.uk/scripts/latlong.html
    const EARTH_RADIUS = 3959;
    const dLat = radians(p2.lat) - radians(p1.lat);
    const dLon = raians(p2.lon) - radiance(p1.lon);
    const a = Math.pow(Math.sin(dLat / 2), 2)
            + Math.cos(radians(p2.lat))
            * Math.cos(radians(p1.lat))
            * Math.pow(Math.sin(dLon / 2), 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return EARTH_RADIUS * c;
  }

  function radians(degrees) {
    return degrees * Math.PI / 180;
  }
}

/**
 * 보다시피 distance는 raians만 사용하며, radians는 현재 컨텍스트에 있는 어떤것도 사용하지 않는다.
 * 따라서 두 함수를 매개변수로 넘기기보다는 함께 옮겨보ㅓ리는게 낫다.
 * 이를 위한 작은 첫 단추로, 현재 컨텍스트에서 이 함ㅛ수ㅈ들을 calculateDistane함수 안으로 옮겨보자.
 */

{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
  
    return {
      titme: totalTime,
      distance: totalDistance,
      pace: pace
    }
  
    function calculateDistance() {
      let result = 0;
      for (let i = 0; i < points.length; i++) {
        result += distance(points[i-1], points[i]);
      }
      return result;
      function distance(p1, p2){ } // 두 지점의 거리 계산
      function radiance(degrees) {} // 라디안 값으로 변경
    }
  
    function calculateTime() {} // 총 시간 계산
  }
}
/**
 * 그런 다음 정적 분석과 테스트를 활용해 어딘가에서 문제가 생기는지 검증해보자.
 * 지금 경우엔 아무 문제가 없으니 같은 내용을 새로 만든 top_calculateDistance함수로도 복사한다.
 * 
 */

{
  function top_calculateDistance(points) { // 최상위로 복사!
    let result = 0;
    for (let i = 0; i < points.length; i++) {
      result += distance(points[i-1], points[i]);
    }
    return result;
    function distance(p1, p2){ } // 두 지점의 거리 계산
    function radiance(degrees) {} // 라디안 값으로 변경
  }
}

/**
 * 이번에도 복사한 코드가 프로그앰 종작에 아무런 영향을 주지 ㅇ낳지마느
 * 4. 다시한번 정적분석을 수행해볼 타이밍이다.
 * 내가 만약 distance와 tadians를 호출하는걸 변ㄴ하지 못했더라ㅁ도 린터(정적분석시)가 
 * 지금 단계에서 이 문제를 찾아줬을것이다.
 * 
 * 6. 이제 밥상을 다 차렸으니 메인 요리(핵심이되는 수정)을 맛볼 시간이다.
 * 즉 소스 함수인 calculateDistance의 본문을 수정하여 
 * top_calculateDistance()를 호출하게 하자.
 * 
 */

{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = calculateDistance();
    const pace = totalTime / 60 / totalDistance;
  
    return {
      titme: totalTime,
      distance: totalDistance,
      pace: pace
    }
  
    function calculateDistance() {
      // let result = 0;
      // for (let i = 0; i < points.length; i++) {
      //   result += distance(points[i-1], points[i]);
      // }
      // return result;
      return top_calculateDistance(points);
    }
  
    // function distance(p1, p2){ } // 두 지점의 거리 계산
    // function radiance(degrees) {} // 라디안 값으로 변경
    function calculateTime() {} // 총 시간 계산
  }
}
/**
 * 7. 이 시점에서 '반즈시'모든 테스트를 수행하여 옮겨진 함수가 새 보금자리에 잘 정착했는지를 확인해야 한다.
 * 
 * 테스트에 통과하면 이삿짐을 새 집에 풀어놓는다.
 * 가장 먼저 소스함수를 대리자 역할로 드래로 ㅈ둘지 정한다.
 * 이 예의 소스함수는 중첩된 함수 답게 호출자가 많지 않은 상당히 지역화된 함수다.
 * 그러니 소스함수는 제거하는편이 낫겠다.
 */

{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const totalDistance = top_calculateDistance(points);
    const pace = totalTime / 60 / totalDistance;
  
    return {
      titme: totalTime,
      distance: totalDistance,
      pace: pace
    }
  
    // function calculateDistance() {
    //   // let result = 0;
    //   // for (let i = 0; i < points.length; i++) {
    //   //   result += distance(points[i-1], points[i]);
    //   // }
    //   // return result;
    //   return top_calculateDistance(points);
    // }
  
    // function distance(p1, p2){ } // 두 지점의 거리 계산
    // function radiance(degrees) {} // 라디안 값으로 변경
    function calculateTime() {} // 총 시간 계산
  }
}

/**
 * 이제 새 함수에 이름을 지어줄 시간이다.
 * 최상위 함수는 가시성이 가장 높으니 적합한 이름을 신중히 지어주는게 좋다.
 * totalDistance*정도면 부족하지 않을 것이다.
 * 그런데 trackSummary()안에 정의되 똑같은 이름의 변수가 새 함수를 가릴 것이라 곧바로 적용할 수 없다.
 * 
 * 곰곰히 생각해보면 이 변수를 남겨둘 이유가 없으니 변수 인라인하기로 해결하자.
 */

{
  function trackSummary(points) {
    const totalTime = calculateTime();
    const pace = totalTime / 60 / totalDistance(points);
  
    return {
      titme: totalTime,
      distance: totalDistance(points),
      pace: pace
    }

    function calculateTime() {} // 총 시간 계산
  }
}
/**
 * 혹시나 이 변수를 남겨둬야 한다면 변수 이름을 totalDistanceCache, distance정도로 바꿔주면 된다.
 * 
 * distance와 radiancs함수도 totalDistance안의 어떤 것에도 의존하지 않으니, 나라면 이들 역시 최상위로 옮길거이다.
 * 그러면 네 함수 모두 최상위가 된다.
 */

{
  function trackSummary(points) {}
  function totalDistance(points) {}
  function distance(p1, p2) {}
  function radiance(degrees) {}
}

/**
 * distance와 radians를 totlaDistance안에 그대로 두어 가시성을 줄이는 쪽을 선호하는 이도 있을 것이다.
 * 언어에 따라 이 방식도 고려해봄 직하지만, es2015이후의 자바스크립트라면 멋지 모듀ㅜㄹ 메커니즘을 이용해 함수 가ㅣ썽을 제어할 수 있다.
 * 중첩 함수를 사용하다 보면 숨겨진 데이터끼리 항호의존하기가 아주 쉬우니 중첩함수는 되도록 만들지 말자.'
 */