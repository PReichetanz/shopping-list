import styled from 'styled-components';
import Item from './Item.js';

export default function ShoppingList({ itemsToBuy, onButtonClick }) {
  return (
    <Container>
      <h2>Meine Einkaufsliste</h2>
      {itemsToBuy ? (
        <ResultList>
          {itemsToBuy.map((item) => (
            <li key={item['_id']}>
              <Item id={item['_id']} onItemClick={onButtonClick}>
                {item.name.de}
              </Item>
            </li>
          ))}
        </ResultList>
      ) : (
        <p>Die Liste ist noch leer und der Kühlschrank voll!</p>
      )}
    </Container>
  );
}

const Container = styled.section``;

const ResultList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 0.5rem;
`;
