import React, { useEffect } from 'react';
import '../styles/ui.css';

function App() {

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'get-variables') {
        console.log('Figma Variables');
        console.log(message);
      }
    }
  }, []);

  let getVariables = () => {
    parent.postMessage({ pluginMessage: {
      type: 'get-variables'
    }}, '*');
  }

  return (
    <div>
      <button className="button-base" onClick={getVariables}>Export current variables</button>
    </div>
  );
}

export default App;
