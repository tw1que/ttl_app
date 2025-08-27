import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-content: space-between;
  grid-gap: 7px;
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 2;
  grid-row-end: 3;
`;
const StyledBody = styled.div`
  display: flex;

  width: 100%;
  height: 50px;

  justify-content: center;
  align-items: center;

  background-color: #d97642;
  border-radius: 7px;
  padding: 4px;
  box-shadow: 2px 2px 0.5px 0.5px rgba(0, 0, 0, 1);
`;
const StyledInput = styled.input`
  border: 1px solid black;
  border-radius: 7px;
  background-color: #e84545;
  color: white;
  ${(props) =>
    props.correct &&
    css`
      background: #00917c;
    `}
  width: 100%;
  height: 100%;
  padding: 7px;
  font-size: 24px;
  text-align: center;
  box-shadow: inset 0px 0px 7px #693c72;
  &:focus {
    outline: none;
    box-shadow: inset 0px 0px 4px white;
  }
  &::placeholder {
    color: white;
    opacity: 0.5;
  }
`;

function Login({ setAuth, setToken }) {
  const [input, setInput] = useState({ user_name: '', user_password: '' });
  const { user_name, user_password } = input;

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { user_name, user_password };

    try {
      const response = await fetch('api/auth/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const { accessToken } = await response.json();

      setToken(accessToken);
      localStorage.setItem('token', accessToken);
      setAuth(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <StyledBody>
          <StyledInput
            value={user_name}
            type='text'
            name='user_name'
            placeholder='username'
            onChange={handleChange}
          />
        </StyledBody>
        <StyledBody>
          <StyledInput
            value={user_password}
            type='password'
            name='user_password'
            placeholder='password'
            onChange={handleChange}
          />
        </StyledBody>
        <input type='submit' style={{ display: 'none' }} />
      </StyledForm>
    </>
  );
}

export default Login;
