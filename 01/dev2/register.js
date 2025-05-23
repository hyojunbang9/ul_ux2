//전체 document가 메모리에 모두 로드가 되었을 떄 onload 함수를 불러달라!
function onLoad() {
  //id 패턴 검색 진행할 이벤트 정의
  let idPattern = /^[\w]{3,12}$/;
  let id2Pattern = /^[\w]{3,12}$/;
  let idEmailPattern = /^\@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let pwPattern = /^[\w]{6,8}$/;
  let pw2Pattern = /^[\w]{6,8}$/;
  let namePattern = /^[\가-힣]{1,5}|[a-zA-Z]{1}[a-zA-Z\x20]{2,20}$/;
  let phNumPattern = /^\d{3}-\d{3,4}-\d{4}$/;
  let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let checkNum = /^[RCAPC6]{6,}$/;

  let id = document.querySelector("#id");
  let pw = document.querySelector("#pw");
  let id2 = document.querySelector("#id2");
  let pw2 = document.querySelector("#pw2");
  let pwCheck = document.querySelector("#pwCheck");
  let joinBtn = document.querySelector(".join");
  let name = document.querySelector("#name");
  let email = document.querySelector("#email");

  id.addEventListener("blur", () => {
    validate(
      id,
      idPattern,
      "영문자, 숫자, _만 입력 가능. 최소 3자이상 입력하세요."
    );
  });

  id2.addEventListener("blur", () => {
    validate(
      id2,
      id2Pattern,
      "영문자, 숫자, _만 입력 가능. 최소 3자이상 입력하세요."
    );
  });

  idEmail.addEventListener("blur", () => {
    validate(idEmail, idEmailPattern, "영문, '.'포함, 최상위 도메인: 2자 이상");
  });

  pw.addEventListener("blur", () => {
    validate(
      pw,
      pwPattern,
      "영문자, 숫자, _만 입력 가능. 최소 6자 이상, 8자 이하로 입력하세요."
    );
  });

  pw2.addEventListener("blur", () => {
    validate(
      pw2,
      pw2Pattern,
      "영문자, 숫자, _만 입력 가능. 최소 6자 이상, 8자 이하로 입력하세요."
    );
  });

  pwCheck.addEventListener("blur", () => {
    if (pw.value === pwCheck.value) {
      pwCheck.previousElementSibling.innerHTML = "비밀번호 일치";
      pw.previousElementSibling.innerHTML = "";
      pwCheck.previousElementSibling.style.color = "blue";
    } else {
      pwCheck.previousElementSibling.innerHTML =
        "비밀번호가 일치하지 않습니다.";
      pwCheck.previousElementSibling.style.color = "tomato";
      pwCheck.value = "";
      pwCheck.focus();
    }
  });

  name.addEventListener("blur", () => {
    validate(
      name,
      namePattern,
      "공백없이 한글,영문만 입력 가능 (한글1자, 영문2자 이상)"
    );
  });

  email.addEventListener("blur", () => {
    validate(
      email,
      emailPattern,
      "영문과 숫자, '.'포함, 최상위 도메인: 2자 이상"
    );
  });
  phNum.addEventListener("blur", () => {
    validate(
      phNum,
      phNumPattern,
      "앞번호 3글자, 중간번호 3또는 4글자, 마지막번호는 4글자 하이픈(-) 포함 한 숫자"
    );
  });

  //회원 가입 전송 기능 점검
  joinBtn.addEventListener("click", function () {
    //회원 전체 데이터 점검
    //id
    // let idReturn = validate(id, idPattern, "정확한 값을 입력하세요.");
    // if (!idReturn) return;
    // if (nameReturn === false) return;
    // let pwReturn = validate(pw, pwPattern, "정확한 값을 입력하세요.");
    // if (!pwReturn) return;
    // if (nameReturn === false) return;
    // let nameReturn = validate(name, namePattern, "정확한 이름을 입력하세요.");
    // if (nameReturn === false) return;
    // alert("서버에 전송 완료");
    let loginContainer = document.querySelector(".wrap2");
    let mainContaier = document.querySelector(".wrap3");
    loginContainer.style.display = "none";
    mainContaier.style.display = "flex";
  });

  //겹치는 함수 공동으로 만들기
  function validate(inputObj, pattern, message) {
    if (inputObj.value.match(pattern)) {
      inputObj.previousElementSibling.style.color = "blue";
      return true;
    } else {
      inputObj.previousElementSibling.innerText = message;
      inputObj.previousElementSibling.style.color = "tomato";
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  }

  // 회전목마
  document.addEventListener("DOMContentLoaded", function () {
    const content = document.querySelector("#content"); //회전 목마의 전체 레이아웃
    const imgList = document.querySelectorAll("#slide_show img"); //회전 목마 이미지 리스트
    const navigateleft = document.querySelector("#navigateleft"); //왼쪽 네이게이트
    const navigateright = document.querySelector("#navigateright"); //오른쪽 네비게이트
    const indicatorList = document.querySelectorAll("#indicator > a"); //indicator a 리스트

    let list = [1, 0, 0, 0];
    let timerId; //타이머 핸들
    //함수 시간에 따라 (이미지 화면 n번) & (indicator n번)이 선택 돼서 화면에 나와야한다.
    function listArray() {
      for (let i = 0; i < list.length; i++) {
        imgList[i].style.zIndex = list[i]; // 1,0,0,0 -> 0,1,0,0 -> 0,0,1,0 -> 0,0,0,1로 자동으로 바뀜
      }
      for (let i = 0; i < indicatorList.length; i++) {
        indicatorList[i].classList.remove("active");
      }
      let index = list.indexOf(1); //1의 위치를 알려줘! 라는 식(indexof)
      indicatorList[index].classList.add("active");
    }
    listArray();

    //왼쪽 네비게이터를 누르면 화면 이동
    navigateleft.addEventListener("click", () => {
      // let list = [1, 0, 0, 0]; -> [0, 0, 0, 1];
      let value = list.shift();
      list.push(value);
      listArray();
    });

    navigateright.addEventListener("click", () => {
      // let list = [1, 0, 0, 0]; -> [0, 0, 0, 1];
      list.unshift(list.pop());
      listArray();
    });
    //3초마다 네비게이터 기능 작동 시키기
    function startTimer() {
      timerId = setInterval(() => {
        list.unshift(list.pop());
        listArray();
      }, 3000);
    }
    startTimer();

    //contain 영역에 마우스가 올라가면 타이머를 멈추게 한다.
    content.addEventListener("mouseenter", () => {
      clearInterval(timerId);
    });

    //contain 영역에서 마우스가 빠져나가면 타이머를 멈추게 한다.
    content.addEventListener("mouseleave", () => {
      starTimer();
    });

    //indicator 클릭 시 해당 화면으로 이동
    for (let i = 0; i < indicatorList.length; i++) {
      indicatorList[i].addEventListener("click", () => {
        list = [0, 0, 0, 0];
        list[i] = 1;
        listArray();
      });
    }
  });
}
