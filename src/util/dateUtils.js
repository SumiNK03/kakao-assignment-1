/**
 * @file dateUtils.js
 * @description
 * Todo 앱에서 사용하는 순수 날짜 유틸리티 함수 모음
 *
 * - formatDate(date)
 *   Date 객체를 YYYY-MM-DD 문자열로 변환
 *
 * - getMonday(date)
 *   특정 날짜가 포함된 주의 월요일 반환
 *
 * - getWeekRangeText(weekStartDate)
 *   주간 범위를 문자열로 반환
 *   예) "6월 9일 - 15일"
 *
 * - isSameDate(date1, date2)
 *   두 날짜가 같은 날짜인지 비교
 */

/**
 * Date 객체 → YYYY-MM-DD
 */
export function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

/**
 * 특정 날짜가 포함된 주의 월요일 반환
 */
export function getMonday(date) {
    const d = new Date(date);

    const day = d.getDay();

    const diff =
        d.getDate() -
        day +
        (day === 0 ? -6 : 1);

    return new Date(d.setDate(diff));
}

/**
 * 주간 범위 문자열 생성
 * 예)
 * 6월 9일 - 15일
 * 6월 30일 - 7월 6일
 */
export function getWeekRangeText(weekStartDate) {
    const endDate = new Date(weekStartDate);
    endDate.setDate(endDate.getDate() + 6);

    const startMonth = weekStartDate.getMonth() + 1;
    const startDay = weekStartDate.getDate();

    const endMonth = endDate.getMonth() + 1;
    const endDay = endDate.getDate();

    if (startMonth === endMonth) {
        return `${startMonth}월 ${startDay}일 - ${endDay}일`;
    }

    return `${startMonth}월 ${startDay}일 - ${endMonth}월 ${endDay}일`;
}

/**
 * 두 날짜가 같은 날짜인지 비교
 */
export function isSameDate(date1, date2) {
    if (!date1 || !date2) {
        return false;
    }

    return formatDate(date1) === formatDate(date2);
}