import { useState } from 'react';
import styled from 'styled-components';
import { search } from 'fast-fuzzy';
import Item from './Item.js';

export default function Search({ fetchedItems, onButtonClick }) {
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  function handleChange(input) {
    setInput(input);
    const results = search(input, fetchedItems, {
      keySelector: (obj) => obj.name.de,
    });
    setSearchResults(results);

    console.log(results);
  }
  return (
    <Container>
      <label htmlFor="search">Was willst Du einkaufen?</label>
      <SearchInput
        id="search"
        type="search"
        autoFocus
        placeholder="Algen...??!"
        onChange={(event) => handleChange(event.target.value)}
        value={input}
      />
      {searchResults ? (
        <ResultList>
          {searchResults.map((result) => (
            <li key={result['_id']}>
              <Item id={result['_id']} onItemClick={onButtonClick}>
                {result.name.de}
              </Item>
            </li>
          ))}
        </ResultList>
      ) : null}
    </Container>
  );
}

const Container = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ResultList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  -webkit-appearance: none;
  border: 1px solid lightgrey;
  font: inherit;
  padding: 0.6em 1.7em 0.55em 1.7em;
  border-radius: 0.5em;
  width: 100%;
`;
