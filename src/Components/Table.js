import styled from 'styled-components';

import Coin from './Coin';

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
        {props.coins.map((coin) => (
          <Coin key={coin.id} {...coin} />
        ))}
      </div>
    </Container>
  );
};

export default Table;
