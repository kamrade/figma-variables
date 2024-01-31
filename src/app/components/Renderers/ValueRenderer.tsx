import React, { FC } from 'react';
import { tabulate } from './helpers';
import { IRow} from "../../../plugin/controller-modules/restructurisation";

export interface IStringRendererProps {
  row: IRow;
}

export const ValueRenderer: FC<IStringRendererProps> = ({ row }) => {
  return (
    <span>
      {tabulate(row.level)}
      <span className='code-quotes'>"</span>
      {row.name}
      <span className='code-quotes'>"</span>
      <span className='code-quotes'>{": "}</span>
      <span className='code-quotes'>"</span>
      <span className='code-value'>{row.value}</span>
      <span className='code-quotes'>"</span>
      <span className='code-quotes'>{","}</span>
    </span>
  );
}