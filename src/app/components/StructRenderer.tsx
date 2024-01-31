import React, { FC } from 'react';
import { IRow } from '../../plugin/controller-modules/restructurisation';

export type Lang = 'js' | 'scss' | 'css';

interface IStructRendererProps {
  lang: Lang;
  struct: IRow[];
}

export const StructRenderer: FC<IStructRendererProps> = ({ struct }) => {
  return (
    <div>
      {struct.map((row, i) => (
        <div className='code-board' key={i}>
          <div className='row-numbers'>
            {i}
          </div>
          <div className='code-container'>
            <div className="code">
              <code>
                <pre>                  
                  {row.valueType === 'object' &&
                    <span>
                      {"  ".repeat(row.level)}
                      "{row.name}"
                      <span className='code-quotes'>{": {"}</span>
                    </span>
                  }
                  { row.valueType === 'close' &&
                      <span>
                        {"  ".repeat(row.level)}
                        <span className='code-quotes'>{"}"}</span>
                      </span>
                  }
                  { row.valueType === 'string' &&
                    <span>
                      {"  ".repeat(row.level)}
                      "{row.name}"
                      <span className='code-quotes'>{": "}</span>
                      <span className='code-value'>"{row.value}"</span>
                      <span className='code-quotes'>{","}</span>
                    </span>
                  }
                </pre>
              </code>
            </div>
          </div> 
        </div>
      ))}
    </div>
  );
}