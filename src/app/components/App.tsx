import React, { MouseEvent, useEffect, useState } from 'react';
import stringifyObject from 'stringify-object';

import '../styles/ui.css';

function App() {
  
  const [ figmaVariables, setFigmaVariables ] = useState({});
  const [ validJS, setValidJS ] = useState(false);
  const [ uniqueness, setUniqueness ] = useState(false);
  const [ collections, setCollections ] = useState<string[]>([]);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      
      if (type === 'variables-collected') {
        setFigmaVariables(message);
      }

    }
  }, []);

  useEffect(() => {
    // console.log('Figma Variables');
    // console.log(figmaVariables);
    setCollections(Object.keys(figmaVariables));
  }, [figmaVariables])

  let getVariables = () => {
    parent.postMessage({ pluginMessage: {
      type: 'get-variables',
      options: {
        validJS: validJS,
        uniqueness: uniqueness
      }
    }}, '*');
  }

  return (
    <div>
      
      <div className='mb-2'>
        <label>
          <input type="checkbox" 
            onClick={(e: MouseEvent<HTMLInputElement>) => setValidJS((e.target as HTMLInputElement).checked)}
          />
          Try to transform to valid JS property
        </label>
      </div>

      <div className='mb-2'>
        <label>
          <input type="checkbox"
            onClick={(e: MouseEvent<HTMLInputElement>) => setUniqueness((e.target as HTMLInputElement).checked)}
          />
          Check uniqueness
        </label>
      </div>
      
      <div className='mb-2'>
        <button className="button-base" onClick={getVariables}>Export current variables</button>
      </div>


      { collections.length !== 0 && (
        <div className="code">
          <code>
            <pre>
              {Object.keys(figmaVariables).map((collection, i) => {
                return (
                  <span key={i}>
                    <p className="object-propery">{figmaVariables[collection].name} = </p>
                    {stringifyObject(figmaVariables[collection], {
                      indent: '  ',
                      singleQuotes: false
                    })}
                  </span>
                );
              })}
            </pre>
          </code>
        </div>
      )}
      

    </div>
  );
}

export default App;
