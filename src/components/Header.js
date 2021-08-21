import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 48px;
  font-weight: 600;
  text-align: center;
  margin: 32px 0 16px;
  color: #222324;

  @media (max-width: 640px) {
    & {
      font-size: 38px;
    }
  }
`;

const Header = () => {
  return <H1>Crypto Prices</H1>;
};

export default Header;
