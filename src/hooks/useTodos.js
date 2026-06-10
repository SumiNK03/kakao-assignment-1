/**
 * @file useTodos.js
 * @description 투두 데이터의 CRUD 핵심 비즈니스 로직을 격리하여 상태를 전담 관리하는 도메인 커스텀 훅
 * @returns {Object} todos 배열 원본 및 추가, 삭제, 체크 토글, 수정 연산 함수 모음
 */
import useLocalStorage from './useLocalStorage';

function useTodos() {
    // 기존 바닐라 앱의 스토리지 포맷 구조({ todos, todoIdCounter })와 100% 동기화
    const [storageData, setStorageData] = useLocalStorage('todoAppData', {
        todos: [],
        todoIdCounter: 1
    });

    const { todos, todoIdCounter } = storageData;

    /**
     * @description 신규 투두 추가 연산
     * @param {string} text - 할 일 내용
     * @param {string} date - 배정될 날짜 (YYYY-MM-DD)
     */
    const addTodo = (text, date) => {
        const newTodo = {
            id: todoIdCounter,
            text,
            completed: false,
            date // 데이터 포맷 싱크 완료
        };

        setStorageData({
            todos: [...todos, newTodo],
            todoIdCounter: todoIdCounter + 1
        });
    };

    /**
     * @description 투두 항목 제거 (바닐라 컨펌 모달 재현)
     * @param {number} id - 대상 투두 고유 ID
     */
    const deleteTodo = (id) => {
        if (window.confirm('이 TODO를 삭제하시겠습니까?')) {
            setStorageData({
                ...storageData,
                todos: todos.filter(todo => todo.id !== id)
            });
        }
    };

    /**
     * @description 투두 완료 여부 토글 체크 변환
     * @param {number} id - 대상 투두 고유 ID
     */
    const toggleTodo = (id) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        );
        setStorageData({ ...storageData, todos: updatedTodos });
    };

    /**
     * @description 투두 인라인 텍스트 문구 전면 수정 및 저장
     * @param {number} id - 대상 투두 고유 ID
     * @param {string} newText - 새롭게 치환될 투두 내용
     */
    const updateTodo = (id, newText) => {
        const updatedTodos = todos.map(todo =>
            todo.id === id ? { ...todo, text: newText } : todo
        );
        setStorageData({ ...storageData, todos: updatedTodos });
    };

    return { todos, addTodo, deleteTodo, toggleTodo, updateTodo };
}

export default useTodos;