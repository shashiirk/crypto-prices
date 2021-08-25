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
  margin: 32px auto;
  padding: 0 16px;
  color: #222324;

  .header {
    display: flex;

    img {
      width: 46px;
      height: 46px;
    }

    .text {
      margin-left: 20px;
      display: flex;
      align-items: center;

      .name {
        margin-right: 10px;
        font-size: 32px;
        font-weight: 500;
      }

      .symbol {
        font-size: 18px;
        color: #909296;
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
              <p className="name">{`${coin.name} price`}</p>
              <p className="symbol">{`(${coin.symbol.toUpperCase()})`}</p>
            </div>
          </div>
          <div className="stats"></div>
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
                      class="icon icon-tabler icon-tabler-world"
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
                      class="icon icon-tabler icon-tabler-brand-twitter"
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
      ) : (
        <Container />
      )}
      <Footer />
    </div>
  );
};

export default AboutCoin;
