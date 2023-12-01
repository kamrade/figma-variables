import React, { useEffect, useState } from 'react';
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

      <div className="code">
        <code>
          <pre>
            {JSON.stringify(figmaVariables, null, 2)}
          </pre>
        </code>
      </div>

    </div>
  );
}

export default App;
