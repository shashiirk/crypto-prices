import styled from 'styled-components';

const FooterBar = styled.div`
  /* border: 1px green solid; */
  padding: 18px;
  text-align: center;

  a {
    text-decoration: none;
    color: #e94057;

    &:hover {
      text-decoration: underline 1px #e94057 solid;
    }
  }
`;

const Footer = () => {
  return (
    <FooterBar>
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
