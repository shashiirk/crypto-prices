import styled from 'styled-components';

import Coin from './Coin';

const coins = [
  {
    id: 'bitcoin',
    symbol: 'btc',
    name: 'Bitcoin',
    image:
      'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
    current_price: 35018,
    market_cap: 657834107248,
    total_volume: 31746068693,
    price_change_percentage_24h: -1.28474,
    circulating_supply: 18733525,
  },
  {
    id: 'ethereum',
    symbol: 'eth',
    name: 'Ethereum',
    image:
      'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
    current_price: 2342.46,
    market_cap: 273237738133,
    total_volume: 26557019611,
    price_change_percentage_24h: 1.87072,
    circulating_supply: 116269207.874,
  },
];

const Container = styled.div`
  border: 1px #e0e2e8 solid;

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

const Table = () => {
  return (
    <Container>
      <div className="head">
        <div>Name</div>
        <ul>
          <li>Price</li>
          <li>Change</li>
          <li>Volume (24h)</li>
          <li>Market cap</li>
          <li>Supply</li>
        </ul>
      </div>
      <div className="coins">
        {coins.map((coin) => (
          <Coin key={coin.id} {...coin} />
        ))}
      </div>
    </Container>
  );
};

export default Table;
