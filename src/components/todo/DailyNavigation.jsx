/**
 * @file DailyNavigation.jsx
 * @description 일간 모드에서 날짜를 앞뒤로 이동하거나 캘린더로 직접 선택하는 네비게이션 컴포넌트
 * * @param {Object} props
 * @param {Date} props.currentDate - 현재 선택된 일간 날짜 객체
 * @param {Function} props.onDateChange - 날짜 변경 핸들러 함수
 */
import React from 'react';
import { formatDate } from '../../util/dateUtils.js';

function DailyNavigation({ currentDate, onDateChange }) {
    const handlePrevDay = () => {
        const prevDate = new Date(currentDate);
        prevDate.setDate(prevDate.getDate() - 1);
        onDateChange(prevDate);
    };

    const handleNextDay = () => {
        const nextDate = new Date(currentDate);
        nextDate.setDate(nextDate.getDate() + 1);
        onDateChange(nextDate);
    };

    const handleDateChange = (e) => {
        // 타임존 깨짐 방지를 위해 자정(T00:00:00) 기준으로 안전하게 객체 생성
        const selectedDate = new Date(e.target.value + 'T00:00:00');
        onDateChange(selectedDate);
    };

    return (
        <div className="flex items-center justify-center gap-3 p-4 border-b border-[#eee] bg-[#fafafa]">
            <button 
                onClick={handlePrevDay}
                className="w-9 h-9 border border-[#ddd] bg-white text-[#672be0] rounded cursor-pointer text-base transition-colors hover:bg-[#f0e6ff] hover:border-[#672be0]"
            >
                ◀
            </button>
            <input
                type="date"
                value={formatDate(currentDate)}
                onChange={handleDateChange}
                className="py-2 px-3.5 border-2 border-[#672be0] rounded-md text-sm cursor-pointer min-w-[160px] text-center font-semibold text-[#333] bg-white transition-all hover:border-[#8b4fd9] hover:shadow-[0_0_0_3px_rgba(103,43,224,0.1)] focus:outline-none"
            />
            <button 
                onClick={handleNextDay}
                className="w-9 h-9 border border-[#ddd] bg-white text-[#672be0] rounded cursor-pointer text-base transition-colors hover:bg-[#f0e6ff] hover:border-[#672be0]"
            >
                ▶
            </button>
        </div>
    );
}

export default DailyNavigation;