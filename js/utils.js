/**
 * Функція вищого порядку для відкладеного виклику.
 * Зберігає timerId у замиканні між викликами.
 */
export function debounce(fn, delay = 300) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(...args), delay);
  };
}