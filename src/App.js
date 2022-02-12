import styled from 'styled-components';
import SearchInput from './components/Search.js';
import { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState(['hello', 'huhu']);
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container>
      <SearchInput fetchedItems={data}></SearchInput>
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
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5rem;
`;
