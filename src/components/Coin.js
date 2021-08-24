import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Style = styled.div`
  display: flex;
  align-items: center;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .mobile__link {
    text-decoration: none;
    width: 100%;
    display: flex;
    align-items: center;
  }

  .title {
    padding: 14px 0 14px 16px;
    text-decoration: none;
    flex: 1;
    width: 100%;
    display: flex;
    align-items: center;

    img {
      display: block;
      width: 32px;
    }

    .text {
      display: flex;
      color: #222324;

      .name {
        margin: 0 14px;
      }

      &.mobile {
        flex-direction: column;
        margin: 0 14px;

        .name {
          margin: 0;
        }
      }
    }

    .symbol {
      color: #909296;
    }

    &.mobile {
      flex: auto;
    }
  }

  .info {
    flex: 3;
    padding-right: 16px;
    display: flex;

    p {
      color: #222324;
      flex: 1;
      text-align: right;
    }

    .positive {
      color: #09bc4d;
    }

    .negative {
      color: #ef1921;
    }

    &.mobile {
      flex: 1;
      flex-direction: column;
    }

    &.tablet {
      flex: 2;
    }
  }

  @media (hover: hover) {
    &:hover {
      background-color: #f9f9f9;
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
  let info;

  if (props.type === 'mobile') {
    info = (
      <Link to={`/coins/${props.id}`} className="mobile__link">
        <div className="title mobile">
          <img src={props.image} alt={props.name} />
          <div className={`text ${props.type === 'mobile' ? 'mobile' : ''}`}>
            <p className="name">{props.name}</p>
            <p className="symbol">{props.symbol.toUpperCase()}</p>
          </div>
        </div>
        <div className="info mobile">
          <p>{currencyFormatter.format(props.current_price)}</p>
          <p
            className={
              props.price_change_percentage_24h > 0 ? 'positive' : 'negative'
            }
          >
            {changeFormatter(props.price_change_percentage_24h)}
          </p>
        </div>
      </Link>
    );
  } else if (props.type === 'tablet') {
    info = (
      <>
        <Link to={`/coins/${props.id}`} className="title">
          <img src={props.image} alt={props.name} />
          <div className={`text ${props.type === 'mobile' ? 'mobile' : ''}`}>
            <p className="name">{props.name}</p>
            <p className="symbol">{props.symbol.toUpperCase()}</p>
          </div>
        </Link>
        <div className="info tablet">
          <p>{currencyFormatter.format(props.current_price)}</p>
          <p
            className={
              props.price_change_percentage_24h > 0 ? 'positive' : 'negative'
            }
          >
            {changeFormatter(props.price_change_percentage_24h)}
          </p>
        </div>
      </>
    );
  } else if (props.type === 'desktop') {
    info = (
      <>
        <Link to={`/coins/${props.id}`} className="title">
          <img src={props.image} alt={props.name} />
          <div className={`text ${props.type === 'mobile' ? 'mobile' : ''}`}>
            <p className="name">{props.name}</p>
            <p className="symbol">{props.symbol.toUpperCase()}</p>
          </div>
        </Link>
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
      </>
    );
  }

  return <Style>{info}</Style>;
};

export default Coin;
