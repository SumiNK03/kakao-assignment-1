# 📋 Todo App

React와 Tailwind CSS를 활용하여 구현한 Todo 관리 애플리케이션입니다.

기존 바닐라 JavaScript 기반 Todo 프로젝트를 React 컴포넌트 구조로 리팩토링하였으며, 일간(Daily) / 주간(Weekly) 뷰를 지원합니다.

---

## 🚀 주요 기능

### ✅ Todo 관리

* Todo 추가
* Todo 수정
* Todo 완료 상태 토글
* Todo 삭제

### 📅 일간 뷰

* 특정 날짜의 Todo 조회
* 이전 / 다음 날짜 이동
* 선택한 날짜 기준 Todo 관리

### 📆 주간 뷰

* 한 주 단위 Todo 조회
* 이전 / 다음 주 이동
* 특정 날짜 선택
* 선택된 날짜만 필터링
* 날짜별 Todo 개수 표시

### 🔍 필터 기능

* 전체(All)
* 진행중(Doing)
* 완료(Done)

### 💾 데이터 저장

* LocalStorage를 활용한 데이터 영속화
* 새로고침 후에도 데이터 유지

---

# 🏗️ 프로젝트 구조

```text
src
├── components
│   ├── common
│   │   ├── FilterTabs.jsx
│   │   ├── TodoInput.jsx
│   │   └── ToggleSwitch.jsx
│   │
│   ├── layout
│   │   └── Header.jsx
│   │
│   └── todo
│       ├── DailyNavigation.jsx
│       ├── WeeklyNavigation.jsx
│       ├── TodoItem.jsx
│       └── TodoList.jsx
│
├── hooks
│   ├── useLocalStorage.js
│   └── useTodos.js
│
├── util
│   └── dateUtils.js
│
├── App.jsx
├── main.jsx
└── index.css
```

---

# 📂 폴더 및 파일 설명

## App.jsx

애플리케이션의 최상위 컴포넌트입니다.

### 담당 역할

* 전체 상태 관리
* Daily / Weekly 뷰 전환
* 선택 날짜 관리
* 선택 주차 관리
* Todo 필터링
* 컴포넌트 조립

---

## components/common

공통 UI 컴포넌트를 관리하는 폴더입니다.

### FilterTabs.jsx

Todo 필터 버튼 영역입니다.

#### 기능

* 전체 보기
* 진행중 보기
* 완료 보기

#### Props

```js
currentFilter
onFilterChange
```

---

### TodoInput.jsx

Todo 입력 영역입니다.

#### 기능

* 입력값 관리
* Enter 입력 처리
* Todo 추가 요청

#### Props

```js
onAddTodo
```

---

### ToggleSwitch.jsx

일간 / 주간 모드를 전환하는 스위치입니다.

#### 기능

* Daily View
* Weekly View

#### Props

```js
isWeeklyView
onToggle
```

---

## components/layout

레이아웃 관련 컴포넌트를 관리합니다.

### Header.jsx

상단 헤더 영역입니다.

#### 기능

* 앱 제목 표시

---

## components/todo

Todo 기능과 직접 관련된 컴포넌트입니다.

### DailyNavigation.jsx

일간 뷰 전용 네비게이션입니다.

#### 기능

* 이전 날짜 이동
* 다음 날짜 이동
* 현재 선택 날짜 표시

#### Props

```js
currentDate
onDateChange
```

---

### WeeklyNavigation.jsx

주간 뷰 전용 네비게이션입니다.

#### 기능

* 이전 주 이동
* 다음 주 이동
* 주간 범위 표시
* 날짜 선택 / 해제
* 날짜별 Todo 개수 표시

#### Props

```js
weekStartDate
selectedWeeklyDate
onWeekChange
onSelectDate
todos
```

---

### TodoItem.jsx

개별 Todo를 렌더링하는 컴포넌트입니다.

#### 기능

* Todo 내용 표시
* 완료 상태 토글
* 수정
* 삭제

#### Props

```js
todo
onToggleTodo
onDeleteTodo
onUpdateTodo
```

---

### TodoList.jsx

Todo 목록을 렌더링하는 컴포넌트입니다.

#### 기능

* TodoItem 반복 렌더링
* 빈 목록 처리

#### Props

```js
filteredTodos
onToggleTodo
onDeleteTodo
onUpdateTodo
```

---

## hooks

커스텀 훅을 관리합니다.

### useLocalStorage.js

LocalStorage 상태 관리를 담당합니다.

#### 기능

* 초기 데이터 로드
* 데이터 저장
* 상태 동기화

#### 반환값

```js
[value, setValue]
```

---

### useTodos.js

Todo 관련 비즈니스 로직을 담당합니다.

#### 기능

* Todo 추가
* Todo 수정
* Todo 삭제
* 완료 상태 변경

#### 반환값

```js
{
  todos,
  addTodo,
  deleteTodo,
  toggleTodo,
  updateTodo
}
```

---

## util

유틸리티 함수를 관리합니다.

### dateUtils.js

날짜 관련 순수 함수 모음입니다.

#### formatDate(date)

Date 객체를

```text
YYYY-MM-DD
```

형태의 문자열로 변환합니다.

---

#### getMonday(date)

특정 날짜가 포함된 주의 월요일을 반환합니다.

---

#### getWeekRangeText(weekStartDate)

주간 범위를 문자열로 반환합니다.

예시

```text
6월 9일 - 15일
```

---

# 🛠️ 사용 기술

* React
* Vite
* Tailwind CSS
* JavaScript (ES6+)
* LocalStorage

---

# ▶️ 실행 방법

### 패키지 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

### 빌드

```bash
npm run build
```

### 미리보기

```bash
npm run preview
```
