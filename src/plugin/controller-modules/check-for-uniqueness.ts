import { validateJSVariable } from '../helpers/validate-js-variable';
import { checkArrayValuesForUniqueness } from '../helpers/check-array-for-uniqueness';


const checkArrayUniqueness = (struct: Record<any, any>, errors = [], currentKey?: string) => {
  
  if (typeof struct === 'object') {

    let keys = Object.keys(struct);
    let keysNormalized = keys.map((rootKey) => validateJSVariable(rootKey, { mode: 'cut' }));
    if (!checkArrayValuesForUniqueness(keysNormalized)) {
      errors.push(`Error converting to JS compatible format: uniqueness is broken in the scope ${currentKey} : [ ${keys.join(', ')} ]`);
    }
    keys.map((currentKey) => {
      checkArrayUniqueness(struct[currentKey], errors, currentKey);
    });

  } else {
    return 0;
  }

}

export function checkForUniqueness(structure: Record<any, any>) {
  let errors = [];
  checkArrayUniqueness(structure, errors, 'Global');
  return errors;
}