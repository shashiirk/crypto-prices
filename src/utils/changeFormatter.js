const changeFormatter = (num) => {
  if (num < 0) {
    return `${num.toFixed(2)}%`;
  }
  return `+${num.toFixed(2)}%`;
};

export default changeFormatter;
