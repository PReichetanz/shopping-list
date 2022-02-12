import styled from 'styled-components';
import SearchInput from './components/Search.js';
import { useEffect, useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import ShoppingList from './components/ShoppingList.js';

export default function App() {
  const [data, setData] = useState(['hello', 'huhu']);
  const [activeItems, setActiveItems] = useLocalStorage('ShoppingItems', []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <ShoppingList onButtonClick={deleteActiveItem} itemsToBuy={activeItems} />
      <SearchInput
        onButtonClick={addToActiveItems}
        fetchedItems={data}
      ></SearchInput>
    </Container>
  );

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
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
`;
