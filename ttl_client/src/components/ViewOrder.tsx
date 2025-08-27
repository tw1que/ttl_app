import styled from 'styled-components';

interface Lot {
  lot_id?: string;
  order_id?: string;
}

interface Props {
  currentLot: Lot[];
  token: string;
  orderID: string;
  setOrderID: (id: string) => void;
  setCurrentLot: (lots: Lot[]) => void;
}

const StyledBody = styled.div`
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 8;
  display: grid;
  grid-gap: 3px;
  grid-template-columns: 1fr;
  grid-auto-rows: 30px;
  justify-content: center;
  align-items: center;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
  background-color: #c15050;
  border-radius: 7px;
  padding: 5px;
  box-shadow: 2px 2px 0.5px 0.5px rgba(0, 0, 0, 1);
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: 5fr 1fr;
  grid-template-rows: 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #3e4e88;
  color: white;
  padding-left: 13px;
  padding-right: 13px;
  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row: span 1;
  white-space: pre-wrap;
`;

const StyledButton = styled.button`
  background-color: green;
  border: none;
  display: inline-block;
  color: black;
  border-radius: 3px;
  grid-column-start: 5;
  height: 75%;
  text-decoration: none;
  &:hover {
    background-color: red;
    color: white;
  }
`;

const ViewOrder: React.FC<Props> = ({
  currentLot,
  token,
  orderID,
  setOrderID,
  setCurrentLot,
}) => {
  const handleDelete = async (order_id: string, lot_id: string) => {
    try {
      const body = { order_id, lot_id };
      const response = await fetch('api/orders/order_lot', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error('Failed to delete the item');
      }
      const updatedLots = (await response.json()) as Lot[];
      setCurrentLot(updatedLots);
    } catch (error) {
      console.log('Error during delete:', (error as Error).message);
    }
  };

  return (
    <StyledBody>
      {currentLot?.map(({ lot_id, order_id }) => {
        const displayId = lot_id || order_id;
        if (!displayId) return null;
        return (
          <StyledRow key={displayId}>
            {displayId}
            {lot_id && (
              <StyledButton onClick={() => handleDelete(orderID, lot_id)}>
                delete
              </StyledButton>
            )}
            {order_id && (
              <StyledButton
                onClick={() => {
                  setOrderID(order_id);
                }}
              >
                fetch
              </StyledButton>
            )}
          </StyledRow>
        );
      })}
    </StyledBody>
  );
};

export default ViewOrder;
