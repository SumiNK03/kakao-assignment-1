// ===== 전역 상태 관리 =====
// 로컬스토리지 키
const STORAGE_KEY = 'todoAppData';

// TODO 항목들을 저장하는 배열
let todos = [];
let todoIdCounter = 1;
// 현재 선택된 필터 ('all', 'doing', 'done')
let currentFilter = 'all';
// 현재 선택된 날짜 (Date 객체)
let currentDate = new Date();
// 뷰 모드 (true: 주간, false: 일간)
let isWeeklyView = false;
// 주간 뷰의 시작 날짜 (월요일)
let weekStartDate = getMonday(new Date());
// 주간 뷰에서 선택된 날짜 (null이면 선택 없음, 주간의 모든 일정 표시)
let selectedWeeklyDate = null;

// ===== DOM 요소 선택 =====
const todoInput = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');
const filterBtns = document.querySelectorAll('.filter-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const dateInput = document.getElementById('dateInput');
// 뷰 토글 요소
const viewToggle = document.getElementById('viewToggle');
const dailyView = document.getElementById('dailyView');
const weeklyView = document.getElementById('weeklyView');
const prevWeekBtn = document.getElementById('prevWeekBtn');
const nextWeekBtn = document.getElementById('nextWeekBtn');
const weekRange = document.getElementById('weekRange');
const weekGrid = document.getElementById('weekGrid');
const viewModeText = document.getElementById('viewModeText');

// ===== 이벤트 리스너 등록 =====
addBtn.addEventListener('click', createNewTodo);
todoInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    createNewTodo();
  }
});

// 필터 버튼 이벤트 리스너
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.getAttribute('data-filter');
    setActiveFilter(filter);
  });
});

// 날짜 네비게이션 이벤트 리스너
prevBtn.addEventListener('click', previousDay);
nextBtn.addEventListener('click', nextDay);
dateInput.addEventListener('change', (event) => {
  const selectedDate = new Date(event.target.value + 'T00:00:00');
  setCurrentDate(selectedDate);
});

// 뷰 토글 이벤트 리스너
viewToggle.addEventListener('change', () => {
  isWeeklyView = viewToggle.checked;
  switchView();
  if (isWeeklyView) {
    renderWeekView();
  } else {
    renderTodos();
  }
});

// 주간 뷰 네비게이션 이벤트 리스너
prevWeekBtn.addEventListener('click', previousWeek);
nextWeekBtn.addEventListener('click', nextWeek);

// ===== FILTER: 필터 활성화 및 UI 업데이트 =====
function setActiveFilter(filter) {
  // 현재 필터 업데이트
  currentFilter = filter;

  // 모든 필터 버튼에서 active 클래스 제거
  filterBtns.forEach((btn) => {
    btn.classList.remove('active');
  });

  // 선택된 필터 버튼에 active 클래스 추가
  document.querySelector(`[data-filter="${filter}"]`).classList.add('active');

  // 화면 재렌더링
  renderTodos();
}

// ===== STORAGE: 로컬스토리지에 데이터 저장 =====
function saveTodosToStorage() {
  // todos 배열을 JSON 문자열로 변환하여 저장
  const storageData = {
    todos: todos,
    todoIdCounter: todoIdCounter
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storageData));
}

// ===== STORAGE: 로컬스토리지에서 데이터 로드 =====
function loadTodosFromStorage() {
  const storedData = localStorage.getItem(STORAGE_KEY);
  
  if (storedData) {
    try {
      const parsedData = JSON.parse(storedData);
      todos = parsedData.todos || [];
      todoIdCounter = parsedData.todoIdCounter || 1;
    } catch (error) {
      console.error('로컬스토리지 데이터 로드 실패:', error);
      todos = [];
      todoIdCounter = 1;
    }
  }
}

// ===== VIEW: 뷰 전환 함수 =====
function switchView() {
  if (isWeeklyView) {
    // 주간 뷰로 전환
    dailyView.classList.remove('active');
    weeklyView.classList.add('active');
    viewModeText.textContent = '주간 뷰';
    viewModeText.style.color = '#1e88e5';
    // 주간 뷰로 전환할 때 선택 상태 초기화 (주간의 모든 일정 표시)
    selectedWeeklyDate = null;
  } else {
    // 일간 뷰로 전환
    dailyView.classList.add('active');
    weeklyView.classList.remove('active');
    viewModeText.textContent = '일간 뷰';
    viewModeText.style.color = '#672be0';
  }
}

// ===== DATE: 지정된 날짜가 속한 주의 월요일 반환 =====
function getMonday(date) {
  const d = new Date(date);
  const day = d.getDay();
  // 0(일요일)이면 -6, 1(월요일)이면 -0, ..., 6(토요일)이면 -5
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff));
}

// ===== DATE: 이전 주로 이동 =====
function previousWeek() {
  weekStartDate.setDate(weekStartDate.getDate() - 7);
  selectedWeeklyDate = null; // 선택 상태 초기화
  renderWeekView();
  renderTodos();
}

