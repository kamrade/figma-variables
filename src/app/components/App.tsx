import React, { useEffect, useState } from 'react';
import { CodeRenderer } from './CodeRenderer';
import {OriginString} from "./Renderers";
import { tabs, ExportFormat } from '../consts/tabs';
import '../styles/ui.css';
import {IRow} from "../../plugin/controller-modules/restructurisation";


function App() {
  // data
  const [ origin, setOrigin ] = useState<Record<string, any>>({});
  const [ rows, setRows ] = useState<IRow[]>([]);

  // support data
  const [ collections, setCollections ] = useState<string[]>([]);
  const [ currentTab, setCurrentTab] =useState<ExportFormat>('js');

  // options
  const [ compatibleJSNames, setCompatibleJSNames ] = useState(false);

  useEffect(() => {
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      
      if (type === 'variables-collected') {
        setOrigin(message.obj);
        setRows(message.rows);
      }
    }
  }, []);

  const getVariables = () => {
    parent.postMessage({ pluginMessage: {
      type: 'get-variables',
      compatibleJS: compatibleJSNames
    }}, '*');
  }

  useEffect(() => setCollections(Object.keys(origin)), [origin]);
  useEffect(() => getVariables(), [compatibleJSNames]);

  return (
    <div className="page">

      <div className="tabs">
        {tabs.map((tab, i) => 
          <div className={`tab ${currentTab === tab.id ? 'tab--active' : ''}`}
            onClick={() => setCurrentTab(tab.id)} key={i}>
              {tab.title}
          </div>)
        }
      </div>

      { !!Object.keys(collections).length && (
        <>
          {currentTab === 'js' && (
            <>
              <label className={'local-filter'}>
                <input
                  type="checkbox"
                  checked={compatibleJSNames}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setCompatibleJSNames(e.target.checked);
                  }}
                />
                Compatible JS names
              </label>
              <CodeRenderer rows={rows} lang={'js'} />
            </>

          )}
          {currentTab === 'origin' && <OriginString origin={origin} /> }
        </>
      )}

    </div>
  );
}

export default App;
