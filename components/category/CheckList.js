import React, { useState } from 'react';

const CheckList = ({ section, setSelect, selected }) => {
  const isSelected = (idx, sel) => {
    let check;
    if (selected) {
      selected.forEach((values) => {
        if (values.value == idx) {
          check = true;
        }
      });
    }
    return check;
  };

  return (
    <>
      {section.options.map((option, optionIdx) => (
        <div key={option.value} className="flex items-center">
          <input
            id={`${section.id}-${optionIdx}`}
            name={`${section.id}[]`}
            defaultValue={option.value}
            checked={isSelected(option.value, selected)}
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            onChange={(e) => {
              if (e.target.checked) {
                setSelect((prev) => {
                  return [...prev, { id: optionIdx, value: e.target.value }];
                });
              } else {
                setSelect((prev) => {
                  return selected.filter((item) => item.id !== optionIdx);
                });
              }
            }}
          />
          <label htmlFor={`${section.id}-${optionIdx}`} className="ml-3 text-sm text-gray-600">
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckList;
