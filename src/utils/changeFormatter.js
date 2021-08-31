const changeFormatter = (num) => {
  if (num === null) {
    return 'NA\u00a0\u00a0\u00a0\u00a0';
  } else if (num < 0) {
    return `${num.toFixed(2)}%`;
  }
  return `+${num.toFixed(2)}%`;
};

export default changeFormatter;