// ===== DATE: 다음 주로 이동 =====
function nextWeek() {
  weekStartDate.setDate(weekStartDate.getDate() + 7);
  selectedWeeklyDate = null; // 선택 상태 초기화
  renderWeekView();
  renderTodos();
}

// ===== DATE: 주간 범위 포맷팅 =====
function getWeekRangeText() {
  const endDate = new Date(weekStartDate);
  endDate.setDate(endDate.getDate() + 6);
  const startMonth = weekStartDate.getMonth() + 1;
  const startDay = weekStartDate.getDate();
  const endMonth = endDate.getMonth() + 1;
  const endDay = endDate.getDate();
  
  if (startMonth === endMonth) {
    return `${startMonth}월 ${startDay} - ${endDay}일`;
  } else {
    return `${startMonth}월 ${startDay}일 - ${endMonth}월 ${endDay}일`;
  }
}

// ===== DATE: 특정 날짜의 TODO 개수 반환 =====
function getTodoCountForDate(date) {
  const dateString = formatDate(date);
  return todos.filter((todo) => todo.date === dateString).length;
}

// ===== VIEW: 주간 뷰 렌더링 =====
function renderWeekView() {
  // 주간 범위 업데이트
  weekRange.textContent = getWeekRangeText();
  
  // 주간 그리드 초기화
  weekGrid.innerHTML = '';
  
  // 요일 배열
  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // 월요일부터 일요일까지 7개 날짜 생성
  for (let i = 0; i < 7; i++) {
    const date = new Date(weekStartDate);
    date.setDate(date.getDate() + i);
    
    const dayItem = document.createElement('div');
    dayItem.className = 'week-day-item';
    
    // 오늘 날짜 확인
    if (formatDate(date) === formatDate(today)) {
      dayItem.classList.add('today');
    }
    
    // 선택된 날짜 확인
    if (selectedWeeklyDate !== null && formatDate(date) === selectedWeeklyDate) {
      dayItem.classList.add('active');
    }
    
    // TODO 개수
    const todoCount = getTodoCountForDate(date);
    
    dayItem.innerHTML = `
      <div class="week-day-name">${dayNames[i]}</div>
      <div class="week-day-date">${date.getDate()}</div>
      <div class="week-day-count">${todoCount}개</div>
    `;
    
    // 날짜 클릭 이벤트
    dayItem.addEventListener('click', () => {
      const dateStr = formatDate(date);
      // 같은 날짜 다시 클릭 시 선택 해제
      if (selectedWeeklyDate === dateStr) {
        selectedWeeklyDate = null;
      } else {
        // 다른 날짜 클릭 시 선택
        selectedWeeklyDate = dateStr;
      }
      // 주간 뷰 모드 유지하면서 렌더링
      renderWeekView();
      renderTodos();
    });
    
    weekGrid.appendChild(dayItem);
  }
}

// ===== DATE: 날짜 포맷팅 (YYYY-MM-DD 형식 반환) =====
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// ===== DATE: 현재 선택 날짜 업데이트 =====
function setCurrentDate(date) {
  currentDate = new Date(date);
  updateDateDisplay();
  renderTodos();
}

// ===== DATE: 이전 날짜로 이동 =====
function previousDay() {
  currentDate.setDate(currentDate.getDate() - 1);
  updateDateDisplay();
  renderTodos();
}

// ===== DATE: 다음 날짜로 이동 =====
function nextDay() {
  currentDate.setDate(currentDate.getDate() + 1);
  updateDateDisplay();
  renderTodos();
}

// ===== DATE: 날짜 입력창 업데이트 =====
function updateDateDisplay() {
  dateInput.value = formatDate(currentDate);
}

// ===== FILTER: 필터 조건 + 날짜로 TODO 반환 =====
function getFilteredTodos() {
  let filtered = [];

  if (isWeeklyView) {
    // 주간 뷰: selectedWeeklyDate에 따라 필터링
    if (selectedWeeklyDate === null) {
      // 선택된 날짜 없음: 해당 주의 모든 TODO 표시
      const endDate = new Date(weekStartDate);
      endDate.setDate(endDate.getDate() + 6);
      
      filtered = todos.filter((todo) => {
        const todoDate = new Date(todo.date + 'T00:00:00');
        return todoDate >= weekStartDate && todoDate <= endDate;
      });
    } else {
      // 선택된 날짜 있음: 해당 날짜의 TODO만 표시
      filtered = todos.filter((todo) => todo.date === selectedWeeklyDate);
    }
  } else {
    // 일간 뷰: 현재 선택된 날짜 기준
    const selectedDateString = formatDate(currentDate);
    filtered = todos.filter((todo) => todo.date === selectedDateString);
  }

  // 상태별로 추가 필터링
  if (currentFilter === 'all') {
    // 전체: 모든 TODO 반환
    return filtered;
  } else if (currentFilter === 'doing') {
    // 진행중: 완료되지 않은 TODO만 반환
    return filtered.filter((todo) => !todo.completed);
  } else if (currentFilter === 'done') {
    // 완료: 완료된 TODO만 반환
    return filtered.filter((todo) => todo.completed);
  }
}

