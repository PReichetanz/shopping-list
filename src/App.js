import styled from 'styled-components';
import SearchInput from './components/Search.js';
import { useEffect } from 'react';
//import useLocalStorage from './hooks/useLocalStorage.js';
import useItems from './hooks/useItems.js';
import useToggle from './hooks/useToggle.js';
import ShoppingList from './components/ShoppingList.js';

export default function App() {
  const { activeItems, addToActiveItems, deleteActiveItem, fetchData, data } =
    useItems();
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
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
`;
