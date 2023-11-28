import { figmaRgbaToHex } from './helpers/rgbaToHex';

function addProperty(parent, child, value) {
  parent[child] = value;
}


figma.showUI(__html__);
figma.ui.onmessage = (msg) => {
  if (msg.type === 'get-variables') {
    
    const localCollections = figma.variables.getLocalVariableCollections();
    let collectionsResult: Record<string, any> = {};

    // =>
    localCollections.forEach((localCollection) => {
      let result: Record<string, any> = {};
      let modes = localCollection.modes;
      result.name = localCollection.name;

      // =>
      modes.forEach(mode => {
        result[`${mode.name}(id:${mode.modeId})`] = {};

        // =>
        localCollection.variableIds.map(variableId => {
          let fullValue = figma.variables.getVariableById(variableId);
          let resolvedType = fullValue.resolvedType;
          let valuesByMode = fullValue.valuesByMode;
          let value: any = valuesByMode[mode.modeId];

          let val: any;
          if (value.type === 'VARIABLE_ALIAS') {
            let reference = figma.variables.getVariableById(value.id);
            let referenceName = reference.name;
            let collection = figma.variables.getVariableCollectionById(reference.variableCollectionId);

            let ref = collection.name + '.' + referenceName.split('/').join('.');
            val = ref;
          } else {
            if (resolvedType === 'COLOR') {
              val = figmaRgbaToHex(value);
            } else {
              val = value;
            }
          }

          let origin = result[`${mode.name}(id:${mode.modeId})`];
          let name = figma.variables.getVariableById(variableId).name.split('/');

          // =>
          name.forEach((n, i) => {
            if (origin[n]) {
              origin = origin[n];
            } else if ((name.length - 1) > i) {
              addProperty(origin, n, {});
              origin = origin[n];
            } else {
              addProperty(origin, n, val);
            }
          });
        });
      });
      collectionsResult[result.name] = result;
    });

    figma.ui.postMessage({
      type: "variables-collected",
      message: JSON.stringify(collectionsResult)
    });

    // This is how figma responds back to the ui
    // figma.ui.postMessage({
    //   type: 'create-rectangles',
    //   message: `Created ${msg.count} Rectangles`,
    // });
  }

  // figma.closePlugin();
};
