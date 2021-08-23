import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  return <div></div>;
};

export default AboutCoin;
