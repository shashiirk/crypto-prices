import currencyFormatter from './currencyFormatter';

const higherCurrencyFormatter = (num) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(num)) >= 1.0e9
    ? currencyFormatter.format(Math.abs(Number(num)) / 1.0e9) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(num)) >= 1.0e6
    ? currencyFormatter.format(Math.abs(Number(num)) / 1.0e6) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(num)) >= 1.0e3
    ? currencyFormatter.format(Math.abs(Number(num)) / 1.0e3) + 'K'
    : currencyFormatter.format(Math.abs(Number(num)));
};

export default higherCurrencyFormatter;
