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

const Div = styled.div`
  text-align: center;
`;

const Container = styled.div`
  flex: 1;
  max-width: 1024px;
  width: 100%;
  margin: auto;
  padding: 0 14px;
`;

function App() {
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const request = async () => {
      setIsLoading(true);
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=25&page=1&sparkline=false'
      );

      setCoins(data);
      setIsLoading(false);
      setIsError(false);
    };

    request().catch((error) => {
      console.log(error);
      setIsLoading(false);
      setIsError(true);
    });
  }, []);

  const searchTermHandler = (value) => {
    setSearchTerm(value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let mainContent;

  if (isLoading) {
    mainContent = <Table coins={filteredCoins} loading={isLoading} />;
  } else {
    if (isError) {
      mainContent = (
        <Div>
          <p>Something went wrong</p>
        </Div>
      );
    } else {
      if (filteredCoins.length > 0) {
        mainContent = <Table coins={filteredCoins} loading={isLoading} />;
      } else {
        mainContent = (
          <Div>
            <p>No assets were found</p>
          </Div>
        );
      }
    }
  }

  return (
    <div className="app">
      <ColorBar />
      <Container>
        <UserInput onInputSubmit={searchTermHandler} />
        {mainContent}
      </Container>
      <Footer />
    </div>
  );
}

export default App;
