import { getVariables } from './controller-modules/get-variables';
import { stringifyObject } from './controller-modules/stringifyObject';

console.clear();

figma.showUI(__html__);
figma.ui.resize(600, 400);
figma.ui.onmessage = (msg) => {
  
  if (msg.type === 'get-variables') {
    
    let { uniqueness, validJS } = msg.options;

    let collectionsResult = getVariables({ validJS, uniqueness });
    let variablesExportedAsText = stringifyObject(collectionsResult);
    let messages = [] //  checkForUniqueness(collectionsResult);

    if (messages.length) {
      figma.ui.postMessage({
        type: "variables-transform-error",
        message: messages
      });

    } else {
      figma.ui.postMessage({
        type: "variables-collected",
        message: {
          obj: collectionsResult,
          text: variablesExportedAsText

        }
      });
    }

    

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //   type: 'create-rectangles',
    //   message: `Created ${msg.count} Rectangles`,
    // });
  }

  // figma.closePlugin();
};
