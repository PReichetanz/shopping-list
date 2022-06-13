import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

export default function useItems() {
  const [data, setData] = useState(['hello', 'huhu']);
  const [activeItems, setActiveItems] = useLocalStorage('Shopping-Items', []);

  function addToActiveItems(id) {
    const choosenItem = findItemById(id, data);
    const existingItem = findItemById(id, activeItems);
    if (existingItem) {
      return;
    } else {
      setActiveItems([...activeItems, choosenItem]);
    }
  }

  function deleteActiveItem(id) {
    setActiveItems((prevActiveItems) => {
      const newActiveItems = prevActiveItems.filter(
        (item) => item['_id'] !== id
      );
      return newActiveItems;
    });
  }

  function findItemById(id, array) {
    return array.find((item) => item['_id'] === id);
  }

  async function fetchData() {
    const response = await fetch(
      'https://fetch-me.vercel.app/api/shopping/items'
    );
    const newData = await response.json();
    if (response.status === 200) {
      setData(newData.data);
    } else {
      console.error('Opps, something went wrong!');
    }
  }

  return { activeItems, addToActiveItems, deleteActiveItem, fetchData, data };
}
