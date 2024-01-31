import React, { FC } from 'react';
import { tabulate } from './helpers';
import { IRow} from "../../../plugin/controller-modules/restructurisation";

export interface IObjectRendererProps {
  row: IRow;
}

export const ObjectRenderer: FC<IObjectRendererProps> = ({ row }) => {
  return (
    <span>
      {tabulate(row.level)}
      <span className='code-quotes'>"</span>
      {row.name}
      <span className='code-quotes'>"</span>
      <span className='code-quotes'>{": {"}</span>
    </span>
  );
}