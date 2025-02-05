import React from 'react';
import styled from 'styled-components';

const Input = () => {
  return (
    <StyledWrapper>
      <input placeholder="Type something here...." className="input" name="text" type="text" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .input {
    color: white;
    border: 2px solid #8707ff;
    border-radius: 10px;
    padding: 10px 25px;
    background: transparent;
    max-width: 190px;
  }

  .input:active {
    box-shadow: 2px 2px 15px #8707ff inset;
  }`;

export default Input;
