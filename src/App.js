import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import UserInput from './components/UserInput';
import Table from './components/Table';
import Footer from './components/Footer';

const ColorBar = styled.div`
  height: 10px;
  background: #e94057;
  background: -webkit-linear-gradient(to right, #f27121, #e94057, #b22daf);
  background: linear-gradient(to right, #f27121, #e94057, #b22daf);
`;

const Container = styled.div`
  flex: 1;
  max-width: 840px;
  width: 100%;
  margin: auto;
  padding: 0 14px;
`;

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false'
      );

      setCoins(data);
      setIsLoading(false);
    };

    request().catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
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
        <Table coins={filteredCoins} loading={isLoading} />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
