import { getVariables } from './controller-modules/get-variables';


figma.showUI(__html__);
figma.ui.onmessage = (msg) => {
  if (msg.type === 'get-variables') {
    
    let collectionsResult = getVariables();

    figma.ui.postMessage({
      type: "variables-collected",
      message: collectionsResult
    });

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //   type: 'create-rectangles',
    //   message: `Created ${msg.count} Rectangles`,
    // });
  }

  // figma.closePlugin();
};
