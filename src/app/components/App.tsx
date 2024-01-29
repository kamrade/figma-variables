import React, { useEffect, useState } from 'react';
import stringifyObject from 'stringify-object';
import { Filter } from './Filter';

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
  const [ validJS, setValidJS ] = useState(false);
  const [ uniqueness, setUniqueness ] = useState(false);
  const [ collections, setCollections ] = useState<string[]>([]);
  const [ currentTab, setCurrentTab] =useState<ExportFormat>('origin');

  const tabs: ITab[] = [{
    title: 'Origin (Stringified)',
    id: 'origin'
  }, {
    title: 'SCSS',
    id: 'scss'
  }, {
    title: 'CSS Variables',
    id: 'css-variables'
  }, {
    title: 'JS',
    id: 'js'
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
            <div className="code">
              <code>
                <pre>
                  <span>
                    {figmaVariablesText}
                  </span>
                </pre>
              </code>
            </div>
          }
          {currentTab === 'origin' &&
            <div className="code">
              <code>
                <pre>
                  {Object.keys(figmaVariables).map((collection, i) => {
                    return (
                      <span key={i}>
                        <span className="object-propery">{collection} = </span>
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
          }
        </>
      )}

    </div>
  );
}

export default App;
