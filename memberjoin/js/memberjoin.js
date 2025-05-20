//전체 document가 메모리에 모두 로드가 되었을 떄 onload 함수를 불러달라!
function onLoad() {
  //id 패턴 검색 진행할 이벤트 정의
  let idPattern = /^[\w]{3,12}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^[\가-힣]{1,4}|[a-zA-Z]{1}[a-zA-Z\x20]{1,10}$/;
  let nickNamePattern =
    /^(?:(?=[^a-zA-Z]*[a-zA-Z]{4,})|(?=[^가-힣]*[가-힣]{2,}))[가-힣a-zA-Z0-9]+$/;
  let phNumPattern = /^\d{3}-\d{3,4}-\d{4}$/;
  let homeNumPattern = /^\d{3}-\d{3,4}-\d{4}$/;
  let checkHumanPattern =/^[RCAPC6]{6,}$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let pwCheck = document.querySelector("#pwCheck");
  let submit = document.querySelector("#submit");
  let name = document.querySelector("#name");
  let addrSearch = document.querySelector("#addrSearch");
  let zipcode = document.querySelector("#zipcode");
  let addr1 = document.querySelector("#addr1");
  let nickName = document.querySelector("#nickName");
  let phNum = document.querySelector("#phNum");
  let homeNum = document.querySelector("#homeNum");
  let checkHuman = document.querySelector("#checkHuman");

  id.addEventListener("blur", () => {
    validate(
      id,
      idPattern,
      "영문자, 숫자, _만 입력 가능. 최소 3자이상 입력하세요."
    );
  });

  pw.addEventListener("blur", () => {
    validate(
      pw,
      pwPattern,
      "영문자, 숫자, _만 입력 가능. 최소 6자 이상, 8자 이하로 입력하세요."
    );
  });

  pwCheck.addEventListener("blur", () => {
    if (pw.value === pwCheck.value) {
      pwCheck.nextElementSibling.innerHTML = "비밀번호 일치";
      pw.nextElementSibling.innerHTML = "";
      pwCheck.nextElementSibling.style.color = "blue";
    } else {
      pwCheck.nextElementSibling.innerHTML = "비밀번호가 일치하지 않습니다.";
      pwCheck.nextElementSibling.style.color = "tomato";
      pwCheck.value = "";
      pwCheck.focus();
    }
  });

  

  nickName.addEventListener("blur", () => {
    validate(
      nickName,
      nickNamePattern,
      "공백없이 한글,영문,숫자만 입력 가능 (한글2자, 영문4자 이상)"
    );
  });

  phNum.addEventListener("blur", () => {
    validate(
      phNum,
      phNumPattern,
      "앞번호 3글자, 중간번호 3또는 4글자, 마지막번호는 4글자 하이픈(-) 포함 한 숫자"
    );
  });

  homeNum.addEventListener("blur", () => {
    validate(
      homeNum,
      homeNumPattern,
      "앞번호 3글자, 중간번호 3또는 4글자, 마지막번호는 4글자 하이픈(-) 포함 한 숫자"
    );
  });

  checkHuman.addEventListener("blur", () => {
    validate(
      checkHuman,
      checkHumanPattern,
      "다시 입력하세요"
    );
  });

  //우편번호 이벤트 처리
  addrSearch.addEventListener("click", () => {
    new daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
        if (data !== null && data !== undefined) {
          console.log("zipcode", data.zonecode);
          console.log("data.roadAddress", data.roadAddress);

          zipcode.value = data.zonecode;
          addr1.value = data.roadAddress;
        } else {
          addrSearch.nextSibling.innerHTML =
            "daum api 오류 발생, 직접 입력 요망";
          zipcode.fouse();
        }
      },
    }).open();
  });

  //회원 가입 전송 기능 점검
  submit.addEventListener("click", function () {
    //회원 전체 데이터 점검
    //id
    let idReturn = validate(id, idPattern, "정확한 값을 입력하세요.");
    if (nameReturn === false) return;
    let pwReturn = validate(pw, pwPattern, "정확한 값을 입력하세요.");
    if (nameReturn === false) return;
    let nameReturn = validate(name, namePattern, "정확한 이름을 입력하세요.");
    if (nameReturn === false) return;
    alert("서버에 전송 완료");
    //pw
    let forn = document.querySelector("form");
  });

  //겹치는 함수 공동으로 만들기
  function validate(inputObj, pattern, message) {
    if (inputObj.value.match(pattern)) {
      inputObj.nextSibling.innerHTML = "성공";
      inputObj.nextSibling.style.color = "blue";
      return true;
    } else {
      inputObj.nextSibling.innerHTML = message;
      inputObj.nextSibling.style.color = "tomato";
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  }
}
