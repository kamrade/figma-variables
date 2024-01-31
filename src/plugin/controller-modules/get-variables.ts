import { figmaRgbaToHex } from '../helpers/rgbaToHex';
import { validateJSVariable } from "../helpers/validate-js-variable";

function addProperty(parent: any, child: any, value: any) {
  parent[child] = value;
}

interface IParams {
  validJS?: boolean;
}

export function getVariables(params: IParams) {

  const localCollections = figma.variables.getLocalVariableCollections();
  let collectionsResult: Record<string, any> = {};

  // =>
  localCollections.forEach((localCollection) => {
    

    let result: Record<string, any> = {};
    let modes = localCollection.modes;
    let name = localCollection.name;

    // =>
    modes.forEach(mode => {
      result[`${mode.name}`] = {};


      // =>
      localCollection.variableIds.map((variableId, _j) => {
        
        let fullValue = figma.variables.getVariableById(variableId);
        let resolvedType = fullValue.resolvedType;
        let valuesByMode = fullValue.valuesByMode;
        let value: any = valuesByMode[mode.modeId];

        let val: any;
        
        if (value.type === 'VARIABLE_ALIAS') {
          let reference = figma.variables.getVariableById(value.id);
          let referenceName = reference.name;
          let collection = figma.variables.getVariableCollectionById(reference.variableCollectionId);

          val = collection.name + '.' + referenceName.split('/').join('.');
        } else {
          if (resolvedType === 'COLOR') {
            val = figmaRgbaToHex(value);
          } else {
            val = value;
          }
        }

        let origin = result[`${mode.name}`];
        let name = figma.variables.getVariableById(variableId).name.split('/');
        
        name.forEach((n, i) => {

          let tn = n;
          if (params.validJS) {
            tn = validateJSVariable(n, { mode: 'cut'});
          }

          console.log(n, ':', tn);

          // console.log(n, ':::', validateJSVariable(n, { mode: 'cut' }) );
          // let normalizedName = validJS
          //   ? validateJSVariable(n, { mode: 'strict'}) === 'Invalid'
          //     ? validateJSVariable(n, { mode: 'cut' })
          //     : n
          //   : n;

          if (origin[tn]) {
            origin = origin[tn];
          } else if ((name.length - 1) > i) {
            addProperty(origin, tn, {});
            origin = origin[tn];
          } else {
            addProperty(origin, tn, val);
          }
        });
      });
    });
    collectionsResult[name] = result;
  });
  
  return collectionsResult
}
