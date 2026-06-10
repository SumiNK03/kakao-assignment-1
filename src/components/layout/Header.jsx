/**
 * @file Header.jsx
 * @description 애플리케이션의 최상단 타이틀을 표시하는 고정 레이아웃 헤더 컴포넌트
 * * @param {Object} props - 현재 컴포넌트는 Props를 받지 않습니다.
 */
import React from 'react';

function Header() {
    return (
        <header className="bg-[#672be0] text-white p-5 text-center">
            <h1 className="text-2xl font-bold tracking-wide">Todo App</h1>
        </header>
    );
}

export default Header;