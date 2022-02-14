import styled from 'styled-components';
import SearchInput from './components/Search.js';
import { useEffect } from 'react';
import ShoppingList from './components/ShoppingList.js';
import useItems from './hooks/useItems.js';

export default function App() {
  const { activeItems, addToActiveItems, deleteActiveItem, fetchData, data } =
    useItems();

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
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
`;
