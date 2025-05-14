// 1. 객체를 찾는다. Student stu = new Student();
// -> new를 통해서 객체를 잊지 않도록 해왔다. 객체배열 -> collection Framework
// document는 화면에 있는 모든 ui 객체를 갖고있다. -> css 선택자 기능을 갖고 찾는다.
// 한 개만 찾고 싶다면 ID를 줘야한다. class 이름으로 찾으면 -> 객체 참조배열 [첨자] 반복문을 이용한다.

// document.querySelector
// document.querySelectorAll

let h1obj = document.querySelector("#heading"); // let 말고 var도 쓰는데 let 쓰자!
// 2. 객체를 찾았으니까, 내 마음대로 설정(기본 속성, style속성, 이벤트 속성:on, content) -> 제일 많이 쓰는 게 이벤트{
h1obj.onclick = function () {
  h1obj.style.color = "#ff0000";
  window.alert("h1 클릭 하셨습니다.");
};
// 람다식으로 표현
h1obj.onclick = () => {
  h1obj.style.color = "#ff0000";
  window.alert("h1 클릭 하셨습니다.");
};
