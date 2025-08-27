import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

// import Body from './Body'

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
  background-color: ${(props) => props.correct ? '#00917c' : props.isSearchMode ? '#40E0D0' : '#e84545'};
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

const InputForm = ({
  orderID,
  setOrderID,
  lotID,
  setLotID,
  setCurrentLot,
  isCurrentOrderInDb,
  isSearchingMode,
  setIsSearchingMode,
  token
  }) => {
      
    const orderInputRef = useRef();
    // const lotInputRef = useRef()

    // only run once useEffect-Ref
    const useEffectRef = useRef(false);

    // initial focus on order input
    useEffect(() => {
      if (useEffectRef.current === false) {
        useEffectRef.current = true;
        orderInputRef.current.focus();
      }
    }, []);

    // useEffect(() => null, [isCurrentOrderInDb])

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (isSearchingMode) {
        try {
          if (orderID.trim() === "") {
            return
          }
          const response = await fetch(`api/orders/search/${orderID}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          });
          const data = await response.json();
          // unpackk the object to a array of just the values
          console.log(data)
          setCurrentLot(data)
          setIsSearchingMode(false)
        } catch (error) {
          console.log(error.message);
        }
      } else {
        if (lotID.trim() === "") {
          // console.log("empty field > no commit")
          return
        }
        try {
          const response = await fetch('api/orders/lot', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              order_id: orderID,
              lot_id: lotID,
            }),
          });
          setCurrentLot(await response.json());
          setLotID('');
        } catch (error) {
          console.log(error.message);
        }
      }
    };

    const handleChange = (event) => {
      const value = event.target.value;

      if (event.target.name === 'order-input') {
        if (value === '>>>') {
          setIsSearchingMode(true);
          setOrderID('');
        } else if (value === '<<<') {
          setIsSearchingMode(false);
          setOrderID('');
        } else {
          setOrderID(value);
        }
      } else if (event.target.name === 'lot-input') {
        setLotID(value);
      }

      // global regex pattern?
      const regex = /^(\d{7})_(\d{3})_(\d\d-\d\d-\d\d\d\d)_(.*)_(.*)\$$/;
      if (regex.test(event.target.value)) {
        const nextSibling = document.querySelector(`input[name=lot-input]`);
        if (nextSibling !== null) {
          nextSibling.focus();
        }
      }
    };

    return (
      <StyledForm autoComplete='off' onSubmit={handleSubmit}>
        {/* <Body isCurrentOrderInDb={isCurrentOrderInDb} inputRef={orderInputRef} name={"order-input"} placeholder={"Order Code"} someState={orderID} setSomeState={setOrderID}/>
              <Body inputRef={lotInputRef} name={"lot-input"} placeholder={"Product Lotnummer"} someState={lotID} setSomeState={setLotID}/> */}
        <StyledBody>
          <StyledInput
            ref={orderInputRef}
            name={'order-input'}
            onChange={handleChange}
            value={orderID}
            placeholder={'Order Code'}
            correct={isCurrentOrderInDb}
            isSearchMode={isSearchingMode}
          ></StyledInput>
        </StyledBody>
        <StyledBody>
          <StyledInput
            // ref={lotInputRef}
            name={'lot-input'}
            onChange={handleChange}
            value={lotID}
            placeholder={'Product Lotnummer'}
            correct={false}
            isSearchMode={false}
          ></StyledInput>
        </StyledBody>
        <input type='submit' style={{ position: 'absolute', left: '-9999px' }} />
      </StyledForm>
    );
};

export default InputForm;
