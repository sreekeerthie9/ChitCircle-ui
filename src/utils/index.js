const debounce = (func, delay) => {
  let timeoutId;

  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

const formatDuration = (duration, inMillis = false) => {
  let seconds = inMillis ? Math.ceil(duration / 1000) : duration;
  const s = seconds % 60 || 0;
  const m = Math.floor(seconds / 60) || 0;
  if (!m) {
    return `${s.toString().padStart(2, "0")}s`;
  }
  return `${m}m: ${s.toString().padStart(2, "0")}s`;
};

const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};

export { chunkArray, debounce, formatDuration };
