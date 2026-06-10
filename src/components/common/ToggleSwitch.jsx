/**
 * @file ToggleSwitch.jsx
 * @description 일간 뷰(Daily)와 주간 뷰(Weekly) 모드를 스위칭하는 컴포넌트
 * * @param {Object} props
 * @param {boolean} props.isWeeklyView - 현재 주간 뷰 활성화 여부 (true: 주간, false: 일간)
 * @param {Function} props.onToggle - 뷰 전환 상태를 반전시키는 핸들러 함수
 */
import React from 'react';

function ToggleSwitch({ isWeeklyView, onToggle }) {
    return (
        <div className="flex justify-start items-center gap-3 py-3 px-5 bg-[#f9f9f9] border-b border-[#eee]">
            <label className="relative inline-flex items-center cursor-pointer select-none">
                {/* 실제 체크박스는 숨기고 peer 속성으로 상태 전달 */}
                <input 
                    type="checkbox" 
                    checked={isWeeklyView} 
                    onChange={onToggle} 
                    className="sr-only peer"
                />
                
                {/* 배경 슬라이더 트랙 */}
                <span className="relative w-[100px] h-10 bg-[#672be0] rounded-[20px] transition-colors duration-300 ease-in-out peer-checked:bg-[#1e88e5]">
                    {/* 내부 일간 텍스트 */}
                    <span className={`absolute top-1/2 left-1.5 -translate-y-1/2 text-[13px] font-bold text-white transition-opacity duration-300 z-10
                        ${isWeeklyView ? 'opacity-50' : 'opacity-100'}`}>
                        일간
                    </span>
                    {/* 내부 주간 텍스트 */}
                    <span className={`absolute top-1/2 right-1.5 -translate-y-1/2 text-[13px] font-bold text-white transition-opacity duration-300 z-10
                        ${isWeeklyView ? 'opacity-100' : 'opacity-50'}`}>
                        주간
                    </span>
                </span>
                
                {/* 움직이는 동그란 흰색 버튼 무브먼트 */}
                <span className="absolute w-[34px] h-[34px] bg-white rounded-full top-[3px] left-[3px] transition-all duration-300 ease-in-out shadow-[0_2px_4px_rgba(0,0,0,0.15)] z-0
                    peer-checked:left-[63px]"
                />
            </label>
            
            {/* 우측 뷰 모드 설명 텍스트 지시등 */}
            <span 
                className={`text-sm font-semibold transition-colors duration-300 ${
                    isWeeklyView ? 'text-[#1e88e5]' : 'text-[#672be0]'
                }`}
            >
                {isWeeklyView ? '주간 뷰' : '일간 뷰'}
            </span>
        </div>
    );
}

export default ToggleSwitch;