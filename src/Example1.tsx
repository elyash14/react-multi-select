import { useState } from 'react';
import './App.css';
import { MultiSelect, Item } from './components/MultiSelect/MultiSelect';

const items: Item[] = [
  { id: 1, label: 'Education 🎓' },
  { id: 2, label: 'Yeeeah science! 🧪' },
  { id: 3, label: 'Art 🎨' },
  { id: 4, label: 'Sport ⚽' },
  { id: 5, label: 'Games 🎮' },
  { id: 6, label: 'Health 🩺' },
  { id: 7, label: 'Music 🎵' },
  { id: 8, label: 'Food 🍕' },
];

const Example1 = () => {
  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 20px' }}>
      <h1>Simple Multi-Select</h1>
      <MultiSelect
        items={items}
        onChange={() => {}}
        placeholder="Select technologies..."
        canCreateNew={true}
      />
    </div>
  );
};

export default Example1;
