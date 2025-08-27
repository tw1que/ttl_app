import React, { useState, useEffect } from 'react';
import ViewOrder from './ViewOrder';
import InputForm from './InputForm';

const regex = /^(\d{7})_(\d{3})_(\d\d-\d\d-\d\d\d\d)_(.*)_(.*)\$$/;

function OrderLotMain({ token }) {
  const [orderID, setOrderID] = useState('');
  const [lotID, setLotID] = useState('');
  const [isCurrentOrderInDb, setIsCurrentOrderInDb] = useState(false);
  const [currentLot, setCurrentLot] = useState([]);
  const [isSearchingMode, setIsSearchingMode] = useState(false);

  // Asynchrone functie voor het ophalen van data
  const fetchOrderData = async (orderID) => {
    try {
      const response = await fetch(`api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ order_id: orderID }),
      });
      const { is_order_in_db, lot_numbers } = await response.json();

      setIsCurrentOrderInDb(is_order_in_db);
      setCurrentLot(lot_numbers || []); // Zorg ervoor dat er geen null-waarden worden verwerkt
    } catch (err) {
      console.error('Fout bij het ophalen van ordergegevens:', err.message);
      setIsCurrentOrderInDb(false);
      setCurrentLot([]);
    }
  };

  useEffect(() => {
    if (regex.test(orderID)) {
      fetchOrderData(orderID); // Roep de asynchrone functie aan
    } else {
      setIsCurrentOrderInDb(false);
      setCurrentLot([]);
    }
  }, [orderID, token]); // 'token' als dependency toegevoegd

  return (
    <>
      <InputForm
        orderID={orderID}
        setOrderID={setOrderID}
        lotID={lotID}
        setLotID={setLotID}
        currentLot={currentLot}
        setCurrentLot={setCurrentLot}
        isCurrentOrderInDb={isCurrentOrderInDb}
        isSearchingMode={isSearchingMode}
        setIsSearchingMode={setIsSearchingMode}
        token={token}
        />
      {currentLot.length > 0 && (
        <ViewOrder
        isCurrentOrderInDb={isCurrentOrderInDb}
        currentLot={currentLot}
        orderID={orderID}
        setCurrentLot={setCurrentLot}
        setOrderID={setOrderID}
        token={token}
        />
      )}
    </>
  );
}

export default OrderLotMain;
