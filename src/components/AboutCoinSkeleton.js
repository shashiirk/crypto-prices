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
  .strip {
    height: 22px;
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
    display: block;
    position: relative;
    animation: ${shimmer} 1s infinite linear forwards;
  }

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
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
    display: block;
    position: relative;
    animation: ${shimmer} 1s infinite linear forwards;
  }

  .nav {
    margin-bottom: 34px;
    display: flex;
    align-items: center;

    .strip:first-child {
      width: 40px;
      margin-right: 18px;
    }

    .strip:last-child {
      width: 64px;
    }
  }

  .header {
    margin-bottom: 34px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      .strip {
        height: 18px;
        width: 56px;
        margin-bottom: 4px;
      }

      .logo {
        display: flex;
        align-items: center;

        .text {
          margin-left: 16px;
          display: flex;
          align-items: center;

          .strip:first-child {
            height: 46px;
            width: 120px;
            margin-right: 16px;
          }

          .strip:last-child {
            width: 34px;
            height: 18px;
          }
        }
      }
    }

    .price {
      .strip {
        height: 16px;
        width: 120px;
        margin-left: auto;
        margin-bottom: 4px;
      }

      .content {
        display: flex;
        align-items: center;

        .strip:first-child {
          height: 46px;
          width: 164px;
        }

        .strip:last-child {
          height: 28px;
          width: 64px;
          margin-left: 16px;
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

        .strip {
          margin-bottom: 0;
          margin-left: 16px;
        }

        .logo .text .strip {
          margin-left: 0;

          &:first-child {
            height: 18px;
          }
        }
      }

      .price {
        .strip {
          margin-left: 0;
        }
      }
    }
  }

  .statistics {
    border: none;
    border-radius: none;
    margin-bottom: 34px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    .stat {
      padding: 16px;

      .strip:first-child {
        height: 18px;
        width: 96px;
        margin-bottom: 8px;
      }

      .strip:last-child {
        height: 26px;
        width: 144px;
      }

      &:nth-child(2) {
        border: none;
      }
    }

    @media (max-width: 640px) {
      & {
        grid-template-columns: 1fr;
      }
    }
  }

  .description {
    .strip {
      height: 34px;
      width: 96px;
      margin-bottom: 32px;
    }

    .content {
      .strip {
        height: 22px;
        width: 100%;
        margin-bottom: 18px;
      }
    }

    .resources {
      .strip {
        margin-top: 32px;
        margin-bottom: none;
        height: 24px;
        width: 96px;
      }

      .items {
        .item {
          margin-top: 12px;
          display: flex;
          align-items: center;

          .avatar {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }

          .strip {
            width: 96px;
            height: 22px;
            margin: 0;
          }
        }
      }
    }
  }
`;

const AboutCoinSkeleton = () => {
  return (
    <Style>
      <div className="nav">
        <div className="strip"></div>
        <div className="strip"></div>
      </div>
      <div className="header">
        <div className="title">
          <div className="strip"></div>
          <div className="logo">
            <div className="avatar"></div>
            <div className="text">
              <div className="strip"></div>
              <div className="strip"></div>
            </div>
          </div>
        </div>
        <div className="price">
          <div className="strip"></div>
          <div className="content">
            <div className="strip"></div>
            <div className="strip"></div>
          </div>
        </div>
      </div>
      <div className="statistics">
        <div className="stat">
          <div className="strip"></div>
          <div className="strip"></div>
        </div>
        <div className="stat">
          <div className="strip"></div>
          <div className="strip"></div>
        </div>
        <div className="stat">
          <div className="strip"></div>
          <div className="strip"></div>
        </div>
      </div>
      <div className="description">
        <div className="strip"></div>
        <div className="content">
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
          <div className="strip"></div>
        </div>
        <div className="resources">
          <div className="strip"></div>
          <div className="items">
            <div className="item">
              <div className="avatar"></div>
              <div className="strip"></div>
            </div>
            <div className="item">
              <div className="avatar"></div>
              <div className="strip"></div>
            </div>
          </div>
        </div>
      </div>
    </Style>
  );
};

export default AboutCoinSkeleton;
