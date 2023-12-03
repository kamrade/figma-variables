import React, { useEffect, useState } from 'react';
import stringifyObject from 'stringify-object';

import '../styles/ui.css';

function App() {
  
  const [ figmaVariables, setFigmaVariables ] = useState({});

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      
      if (type === 'variables-collected') {
        setFigmaVariables(message);
      }

    }
  }, []);

  useEffect(() => {
    console.log('Figma Variables');
    console.log(figmaVariables);
  }, [figmaVariables])

  let getVariables = () => {
    parent.postMessage({ pluginMessage: {
      type: 'get-variables'
    }}, '*');
  }


  return (
    <div>
      <button className="button-base" onClick={getVariables}>Export current variables</button>

      {Object.keys(figmaVariables).map((collection, i) => {
        return (
          <div className="code" key={i}>
            <code>
              <pre>
                <p>{figmaVariables[collection].name} = </p>
                {stringifyObject(figmaVariables[collection], {
                  indent: '  ',
                  singleQuotes: false
                })}
              </pre>
            </code>
          </div>
        );
      })}
      

    </div>
  );
}

export default App;
