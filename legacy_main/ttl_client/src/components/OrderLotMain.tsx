import { useEffect, useState } from 'react';

import InputForm from './InputForm';
import ViewOrder from './ViewOrder';

const regex = /^(\d{7})_(\d{3})_(\d\d-\d\d-\d\d\d\d)_(.*)_(.*)\$$/;

interface Props {
  token: string;
}

interface Lot {
  lot_id?: string;
  order_id?: string;
}

function OrderLotMain({ token }: Props) {
  const [orderID, setOrderID] = useState('');
  const [lotID, setLotID] = useState('');
  const [isCurrentOrderInDb, setIsCurrentOrderInDb] = useState(false);
  const [currentLot, setCurrentLot] = useState<Lot[]>([]);
  const [isSearchingMode, setIsSearchingMode] = useState(false);

  const fetchOrderData = async (id: string) => {
    try {
      const response = await fetch(`api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ order_id: id }),
      });
      const { is_order_in_db, lot_numbers } = (await response.json()) as {
        is_order_in_db: boolean;
        lot_numbers?: Lot[];
      };
      setIsCurrentOrderInDb(is_order_in_db);
      setCurrentLot(lot_numbers || []);
    } catch (err) {
      console.error('Fout bij het ophalen van ordergegevens:', (err as Error).message);
      setIsCurrentOrderInDb(false);
      setCurrentLot([]);
    }
  };

  useEffect(() => {
    if (regex.test(orderID)) {
      void fetchOrderData(orderID);
    } else {
      setIsCurrentOrderInDb(false);
      setCurrentLot([]);
    }
  }, [orderID, token]);

  return (
    <>
      <InputForm
        orderID={orderID}
        setOrderID={setOrderID}
        lotID={lotID}
        setLotID={setLotID}
        setCurrentLot={(lot: unknown) => setCurrentLot(lot as Lot[])}
        isCurrentOrderInDb={isCurrentOrderInDb}
        isSearchingMode={isSearchingMode}
        setIsSearchingMode={setIsSearchingMode}
        token={token}
      />
      {currentLot.length > 0 && (
        <ViewOrder
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
