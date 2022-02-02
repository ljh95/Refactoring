// 예시: 사진 관련 데이터를 HTML로 내보내는 코드를 준비했다.

function renderPerson(outtStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(`<p>제목: ${person.photo.title}</p>`);
  result.push(emitPhotoData(person.photo));
  return result.join("\n")
}

function photoDiv(p) {
  return [
    "<div>",
    `<p>제목: ${p.title}</p>`,
    emitPhotoData(p),
    "</div>"
  ].join("\n")
}

function emitPhotoData(aPhoto) {
  const result = [];
  result.push(`<p>위치: ${aPhoto.location}</p>`)
  result.push(`<p>날짜: ${aPhoto.date.toDateString()}</p>`)
  return result.join("\n")
}

/**
 * 이 코드에서는 총 두 곳에서 emitPhotoData()를 호출하며, 두곳 모두 바로 앞에는 제목 출력코드가 나온다.
 * 제목을 출력하는 코드를 emitPhotoData아능로 옮겨 이 중복을 없애보자.
 * 호출자가 하녕ㅆ다면 단순히 해당 코드를 잘라 붙이면 되지만, 호출자수가 늘어날수록 
 * 더안전할 길을 택해야한다.
 * 
 * 3. 가장 먼저 호출자중 하나에 함수 추출하기를 적용하자.
 * 다음과 같이 emitPhotoData()로 옮기려는 코드와 emitPhotoData() 호출문을 함꼐 추출하면 된다.
 */

function photoDiv(p) {
  return [
    "<div>",
    zznew(p),
    "</div>"
  ].join("\n")
}

function zznew(p) {
  return [
    `<p>제목: ${p.title}</p>`,
    emitPhotoData(p),
  ].join("\n")
}

/**
 * 4. 이제 다른 호출자들로 눈을 돌려서, 하나씩 차례로 새로운 함수를 호출하도록 수정한다.
 */


function renderPerson(outtStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  // result.push(`<p>제목: ${person.photo.title}</p>`);
  // result.push(emitPhotoData(person.photo));
  result.push(zznew(person.photo))
  return result.join("\n")
}
// 5. 호출자들을 빠짐없이 수정했다면 emitPhotoData함수를 인라인 한다.

function zznew(p) {
  return [
    `<p>제목: ${p.title}</p>`,
    // emitPhotoData(p),
    `<p>위치: ${p.location}</p>`,
    `<p>날짜: ${p.date.toDateString()}</p>`
  ].join("\n")
}

// 6. 그리고 함수 이름을 바꿔 마무리한다.(6.5함수 이름 바꾸기)
function renderPerson(outStream, person) {
  const result = [];
  result.push(`<p>${person.name}</p>`);
  result.push(renderPhoto(person.photo));
  result.push(emitPhotoData(person.photo));
  return result.join("\n")
}

function photoDiv(p) {
  return [
    "<div>",
    emitPhotoData(p),
    "</div>"
  ].join("\n")
}

function emitPhotoData(p) {
  return [
    `<p>제목: ${p.title}</p>`,
    `<p>위치: ${p.location}</p>`,
    `<p>날짜: ${p.date.toDateString()}</p>`
  ].join("\n")
}

// 이 과정에서 매개변수 이름이 여러분의 규약에 맞지 않다면 적절히 수정하자.

