import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Coin from './Coin';
import CoinSkeleton from './CoinSkeleton';

const Container = styled.div`
  border: 1px #e0e2e8 solid;
  margin: 32px 0;

  .head {
    border-bottom: 1px #e0e2e8 solid;
    padding: 14px;
    font-size: 12px;
    display: flex;

    div {
      flex: 1;
    }

    ul {
      /* border: 1px green solid; */
      list-style-type: none;
      flex: 3;
      display: flex;
      justify-content: space-between;

      li {
        /* border: 1px pink solid; */
        text-align: right;
        flex: 1;
      }
    }
  }
`;

const Table = (props) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  let header, screenType;

  if (width <= 640) {
    header = (
      <ul>
        <li>Price</li>
      </ul>
    );
    screenType = 'mobile';
  } else if (width <= 768) {
    header = (
      <ul>
        <li>Price</li>
        <li>Change</li>
      </ul>
    );
    screenType = 'tablet';
  } else {
    header = (
      <ul>
        <li>Price</li>
        <li>Change</li>
        <li>Volume (24h)</li>
        <li>Market cap</li>
        <li>Supply</li>
      </ul>
    );
    screenType = 'desktop';
  }

  return (
    <Container>
      <div className="head">
        <div>Name</div>
        {header}
      </div>
      <div className="coins">
        {props.loading &&
          Array(10)
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
