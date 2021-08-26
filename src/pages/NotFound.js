import styled from 'styled-components';

const Container = styled.div`
  flex: 1;
  max-width: 1024px;
  width: 100%;
  margin: 32px auto;
  padding: 0 16px;
  color: #222324;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 128px;
    font-weight: 600;
    text-shadow: 0 4px 12px rgb(0, 0, 0, 0.24);
  }

  p {
    font-size: 20px;

    @media (max-width: 640px) {
      & {
        font-size: 16px;
      }
    }
  }

  a {
    display: inline-block;
    text-decoration: none;
    background-color: #c800e3;
    color: white;
    padding: 10px 30px;
    margin-top: 48px;
    border-radius: 99px;

    @media (hover: hover) {
      & {
        transition: background 200ms ease-in-out;
      }

      &:hover {
        background-color: #9900ae;
      }
    }

    @media (hover: none) {
      &:active {
        background-color: #9900ae;
      }
    }
  }
`;

const NotFound = () => {
  return (
    <Container>
      <h1>404</h1>
      <p>The page you were looking for doesn't exist</p>
      <a href="/">GO HOME</a>
    </Container>
  );
};

export default NotFound;
