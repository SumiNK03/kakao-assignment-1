/**
 * @file TodoItem.jsx
 * @description 개별 할 일 항목의 상태 표기, 완료 체크 토글, 수정창 전환 및 삭제를 담당하는 컴포넌트
 * * @param {Object} props
 * @param {Object} props.todo - 단일 투두 데이터 객체
 * @param {Function} props.onToggleTodo - 완료 상태 토글 함수
 * @param {Function} props.onDeleteTodo - 삭제 처리 함수
 * @param {Function} props.onUpdateTodo - 텍스트 수정 저장 함수
 */
import React, { useState } from 'react';
import editIcon from '../../assets/edit.svg';
import deleteIcon from '../../assets/delete.svg';

function TodoItem({ todo, onToggleTodo, onDeleteTodo, onUpdateTodo }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleUpdate = () => {
        const trimmed = editText.trim();
        if (trimmed === '') {
            alert('TODO를 입력해주세요.');
            return;
        }
        onUpdateTodo(todo.id, trimmed);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleUpdate();
        }
    };

    const handleEditCancel = () => {
        setIsEditing(false);
        setEditText(todo.text);
    };

    // 기존 리스트 구조인 <li> 태그 원형 보존 및 완료 마킹 스타일 적용
    return (
        <li className={`flex justify-between items-center py-3.5 px-5 border-b border-[#eee] gap-3.5 min-h-[61px]
            ${todo.completed ? 'bg-gray-50' : 'bg-white'}`}
        >
            {isEditing ? (
                // 1) 편집 모드 UI
                <>
                    <div className="flex items-center gap-3 flex-1">
                        <input
                            type="text"
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="flex-1 py-2 px-3.5 border border-[#672be0] rounded text-base focus:outline-none"
                            autoFocus
                        />
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={handleUpdate}
                            className="py-1.5 px-3 bg-[#672be0] text-white border border-[#672be0] rounded text-sm cursor-pointer hover:bg-[#5622bd]"
                        >
                            저장
                        </button>
                        <button 
                            onClick={handleEditCancel}
                            className="py-1.5 px-3 bg-white text-gray-500 border border-gray-300 rounded text-sm cursor-pointer hover:bg-gray-100"
                        >
                            취소
                        </button>
                    </div>
                </>
            ) : (
                // 2) 일반 조회 모드 UI
                <>
                    <div className="flex items-center gap-3 flex-1">
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => onToggleTodo(todo.id)}
                            className="w-5 h-5 cursor-pointer accent-[#672be0]"
                        />
                        <span className={`text-base text-[#333] break-all transition-all
                            ${todo.completed ? 'line-through text-[#999]' : ''}`}
                        >
                            {todo.text}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="p-1.5 cursor-pointer hover:opacity-70 transition-opacity"
                        >
                            <img src={editIcon} alt="수정" className="w-5 h-5" />
                        </button>
                        <button 
                            onClick={() => onDeleteTodo(todo.id)}
                            className="p-1.5 cursor-pointer hover:opacity-70 transition-opacity"
                        >
                            <img src={deleteIcon} alt="삭제" className="w-5 h-5" />
                        </button>
                    </div>
                </>
            )}
        </li>
    );
}

export default TodoItem;