const addZero = (n: number) => {
  const nString = n.toString();
  const dotIndex = nString.indexOf(".");

  if (dotIndex < 0) {
    return nString + ".00";
  } else if (dotIndex === nString.length - 2) {
    return nString + "0";
  } else {
    return nString;
  }
};

export const getMoney = (n: number) => addZero(n / 100);
