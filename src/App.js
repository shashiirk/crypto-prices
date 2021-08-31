import { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Route, Switch } from 'react-router';

import Table from './components/Table';
import Home from './pages/Home';
import AboutCoin from './pages/AboutCoin';
import ScrollToTop from './components/ScrollToTop';
import NotFound from './pages/NotFound';
import ColorBar from './components/ColorBar';
import Pagination from './components/Pagination';
import Footer from './components/Footer';

const Div = styled.div`
  text-align: center;
`;

const DEFAULT_SORT_STATE = {
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

  return DEFAULT_SORT_STATE;
};

function App() {
  const [coins, setCoins] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortState, dispatchSortState] = useReducer(
    sortReducer,
    DEFAULT_SORT_STATE
  );
  const [currentPage, setCurrentPage] = useState(1);

  const pageLimit = 5;
  const pages = 20;

  useEffect(() => {
    const request = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=${currentPage}&sparkline=false`
        );

        setCoins(data);
        setIsError(false);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    window.scrollTo(0, 0);

    request();
  }, [currentPage]);

  const selectSortHandler = (parameter) => {
    dispatchSortState({ type: 'SELECT_SORT', parameter: parameter });
  };

  const toggleSortHandler = () => {
    dispatchSortState({ type: 'TOGGLE_SORT' });
  };

  const goToNextPage = () => {
    if (currentPage !== pages) {
      setCurrentPage((prevValue) => prevValue + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage((prevValue) => prevValue - 1);
    }
  };

  const changePage = (event) => {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
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
    mainContent = (
      <>
        <Table coins={sortedCoins} loading={isLoading} />
        <Pagination
          currentPage={currentPage}
          pageLimit={pageLimit}
          pages={pages}
          goToNextPage={goToNextPage}
          goToPreviousPage={goToPreviousPage}
          changePage={changePage}
        />
      </>
    );
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
          <>
            <Table
              coins={sortedCoins}
              loading={isLoading}
              sortParameter={sortState.parameter}
              sortOrder={sortState.order}
              onSelectSort={selectSortHandler}
              onToggleSort={toggleSortHandler}
            />
            <Pagination
              currentPage={currentPage}
              pageLimit={pageLimit}
              pages={pages}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              changePage={changePage}
            />
          </>
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
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/">
          <Home
            currentPage={currentPage}
            goToNextPage={goToNextPage}
            goToPreviousPage={goToPreviousPage}
            changePage={changePage}
          >
            {mainContent}
          </Home>
        </Route>
        <Route exact path="/coins/:id">
          <AboutCoin />
        </Route>
        <Route path="*">
          <div className="box">
            <ColorBar />
            <NotFound />
            <Footer />
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
