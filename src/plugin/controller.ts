import { getVariables } from './controller-modules/get-variables';
import { prepareJs } from './controller-modules/prepare-js';
import { restructurisation } from './controller-modules/restructurisation';

console.clear();

figma.showUI(__html__);
figma.ui.resize(600, 600);
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'get-variables') {
    let originResult = getVariables({ });
    let textResult = prepareJs(originResult);

    let struct = restructurisation({ origin: originResult });
    console.log(struct);

    figma.ui.postMessage({
      type: "variables-collected",
      message: {
        obj: originResult,
        text: textResult,
        struct: struct,
      }
    });
  }
  // figma.closePlugin();
};
