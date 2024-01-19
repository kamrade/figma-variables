import React, { useEffect, useState } from 'react';
import stringifyObject from 'stringify-object';
import { Filter } from './Filter';

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

  let getVariables = () => {
    parent.postMessage({ pluginMessage: {
      type: 'get-variables',
      options: {
        validJS: validJS,
        uniqueness: uniqueness
      }
    }}, '*');
  }

  useEffect(() => setCollections(Object.keys(figmaVariables)), [figmaVariables])
  useEffect(() => getVariables(), [validJS, uniqueness]);

  return (
    <div>
      
      <Filter setValidJS={setValidJS} setUniqueness={setUniqueness} />

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
