import { getVariables } from './controller-modules/get-variables';
import { prepareJs } from './controller-modules/prepare-js';
import { normalizeVariables } from './controller-modules/normalize-variables';

console.clear();

figma.showUI(__html__);
figma.ui.resize(600, 600);
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'get-variables') {
    let originResult = getVariables({ });
    let textResult = prepareJs(originResult);

    let norm = normalizeVariables({ origin: originResult });
    console.log(norm);
    
    figma.ui.postMessage({
      type: "variables-collected",
      message: {
        obj: originResult,
        text: textResult
      }
    });
  }
  // figma.closePlugin();
};
