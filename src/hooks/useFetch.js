import { useEffect, useState } from 'react';

export default function useFetch() {
  const [data, setData] = useState([]);

  useEffect(() => {
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
    fetchData();
  }, []);
  return [data];
}
