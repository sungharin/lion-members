/* =============================================
   아기사자 멤버 관리 앱 - app.js
   =============================================
   - 데이터를 배열(membersData)로 관리
   - addEventListener로만 이벤트 등록 (인라인 핸들러 없음)
   - DOM 조작으로 카드 동적 생성
   - 폼 토글 / 유효성 검사 / 추가·삭제 / 인원수 업데이트
   ============================================= */

// ── 1. 데이터 저장소 ──────────────────────────────
let membersData = [];   // 멤버 객체 배열
let nextId = 1;         // 고유 ID 생성용

// ── 2. DOM 참조 ───────────────────────────────────
const toggleFormBtn  = document.getElementById('toggle-form-btn');
const formSection    = document.getElementById('form-section');
const cancelBtn      = document.getElementById('cancel-btn');
const submitBtn      = document.getElementById('submit-btn');
const cardsGrid      = document.getElementById('cards-grid');
const totalCount     = document.getElementById('total-count');
const emptyState     = document.getElementById('empty-state');

const inputName   = document.getElementById('input-name');
const inputPart   = document.getElementById('input-part');
const inputSkills = document.getElementById('input-skills');
const inputIntro  = document.getElementById('input-intro');

// ── 3. 폼 토글 ────────────────────────────────────
function openForm() {
  formSection.classList.add('open');
  formSection.setAttribute('aria-hidden', 'false');
  toggleFormBtn.textContent = '✕ 닫기';
  inputName.focus();
}

function closeForm() {
  formSection.classList.remove('open');
  formSection.setAttribute('aria-hidden', 'true');
  toggleFormBtn.textContent = '+ 아기사자 추가';
  clearForm();
  clearErrors();
}

toggleFormBtn.addEventListener('click', () => {
  const isOpen = formSection.classList.contains('open');
  isOpen ? closeForm() : openForm();
});

cancelBtn.addEventListener('click', closeForm);

// ── 4. 유효성 검사 ────────────────────────────────
function validateField(input, errorId, message) {
  const errorEl = document.getElementById(errorId);
  if (!input.value.trim()) {
    errorEl.textContent = message;
    input.classList.add('invalid');
    return false;
  }
  errorEl.textContent = '';
  input.classList.remove('invalid');
  return true;
}

function validate() {
  const v1 = validateField(inputName,   'error-name',   '이름을 입력해주세요.');
  const v2 = validateField(inputPart,   'error-part',   '파트를 선택해주세요.');
  const v3 = validateField(inputSkills, 'error-skills', '관심기술을 입력해주세요.');
  const v4 = validateField(inputIntro,  'error-intro',  '한줄소개를 입력해주세요.');
  return v1 && v2 && v3 && v4;
}

function clearErrors() {
  ['error-name','error-part','error-skills','error-intro'].forEach(id => {
    document.getElementById(id).textContent = '';
  });
  [inputName, inputPart, inputSkills, inputIntro].forEach(el => {
    el.classList.remove('invalid');
  });
}

// 실시간 오류 제거 (입력 시 빨간테두리 해제)
[inputName, inputPart, inputSkills, inputIntro].forEach(el => {
  el.addEventListener('input', () => {
    if (el.value.trim()) {
      el.classList.remove('invalid');
      const errId = 'error-' + el.id.replace('input-', '');
      const errEl = document.getElementById(errId);
      if (errEl) errEl.textContent = '';
    }
  });
});

// ── 5. 멤버 추가 ──────────────────────────────────
submitBtn.addEventListener('click', () => {
  if (!validate()) return;

  // 스킬 배열로 파싱
  const skillsArray = inputSkills.value
    .split(',')
    .map(s => s.trim())
    .filter(s => s.length > 0);

  // 새 멤버 객체 생성
  const newMember = {
    id:     nextId++,
    name:   inputName.value.trim(),
    part:   inputPart.value,
    skills: skillsArray,
    intro:  inputIntro.value.trim(),
  };

  // 배열에 추가
  membersData.push(newMember);

  // UI 업데이트
  renderCard(newMember);
  updateTotal();
  closeForm();
});

// ── 6. 카드 렌더링 ────────────────────────────────
const AVATARS = ['🦁', '🐯', '🐻', '🦊', '🐼', '🐨', '🐸', '🐺'];

function renderCard(member) {
  // 빈 상태 숨김
  emptyState.classList.add('hidden');

  const avatar = AVATARS[(member.id - 1) % AVATARS.length];

  // 스킬 태그 HTML 생성
  const skillsHTML = member.skills
    .map(s => `<span class="skill-tag">${escapeHtml(s)}</span>`)
    .join('');

  // 카드 요소 동적 생성
  const card = document.createElement('article');
  card.classList.add('member-card');
  card.dataset.id = member.id;

  card.innerHTML = `
    <div class="card-accent"></div>
    <div class="card-body">
      <div class="card-header">
        <div class="card-avatar">${avatar}</div>
        <div class="card-info">
          <div class="card-name">${escapeHtml(member.name)}</div>
          <span class="card-part">${escapeHtml(member.part)}</span>
        </div>
        <button class="delete-btn" aria-label="${escapeHtml(member.name)} 삭제">✕</button>
      </div>
      <p class="card-intro">${escapeHtml(member.intro)}</p>
      <div class="card-skills">${skillsHTML}</div>
    </div>
  `;

  // 삭제 버튼 이벤트 - addEventListener 사용
  card.querySelector('.delete-btn').addEventListener('click', () => {
    deleteMember(member.id, card);
  });

  cardsGrid.appendChild(card);
}

// ── 7. 멤버 삭제 ──────────────────────────────────
function deleteMember(id, cardEl) {
  // 배열에서 제거
  membersData = membersData.filter(m => m.id !== id);

  // 카드 DOM 제거 (fade-out 애니메이션)
  cardEl.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  cardEl.style.opacity = '0';
  cardEl.style.transform = 'scale(0.9)';
  setTimeout(() => {
    cardEl.remove();
    updateTotal();

    // 카드가 없으면 빈 상태 표시
    if (membersData.length === 0) {
      emptyState.classList.remove('hidden');
    }
  }, 250);
}

// ── 8. 총 인원 업데이트 ───────────────────────────
function updateTotal() {
  totalCount.textContent = membersData.length;
}

// ── 9. 폼 초기화 ──────────────────────────────────
function clearForm() {
  inputName.value   = '';
  inputPart.value   = '';
  inputSkills.value = '';
  inputIntro.value  = '';
}

// ── 10. XSS 방지 헬퍼 ────────────────────────────
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ── 11. 초기 렌더링 (페이지 로드 시) ─────────────
updateTotal();
