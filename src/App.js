import styled from 'styled-components';

import UserInput from './Components/UserInput';
import Cryptos from './Components/Cryptos';
import Footer from './Components/Footer';

const ColorBar = styled.div`
  height: 8px;
  background: #e94057;
  background: -webkit-linear-gradient(to right, #f27121, #e94057, #8a2387);
  background: linear-gradient(to right, #f27121, #e94057, #8a2387);
`;

const Container = styled.div`
  /* border: 1px green solid; */
  flex: 1;
  max-width: 800px;
  width: 100%;
  margin: auto;
`;

function App() {
  return (
    <div className="app">
      <ColorBar />
      <Container>
        <UserInput />
        <Cryptos />
      </Container>
      <Footer />
    </div>
  );
}

export default App;
