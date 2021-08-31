import styled from 'styled-components';

const Style = styled.div`
  margin: 48px 0;
  color: #222324;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    background-color: white;
    color: inherit;
    width: 32px;
    height: 32px;
    margin-right: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    cursor: pointer;
  }

  .nav {
    border: none;
  }

  .paginationItem {
    font: inherit;
    font-size: 14px;
    font-weight: 600;
    border-radius: 8px;

    &.active {
      background-color: #7f00ff;
      color: white;
    }

    @media (hover: hover) {
      &:hover:not(.active):not(.dots) {
        background-color: #e7e7ef;
      }
    }

    @media (hover: none) {
      &:active:not(.active) {
        background-color: #e7e7ef;
      }
    }
  }
`;

const dots = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-dots"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="5" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </svg>
);

const Pagination = (props) => {
  const getPaginationGroup = () => {
    if (props.currentPage <= 3) {
      return (
        <>
          {[2, 3, 4].map((item, index) => (
            <button
              key={index}
              onClick={props.changePage}
              className={`paginationItem ${
                props.currentPage === item ? 'active' : ''
              }`}
            >
              {item}
            </button>
          ))}
          <button className="paginationItem dots">{dots}</button>
        </>
      );
    } else if (props.currentPage >= 18) {
      return (
        <>
          <button className="paginationItem dots">{dots}</button>
          {[17, 18, 19].map((item, index) => (
            <button
              key={index}
              onClick={props.changePage}
              className={`paginationItem ${
                props.currentPage === item ? 'active' : ''
              }`}
            >
              {item}
            </button>
          ))}
        </>
      );
    } else {
      return (
        <>
          <button className="paginationItem dots">{dots}</button>
          {[
            props.currentPage - 1,
            props.currentPage,
            props.currentPage + 1,
          ].map((item, index) => (
            <button
              key={index}
              onClick={props.changePage}
              className={`paginationItem ${
                props.currentPage === item ? 'active' : ''
              }`}
            >
              {item}
            </button>
          ))}
          <button className="paginationItem dots">{dots}</button>
        </>
      );
    }
  };

  return (
    <Style>
      <button onClick={props.goToPreviousPage} className="nav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-left"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="15 6 9 12 15 18" />
        </svg>
      </button>
      <button
        onClick={props.changePage}
        className={`paginationItem ${props.currentPage === 1 ? 'active' : ''}`}
      >
        1
      </button>
      {getPaginationGroup()}
      <button
        onClick={props.changePage}
        className={`paginationItem ${
          props.currentPage === props.pages ? 'active' : ''
        }`}
      >
        {props.pages}
      </button>
      <button onClick={props.goToNextPage} className="nav">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-chevron-right"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          strokeWidth="2"
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <polyline points="9 6 15 12 9 18" />
        </svg>
      </button>
    </Style>
  );
};

export default Pagination;
