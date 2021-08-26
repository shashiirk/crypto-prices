import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Coin from './Coin';
import CoinSkeleton from './CoinSkeleton';

const Container = styled.div`
  border: 1px #e0e2e8 solid;
  color: #222324;
  margin: 32px 0;

  .head {
    border-bottom: 1px #e0e2e8 solid;
    padding: 16px;
    font-size: 14px;
    display: flex;

    div {
      flex: 1;
      display: flex;
      align-items: center;
    }

    ul {
      list-style-type: none;
      flex: 3;
      display: flex;
      justify-content: space-between;

      li {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
    }

    button {
      background-color: transparent;
      color: #222324;
      font: inherit;
      border: none;
      outline: none;

      @media (hover: hover) and (min-width: 640px) {
        & {
          cursor: pointer;
          transition: color 200ms ease-in-out;
        }

        &:hover {
          color: #7f00ff;
        }
      }
    }

    .icon {
      margin-left: 2px;
      transition: transform 200ms ease-in-out;

      &.asc {
        transform: rotate(-180deg);
      }

      &.desc {
        transform: rotate(0deg);
      }
    }
  }
`;

const Table = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  const arrow = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`icon ${props.sortOrder} icon-tabler icon-tabler-arrow-down`}
      width="14"
      height="14"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="18" y1="13" x2="12" y2="19" />
      <line x1="6" y1="13" x2="12" y2="19" />
    </svg>
  );

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  const sortHandler = (parameter) => {
    if (props.sortParameter !== parameter) {
      props.onSelectSort(parameter);
    } else {
      props.onToggleSort();
    }
  };

  let header, screenType;

  if (width <= 640) {
    header = (
      <>
        <div>
          <button>Name</button>
        </div>
        <ul>
          <li>
            <button>Price</button>
          </li>
        </ul>
      </>
    );
    screenType = 'mobile';
  } else if (width <= 768) {
    header = (
      <>
        <div>
          <button onClick={sortHandler.bind(null, 'name')}>Name</button>
          {props.sortParameter === 'name' ? arrow : ''}
        </div>
        <ul>
          <li>
            <button onClick={sortHandler.bind(null, 'current_price')}>
              Price
            </button>
            {props.sortParameter === 'current_price' ? arrow : ''}
          </li>
          <li>
            <button
              onClick={sortHandler.bind(null, 'price_change_percentage_24h')}
            >
              Change
            </button>
            {props.sortParameter === 'price_change_percentage_24h' ? arrow : ''}
          </li>
        </ul>
      </>
    );
    screenType = 'tablet';
  } else {
    header = (
      <>
        <div>
          <button onClick={sortHandler.bind(null, 'name')}>Name</button>
          {props.sortParameter === 'name' ? arrow : ''}
        </div>
        <ul>
          <li>
            <button onClick={sortHandler.bind(null, 'current_price')}>
              Price
            </button>
            {props.sortParameter === 'current_price' ? arrow : ''}
          </li>
          <li>
            <button
              onClick={sortHandler.bind(null, 'price_change_percentage_24h')}
            >
              Change
            </button>
            {props.sortParameter === 'price_change_percentage_24h' ? arrow : ''}
          </li>
          <li>
            <button onClick={sortHandler.bind(null, 'total_volume')}>
              Volume (24h)
            </button>
            {props.sortParameter === 'total_volume' ? arrow : ''}
          </li>
          <li>
            <button onClick={sortHandler.bind(null, 'market_cap')}>
              Market cap
            </button>
            {props.sortParameter === 'market_cap' ? arrow : ''}
          </li>
          <li>
            <button onClick={sortHandler.bind(null, 'circulating_supply')}>
              Supply
            </button>
            {props.sortParameter === 'circulating_supply' ? arrow : ''}
          </li>
        </ul>
      </>
    );
    screenType = 'desktop';
  }

  return (
    <Container>
      <div className="head">{header}</div>
      <div className="coins">
        {props.loading &&
          Array(100)
            .fill(1)
            .map((item, index) => (
              <CoinSkeleton key={index} type={screenType} />
            ))}
        {!props.loading &&
          props.coins.map((coin) => (
            <Coin key={coin.id} {...coin} type={screenType} />
          ))}
      </div>
    </Container>
  );
};

export default Table;