// ===== CREATE: 새로운 TODO 생성 =====
function createNewTodo() {
  // 입력값 가져오기 및 공백 제거
  const inputValue = todoInput.value.trim();

  // 입력값이 비어있는지 확인
  if (inputValue === '') {
    alert('TODO를 입력해주세요.');
    return;
  }

  // 새로운 TODO 객체 생성 (날짜 포함)
  const newTodo = {
    id: todoIdCounter++,
    text: inputValue,
    completed: false,
    isEditing: false,
    date: formatDate(currentDate)
  };

  // 전역 배열에 추가
  todos.push(newTodo);

  // 로컬스토리지에 저장
  saveTodosToStorage();

  // 화면 업데이트
  renderTodos();

  // 입력창 초기화
  todoInput.value = '';
  todoInput.focus();
}

// ===== READ: TODO 목록 렌더링 (필터링 적용) =====
function renderTodos() {
  // 기존 리스트 초기화
  todoList.innerHTML = '';

  // 필터링된 TODO 항목 가져오기
  const filteredTodos = getFilteredTodos();

  // 각 필터링된 TODO 항목을 DOM에 추가
  filteredTodos.forEach((todo) => {
    const todoItem = createTodoElement(todo);
    todoList.appendChild(todoItem);
  });
}

// ===== 개별 TODO 요소 생성 =====
function createTodoElement(todo) {
  const li = document.createElement('li');
  li.className = 'todo-item';
  li.id = `todo-${todo.id}`;

  // 완료 상태에 따라 클래스 추가
  if (todo.completed) {
    li.classList.add('completed');
  }

  // 편집 모드 여부에 따라 다른 HTML 생성
  if (todo.isEditing) {
    li.innerHTML = `
      <div class="todo-content">
        <input 
          type="text" 
          class="edit-input" 
          value="${todo.text}"
          data-todo-id="${todo.id}"
        >
      </div>
      <div class="todo-actions">
        <button class="save-btn" data-todo-id="${todo.id}">저장</button>
      </div>
    `;

    // 저장 버튼 클릭 이벤트
    const saveBtn = li.querySelector('.save-btn');
    saveBtn.addEventListener('click', () => saveTodoEdit(todo.id));

    // Enter 키로도 저장 가능
    const editInput = li.querySelector('.edit-input');
    editInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        saveTodoEdit(todo.id);
      }
    });
    editInput.focus();
  } else {
    li.innerHTML = `
      <div class="todo-content">
        <input 
          type="checkbox" 
          class="complete-checkbox" 
          ${todo.completed ? 'checked' : ''}
          data-todo-id="${todo.id}"
        >
        <span class="todo-text">${todo.text}</span>
      </div>
      <div class="todo-actions">
        <button class="edit-btn" data-todo-id="${todo.id}"><img src="edit.svg" alt="수정"></button>
        <button class="delete-btn" data-todo-id="${todo.id}"><img src="delete.svg" alt="삭제"></button>
      </div>
    `;

    // 완료 체크박스 이벤트
    const checkbox = li.querySelector('.complete-checkbox');
    checkbox.addEventListener('change', () => toggleCompleteTodo(todo.id));

    // 수정 버튼 이벤트
    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', () => startEditTodo(todo.id));

    // 삭제 버튼 이벤트
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
  }

  return li;
}

// ===== UPDATE: TODO 완료 토글 =====
function toggleCompleteTodo(todoId) {
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    todo.completed = !todo.completed;
    // 로컬스토리지에 저장
    saveTodosToStorage();
    renderTodos();
  }
}

// ===== UPDATE: TODO 편집 시작 =====
function startEditTodo(todoId) {
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    todo.isEditing = true;
    renderTodos();
  }
}

// ===== UPDATE: TODO 편집 저장 =====
function saveTodoEdit(todoId) {
  const todo = todos.find(t => t.id === todoId);
  if (todo) {
    // 편집 입력값 가져오기
    const editInput = document.querySelector(`[data-todo-id="${todoId}"].edit-input`);
    const newText = editInput.value.trim();

    // 입력값이 비어있는지 확인
    if (newText === '') {
      alert('TODO를 입력해주세요.');
      return;
    }

    // 텍스트 업데이트 및 편집 모드 해제
    todo.text = newText;
    todo.isEditing = false;
    // 로컬스토리지에 저장
    saveTodosToStorage();
    renderTodos();
  }
}

// ===== DELETE: TODO 삭제 =====
function deleteTodo(todoId) {
  // 확인 후 삭제
  if (confirm('이 TODO를 삭제하시겠습니까?')) {
    todos = todos.filter(todo => todo.id !== todoId);
    // 로컬스토리지에 저장
    saveTodosToStorage();
    renderTodos();
  }
}

// ===== 초기 렌더링 =====
// 로컬스토리지에서 데이터 로드
loadTodosFromStorage();
// 날짜 표시 및 화면 업데이트
updateDateDisplay();
renderTodos();
