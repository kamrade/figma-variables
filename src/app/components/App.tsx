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
  const [ errors, setErrors ] = useState<string[][]>();

  // support data
  const [ currentTab, setCurrentTab] = useState<ExportFormat>('js');

  // options
  const [ compatibleJSNames, setCompatibleJSNames ] = useState(false);

  useEffect(() => {

    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      
      if (type === 'variables-collected') {
        setErrors(message.errors);
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

      <div>
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

            { errors?.length ?
              <div>
                <div className={'code-errors'}>Can't convert values:</div>
                { errors.map((error, i) => <div className={'code-errors'} key={i}>{error.join(', ')}</div>) }
              </div> : null
            }

            <CodeRenderer rows={rows} lang={'js'} />
          </>
        )}
        {currentTab === 'origin' && <OriginString origin={origin} /> }
      </div>

    </div>
  );
}

export default App;
