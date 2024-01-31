import { getVariables } from './controller-modules/get-variables';
import { restructurisation } from './controller-modules/restructurisation';

console.clear();

figma.showUI(__html__);
figma.ui.resize(600, 600);
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'get-variables') {

    let originResult = getVariables({ validJS: msg.compatibleJS });
    let rows = restructurisation({ origin: originResult });

    figma.ui.postMessage({
      type: "variables-collected",
      message: {
        obj: originResult,
        rows: rows,
      }
    });
  }
  // figma.closePlugin();
};
