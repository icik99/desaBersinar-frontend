import React, { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { IoMdAdd } from 'react-icons/io';

const CheckboxRepeater = ({ checkboxData, onAddOption, onDeleteOption }) => {
  return (
    <div className="space-y-[10px]">
      {checkboxData.map((label, index) => (
        <div key={index} className="w-10/12 border rounded-md py-[10px] px-[18px] flex items-center gap-[14px] relative">
          <input type="checkbox" id={`option${index + 1}`} name={`option${index + 1}`} value={label} />
          <label className="text-gray-500 text-xs font-normal" htmlFor={`option${index + 1}`}>{label}</label>
          <button className='' onClick={() => onDeleteOption(index)}>
            <AiFillDelete />
          </button>
        </div>
      ))}
      <button className='flex gap-2 items-center rounded bg-primary-500 text-white p-2 text-xs' onClick={onAddOption}>
        <IoMdAdd />
        <h1>Add</h1>
      </button>
    </div>
  );
};

export default CheckboxRepeater;
