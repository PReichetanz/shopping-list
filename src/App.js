import styled from 'styled-components';
import SearchInput from './components/Search.js';
import { useEffect } from 'react';
import ShoppingList from './components/ShoppingList.js';
import useToggle from './hooks/useToggle.js';
import useItems from './hooks/useItems.js';

export default function App() {
  const [isShoppingDone, setIsShoppingDone] = useToggle();
  const { activeItems, addToActiveItems, deleteActiveItem, fetchData, data } =
    useItems();

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
