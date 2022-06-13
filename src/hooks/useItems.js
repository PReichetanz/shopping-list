import useLocalStorage from './useLocalStorage';
import useFetch from './useFetch';

export default function useItems() {
  const [activeItems, setActiveItems] = useLocalStorage('Shopping-Items', []);
  const [data] = useFetch();

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

  return { activeItems, addToActiveItems, deleteActiveItem, data };
}
