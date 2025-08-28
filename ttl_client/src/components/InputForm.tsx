import { useRef, useEffect, FormEvent, ChangeEvent } from 'react';
import styled from 'styled-components';

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

const StyledInput = styled.input<{ correct: boolean; isSearchMode: boolean }>`
  border: 1px solid black;
  border-radius: 7px;
  background-color: ${({ correct, isSearchMode }) =>
    correct ? '#00917c' : isSearchMode ? '#40E0D0' : '#e84545'};
  color: white;
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

interface Props {
  orderID: string;
  setOrderID: (v: string) => void;
  lotID: string;
  setLotID: (v: string) => void;
  setCurrentLot: (lot: unknown) => void;
  isCurrentOrderInDb: boolean;
  isSearchingMode: boolean;
  setIsSearchingMode: (v: boolean) => void;
  token: string;
}

const InputForm: React.FC<Props> = ({
  orderID,
  setOrderID,
  lotID,
  setLotID,
  setCurrentLot,
  isCurrentOrderInDb,
  isSearchingMode,
  setIsSearchingMode,
  token,
}) => {
  const orderInputRef = useRef<HTMLInputElement>(null);
  const useEffectRef = useRef(false);

  useEffect(() => {
    if (!useEffectRef.current) {
      useEffectRef.current = true;
      orderInputRef.current?.focus();
    }
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSearchingMode) {
      try {
        if (orderID.trim() === '') {
          return;
        }
        const response = await fetch(`api/orders/search/${orderID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data: unknown = await response.json();
        console.log(data);
        setCurrentLot(data);
        setIsSearchingMode(false);
      } catch (error) {
        console.log((error as Error).message);
      }
    } else {
      if (lotID.trim() === '') {
        return;
      }
      try {
        const response = await fetch('api/orders/lot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            order_id: orderID,
            lot_id: lotID,
          }),
        });
        const result: unknown = await response.json();
        setCurrentLot(result);
        setLotID('');
      } catch (error) {
        console.log((error as Error).message);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === 'order-input') {
      if (value === '>>>') {
        setIsSearchingMode(true);
        setOrderID('');
      } else if (value === '<<<') {
        setIsSearchingMode(false);
        setOrderID('');
      } else {
        setOrderID(value);
      }
    } else if (name === 'lot-input') {
      setLotID(value);
    }

    const regex = /^(\d{7})_(\d{3})_(\d\d-\d\d-\d\d\d\d)_(.*)_(.*)\$$/;
    if (regex.test(value)) {
      const nextSibling = document.querySelector<HTMLInputElement>('input[name=lot-input]');
      nextSibling?.focus();
    }
  };

  return (
    <StyledForm autoComplete='off' onSubmit={handleSubmit}>
      <StyledBody>
        <StyledInput
          ref={orderInputRef}
          name={'order-input'}
          onChange={handleChange}
          value={orderID}
          placeholder={'Order Code'}
          correct={isCurrentOrderInDb}
          isSearchMode={isSearchingMode}
        />
      </StyledBody>
      <StyledBody>
        <StyledInput
          name={'lot-input'}
          onChange={handleChange}
          value={lotID}
          placeholder={'Product Lotnummer'}
          correct={false}
          isSearchMode={false}
        />
      </StyledBody>
      <input type='submit' style={{ position: 'absolute', left: '-9999px' }} />
    </StyledForm>
  );
};

export default InputForm;
