import React, { useEffect } from 'react';
import styled from 'styled-components';

const StyledBody = styled.div`
  /* INHERIT GRID */
  grid-column-start: 2;
  grid-column-end: 3;
  grid-row-start: 4;
  grid-row-end: 8;
  /*  */
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

const StyledHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;
  border-radius: 5px 5px 0 0;
  border-bottom: solid 2px #eeeeee;
  background-color: #393e46;
  color: white;

  grid-column-start: 1;
  grid-column-end: 2;
  grid-row-start: 1;
  grid-row: span 1;
`;

const StyledRow = styled.div`
  display: grid;

  grid-template-columns: 5fr 1fr; // Verwijder de komma
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

  white-space: pre-wrap; // Voeg deze regel toe om witruimtes te behouden
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

const ViewOrder = ({ 
  currentLot, 
  token, 
  orderID,
  setOrderID,
  setCurrentLot
}) => {
  // useEffect(() => {}, [currentLot]);

  const handleDelete = async (order_id, lot_id) => {
    console.log('Deleting:', { order_id, lot_id }); // Log the parameters
    try {
        const body = { order_id, lot_id }; // Create the request body
        const response = await fetch('api/orders/order_lot', { // Make the async call
            method: 'DELETE', // Specify the HTTP method
            headers: {
                'Content-Type': 'application/json', // Set the content type
                Authorization: `Bearer ${token}`, // Include authorization token
            },
            body: JSON.stringify(body), // Convert the body to JSON
        });

        if (!response.ok) { // Check if the response is successful
            throw new Error('Failed to delete the item'); // Handle errors
        }

        const updatedLots = await response.json(); // Parse the JSON response
        console.log('Updated Lots:', updatedLots); // Log the updated lots
        setCurrentLot(updatedLots); // Update the local state with the new list
    } catch (error) {
        console.log('Error during delete:', error.message); // Log any errors
    }
  };

  return (
    <StyledBody>
      {currentLot?.map(({ lot_id, order_id }) => {
        const displayId = lot_id || order_id;

        if (!displayId) return null; // Zorg ervoor dat we geen lege rijen renderen

        return (
          <StyledRow className="preserve-whitespace" key={lot_id || order_id}>
            {displayId} {/* Witruimte behouden */}
            {lot_id && (
              <StyledButton onClick={() => handleDelete(orderID, lot_id)}>
                delete
              </StyledButton>
            )}
            {order_id && (
              <StyledButton onClick={() => {
                setOrderID(order_id)}
                }>
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
