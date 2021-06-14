import styled from 'styled-components';

const FooterBar = styled.div`
  border-top: 1px #e0e2e8 solid;
  padding: 18px 14px;
  text-align: center;

  p:first-child {
    margin-bottom: 6px;
  }

  a {
    text-decoration: none;
    color: #f27121;

    @media (hover: hover) {
      &:hover {
        text-decoration: underline 1px #f27121 solid;
      }
    }

    @media (hover: none) {
      &:active {
        text-decoration: underline 1px #f27121 solid;
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterBar>
      <p>
        Data provided by{' '}
        <a
          href="https://www.coingecko.com/en/api"
          target="_blank"
          rel="noreferrer"
        >
          CoinGecko
        </a>
      </p>
      <p>
        Built by{' '}
        <a
          href="https://shashiirk.github.io/portfolio"
          target="_blank"
          rel="noreferrer"
        >
          Shashikanth
        </a>
      </p>
    </FooterBar>
  );
};

export default Footer;
