/**
 * @file App.jsx
 * @description Todo 앱의 최상위 컴포넌트
 * - 일간/주간 뷰 상태 관리
 * - 날짜 및 주간 상태 관리
 * - 필터 상태 관리
 * - Todo CRUD 훅 연동
 * - 화면에 표시할 Todo 필터링
 */

import { useMemo, useState } from 'react';

import Header from './components/layout/Header';
import ToggleSwitch from './components/common/ToggleSwitch';
import TodoInput from './components/common/TodoInput';
import FilterTabs from './components/common/FilterTabs';

import DailyNavigation from './components/todo/DailyNavigation';
import WeeklyNavigation from './components/todo/WeeklyNavigation';
import TodoList from './components/todo/TodoList';

import useTodos from './hooks/useTodos';

import {
    formatDate,
    getMonday,
} from './util/dateUtils.js';

function App() {
    const {
        todos,
        addTodo,
        deleteTodo,
        toggleTodo,
        updateTodo,
    } = useTodos();

    // 일간 / 주간 모드
    const [isWeeklyView, setIsWeeklyView] = useState(false);

    // 일간 모드 날짜
    const [currentDate, setCurrentDate] = useState(new Date());

    // 주간 모드 시작일 (월요일)
    const [weekStartDate, setWeekStartDate] = useState(
        getMonday(new Date())
    );

    // 주간 선택 날짜
    const [selectedWeeklyDate, setSelectedWeeklyDate] = useState(null);

    // 필터
    const [currentFilter, setCurrentFilter] = useState('all');

    /**
     * 현재 화면에 표시할 Todo 계산
     */
    const filteredTodos = useMemo(() => {
        let result = [];

        if (isWeeklyView) {
            // 특정 날짜 선택
            if (selectedWeeklyDate) {
                result = todos.filter(
                    todo => todo.date === selectedWeeklyDate
                );
            }
            // 해당 주 전체
            else {
                const weekEndDate = new Date(weekStartDate);
                weekEndDate.setDate(weekEndDate.getDate() + 6);

                result = todos.filter(todo => {
                    const todoDate = new Date(
                        `${todo.date}T00:00:00`
                    );

                    return (
                        todoDate >= weekStartDate &&
                        todoDate <= weekEndDate
                    );
                });
            }
        } else {
            const currentDateString = formatDate(currentDate);

            result = todos.filter(
                todo => todo.date === currentDateString
            );
        }

        switch (currentFilter) {
            case 'doing':
                return result.filter(todo => !todo.completed);

            case 'done':
                return result.filter(todo => todo.completed);

            default:
                return result;
        }
    }, [
        todos,
        isWeeklyView,
        currentDate,
        weekStartDate,
        selectedWeeklyDate,
        currentFilter,
    ]);

    /**
     * Todo 추가
     */
    const handleAddTodo = text => {
        addTodo(text, formatDate(currentDate));
    };

    /**
     * 뷰 전환
     */
    const handleToggleView = () => {
        setIsWeeklyView(prev => !prev);

        // 주간 뷰 진입 시 선택 상태 초기화
        setSelectedWeeklyDate(null);
    };

    /**
     * 주간 날짜 선택
     */
    const handleSelectWeeklyDate = date => {
        const dateString = formatDate(date);

        if (selectedWeeklyDate === dateString) {
            setSelectedWeeklyDate(null);
        } else {
            setSelectedWeeklyDate(dateString);
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f5f5] p-5">
            <div className="max-w-[600px] mx-auto bg-white rounded-lg shadow-md overflow-hidden">
                <Header />

                <ToggleSwitch
                    isWeeklyView={isWeeklyView}
                    onToggle={handleToggleView}
                />

                {isWeeklyView ? (
                    <WeeklyNavigation
                        weekStartDate={weekStartDate}
                        selectedWeeklyDate={selectedWeeklyDate}
                        onWeekChange={setWeekStartDate}
                        onSelectDate={handleSelectWeeklyDate}
                        todos={todos}
                    />
                ) : (
                    <DailyNavigation
                        currentDate={currentDate}
                        onDateChange={setCurrentDate}
                    />
                )}

                <TodoInput
                    onAddTodo={handleAddTodo}
                />

                <FilterTabs
                    currentFilter={currentFilter}
                    onFilterChange={setCurrentFilter}
                />

                <TodoList
                    filteredTodos={filteredTodos}
                    onToggleTodo={toggleTodo}
                    onDeleteTodo={deleteTodo}
                    onUpdateTodo={updateTodo}
                />
            </div>
        </div>
    );
}

export default App;