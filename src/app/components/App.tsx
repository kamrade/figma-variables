import React, { MouseEvent, useEffect, useState } from 'react';
import stringifyObject from 'stringify-object';

import '../styles/ui.css';

function App() {
  
  const [ figmaVariables, setFigmaVariables ] = useState({});
  const [ pluginErrors, setPluginErrors ] = useState<string[]>([]);
  const [ validJS, setValidJS ] = useState(false);
  const [ uniqueness, setUniqueness ] = useState(false);
  const [ collections, setCollections ] = useState<string[]>([]);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;

      if (type === "variables-transform-error") {
        setPluginErrors(message);
        setFigmaVariables({});
      }
      
      if (type === 'variables-collected') {
        setFigmaVariables(message);
        setPluginErrors([]);
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
      
      <div className='mb-1'>
        <label className="checkbox-group">
          <input type="checkbox" 
            onClick={(e: MouseEvent<HTMLInputElement>) => setValidJS((e.target as HTMLInputElement).checked)}
          />
          Try to transform to valid JS property
        </label>
      </div>

      <div className='mb-1'>
      <label className="checkbox-group">
          <input type="checkbox"
            onClick={(e: MouseEvent<HTMLInputElement>) => setUniqueness((e.target as HTMLInputElement).checked)}
          />
          Check uniqueness
        </label>
      </div>
      
      <div className='mb-1'>
        <button className="button-base" onClick={getVariables}>Export current variables</button>
      </div>

      { !!pluginErrors.length &&
        pluginErrors.map((error, i) => (
          <div className='error-alert' key={i}>{error}</div>
        ))
      }

      { !!Object.keys(collections).length && (
        <div className="code">
          <code>
            <pre>
              {Object.keys(figmaVariables).map((collection, i) => {
                return (
                  <p key={i}>
                    <span className="object-propery">{collection} = </span>
                    {stringifyObject(figmaVariables[collection], {
                      indent: '  ',
                      singleQuotes: false
                    })}
                  </p>
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
