import { getVariables } from './controller-modules/get-variables';
import { restructurisation } from './controller-modules/restructurisation';
import { checkUniq } from './controller-modules/check-for-uniqueness';

console.clear();

figma.showUI(__html__);
figma.ui.resize(600, 600);
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'get-variables') {

    const originResult = getVariables({ validJS: msg.compatibleJS });
    const errors = checkUniq(originResult);
    const rows = restructurisation({ origin: originResult });

    figma.ui.postMessage({
      type: "variables-collected",
      message: {
        obj: originResult,
        rows: rows,
        errors: errors
      }
    });
  }
  // figma.closePlugin();
};
