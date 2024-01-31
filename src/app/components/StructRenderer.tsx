import React, { FC } from 'react';
import { IRow } from '../../plugin/controller-modules/restructurisation';

interface IStructRendererProps {
  struct: IRow[]
}

export const StructRenderer: FC<IStructRendererProps> = ({ struct }) => {
  return (
    <div>
      {struct.map(row => ( 
        <div>
          {row.name}
        </div> 
      ))}
    </div>
  );
}