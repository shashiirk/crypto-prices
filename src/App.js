import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Header from './components/Header';
import Table from './components/Table';
import Footer from './components/Footer';

const ColorBar = styled.div`
  height: 8px;
  background: #7f00ff;
  background: -webkit-linear-gradient(to right, #e100ff, #7f00ff);
  background: linear-gradient(to right, #e100ff, #7f00ff);
`;

const Div = styled.div`
  text-align: center;
`;

const Container = styled.div`
  flex: 1;
  max-width: 1024px;
  width: 100%;
  margin: auto;
  padding: 0 16px;
`;

const DEFAULT_STATE = {
  parameter: 'market_cap',
  order: 'desc',
};

const sortReducer = (state, action) => {
  if (action.type === 'SELECT_SORT') {
    return {
      parameter: action.parameter,
      order: 'desc',
    };
  } else if (action.type === 'TOGGLE_SORT') {
    return {
      parameter: state.parameter,
      order: state.order === 'desc' ? 'asc' : 'desc',
    };
  }

  return DEFAULT_STATE;
};

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortState, dispatchSortState] = useReducer(sortReducer, DEFAULT_STATE);

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

  const selectSortHandler = (parameter) => {
    dispatchSortState({ type: 'SELECT_SORT', parameter: parameter });
  };

  const toggleSortHandler = () => {
    dispatchSortState({ type: 'TOGGLE_SORT' });
  };

  let sortedCoins;

  if (sortState.parameter === 'name') {
    sortedCoins =
      sortState.order === 'desc'
        ? coins.sort((a, b) => {
            if (b.name > a.name) {
              return 1;
            }
            return -1;
          })
        : coins.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            return -1;
          });
  } else {
    sortedCoins =
      sortState.order === 'desc'
        ? coins.sort((a, b) => b[sortState.parameter] - a[sortState.parameter])
        : coins.sort((a, b) => a[sortState.parameter] - b[sortState.parameter]);
  }

  let mainContent;

  if (isLoading) {
    mainContent = <Table coins={sortedCoins} loading={isLoading} />;
  } else {
    if (isError) {
      mainContent = (
        <Div>
          <p>Something went wrong</p>
        </Div>
      );
    } else {
      if (sortedCoins.length > 0) {
        mainContent = (
          <Table
            coins={sortedCoins}
            loading={isLoading}
            sortParameter={sortState.parameter}
            sortOrder={sortState.order}
            onSelectSort={selectSortHandler}
            onToggleSort={toggleSortHandler}
          />
        );
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
      <Header />
      <Container>{mainContent}</Container>
      <Footer />
    </div>
  );
}

export default App;
