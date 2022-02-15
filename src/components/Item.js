import styled from 'styled-components';

export default function Item({ id, children, onItemClick }) {
  return (
    <ItemButton onClick={() => onItemClick(id)} type="button">
      {children}
    </ItemButton>
  );
}

const ItemButton = styled.button`
  -webkit-apperance: none;
  border: none;
  padding: 0.6em 1.7em 0.55em 1.7em;
  background-color: ${({ itemType }) =>
    itemType === 'active' ? 'lightgreen' : 'lightblue'};
  border-radius: 0.5em;
  font-size: 1rem;
`;
