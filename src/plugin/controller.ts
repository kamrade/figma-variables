figma.showUI(__html__);


function addProperty(parent, child, value) {
  parent[child] = value;
}

function rgbaUpdate(r, g, b, a) {
  return {
    r: Math.round(255 * r),
    g: Math.round(255 * g),
    b: Math.round(255 * b),
    a: a
  }
}

function rgbaToHex(rgbaObject) {


}


figma.ui.onmessage = (msg) => {
  if (msg.type === 'get-variables') {
    
    let result = {};
    const localCollections = figma.variables.getLocalVariableCollections();

    // console.log(localCollections);

    localCollections[0].variableIds.map(variableId => {

      // console.log(figma.variables.getVariableById(variableId));
      
      let name = figma.variables.getVariableById(variableId).name.split('/');
      let origin = result;
      
      name.forEach((n, i) => {

        if (origin[n]) {
          origin = origin[n];
        } else if(n.length > i + 1) {
          addProperty(origin, n, {});
          origin = origin[n];
        } else {
          addProperty(origin, n, 1000);
        }


      });
      
    })

    console.log(result);
    
    

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //   type: 'create-rectangles',
    //   message: `Created ${msg.count} Rectangles`,
    // });
  }

  // figma.closePlugin();
};
