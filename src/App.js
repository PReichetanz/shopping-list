import styled from 'styled-components';
import SearchInput from './components/Search.js';
import ShoppingList from './components/ShoppingList.js';
import useItems from './hooks/useItems.js';
import useToggle from './hooks/useToggle.js';

export default function App() {
  const { activeItems, addToActiveItems, deleteActiveItem, data } = useItems();
  const [isShoppingDone, setIsShoppingDone] = useToggle();

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
