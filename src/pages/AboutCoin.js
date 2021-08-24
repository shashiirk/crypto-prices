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
`;

const AboutCoin = () => {
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const request = async () => {
      const { data } = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${params.id}`
      );
      console.log(data);
    };

    request();
  }, []);

  return (
    <div className="box">
      <ColorBar />
      <Container />
      <Footer />
    </div>
  );
};

export default AboutCoin;
