import styled from 'styled-components';

const Style = styled.div`
  padding: 14px;
  display: flex;
  align-items: center;

  .title {
    flex: 1;
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 32px;
    }

    .name {
      margin: 0 14px;
    }

    .symbol {
      color: #909296;
    }
  }

  .info {
    display: flex;
    flex: 3;

    p {
      flex: 1;
      text-align: right;
    }

    .positive {
      color: #09bc4d;
    }

    .negative {
      color: #ef1921;
    }
  }
`;

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

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
    : Math.abs(Number(num));
};

const supplyFormatter = (num) => {
  // Nine Zeroes for Billions
  return Math.abs(Number(num)) >= 1.0e9
    ? (Math.abs(Number(num)) / 1.0e9).toFixed(2) + 'B'
    : // Six Zeroes for Millions
    Math.abs(Number(num)) >= 1.0e6
    ? (Math.abs(Number(num)) / 1.0e6).toFixed(2) + 'M'
    : // Three Zeroes for Thousands
    Math.abs(Number(num)) >= 1.0e3
    ? (Math.abs(Number(num)) / 1.0e3).toFixed(2) + 'K'
    : Math.abs(Number(num));
};

const changeFormatter = (num) => {
  if (num < 0) {
    return `${num.toFixed(2)}%`;
  }
  return `+${num.toFixed(2)}%`;
};

const Coin = (props) => {
  return (
    <Style>
      <div className="title">
        <img src={props.image} alt={props.name} />
        <p className="name">{props.name}</p>
        <p className="symbol">{props.symbol.toUpperCase()}</p>
      </div>
      <div className="info">
        <p>{currencyFormatter.format(props.current_price)}</p>
        <p
          className={
            props.price_change_percentage_24h > 0 ? 'positive' : 'negative'
          }
        >
          {changeFormatter(props.price_change_percentage_24h)}
        </p>
        <p>{higherCurrencyFormatter(props.total_volume)}</p>
        <p>{higherCurrencyFormatter(props.market_cap)}</p>
        <p>{supplyFormatter(props.circulating_supply)}</p>
      </div>
    </Style>
  );
};

export default Coin;
