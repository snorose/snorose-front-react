import { useState } from 'react';

import { DropdownList, SelectedItem } from '@/shared/component';


export default function Dropdown({
  options,
  placeholder,
  select,
  setFn,
  color,
  backgroundColor,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const updateSelect = (option) => {
    setFn((prev) => ({ ...prev, ...option }));
    console.log('SelectedItem clicked', options);
    setIsOpen(false);
  };

  return (
    <div>
      <SelectedItem
        select={select}
        placeholder={placeholder}
        isOpen={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        color={color}
        backgroundColor={backgroundColor}
      />

      {isOpen && (
        <DropdownList
          options={options}
          select={select}
          onSelect={updateSelect}
        />
      )}
    </div>
  );
}
