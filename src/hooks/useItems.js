import useLocalStorage from './useLocalStorage';
import { useState } from 'react';

export default function useItems() {
  const [activeItems, setActiveItems] = useLocalStorage('Shopping-Items', []);
  const [data, setData] = useState(['hello', 'huhu']);

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
    const newActiveItems = activeItems.filter((item) => item['_id'] !== id);
    setActiveItems(newActiveItems);
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
