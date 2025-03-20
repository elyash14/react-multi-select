import React, { useState, useRef, useEffect, useMemo } from 'react';
import './MultiSelect.scss';

export interface Item {
  id: string | number;
  label: string;
  icon?: string | React.ReactNode;
}

interface MultiSelectProps {
  items: Item[];
  onChange: (selectedItems: Item[]) => void;
  placeholder?: string;
  canCreateNew?: boolean;
  createNewText?: string;
  defaultSelected?: Item[];
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  items,
  onChange,
  placeholder = 'Select items...',
  canCreateNew = true,
  createNewText = '...Creating',
  defaultSelected = [],
}) => {
  const [selectedItems, setSelectedItems] = useState<Item[]>(defaultSelected);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const backSpaceCounter = useRef(0);

  // Filter items based on search term
  const filteredItems = useMemo(
    () => items.filter(item => item.label.toLowerCase().includes(searchTerm.toLowerCase())),
    [items, searchTerm]
  );

  // Handle click outside to close dropdown and call onChange callback
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onChange(selectedItems);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onChange, selectedItems, wrapperRef]);

  const handleSelect = (item: Item) => {
    const newSelectedItems = [...selectedItems, item];
    setSelectedItems(newSelectedItems);
    setSearchTerm('');
  };

  const handleRemove = (itemToRemove: Item) => {
    const newSelectedItems = selectedItems.filter(item => item.id !== itemToRemove.id);
    setSelectedItems(newSelectedItems);
    onChange(newSelectedItems);
  };

  const handleCreateNew = () => {
    if (!searchTerm.trim()) return;

    const newItem: Item = {
      id: `new-${Date.now()}`,
      label: searchTerm.trim(),
    };

    const newSelectedItems = [...selectedItems, newItem];
    setSelectedItems(newSelectedItems);
    setSearchTerm('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // handle create new item and call onChange callback
    if (e.key === 'Enter' && canCreateNew && searchTerm && !filteredItems.length) {
      e.preventDefault();
      handleCreateNew();
    }

    // handle remove item and call onChange callback
    if (e.key === 'Backspace' && !searchTerm && selectedItems.length > 0) {
      if (backSpaceCounter.current > 0) {
        const newSelectedItems = [...selectedItems];
        const removedItem = newSelectedItems.pop();
        setSelectedItems(newSelectedItems);
        if (removedItem) {
          onChange(newSelectedItems);
        }
        backSpaceCounter.current = 0;
      } else {
        backSpaceCounter.current++;
      }
    }
  };

  return (
    <div className="multi-select" ref={wrapperRef}>
      <div className="selected">
        {selectedItems.map(item => (
          <span key={item.id} className="tag">
            {item.label}
            {item.icon && <span className="icon">{item.icon}</span>}
            <button type="button" onClick={() => handleRemove(item)} className="remove">
              ×
            </button>
          </span>
        ))}
        <input
          type="text"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedItems.length === 0 ? placeholder : ''}
          className="input"
          onKeyDown={handleKeyDown}
        />
      </div>

      {isOpen && (
        <div className="dropdown">
          {filteredItems.length > 0
            ? filteredItems.map(item => {
                const selected = selectedItems.some(selected => selected.id === item.id);
                return (
                  <div
                    key={item.id}
                    className={`option ${selected ? 'disabled' : ''}`}
                    onClick={() => !selected && handleSelect(item)}
                  >
                    {item.label}
                    {selected && <span className="selected-mark">✓</span>}
                  </div>
                );
              })
            : canCreateNew &&
              searchTerm && (
                <div className="option create" onClick={handleCreateNew}>
                  {createNewText} "{searchTerm}"
                </div>
              )}
        </div>
      )}
    </div>
  );
};
