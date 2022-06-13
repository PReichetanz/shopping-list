import styled from 'styled-components';
import SearchInput from './components/Search.js';
import { useEffect, useState } from 'react';
import ShoppingList from './components/ShoppingList.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import useToggle from './hooks/useToggle.js';

export default function App() {
  const [data, setData] = useState(['hello', 'huhu']);
  const [activeItems, setActiveItems] = useLocalStorage('Shopping-Items', []);
  const [isShoppingDone, setIsShoppingDone] = useToggle();

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
      <h2>Warst Du heute schon einkaufen?</h2>
      <button onClick={setIsShoppingDone}>
        {isShoppingDone ? 'Ja! 👍' : 'Nein... 😣'}
      </button>
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
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
`;
