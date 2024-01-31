import React, { FC } from 'react';
import { tabulate } from './helpers';
import { IRow} from "../../../plugin/controller-modules/restructurisation";

export interface ICloseRendererProps {
  row: IRow
}

export const CloseRenderer: FC<ICloseRendererProps> = ({ row }) => {
  return (
    <span>
      {tabulate(row.level)}
      <span className='code-quotes'>
        {"},"}
      </span>
    </span>
  );
}