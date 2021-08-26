import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

import ColorBar from '../components/ColorBar';
import Footer from '../components/Footer';
import currencyFormatter from '../utils/currencyFormatter';
import changeFormatter from '../utils/changeFormatter';
import marketFormatter from '../utils/marketFormatter';
import AboutCoinSkeleton from '../components/AboutCoinSkeleton';
import NotFound from './NotFound';

const Container = styled.div`
  flex: 1;
  max-width: 1024px;
  width: 100%;
  margin: 32px auto;
  padding: 0 16px;
  color: #222324;

  .nav {
    display: flex;
    align-items: center;
    margin-bottom: 32px;

    a {
      text-decoration: none;
      color: #83858a;

      @media (hover: hover) {
        & {
          transition: color 200ms ease-in-out;
        }

        &:hover {
          color: #c800e3;
        }
      }

      @media (hover: none) {
        &:active {
          color: #c800e3;
        }
      }
    }
  }

  .header {
    margin-bottom: 32px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      .badge {
        display: inline-block;
        font-size: 12px;
        font-weight: 600;
        padding: 2px 6px;
        background-color: #585a5d;
        color: white;
        border-radius: 4px;
        margin-bottom: 4px;
        white-space: nowrap;
      }

      .logo {
        display: flex;
        align-items: center;

        img {
          display: inline-block;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.24);
        }

        .text {
          margin-left: 16px;
          display: flex;
          align-items: center;

          .name {
            margin-right: 16px;
            font-size: 32px;
            font-weight: 600;
          }

          .symbol {
            background-color: #f2f3f5;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 12px;
            font-weight: 600;
            color: #83858a;
          }
        }
      }

      @media (max-width: 640px) {
        .logo .text .name {
          font-size: 20px;
        }
      }
    }

    .price {
      .title {
        display: block;
        text-align: right;
        font-size: 12px;
        font-weight: 600;
        color: #83858a;
        margin-bottom: 4px;
      }

      .content {
        display: flex;
        align-items: center;

        .value {
          font-size: 32px;
          font-weight: 600;
        }

        .change {
          font-size: 14px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 8px;
          margin-left: 16px;
          color: white;

          &.positive {
            background-color: #09bc4d;
          }

          &.negative {
            background-color: #ef1921;
          }
        }
      }
    }

    @media (max-width: 640px) {
      & {
        display: block;
      }

      .title {
        margin-bottom: 32px;
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: flex-end;

        .badge {
          margin-bottom: 0;
          margin-left: 16px;
        }
      }

      .price {
        .title {
          text-align: left;
        }
      }
    }
  }

  .stats {
    border: 1px #e0e2e8 solid;
    border-radius: 4px;
    margin-bottom: 32px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .stat {
      padding: 16px;

      .title {
        color: #626468;
        font-size: 14px;
        font-weight: 500;
        margin-bottom: 8px;
      }

      .value {
        font-size: 18px;
      }

      &:nth-child(2) {
        border-left: 1px #e0e2e8 solid;
        border-right: 1px #e0e2e8 solid;
      }
    }

    @media (max-width: 640px) {
      & {
        grid-template-columns: 1fr;
      }

      .stat:nth-child(2) {
        border-top: 1px #e0e2e8 solid;
        border-left: none;
        border-bottom: 1px #e0e2e8 solid;
        border-right: none;
      }
    }
  }

  .description {
    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .content {
      line-height: 1.6;

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

        @media (hover: none) {
          &:active {
            color: #9900ae;
          }
        }
      }
    }

    .resources {
      .title {
        font-size: 16px;
        font-weight: 500;
        margin-top: 24px;
        margin-bottom: auto;
      }

      .items {
        list-style-type: none;

        li {
          width: fit-content;
          margin-top: 12px;

          a {
            text-decoration: none;
            color: #c800e3;
            display: flex;
            align-items: center;

            @media (hover: hover) {
              & {
                transition: color 200ms ease-in-out;
              }

              &:hover {
                color: #9900ae;
              }
            }

            @media (hover: none) {
              &:active {
                color: #9900ae;
              }
            }

            .icon {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
`;

