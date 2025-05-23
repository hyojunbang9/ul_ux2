document.addEventListener("DOMContentLoaded", () => {
  // 1. 객체 찾기
  const content = document.querySelector("#content"); // 회전목마 전체 레이아웃
  const imgList = document.querySelectorAll("#slide_show img"); // 회전목마 이미지 배열
  const navigateleft = document.querySelector("#navigateleft"); // 회전목마 왼쪽 아이콘
  const navigateright = document.querySelector("#navigateright"); // 회전목마 오른쪽 아이콘
  const indigatorList = document.querySelectorAll("#indigator > a"); // 회전목마 인디게이터 a

  let list = [1, 0, 0];
  let timerId; // 타이머 핸들 값
  // 시간에 따라서 이미지 화면 1번, 인디게이터 1번이 선택이되어서 화면에 보여주는 함수
  let listArray = () => {
    for (let i = 0; i < list.length; i++) {
      imgList[i].style.zIndex = list[i];
    }

    for (let i = 0; i < indigatorList.length; i++) {
      indigatorList[i].classList.remove("active");
    }

    let index = list.indexOf(1);
    indigatorList[index].classList.add("active");
  };
  listArray();

  // 왼쪽 네비게이터를 클릭 왼쪽으로 이동
  navigateleft.addEventListener("click", () => {
    list.push(list.shift());
    listArray();
  });

  // 오른쪽 네비게이터를 클릭 오른쪽으로 이동
  navigateright.addEventListener("click", () => {
    list.unshift(list.pop());
    listArray();
  });

  // 3초마다 navigateright기능을 불러오기 함수
  let startTimer = () => {
    timerId = setInterval(() => {
      list.unshift(list.pop());
      listArray();
    }, 3000);
  };
  // 3초마다 navigateright기능을 불러오기
  startTimer();

  // container 영역에 마우스가 올라가면 타이머가 멈추게 한다.
  content.addEventListener("mouseenter", () => {
    clearInterval(timerId);
  });

  // container 영역에 마우스가 빠져 나가면 타이머가 시작 한다.
  content.addEventListener("mouseleave", () => {
    startTimer();
  });

  // indicator 클릭하면 해당되는 화면으로 들어간다
  for (let i = 0; i < indigatorList.length; i++) {
    indigatorList[i].addEventListener("click", () => {
      list = [0, 0, 0];
      list[i] = 1;
      listArray();
    });
  }

  // 메인 가입 페이지 패턴 검색
  let idPattern = /^[\w]{3,12}$/;
  let emailPattern = /@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  let pwPattern = /^[\w]{6,8}$/;
  let namePattern = /^([가-힣]{1,4}|[A-Za-z]{2,20})$/;
  let yearPattren = /^[0-9]{4}$/;
  let dayPattren = /^(0?[1-9]|[12][0-9]|3[01])$/;
  let emailAddressPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
  let phonePattern = /^0\d{1,2}-\d{3,4}-\d{4}$/;
  let pathNumPattern = /^\d{1,6}$/;

  // 객체
  let id = document.querySelector("#id");
  let emailAddress = document.querySelector("#email-address");
  let pw = document.querySelector("#pw");
  let pwCheck = document.querySelector("#pw-check");
  let name = document.querySelector("#name");
  let year = document.querySelector("#year");
  let month = document.querySelector("#month");
  let day = document.querySelector("#day");
  let gender = document.querySelector("#gender");
  let email = document.querySelector("#email");
  let phone = document.querySelector("#phone-num");
  let pathBtn = document.querySelector(".path-btn");
  let pathNum = document.querySelector("#path-num");
  let joinBtn = document.querySelector(".join");

  // id 패턴검사 이벤트
  id.addEventListener("blur", () =>
    idPwValidata(
      id,
      3,
      idPattern,
      "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요. "
    )
  );
  emailAddress.addEventListener("blur", () =>
    emailValidata(emailAddress, emailPattern, "다시 입력 해주세요")
  );
  pw.addEventListener("blur", () =>
    idPwValidata(
      pw,
      6,
      pwPattern,
      "영문자, 숫자, _만 입력 가능. 최소 6자이상 8자이하 입력하세요"
    )
  );
  pwCheck.addEventListener("blur", () =>
    pwCheckFunc(pw, pwCheck, "비밀번호가 일치하지 않습니다")
  );
  name.addEventListener("blur", () =>
    validata(name, namePattern, "다시 입력해주세요")
  );
  year.addEventListener("blur", () =>
    yearCheckFunc(year, 2900, yearPattren, "다시 입력해주세요")
  );
  month.addEventListener("blur", () =>
    selectCheckFunc(month, "값을 입력하세요")
  );
  day.addEventListener("blur", () =>
    dayCheckFunc(day, dayPattren, "다시 입력")
  );
  gender.addEventListener("blur", () =>
    selectCheckFunc(gender, "값을 입력해주세요")
  );
  email.addEventListener("blur", () =>
    validata(email, emailAddressPattern, "다시 입력해주세요")
  );
  phone.addEventListener("blur", () =>
    validata(phone, phonePattern, "다시 입력해주세요")
  );
  pathBtn.addEventListener("click", () => {
    let randomNum = Math.floor(Math.random() * (999999 - 111111 + 1) + 111111);
    alert(`인증번호는 ${randomNum} 입니다.`);
  });
  pathNum.addEventListener("blur", () =>
    idPwValidata(pathNum, 6, pathNumPattern, "6자리 인증번호를 입력해주세요")
  );

  // 가입하기 버튼 이벤트
  joinBtn.addEventListener("click", () => {
    let idReturn = idPwValidata(
      id,
      3,
      idPattern,
      "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요. "
    );
    if (!idReturn) return;
    let emailAddReturn = emailValidata(emailAddress, emailPattern, "다시 입력 해주세요");
    if (!emailAddReturn) return;
    let pwReturn = idPwValidata(
      pw,
      6,
      pwPattern,
      "최소 6자이상 8자이하 입력하세요"
    );
    if (!pwReturn) return;
    let pwCheckReturn = pwCheckFunc(pw, pwCheck, "비밀번호가 일치하지 않습니다");
    if (!pwCheckReturn) return;
    let nameReturn = validata(name, namePattern, "이름을 입력해주세요")
    if (!nameReturn) return;
    let yearReturn = yearCheckFunc(year, 2999, yearPattren, "다시 입력해주세요");
    if (!yearReturn) return;
    let dateReturn = validateDay(month, day);
    if (!dateReturn) return;
    let selectReturn = selectCheckFunc(gender, "값을 입력해주세요");
    if (!selectReturn) return;
    let emailReturn = emailValidata(email, emailAddressPattern, "다시 입력 해주세요");
    if (!emailReturn) return;
    let phonReturn = validata(phone, phonePattern, "전화번호를 입력해주세요");
    if (!phonReturn) return;

    alert("가입이 완료 되었습니다.");

    let loginContainer = document.querySelector(".login");
    let mainContaier = document.querySelector("main");
    mainContaier.style.display = "none";
    loginContainer.style.display = "flex";

  });

  // 패턴검사 함수
  let validata = (inputObj, pattern, message) => {
    if (inputObj.value.match(pattern)) {
      inputObj.classList.remove("error");
      return true;
    } else {
      inputObj.placeholder = message;
      inputObj.classList.add("error");
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  };

  // 아이디 패턴검사 함수
  let idPwValidata = (inputObj, length, pattern, message) => {
    if (inputObj.value.length < length) {
      inputObj.value = "";
    }

    if (inputObj.value.match(pattern)) {
      inputObj.classList.remove("error");
      return true;
    } else {
      inputObj.placeholder = message;
      inputObj.classList.add("error");
      inputObj.focus();
      return false;
    }
  };

  // 이메일 패턴검사 함수
  let emailValidata = (inputObj, pattern, message) => {
    if (!inputObj.value.includes("@")) {
      inputObj.placeholder = "@를 포함하여 입력";
      inputObj.value = "";
      inputObj.classList.add("error");
      inputObj.focus();
      return false;
    }

    if (inputObj.value.match(pattern)) {
      inputObj.classList.remove("error");
      return true;
    } else {
      inputObj.placeholder = message;
      inputObj.classList.add("error");
      inputObj.value = "";
      inputObj.focus();
      return false;
    }
  };

  // 비밀번호 패턴검사 함수
  let pwCheckFunc = (inputObj, inputCheck, message) => {
    if (inputObj.value === inputCheck.value) {
      return true;
    } else {
      inputCheck.placeholder = message;
      inputCheck.classList.add("error");
      inputCheck.value = "";
      inputCheck.focus();
      return false;
    }
  };

  // 년도 패턴검사 함수
  let yearCheckFunc = (inputObj, limitNum, inputCheck, message) => {
    const value = inputObj.value.trim();

    // 숫자 형식이 아닌 경우
    if (!value.match(inputCheck)) {
      inputObj.value = "";
      inputObj.placeholder = "숫자만 입력해주세요";
      inputObj.classList.add("error");
      inputObj.focus();
      return false;
    }

    // 입력 숫자가 범위를 초과한 경우
    if (Number(value) > limitNum) {
      inputObj.value = "";
      inputObj.placeholder = "정확한 값을 입력하세요";
      inputObj.classList.add("error");
      inputObj.focus();
      return false;
    }

    // 정상 입력
    inputObj.classList.remove("error");
    return true;
  };

  // 월 패턴 검사 함수
  let selectCheckFunc = (inputObj, message) => {
    if (inputObj.value === "0") {
      inputObj.options[0].innerText = message;
      inputObj.focus();
      return false;
    } else {
      return true;
    }
  };

  // 일 패턴 검사 함수
  let dayCheckFunc = (inputObj, pattern, message) => {
    if (!inputObj.value.match(pattern)) {
      inputObj.value = "";
      inputObj.classList.add("error");
      inputObj.placeholder = message;
      inputObj.focus();
      return false;
    }
  };

  function validateDay(monthEl, dayEl) {
    const month = Number(monthEl.value);
    const day = Number(dayEl.value);

    if ([4, 6, 9, 11].includes(month) && day > 30) {
      dayEl.value = "";
      dayEl.classList.add("error");
      dayEl.placeholder = "해당월 30일까지입니다";
      return false;
    }

    if (month === 2 && day > 28) {
      dayEl.value = "";
      dayEl.classList.add("error");
      dayEl.placeholder = "해당월 28일까지입니다";
      return false;
    }

    if (month === 0) {
      dayEl.value = "";
      dayEl.classList.add("error");
      dayEl.placeholder = "월을 입력해주세요";
      return false;
    }

    dayEl.classList.remove("error");
    return true;
  }

  // 로그인
  // 객체
  let loginId = document.querySelector("#login-id");
  let loginPw = document.querySelector("#login-pw");
  let loginBtn = document.querySelector(".login-btn");

  // 유저 아이디, 비밀번호
  const userID = "test1234";
  const userPW = "123456";

  // 로그인 버튼 이벤트
  loginBtn.addEventListener('click', () => {
    let idCheckReturn = loginValueCheck(loginId, "아이디를 입력해주세요.");
    if (!idCheckReturn) return;
    let pwCheckReturn = loginValueCheck(loginPw, "비밀번호를 입력해주세요.");
    if (!pwCheckReturn) return;
    let idPattrenReturn = idPwValidata(loginId, 3, idPattern, "영문자, 숫자, _만 입력 가능. 최소 3자이상 12자이하 입력하세요.");
    if (!idPattrenReturn) return;
    let pwPattrenReturn = idPwValidata(loginPw, 6, pwPattern, "최소 6자이상 8자이하 입력하세요");
    if (!pwCheckReturn) return;
    let loginIdReturn = loginFunc(loginId, userID, "아이디가 존재하지 않습니다");
    if (!loginIdReturn) return;
    let loginPwReturn = loginFunc(loginPw, userPW, "비밀번호가 틀렸습니다.");
    if (!loginPwReturn) return;

    alert("로그인 성공!");
    location.reload(true);
  })


  let loginFunc = (input, userInfo, message) => {
    if (input.value !== userInfo) {
      input.value = "";
      input.placeholder = message;
      input.classList.add = "error";
      return false;
    } else {
      input.classList.remove = "error";
      return true;
    }
  }


  // 아이디, 비밀번호 입력 안되었을 경우 체크
  let loginValueCheck = (input, message) => {
    if (input.value.length === 0) {
      input.value = "";
      input.placeholder = message;
      input.classList.add = "error";
      return false;
    } else {
      return true;
    }
  }

});
