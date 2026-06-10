/**
 * @file useLocalStorage.js
 * @description useState처럼 동작하되, 값이 변경될 때마다 로컬스토리지에 자동으로 동기화하는 범용 범용 커스텀 훅
 * @template T
 * @param {string} key - 로컬스토리지에 저장될 고유 키 식별자
 * @param {T} initialValue - 스토리지에 데이터가 없을 경우 사용할 초기값
 * @returns {[T, Function]} 현재 상태 값과 상태를 업데이트하는 함수의 튜플 배열
 */
import { useState } from 'react';

function useLocalStorage(key, initialValue) {
    // 로컬스토리지에서 데이터를 읽어와 초기 상태를 설정 (지연 초기화 기법 활용)
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            // 데이터가 존재하면 파싱, 없으면 초기값 반환
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(`[LocalStorage 읽기 오류] key: ${key}`, error);
            return initialValue;
        }
    });

    // 상태와 로컬스토리지 값을 동시에 안전하게 업데이트하는 핸들러
    const setValue = (value) => {
        try {
            // 함수형 업데이트 패턴(prev => ...) 지원 처리
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            
            setStoredValue(valueToStore);
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error(`[LocalStorage 쓰기 오류] key: ${key}`, error);
        }
    };

    return [storedValue, setValue];
}

export default useLocalStorage;