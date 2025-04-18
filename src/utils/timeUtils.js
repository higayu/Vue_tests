/**
 * 時間操作のためのユーティリティ関数群
 */

/**
 * 現在の日付をYYYY-MM-DD形式で取得
 * @returns {string} YYYY-MM-DD形式の日付
 */
export const getCurrentDate = () => {
  const now = new Date();
  return now.toISOString().slice(0, 10);
};

/**
 * 現在の時刻をHH:mm形式で取得
 * @returns {string} HH:mm形式の時刻
 */
export const getCurrentTime = () => {
  const now = new Date();
  return now.toTimeString().slice(0, 5);
};

/**
 * 日本の現在時間をHH:mm形式で取得
 * @returns {string} HH:mm形式の時刻
 */
export const getCurrentTimeJP = () => {
  // 現在の日時を取得
  const now = new Date();
  
  // 日本時間のオプションを設定
  const options = {
    timeZone: 'Asia/Tokyo',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  };
  
  // 日本時間でフォーマット
  const japanTime = now.toLocaleTimeString('ja-JP', options);
  console.log("日本時間", japanTime);
  
  return japanTime;
};

/**
 * 日付文字列をDateオブジェクトに変換
 * @param {string} dateStr - YYYY-MM-DD形式の日付文字列
 * @returns {Date} Dateオブジェクト
 */
export const parseDate = (dateStr) => {
  return new Date(dateStr);
};

/**
 * 時刻文字列を分単位の数値に変換
 * @param {string} timeStr - HH:mm形式の時刻文字列
 * @returns {number} 分単位の数値
 */
export const timeToMinutes = (timeStr) => {
  if (!timeStr) return 0;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * 分単位の数値を時刻文字列に変換
 * @param {number} minutes - 分単位の数値
 * @returns {string} HH:mm形式の時刻文字列
 */
export const minutesToTime = (minutes) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
};

/**
 * 2つの時刻の差分を分単位で計算
 * @param {string} time1 - HH:mm形式の時刻文字列
 * @param {string} time2 - HH:mm形式の時刻文字列
 * @returns {number} 分単位の差分
 */
export const getTimeDifference = (time1, time2) => {
  return Math.abs(timeToMinutes(time1) - timeToMinutes(time2));
};

/**
 * 日付と時刻を結合してISO形式の文字列に変換
 * @param {string} date - YYYY-MM-DD形式の日付
 * @param {string} time - HH:mm形式の時刻
 * @returns {string} ISO形式の日時文字列
 */
export const combineDateTime = (date, time) => {
  return `${date}T${time}:00`;
};

/**
 * 日付文字列を日本語形式に変換
 * @param {string} dateStr - YYYY-MM-DD形式の日付文字列
 * @returns {string} YYYY年MM月DD日形式の文字列
 */
export const formatDateToJapanese = (dateStr) => {
  const date = parseDate(dateStr);
  return `${date.getFullYear()}年${(date.getMonth() + 1).toString().padStart(2, '0')}月${date.getDate().toString().padStart(2, '0')}日`;
};

/**
 * 時刻文字列を12時間形式に変換
 * @param {string} timeStr - HH:mm形式の時刻文字列
 * @returns {string} 12時間形式の時刻文字列（例：09:00 AM）
 */
export const formatTimeTo12Hour = (timeStr) => {
  if (!timeStr) return '';
  const [hours, minutes] = timeStr.split(':').map(Number);
  const period = hours >= 12 ? 'PM' : 'AM';
  const hours12 = hours % 12 || 12;
  return `${hours12.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
};

/**
 * 日付が有効かどうかをチェック
 * @param {string} dateStr - YYYY-MM-DD形式の日付文字列
 * @returns {boolean} 有効な日付かどうか
 */
export const isValidDate = (dateStr) => {
  const date = parseDate(dateStr);
  return date instanceof Date && !isNaN(date);
};

/**
 * 時刻が有効かどうかをチェック
 * @param {string} timeStr - HH:mm形式の時刻文字列
 * @returns {boolean} 有効な時刻かどうか
 */
export const isValidTime = (timeStr) => {
  if (!timeStr) return false;
  const [hours, minutes] = timeStr.split(':').map(Number);
  return hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

/**
 * 日付を指定された日数だけ加算
 * @param {string} dateStr - YYYY-MM-DD形式の日付文字列
 * @param {number} days - 加算する日数
 * @returns {string} 加算後の日付文字列（YYYY-MM-DD形式）
 */
export const addDays = (dateStr, days) => {
  const date = parseDate(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
};

/**
 * 時刻を指定された分だけ加算
 * @param {string} timeStr - HH:mm形式の時刻文字列
 * @param {number} minutes - 加算する分
 * @returns {string} 加算後の時刻文字列（HH:mm形式）
 */
export const addMinutes = (timeStr, minutes) => {
  const totalMinutes = timeToMinutes(timeStr) + minutes;
  return minutesToTime(totalMinutes);
};

/**
 * 現在の日付をYYYY-MM-DD形式で取得（getCurrentDateの代替メソッド）
 * @returns {string} YYYY-MM-DD形式の日付
 */
export const getTodayYYYYMMDD = () => {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // 月は0始まり
  const day = String(today.getDate()).padStart(2, '0');
  console.log("今日の日付⏰", `${year}-${month}-${day}`);

  return `${year}-${month}-${day}`;
};

/**
 * 指定した日数だけ加算した日付を取得
 * @param {string} baseDate - 基準となる日付（YYYY-MM-DD形式）
 * @param {number} days - 加算する日数（負の値の場合は減算）
 * @returns {string} 加算後の日付（YYYY-MM-DD形式）
 */
export const getDateAfterDays = (baseDate, days) => {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + days);
  
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
};

/**
 * 当日から指定した日数だけ加算した日付を取得
 * @param {number} days - 加算する日数（負の値の場合は減算）
 * @returns {string} 加算後の日付（YYYY-MM-DD形式）
 */
export const getDateFromToday = (days) => {
  const today = new Date();
  today.setDate(today.getDate() + days);
  
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  
  return `${year}-${month}-${day}`;
}; 