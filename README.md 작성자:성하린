# 🦁 아기사자 멤버 관리 페이지

> **작성자: 홍길동** (← 여기에 본인 이름으로 변경하세요)

---

## 📌 프로젝트 소개

LikeLion 아기사자 멤버를 등록하고 관리하는 웹 페이지입니다.  
멤버 카드 추가 · 삭제, 총 인원 수 실시간 업데이트, 입력값 유효성 검사 기능을 구현했습니다.

---

## ✅ 체크리스트

| 항목 | 완료 |
|------|------|
| addEventListener로 이벤트 리스너 등록 (인라인 핸들러 없음) | ✅ |
| DOM 조작으로 카드 요소 동적 생성 | ✅ |
| 아기사자 추가 폼 토글(열기/닫기) 방식 | ✅ |
| 이름, 파트, 관심기술, 한줄소개 입력 필드 | ✅ |
| 추가/삭제 시 총 인원 수 동적 업데이트 | ✅ |
| 입력값 유효성 검사 (빈 값 방지) | ✅ |
| 데이터를 배열/객체로 관리하고 UI 렌더링 | ✅ |
| GitHub README.md에 본인 이름 포함 | ✅ |

---

## 🗂 파일 구조

```
lion-members/
├── index.html   # HTML 구조 (시맨틱 태그 사용)
├── style.css    # 스타일 (CSS 변수, 반응형)
├── app.js       # JavaScript 로직 (데이터 관리 + DOM 조작)
└── README.md    # 프로젝트 설명
```

---

## 🔑 핵심 구현 사항

### 1. addEventListener 이벤트 등록
```js
toggleFormBtn.addEventListener('click', () => { ... });
submitBtn.addEventListener('click', () => { ... });
card.querySelector('.delete-btn').addEventListener('click', () => { ... });
```
HTML 태그에 `onclick=""` 같은 인라인 핸들러를 **전혀 사용하지 않았습니다.**

### 2. DOM 조작으로 카드 동적 생성
```js
const card = document.createElement('article');
card.innerHTML = `...`;
cardsGrid.appendChild(card);
```

### 3. 폼 토글
```js
function openForm()  { formSection.classList.add('open'); }
function closeForm() { formSection.classList.remove('open'); }
```
CSS `max-height` 트랜지션으로 슬라이드 애니메이션 구현

### 4. 유효성 검사
```js
function validateField(input, errorId, message) {
  if (!input.value.trim()) {
    // 빈 값 → 에러 메시지 표시 + 빨간 테두리
    return false;
  }
  return true;
}
```

### 5. 데이터 배열/객체 관리
```js
let membersData = [];   // 멤버 배열

const newMember = {
  id, name, part, skills, intro   // 객체로 저장
};

membersData.push(newMember);                          // 추가
membersData = membersData.filter(m => m.id !== id);   // 삭제
```

---

## 🚀 실행 방법

1. 이 저장소를 클론합니다.
```bash
git clone https://github.com/본인아이디/lion-members.git
```

2. `index.html`을 브라우저에서 바로 열거나, Live Server로 실행합니다.

---

## 🛠 사용 기술

- HTML5 (시맨틱 태그)
- CSS3 (CSS Variables, Flexbox, Grid, Transition/Animation)
- Vanilla JavaScript (ES6+, DOM API, addEventListener)
