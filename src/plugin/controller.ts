import { getVariables } from './controller-modules/get-variables';
import { restructurisation } from './controller-modules/restructurisation';
import { checkUniq } from './controller-modules/check-for-uniqueness';

console.clear();

figma.showUI(__html__);
figma.ui.resize(600, 600);
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'get-variables') {

    let errors = [];

    if (msg.compatibleJS) {
      const originResult = getVariables({});
      errors = checkUniq(originResult);
    }
    const originR = getVariables({ validJS: msg.compatibleJS });
    const rows = restructurisation({ origin: originR });

    figma.ui.postMessage({
      type: "variables-collected",
      message: {
        errors: errors,
        obj: errors.length ? {} : originR,
        rows: errors.length ? [] : rows
      },
    });
  }
  // figma.closePlugin();
};
