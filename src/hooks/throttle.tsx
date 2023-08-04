export const throttle = (fn: Function, time: number) => {
  let timer: number | null;
  return (...args: any[]) => {
    if (timer) {
      return;
    } else {
      timer = setTimeout(() => {
        timer = null;
      }, time);
      return fn(...args);
    }
  };
};
