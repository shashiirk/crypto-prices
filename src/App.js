import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserInput from './Components/UserInput';
import Table from '././Components/Table';
import Footer from './Components/Footer';

const ColorBar = styled.div`
  height: 8px;
  background: #e94057;
  background: -webkit-linear-gradient(to right, #f27121, #e94057, #b22daf);
  background: linear-gradient(to right, #f27121, #e94057, #b22daf);
`;

const Container = styled.div`
  /* border: 1px green solid; */
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: auto;
  padding: 0 14px;
`;

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
      );

      setCoins(data);
    };

    request().catch((error) => console.log(error));
  }, []);

  const searchTermHandler = (value) => {
    setSearchTerm(value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <ColorBar />
      <Container>
        <UserInput onInputSubmit={searchTermHandler} />
        <Table coins={filteredCoins} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
