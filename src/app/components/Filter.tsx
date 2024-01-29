import React, { FC, MouseEvent, Dispatch, SetStateAction } from 'react';

export interface IFilterProps {
  setValidJS: Dispatch<SetStateAction<boolean>>;
  setUniqueness: Dispatch<SetStateAction<boolean>>;
}

export const Filter: FC<IFilterProps> = ({ setValidJS, setUniqueness }) => (
  <div className='Filter mb-1'>

    <label className="checkbox-group">
      <input type="checkbox" className="checkbox-group-input-element" 
        onClick={(e: MouseEvent<HTMLInputElement>) => setValidJS((e.target as HTMLInputElement).checked)} />
        Try to transform to valid JS property
    </label>

    <label className="checkbox-group">
      <input type="checkbox" className="checkbox-group-input-element"
        onClick={(e: MouseEvent<HTMLInputElement>) => setUniqueness((e.target as HTMLInputElement).checked)} />
        Check uniqueness
    </label>

  </div>
);