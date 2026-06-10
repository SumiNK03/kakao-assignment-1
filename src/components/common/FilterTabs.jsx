/**
 * @file FilterTabs.jsx
 * @description 투두 리스트의 상태 필터링 탭 컴포넌트 (전체 / 진행중 / 완료)
 * * @param {Object} props
 * @param {'all' | 'doing' | 'done'} props.currentFilter - 현재 활성화된 필터 상태
 * @param {Function} props.onFilterChange - 필터 변경 핸들러 함수 (상태 업데이트용)
 */
import React from 'react';

function FilterTabs({ currentFilter, onFilterChange }) {
    // 기존 app.js 스펙에 맞춘 필터 구성 목록
    const filterOptions = [
        { key: 'all', label: '전체', activeClass: 'bg-[#E3F2FD] text-[#1E88E5] border-b-3 border-[#1E88E5]' },
        { key: 'doing', label: '진행중', activeClass: 'bg-[#FFF3E0] text-[#FB8C00] border-b-3 border-[#FB8C00]' },
        { key: 'done', label: '완료', activeClass: 'bg-[#E8F5E9] text-[#43A047] border-b-3 border-[#43A047]' },
    ];

    return (
        <div className="flex w-full bg-[#f9f9f9] border-b border-[#eee]">
            {filterOptions.map(({ key, label, activeClass }) => (
                <button
                    key={key}
                    onClick={() => onFilterChange(key)}
                    className={`flex-1 py-3 px-4 text-sm font-medium text-[#666] transition-all duration-300 ease-in-out border-b-3 border-transparent cursor-pointer text-center
                        ${currentFilter === key ? activeClass : 'hover:bg-gray-50'}`}
                >
                    {label}
                </button>
            ))}
        </div>
    );
}

export default FilterTabs;