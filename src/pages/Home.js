import styled from 'styled-components';

import Footer from '../components/Footer';
import Header from '../components/Header';

const ColorBar = styled.div`
  height: 8px;
  background: #7f00ff;
  background: -webkit-linear-gradient(to right, #e100ff, #7f00ff);
  background: linear-gradient(to right, #e100ff, #7f00ff);
`;

const Container = styled.div`
  flex: 1;
  max-width: 1024px;
  width: 100%;
  margin: auto;
  padding: 0 16px;
`;

const Home = (props) => {
  return (
    <div className="box">
      <ColorBar />
      <Header />
      <Container>{props.children}</Container>
      <Footer />
    </div>
  );
};

export default Home;
