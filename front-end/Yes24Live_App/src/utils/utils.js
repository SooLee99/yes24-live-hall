/**
 * @파일명 utils.js
 * @작성자 이수
 * @작성일 2023-07-23
 */

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const removeWhitespace = (text) => {
  return text.replace(/\s/g, '');
};

export const sortDataByKm = (data) => {
  // 랭킹 스크린에 이용
  return data.sort((a, b) => b.km - a.km);
};

export const getCurrentTime = () => {
  //앱 문의 시간
  const date = new Date();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const getCurrentDate = () => {
  // 앱 문의 날짜
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}년 ${month}월 ${day}일`;
};

export function formatTimeAgo(dateTime) {
  // 게시물 작성시, Community Screen에 활용.
  const currentTime = new Date();
  const diffInSeconds = Math.floor((currentTime - dateTime) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes}분 전`;
  } else {
    const hours = dateTime.getHours().toString().padStart(2, '0');
    const minutes = dateTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
