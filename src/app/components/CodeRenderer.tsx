import React, { FC } from 'react';
import { IRow } from '../../plugin/controller-modules/restructurisation';
import { ObjectRenderer, CloseRenderer, ValueRenderer } from './Renderers';

export type Lang = 'js' | 'scss' | 'css';

interface IStructRendererProps {
  lang: Lang;
  rows: IRow[];
}

export const CodeRenderer: FC<IStructRendererProps> = ({ rows, lang }) => {
  return (
    <div>
      {lang === 'js' &&
        <>
          {rows.map((row, i) => (
            <div className='code-board' key={i}>

              <div className='row-numbers'>{i}</div>

              <div className='code-container'>
                <div className="code"><code><pre>
                  {row.valueType === 'object' && <ObjectRenderer row={row} />}
                  {row.valueType === 'close' && <CloseRenderer row={row} />}
                  {row.valueType === 'string' && <ValueRenderer row={row} />}
                </pre></code></div>
              </div>

            </div>
          ))}
        </>
      }
    </div>
  );
}