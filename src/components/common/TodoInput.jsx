/**
 * @file TodoInput.jsx
 * @description 새로운 투두 할 일을 입력하고 추가하는 컴포넌트
 * * @param {Object} props
 * @param {Function} props.onAddTodo - 투두 추가 로직을 실행하는 핸들러 함수
 */
import React, { useState } from 'react';

function TodoInput({ onAddTodo }) {
    const [inputText, setInputText] = useState('');

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAddTodo = () => {
        const trimmedText = inputText.trim();
        
        // 기존 바닐라의 예외 처리 얼럿 재현
        if (trimmedText === '') {
            alert('TODO를 입력해주세요.');
            return;
        }

        onAddTodo(trimmedText);
        setInputText('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className="flex gap-2.5 p-5 border-b border-[#eee]">
            <input
                type="text"
                value={inputText}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                placeholder="새로운 TODO를 입력하세요"
                className="flex-1 py-2.5 px-4 border border-[#ddd] rounded text-base focus:outline-none focus:border-[#672be0] focus:ring-1 focus:ring-[#672be0]"
            />
            <button 
                onClick={handleAddTodo}
                className="py-2.5 px-5 bg-[#672be0] text-white border-none rounded text-base cursor-pointer hover:bg-[#5622bd] transition-colors"
            >
                추가
            </button>
        </div>
    );
}

export default TodoInput;