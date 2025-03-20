import { useState } from 'react';
import './App.css';
import { MultiSelect, Item } from './components/MultiSelect/MultiSelect';

const items: Item[] = [
  { id: 1, label: 'Chandler Bing' },
  { id: 2, label: 'Monica Geller' },
  { id: 3, label: 'Ross Geller' },
  { id: 4, label: 'Rachel Green' },
  { id: 5, label: 'Phoebe Buffay' },
  { id: 6, label: 'Joey Tribbiani' },
];

const initialItems = [
  { id: 1, label: 'Chandler Bing' },
  { id: 2, label: 'Monica Geller' },
];

const Example2 = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(initialItems);

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Multi-Select With List</h1>
      <MultiSelect
        items={items}
        onChange={items => {
          setSelectedItems(items);
        }}
        placeholder="Select characters..."
        canCreateNew={true}
        defaultSelected={selectedItems}
      />
      <div style={{ marginTop: '20px' }}>
        <h3>Selected Items:</h3>
        {selectedItems.map(item => (
          <div key={item.id}>{item.label}</div>
        ))}
      </div>
    </div>
  );
};

export default Example2;
