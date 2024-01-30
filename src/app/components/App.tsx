import React, { useEffect, useState } from 'react';
import stringifyObject from 'stringify-object';

import '../styles/ui.css';

export type ExportFormat = 'origin' | 'scss' | 'css-variables' | 'js';

export interface ITab {
  title: string;
  id: ExportFormat;
}

function App() {
  
  const [ figmaVariables, setFigmaVariables ] = useState({});
  const [ figmaVariablesText, setFigmaVariablesText ] = useState('');
  const [ pluginErrors, setPluginErrors ] = useState<string[]>([]);
  const [ separateCollections, setSeparateCollections ] = useState(false);
  const [ collections, setCollections ] = useState<string[]>([]);
  const [ currentTab, setCurrentTab] =useState<ExportFormat>('origin');

  const tabs: ITab[] = [{
    title: 'Origin (Stringified)',
    id: 'origin'
  }, {
    title: 'JS',
    id: 'js'
  }, {
    title: 'SCSS',
    id: 'scss'
  }, {
    title: 'CSS Variables',
    id: 'css-variables'
  }];

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;

      if (type === "variables-transform-error") {
        setPluginErrors(message);
        setFigmaVariables({});
      }
      
      if (type === 'variables-collected') {
        setFigmaVariables(message.obj);
        setPluginErrors([]);
        setFigmaVariablesText(message.text);
      }

    }
  }, []);

  let getVariables = () => {
    parent.postMessage({ pluginMessage: {
      type: 'get-variables',
    }}, '*');
  }

  useEffect(() => setCollections(Object.keys(figmaVariables)), [figmaVariables])
  useEffect(() => getVariables(), [separateCollections]);

  return (
    <div className="page">

      { !!pluginErrors.length &&
        pluginErrors.map((error, i) => (
          <div className='error-alert' key={i}>{error}</div>
        ))
      }

      <div className="tabs">
        {tabs.map((tab, i) => 
          <div className={`tab ${currentTab === tab.id ? 'tab--active' : ''}`} 
            onClick={() => setCurrentTab(tab.id)} key={i}>
              {tab.title}
          </div>)}
      </div>

      { !!Object.keys(collections).length && (
        <>
          
          {currentTab === 'js' &&
            <>
              <label className="checkbox-group" style={{marginBottom: '.25rem'}}>
                <input type="checkbox" className="checkbox-group-input-element" 
                  onClick={(e: React.MouseEvent<HTMLInputElement>) => setSeparateCollections((e.target as HTMLInputElement).checked)} />
                  Separate Collections
              </label>
              
              <div className="code">
                <code>
                  <pre>
                    <span>
                      {figmaVariablesText}
                    </span>
                  </pre>
                </code>
              </div>
            </>
          }

          {currentTab === 'origin' &&            
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
          }
        </>
      )}

    </div>
  );
}

export default App;
