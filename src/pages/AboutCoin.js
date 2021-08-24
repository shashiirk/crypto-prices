import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import ColorBar from '../components/ColorBar';
import Footer from '../components/Footer';

const Container = styled.div`
  flex: 1;
  max-width: 1024px;
  width: 100%;
  margin: auto;
  padding: 0 16px;
  color: #222324;

  .description {
    a {
      text-decoration: none;
      color: #c800e3;

      @media (hover: hover) {
        & {
          transition: color 200ms ease-in-out;
        }

        &:hover {
          color: #9900ae;
        }
      }
    }
  }
`;

const AboutCoin = () => {
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}?tickers=false&community_data=false&developer_data=false`
      );
      console.log(data);
      setCoin(data);
    };

    request();
  }, []);

  return (
    <div className="box">
      <ColorBar />
      {!!coin ? (
        <Container>
          <div className="header">
            <img src={coin.image.small} alt={coin.name} />
            <div className="text">
              <p className="name">{coin.name}</p>
              <p className="symbol">{coin.symbol.toUpperCase()}</p>
            </div>
          </div>
          <div className="description">
            <div className="title">About {coin.name}</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
          </div>
        </Container>
      ) : (
        <Container />
      )}
      <Footer />
    </div>
  );
};

export default AboutCoin;
