import React, { FC } from 'react';
import stringifyObject from 'stringify-object';

export interface IOriginStringProps {
  origin: Record<string, string | number | object>
}

export const OriginString: FC<IOriginStringProps> = ({ origin }) => {
  return (
    <div>
      <div className="code">
        <code>
          <pre>
            {Object.keys(origin).map((collection, i) => {
              return (
                <p key={i}>
                  <span className="object-propery">{collection} = </span>
                  {stringifyObject(origin[collection], {
                    indent: '  ',
                    singleQuotes: false
                  })}
                </p>
              );
            })}
          </pre>
        </code>
      </div>
    </div>
  );
}