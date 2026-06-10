/**
 * @file TodoList.jsx
 * @description 필터링을 거친 투두 데이터 컬렉션을 받아 일목요연하게 리스트업해주는 컴포넌트
 * * @param {Object} props
 * @param {Array} props.filteredTodos - 현재 조건에 맞춰 필터링이 끝난 투두 데이터 리스트
 */
import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ filteredTodos, onToggleTodo, onDeleteTodo, onUpdateTodo }) {
    return (
        <ul className="list-none p-0 m-0">
            {filteredTodos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggleTodo={onToggleTodo}
                    onDeleteTodo={onDeleteTodo}
                    onUpdateTodo={onUpdateTodo}
                />
            ))}
        </ul>
    );
}

export default TodoList;