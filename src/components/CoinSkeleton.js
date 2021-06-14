import styled, { keyframes } from 'styled-components';

const shimmer = keyframes`
  0% {
    background-position: -468px 0;
  }
  
  100% {
    background-position: 468px 0; 
  }
`;

const Style = styled.div`
  padding: 14px;
  display: flex;
  align-items: center;

  .skeleton {
    background-color: #c7c7c7;

    &.avatar {
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }

    &.strip {
      height: 16px;
      margin-left: 32px;
    }

    &.shine {
      background: #f6f7f8;
      background-image: linear-gradient(
        to right,
        #f6f7f8 0%,
        #eaebeb 20%,
        #f6f7f8 40%,
        #f6f7f8 100%
      );
      background-repeat: no-repeat;
      background-size: 800px 104px;
      display: inline-block;
      position: relative;
      animation: ${shimmer} 1s infinite linear forwards;
    }
  }

  .title {
    flex: 1;
    display: flex;
    align-items: center;

    .text {
      display: flex;
      flex: 1;

      .name {
        width: 60%;
        margin: 0 14px;
      }

      .symbol {
        width: 40%;
        margin-left: 0;
      }

      &.mobile {
        flex-direction: column;
        margin: 0 14px;

        .name {
          width: 100%;
          margin: 0 0 4px 0;
        }

        .symbol {
          width: 50%;
        }
      }
    }
  }

  .info {
    display: flex;
    flex: 3;

    div {
      width: 100%;
      margin-left: auto;
    }

    &.mobile {
      flex: 1;
      flex-direction: column;
      align-items: flex-end;

      div {
        &:first-child {
          width: 70%;
          margin-bottom: 4px;
        }

        &:last-child {
          width: 35%;
        }
      }
    }

    &.tablet {
      flex: 2;
    }
  }
`;

const CoinSkeleton = (props) => {
  let info;

  if (props.type === 'mobile') {
    info = (
      <div className="info mobile">
        <div className="skeleton strip shine"></div>
        <div className="skeleton strip shine"></div>
      </div>
    );
  } else if (props.type === 'tablet') {
    info = (
      <div className="info tablet">
        <div className="skeleton strip shine"></div>
        <div className="skeleton strip shine"></div>
      </div>
    );
  } else if (props.type === 'desktop') {
    info = (
      <div className="info">
        <div className="skeleton strip shine"></div>
        <div className="skeleton strip shine"></div>
        <div className="skeleton strip shine"></div>
        <div className="skeleton strip shine"></div>
        <div className="skeleton strip shine"></div>
      </div>
    );
  }

  return (
    <Style>
      <div className="title">
        <div className="skeleton avatar shine"></div>
        <div className={`text ${props.type === 'mobile' ? 'mobile' : ''}`}>
          <div className="skeleton strip shine name"></div>
          <div className="skeleton strip shine symbol"></div>
        </div>
      </div>
      {info}
    </Style>
  );
};

export default CoinSkeleton;
