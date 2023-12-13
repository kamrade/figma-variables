import { validateJSVariable } from '../helpers/validate-js-variable';
import { isUnique, checkArrayValuesForUniqueness } from '../helpers/check-array-for-uniqueness';

export function checkForUniqueness() {
  
  const localCollections = figma.variables.getLocalVariableCollections();
  
  let structure = {
    current: [],
    children: {}
  };

  localCollections.forEach((localCollection) => {

    structure.children[localCollection.name] = { current: [], children: {} }
    if (!structure.current.includes(localCollection.name)) {
      structure.current.push(localCollection.name);
    }
    let modes = localCollection.modes;

    modes.forEach(mode => {
      structure.children[localCollection.name].children[mode.name] = { current: [], children: {} }
      if (!structure.children[localCollection.name].current.includes(mode.name)) {
        structure.children[localCollection.name].current.push(mode.name);
      }

      localCollection.variableIds.map(variableId => {
        let currentPointer = structure.children[localCollection.name].children[mode.name];
        let name = figma.variables.getVariableById(variableId).name.split('/');
        name.forEach((n) => {
          if (!currentPointer.children[n]) {
              currentPointer.children[n] = { current: [], children: {} };
            } 
            if (!currentPointer.current.includes(n)) {
              currentPointer.current.push(n);
            }
            currentPointer = currentPointer.children[n];
        });
      });
    });
  });
  
  console.log('Structure', structure);

  let currentStructure = structure;

  if (!checkArrayValuesForUniqueness(structure.current)) {
    console.log("Can't convert values to JS format. Uniqueness failed:", structure.current);
  }

  Object.keys(structure.children).map((key) => {
    currentStructure.children[key]
  });

  

  // if (!(structure.current.map((el) => validateJSVariable( el, { mode: 'cut'})).every(isUnique))) {
  //   console.log("Can't convert values to JS format. Uniqueness failed:", structure.current);
  // }
  
}
