/**
 * @file WeeklyNavigation.jsx
 * @description 주간 모드 전용 컨트롤러. 주간 날짜 범위 표시 및 월~일 그리드 배치와 카운팅 구현
 * * @param {Object} props
 * @param {Date} props.weekStartDate - 주의 시작일 (월요일 Date 객체)
 * @param {string|null} props.selectedWeeklyDate - 주간 모드 내에서 단일 필터링용으로 선택한 날짜 (YYYY-MM-DD)
 * @param {Function} props.onWeekChange - 한 주 전/후 이동 제어 핸들러
 * @param {Function} props.onSelectDate - 주간 그리드 내 일자 선택/해제 핸들러
 * @param {Array} props.todos - 투두 카운팅 대조용 전역 투두 배열 원본
 */
import React from 'react';
import { formatDate, getWeekRangeText } from '../../util/dateUtils';

function WeeklyNavigation({ weekStartDate, selectedWeeklyDate, onWeekChange, onSelectDate, todos }) {
    // 한국어 요일 매핑 (기본 바닐라 기준 월요일부터 시작)
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
    const todayStr = formatDate(new Date());

    const handlePrevWeek = () => {
        const prevWeekStart = new Date(weekStartDate);
        prevWeekStart.setDate(prevWeekStart.getDate() - 7);
        onWeekChange(prevWeekStart);
    };

    const handleNextWeek = () => {
        const nextWeekStart = new Date(weekStartDate);
        nextWeekStart.setDate(nextWeekStart.getDate() + 7);
        onWeekChange(nextWeekStart);
    };

    const handleDayClick = (targetDate) => {
        onSelectDate(targetDate);
    };

    return (
        <div className="flex flex-col bg-[#fafafa] border-b border-[#eee]">
            {/* 1) 상단 주간 네비게이션 컨트롤 바 */}
            <div className="flex items-center justify-between p-4 px-5">
                <button
                    onClick={handlePrevWeek}
                    className="w-9 h-9 border border-[#ddd] bg-white text-[#672be0] rounded cursor-pointer text-base transition-colors hover:bg-[#f0e6ff] hover:border-[#672be0]"
                >
                    ◀
                </button>
                <div className="text-xv font-semibold text-[#333]">
                    {getWeekRangeText(weekStartDate)}
                </div>
                <button
                    onClick={handleNextWeek}
                    className="w-9 h-9 border border-[#ddd] bg-white text-[#672be0] rounded cursor-pointer text-base transition-colors hover:bg-[#f0e6ff] hover:border-[#672be0]"
                >
                    ▶
                </button>
            </div>

            {/* 2) 하단 7일 요일 카드 그리드 */}
            <div className="grid grid-cols-7 gap-2 p-3.5 pt-0">
                {Array.from({ length: 7 }).map((_, index) => {
                    const date = new Date(weekStartDate);
                    date.setDate(date.getDate() + index);

                    const dateStr = formatDate(date);
                    const isToday = dateStr === todayStr;
                    const isActive = selectedWeeklyDate !== null && dateStr === selectedWeeklyDate;

                    // 해당 날짜 원본 투두 카운트 추출
                    const todoCount = todos.filter(todo => todo.date === dateStr).length;

                    return (
                        <div
                            key={index}
                            onClick={() => handleDayClick(date)}
                            className={`flex flex-col items-center justify-center py-3 px-2 border-2 rounded-md bg-white cursor-pointer transition-all text-center select-none
                                ${isActive
                                    ? 'border-[#672be0] bg-[#672be0] text-white font-semibold'
                                    : isToday
                                        ? 'border-[#672be0] bg-white'
                                        : 'border-[#ddd] hover:border-[#672be0] hover:bg-[#f0e6ff]'
                                }`}
                        >
                            <div
                                className={`text-[11px] font-medium mb-1 ${isActive
                                    ? 'text-black'
                                    : isToday
                                        ? 'text-[#672be0]'
                                        : 'text-[#666]'
                                    }`}
                            >
                                {dayNames[index]}
                            </div>
                            <div
                                className={`text-sm font-bold mb-1.5 ${isActive
                                    ? 'text-black'
                                    : isToday
                                        ? 'text-[#672be0]'
                                        : 'text-[#333]'
                                    }`}
                            >
                                {date.getDate()}
                            </div>
                            <div
                                className={`text-xs font-medium ${isActive
                                        ? 'text-black/80'
                                        : isToday
                                            ? 'text-[#672be0]'
                                            : 'text-[#999]'
                                    }`}
                            >
                                {todoCount}개
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default WeeklyNavigation;