const AboutCoin = () => {
  const [coin, setCoin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const params = useParams();

  useEffect(() => {
    const request = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${params.id}?tickers=false&community_data=false&developer_data=false`
        );

        setCoin(data);
        setIsError(false);
      } catch (error) {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    request();
  }, [params.id]);

  return (
    <div className="box">
      <ColorBar />
      {isLoading && (
        <Container>
          <AboutCoinSkeleton />
        </Container>
      )}
      {!isLoading && !isError && (
        <Container>
          <div className="nav">
            <a href="/">Coins</a>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-chevron-right"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              strokeWidth="1"
              stroke="#2c3e50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <polyline points="9 6 15 12 9 18" />
            </svg>
            <a href={`/coins/${coin.id}`}>{coin.name}</a>
          </div>
          <div className="header">
            <div className="title">
              <div className="badge">
                Rank #{coin.market_data.market_cap_rank}
              </div>
              <div className="logo">
                <img src={coin.image.small} alt={coin.name} />
                <div className="text">
                  <p className="name">{coin.name}</p>
                  <p className="symbol">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
            </div>
            <div className="price">
              <div className="title">{`${
                coin.name
              } Price (${coin.symbol.toUpperCase()})`}</div>
              <div className="content">
                <p className="value">
                  {currencyFormatter.format(coin.market_data.current_price.usd)}
                </p>
                <p
                  className={`change
                  ${
                    coin.market_data.price_change_percentage_24h > 0
                      ? 'positive'
                      : 'negative'
                  }
                `}
                >
                  {changeFormatter(
                    coin.market_data.price_change_percentage_24h
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className="stats">
            <div className="stat">
              <div className="title">Market cap</div>
              <div className="value">
                {marketFormatter.format(coin.market_data.market_cap.usd)}
              </div>
            </div>
            <div className="stat">
              <div className="title">Volume</div>
              <div className="value">
                {marketFormatter.format(coin.market_data.total_volume.usd)}
              </div>
            </div>
            <div className="stat">
              <div className="title">Circulating supply</div>
              <div className="value">
                {new Intl.NumberFormat('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(coin.market_data.circulating_supply) +
                  ' ' +
                  coin.symbol.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="description">
            <div className="title">About {coin.name}</div>
            <div
              className="content"
              dangerouslySetInnerHTML={{ __html: coin.description.en }}
            />
            <div className="resources">
              <div className="title">RESOURCES</div>
              <ul className="items">
                <li>
                  <a
                    href={`https://${new URL(coin.links.homepage[0]).host}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-world"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#626468"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <circle cx="12" cy="12" r="9" />
                      <line x1="3.6" y1="9" x2="20.4" y2="9" />
                      <line x1="3.6" y1="15" x2="20.4" y2="15" />
                      <path d="M11.5 3a17 17 0 0 0 0 18" />
                      <path d="M12.5 3a17 17 0 0 1 0 18" />
                    </svg>
                    <span>Official website</span>
                  </a>
                </li>
                <li>
                  <a
                    href={`https://twitter.com/${coin.links.twitter_screen_name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-brand-twitter"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#626468"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M22 4.01c-1 .49 -1.98 .689 -3 .99c-1.121 -1.265 -2.783 -1.335 -4.38 -.737s-2.643 2.06 -2.62 3.737v1c-3.245 .083 -6.135 -1.395 -8 -4c0 0 -4.182 7.433 4 11c-1.872 1.247 -3.739 2.088 -6 2c3.308 1.803 6.913 2.423 10.034 1.517c3.58 -1.04 6.522 -3.723 7.651 -7.742a13.84 13.84 0 0 0 .497 -3.753c-.002 -.249 1.51 -2.772 1.818 -4.013z" />
                    </svg>
                    <span>Twitter account</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      )}
      {!isLoading && isError && <NotFound />}
      <Footer />
    </div>
  );
};

export default AboutCoin;
