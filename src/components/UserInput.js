import { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  max-width: 460px;
  width: 100%;
  margin: 32px auto;

  .input_box {
    border: 1px #e0e2e8 solid;
    border-radius: 6px;
    width: 100%;
    display: flex;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.08);

    input {
      flex: 1;
      border: none;
      border-top-left-radius: inherit;
      border-bottom-left-radius: inherit;
      outline: none;
      padding: 14px;
      font: inherit;
      color: inherit;

      &::placeholder {
        color: #b0b2b8;
      }
    }

    button {
      border: none;
      border-top-right-radius: inherit;
      border-bottom-right-radius: inherit;
      background-color: transparent;
      color: #b0b2b8;
      padding: 0 14px;
      cursor: pointer;

      @media (hover: hover) {
        &:hover {
          color: #e94057;
        }
      }

      @media (hover: none) {
        &:active {
          color: #e94057;
        }
      }
    }
  }
`;

const UserInput = (props) => {
  const [userInput, setUserInput] = useState('');

  const submitTaskHandler = (ev) => {
    ev.preventDefault();

    if (userInput.trim().length === 0) {
      return;
    } else {
      props.onInputSubmit(userInput.trim());
      setUserInput('');
    }
  };

  const userInputHandler = (ev) => {
    setUserInput(ev.target.value);

    props.onInputSubmit(ev.target.value.trim());
  };

  return (
    <Form onSubmit={submitTaskHandler}>
      <div className="input_box">
        <input
          type="text"
          placeholder="Search crypto assets..."
          onChange={userInputHandler}
          value={userInput}
        />
        <button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-search"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="28" y1="28" x2="16.65" y2="16.65"></line>
          </svg>
        </button>
      </div>
    </Form>
  );
};

export default UserInput;
